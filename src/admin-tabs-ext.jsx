// SAMASE Admin Tabs — Extended
// New tabs: AI · Blog · Events · Schedule · i18n · A/B (inside Hero)
// Plus media upload widgets used by Hero/Facilities/Coach tabs.

// ─────────────────────────────────────────────────────────
// MediaUpload — reusable component for uploading an image/video
// Saves to MediaStore + writes a CMS key with the storage key.
// ─────────────────────────────────────────────────────────
function MediaUpload({ mediaKey, cmsKey, accept = 'image/*', label, hint, height = 120, flash, onChange }) {
  const [bust, setBust] = React.useState(0);
  const [err, setErr] = React.useState(null);

  React.useEffect(() => {
    if (!window.MediaStore) return;
    const unsub = window.MediaStore.subscribe(() => setBust(b => b + 1));
    return unsub;
  }, []);

  const dataUrl = window.MediaStore?.get(mediaKey);
  const isVideo = /video/.test(accept);

  const pick = () => {
    setErr(null);
    window.MediaStore.pickAndUpload({
      accept,
      key: mediaKey,
      onDone: (k, url) => {
        // Write the reference into CMS (type + url resolves at render time)
        if (cmsKey && window.CMSStore) {
          window.CMSStore.setKey(cmsKey + '.key', k);
          window.CMSStore.setKey(cmsKey + '.url', url);
          window.CMSStore.setKey(cmsKey + '.type', isVideo ? 'video' : 'image');
        }
        onChange && onChange(k, url);
        flash && flash('Media terupload (belum tersimpan)', 'ok');
      },
      onError: (msg) => {
        setErr(msg);
        flash && flash(msg, 'err');
      },
    });
  };

  const remove = () => {
    if (!confirm('Hapus media ini?')) return;
    window.MediaStore.remove(mediaKey);
    if (cmsKey && window.CMSStore) {
      window.CMSStore.setKey(cmsKey + '.key', null);
      window.CMSStore.setKey(cmsKey + '.url', null);
      window.CMSStore.setKey(cmsKey + '.type', 'none');
    }
    onChange && onChange(null, null);
    flash && flash('Media dihapus', 'ok');
  };

  return (
    <Field label={label} hint={hint}>
      <div style={{
        height, background: 'var(--bg)',
        border: '1px dashed var(--line)', borderRadius: 8,
        overflow: 'hidden', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: dataUrl ? 'default' : 'pointer',
      }}
      onClick={() => { if (!dataUrl) pick(); }}
      >
        {dataUrl ? (
          isVideo ? (
            <video src={dataUrl} autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <img key={bust} src={dataUrl} alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--ink-mute)' }}>
            <div className="samase-mono" style={{ fontSize: 10, letterSpacing: '0.1em' }}>
              Klik untuk upload
            </div>
            <div className="samase-mono" style={{ fontSize: 9, marginTop: 4, opacity: 0.7 }}>
              {isVideo ? 'Video · max 15MB' : 'Gambar · max 6MB'}
            </div>
          </div>
        )}
      </div>
      {dataUrl && (
        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          <button onClick={pick} className="btn btn-ghost" style={{ fontSize: 10 }}>Ganti</button>
          <button onClick={remove} className="btn btn-danger" style={{ fontSize: 10 }}>Hapus</button>
        </div>
      )}
      {err && <div style={{ color: 'var(--err)', fontSize: 11, marginTop: 6 }}>{err}</div>}
    </Field>
  );
}

