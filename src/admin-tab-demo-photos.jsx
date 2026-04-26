// SAMASE Admin — Demo Photos tab
// One-click toggle to seed MediaStore with curated Unsplash photos so
// stakeholders see a populated design during preview. Wipe cleanly before
// real shoot is delivered.
//
// Loaded into admin.html; registered in admin-app.jsx tab list as 'demo'.

function TabDemoPhotos({ flash }) {
  const DP = window.SamaseDemoPhotos;
  const [tick, setTick] = React.useState(0);
  const [busy, setBusy] = React.useState(false);
  const [lastResult, setLastResult] = React.useState(null);

  React.useEffect(() => {
    if (!window.MediaStore) return;
    return window.MediaStore.subscribe(() => setTick(t => t + 1));
  }, []);

  if (!DP) {
    return (
      <div style={{ color: 'var(--ink-mute)', fontSize: 13 }}>
        Demo photos module belum ter-load. Pastikan <code>src/demo-photos.js</code> di-include sebelum admin-tabs.
      </div>
    );
  }

  const loaded = DP.isLoaded();
  const loadedN = DP.loadedCount();
  const totalN = DP.totalCount();

  const doLoad = async () => {
    setBusy(true);
    try {
      const res = DP.loadAll();
      setLastResult({ kind: 'load', ...res });
      flash && flash(`Demo photos loaded: ${res.loaded} slot`, 'ok');
    } catch (e) {
      flash && flash('Gagal load demo photos', 'err');
    } finally {
      setBusy(false);
      setTick(t => t + 1);
    }
  };

  const doClear = async () => {
    if (!confirm('Hapus semua demo photos? Upload asli yang kamu letakkan di atas demo tidak akan terhapus.')) return;
    setBusy(true);
    try {
      const res = DP.clearAll();
      setLastResult({ kind: 'clear', ...res });
      flash && flash(`${res.cleared} demo slot dibersihkan`, 'ok');
    } catch (e) {
      flash && flash('Gagal clear demo photos', 'err');
    } finally {
      setBusy(false);
      setTick(t => t + 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Hero / status card */}
      <div style={{
        padding: '28px 28px 26px',
        background: loaded ? 'linear-gradient(135deg, #2A1F17, #4A3A2C)' : 'var(--bg-elev)',
        color: loaded ? '#F2EEE5' : 'var(--ink)',
        borderRadius: 14,
        border: loaded ? '1px solid rgba(242,238,229,0.12)' : '1px solid var(--line)',
        position: 'relative', overflow: 'hidden',
      }}>
        {loaded && (
          <div aria-hidden style={{
            position: 'absolute', top: '-40%', right: '-10%',
            width: 300, height: 300,
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            opacity: 0.25, pointerEvents: 'none',
          }}/>
        )}
        <div className="samase-mono" style={{
          fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: loaded ? '#E8B88A' : 'var(--ink-mute)',
          marginBottom: 10,
        }}>
          Status · Demo Photos
        </div>
        <h2 className="samase-display" style={{
          margin: 0, fontSize: 28, lineHeight: 1.2, fontWeight: 400,
          color: loaded ? '#F2EEE5' : 'var(--ink)',
        }}>
          {loaded
            ? `${loadedN} dari ${totalN} slot terisi foto demo.`
            : 'Belum ada demo photos dimuat.'}
        </h2>
        <p style={{
          margin: '12px 0 0', maxWidth: 560, fontSize: 14, lineHeight: 1.65,
          color: loaded ? 'rgba(242,238,229,0.75)' : 'var(--ink-soft)',
        }}>
          {loaded
            ? 'Landing page saat ini menampilkan foto Unsplash terkurasi (modest, men-only, equipment-focus) untuk presentasi stakeholder. Hapus sebelum upload foto asli.'
            : 'Isi semua slot foto (Hero, Facilities 6 slot, Physio, 3 Founding batches, Coach 4 slot) dengan satu klik. Semua foto curated modest—tanpa aurat, men-only untuk subjek manusia. Cocok untuk preview & presentasi. Upload asli bisa dilakukan kapan saja—demo tidak akan menimpa.'}
        </p>

        <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
          {!loaded ? (
            <button
              className="btn btn-primary"
              onClick={doLoad}
              disabled={busy}
              style={{ minWidth: 200, padding: '12px 24px' }}
            >
              {busy ? 'Loading…' : '✦ Load demo photos'}
            </button>
          ) : (
            <>
              <button
                className="btn"
                onClick={doLoad}
                disabled={busy}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: '#F2EEE5',
                  border: '1px solid rgba(242,238,229,0.25)',
                  minWidth: 160, padding: '12px 22px',
                }}
              >
                {busy ? 'Refresh…' : '↻ Re-apply demo'}
              </button>
              <button
                className="btn"
                onClick={doClear}
                disabled={busy}
                style={{
                  background: 'transparent',
                  color: '#F2EEE5',
                  border: '1px solid rgba(242,238,229,0.4)',
                  minWidth: 160, padding: '12px 22px',
                }}
              >
                {busy ? 'Clearing…' : '✕ Clear demo photos'}
              </button>
            </>
          )}
        </div>

        {lastResult && (
          <div className="samase-mono" style={{
            marginTop: 18, fontSize: 10,
            color: loaded ? 'rgba(242,238,229,0.55)' : 'var(--ink-mute)',
            letterSpacing: '0.1em',
          }}>
            {lastResult.kind === 'load'
              ? `✓ Loaded ${lastResult.loaded} · Skipped ${lastResult.skipped} (real upload dilindungi)`
              : `✓ Cleared ${lastResult.cleared} demo slot`}
          </div>
        )}
      </div>

      {/* Info rows */}
      <div style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <InfoTile
          label="Subjek"
          value="Modest · men-only"
          sub="Tidak ada aurat. Fokus ke equipment, interior, silhouette, atau pria berpakaian lengkap."
        />
        <InfoTile
          label="Treatment"
          value="Warm + Moody"
          sub="Moody: Hero, Founding (3 batch). Warm: Facilities (6), Physio, Coach (4)."
        />
        <InfoTile
          label="Safety"
          value="Upload asli dilindungi"
          sub="Clear demo photos tidak menghapus foto asli yang kamu upload manually."
        />
      </div>

      {/* Manifest preview */}
      <div>
        <div className="samase-mono" style={{
          fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'var(--ink-mute)', marginBottom: 12,
        }}>
          Preview · {totalN} slot dalam manifest
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 10,
        }}>
          {DP.manifest.map(item => (
            <SlotPreviewCard key={item.slotKey} item={item} tick={tick} />
          ))}
        </div>
      </div>

      {/* Footnote */}
      <div style={{
        padding: '18px 22px',
        background: 'var(--bg)',
        border: '1px dashed var(--line)',
        borderRadius: 10,
        fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.65,
      }}>
        <b style={{ color: 'var(--ink)' }}>Catatan stakeholder:</b>{' '}
        Foto ini hanya untuk preview / presentasi. Sebelum launch, ganti
        dengan hasil shoot SAMASE di Bintaro. Klik <i>Clear demo photos</i>
        setelah foto asli di-upload supaya tidak ada URL Unsplash yang
        tersisa di production build.
      </div>
    </div>
  );
}

