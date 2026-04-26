// SAMASE Admin — tab components
// Each tab is a focused editor for one content domain.
// All changes go through window.CMSStore.setKey() → persisted + broadcast.

// ============ Shared primitives ============

function Section({ title, desc, children, style }) {
  return (
    <section style={{ marginBottom: 40, ...style }}>
      <h3 className="samase-display" style={{
        margin: '0 0 4px', fontSize: 22, fontWeight: 400,
      }}>
        {title}
      </h3>
      {desc && (
        <p style={{
          margin: '0 0 18px', color: 'var(--ink-mute)', fontSize: 13, lineHeight: 1.5,
        }}>{desc}</p>
      )}
      <div style={{ background: '#FFFFFF', border: '1px solid var(--line-soft)', borderRadius: 12, padding: 22 }}>
        {children}
      </div>
    </section>
  );
}

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label className="lbl">{label}</label>
      {children}
      {hint && (
        <div className="samase-mono" style={{
          fontSize: 9, color: 'var(--ink-mute)', marginTop: 6, letterSpacing: '0.05em',
        }}>{hint}</div>
      )}
    </div>
  );
}

function TextField({ path, label, hint, placeholder, rows }) {
  const v = (window.CMSStore?.getValue(path)) || '';
  const onChange = (e) => window.CMSStore.setKey(path, e.target.value);
  return (
    <Field label={label} hint={hint}>
      {rows ? (
        <textarea
          className="inp"
          value={v}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          style={{ resize: 'vertical', lineHeight: 1.55 }}
        />
      ) : (
        <input
          type="text"
          className="inp"
          value={v}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </Field>
  );
}

function NumberField({ path, label, hint, min, max }) {
  const v = window.CMSStore?.getValue(path);
  const onChange = (e) => {
    const n = parseInt(e.target.value, 10);
    window.CMSStore.setKey(path, isNaN(n) ? 0 : n);
  };
  return (
    <Field label={label} hint={hint}>
      <input type="number" className="inp" value={v ?? 0} onChange={onChange} min={min} max={max} />
    </Field>
  );
}

function SelectField({ path, label, hint, options }) {
  const v = window.CMSStore?.getValue(path);
  const onChange = (e) => window.CMSStore.setKey(path, e.target.value);
  return (
    <Field label={label} hint={hint}>
      <select className="inp" value={v || ''} onChange={onChange}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </Field>
  );
}

function ChoiceGrid({ path, options, columns = 2 }) {
  const v = window.CMSStore?.getValue(path);
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: 10,
    }}>
      {options.map(opt => {
        const active = v === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => window.CMSStore.setKey(path, opt.value)}
            style={{
              padding: '14px 16px',
              border: `1.5px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
              background: active ? 'rgba(169,78,44,0.06)' : '#FFFFFF',
              borderRadius: 10,
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: 4,
              transition: 'all 150ms',
              fontFamily: 'inherit',
            }}
          >
            <div style={{
              fontSize: 13, fontWeight: 500,
              color: active ? 'var(--accent)' : 'var(--ink)',
            }}>
              {opt.label}
            </div>
            {opt.desc && (
              <div className="samase-mono" style={{
                fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.05em',
              }}>
                {opt.desc}
              </div>
            )}
            {opt.swatch && (
              <div style={{ display: 'flex', gap: 0, marginTop: 6, borderRadius: 4, overflow: 'hidden', width: 60 }}>
                {opt.swatch.map((c, i) => (
                  <div key={i} style={{ width: 20, height: 14, background: c }} />
                ))}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ResetOverrideBtn({ path }) {
  const hasOverride = window.CMSStore?.getOverride(path) !== undefined;
  if (!hasOverride) return null;
  return (
    <button
      onClick={() => window.CMSStore.clearKey(path)}
      className="btn btn-ghost"
      style={{ fontSize: 10, padding: '6px 12px' }}
    >
      ↺ Reset ke default
    </button>
  );
}

// ============ Tab: Visual (unified palette + per-page layout) ============
// Single page that controls:
//   1. Global palette (warm/deep/stone) — applied to all pages
//   2. Layout per page (Main, Fitspace, Physio, Campaign) — each section
function TabVisual({ flash }) {
  const palettes = [
    { value: 'warm',  label: 'Warm',  desc: 'Cream + terracotta (brand default)', swatch: ['#F2EEE5', '#A94E2C', '#C68B5E'] },
    { value: 'deep',  label: 'Deep',  desc: 'Editorial dark + sage',              swatch: ['#141414', '#C2A57F', '#A8D0BF'] },
    { value: 'stone', label: 'Stone', desc: 'Cool modernist neutral',             swatch: ['#F3F3F1', '#3D4247', '#8E8474'] },
  ];

  // Layout variants per page
  const pageLayouts = {
    main: {
      title: 'Main Brand (index.html)',
      desc: 'Halaman umbrella SAMASE Sports Club.',
      path: 'ui.layouts.main',
      options: [
        { value: 'editorial', label: 'Editorial',
          desc: 'Hero split + philosophy paragraph. Tenang, brand-first, Aesop-like.',
        },
        { value: 'cinematic', label: 'Cinematic',
          desc: 'Hero full-bleed photo + 3 sub-brand card zero-gap. Dramatis, photo-forward.',
        },
      ],
    },
    fitspace: {
      title: 'Fitspace (fitspace.html)',
      desc: 'Halaman sub-brand Fitspace — existing content gym.',
      path: 'ui.layouts.fitspace',
      options: [
        { value: 'cinematic', label: 'Cinematic',
          desc: 'Photo-rich Hero/Facilities/Founding/Coach. Rhythm visual kuat.',
        },
        { value: 'editorial', label: 'Editorial',
          desc: 'Magazine-style, serif forward. Lebih tenang, less photo.',
        },
      ],
    },
    physio: {
      title: 'Physio (physio.html)',
      desc: 'Halaman SAMASE Physio by Bebascedera.',
      path: 'ui.layouts.physio',
      options: [
        { value: 'grid', label: 'Grid Pricing',
          desc: '3 tier berdampingan dalam grid. Gampang bandingkan.',
        },
        { value: 'stack', label: 'Stacked Pricing',
          desc: '3 tier vertikal, fokus ke Starter (highlighted).',
        },
        { value: 'cinematic', label: 'Cinematic',
          desc: 'Photo-as-background: Hero, Approach, Partner, CTA. ALL CAPS, dramatis.',
        },
      ],
    },
    campaign: {
      title: 'Campaign Form (campaign.html)',
      desc: 'Halaman Postural Assessment booking.',
      path: 'ui.layouts.campaign',
      options: [
        { value: 'split', label: 'Split',
          desc: 'Context di kiri, form di kanan. Paling informatif.',
        },
        { value: 'centered', label: 'Centered',
          desc: 'Form di tengah, journey di bawah. Fokus ke 1 action.',
        },
        { value: 'cinematic', label: 'Cinematic',
          desc: 'Photo-bg hero + journey. Form tetap clean. Dramatis, luxury feel.',
        },
      ],
    },
  };

  return (
    <>
      {/* ── 1. Palette (global) ── */}
      <Section
        title="Color Palette"
        desc="Satu palette untuk semua halaman. Warm = brand default. Perubahan langsung berlaku di main, fitspace, physio, campaign, dan padel."
      >
        <ChoiceGrid path="ui.variant" options={palettes} />
      </Section>

      {/* ── 2. Layout per page ── */}
      <Section
        title="Layout per Halaman"
        desc="Setiap sub-brand punya 2 opsi layout. Pilih yang paling sesuai dengan arah design kamu saat ini. Bisa diubah kapan saja."
      >
        {Object.entries(pageLayouts).map(([key, page], idx) => (
          <div key={key} style={{
            padding: idx === 0 ? '0 0 22px' : '22px 0',
            borderBottom: idx < Object.keys(pageLayouts).length - 1 ? '1px solid var(--line-soft)' : 'none',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)', marginBottom: 3 }}>
                  {page.title}
                </div>
                <div className="samase-mono" style={{ fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '0.06em' }}>
                  {page.desc}
                </div>
              </div>
              <ResetOverrideBtn path={page.path} />
            </div>
            <ChoiceGrid path={page.path} options={page.options} columns={page.options.length >= 3 ? 3 : 2} />
          </div>
        ))}
      </Section>

      {/* ── 3. Legacy fitspace layout (old 'ui.layout' key) ── */}
      <details style={{ marginTop: 14 }}>
        <summary style={{ fontSize: 11, color: 'var(--ink-mute)', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em' }}>
          Legacy: ui.layout (advanced)
        </summary>
        <Section
          title="Legacy Layout (fitspace)"
          desc="Key lama 'ui.layout' yang dipakai fitspace.html sebelum per-page layout. Sinkron otomatis dengan Fitspace layout di atas."
        >
          <ChoiceGrid path="ui.layout" options={[
            { value: 'editorial',     label: 'Editorial',     desc: 'Magazine · serif forward' },
            { value: 'zen',           label: 'Zen Minimal',   desc: 'Centered · ultra calm' },
            { value: 'architectural', label: 'Architectural', desc: 'Heavy grid · sans-serif' },
            { value: 'hero',          label: 'Hero-Focus',    desc: 'Cinematic · progress inline' },
            { value: 'photo',         label: 'Photo-forward', desc: 'Editorial magazine · full-bleed' },
            { value: 'cinematic',     label: 'Cinematic',     desc: 'Photo as section background' },
          ]} />
        </Section>
      </details>
    </>
  );
}

// ============ Tab: Hero ============
function TabHero() {
  return (
    <>
      <Section title="Headline" desc="Tiga baris headline yang menyusun hero. Baris tengah di-italic secara otomatis.">
        <TextField path="hero.titleTop" label="Baris 1" placeholder="Ruang tenang" />
        <TextField path="hero.titleMid" label="Baris 2 (italic)" placeholder="untuk tubuh yang" />
        <TextField path="hero.titleBot" label="Baris 3" placeholder="dijaga dengan niat." />
      </Section>

      <Section title="Sub-copy" desc="Paragraf pembuka di bawah headline.">
        <TextField path="hero.lede" label="Lede" rows={4}
          placeholder="SAMASE Sports Club — Exclusive Active Lifestyle Club…" />
      </Section>

      <Section title="Meta" desc="Informasi opening date dan lokasi yang tampil di hero + footer.">
        <TextField path="brand.opening" label="Grand Opening" placeholder="Juli 2026" />
        <TextField path="brand.city" label="Kota / Lokasi" placeholder="Jakarta, Bintaro" />
      </Section>

      <Section title="Hero Media Background"
        desc="Background foto atau video di belakang headline. Upload file atau biarkan kosong untuk latar default (grid).">
        <MediaUploader path="hero.media" />
        <NumberField path="hero.media.overlay" label="Overlay gelap (0–1)"
          hint="0 = tanpa overlay, 0.5 = 50%, 1 = hitam penuh" min={0} max={1} step={0.05} />
      </Section>

      <Section title="A/B Test Headline"
        desc="Tes dua versi headline. Aktifkan, lalu pilih variant mana yang ditayangkan. Simpan hasilnya di tool analytics pihak lain.">
        <Field label="Aktifkan A/B mode">
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={!!window.CMSStore?.getValue('ab.enabled')}
              onChange={(e) => window.CMSStore.setKey('ab.enabled', e.target.checked)}
              style={{ width: 18, height: 18, accentColor: 'var(--accent)' }}
            />
            <span style={{ fontSize: 13 }}>
              {window.CMSStore?.getValue('ab.enabled') ? 'Aktif' : 'Nonaktif'}
            </span>
          </label>
        </Field>
        <Field label="Variant yang ditayangkan">
          <div style={{ display: 'flex', gap: 8 }}>
            {['A', 'B'].map(v => {
              const active = window.CMSStore?.getValue('ab.heroVariant') === v;
              return (
                <button
                  key={v}
                  onClick={() => window.CMSStore.setKey('ab.heroVariant', v)}
                  style={{
                    flex: 1, padding: 12,
                    background: active ? 'var(--ink)' : '#FFF',
                    color: active ? 'var(--bg)' : 'var(--ink)',
                    border: `1px solid ${active ? 'var(--ink)' : 'var(--line)'}`,
                    borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit',
                    fontSize: 13, fontWeight: 500,
                  }}
                >Variant {v}</button>
              );
            })}
          </div>
        </Field>
        <div style={{ marginTop: 10, padding: 16, background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--line-soft)' }}>
          <div className="samase-mono" style={{ fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.12em', marginBottom: 10 }}>
            VARIANT A
          </div>
          <TextField path="ab.variants.A.titleTop" label="Baris 1" />
          <TextField path="ab.variants.A.titleMid" label="Baris 2 (italic)" />
          <TextField path="ab.variants.A.titleBot" label="Baris 3" />
        </div>
        <div style={{ marginTop: 10, padding: 16, background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--line-soft)' }}>
          <div className="samase-mono" style={{ fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.12em', marginBottom: 10 }}>
            VARIANT B
          </div>
          <TextField path="ab.variants.B.titleTop" label="Baris 1" />
          <TextField path="ab.variants.B.titleMid" label="Baris 2 (italic)" />
          <TextField path="ab.variants.B.titleBot" label="Baris 3" />
        </div>
      </Section>
    </>
  );
}

// ============ MediaUploader (image/video) ============
function MediaUploader({ path }) {
  const type = window.CMSStore?.getValue(`${path}.type`) || 'none';
  const url = window.CMSStore?.getValue(`${path}.url`) || '';

  const onFile = (kind) => (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      window.CMSStore.setKey(`${path}.type`, kind);
      window.CMSStore.setKey(`${path}.url`, ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const clear = () => {
    window.CMSStore.setKey(`${path}.type`, 'none');
    window.CMSStore.setKey(`${path}.url`, '');
  };

  return (
    <div>
      <div style={{
        aspectRatio: '16/7', background: 'var(--bg)',
        border: '1px dashed var(--line)', borderRadius: 8,
        overflow: 'hidden', marginBottom: 12,
        display: 'grid', placeItems: 'center',
        position: 'relative',
      }}>
        {type === 'image' && url && (
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center',
          }} />
        )}
        {type === 'video' && url && (
          <video src={url} autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        {type === 'none' && (
          <span className="samase-mono" style={{ fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '0.12em' }}>
            BELUM ADA MEDIA · LATAR DEFAULT DIPAKAI
          </span>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <label className="btn btn-ghost" style={{ fontSize: 11, cursor: 'pointer' }}>
          Upload Gambar
          <input type="file" accept="image/*" onChange={onFile('image')} style={{ display: 'none' }} />
        </label>
        <label className="btn btn-ghost" style={{ fontSize: 11, cursor: 'pointer' }}>
          Upload Video
          <input type="file" accept="video/*" onChange={onFile('video')} style={{ display: 'none' }} />
        </label>
        {type !== 'none' && (
          <button onClick={clear} className="btn btn-danger" style={{ fontSize: 11 }}>Hapus</button>
        )}
      </div>
      <div className="samase-mono" style={{ fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.08em', marginTop: 8 }}>
        Tersimpan sebagai Base64. Disarankan ukuran file {'<'} 2MB untuk gambar, {'<'} 8MB untuk video.
      </div>
    </div>
  );
}

// Single PhotoUploader (for gallery / portraits)
function PhotoUploader({ path, aspectRatio = '1/1', small = false }) {
  const url = window.CMSStore?.getValue(path) || '';
  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => window.CMSStore.setKey(path, ev.target.result);
    reader.readAsDataURL(file);
  };
  const clear = () => window.CMSStore.setKey(path, '');
  return (
    <div>
      <div style={{
        aspectRatio, background: 'var(--bg)',
        border: '1px dashed var(--line)', borderRadius: 6,
        overflow: 'hidden', marginBottom: 8, position: 'relative',
        minHeight: small ? 80 : 120,
      }}>
        {url ? (
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center',
          }} />
        ) : (
          <div style={{
            position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
            fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.14em',
            fontFamily: "'JetBrains Mono', monospace",
          }}>NO IMAGE</div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <label style={{
          fontSize: 10, padding: '5px 10px',
          background: 'var(--ink)', color: 'var(--bg)',
          borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit',
          letterSpacing: '0.08em',
        }}>
          {url ? 'Ganti' : 'Upload'}
          <input type="file" accept="image/*" onChange={onFile} style={{ display: 'none' }} />
        </label>
        {url && (
          <button onClick={clear} style={{
            fontSize: 10, padding: '5px 10px',
            background: 'transparent', color: 'var(--accent)',
            border: '1px solid var(--accent)', borderRadius: 999,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>Hapus</button>
        )}
      </div>
    </div>
  );
}

// ============ Tab: Batches ============
function TabBatches() {
  const batches = window.CMSStore?.getValue('founding.batches') || [];
  const scarcityMode = window.CMSStore?.getValue('founding.scarcityMode') || 'hard';

  const scarcityOpts = [
    { value: 'hard',   label: 'Hard Quota',    desc: 'Tampilkan "X/Y slot terisi"' },
    { value: 'soft',   label: 'Soft Scarcity', desc: 'Tanpa angka · countdown only' },
    { value: 'hybrid', label: 'Hybrid',        desc: '"X+ applicants" + deadline' },
  ];

  return (
    <>
      <Section title="Scarcity Mode" desc="Cara kami menunjukkan kelangkaan ke calon member.">
        <ChoiceGrid path="founding.scarcityMode" options={scarcityOpts} columns={3} />
      </Section>

      <Section title="Kuota & Status per Gelombang" desc="Update angka slot terisi saat ada pendaftar baru. Status otomatis pengaruhi badge.">
        {batches.map((b, i) => (
          <BatchEditor key={b.id} index={i} batch={b} />
        ))}
      </Section>

      <Section title="Tanggal Penutupan" desc="Dipakai oleh Soft & Hybrid mode sebagai countdown.">
        <Field label="Closing date">
          <input
            type="date"
            className="inp"
            value={(window.CMSStore?.getValue('founding.closingDate') || '').slice(0, 10)}
            onChange={(e) =>
              window.CMSStore.setKey(
                'founding.closingDate',
                e.target.value + 'T23:59:00+07:00'
              )
            }
          />
        </Field>
      </Section>
    </>
  );
}

function BatchEditor({ batch, index }) {
  const base = `founding.batches.${index}`;
  const pct = batch.slotsTotal > 0 ? Math.round((batch.slotsTaken / batch.slotsTotal) * 100) : 0;

  return (
    <div style={{
      padding: 18,
      background: 'var(--bg)',
      border: '1px solid var(--line-soft)',
      borderRadius: 10,
      marginBottom: 12,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 14,
      }}>
        <div>
          <span className="samase-mono" style={{
            fontSize: 10, color: 'var(--accent)',
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            {batch.gelombang}
          </span>
          <div className="samase-display" style={{ fontSize: 20, marginTop: 2 }}>
            {batch.label}
          </div>
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 22, color: 'var(--accent)', fontWeight: 500,
        }}>
          {pct}%
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <NumberField path={`${base}.slotsTaken`} label="Slot Terisi" min={0} max={batch.slotsTotal} />
        <NumberField path={`${base}.slotsTotal`} label="Total Slot" min={1} />
      </div>

      <Field label="Status">
        <div style={{ display: 'flex', gap: 6 }}>
          {['active', 'upcoming', 'closed'].map(s => {
            const cur = window.CMSStore?.getValue(`${base}.status`);
            const active = cur === s;
            return (
              <button
                key={s}
                onClick={() => window.CMSStore.setKey(`${base}.status`, s)}
                style={{
                  flex: 1,
                  padding: '9px 10px',
                  background: active
                    ? (s === 'active' ? 'var(--accent)' : s === 'upcoming' ? 'var(--gold)' : 'var(--ink)')
                    : '#FFFFFF',
                  color: active ? '#F2EEE5' : 'var(--ink-soft)',
                  border: `1px solid ${active ? 'transparent' : 'var(--line)'}`,
                  borderRadius: 6,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Field>
    </div>
  );
}

// ============ Tab: Audience ============
function TabAudience() {
  const personas = window.CMSStore?.getValue('audience.personas') || [];

  return (
    <>
      <Section title="Audience Header" desc="Judul & kicker untuk section audience.">
        <TextField path="audience.title" label="Judul" rows={2} placeholder="Untuk siapa SAMASE Club dirancang…" />
        <TextField path="audience.lede" label="Sub-copy" rows={3} placeholder="Kami melayani lima grup…" />
      </Section>

      <Section title="Persona Cards" desc="5 persona target. Urutan = prioritas. Edit nama, hook, deskripsi, dan tags fit produk.">
        {personas.map((p, i) => (
          <PersonaEditor key={p.n} index={i} persona={p} />
        ))}
      </Section>
    </>
  );
}

function PersonaEditor({ persona, index }) {
  const base = `audience.personas.${index}`;
  const [open, setOpen] = React.useState(index === 0);
  return (
    <div style={{
      border: '1px solid var(--line-soft)', borderRadius: 10,
      marginBottom: 10, background: 'var(--bg)',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', padding: '12px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: 'inherit', textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="samase-mono" style={{ color: 'var(--accent)', fontSize: 10 }}>{persona.n}</span>
          <span style={{ fontWeight: 500 }}>{persona.title}</span>
          <span className="samase-mono" style={{ color: 'var(--ink-mute)', fontSize: 9 }}>
            {persona.age}
          </span>
        </div>
        <span style={{ color: 'var(--ink-mute)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }}>⌄</span>
      </button>
      {open && (
        <div style={{ padding: '0 18px 18px' }}>
          <TextField path={`${base}.title`} label="Nama persona" />
          <TextField path={`${base}.age`} label="Usia / deskriptor umur" />
          <TextField path={`${base}.priority`} label="Prioritas" hint="Contoh: 'Core · High' atau 'Secondary · Medium'" />
          <TextField path={`${base}.hook`} label="Hook (italic quote di card)" />
          <TextField path={`${base}.body`} label="Body copy" rows={3} />
          <TagListField path={`${base}.fit`} label="Fit produk (tags)" hint="Pisah dengan koma. Contoh: Golden FitSpace, Private PT, Rehab" />
        </div>
      )}
    </div>
  );
}

function TagListField({ path, label, hint }) {
  const list = window.CMSStore?.getValue(path) || [];
  const [raw, setRaw] = React.useState(list.join(', '));
  React.useEffect(() => { setRaw(list.join(', ')); /* eslint-disable-next-line */ }, [JSON.stringify(list)]);

  const commit = () => {
    const next = raw.split(',').map(s => s.trim()).filter(Boolean);
    window.CMSStore.setKey(path, next);
  };

  return (
    <Field label={label} hint={hint}>
      <input
        className="inp"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        onBlur={commit}
      />
    </Field>
  );
}

// ============ Tab: Facilities ============
function TabFacilities() {
  const items = window.CMSStore?.getValue('facilities.items') || [];
  const layoutOpts = [
    { value: 'grid',      label: 'Grid + Slider',   desc: 'Kartu dengan photo slider di atas. Cocok kalau ada banyak detail.' },
    { value: 'fullphoto', label: 'Full Photo',      desc: 'Foto full-bleed, judul di atas foto. Lebih cinematic.' },
  ];
  return (
    <>
      <Section title="Layout Fasilitas" desc="Ganti gaya tampilan section fasilitas di landing page.">
        <ChoiceGrid path="ui.facilityLayout" options={layoutOpts} columns={2} />
      </Section>

      <Section title="Facilities Header">
        <TextField path="facilities.title" label="Judul" rows={2} />
        <TextField path="facilities.lede" label="Sub-copy" rows={2} />
      </Section>

      <Section title="Daftar Fasilitas" desc="6 fasilitas utama. Upload foto cover (untuk layout full-photo) dan foto gallery (slider).">
        {items.map((f, i) => (
          <FacilityEditor key={f.n} index={i} facility={f} />
        ))}
      </Section>
    </>
  );
}

function FacilityEditor({ facility, index }) {
  const base = `facilities.items.${index}`;
  const [open, setOpen] = React.useState(index === 0);
  return (
    <div style={{
      border: '1px solid var(--line-soft)', borderRadius: 10,
      marginBottom: 10, background: 'var(--bg)',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', padding: '12px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: 'inherit', textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="samase-mono" style={{ color: 'var(--accent)', fontSize: 10 }}>{facility.n}</span>
          <span style={{ fontWeight: 500 }}>{facility.title}</span>
          <span className="samase-mono" style={{ color: 'var(--ink-mute)', fontSize: 9 }}>
            {(facility.photos || []).length} foto
          </span>
        </div>
        <span style={{ color: 'var(--ink-mute)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }}>⌄</span>
      </button>
      {open && (
        <div style={{ padding: '0 18px 18px' }}>
          <TextField path={`${base}.title`} label="Judul fasilitas" />
          <TextField path={`${base}.body`} label="Deskripsi" rows={3} />

          <div style={{ marginTop: 14, marginBottom: 10 }}>
            <label className="lbl">Foto Cover (tampil di layout Full Photo)</label>
            <PhotoUploader path={`${base}.coverPhoto`} aspectRatio="3/4" />
          </div>

          <div style={{ marginTop: 14, marginBottom: 10 }}>
            <label className="lbl">Foto Gallery / Slider</label>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {(facility.photos || []).map((p, pi) => (
              <div key={pi} style={{
                padding: 10, background: '#FFFFFF',
                border: '1px solid var(--line-soft)', borderRadius: 8,
              }}>
                <div className="samase-mono" style={{
                  fontSize: 9, color: 'var(--ink-mute)',
                  letterSpacing: '0.1em', marginBottom: 8,
                }}>
                  Foto #{pi + 1}
                </div>
                <PhotoUploader path={`${base}.photos.${pi}.url`} aspectRatio="4/3" small />
                <div style={{ marginTop: 8 }}>
                  <TextField path={`${base}.photos.${pi}.caption`} label="Caption" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ Tab: Physio ============
function TabPhysio() {
  const steps = window.CMSStore?.getValue('physio.steps') || [];
  return (
    <>
      <Section title="Physio Header">
        <TextField path="physio.title" label="Judul" rows={2} />
        <TextField path="physio.lede" label="Sub-copy" rows={3} />
      </Section>

      <Section title="3 Step Flow" desc="Proses kolaborasi dengan Bebascedera.">
        {steps.map((s, i) => (
          <div key={s.n} style={{
            padding: 14, background: 'var(--bg)',
            border: '1px solid var(--line-soft)', borderRadius: 8, marginBottom: 10,
          }}>
            <div className="samase-mono" style={{
              fontSize: 10, color: 'var(--accent)',
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10,
            }}>Step {s.n}</div>
            <TextField path={`physio.steps.${i}.title`} label="Judul step" />
            <TextField path={`physio.steps.${i}.meta`} label="Meta (durasi / tag)" />
            <TextField path={`physio.steps.${i}.body`} label="Deskripsi" rows={3} />
          </div>
        ))}
      </Section>

      <Section title="Partner — Bebascedera">
        <TextField path="physio.partner.name" label="Nama partner" />
        <TextField path="physio.partner.url" label="URL" />
        <TextField path="physio.partner.body" label="Deskripsi" rows={2} />
      </Section>
    </>
  );
}

// ============ Tab: Coach ============
function TabCoach() {
  const team = window.CMSStore?.getValue('coach.team') || [];
  const addCoach = () => {
    const next = [...team, {
      name: 'Coach Baru', role: 'Role', specialty: 'Specialty',
      bio: 'Bio singkat.', photo: null, tags: []
    }];
    window.CMSStore.setKey('coach.team', next);
  };
  const removeCoach = (idx) => {
    if (!confirm(`Hapus ${team[idx].name}?`)) return;
    const next = team.filter((_, i) => i !== idx);
    window.CMSStore.setKey('coach.team', next);
  };
  return (
    <>
      <Section title="Coach Section Header">
        <TextField path="coach.title" label="Judul" rows={2} />
        <TextField path="coach.body" label="Intro body" rows={3} />
        <TextField path="coach.consultLabel" label="Consult CTA copy" rows={2} />
        <TextField path="coach.ctaLabel" label="CTA button label" />
      </Section>

      <Section title="Tim Coach" desc="Kelola profil setiap coach. Foto opsional.">
        {team.map((c, i) => (
          <CoachEditor key={i} index={i} coach={c} onRemove={() => removeCoach(i)} />
        ))}
        <div style={{ marginTop: 10 }}>
          <button onClick={addCoach} className="btn btn-ghost" style={{ fontSize: 11 }}>
            + Tambah Coach
          </button>
        </div>
      </Section>
    </>
  );
}

function CoachEditor({ coach, index, onRemove }) {
  const base = `coach.team.${index}`;
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{
      border: '1px solid var(--line-soft)', borderRadius: 10,
      marginBottom: 10, background: 'var(--bg)',
    }}>
      <div style={{
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            flex: 1, background: 'transparent', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
            fontFamily: 'inherit', textAlign: 'left', padding: 0,
          }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: coach.photo ? `url(${coach.photo}) center/cover` : 'var(--bg-elev)',
            border: '1px solid var(--line)',
          }} />
          <div>
            <div style={{ fontWeight: 500, fontSize: 14 }}>{coach.name}</div>
            <div className="samase-mono" style={{ fontSize: 9, color: 'var(--ink-mute)' }}>
              {coach.role}
            </div>
          </div>
        </button>
        <span style={{ color: 'var(--ink-mute)' }}>{open ? '⌃' : '⌄'}</span>
      </div>
      {open && (
        <div style={{ padding: '0 18px 18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 14 }}>
            <div>
              <label className="lbl">Foto portrait</label>
              <PhotoUploader path={`${base}.photo`} aspectRatio="4/5" />
            </div>
            <div>
              <TextField path={`${base}.name`} label="Nama" />
              <TextField path={`${base}.role`} label="Role / Jabatan" />
              <TextField path={`${base}.specialty`} label="Specialty" />
            </div>
          </div>
          <TextField path={`${base}.bio`} label="Bio" rows={3} />
          <TagListField path={`${base}.tags`} label="Tags" hint="Pisah koma. Contoh: 1-on-1, Golden 50+, Rehab" />
          <div style={{ marginTop: 10, textAlign: 'right' }}>
            <button onClick={onRemove} className="btn btn-danger" style={{ fontSize: 10 }}>
              Hapus coach
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ Tab: FAQ ============
function TabFAQ() {
  const items = window.CMSStore?.getValue('faq.items') || [];
  const addFaq = () => {
    const next = [...items, { q: 'Pertanyaan baru', a: 'Jawaban baru.' }];
    window.CMSStore.setKey('faq.items', next);
  };
  const removeFaq = (idx) => {
    if (!confirm('Hapus FAQ ini?')) return;
    window.CMSStore.setKey('faq.items', items.filter((_, i) => i !== idx));
  };
  return (
    <>
      <Section title="FAQ Header">
        <TextField path="faq.title" label="Judul" rows={2} />
      </Section>

      <Section title="Pertanyaan & Jawaban" desc="Tambah / edit / hapus FAQ.">
        {items.map((f, i) => (
          <div key={i} style={{
            padding: 14, background: 'var(--bg)',
            border: '1px solid var(--line-soft)', borderRadius: 8, marginBottom: 10,
          }}>
            <TextField path={`faq.items.${i}.q`} label={`Pertanyaan #${i + 1}`} />
            <TextField path={`faq.items.${i}.a`} label="Jawaban" rows={3} />
            <div style={{ textAlign: 'right' }}>
              <button onClick={() => removeFaq(i)} className="btn btn-danger" style={{ fontSize: 10 }}>
                Hapus
              </button>
            </div>
          </div>
        ))}
        <button onClick={addFaq} className="btn btn-ghost" style={{ fontSize: 11 }}>
          + Tambah FAQ
        </button>
      </Section>
    </>
  );
}