// ─────────────────────────────────────────────────────────
// TabAI — toggle + editable system prompt + suggestions
// ─────────────────────────────────────────────────────────
function TabAI({ flash }) {
  const ai = window.CMSStore?.getValue('ai') || {};
  const suggestions = Array.isArray(ai.suggestions) ? ai.suggestions : [];

  const setSuggestion = (i, v) => {
    window.CMSStore.setKey(`ai.suggestions.${i}`, v);
  };
  const addSuggestion = () => {
    const next = [...suggestions, 'Pertanyaan baru'];
    window.CMSStore.setKey('ai.suggestions', next);
  };
  const removeSuggestion = (i) => {
    const next = suggestions.filter((_, idx) => idx !== i);
    window.CMSStore.setKey('ai.suggestions', next);
  };

  return (
    <>
      <Section title="AI Search Assistant" desc="Widget chat AI di hero. Visitor bisa tanya apa saja soal SAMASE.">
        <Field label="Status">
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input type="checkbox"
              checked={!!ai.enabled}
              onChange={(e) => window.CMSStore.setKey('ai.enabled', e.target.checked)}
              style={{ width: 18, height: 18, accentColor: 'var(--accent)' }}
            />
            <span style={{ fontSize: 13 }}>
              {ai.enabled ? 'Aktif — AI assistant tampil di hero' : 'Nonaktif — AI tersembunyi'}
            </span>
          </label>
        </Field>
      </Section>

      <Section title="Copy" desc="Teks yang muncul di widget AI.">
        <TextField path="ai.kicker" label="Kicker (label kecil di atas)" placeholder="Tanya langsung" />
        <TextField path="ai.placeholder" label="Input placeholder" placeholder="Tanya apa saja..." />
        <TextField path="ai.greeting" label="Pesan pembuka (saat widget dibuka)" rows={3} />
        <TextField path="ai.disclaimer" label="Disclaimer di bawah" rows={2} />
      </Section>

      <Section title="Pertanyaan yang Disarankan" desc="Chip yang tampil sebagai suggestion.">
        {suggestions.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <input
              className="inp"
              value={s}
              onChange={(e) => setSuggestion(i, e.target.value)}
              style={{ flex: 1 }}
            />
            <button onClick={() => removeSuggestion(i)} className="btn btn-danger" style={{ fontSize: 10 }}>×</button>
          </div>
        ))}
        <button onClick={addSuggestion} className="btn btn-ghost" style={{ fontSize: 11 }}>
          + Tambah pertanyaan
        </button>
      </Section>

      <Section title="Knowledge Tambahan" desc="Info tambahan yang di-inject ke system prompt AI. Boleh kosong. Contoh: detail harga, alamat lengkap, aturan privasi.">
        <TextField path="ai.customKnowledge" label="Custom knowledge (opsional)" rows={8}
          placeholder="Misal: Lokasi detail, aturan membership, kebijakan refund, dsb..."
          hint="Max 2000 karakter. Teks ini dikirim ke AI sebagai tambahan konteks." />
      </Section>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// TabHeroExt — extra hero controls (media, A/B)
