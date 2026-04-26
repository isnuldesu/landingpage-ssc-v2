// SAMASE Admin — Sub-brand tabs (new structure)
// Manages content for the umbrella restructure:
//   - Main Brand (SAMASE Sports Club umbrella page)
//   - Sub-brands (3 cards: Fitspace, Physio, Padel)
//   - Physio Pricing (3 tiers: Essential, Starter, Transformation)
//   - Combo Pack (Fitspace + Physio preview offer)
//   - Journey (6-step customer flow on campaign page)
//
// All tabs use CMSStore.setKey() pattern — changes layer over content.js defaults.

// ============================================================
// 1. Main Brand Tab — umbrella positioning, hero copy
// ============================================================
function TabMainBrand({ flash }) {
  return (
    <div>
      <Section title="Positioning Utama" desc="Tagline umbrella yang muncul di footer, SEO, dan meta.">
        <TextField
          path="brand.positioning"
          label="Positioning Line"
          placeholder="Klub olahraga yang dibangun seperti ruang pribadi..."
          hint="Satu kalimat yang mendefinisikan SAMASE Sports Club sebagai main brand."
          rows={2}
        />
        <TextField
          path="brand.oneLiner"
          label="One-liner (3 layanan)"
          placeholder="Tiga layanan, satu standar..."
          hint="Ringkasan tiga sub-brand dalam satu kalimat."
          rows={2}
        />
      </Section>

      <Section title="Hero Main Page" desc="Teks yang muncul di hero index.html (main brand umbrella).">
        <TextField path="hero.kicker" label="Kicker (atas hero)" placeholder="SAMASE Sports Club · Bintaro · Juli 2026" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <TextField path="hero.titleTop" label="Judul baris 1" placeholder="Ruang pribadi" />
          <TextField path="hero.titleMid" label="Judul baris 2 (italic)" placeholder="untuk yang" />
          <TextField path="hero.titleBot" label="Judul baris 3" placeholder="berlatih dengan niat." />
        </div>
        <TextField
          path="hero.lede"
          label="Lede (sub-headline)"
          rows={3}
          hint="Paragraf pendek di bawah judul utama."
        />
        <TextField
          path="hero.footer"
          label="Footer hero"
          placeholder="Pintu ini dibuka untuk 435 Founding Member..."
        />
      </Section>

      <Section title="Kapasitas Founding" desc="Jumlah total Founding Member — digunakan di scarcity narrative.">
        <NumberField path="brand.slotsTotal" label="Total Kapasitas Founding" min={1} hint="Default: 435 (dari funnel target)." />
        <NumberField path="brand.slotsTaken" label="Sudah Terisi" min={0} hint="Angka yang ditampilkan di progress bar." />
      </Section>

      <Section title="Tanggal Pembukaan">
        <TextField path="brand.opening" label="Label Pembukaan" placeholder="Juli 2026" />
        <TextField path="brand.city" label="Kota / Area" placeholder="Jakarta, Bintaro" />
      </Section>
    </div>
  );
}