function InfoTile({ label, value, sub }) {
  return (
    <div style={{
      padding: '18px 18px 16px',
      background: '#FFFFFF',
      border: '1px solid var(--line)',
      borderRadius: 10,
    }}>
      <div className="samase-mono" style={{
        fontSize: 9, color: 'var(--ink-mute)',
        letterSpacing: '0.16em', textTransform: 'uppercase',
        marginBottom: 8,
      }}>{label}</div>
      <div className="samase-display" style={{
        fontSize: 18, color: 'var(--ink)', marginBottom: 6, lineHeight: 1.2,
      }}>{value}</div>
      <div style={{ fontSize: 12, color: 'var(--ink-mute)', lineHeight: 1.55 }}>{sub}</div>
    </div>
  );
}

function SlotPreviewCard({ item, tick }) {
  const current = window.MediaStore?.get(item.slotKey);
  const filled = !!current;
  const usingDemo = current === item.url;
  return (
    <div style={{
      border: '1px solid var(--line)',
      borderRadius: 8,
      overflow: 'hidden',
      background: '#FFFFFF',
    }} title={item.note}>
      <div style={{
        aspectRatio: '4/3',
        background: filled ? '#000' : 'var(--bg-elev)',
        position: 'relative',
      }}>
        {filled && (
          <img
            src={current}
            alt={item.note}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
        )}
        <div style={{
          position: 'absolute', top: 6, right: 6,
          padding: '3px 7px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 8, letterSpacing: '0.1em',
          borderRadius: 3,
          background: usingDemo ? 'var(--accent)' : filled ? 'var(--ok)' : 'rgba(0,0,0,0.25)',
          color: '#F2EEE5',
          textTransform: 'uppercase',
        }}>
          {usingDemo ? 'Demo' : filled ? 'Custom' : 'Empty'}
        </div>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '8px 10px 7px',
          background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.6))',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 9, letterSpacing: '0.08em',
          color: '#F2EEE5',
          textTransform: 'uppercase',
        }}>
          {item.slotKey}
        </div>
      </div>
      <div style={{ padding: '9px 11px 11px' }}>
        <div style={{ fontSize: 11.5, color: 'var(--ink)', lineHeight: 1.45 }}>{item.note}</div>
        <div className="samase-mono" style={{
          marginTop: 5, fontSize: 8.5, color: item.mood === 'moody' ? '#6A4A34' : '#8A6B44',
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          {item.mood === 'moody' ? '○ Moody' : '◎ Warm'}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TabDemoPhotos });
