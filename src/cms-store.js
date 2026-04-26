// SAMASE CMS — central persistent store (v3)
// Draft/Commit pattern:
//   - setKey() writes to DRAFT only (fast, no persist, no broadcast)
//   - commit() writes draft → persistent storage + broadcasts
//   - discard() throws away the draft
//   - isDirty() tells if there are uncommitted changes
//
// Storage:
//   window.SAMASE            = merged(defaults, committed + draft preview)
//   localStorage.samase_cms_v1    = committed overrides (source of truth)
//   sessionStorage.samase_cms_draft = draft (per-session, not broadcast)
//
// Cross-tab sync via BroadcastChannel (only commits, not drafts)

(function () {
  const STORAGE_KEY = 'samase_cms_v1';
  const DRAFT_KEY = 'samase_cms_draft_v1';
  const CHANNEL_NAME = 'samase_cms_channel';

  // ---------- Helpers ----------
  function deepClone(obj) {
    return obj === undefined ? undefined : JSON.parse(JSON.stringify(obj));
  }

  function isNumericKey(k) { return /^\d+$/.test(String(k)); }

  function deepMerge(target, source) {
    if (!source || typeof source !== 'object') return target;
    // Override stored as {0:..., 1:...} merged into an array target
    if (Array.isArray(target) && !Array.isArray(source)) {
      const out = deepClone(target);
      for (const key of Object.keys(source)) {
        if (!isNumericKey(key)) continue;
        const idx = parseInt(key, 10);
        const sv = source[key];
        const tv = out[idx];
        if (sv && typeof sv === 'object' && !Array.isArray(sv) && tv && typeof tv === 'object' && !Array.isArray(tv)) {
          out[idx] = deepMerge(deepClone(tv), sv);
        } else {
          out[idx] = Array.isArray(sv) ? deepClone(sv) : sv;
        }
      }
      return out;
    }
    for (const key of Object.keys(source)) {
      const sv = source[key];
      const tv = target[key];
      if (Array.isArray(sv)) {
        target[key] = deepClone(sv);
      } else if (sv && typeof sv === 'object' && tv && typeof tv === 'object') {
        target[key] = deepMerge(Array.isArray(tv) ? tv : deepClone(tv), sv);
      } else {
        target[key] = sv;
      }
    }
    return target;
  }

  function setByPath(obj, path, value) {
    const parts = path.split('.');
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const k = parts[i];
      const nextKey = parts[i + 1];
      const needsArray = isNumericKey(nextKey);
      if (cur[k] === undefined || cur[k] === null || typeof cur[k] !== 'object') {
        cur[k] = needsArray ? [] : {};
      }
      cur = cur[k];
    }
    const lastKey = parts[parts.length - 1];
    cur[lastKey] = value;
    return obj;
  }

  function getByPath(obj, path) {
    return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
  }

  function clearByPath(obj, path) {
    const parts = path.split('.');
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!cur[parts[i]]) return;
      cur = cur[parts[i]];
    }
    delete cur[parts[parts.length - 1]];
  }

  // ---------- State ----------
  let committed = {};   // persisted overrides
  let draft = {};       // unsaved edits (session-scoped)
  const listeners = new Set();
  let channel = null;
  try { channel = new BroadcastChannel(CHANNEL_NAME); } catch (_) {}

  function loadCommitted() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      committed = raw ? JSON.parse(raw) || {} : {};
    } catch (_) { committed = {}; }
  }

  function loadDraft() {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      draft = raw ? JSON.parse(raw) || {} : {};
    } catch (_) { draft = {}; }
  }

  function saveCommitted() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(committed)); } catch (_) {}
  }

  function saveDraft() {
    try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); } catch (_) {}
  }

  function clearDraft() {
    draft = {};
    try { sessionStorage.removeItem(DRAFT_KEY); } catch (_) {}
  }

  function effectiveOverrides() {
    // committed + draft overlay
    return deepMerge(deepClone(committed), draft);
  }

  function rebuild() {
    const defaults = window.SAMASE_DEFAULTS || window.SAMASE || {};
    const merged = deepMerge(deepClone(defaults), effectiveOverrides());
    window.SAMASE = merged;
    return merged;
  }

  function notify(source) {
    listeners.forEach(fn => {
      try { fn(window.SAMASE, effectiveOverrides(), source); } catch (_) {}
    });
  }

  function broadcast() {
    if (channel) {
      try { channel.postMessage({ type: 'samase_cms_update', ts: Date.now() }); } catch (_) {}
    }
  }

  function draftHasKey(path) {
    return getByPath(draft, path) !== undefined;
  }

  function countDraftKeys(obj, prefix = '') {
    if (!obj || typeof obj !== 'object') return 0;
    let c = 0;
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        c += countDraftKeys(v, prefix + k + '.');
      } else {
        c += 1;
      }
    }
    return c;
  }

  // ---------- Public API ----------
  const CMSStore = {
    init() {
      loadCommitted();
      loadDraft();
      rebuild();
    },

    get() { return window.SAMASE; },

    getOverrides() { return effectiveOverrides(); },
    getCommitted() { return deepClone(committed); },
    getDraft() { return deepClone(draft); },

    getOverride(path) { return getByPath(effectiveOverrides(), path); },
    getValue(path) { return getByPath(window.SAMASE, path); },

    // Write to DRAFT only
    setKey(path, value) {
      setByPath(draft, path, value);
      saveDraft();
      rebuild();
      notify('draft');
    },

    setMany(updates) {
      for (const [p, v] of Object.entries(updates)) setByPath(draft, p, v);
      saveDraft();
      rebuild();
      notify('draft');
    },

    clearKey(path) {
      clearByPath(draft, path);
      clearByPath(committed, path);
      saveDraft();
      saveCommitted();
      rebuild();
      notify('local');
      broadcast();
    },

    // ---------- Draft lifecycle ----------
    isDirty() { return countDraftKeys(draft) > 0; },
    draftCount() { return countDraftKeys(draft); },
    draftKeys() {
      const list = [];
      (function walk(obj, prefix) {
        if (!obj || typeof obj !== 'object') return;
        for (const k of Object.keys(obj)) {
          const v = obj[k];
          const path = prefix ? prefix + '.' + k : k;
          if (v && typeof v === 'object' && !Array.isArray(v)) walk(v, path);
          else list.push(path);
        }
      })(draft, '');
      return list;
    },

    commit() {
      // Merge draft into committed, persist, broadcast
      committed = deepMerge(deepClone(committed), draft);
      clearDraft();
      saveCommitted();
      rebuild();
      notify('commit');
      broadcast();
    },

    discardDraft() {
      clearDraft();
      rebuild();
      notify('discard');
    },

    reset() {
      committed = {};
      clearDraft();
      saveCommitted();
      rebuild();
      notify('reset');
      broadcast();
    },

    replaceAll(newOverrides) {
      committed = deepClone(newOverrides || {});
      clearDraft();
      saveCommitted();
      rebuild();
      notify('replace');
      broadcast();
    },

    export() {
      return JSON.stringify({
        version: 2,
        exportedAt: new Date().toISOString(),
        overrides: deepClone(committed),
      }, null, 2);
    },

    import(jsonText) {
      const parsed = JSON.parse(jsonText);
      const next = parsed.overrides || parsed;
      if (typeof next !== 'object') throw new Error('Invalid import file');
      committed = next;
      clearDraft();
      saveCommitted();
      rebuild();
      notify('import');
      broadcast();
    },

    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };

  // Cross-tab listeners
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      loadCommitted();
      rebuild();
      notify('remote');
    }
  });

  if (channel) {
    channel.addEventListener('message', (e) => {
      if (e.data && e.data.type === 'samase_cms_update') {
        loadCommitted();
        rebuild();
        notify('remote');
      }
    });
  }

  // Warn user if they leave admin with unsaved draft
  window.addEventListener('beforeunload', (e) => {
    if (CMSStore.isDirty() && window.__SAMASE_ADMIN__) {
      e.preventDefault();
      e.returnValue = '';
    }
  });

  window.CMSStore = CMSStore;
})();