// ============================================================
// 2. Sub-brands Tab — 3 cards editor
// ============================================================
function TabSubBrands({ flash }) {
  const subBrands = window.CMSStore?.getValue('subBrands') || {};
  const items = subBrands.items || [];

  const addItem = () => {
    const newItem = {
      id: `custom-${Date.now()}`,
      label: 'Sub-brand Baru',
      slug: '#',
      kicker: 'Kategori',
      lede: 'Deskripsi singkat...',
      status: 'Menyusul',
      ctaLabel: 'Pelajari',
    };
    window.CMSStore.setKey('subBrands.items', [...items, newItem]);
  };

  const removeItem = (i) => {
    if (!confirm(`Hapus sub-brand "${items[i]?.label}"?`)) return;
    window.CMSStore.setKey('subBrands.items', items.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <Section title="Header Section" desc="Judul dan lede yang muncul di atas tiga card sub-brand.">
        <TextField path="subBrands.kicker" label="Kicker" placeholder="Tiga Layanan" />
        <TextField path="subBrands.title" label="Judul Section" placeholder="Dirancang sebagai satu..." rows={2} />
        <TextField path="subBrands.lede" label="Lede" rows={3} />
      </Section>

      <Section title="Sub-brand Cards" desc={`${items.length} kartu sub-brand. Klik untuk edit masing-masing.`}>
        {items.map((item, i) => (
          <div key={item.id || i} style={{
            padding: '20px 22px', marginBottom: 14,
            border: '1px solid var(--line)', borderRadius: 10,
            background: 'var(--bg)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <div className="samase-mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.14em' }}>
                #{i + 1} · {item.id}
              </div>
              <button
                onClick={() => removeItem(i)}
                style={{
                  background: 'transparent', border: '1px solid var(--line)',
                  color: 'var(--ink-mute)', padding: '4px 10px',
                  fontSize: 10, borderRadius: 4, cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Hapus
              </button>
            </div>
            <TextField path={`subBrands.items.${i}.label`} label="Nama Sub-brand" placeholder="SAMASE Fitspace" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <TextField path={`subBrands.items.${i}.kicker`} label="Kategori" placeholder="Latihan" />
              <TextField path={`subBrands.items.${i}.status`} label="Status" placeholder="Founding Member dibuka" hint="Atau 'Menyusul' untuk coming-soon." />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <TextField path={`subBrands.items.${i}.slug`} label="Link (URL)" placeholder="fitspace.html" />
              <TextField path={`subBrands.items.${i}.ctaLabel`} label="CTA Label" placeholder="Jelajahi Fitspace" />
            </div>
            <TextField path={`subBrands.items.${i}.lede`} label="Deskripsi" rows={3} />
          </div>
        ))}
        <button
          onClick={addItem}
          style={{
            padding: '10px 20px', background: 'var(--ink)', color: 'var(--bg)',
            border: 'none', borderRadius: 999, fontSize: 12, cursor: 'pointer',
            fontFamily: 'inherit', marginTop: 10,
          }}
        >
          + Tambah sub-brand
        </button>
      </Section>
    </div>
  );
}

// ============================================================
// 3. Physio Pricing Tab — 3 tier editor
// ============================================================
function TabPhysioPricing({ flash }) {
  const pp = window.CMSStore?.getValue('physioPricing') || {};
  const tiers = pp.tiers || [];

  return (
    <div>
      <Section title="Header Pricing Physio" desc="Muncul di atas 3 kartu tier di halaman /physio.">
        <TextField path="physioPricing.kicker" label="Kicker" placeholder="Paket Physio · Founding" />
        <TextField path="physioPricing.title" label="Judul" rows={2} placeholder="Tiga tingkat kedalaman, satu pendekatan." />
        <TextField path="physioPricing.lede" label="Lede" rows={3} />
        <TextField path="physioPricing.footnote" label="Footnote (di bawah kartu)" rows={3} hint="Syarat, ketentuan, masa berlaku paket." />
      </Section>

      {tiers.map((tier, i) => (
        <Section
          key={tier.id || i}
          title={`Tier ${i + 1}: ${tier.label || '—'}`}
          desc={`ID: ${tier.id} · ${tier.positioning}`}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <TextField path={`physioPricing.tiers.${i}.label`} label="Nama Tier" />
            <TextField path={`physioPricing.tiers.${i}.positioning`} label="Positioning" hint="Mis: Entry, Most Chosen, Deep Work" />
          </div>
          <TextField path={`physioPricing.tiers.${i}.tagline`} label="Tagline" rows={2} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <NumberField
              path={`physioPricing.tiers.${i}.priceFounding`}
              label="Harga Founding (Rp)"
              min={0}
              hint="Dalam rupiah penuh, mis. 1250000"
            />
            <NumberField
              path={`physioPricing.tiers.${i}.priceNormal`}
              label="Tarif Klub Normal (Rp)"
              min={0}
              hint="Ditampilkan sebagai anchor price."
            />
          </div>

          <TextField
            path={`physioPricing.tiers.${i}.bestFor`}
            label="Cocok untuk"
            rows={2}
            hint="Deskripsi pendek tentang siapa yang cocok dengan tier ini."
          />

          <ArrayStringEditor
            path={`physioPricing.tiers.${i}.includes`}
            label="Termasuk dalam paket"
            items={tier.includes || []}
            placeholder="Mis: Konsultasi awal 30 menit"
          />

          <div style={{ marginTop: 10 }}>
            <label className="lbl">Highlighted (tier paling dipromosikan)</label>
            <ToggleField path={`physioPricing.tiers.${i}.highlighted`} />
          </div>
        </Section>
      ))}
    </div>
  );
}

// ============================================================
// 4. Combo Pack Tab — hero offer editor
// ============================================================
function TabCombo({ flash }) {
  const combo = window.CMSStore?.getValue('combo') || {};
  const items = combo.items || [];

  return (
    <div>
      <Section title="Header Combo" desc="Section Combo Pack (Fitspace + Physio preview) yang muncul di /physio.">
        <TextField path="combo.kicker" label="Kicker" placeholder="SAMASE Founding Combo" />
        <TextField path="combo.title" label="Judul" rows={2} />
        <TextField path="combo.lede" label="Lede" rows={4} hint="Paragraf yang menjelaskan konsep Combo Pack." />
      </Section>

      <Section title="Item Combo" desc="Komponen yang membentuk paket Combo.">
        {items.map((item, i) => (
          <div key={i} style={{
            padding: '16px 18px', marginBottom: 10,
            border: '1px solid var(--line)', borderRadius: 8,
            background: 'var(--bg)',
          }}>
            <div className="samase-mono" style={{ fontSize: 10, color: 'var(--accent)', marginBottom: 10 }}>
              Item #{i + 1}
            </div>
            <TextField path={`combo.items.${i}.label`} label="Nama Item" placeholder="Fitspace · Open Gym 3 bulan" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <NumberField path={`combo.items.${i}.price`} label="Harga Komponen (Rp)" min={0} />
              <TextField path={`combo.items.${i}.note`} label="Keterangan" placeholder="Harga Founding Visionary" />
            </div>
          </div>
        ))}
      </Section>

      <Section title="Harga Combo" desc="Angka final yang ditampilkan di kartu preview.">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <NumberField
            path="combo.totalSeparate"
            label="Total Terpisah (Rp)"
            min={0}
            hint="Jumlah kalau dibeli terpisah (anchor price)."
          />
          <NumberField
            path="combo.totalCombo"
            label="Harga Combo (Rp)"
            min={0}
            hint="Harga yang dibayar sebagai Combo."
          />
        </div>
        <TextField
          path="combo.noteLong"
          label="Catatan (muncul di bawah angka)"
          rows={3}
          hint="Menjelaskan bahwa Combo bukan pembelian langsung."
        />
      </Section>
    </div>
  );
}

// ============================================================
// 5. Journey Tab — 6-step customer flow
// ============================================================
function TabJourney({ flash }) {
  const j = window.CMSStore?.getValue('journey') || {};
  const steps = j.steps || [];

  return (
    <div>
      <Section title="Header Journey" desc="Muncul di halaman /campaign (di bawah form).">
        <TextField path="journey.kicker" label="Kicker" placeholder="Proses" />
        <TextField path="journey.title" label="Judul" rows={2} />
        <TextField path="journey.lede" label="Lede" rows={3} />
      </Section>

      <Section title="6 Langkah" desc="Tahap-tahap customer journey dari First Touch sampai Community.">
        {steps.map((step, i) => (
          <div key={i} style={{
            padding: '18px 20px', marginBottom: 12,
            border: '1px solid var(--line)', borderRadius: 8,
            background: 'var(--bg)',
          }}>
            <div className="samase-mono" style={{ fontSize: 10, color: 'var(--accent)', marginBottom: 12, letterSpacing: '0.14em' }}>
              STEP {step.n || (i + 1)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 12 }}>
              <TextField path={`journey.steps.${i}.n`} label="Nomor" placeholder="01" />
              <TextField path={`journey.steps.${i}.title`} label="Judul" placeholder="First Touch" />
              <TextField path={`journey.steps.${i}.meta`} label="Meta" placeholder="Awareness · 15-30 menit" />
            </div>
            <TextField path={`journey.steps.${i}.body`} label="Deskripsi" rows={3} />
          </div>
        ))}
      </Section>
    </div>
  );
}

// ============================================================
// 6. Campaign Form Tab — (edit form fields di campaign.html)
// ============================================================
function TabCampaignForm({ flash }) {
  const f = window.CMSStore?.getValue('form') || {};

  return (
    <div>
      <Section title="Header Form Campaign" desc="Teks di halaman /campaign di atas form.">
        <TextField path="form.kicker" label="Kicker" placeholder="Postural Assessment" />
        <TextField path="form.title" label="Judul" rows={2} />
        <TextField path="form.lede" label="Lede (penjelasan form)" rows={4} />
        <TextField path="form.benefitsHead" label="Judul 'Yang kamu dapat'" placeholder="Yang kamu dapatkan dari Assessment" />
      </Section>

      <Section title="Tombol Submit">
        <TextField path="form.submitLabel" label="Label Submit" placeholder="Jadwalkan Postural Assessment" />
        <TextField path="form.submitLabelWaitlist" label="Label Waitlist" placeholder="Masuk daftar prioritas" hint="Muncul saat semua gelombang Founding penuh." />
      </Section>

      <Section title="Pesan Sukses">
        <TextField path="form.submitSuccessTitle" label="Judul Sukses" rows={2} />
        <TextField path="form.submitSuccessBody" label="Body Sukses" rows={4} />
        <TextField path="form.submitSuccessTitleWaitlist" label="Judul Waitlist Sukses" />
        <TextField path="form.submitSuccessBodyWaitlist" label="Body Waitlist Sukses" rows={3} />
      </Section>

      <Section title="Slot Inline Info" desc="Teks kecil yang muncul di atas tombol Submit, menunjukkan status slot.">
        <TextField path="form.slotInlineActive" label="Saat gelombang aktif" rows={2} hint="Gunakan {gelombang}, {priceK}, {remaining} sebagai placeholder." />
        <TextField path="form.slotInlineFew" label="Saat slot hampir habis" rows={2} />
        <TextField path="form.slotInlineFull" label="Saat semua penuh (waitlist)" rows={2} />
      </Section>

      <Section title="Fields Dinamis" desc="Edit label dan opsi untuk setiap field form.">
        {(f.fields || []).map((fld, i) => (
          <div key={fld.id || i} style={{
            padding: '16px 18px', marginBottom: 10,
            border: '1px solid var(--line)', borderRadius: 8,
            background: 'var(--bg)',
          }}>
            <div className="samase-mono" style={{ fontSize: 10, color: 'var(--accent)', marginBottom: 10 }}>
              Field · {fld.id}
            </div>
            <TextField path={`form.fields.${i}.label`} label="Label" />
            <TextField path={`form.fields.${i}.placeholder`} label="Placeholder" />
            {fld.type === 'select' && fld.options && (
              <ArrayStringEditor
                path={`form.fields.${i}.options`}
                label="Pilihan Dropdown"
                items={fld.options}
                placeholder="Tambah opsi..."
              />
            )}
          </div>
        ))}
      </Section>
    </div>
  );
}

// ============================================================
// Helper: simple array-of-string editor
// ============================================================
function ArrayStringEditor({ path, label, items, placeholder }) {
  const [newItem, setNewItem] = React.useState('');

  const add = () => {
    if (!newItem.trim()) return;
    window.CMSStore.setKey(path, [...items, newItem.trim()]);
    setNewItem('');
  };
  const remove = (i) => {
    window.CMSStore.setKey(path, items.filter((_, idx) => idx !== i));
  };
  const update = (i, val) => {
    const next = [...items];
    next[i] = val;
    window.CMSStore.setKey(path, next);
  };

  return (
    <Field label={label}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
          <input
            className="inp"
            value={item}
            onChange={(e) => update(i, e.target.value)}
            style={{ flex: 1 }}
          />
          <button
            onClick={() => remove(i)}
            style={{
              padding: '0 12px', background: 'transparent',
              border: '1px solid var(--line)', color: 'var(--ink-mute)',
              fontSize: 16, cursor: 'pointer', borderRadius: 6,
              fontFamily: 'inherit',
            }}
          >×</button>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
        <input
          className="inp"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder={placeholder || 'Tambah item...'}
          style={{ flex: 1 }}
        />
        <button
          onClick={add}
          style={{
            padding: '0 16px', background: 'var(--ink)', color: 'var(--bg)',
            border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12,
            fontFamily: 'inherit',
          }}
        >+</button>
      </div>
    </Field>
  );
}

// ============================================================
// Helper: toggle field (boolean)
// ============================================================
function ToggleField({ path }) {
  const v = window.CMSStore?.getValue(path) || false;
  const onClick = () => window.CMSStore.setKey(path, !v);
  return (
    <button
      onClick={onClick}
      style={{
        width: 52, height: 28, borderRadius: 999,
        border: 'none', cursor: 'pointer',
        background: v ? 'var(--accent)' : 'var(--line)',
        position: 'relative', transition: 'background 180ms',
        padding: 0,
      }}
    >
      <span style={{
        position: 'absolute', top: 3, left: v ? 27 : 3,
        width: 22, height: 22, borderRadius: '50%',
        background: '#FFFFFF', transition: 'left 180ms',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      }}/>
    </button>
  );
}

// Expose to global for admin-app.jsx
Object.assign(window, {
  TabMainBrand,
  TabSubBrands,
  TabPhysioPricing,
  TabCombo,
  TabJourney,
  TabCampaignForm,
  ArrayStringEditor,
  ToggleField,
});
