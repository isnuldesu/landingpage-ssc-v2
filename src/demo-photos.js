// SAMASE — Demo Photos Loader (v3)
// One-click seed for MediaStore slots so stakeholders see real photos during
// presentation, without paying for generation credits.
//
// Sources: Unsplash (free, commercial use allowed, no attribution required
// per Unsplash License).
//
// ── Curation rules (v3) ──
//   • NO aurat — no exposed skin, no female portraits, no swimwear/tank tops.
//   • Men-only for human subjects; mostly dressed in long sleeves / jackets.
//   • Prefer equipment-only, interior, silhouette, or abstract moody shots.
//   • Treatment:
//       Hero + Founding      → MOODY / cinematic (low-key, dramatic)
//       Facilities + Physio  → WARM / natural-light (equipment focus)
//       Coach portraits      → Men, fully-dressed, Indonesian / SEA where possible
//
// ── SlotKey convention ──
//   Facility items in content.js have `n: '01'` but NO `id` field, so the
//   cinematic layout falls back to numeric index: facility.0 .. facility.5
//   (NOT facility.01). Coach items similarly use coach.0 .. coach.3.
//
// Usage:
//   window.SamaseDemoPhotos.loadAll()   // seed every slot
//   window.SamaseDemoPhotos.clearAll()  // wipe every demo slot
//   window.SamaseDemoPhotos.isLoaded()  // true if any demo slot seeded
//   window.SamaseDemoPhotos.manifest    // array of { slotKey, url, mood, note }