// ============ Tab: Form ============
function TabForm() {
  const fields = window.CMSStore?.getValue('form.fields') || [];

  const move = (idx, dir) => {
    const newFields = [...fields];
    const j = idx + dir;
    if (j < 0 || j >= newFields.length) return;
    [newFields[idx], newFields[j]] = [newFields[j], newFields[idx]];
    window.CMSStore.setKey('form.fields', newFields);
  };
  const remove = (idx) => {
    const newFields = fields.filter((_, i) => i !== idx);
    window.CMSStore.setKey('form.fields', newFields);
  };
  const add = () => {
    const id = 'field_' + Date.now();
    const newFields = [...fields, { id, label: 'Field baru', type: 'text', required: false, placeholder: '' }];
    window.CMSStore.setKey('form.fields', newFields);
  };

  return (
    <>
      <Section title="Form Section Copy">
        <TextField path="form.title" label="Judul" rows={2} />
        <TextField path="form.lede" label="Sub-copy" rows={4} />
        <TextField path="form.benefitsHead" label="Benefits header" />
        <TextField path="form.submitLabel" label="Tombol submit" />
        <TextField path="form.successTitle" label="Success title" />
        <TextField path="form.successBody" label="Success body" rows={2} />
      </Section>

      <Section
        title="Founding Batch Assignment"
        desc="Default: slot gelombang ditetapkan otomatis berdasarkan ketersediaan. Calon member tidak perlu memilih. Form menampilkan info 'Kamu akan masuk Gelombang X · Rp Y · tersisa Z slot' secara real-time. Kalau semua founding batch penuh, sistem kasih info 'Founding tutup, masuk waiting list reguler'."
      >
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', padding: '8px 0' }}>
          <input
            type="checkbox"
            checked={!!window.CMSStore?.getValue('form.showBatchPicker')}
            onChange={(e) => window.CMSStore.setKey('form.showBatchPicker', e.target.checked)}
            style={{ marginTop: 3 }}
          />
          <div>
            <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>
              Advanced: tampilkan picker gelombang manual
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 3, lineHeight: 1.5 }}>
              Biarkan OFF untuk auto-assign (rekomendasi). ON hanya kalau tim Anda butuh kasih pilihan ke calon member (misal untuk test internal).
            </div>
          </div>
        </label>
      </Section>

      <Section title="Form Fields" desc="Atur field formulir pendaftaran. Bisa tambah, hapus, ubah urutan, atau ubah tipe.">
        {fields.map((fd, i) => (
          <FormFieldEditor
            key={fd.id || i}
            idx={i}
            field={fd}
            canMoveUp={i > 0}
            canMoveDown={i < fields.length - 1}
            onMove={move}
            onRemove={remove}
          />
        ))}
        <div style={{ marginTop: 12 }}>
          <button onClick={add} className="btn btn-ghost" style={{ fontSize: 11 }}>
            + Tambah field
          </button>
        </div>
      </Section>

      <Section title="Disclaimer / Offer Window">
        <TextField path="founding.disclaimer" label="Disclaimer copy" rows={3} />
        <TextField path="founding.ctaLabel" label="CTA button label (pricing link)" />
      </Section>
    </>
  );
}

