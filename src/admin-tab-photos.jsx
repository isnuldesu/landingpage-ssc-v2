// SAMASE Admin — Photo Manager
// Grouped photo upload UI: one card per slot, per page.
// Each slot can: upload custom, use demo Unsplash, or be empty.

// ── Slot map per page ──
// Defines which slotKeys belong to which page, with friendly labels.
const PHOTO_GROUPS = [
  {
    group: 'Main Brand (index.html)',
    desc: 'Foto untuk halaman umbrella SAMASE Sports Club.',
    slots: [
      { key: 'hero.umbrella', label: 'Hero Background', desc: 'Foto full-bleed di belakang judul utama main page.', ratio: '16/9' },
      { key: 'umbrella.subbrand.fitspace', label: 'Sub-brand Card · Fitspace', desc: 'Foto di kartu Fitspace.', ratio: '3/4' },
      { key: 'umbrella.subbrand.physio', label: 'Sub-brand Card · Physio', desc: 'Foto di kartu Physio.', ratio: '3/4' },
      { key: 'umbrella.subbrand.padel', label: 'Sub-brand Card · Padel', desc: 'Foto di kartu Padel.', ratio: '3/4' },
    ],
  },
  {
    group: 'Fitspace (fitspace.html)',
    desc: 'Foto-foto di halaman Fitspace. Sudah ada 11 slot yang bisa diisi.',
    slots: [
      { key: 'hero.cinematic', label: 'Hero Cinematic', desc: 'Background hero fitspace layout cinematic.', ratio: '16/9' },
      { key: 'facility.0', label: 'Fasilitas 01 · Group Class Studio', desc: 'Foto studio kelas grup.', ratio: '4/5' },
      { key: 'facility.1', label: 'Fasilitas 02 · Private Training', desc: 'Foto sesi PT.', ratio: '4/5' },
      { key: 'facility.2', label: 'Fasilitas 03 · Fisioterapi', desc: 'Foto area fisio.', ratio: '4/5' },
      { key: 'facility.3', label: 'Fasilitas 04 · Open Gym', desc: 'Foto functional zone.', ratio: '4/5' },
      { key: 'facility.4', label: 'Fasilitas 05 · Golden FitSpace', desc: 'Foto area 50+.', ratio: '4/5' },
      { key: 'facility.5', label: 'Fasilitas 06 · Padel Court', desc: 'Foto lapangan padel (untuk fitspace).', ratio: '4/5' },
      { key: 'founding.hero', label: 'Founding Section BG', desc: 'Background dramatis section Founding Member.', ratio: '16/9' },
      { key: 'founding.visionary', label: 'Founding · Visionary Card', desc: 'Background kartu Gelombang 01.', ratio: '4/5' },
      { key: 'founding.pioneer', label: 'Founding · Pioneer Card', desc: 'Background kartu Gelombang 02.', ratio: '4/5' },
      { key: 'founding.founder', label: 'Founding · Founder Card', desc: 'Background kartu Gelombang 03.', ratio: '4/5' },
      { key: 'physio.hero', label: 'Physio Section (di Fitspace)', desc: 'Foto physio split section.', ratio: '4/5' },
      { key: 'coach.0', label: 'Coach 01 · Raihan', desc: 'Portrait Coach Raihan.', ratio: '3/4' },
      { key: 'coach.1', label: 'Coach 02 · Laras', desc: 'Portrait Coach Laras.', ratio: '3/4' },
      { key: 'coach.2', label: 'Coach 03 · Dimas', desc: 'Portrait Coach Dimas.', ratio: '3/4' },
      { key: 'coach.3', label: 'Coach 04 · Nadia', desc: 'Portrait Coach Nadia.', ratio: '3/4' },
    ],
  },
  {
    group: 'Physio (physio.html)',
    desc: 'Foto untuk halaman Physio by Bebascedera. Slot Cinematic hanya dipakai saat layout Physio diset ke Cinematic.',
    slots: [
      { key: 'physio.sub.hero', label: 'Physio Hero', desc: 'Foto full-bleed di belakang hero physio page (semua layout).', ratio: '16/9' },
      { key: 'physio.approach.bg', label: 'Approach Section BG · Cinematic', desc: 'Background section 3-step Screening/Assessment/Program di layout Cinematic.', ratio: '16/9' },
      { key: 'physio.partner.bg', label: 'Partner (Bebascedera) BG · Cinematic', desc: 'Background section partner klinis di layout Cinematic.', ratio: '16/9' },
      { key: 'physio.cta.bg', label: 'Final CTA BG · Cinematic', desc: 'Background section ajakan terakhir "Postural Assessment" di layout Cinematic.', ratio: '16/9' },
    ],
  },
  {
    group: 'Campaign (campaign.html)',
    desc: 'Foto di halaman Postural Assessment booking. Slot Cinematic hanya dipakai saat layout Campaign diset ke Cinematic.',
    slots: [
      { key: 'campaign.hero', label: 'Campaign Hero', desc: 'Foto di belakang hero campaign form (semua layout).', ratio: '21/9' },
      { key: 'campaign.journey.bg', label: 'Journey Section BG · Cinematic', desc: 'Background section 6-step journey di layout Cinematic.', ratio: '16/9' },
    ],
  },
  {
    group: 'Padel (padel.html)',
    desc: 'Foto teaser halaman padel coming-soon.',
    slots: [
      { key: 'padel.hero', label: 'Padel Teaser', desc: 'Foto background halaman padel.', ratio: '16/9' },
    ],
  },
];