// Used alongside the existing TabHero which handles headlines.
// ─────────────────────────────────────────────────────────
function TabHeroExt({ flash }) {
  const ab = window.CMSStore?.getValue('ab') || {};
  return (
    <>
      <Section title="Hero Background Media" desc="Upload gambar atau video buat jadi background hero. Kosongkan untuk pakai grid default.">
        <MediaUpload
          mediaKey="hero-bg"
          cmsKey="hero.media"
          accept="image/*,video/*"
          label="Background image atau video"
          hint="JPG/PNG/WebP untuk gambar, MP4/WebM untuk video"
          height={200}
          flash={flash}
        />
        <NumberField path="hero.media.overlay" label="Overlay opacity (0 sampai 1)" hint="Gelapkan background supaya text kebaca" min={0} max={1} />
      </Section>

      <Section title="A/B Variant Headline" desc="Test dua versi headline. Aktifkan untuk mulai split visitor (default variant A).">
        <Field label="A/B Testing">
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input type="checkbox"
              checked={!!ab.enabled}
              onChange={(e) => window.CMSStore.setKey('ab.enabled', e.target.checked)}
              style={{ width: 18, height: 18, accentColor: 'var(--accent)' }}
            />
            <span style={{ fontSize: 13 }}>
              {ab.enabled ? 'Aktif — visitor lihat variant secara acak' : 'Nonaktif — hanya variant A yang tampil'}
            </span>
          </label>
        </Field>
        {ab.enabled && (
          <Field label="Variant yang sedang ditampilkan (untuk preview)">
            <ChoiceGrid path="ab.heroVariant" options={[
              { value: 'A', label: 'Variant A', desc: 'Versi utama' },
              { value: 'B', label: 'Variant B', desc: 'Alternatif' },
            ]} columns={2} />
          </Field>
        )}

        <div style={{ marginTop: 18, padding: 14, background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--line-soft)' }}>
          <div className="samase-mono" style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--ink-mute)', marginBottom: 12 }}>
            VARIANT A
          </div>
          <TextField path="ab.variants.A.titleTop" label="Baris 1" />
          <TextField path="ab.variants.A.titleMid" label="Baris 2 (italic)" />
          <TextField path="ab.variants.A.titleBot" label="Baris 3" />
          <TextField path="ab.variants.A.lede" label="Lede" rows={3} />
        </div>

        <div style={{ marginTop: 12, padding: 14, background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--line-soft)' }}>
          <div className="samase-mono" style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--ink-mute)', marginBottom: 12 }}>
            VARIANT B
          </div>
          <TextField path="ab.variants.B.titleTop" label="Baris 1" />
          <TextField path="ab.variants.B.titleMid" label="Baris 2 (italic)" />
          <TextField path="ab.variants.B.titleBot" label="Baris 3" />
          <TextField path="ab.variants.B.lede" label="Lede" rows={3} />
        </div>
      </Section>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// TabBlog — list editor for blog posts
// ─────────────────────────────────────────────────────────
function TabBlog({ flash }) {
  const blog = window.CMSStore?.getValue('blog') || {};
  const items = Array.isArray(blog.items) ? blog.items : [];

  const add = () => {
    const next = [...items, {
      slug: 'artikel-baru-' + Date.now(),
      title: 'Judul artikel baru',
      excerpt: 'Ringkasan singkat...',
      body: 'Isi artikel...',
      date: new Date().toISOString().slice(0, 10),
      author: 'Tim SAMASE',
      category: 'Catatan',
      cover: null,
      coverKey: null,
    }];
    window.CMSStore.setKey('blog.items', next);
  };
  const remove = (i) => {
    if (!confirm('Hapus artikel ini?')) return;
    const next = items.filter((_, idx) => idx !== i);
    window.CMSStore.setKey('blog.items', next);
  };

  return (
    <>
      <Section title="Journal">
        <Field label="Status">
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input type="checkbox"
              checked={!!blog.enabled}
              onChange={(e) => window.CMSStore.setKey('blog.enabled', e.target.checked)}
              style={{ width: 18, height: 18, accentColor: 'var(--accent)' }}
            />
            <span style={{ fontSize: 13 }}>{blog.enabled ? 'Aktif — section Journal tampil' : 'Nonaktif — section tersembunyi'}</span>
          </label>
        </Field>
        <TextField path="blog.kicker" label="Kicker" placeholder="Journal" />
        <TextField path="blog.title" label="Judul section" rows={2} />
        <TextField path="blog.lede" label="Lede" rows={2} />
      </Section>

      <Section title={`Artikel (${items.length})`} desc="Atur daftar artikel di journal.">
        {items.map((p, i) => (
          <div key={p.slug || i} style={{ padding: 14, background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 8, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <span className="samase-display" style={{ fontSize: 16 }}>Artikel {i + 1}</span>
              <button onClick={() => remove(i)} className="btn btn-danger" style={{ fontSize: 10 }}>Hapus</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <TextField path={`blog.items.${i}.title`} label="Judul" />
              <TextField path={`blog.items.${i}.category`} label="Kategori" />
              <TextField path={`blog.items.${i}.author`} label="Penulis" />
              <TextField path={`blog.items.${i}.date`} label="Tanggal (YYYY-MM-DD)" />
            </div>
            <TextField path={`blog.items.${i}.excerpt`} label="Ringkasan" rows={2} />
            <TextField path={`blog.items.${i}.body`} label="Isi lengkap" rows={5} />
            <MediaUpload
              mediaKey={`blog-${p.slug || i}-cover`}
              cmsKey={`blog.items.${i}.cover`}
              label="Cover image"
              height={100}
              flash={flash}
            />
          </div>
        ))}
        <button onClick={add} className="btn btn-ghost" style={{ fontSize: 11 }}>+ Tambah artikel</button>
      </Section>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// TabEvents — calendar editor
// ─────────────────────────────────────────────────────────
function TabEvents({ flash }) {
  const events = window.CMSStore?.getValue('events') || {};
  const items = Array.isArray(events.items) ? events.items : [];

  const add = () => {
    const next = [...items, {
      id: 'event-' + Date.now(),
      title: 'Event baru',
      date: new Date().toISOString().slice(0, 10),
      time: '10:00 WIB',
      location: 'Lokasi...',
      body: 'Detail event...',
      audience: 'Semua',
      status: 'upcoming',
    }];
    window.CMSStore.setKey('events.items', next);
  };
  const remove = (i) => {
    if (!confirm('Hapus event?')) return;
    window.CMSStore.setKey('events.items', items.filter((_, idx) => idx !== i));
  };

  return (
    <>
      <Section title="Events / Agenda">
        <Field label="Status">
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input type="checkbox"
              checked={!!events.enabled}
              onChange={(e) => window.CMSStore.setKey('events.enabled', e.target.checked)}
              style={{ width: 18, height: 18, accentColor: 'var(--accent)' }}
            />
            <span style={{ fontSize: 13 }}>{events.enabled ? 'Aktif' : 'Nonaktif'}</span>
          </label>
        </Field>
        <TextField path="events.kicker" label="Kicker" />
        <TextField path="events.title" label="Judul" rows={2} />
        <TextField path="events.lede" label="Lede" rows={2} />
      </Section>

      <Section title={`Daftar Event (${items.length})`}>
        {items.map((ev, i) => (
          <div key={ev.id || i} style={{ padding: 14, background: 'var(--bg)', border: '1px solid var(--line-soft)', borderRadius: 8, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <span className="samase-display" style={{ fontSize: 16 }}>Event {i + 1}</span>
              <button onClick={() => remove(i)} className="btn btn-danger" style={{ fontSize: 10 }}>Hapus</button>
            </div>
            <TextField path={`events.items.${i}.title`} label="Judul event" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              <TextField path={`events.items.${i}.date`} label="Tanggal (YYYY-MM-DD)" />
              <TextField path={`events.items.${i}.time`} label="Waktu" />
              <TextField path={`events.items.${i}.location`} label="Lokasi" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <TextField path={`events.items.${i}.audience`} label="Audience" />
              <SelectField path={`events.items.${i}.status`} label="Status" options={[
                { value: 'upcoming', label: 'Upcoming' },
                { value: 'past', label: 'Past' },
                { value: 'cancelled', label: 'Cancelled' },
              ]} />
            </div>
            <TextField path={`events.items.${i}.body`} label="Deskripsi" rows={3} />
          </div>
        ))}
        <button onClick={add} className="btn btn-ghost" style={{ fontSize: 11 }}>+ Tambah event</button>
      </Section>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// TabSchedule — weekly class schedule editor
// ─────────────────────────────────────────────────────────
function TabSchedule({ flash }) {
  const sched = window.CMSStore?.getValue('schedule') || {};
  const items = Array.isArray(sched.items) ? sched.items : [];
  const days = sched.days || ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  const add = () => {
    const next = [...items, {
      day: days[0],
      time: '07:00',
      className: 'Kelas Baru',
      coach: 'Coach TBD',
      audience: 'Semua',
      spots: 8,
    }];
    window.CMSStore.setKey('schedule.items', next);
  };
  const remove = (i) => {
    window.CMSStore.setKey('schedule.items', items.filter((_, idx) => idx !== i));
  };

  return (
    <>
      <Section title="Jadwal Kelas">
        <Field label="Status">
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input type="checkbox"
              checked={!!sched.enabled}
              onChange={(e) => window.CMSStore.setKey('schedule.enabled', e.target.checked)}
              style={{ width: 18, height: 18, accentColor: 'var(--accent)' }}
            />
            <span style={{ fontSize: 13 }}>{sched.enabled ? 'Aktif' : 'Nonaktif'}</span>
          </label>
        </Field>
        <TextField path="schedule.kicker" label="Kicker" />
        <TextField path="schedule.title" label="Judul" rows={2} />
        <TextField path="schedule.lede" label="Lede" rows={2} />
      </Section>

      <Section title={`Kelas (${items.length})`} desc="Tiap baris = satu kelas di hari dan jam tertentu.">
        <div style={{ display: 'grid', gridTemplateColumns: '80px 70px 1fr 1fr 110px 70px 40px', gap: 8, fontSize: 9, color: 'var(--ink-mute)', padding: '6px 2px', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'JetBrains Mono, monospace' }}>
          <div>Hari</div><div>Jam</div><div>Nama Kelas</div><div>Coach</div><div>Audience</div><div>Slot</div><div></div>
        </div>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 70px 1fr 1fr 110px 70px 40px', gap: 8, alignItems: 'center', padding: '4px 0', borderBottom: '1px solid var(--line-soft)' }}>
            <select className="inp" style={{ padding: '6px 8px', fontSize: 11 }}
              value={it.day || 'Senin'}
              onChange={(e) => window.CMSStore.setKey(`schedule.items.${i}.day`, e.target.value)}>
              {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <input className="inp" style={{ padding: '6px 8px', fontSize: 11 }} value={it.time || ''}
              onChange={(e) => window.CMSStore.setKey(`schedule.items.${i}.time`, e.target.value)} />
            <input className="inp" style={{ padding: '6px 8px', fontSize: 11 }} value={it.className || ''}
              onChange={(e) => window.CMSStore.setKey(`schedule.items.${i}.className`, e.target.value)} />
            <input className="inp" style={{ padding: '6px 8px', fontSize: 11 }} value={it.coach || ''}
              onChange={(e) => window.CMSStore.setKey(`schedule.items.${i}.coach`, e.target.value)} />
            <input className="inp" style={{ padding: '6px 8px', fontSize: 11 }} value={it.audience || ''}
              onChange={(e) => window.CMSStore.setKey(`schedule.items.${i}.audience`, e.target.value)} />
            <input type="number" className="inp" style={{ padding: '6px 8px', fontSize: 11 }} value={it.spots || 0}
              onChange={(e) => window.CMSStore.setKey(`schedule.items.${i}.spots`, parseInt(e.target.value) || 0)} />
            <button onClick={() => remove(i)} className="btn btn-danger" style={{ fontSize: 10, padding: '4px 8px' }}>×</button>
          </div>
        ))}
        <div style={{ marginTop: 12 }}>
          <button onClick={add} className="btn btn-ghost" style={{ fontSize: 11 }}>+ Tambah kelas</button>
        </div>
      </Section>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// TabI18n — language toggle + EN translation editor
// ─────────────────────────────────────────────────────────
function TabI18n({ flash }) {
  const curLang = (() => {
    try { return localStorage.getItem('samase_lang') || 'id'; } catch (_) { return 'id'; }
  })();
  const [lang, setLang] = React.useState(curLang);

  const setActive = (l) => {
    try { localStorage.setItem('samase_lang', l); } catch (_) {}
    window.dispatchEvent(new CustomEvent('samase:lang-change', { detail: l }));
    setLang(l);
    flash && flash(`Bahasa diubah ke ${l === 'id' ? 'Indonesia' : 'English'}`, 'ok');
  };

  return (
    <>
      <Section title="Bahasa Aktif" desc="Pilih bahasa default yang dilihat visitor saat pertama buka. Switcher muncul otomatis di navbar.">
        <ChoiceGrid path="i18n.default" options={[
          { value: 'id', label: 'Bahasa Indonesia', desc: 'Default' },
          { value: 'en', label: 'English', desc: 'Translation' },
        ]} columns={2} />
        <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
          <button onClick={() => setActive('id')} className={lang === 'id' ? 'btn btn-primary' : 'btn btn-ghost'} style={{ fontSize: 11 }}>Preview ID</button>
          <button onClick={() => setActive('en')} className={lang === 'en' ? 'btn btn-primary' : 'btn btn-ghost'} style={{ fontSize: 11 }}>Preview EN</button>
        </div>
      </Section>

      <Section title="English — Hero" desc="Translation untuk section hero. Kosongkan baris mana pun untuk fallback ke ID.">
        <TextField path="en.hero.kicker" label="Kicker" placeholder="SAMASE · Pre-opening 2026" />
        <TextField path="en.hero.titleTop" label="Line 1" />
        <TextField path="en.hero.titleMid" label="Line 2 (italic)" />
        <TextField path="en.hero.titleBot" label="Line 3" />
        <TextField path="en.hero.lede" label="Lede" rows={3} />
        <TextField path="en.hero.footer" label="Footer line" rows={2} />
      </Section>

      <Section title="English — Philosophy">
        <TextField path="en.philosophy.kicker" label="Kicker" />
        <TextField path="en.philosophy.title" label="Title" rows={2} />
        <TextField path="en.philosophy.quote" label="Quote" rows={2} />
      </Section>

      <Section title="English — Founding">
        <TextField path="en.founding.kicker" label="Kicker" />
        <TextField path="en.founding.title" label="Title" rows={2} />
        <TextField path="en.founding.lede" label="Lede" rows={3} />
        <TextField path="en.founding.disclaimer" label="Disclaimer" rows={3} />
        <TextField path="en.founding.ctaLabel" label="CTA" />
      </Section>

      <Section title="English — Form">
        <TextField path="en.form.title" label="Title" />
        <TextField path="en.form.lede" label="Lede" rows={2} />
        <TextField path="en.form.submitLabel" label="Submit button label" />
      </Section>

      <Section title="English — AI Assistant">
        <TextField path="en.ai.kicker" label="Kicker" />
        <TextField path="en.ai.placeholder" label="Placeholder" />
        <TextField path="en.ai.greeting" label="Greeting" rows={2} />
      </Section>
    </>
  );
}

// Register
Object.assign(window, {
  MediaUpload, TabAI, TabHeroExt, TabBlog, TabEvents, TabSchedule, TabI18n,
});