// ============ Tab: Brand ============
function TabBrand({ flash }) {
  const [mono, setMono] = React.useState(() => {
    try { return localStorage.getItem('samase_brand_monogram') || ''; } catch (_) { return ''; }
  });

  const handleUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!/svg/i.test(file.type) && !/\.svg$/i.test(file.name)) {
      flash('File harus format SVG', 'err');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const txt = ev.target.result;
      try {
        localStorage.setItem('samase_brand_monogram', txt);
        setMono(txt);
        window.CMSStore.setKey('brand.logo.monogramVersion', Date.now());
        flash('Logo berhasil diupload', 'ok');
      } catch (err) {
        flash('Gagal simpan: ' + err.message, 'err');
      }
    };
    reader.readAsText(file);
  };

  const reset = () => {
    if (!confirm('Reset logo ke default?')) return;
    try { localStorage.removeItem('samase_brand_monogram'); } catch (_) {}
    setMono('');
    window.CMSStore.setKey('brand.logo.monogramVersion', Date.now());
    flash('Logo direset ke default', 'ok');
  };

  return (
    <>
      <Section title="Brand Name" desc="Nama resmi yang tampil di meta tag dan footer.">
        <TextField path="brand.name" label="Brand name" />
        <TextField path="brand.tag" label="Tag / sub-brand" />
      </Section>

      <Section title="Logo" desc="Upload file SVG logo SAMASE. Sesuaikan dengan guideline di bawah supaya tampilan konsisten di semua halaman.">
        <LogoUploader
          svgText={mono}
          onUpload={handleUpload}
          onReset={reset}
        />
      </Section>

      <LogoGuidelines />

      <Section title="Partner Link">
        <TextField path="physio.partner.url" label="Bebascedera URL" />
      </Section>
    </>
  );
}