function TabPhotos({ flash }) {
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    if (!window.MediaStore) return;
    return window.MediaStore.subscribe(() => setTick(t => t + 1));
  }, []);

  const allSlots = PHOTO_GROUPS.flatMap(g => g.slots);
  const filled = allSlots.filter(s => window.MediaStore?.get(s.key)).length;

  return (
    <div>
      {/* Summary bar */}
      <div style={{
        padding: '22px 26px', marginBottom: 32,
        background: 'linear-gradient(135deg, #2A1F17, #3A2C20)',
        color: '#F2EEE5', borderRadius: 12,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 14,
      }}>
        <div>
          <div className="samase-mono" style={{ fontSize: 9, letterSpacing: '0.22em', color: '#E8B88A', marginBottom: 6, textTransform: 'uppercase' }}>
            Status Foto
          </div>
          <div className="samase-display" style={{ fontSize: 24, fontWeight: 300 }}>
            {filled} dari {allSlots.length} slot terisi
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: 'rgba(242,238,229,0.7)', lineHeight: 1.5 }}>
            Upload foto asli untuk slot yang masih kosong, atau pakai demo Unsplash sementara.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={() => window.SamaseDemoPhotos?.loadAll() && flash?.('Demo photos dimuat', 'ok')}
            style={{
              padding: '10px 16px',
              background: 'transparent',
              color: '#F2EEE5',
              border: '1px solid rgba(242,238,229,0.3)',
              fontSize: 11, letterSpacing: '0.1em',
              fontFamily: 'JetBrains Mono, monospace',
              cursor: 'pointer', borderRadius: 6, textTransform: 'uppercase',
            }}
          >
            ✦ Muat semua demo
          </button>
          <button
            onClick={() => {
              if (!confirm('Hapus semua foto demo? Upload asli tidak akan terhapus.')) return;
              const res = window.SamaseDemoPhotos?.clearAll();
              flash?.(`${res?.cleared || 0} demo dihapus`, 'ok');
            }}
            style={{
              padding: '10px 16px',
              background: 'transparent',
              color: 'rgba(242,238,229,0.7)',
              border: '1px solid rgba(242,238,229,0.2)',
              fontSize: 11, letterSpacing: '0.1em',
              fontFamily: 'JetBrains Mono, monospace',
              cursor: 'pointer', borderRadius: 6, textTransform: 'uppercase',
            }}
          >
            ✕ Bersihkan demo
          </button>
        </div>
      </div>

      {/* Groups */}
      {PHOTO_GROUPS.map(group => (
        <Section
          key={group.group}
          title={group.group}
          desc={`${group.desc} (${group.slots.filter(s => window.MediaStore?.get(s.key)).length}/${group.slots.length} slot terisi)`}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 14,
          }}>
            {group.slots.map(slot => (
              <PhotoSlotCard key={slot.key} slot={slot} tick={tick} flash={flash} />
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}

// ── Single Photo Slot Card (drag & drop + demo toggle) ──
function PhotoSlotCard({ slot, tick, flash }) {
  const current = window.MediaStore?.get(slot.key);
  const [dragOver, setDragOver] = React.useState(false);
  const fileInputRef = React.useRef(null);

  // Check if current matches a demo photo (so we know it's "demo" vs "custom")
  const demoManifest = window.SamaseDemoPhotos?.manifest || [];
  const demoEntry = demoManifest.find(m => m.slotKey === slot.key);
  const isDemo = current && demoEntry && current === demoEntry.url;
  const isCustom = current && !isDemo;
  const isEmpty = !current;

  const uploadFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      flash?.('File harus berupa gambar.', 'err');
      return;
    }
    if (file.size > 6 * 1024 * 1024) {
      flash?.('Gambar maksimal 6 MB.', 'err');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      window.MediaStore.put(slot.key, e.target.result);
      flash?.(`Foto "${slot.label}" di-upload`, 'ok');
    };
    reader.onerror = () => flash?.('Gagal membaca file', 'err');
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const useDemo = () => {
    if (demoEntry) {
      window.MediaStore.put(slot.key, demoEntry.url);
      flash?.(`Demo "${slot.label}" dipakai`, 'ok');
    } else {
      flash?.('Tidak ada demo untuk slot ini', 'err');
    }
  };

  const clearSlot = () => {
    if (!confirm(`Hapus foto untuk "${slot.label}"?`)) return;
    window.MediaStore.remove(slot.key);
    flash?.('Foto dihapus', 'ok');
  };

  return (
    <div style={{
      border: `1.5px solid ${dragOver ? 'var(--accent)' : 'var(--line)'}`,
      borderRadius: 10,
      background: dragOver ? 'rgba(169,78,44,0.04)' : '#FFFFFF',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      transition: 'all 180ms',
    }}>
      {/* Preview area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          aspectRatio: slot.ratio || '4/3',
          background: isEmpty ? 'var(--bg)' : '#000',
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        {current ? (
          <img
            src={current}
            alt={slot.label}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 8, color: 'var(--ink-mute)',
          }}>
            <span style={{ fontSize: 28 }}>↑</span>
            <span style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }} className="samase-mono">
              Drag & drop atau klik
            </span>
          </div>
        )}

        {/* Status badge */}
        <div style={{
          position: 'absolute', top: 8, right: 8,
          padding: '3px 8px',
          fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
          fontFamily: 'JetBrains Mono, monospace',
          borderRadius: 3,
          background: isCustom ? 'var(--ok)' : isDemo ? 'var(--accent)' : 'rgba(0,0,0,0.4)',
          color: '#F2EEE5',
        }}>
          {isCustom ? 'Upload' : isDemo ? 'Demo' : 'Empty'}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => uploadFile(e.target.files?.[0])}
          style={{ display: 'none' }}
        />
      </div>

      {/* Meta + actions */}
      <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.35 }}>
            {slot.label}
          </div>
          <div className="samase-mono" style={{ fontSize: 9, color: 'var(--ink-mute)', marginTop: 2, letterSpacing: '0.04em' }}>
            {slot.key}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, marginTop: 'auto', flexWrap: 'wrap' }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              flex: 1,
              padding: '7px 8px',
              background: isEmpty ? 'var(--ink)' : 'transparent',
              color: isEmpty ? 'var(--bg)' : 'var(--ink)',
              border: isEmpty ? 'none' : '1px solid var(--line)',
              borderRadius: 5,
              fontSize: 10, cursor: 'pointer',
              fontFamily: 'inherit', letterSpacing: '0.04em',
            }}
          >
            {isEmpty ? 'Upload' : 'Ganti'}
          </button>
          {demoEntry && !isDemo && (
            <button
              onClick={useDemo}
              title="Pakai foto demo Unsplash"
              style={{
                padding: '7px 10px',
                background: 'transparent',
                color: 'var(--accent)',
                border: '1px solid var(--accent)',
                borderRadius: 5, fontSize: 10, cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              ✦ Demo
            </button>
          )}
          {current && (
            <button
              onClick={clearSlot}
              title="Hapus foto"
              style={{
                padding: '7px 10px',
                background: 'transparent',
                color: 'var(--ink-mute)',
                border: '1px solid var(--line)',
                borderRadius: 5, fontSize: 10, cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TabPhotos });