(function () {
  // Unsplash "direct" URLs via https://images.unsplash.com/photo-ID
  const U = (id, w) => `https://images.unsplash.com/photo-${id}?w=${w || 1600}&q=75&auto=format&fit=crop`;

  const MANIFEST = [
    // ─────────────────────────────────────────────────────────────
    // HERO — moody, low-key, dramatic (dark gym interior, silhouette)
    // ─────────────────────────────────────────────────────────────
    { slotKey: 'hero.cinematic',
      url: U('1534438327276-14e5300c3a48'), // dark moody gym interior
      mood: 'moody',
      note: 'Hero backdrop — dark gym interior, dramatic light' },

    // ─────────────────────────────────────────────────────────────
    // FACILITIES — slotKey = facility.{index}  (0..5)
    // Equipment / interior focus, no human subjects where possible
    // ─────────────────────────────────────────────────────────────
    { slotKey: 'facility.0',
      url: U('1540497077202-7c8a3999166f'), // empty fitness studio, wooden floor
      mood: 'warm',
      note: '01 Group Class Studio — empty studio, wooden floor' },
    { slotKey: 'facility.1',
      url: U('1581009146145-b5ef050c2e1e'), // man in hoodie lifting (fully dressed)
      mood: 'warm',
      note: '02 Private Training — coach demonstrating, fully dressed' },
    { slotKey: 'facility.2',
      url: U('1519823551278-64ac92734fb1'), // physio hands on shoulder (clothed)
      mood: 'warm',
      note: '03 Fisioterapi Bebascedera — treatment hands' },
    { slotKey: 'facility.3',
      url: U('1540569014015-19a7be504e3a'), // gym equipment, functional zone (no humans)
      mood: 'warm',
      note: '04 Open Gym — functional zone, equipment' },
    { slotKey: 'facility.4',
      url: U('1522898467493-49726bf28798'), // senior man walking / active (clothed)
      mood: 'warm',
      note: '05 Golden FitSpace — senior active lifestyle' },
    { slotKey: 'facility.5',
      url: U('1554068865-24cecd4e34b8'), // padel / tennis court exterior
      mood: 'warm',
      note: '06 Padel Court — outdoor court' },

    // ─────────────────────────────────────────────────────────────
    // PHYSIO — warm, treatment moment (hands, clothed shoulder)
    // ─────────────────────────────────────────────────────────────
    { slotKey: 'physio.hero',
      url: U('1519823551278-64ac92734fb1'), // physio treatment, clothed
      mood: 'warm',
      note: 'Physio hero — postural assessment, professional' },

    // ─────────────────────────────────────────────────────────────
    // FOUNDING — moody backdrop (section) + 3 PER-BATCH photos
    // Batch slotKeys follow pattern founding.{batch.id}
    // content.js batches: id=visionary, pioneer, founder
    // Plus fallback indexed: founding.0, founding.1, founding.2
    // ─────────────────────────────────────────────────────────────
    { slotKey: 'founding.hero',
      url: U('1517836357463-d25dfeac3438'), // moody gym at night, dramatic
      mood: 'moody',
      note: 'Founding section backdrop — dark, contemplative' },

    // ─── Batch 1: Visionary (earliest, most dramatic) ───
    { slotKey: 'founding.visionary',
      url: U('1517836357463-d25dfeac3438'), // empty dark gym, pioneering silence
      mood: 'moody',
      note: 'Visionary batch — empty dark gym, first-light feel' },
    { slotKey: 'founding.0', // fallback by index
      url: U('1517836357463-d25dfeac3438'),
      mood: 'moody',
      note: 'Visionary (indexed fallback)' },

    // ─── Batch 2: Pioneer (community building) ───
    { slotKey: 'founding.pioneer',
      url: U('1534258936925-c58bed479fcb'), // gym interior, warm light, community vibe
      mood: 'moody',
      note: 'Pioneer batch — warm-lit interior, growing community' },
    { slotKey: 'founding.1',
      url: U('1534258936925-c58bed479fcb'),
      mood: 'moody',
      note: 'Pioneer (indexed fallback)' },

    // ─── Batch 3: Founder (established, final wave) ───
    { slotKey: 'founding.founder',
      url: U('1540497077202-7c8a3999166f'), // full studio, established, detailed
      mood: 'moody',
      note: 'Founder batch — established studio, final wave' },
    { slotKey: 'founding.2',
      url: U('1540497077202-7c8a3999166f'),
      mood: 'moody',
      note: 'Founder (indexed fallback)' },

    // ─────────────────────────────────────────────────────────────
    // COACH portraits — men only, fully dressed, SEA where possible
    // slotKey = coach.{index}  (content.js coaches have no id field)
    // Order: Raihan, Laras (replaced w/ male silhouette), Dimas, Nadia (replaced w/ male)
    // ─────────────────────────────────────────────────────────────
    { slotKey: 'coach.0',
      url: U('1583454110551-21f2fa2afe61'), // SEA man portrait, hoodie, serious
      mood: 'warm',
      note: 'Coach 1 (Raihan) — Head of Movement, fully dressed' },
    { slotKey: 'coach.1',
      url: U('1594381898411-846e7d193883'), // male athlete profile, long sleeve
      mood: 'warm',
      note: 'Coach 2 (Laras → male stand-in) — fully dressed profile' },
    { slotKey: 'coach.2',
      url: U('1540496905036-5937c10647cc'), // man training, fully dressed
      mood: 'warm',
      note: 'Coach 3 (Dimas) — Strength & Conditioning' },
    { slotKey: 'coach.3',
      url: U('1526232761682-d26e03ac148e'), // SEA man portrait, clothed
      mood: 'warm',
      note: 'Coach 4 (Nadia → male stand-in) — Mobility coach' },

    // ─────────────────────────────────────────────────────────────
    // Photo-forward layout (also pre-seed for layout switcher preview)
    // ─────────────────────────────────────────────────────────────
    { slotKey: 'photo-hero-bg',
      url: U('1534438327276-14e5300c3a48'),
      mood: 'moody',
      note: 'Photo-forward hero (shared w/ cinematic)' },
    { slotKey: 'photo-philosophy-main',
      url: U('1571902943202-507ec2618e8f'), // quiet weight rack
      mood: 'warm',
      note: 'Philosophy visual — quiet equipment' },
    { slotKey: 'photo-physio-main',
      url: U('1519823551278-64ac92734fb1'),
      mood: 'warm',
      note: 'Physio main (shared)' },
    { slotKey: 'photo-physio-detail',
      url: U('1581009146145-b5ef050c2e1e'),
      mood: 'warm',
      note: 'Physio detail' },
    { slotKey: 'photo-facility-01',
      url: U('1540497077202-7c8a3999166f'),
      mood: 'warm',
      note: 'Facility 01 (shared)' },
    { slotKey: 'photo-facility-02',
      url: U('1581009146145-b5ef050c2e1e'),
      mood: 'warm',
      note: 'Facility 02' },
    { slotKey: 'photo-facility-03',
      url: U('1519823551278-64ac92734fb1'),
      mood: 'warm',
      note: 'Facility 03' },
    { slotKey: 'photo-facility-04',
      url: U('1540569014015-19a7be504e3a'),
      mood: 'warm',
      note: 'Facility 04' },
    { slotKey: 'photo-facility-05',
      url: U('1522898467493-49726bf28798'),
      mood: 'warm',
      note: 'Facility 05' },
    { slotKey: 'photo-facility-06',
      url: U('1554068865-24cecd4e34b8'),
      mood: 'warm',
      note: 'Facility 06' },
    { slotKey: 'photo-founding-1',
      url: U('1517836357463-d25dfeac3438'),
      mood: 'moody',
      note: 'Founding 1 — Visionary visual' },
    { slotKey: 'photo-founding-2',
      url: U('1534258936925-c58bed479fcb'),
      mood: 'moody',
      note: 'Founding 2 — Pioneer visual' },
    { slotKey: 'photo-founding-3',
      url: U('1540497077202-7c8a3999166f'),
      mood: 'moody',
      note: 'Founding 3 — Founder visual' },
    { slotKey: 'photo-founding-4',
      url: U('1581009146145-b5ef050c2e1e'),
      mood: 'warm',
      note: 'Founding 4 — coach & member' },

    // ─────────────────────────────────────────────────────────────
    // NEW PAGES (Main Umbrella, Physio sub, Campaign, Padel)
    // Added in manifest v5 — supports Cinematic layouts.
    // ─────────────────────────────────────────────────────────────

    // Main Brand (index.html)
    { slotKey: 'hero.umbrella',
      url: U('1534438327276-14e5300c3a48'), // moody gym interior
      mood: 'moody',
      note: 'Main umbrella hero backdrop — dramatic silhouette' },
    { slotKey: 'umbrella.subbrand.fitspace',
      url: U('1540497077202-7c8a3999166f'), // empty studio
      mood: 'warm',
      note: 'Sub-brand card · Fitspace' },
    { slotKey: 'umbrella.subbrand.physio',
      url: U('1519823551278-64ac92734fb1'), // physio treatment
      mood: 'warm',
      note: 'Sub-brand card · Physio' },
    { slotKey: 'umbrella.subbrand.padel',
      url: U('1554068865-24cecd4e34b8'), // padel court
      mood: 'warm',
      note: 'Sub-brand card · Padel' },

    // Physio (physio.html) — Cinematic section backgrounds
    { slotKey: 'physio.sub.hero',
      url: U('1519823551278-64ac92734fb1'), // physio hands on shoulder
      mood: 'warm',
      note: 'Physio hero — standard + Cinematic' },
    { slotKey: 'physio.approach.bg',
      url: U('1540569014015-19a7be504e3a'), // equipment row
      mood: 'moody',
      note: 'Physio Approach BG (Cinematic) — equipment close-up' },
    { slotKey: 'physio.partner.bg',
      url: U('1571902943202-507ec2618e8f'), // quiet weight rack
      mood: 'moody',
      note: 'Physio Partner BG (Cinematic) — Bebascedera mood' },
    { slotKey: 'physio.cta.bg',
      url: U('1517836357463-d25dfeac3438'), // moody gym at night
      mood: 'moody',
      note: 'Physio Final CTA BG (Cinematic) — contemplative' },

    // Campaign (campaign.html)
    { slotKey: 'campaign.hero',
      url: U('1534438327276-14e5300c3a48'), // dramatic hero
      mood: 'moody',
      note: 'Campaign hero — standard + Cinematic' },
    { slotKey: 'campaign.journey.bg',
      url: U('1534258936925-c58bed479fcb'), // warm gym interior
      mood: 'moody',
      note: 'Campaign Journey BG (Cinematic) — process visualization' },

    // Padel (padel.html)
    { slotKey: 'padel.hero',
      url: U('1554068865-24cecd4e34b8'), // padel court
      mood: 'warm',
      note: 'Padel teaser hero — outdoor court' },
  ];

  const DEMO_FLAG_KEY = 'samase_demo_photos_loaded_v1';
  const MANIFEST_VERSION_KEY = 'samase_demo_photos_manifest_version';
  const CURRENT_MANIFEST_VERSION = 5;

  function readFlag() {
    try { return JSON.parse(localStorage.getItem(DEMO_FLAG_KEY) || '{}'); }
    catch (_) { return {}; }
  }
  function writeFlag(obj) {
    try { localStorage.setItem(DEMO_FLAG_KEY, JSON.stringify(obj)); } catch (_) {}
  }

  // ── Auto-migrate on version bump ──
  // Old demo entries (v1/v2 with facility.01 etc.) are cleaned up so new
  // manifest takes effect cleanly.
  function migrateIfNeeded() {
    try {
      const stored = parseInt(localStorage.getItem(MANIFEST_VERSION_KEY) || '0', 10);
      if (stored >= CURRENT_MANIFEST_VERSION) return;
      if (!window.MediaStore) return;
      const flag = readFlag();
      let cleared = 0;
      Object.keys(flag).forEach(slotKey => {
        const cur = window.MediaStore.get(slotKey);
        if (cur && flag[slotKey] && cur === flag[slotKey].url) {
          window.MediaStore.remove(slotKey);
          cleared++;
        }
      });
      try { localStorage.removeItem(DEMO_FLAG_KEY); } catch (_) {}
      try { localStorage.setItem(MANIFEST_VERSION_KEY, String(CURRENT_MANIFEST_VERSION)); } catch (_) {}
      if (cleared > 0) console.info(`SamaseDemoPhotos: migrated, cleared ${cleared} stale demo photos`);
    } catch (e) {
      console.warn('SamaseDemoPhotos migration failed:', e);
    }
  }

  function loadAll() {
    if (!window.MediaStore) {
      console.warn('SamaseDemoPhotos: MediaStore not available yet.');
      return { loaded: 0, skipped: 0 };
    }
    migrateIfNeeded();
    const flag = readFlag();
    let loaded = 0, skipped = 0;
    MANIFEST.forEach(item => {
      const existing = window.MediaStore.get(item.slotKey);
      const wasDemo = !!flag[item.slotKey];
      // If user uploaded something we didn't seed AND it isn't a prior demo URL, skip.
      if (existing && !wasDemo) {
        skipped++;
        return;
      }
      window.MediaStore.put(item.slotKey, item.url);
      flag[item.slotKey] = { url: item.url, loadedAt: Date.now() };
      loaded++;
    });
    writeFlag(flag);
    return { loaded, skipped };
  }

  function clearAll() {
    if (!window.MediaStore) return { cleared: 0 };
    const flag = readFlag();
    let cleared = 0;
    Object.keys(flag).forEach(slotKey => {
      const cur = window.MediaStore.get(slotKey);
      if (cur && flag[slotKey] && cur === flag[slotKey].url) {
        window.MediaStore.remove(slotKey);
        cleared++;
      }
    });
    try { localStorage.removeItem(DEMO_FLAG_KEY); } catch (_) {}
    return { cleared };
  }

  function isLoaded() {
    const flag = readFlag();
    return Object.keys(flag).length > 0;
  }
  function loadedCount() { return Object.keys(readFlag()).length; }
  function totalCount() { return MANIFEST.length; }

  window.SamaseDemoPhotos = {
    manifest: MANIFEST,
    loadAll,
    clearAll,
    isLoaded,
    loadedCount,
    totalCount,
    manifestVersion: CURRENT_MANIFEST_VERSION,
  };

  // Run migration on load so stale v1/v2 keys are wiped before any seeding.
  // Defer slightly so MediaStore is ready.
  if (typeof window !== 'undefined') {
    if (window.MediaStore) migrateIfNeeded();
    else setTimeout(migrateIfNeeded, 50);
  }
})();