// ============ Logo Guidelines ============
function LogoGuidelines() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h3 className="samase-display" style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 400 }}>
        Guideline Logo
      </h3>
      <p style={{ margin: '0 0 18px', color: 'var(--ink-mute)', fontSize: 13, lineHeight: 1.5 }}>
        Spesifikasi file yang direkomendasikan supaya logo tampil tajam di semua ukuran dan device.
      </p>

      <div style={{
        background: '#FFFFFF', border: '1px solid var(--line-soft)',
        borderRadius: 12, padding: 22,
      }}>
        {/* Format */}
        <GuidelineRow
          label="Format file"
          value="SVG (wajib)"
          note="Vector. Tajam di semua ukuran, ukuran file kecil, bisa diwarnai via CSS."
        />
        <GuidelineRow
          label="Backup format"
          value="PNG transparent 2000×1100px (opsional)"
          note="Kalau perlu raster untuk tempat yang tidak support SVG. Simpan terpisah, jangan upload di sini."
        />

        <Divider />

        {/* Ratio */}
        <GuidelineRow
          label="Rasio (aspect ratio)"
          value="20 : 11"
          note="ViewBox direkomendasikan: 0 0 400 220 atau kelipatannya (800×440, 1000×550). Lebar selalu lebih besar dari tinggi."
        />
        <GuidelineRow
          label="Ukuran canvas SVG"
          value="viewBox=0 0 400 220"
          note="Angka persis tidak wajib, tapi rasionya harus 20:11 (±2%). Kalau logo kamu square (1:1), kasih padding kiri-kanan supaya total viewBox 20:11."
        />

        <Divider />

        {/* Construction */}
        <GuidelineRow
          label="Padding internal"
          value="Min 10% di setiap sisi"
          note="Jangan bikin graphic menempel ke edge viewBox. Beri ruang napas ±40px jika viewBox 400×220."
        />
        <GuidelineRow
          label="Stroke width"
          value="Konvert ke fill"
          note="Jangan pakai stroke di SVG. Convert jadi path filled. Stroke berubah ukurannya saat di-scale dan bisa terlihat tipis."
        />
        <GuidelineRow
          label="Warna"
          value={<code style={{ background: 'var(--bg)', padding: '1px 6px', borderRadius: 3, fontSize: 11 }}>fill="currentColor"</code>}
          note="Semua path pakai fill=currentColor (bukan warna spesifik). Logo otomatis ikut warna teks di sekitarnya (dark mode, variant warna, dll)."
        />

        <Divider />

        {/* Usage */}
        <GuidelineRow
          label="Tempat logo dipakai"
          value="Navbar · Footer · Favicon · OG image"
          note="Otomatis muncul di navbar (size 26px), footer (20px), dan dipakai sebagai monogram di semua section."
        />
        <GuidelineRow
          label="Ukuran terkecil"
          value="20px tinggi"
          note="Detail harus masih kebaca di 20px. Kalau logo punya detail halus, sederhanakan."
        />
        <GuidelineRow
          label="Background aman"
          value="Cream · Ink dark · White"
          note="Logo harus tetap kebaca di 3 background utama SAMASE. Pakai currentColor supaya kontras otomatis."
        />

        <Divider />

        {/* Don'ts */}
        <div style={{ marginTop: 6 }}>
          <div className="samase-mono" style={{
            fontSize: 9, letterSpacing: '0.16em', color: 'var(--accent)',
            textTransform: 'uppercase', marginBottom: 10,
          }}>
            Jangan
          </div>
          <ul style={{
            margin: 0, paddingLeft: 18, color: 'var(--ink-soft)',
            fontSize: 12, lineHeight: 1.8,
          }}>
            <li>Pakai PNG atau JPG. Selalu SVG.</li>
            <li>Hardcode warna hex di dalam SVG. Pakai currentColor.</li>
            <li>Embed raster image di dalam SVG. Harus pure path/shape.</li>
            <li>Attribut width/height pada tag {'<svg>'}. Cukup viewBox.</li>
            <li>Logo dengan rasio square (1:1) tanpa padding. Extend ke 20:11.</li>
          </ul>
        </div>

        <Divider />

        {/* Template */}
        <div style={{
          padding: 14, background: 'var(--bg)', border: '1px solid var(--line-soft)',
          borderRadius: 8, marginTop: 10,
        }}>
          <div className="samase-mono" style={{
            fontSize: 9, letterSpacing: '0.14em', color: 'var(--ink-mute)',
            textTransform: 'uppercase', marginBottom: 8,
          }}>
            Template SVG yang benar
          </div>
          <pre style={{
            margin: 0, fontSize: 11, color: 'var(--ink)',
            fontFamily: "'JetBrains Mono', monospace",
            background: '#FFFFFF', padding: 12, borderRadius: 6,
            border: '1px solid var(--line-soft)',
            overflow: 'auto', lineHeight: 1.5,
          }}>{`<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 400 220"
     aria-label="SAMASE">
  <path d="..." fill="currentColor"/>
</svg>`}</pre>
        </div>

        {/* File naming */}
        <GuidelineRow
          label="Nama file"
          value="samase-logo.svg"
          note="Lowercase, tanpa spasi, pakai tanda hubung. Hindari versi di nama file (misal logo-final-v2.svg)."
        />

        {/* Size limit */}
        <GuidelineRow
          label="Ukuran file"
          value="< 20 KB"
          note="SVG clean biasanya < 5KB. Kalau lebih besar, kemungkinan ada raster atau metadata editor. Bersihkan via SVGO atau di Illustrator: File > Export > SVG > Minify."
          last
        />
      </div>
    </section>
  );
}

