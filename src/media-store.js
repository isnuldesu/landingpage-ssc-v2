// SAMASE Media Store
// Stores uploaded images and videos as base64 in a separate localStorage
// bucket so the main CMS override file stays small and exportable.
//
// Usage:
//   MediaStore.put(key, dataUrl)   — save a media asset
//   MediaStore.get(key)            — read it back (returns dataUrl or null)
//   MediaStore.remove(key)         — delete
//   MediaStore.list()              — array of keys
//   MediaStore.pickAndUpload(onKey) — helper to open file picker
//
// Keys are strings like "hero-bg", "facility-01-photo-02", "coach-raihan", etc.

(function () {
  const BUCKET = 'samase_media_v1';
  const INDEX = 'samase_media_index_v1';

  function readBucket() {
    try {
      return JSON.parse(localStorage.getItem(BUCKET) || '{}');
    } catch (_) { return {}; }
  }

  function writeBucket(obj) {
    try {
      localStorage.setItem(BUCKET, JSON.stringify(obj));
      localStorage.setItem(INDEX, JSON.stringify(Object.keys(obj)));
    } catch (err) {
      console.warn('MediaStore: storage quota exceeded', err);
      throw err;
    }
  }

  const listeners = new Set();
  function notify() {
    listeners.forEach(fn => { try { fn(); } catch (_) {} });
  }

  const MediaStore = {
    put(key, dataUrl) {
      const b = readBucket();
      b[key] = { dataUrl, updatedAt: Date.now() };
      writeBucket(b);
      notify();
    },

    get(key) {
      if (!key) return null;
      const b = readBucket();
      return b[key] ? b[key].dataUrl : null;
    },

    has(key) {
      if (!key) return false;
      return readBucket()[key] != null;
    },

    remove(key) {
      const b = readBucket();
      delete b[key];
      writeBucket(b);
      notify();
    },

    list() {
      return Object.keys(readBucket());
    },

    size() {
      try {
        const raw = localStorage.getItem(BUCKET) || '{}';
        return raw.length;
      } catch (_) { return 0; }
    },

    clear() {
      try {
        localStorage.removeItem(BUCKET);
        localStorage.removeItem(INDEX);
      } catch (_) {}
      notify();
    },

    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },

    // File picker helper: opens dialog, reads file as dataURL, stores it
    pickAndUpload({ accept = 'image/*', key, onDone, onError }) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = accept;
      input.onchange = () => {
        const file = input.files && input.files[0];
        if (!file) return;
        // Basic size guard: 6MB for images, 15MB for video
        const isVideo = file.type.startsWith('video/');
        const limit = isVideo ? 15 * 1024 * 1024 : 6 * 1024 * 1024;
        if (file.size > limit) {
          const msg = `File terlalu besar. Max ${isVideo ? '15MB untuk video' : '6MB untuk gambar'}.`;
          onError && onError(msg);
          return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            MediaStore.put(key, ev.target.result);
            onDone && onDone(key, ev.target.result);
          } catch (err) {
            onError && onError('Gagal simpan: localStorage penuh. Coba hapus media lain.');
          }
        };
        reader.readAsDataURL(file);
      };
      input.click();
    },
  };

  // Cross-tab sync (via storage events)
  window.addEventListener('storage', (e) => {
    if (e.key === BUCKET) notify();
  });

  window.MediaStore = MediaStore;
})();