function GuidelineRow({ label, value, note, last }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gap: 20,
      padding: '12px 0',
      borderBottom: last ? 'none' : '1px dashed var(--line-soft)',
      alignItems: 'start',
    }}>
      <div className="samase-mono" style={{
        fontSize: 10, color: 'var(--ink-mute)',
        letterSpacing: '0.08em', textTransform: 'uppercase',
        paddingTop: 2,
      }}>
        {label}
      </div>
      <div>
        <div style={{ fontSize: 14, color: 'var(--ink)', fontWeight: 500, marginBottom: 4 }}>
          {value}
        </div>
        {note && (
          <div style={{ fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
            {note}
          </div>
        )}
      </div>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: 'var(--line-soft)', margin: '6px 0' }} />;
}

function LogoUploader({ svgText, onUpload, onReset }) {
  const inputRef = React.useRef(null);
  const hasCustom = !!svgText;
  return (
    <div>
      {/* Preview — 3 backgrounds to check all palette variants */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
        marginBottom: 14,
      }}>
        <LogoSwatch svgText={svgText} bg="#F2EEE5" color="#1C1A17" label="Cream" />
        <LogoSwatch svgText={svgText} bg="#141414" color="#F2EEE5" label="Ink" />
        <LogoSwatch svgText={svgText} bg="#FFFFFF" color="#A94E2C" label="Accent" />
      </div>

      {/* Size preview row */}
      <div style={{
        padding: 14, background: 'var(--bg)', borderRadius: 8,
        marginBottom: 14, display: 'flex', alignItems: 'center',
        gap: 28, flexWrap: 'wrap',
      }}>
        <div className="samase-mono" style={{
          fontSize: 9, letterSpacing: '0.12em', color: 'var(--ink-mute)',
          textTransform: 'uppercase',
        }}>Size check</div>
        {[20, 32, 48, 72].map(h => (
          <LogoSizePreview key={h} svgText={svgText} height={h} />
        ))}
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span className="samase-mono" style={{
          fontSize: 9, color: hasCustom ? 'var(--accent)' : 'var(--ink-mute)',
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          {hasCustom ? '✓ Logo custom aktif' : 'Menggunakan logo default'}
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            ref={inputRef}
            type="file"
            accept=".svg,image/svg+xml"
            onChange={onUpload}
            style={{ display: 'none' }}
          />
          <button onClick={() => inputRef.current && inputRef.current.click()} className="btn btn-primary" style={{ fontSize: 11 }}>
            {hasCustom ? 'Ganti SVG' : 'Upload SVG'}
          </button>
          {hasCustom && (
            <button onClick={onReset} className="btn btn-ghost" style={{ fontSize: 11 }}>
              Reset ke default
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function LogoSwatch({ svgText, bg, color, label }) {
  const preview = svgText || (window.SamaseMarkDefaultSvg || '');
  return (
    <div>
      <div style={{
        height: 90, background: bg, color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 14, borderRadius: 8, border: '1px solid var(--line-soft)',
        overflow: 'hidden',
      }}>
        {preview ? (
          <span
            style={{ display: 'inline-flex', maxHeight: 62, maxWidth: '100%' }}
            dangerouslySetInnerHTML={{
              __html: preview.replace(/<svg\b([^>]*)>/i, (m, a) => {
                const clean = a.replace(/\swidth="[^"]*"/gi, '').replace(/\sheight="[^"]*"/gi, '');
                return `<svg${clean} style="height:62px;width:auto">`;
              }),
            }}
          />
        ) : (
          <span className="samase-mono" style={{ opacity: 0.45, fontSize: 9 }}>no preview</span>
        )}
      </div>
      <div className="samase-mono" style={{
        fontSize: 8, color: 'var(--ink-mute)', letterSpacing: '0.12em',
        textTransform: 'uppercase', marginTop: 6, textAlign: 'center',
      }}>{label}</div>
    </div>
  );
}

function LogoSizePreview({ svgText, height }) {
  const preview = svgText || (window.SamaseMarkDefaultSvg || '');
  if (!preview) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: 'var(--ink)' }}>
      <span
        style={{ display: 'inline-flex', height }}
        dangerouslySetInnerHTML={{
          __html: preview.replace(/<svg\b([^>]*)>/i, (m, a) => {
            const clean = a.replace(/\swidth="[^"]*"/gi, '').replace(/\sheight="[^"]*"/gi, '');
            return `<svg${clean} style="height:${height}px;width:auto">`;
          }),
        }}
      />
      <span className="samase-mono" style={{ fontSize: 8, color: 'var(--ink-mute)', letterSpacing: '0.08em' }}>
        {height}px
      </span>
    </div>
  );
}

// ============ Tab: Advanced ============
function TabAdvanced({ flash }) {
  const [importText, setImportText] = React.useState('');
  const overrides = window.CMSStore?.getOverrides() || {};
  const overrideCount = Object.keys(overrides).length;

  const doExport = () => {
    const json = window.CMSStore.export();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    a.href = url;
    a.download = `samase-cms-backup-${ts}.json`;
    a.click();
    URL.revokeObjectURL(url);
    flash('Backup JSON berhasil diunduh', 'ok');
  };

  const doImport = () => {
    try {
      window.CMSStore.import(importText);
      flash('Import berhasil — semua konten diperbarui', 'ok');
      setImportText('');
    } catch (err) {
      flash('Gagal import: ' + err.message, 'err');
    }
  };

  const doReset = () => {
    if (!confirm('Yakin hapus semua perubahan dan kembali ke default? Tidak bisa di-undo.')) return;
    window.CMSStore.reset();
    flash('Semua perubahan dihapus — kembali ke default', 'ok');
  };

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImportText(ev.target.result);
    reader.readAsText(file);
  };

  return (
    <>
      <Section title="Export Backup" desc="Download file JSON berisi semua perubahan CMS. Simpan sebagai backup.">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <div style={{ fontSize: 14, marginBottom: 4 }}>
              {overrideCount === 0
                ? 'Belum ada perubahan untuk di-backup.'
                : `${overrideCount} section sudah di-customize.`}
            </div>
            <div className="samase-mono" style={{ fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.08em' }}>
              localStorage.samase_cms_v1 · {(JSON.stringify(overrides).length / 1024).toFixed(1)} KB
            </div>
          </div>
          <button onClick={doExport} className="btn btn-primary">
            ⬇ Download JSON
          </button>
        </div>
      </Section>

      <Section title="Import / Restore" desc="Upload file JSON backup untuk me-restore semua perubahan.">
        <input
          type="file"
          accept="application/json,.json"
          onChange={handleFile}
          style={{ marginBottom: 12, fontSize: 12 }}
        />
        <textarea
          className="inp"
          rows={6}
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          placeholder='Paste JSON backup di sini… atau upload file di atas.'
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11, lineHeight: 1.5,
          }}
        />
        <div style={{ marginTop: 12, textAlign: 'right' }}>
          <button
            onClick={doImport}
            className="btn btn-primary"
            disabled={!importText.trim()}
            style={{ opacity: importText.trim() ? 1 : 0.4 }}
          >
            Import & Replace
          </button>
        </div>
      </Section>

      <Section title="Reset Semua" desc="Hapus semua perubahan CMS. Landing page kembali ke default.">
        <button onClick={doReset} className="btn btn-danger">
          ↺ Reset semua ke default
        </button>
      </Section>

      <Section title="Cara Akses Admin dari Landing Page">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          <div>
            <strong style={{ color: 'var(--ink)' }}>1. Klik pill bulat kecil di kanan bawah</strong><br />
            Ada titik berkedip warna gold di pojok kanan bawah landing page. Klik untuk buka admin di tab baru.
          </div>
          <div>
            <strong style={{ color: 'var(--ink)' }}>2. Keyboard shortcut:</strong> <kbd>Ctrl/Cmd</kbd> + <kbd>.</kbd> (titik)<br />
            Buka admin langsung tanpa perlu cari pill-nya.
          </div>
          <div>
            <strong style={{ color: 'var(--ink)' }}>3. URL langsung:</strong> <kbd>/admin.html</kbd><br />
            Ketik manual di address bar, atau bookmark untuk akses cepat.
          </div>
          <div style={{ paddingTop: 10, borderTop: '1px solid var(--line-soft)', marginTop: 4 }}>
            <strong style={{ color: 'var(--ink)' }}>Sembunyikan pill saat demo/presentasi:</strong><br />
            Tekan <kbd>Ctrl/Cmd</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> untuk hide pill. Tekan lagi untuk show. Setting tersimpan per session.
          </div>
        </div>
      </Section>
    </>
  );
}

// ============ Tab: Contact & Social ============
function TabContact() {
  return (
    <>
      <Section title="Contact Channels" desc="Nomor & email utama. Dipakai di footer, form confirmation, dan fallback CTA.">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <TextField path="contact.whatsapp" label="WhatsApp Display" placeholder="+62 811-1234-5678" />
          <TextField path="contact.whatsappUrl" label="WhatsApp URL (wa.me)" placeholder="https://wa.me/628111234567" />
        </div>
        <TextField path="contact.email" label="Email" placeholder="hello@samasesportsclub.com" />
      </Section>

      <Section title="Social Media" desc="Handle + URL. Kosongkan jika belum aktif — icon akan ter-hide otomatis.">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <TextField path="contact.instagram" label="Instagram handle" placeholder="@samasesportsclub" />
          <TextField path="contact.instagramUrl" label="Instagram URL" placeholder="https://instagram.com/…" />
          <TextField path="contact.tiktok" label="TikTok handle" placeholder="@samasesportsclub" />
          <TextField path="contact.tiktokUrl" label="TikTok URL" placeholder="https://tiktok.com/@…" />
        </div>
      </Section>

      <Section title="Alamat & Lokasi">
        <TextField path="contact.addressLine1" label="Alamat baris 1" />
        <TextField path="contact.addressLine2" label="Alamat baris 2" />
        <TextField path="contact.mapsUrl" label="Google Maps URL"
          hint="Dipakai di footer 'Lihat di peta'." />
      </Section>

      <Section title="Legal / Footer">
        <TextField path="legal.copyright" label="Copyright line" />
        <TextField path="legal.registrationNote" label="Registrasi / badan hukum" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <TextField path="legal.privacyUrl" label="Privacy Policy URL" />
          <TextField path="legal.termsUrl" label="Terms of Service URL" />
        </div>
      </Section>
    </>
  );
}

// ============ Tab: SEO / Meta ============
function TabSEO() {
  return (
    <>
      <Section title="Page Meta" desc="Title tag & description untuk Google + share cards. Landing page membaca nilai ini saat load.">
        <TextField path="seo.title" label="Title tag" hint="55–60 karakter optimal. Tampil di tab browser & Google." />
        <TextField path="seo.description" label="Meta description" rows={3}
          hint="150–160 karakter. Tampil di Google snippet & social share." />
        <TextField path="seo.keywords" label="Keywords (opsional)" rows={2}
          hint="Pisah koma. Modern SEO tidak begitu pakai, tapi tetap tersimpan." />
      </Section>

      <Section title="Open Graph / Social Share">
        <TextField path="seo.ogImage" label="OG Image URL" placeholder="brand/og-image.jpg"
          hint="1200×630px optimal. Path relatif atau URL penuh." />
        <TextField path="seo.themeColor" label="Theme color (hex)" placeholder="#A94E2C"
          hint="Warna address-bar di mobile & PWA." />
        <TextField path="seo.favicon" label="Favicon URL" placeholder="brand/favicon.svg" />
      </Section>
    </>
  );
}

// ============ Tab: Announcement Banner ============
function TabAnnouncement() {
  const enabled = window.CMSStore?.getValue('announcement.enabled');
  return (
    <>
      <Section title="Banner Switch" desc="Strip tipis di paling atas landing page. Biasanya untuk urgency, deadline, atau launch message.">
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: 14, background: 'var(--bg)',
          border: '1px solid var(--line-soft)', borderRadius: 10,
        }}>
          <button
            onClick={() => window.CMSStore.setKey('announcement.enabled', !enabled)}
            style={{
              width: 44, height: 26, borderRadius: 999,
              background: enabled ? 'var(--accent)' : 'var(--line)',
              border: 'none', cursor: 'pointer', position: 'relative',
              transition: 'background 160ms',
            }}
          >
            <span style={{
              position: 'absolute', top: 3, left: enabled ? 21 : 3,
              width: 20, height: 20, borderRadius: '50%',
              background: '#FFFFFF', transition: 'left 160ms',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}/>
          </button>
          <div>
            <div style={{ fontWeight: 500, fontSize: 13 }}>
              {enabled ? 'Banner AKTIF — tampil di atas landing page' : 'Banner NONAKTIF — tidak tampil'}
            </div>
            <div className="samase-mono" style={{ fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.05em', marginTop: 4 }}>
              Toggle changes take effect immediately on landing page.
            </div>
          </div>
        </div>
      </Section>

      <Section title="Banner Content">
        <TextField path="announcement.message" label="Pesan" rows={2}
          hint="Emoji OK. Contoh: '🎉 Founding Visionary tinggal 22 slot'" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <TextField path="announcement.linkLabel" label="Link label" placeholder="Amankan slot" />
          <TextField path="announcement.linkUrl" label="Link URL" placeholder="#founding" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <TextField path="announcement.bg" label="Background (hex)" placeholder="#1C1A17" />
          <TextField path="announcement.fg" label="Foreground (hex)" placeholder="#F2EEE5" />
        </div>
      </Section>

      <Section title="Preview" desc="Bagaimana banner terlihat di landing page.">
        <div style={{
          background: window.CMSStore?.getValue('announcement.bg') || '#1C1A17',
          color: window.CMSStore?.getValue('announcement.fg') || '#F2EEE5',
          padding: '12px 18px', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18,
          fontSize: 13,
        }}>
          <span>{window.CMSStore?.getValue('announcement.message')}</span>
          <span style={{ opacity: 0.85, textDecoration: 'underline', fontSize: 12 }}>
            {window.CMSStore?.getValue('announcement.linkLabel')} →
          </span>
        </div>
      </Section>
    </>
  );
}

// ============ Tab: Pricing Page ============
function TabPricing() {
  return (
    <>
      <Section title="Pricing Hero" desc="Copy di atas halaman Pricing.html — kicker, title, lede.">
        <TextField path="pricing.hero.kicker" label="Kicker" />
        <TextField path="pricing.hero.title" label="Judul" rows={2} />
        <TextField path="pricing.hero.lede" label="Lede" rows={3} />
      </Section>

      <Section title="Pricing Disclaimer" desc="Kalimat disclaimer yang tampil di bawah pricing grid.">
        <TextField path="pricing.disclaimer" label="Disclaimer" rows={3} />
      </Section>

      <Section title="Harga Paket — Per Gelombang"
        desc="Harga open gym 3 bulan untuk tiap batch. Harga normal adalah angka coret-coret di atasnya.">
        {(window.CMSStore?.getValue('founding.batches') || []).map((b, i) => (
          <div key={b.id} style={{
            padding: 14, background: 'var(--bg)',
            border: '1px solid var(--line-soft)', borderRadius: 8, marginBottom: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
              <span className="samase-display" style={{ fontSize: 18 }}>{b.label}</span>
              <span className="samase-mono" style={{ fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.1em' }}>
                {b.gelombang}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <NumberField path={`founding.batches.${i}.priceOpenGym3M`} label="Harga Open Gym 3M" min={0} />
              <NumberField path={`founding.batches.${i}.priceOpenGym3MNormal`} label="Harga Normal (coret)" min={0} />
            </div>
          </div>
        ))}
      </Section>
    </>
  );
}

// ============ FormFieldEditor ============
function FormFieldEditor({ field, idx, canMoveUp, canMoveDown, onMove, onRemove }) {
  const base = `form.fields.${idx}`;
  const [open, setOpen] = React.useState(false);
  const typeOpts = [
    { value: 'text', label: 'Text' },
    { value: 'email', label: 'Email' },
    { value: 'tel', label: 'Phone' },
    { value: 'select', label: 'Select (dropdown)' },
    { value: 'textarea', label: 'Textarea' },
  ];
  return (
    <div style={{
      border: '1px solid var(--line-soft)', borderRadius: 10,
      marginBottom: 8, background: 'var(--bg)',
    }}>
      <div style={{
        padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <button onClick={() => onMove(idx, -1)} disabled={!canMoveUp} style={{
            width: 18, height: 14, border: 'none', background: 'transparent',
            cursor: canMoveUp ? 'pointer' : 'default', opacity: canMoveUp ? 1 : 0.3,
            color: 'var(--ink-mute)', fontSize: 10, padding: 0,
          }}>▲</button>
          <button onClick={() => onMove(idx, 1)} disabled={!canMoveDown} style={{
            width: 18, height: 14, border: 'none', background: 'transparent',
            cursor: canMoveDown ? 'pointer' : 'default', opacity: canMoveDown ? 1 : 0.3,
            color: 'var(--ink-mute)', fontSize: 10, padding: 0,
          }}>▼</button>
        </div>
        <button onClick={() => setOpen(!open)} style={{
          flex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: 'inherit', textAlign: 'left', padding: 0,
        }}>
          <div style={{ fontWeight: 500, fontSize: 13 }}>{field.label || '(tanpa label)'}</div>
          <div className="samase-mono" style={{
            fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.08em',
            textTransform: 'uppercase', marginTop: 2,
          }}>
            {field.type || 'text'} {field.required ? '· required' : ''} {field.id ? `· ${field.id}` : ''}
          </div>
        </button>
        <button onClick={() => onRemove(idx)} className="btn btn-danger" style={{ fontSize: 9 }}>
          Hapus
        </button>
      </div>
      {open && (
        <div style={{ padding: '0 14px 14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <TextField path={`${base}.label`} label="Label" />
            <TextField path={`${base}.id`} label="Field ID" hint="Tanpa spasi. Contoh: phone, email" />
          </div>
          <SelectField path={`${base}.type`} label="Tipe" options={typeOpts} />
          <TextField path={`${base}.placeholder`} label="Placeholder" />
          <Field label="Required">
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={!!field.required}
                onChange={(e) => window.CMSStore.setKey(`${base}.required`, e.target.checked)}
                style={{ width: 16, height: 16, accentColor: 'var(--accent)' }}
              />
              <span style={{ fontSize: 12 }}>Field ini wajib diisi</span>
            </label>
          </Field>
          {field.type === 'select' && (
            <TagListField path={`${base}.options`} label="Pilihan (satu per baris / pisah koma)"
              hint="Contoh: Visionary, Pioneer, Founder" />
          )}
        </div>
      )}
    </div>
  );
}

// ============ Tab: AI Search ============
function TabAI({ flash }) {
  const enabled = !!window.CMSStore?.getValue('ai.enabled');
  const suggestions = window.CMSStore?.getValue('ai.suggestions') || [];

  const addSug = () => {
    const v = prompt('Contoh pertanyaan:');
    if (!v) return;
    window.CMSStore.setKey('ai.suggestions', [...suggestions, v]);
  };
  const removeSug = (i) => {
    window.CMSStore.setKey('ai.suggestions', suggestions.filter((_, j) => j !== i));
  };

  return (
    <>
      <Section title="AI Search Assistant" desc="Widget tanya-jawab di hero. Pengunjung bisa tanya langsung soal SAMASE, program, harga, dll. Dibantu AI yang grounded ke konten landing page.">
        <Field label="Status">
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => window.CMSStore.setKey('ai.enabled', e.target.checked)}
              style={{ width: 18, height: 18, accentColor: 'var(--accent)' }}
            />
            <span style={{ fontSize: 13 }}>{enabled ? 'Aktif · widget tampil di hero' : 'Nonaktif · widget tersembunyi'}</span>
          </label>
        </Field>
      </Section>

      <Section title="Widget Copy">
        <TextField path="ai.kicker" label="Kicker label" placeholder="Tanya langsung" />
        <TextField path="ai.placeholder" label="Input placeholder" />
        <TextField path="ai.greeting" label="Greeting message" rows={3}
          hint="Pesan pembuka saat widget dibuka pertama kali." />
        <TextField path="ai.disclaimer" label="Disclaimer" rows={2} />
      </Section>

      <Section title="Contoh Pertanyaan" desc="Pertanyaan yang muncul sebagai quick buttons saat widget dibuka.">
        {suggestions.map((s, i) => (
          <div key={i} style={{
            display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center',
          }}>
            <input
              type="text"
              className="inp"
              value={s}
              onChange={(e) => {
                const next = [...suggestions];
                next[i] = e.target.value;
                window.CMSStore.setKey('ai.suggestions', next);
              }}
            />
            <button onClick={() => removeSug(i)} className="btn btn-danger" style={{ fontSize: 10 }}>×</button>
          </div>
        ))}
        <button onClick={addSug} className="btn btn-ghost" style={{ fontSize: 11 }}>+ Tambah contoh pertanyaan</button>
      </Section>

      <Section title="Custom Knowledge (opsional)"
        desc="Info tambahan yang akan dimasukkan ke konteks AI. Contoh: kebijakan refund, detail teknis, aturan-aturan khusus. Makin spesifik, makin akurat jawaban.">
        <TextField path="ai.customKnowledge" label="Knowledge tambahan" rows={8}
          placeholder="Contoh: Refund 100% berlaku dalam 7 hari pertama. Padel court tersedia dari jam 06.00-22.00 WIB. Dress code: sopan dan tertutup (khusus akhwat area)." />
      </Section>
    </>
  );
}

// ============ Tab: Schedule ============
function TabSchedule() {
  const items = window.CMSStore?.getValue('schedule.items') || [];
  const days = window.CMSStore?.getValue('schedule.days') || ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const enabled = !!window.CMSStore?.getValue('schedule.enabled');

  const add = () => {
    const next = [...items, {
      day: days[0], time: '07:00', className: 'Kelas Baru',
      coach: '', audience: 'Mixed', spots: 8,
    }];
    window.CMSStore.setKey('schedule.items', next);
  };
  const remove = (i) => {
    window.CMSStore.setKey('schedule.items', items.filter((_, j) => j !== i));
  };
  const dupl = (i) => {
    const next = [...items];
    next.splice(i + 1, 0, { ...items[i] });
    window.CMSStore.setKey('schedule.items', next);
  };

  return (
    <>
      <Section title="Schedule Switch">
        <Field label="Aktifkan section jadwal">
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => window.CMSStore.setKey('schedule.enabled', e.target.checked)}
              style={{ width: 18, height: 18, accentColor: 'var(--accent)' }}
            />
            <span style={{ fontSize: 13 }}>{enabled ? 'Tampil di landing page' : 'Tersembunyi'}</span>
          </label>
        </Field>
      </Section>

      <Section title="Header">
        <TextField path="schedule.title" label="Judul" rows={2} />
        <TextField path="schedule.lede" label="Sub-copy" rows={3} />
      </Section>

      <Section title="Daftar Kelas" desc="Setiap row = 1 sesi kelas. Group by day ditangani otomatis di halaman.">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '80px 70px 1fr 1fr 100px 60px 80px',
          gap: 8, padding: '8px 10px',
          fontSize: 9, letterSpacing: '0.12em',
          color: 'var(--ink-mute)',
          fontFamily: "'JetBrains Mono', monospace",
          textTransform: 'uppercase',
          borderBottom: '1px solid var(--line)',
        }}>
          <span>Hari</span><span>Jam</span><span>Kelas</span><span>Coach</span><span>Audience</span><span>Slot</span><span></span>
        </div>
        {items.map((it, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '80px 70px 1fr 1fr 100px 60px 80px',
            gap: 8, padding: '6px 10px',
            alignItems: 'center',
            borderBottom: '1px solid var(--line-soft)',
          }}>
            <select
              className="inp"
              value={it.day || days[0]}
              onChange={(e) => window.CMSStore.setKey(`schedule.items.${i}.day`, e.target.value)}
              style={{ fontSize: 11, padding: '4px 6px' }}
            >
              {days.map(d => <option key={d} value={d}>{d.slice(0, 3)}</option>)}
            </select>
            <input type="text" className="inp" value={it.time || ''}
              onChange={(e) => window.CMSStore.setKey(`schedule.items.${i}.time`, e.target.value)}
              style={{ fontSize: 11, padding: '4px 6px' }} placeholder="07:00" />
            <input type="text" className="inp" value={it.className || ''}
              onChange={(e) => window.CMSStore.setKey(`schedule.items.${i}.className`, e.target.value)}
              style={{ fontSize: 11, padding: '4px 6px' }} placeholder="Nama kelas" />
            <input type="text" className="inp" value={it.coach || ''}
              onChange={(e) => window.CMSStore.setKey(`schedule.items.${i}.coach`, e.target.value)}
              style={{ fontSize: 11, padding: '4px 6px' }} placeholder="Coach" />
            <input type="text" className="inp" value={it.audience || ''}
              onChange={(e) => window.CMSStore.setKey(`schedule.items.${i}.audience`, e.target.value)}
              style={{ fontSize: 11, padding: '4px 6px' }} placeholder="Mixed" />
            <input type="number" className="inp" value={it.spots || 0}
              onChange={(e) => window.CMSStore.setKey(`schedule.items.${i}.spots`, parseInt(e.target.value || '0', 10))}
              style={{ fontSize: 11, padding: '4px 6px' }} />
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => dupl(i)} style={{
                fontSize: 10, padding: '3px 6px', border: '1px solid var(--line)',
                background: 'transparent', color: 'var(--ink-mute)', borderRadius: 4,
                cursor: 'pointer', fontFamily: 'inherit',
              }} title="Duplikat">⎘</button>
              <button onClick={() => remove(i)} style={{
                fontSize: 10, padding: '3px 6px', border: 'none',
                background: 'var(--accent)', color: 'var(--bg)', borderRadius: 4,
                cursor: 'pointer', fontFamily: 'inherit',
              }} title="Hapus">×</button>
            </div>
          </div>
        ))}
        <button onClick={add} className="btn btn-ghost" style={{ fontSize: 11, marginTop: 10 }}>
          + Tambah kelas
        </button>
      </Section>
    </>
  );
}

// ============ Tab: Blog ============
function TabBlog() {
  const items = window.CMSStore?.getValue('blog.items') || [];
  const enabled = !!window.CMSStore?.getValue('blog.enabled');

  const add = () => {
    const id = 'post_' + Date.now();
    const next = [...items, {
      id, slug: id, title: 'Artikel baru', category: 'Journal',
      date: new Date().toISOString().slice(0, 10),
      author: '', excerpt: '', cover: '', body: '',
    }];
    window.CMSStore.setKey('blog.items', next);
  };
  const remove = (i) => {
    window.CMSStore.setKey('blog.items', items.filter((_, j) => j !== i));
  };

  return (
    <>
      <Section title="Journal Switch">
        <Field label="Aktifkan section journal">
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => window.CMSStore.setKey('blog.enabled', e.target.checked)}
              style={{ width: 18, height: 18, accentColor: 'var(--accent)' }}
            />
            <span style={{ fontSize: 13 }}>{enabled ? 'Tampil di landing page' : 'Tersembunyi'}</span>
          </label>
        </Field>
      </Section>

      <Section title="Header">
        <TextField path="blog.title" label="Judul" rows={2} />
        <TextField path="blog.lede" label="Sub-copy" rows={2} />
      </Section>

      <Section title="Artikel" desc="Artikel pendek tentang filosofi, tips latihan, cerita komunitas.">
        {items.map((it, i) => (
          <BlogPostEditor key={it.id || i} idx={i} post={it} onRemove={() => remove(i)} />
        ))}
        <button onClick={add} className="btn btn-ghost" style={{ fontSize: 11, marginTop: 10 }}>
          + Tambah artikel
        </button>
      </Section>
    </>
  );
}

function BlogPostEditor({ post, idx, onRemove }) {
  const base = `blog.items.${idx}`;
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{
      border: '1px solid var(--line-soft)', borderRadius: 10,
      marginBottom: 10, background: 'var(--bg)',
    }}>
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 48, height: 36, borderRadius: 4,
          background: post.cover ? `url(${post.cover}) center/cover` : 'var(--bg-elev)',
          border: '1px solid var(--line)',
          display: 'grid', placeItems: 'center',
        }}>
          {!post.cover && <span className="samase-mono" style={{ fontSize: 8, color: 'var(--ink-mute)' }}>NO IMG</span>}
        </div>
        <button onClick={() => setOpen(!open)} style={{
          flex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
          textAlign: 'left', padding: 0, fontFamily: 'inherit',
        }}>
          <div style={{ fontWeight: 500, fontSize: 13 }}>{post.title}</div>
          <div className="samase-mono" style={{
            fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.06em', marginTop: 2,
          }}>
            {post.category} · {post.date} · {post.author}
          </div>
        </button>
        <span style={{ color: 'var(--ink-mute)' }}>{open ? '⌃' : '⌄'}</span>
      </div>
      {open && (
        <div style={{ padding: '0 18px 18px' }}>
          <TextField path={`${base}.title`} label="Judul" rows={2} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <TextField path={`${base}.category`} label="Kategori" />
            <TextField path={`${base}.date`} label="Tanggal (YYYY-MM-DD)" />
            <TextField path={`${base}.author`} label="Penulis" />
          </div>
          <TextField path={`${base}.slug`} label="Slug URL" />
          <TextField path={`${base}.excerpt`} label="Excerpt / ringkasan" rows={2} />
          <label className="lbl">Cover photo</label>
          <PhotoUploader path={`${base}.cover`} aspectRatio="4/3" />
          <div style={{ marginTop: 14 }}>
            <TextField path={`${base}.body`} label="Konten artikel" rows={8} />
          </div>
          <div style={{ marginTop: 10, textAlign: 'right' }}>
            <button onClick={onRemove} className="btn btn-danger" style={{ fontSize: 10 }}>
              Hapus artikel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ Tab: Events ============
function TabEvents() {
  const items = window.CMSStore?.getValue('events.items') || [];
  const enabled = !!window.CMSStore?.getValue('events.enabled');
  const statusOpts = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'past', label: 'Past' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const add = () => {
    const id = 'event_' + Date.now();
    const next = [...items, {
      id,
      date: new Date().toISOString().slice(0, 10),
      time: '18:00 WIB',
      title: 'Event baru',
      location: '',
      audience: '',
      body: '',
      status: 'upcoming',
    }];
    window.CMSStore.setKey('events.items', next);
  };
  const remove = (i) => {
    window.CMSStore.setKey('events.items', items.filter((_, j) => j !== i));
  };

  return (
    <>
      <Section title="Events Switch">
        <Field label="Aktifkan section events">
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => window.CMSStore.setKey('events.enabled', e.target.checked)}
              style={{ width: 18, height: 18, accentColor: 'var(--accent)' }}
            />
            <span style={{ fontSize: 13 }}>{enabled ? 'Tampil di landing page' : 'Tersembunyi'}</span>
          </label>
        </Field>
      </Section>

      <Section title="Header">
        <TextField path="events.title" label="Judul" rows={2} />
        <TextField path="events.lede" label="Sub-copy" rows={2} />
      </Section>

      <Section title="Kalender Events" desc="Agenda menuju grand opening, gathering, preview session, dll.">
        {items.map((ev, i) => (
          <div key={ev.id || i} style={{
            border: '1px solid var(--line-soft)', borderRadius: 10,
            background: 'var(--bg)', padding: 14, marginBottom: 10,
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <TextField path={`events.items.${i}.date`} label="Tanggal (YYYY-MM-DD)" />
              <TextField path={`events.items.${i}.time`} label="Jam" />
              <SelectField path={`events.items.${i}.status`} label="Status" options={statusOpts} />
            </div>
            <TextField path={`events.items.${i}.title`} label="Judul event" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <TextField path={`events.items.${i}.location`} label="Lokasi" />
              <TextField path={`events.items.${i}.audience`} label="Audience" />
            </div>
            <TextField path={`events.items.${i}.body`} label="Deskripsi" rows={3} />
            <div style={{ textAlign: 'right', marginTop: 8 }}>
              <button onClick={() => remove(i)} className="btn btn-danger" style={{ fontSize: 10 }}>
                Hapus event
              </button>
            </div>
          </div>
        ))}
        <button onClick={add} className="btn btn-ghost" style={{ fontSize: 11, marginTop: 10 }}>
          + Tambah event
        </button>
      </Section>
    </>
  );
}

// ============ Tab: i18n (Language) ============
function TabI18n({ flash }) {
  const avail = window.CMSStore?.getValue('i18n.available') || ['id', 'en'];

  return (
    <>
      <Section title="Default Language">
        <SelectField path="i18n.default" label="Bahasa default" options={[
          { value: 'id', label: 'Bahasa Indonesia' },
          { value: 'en', label: 'English' },
        ]} />
        <div className="samase-mono" style={{
          fontSize: 10, color: 'var(--ink-mute)', lineHeight: 1.6,
          padding: 14, background: 'var(--bg)', borderRadius: 8,
          marginTop: 10, border: '1px solid var(--line-soft)',
        }}>
          Pengunjung bisa switch bahasa lewat toggle di kiri bawah landing page. Setting ini menentukan bahasa yang aktif di first visit.
        </div>
      </Section>

      <Section title="English Translation"
        desc="Terjemahan EN disimpan di SAMASE.en.*. Kalau field EN kosong, landing page auto fallback ke copy ID.">

        <Subheading>Hero</Subheading>
        <TextField path="en.hero.titleTop" label="Title — line 1" />
        <TextField path="en.hero.titleMid" label="Title — line 2 (italic)" />
        <TextField path="en.hero.titleBot" label="Title — line 3" />
        <TextField path="en.hero.lede" label="Lede" rows={3} />
        <TextField path="en.hero.footer" label="Footer tagline" />

        <Subheading>Philosophy</Subheading>
        <TextField path="en.philosophy.kicker" label="Kicker" />
        <TextField path="en.philosophy.title" label="Title" rows={2} />
        <TextField path="en.philosophy.quote" label="Quote" rows={2} />

        <Subheading>Audience</Subheading>
        <TextField path="en.audience.kicker" label="Kicker" />
        <TextField path="en.audience.title" label="Title" rows={2} />
        <TextField path="en.audience.lede" label="Lede" rows={3} />

        <Subheading>Facilities</Subheading>
        <TextField path="en.facilities.kicker" label="Kicker" />
        <TextField path="en.facilities.title" label="Title" rows={2} />
        <TextField path="en.facilities.lede" label="Lede" rows={2} />

        <Subheading>Physio</Subheading>
        <TextField path="en.physio.kicker" label="Kicker" />
        <TextField path="en.physio.title" label="Title" rows={2} />
        <TextField path="en.physio.lede" label="Lede" rows={3} />

        <Subheading>Founding</Subheading>
        <TextField path="en.founding.kicker" label="Kicker" />
        <TextField path="en.founding.title" label="Title" rows={2} />
        <TextField path="en.founding.lede" label="Lede" rows={3} />

        <Subheading>FAQ · Form · Schedule · Blog · Events</Subheading>
        <TextField path="en.faq.kicker" label="FAQ kicker" />
        <TextField path="en.faq.title" label="FAQ title" rows={2} />
        <TextField path="en.form.kicker" label="Form kicker" />
        <TextField path="en.form.title" label="Form title" rows={2} />
        <TextField path="en.form.lede" label="Form lede" rows={3} />
        <TextField path="en.form.submitLabel" label="Form submit button" />
        <TextField path="en.form.successTitle" label="Form success title" rows={2} />
        <TextField path="en.blog.kicker" label="Blog kicker" />
        <TextField path="en.blog.title" label="Blog title" rows={2} />
        <TextField path="en.events.kicker" label="Events kicker" />
        <TextField path="en.events.title" label="Events title" rows={2} />
        <TextField path="en.schedule.kicker" label="Schedule kicker" />
        <TextField path="en.schedule.title" label="Schedule title" rows={2} />

        <Subheading>AI Assistant (EN)</Subheading>
        <TextField path="en.ai.kicker" label="Kicker" />
        <TextField path="en.ai.placeholder" label="Placeholder" />
        <TextField path="en.ai.greeting" label="Greeting" rows={3} />
        <TextField path="en.ai.disclaimer" label="Disclaimer" rows={2} />
      </Section>
    </>
  );
}

function Subheading({ children }) {
  return (
    <div className="samase-mono" style={{
      fontSize: 10, letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--accent)', margin: '28px 0 14px',
      paddingTop: 14,
      borderTop: '1px solid var(--line-soft)',
    }}>{children}</div>
  );
}

// Register all tabs
Object.assign(window, {
  TabVisual, TabHero, TabBatches, TabAudience, TabFacilities,
  TabPhysio, TabCoach, TabFAQ, TabForm, TabBrand, TabAdvanced,
  TabContact, TabSEO, TabAnnouncement, TabPricing,
  TabAI, TabSchedule, TabBlog, TabEvents, TabI18n,
  FormFieldEditor, BlogPostEditor, Subheading,
  Section, Field, TextField, NumberField, SelectField, ChoiceGrid,
  ResetOverrideBtn, BatchEditor, PersonaEditor, FacilityEditor,
  CoachEditor, LogoUploader, TagListField, MediaUploader, PhotoUploader,
});
