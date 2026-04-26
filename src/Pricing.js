// SAMASE — Pricing Page data + components
// Source: Meeting Guide — SAMASE × Isnul · April 2026

const PRICING = {
  brand: {
    name: 'SAMASE Sports Club',
    tag: 'Pricing · Founding Member Pre-Opening',
    closingDate: '2026-06-15T23:59:00+07:00',
  },

  // Current active batch determines promo tier (CMS-controllable)
  activeBatch: 'visionary', // 'visionary' | 'pioneer' | 'founder'

  batches: {
    visionary: { label: 'Visionary', discount: '30%+', order: 1 },
    pioneer:   { label: 'Pioneer',   discount: '18%+', order: 2 },
    founder:   { label: 'Founder',   discount: '9%+',  order: 3 },
  },

  categories: [
    {
      id: 'opengym',
      title: 'Open Gym Membership',
      sub: 'Women & Men FitSpace',
      desc: 'Akses mandiri ke functional zone, recovery corner, loker, dan studio. Waktu operasional penuh, jadwal terpisah untuk Women FitSpace.',
      for: ['Bapak / Laki-laki 30+', 'Young adult 20–30', 'Akhwat (jadwal khusus)'],
      packages: [
        { name: 'Open Gym · Visionary', duration: '3 Bulan', sessions: 'Unlimited', normal: 1590000, fm: 1100000, batch: 'visionary', highlight: true },
        { name: 'Open Gym · Pioneer',   duration: '3 Bulan', sessions: 'Unlimited', normal: 1590000, fm: 1300000, batch: 'pioneer' },
        { name: 'Open Gym · Founder',   duration: '3 Bulan', sessions: 'Unlimited', normal: 1590000, fm: 1450000, batch: 'founder' },
        { name: 'Open Gym 6 Bulan FM',  duration: '6 Bulan', sessions: 'Unlimited', normal: 3060000, fm: 2400000, batch: 'all' },
        { name: 'Open Gym 12 Bulan FM', duration: '12 Bulan', sessions: 'Unlimited', normal: 5760000, fm: 4500000, batch: 'all', best: true },
      ],
      fallbackMonthly: 'Rp 550.000/bulan (reguler, non-FM)',
    },
    {
      id: 'pt',
      title: 'Private Training · 1-on-1',
      sub: 'Women & Men FitSpace',
      desc: 'Sesi personal dengan coach bersertifikasi. Program dibangun dari hasil screening Bebascedera. Cocok untuk goal spesifik: rehab, transformasi, performance.',
      for: ['Bapak / profesional sibuk', 'Akhwat yang ingin coach personal', 'Young adult yang serius'],
      packages: [
        { name: 'Starter Reset',            duration: '30 hari',  sessions: '4 sesi',  normal: 1680000, fm: 1350000, batch: 'all' },
        { name: 'Body Rebuild',             duration: '45 hari',  sessions: '8 sesi',  normal: 3200000, fm: 2500000, batch: 'all', highlight: true, bonus: 'Visionary: +2 sesi bonus' },
        { name: 'Signature Transformation', duration: '60 hari',  sessions: '12 sesi', normal: 4680000, fm: 3750000, batch: 'all', bonus: 'Visionary: +2 sesi bonus' },
        { name: 'Complete Confidence',      duration: '120 hari', sessions: '24 sesi', normal: 8880000, fm: 7000000, batch: 'all', best: true, bonus: 'Visionary: +4 sesi bonus' },
      ],
    },
    {
      id: 'duo',
      title: 'Private Duo · 2-on-1',
      sub: 'Women FitSpace',
      desc: 'Sesi berpasangan dengan coach — bersama pasangan, sahabat, atau keluarga. Tetap personal, dengan nuansa yang lebih rileks.',
      for: ['Akhwat ber-2 dengan teman/sahabat', 'Pasangan / suami-istri', 'Ibu & anak dewasa'],
      packages: [
        { name: 'Duo Starter',    duration: '30 hari', sessions: '4 sesi',  normal: 2400000,  fm: 1900000, batch: 'all' },
        { name: 'Duo Progress',   duration: '45 hari', sessions: '8 sesi',  normal: 4400000,  fm: 3500000, batch: 'all', highlight: true, bonus: 'Visionary: +1 sesi bonus' },
        { name: 'Duo Elevate',    duration: '60 hari', sessions: '12 sesi', normal: 6300000,  fm: 5000000, batch: 'all', bonus: 'Visionary: +2 sesi bonus' },
        { name: 'Duo Signature',  duration: '120 hari', sessions: '24 sesi', normal: 12000000, fm: 9500000, batch: 'all', best: true, bonus: 'Visionary: +4 sesi bonus' },
      ],
    },
    {
      id: 'group',
      title: 'Group Class · Women',
      sub: 'Women FitSpace · 3–10 orang',
      desc: 'Kelas kecil terkurasi, khusus muslimah. Coach perempuan. Jadwal fleksibel dengan ritme yang dijaga.',
      for: ['Akhwat 28–50', 'Pemula yang suka struktur kelompok', 'Yang ingin komunitas kecil'],
      packages: [
        { name: 'Single Access',     duration: '—',        sessions: '1 kelas',  normal: 150000,  fm: 150000,  batch: 'all', note: 'Harga tetap' },
        { name: 'Consistency Pack',  duration: '60 hari',  sessions: '8 kelas',  normal: 560000,  fm: 420000,  batch: 'all' },
        { name: 'Progress Pack',     duration: '90 hari',  sessions: '12 kelas', normal: 1040000, fm: 800000,  batch: 'all', highlight: true, bonus: 'Visionary: +1 kelas bonus' },
        { name: 'Commitment Pack',   duration: '180 hari', sessions: '24 kelas', normal: 1500000, fm: 1150000, batch: 'all', best: true, bonus: 'Visionary: +2 kelas bonus' },
      ],
    },
    {
      id: 'private-class',
      title: 'Private Class · Group Booking',
      sub: 'Komunitas, kantor, keluarga besar · 3–10 orang',
      desc: 'Sewa coach + studio untuk grup pribadi Anda. Cocok untuk komunitas, kantor, atau group of friends yang ingin program sendiri.',
      for: ['Group office / co-worker', 'Komunitas alumni / muslimah', 'Keluarga besar'],
      packages: [
        { name: 'Core Circle · 3–5 orang · 4 sesi',    duration: '—', sessions: '4 sesi',  normal: 3000000, fm: 2400000, batch: 'all' },
        { name: 'Core Circle · 3–5 orang · 8 sesi',    duration: '—', sessions: '8 sesi',  normal: 5400000, fm: 4300000, batch: 'all' },
        { name: 'Performance Circle · 6–8 · 4 sesi',   duration: '—', sessions: '4 sesi',  normal: 3600000, fm: 2900000, batch: 'all', highlight: true },
        { name: 'Performance Circle · 6–8 · 8 sesi',   duration: '—', sessions: '8 sesi',  normal: 6600000, fm: 5200000, batch: 'all' },
        { name: 'Elite Circle · 9–10 · 4 sesi',        duration: '—', sessions: '4 sesi',  normal: 4100000, fm: 3300000, batch: 'all' },
        { name: 'Elite Circle · 9–10 · 8 sesi',        duration: '—', sessions: '8 sesi',  normal: 7400000, fm: 5900000, batch: 'all', best: true },
      ],
    },
    {
      id: 'golden',
      title: 'Golden FitSpace · PT Private',
      sub: 'Khusus usia 50+',
      desc: 'Program personal trainer untuk Lansia — didampingi coach khusus 50+, tempo yang sesuai, kolaborasi dengan Bebascedera untuk assessment postural. Niat: tetap kuat, mobile, dan hadir sampai usia lanjut.',
      for: ['Lansia 55+', 'Orang tua dari anak-anak muda yang daftar', 'Yang ingin longevity-focused'],
      packages: [
        { name: 'Active Start',       duration: '30 hari',  sessions: '4 sesi',  normal: 1760000, fm: 1400000, batch: 'all' },
        { name: 'Stability Builder',  duration: '45 hari',  sessions: '8 sesi',  normal: 3360000, fm: 2700000, batch: 'all', highlight: true, bonus: 'Visionary: +2 sesi bonus' },
        { name: 'Vital Strength',     duration: '60 hari',  sessions: '12 sesi', normal: 4920000, fm: 3900000, batch: 'all', bonus: 'Visionary: +2 sesi bonus' },
        { name: 'Prime Longevity',    duration: '120 hari', sessions: '24 sesi', normal: 9480000, fm: 7500000, batch: 'all', best: true, bonus: 'Visionary: +4 sesi bonus' },
      ],
    },
  ],

  addOns: [
    {
      title: 'Postural Screening · Bebascedera',
      body: 'Gratis 15–20 menit untuk semua Founding Member. Sesi mendalam 45–60 menit tersedia sebagai add-on.',
      value: 'GRATIS saat daftar',
    },
    {
      title: 'Welcome Kit',
      body: 'Tote + botol + handuk premium — khusus Visionary & Pioneer.',
      value: 'GRATIS · Visionary & Pioneer',
    },
    {
      title: 'Founding Gathering',
      body: 'Eksklusif untuk semua Founding Member sebelum grand opening. Meet the coaches, tour fasilitas, networking.',
      value: 'GRATIS · semua batch',
    },
    {
      title: 'Komunitas WhatsApp',
      body: 'Akses group eksklusif Founding Members. Guide, Q&A coach, dan first-access event.',
      value: 'GRATIS · semua batch',
    },
  ],
};

function formatIDR(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

function PricingPage() {
  const [activeBatch, setActiveBatch] = React.useState(PRICING.activeBatch);
  const [category, setCategory] = React.useState('opengym');

  const active = PRICING.categories.find(c => c.id === category);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <PricingNav />

      {/* Hero */}
      <section style={{ padding: '140px 0 80px' }}>
        <div className="samase-container">
          <div className="samase-mono" style={{ color: 'var(--ink-mute)', marginBottom: 28 }}>
            <span style={{
              display: 'inline-block', width: 6, height: 6,
              borderRadius: '50%', background: 'var(--gold)',
              marginRight: 10, verticalAlign: 'middle',
            }} />
            {PRICING.brand.tag}
          </div>

          <h1 className="samase-display" style={{
            fontSize: 'clamp(40px, 6vw, 96px)',
            margin: 0,
            color: 'var(--ink)',
            maxWidth: 960,
            lineHeight: 1.02,
          }}>
            Harga pre-opening, <span className="samase-serif-italic">selagi masih terbuka.</span>
          </h1>

          <p style={{
            marginTop: 28,
            color: 'var(--ink-soft)',
            fontSize: 17,
            lineHeight: 1.7,
            maxWidth: 680,
          }}>
            Semua paket di bawah ini menggunakan harga Founding Member Pre-Opening.
            Batch <strong style={{ color: 'var(--ink)' }}>{PRICING.batches[activeBatch].label}</strong> sedang aktif — diskon hingga {PRICING.batches[activeBatch].discount} dari harga normal.
            Harga akan naik saat batch berikutnya dibuka.
          </p>

          {/* Batch selector */}
          <div style={{ marginTop: 40, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {Object.entries(PRICING.batches).map(([id, b]) => (
              <button
                key={id}
                onClick={() => setActiveBatch(id)}
                className="samase-mono"
                style={{
                  padding: '10px 18px',
                  background: activeBatch === id ? 'var(--ink)' : 'transparent',
                  color: activeBatch === id ? 'var(--bg)' : 'var(--ink)',
                  border: `1px solid ${activeBatch === id ? 'var(--ink)' : 'var(--line)'}`,
                  borderRadius: 999,
                  fontSize: 11,
                  cursor: 'pointer',
                  transition: 'all 180ms',
                }}
              >
                <span style={{ color: activeBatch === id ? 'var(--gold)' : 'var(--gold)', marginRight: 8 }}>●</span>
                {b.label} · diskon {b.discount}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category nav */}
      <section style={{ padding: '32px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--bg-elev)', position: 'sticky', top: 0, zIndex: 20, backdropFilter: 'blur(12px)' }}>
        <div className="samase-container" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {PRICING.categories.map(c => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className="samase-mono"
              style={{
                padding: '10px 16px',
                background: category === c.id ? 'var(--ink)' : 'transparent',
                color: category === c.id ? 'var(--bg)' : 'var(--ink-soft)',
                border: `1px solid ${category === c.id ? 'var(--ink)' : 'var(--line)'}`,
                borderRadius: 999,
                fontSize: 10,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {c.title.replace(/\s·.*$/, '')}
            </button>
          ))}
        </div>
      </section>

      {/* Active category */}
      <section style={{ padding: '80px 0 120px' }}>
        <div className="samase-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: 64,
            marginBottom: 56,
          }} className="pr-intro">
            <div>
              <div className="samase-mono" style={{ color: 'var(--ink-mute)', marginBottom: 12 }}>
                {active.sub}
              </div>
              <h2 className="samase-display" style={{
                fontSize: 'clamp(32px, 4.4vw, 56px)',
                margin: 0,
                color: 'var(--ink)',
                lineHeight: 1.05,
              }}>
                {active.title}
              </h2>
            </div>
            <div>
              <p style={{
                margin: 0,
                color: 'var(--ink-soft)',
                fontSize: 17,
                lineHeight: 1.7,
              }}>
                {active.desc}
              </p>
              <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {active.for.map((p, i) => (
                  <span key={i} className="samase-mono" style={{
                    padding: '4px 12px',
                    background: 'var(--bg-elev)',
                    border: '1px solid var(--line)',
                    borderRadius: 999,
                    color: 'var(--ink-soft)',
                    fontSize: 9,
                  }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Package table */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 18,
          }}>
            {active.packages.map((pkg, i) => (
              <PackageCard key={i} pkg={pkg} activeBatch={activeBatch} />
            ))}
          </div>

          {active.fallbackMonthly && (
            <div style={{ marginTop: 32, padding: 20, background: 'var(--bg-elev)', border: '1px solid var(--line)', borderRadius: 0 }}>
              <span className="samase-mono" style={{ color: 'var(--ink-mute)' }}>
                Reguler (non-FM) · {active.fallbackMonthly}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Add-ons / Bonus */}
      <section style={{ padding: '80px 0', background: 'var(--bg-elev)', borderTop: '1px solid var(--line)' }}>
        <div className="samase-container">
          <div className="samase-mono" style={{ color: 'var(--ink-mute)', marginBottom: 16 }}>
            Bonus · Gratis untuk semua Founding Member
          </div>
          <h2 className="samase-display" style={{
            fontSize: 'clamp(32px, 4.2vw, 52px)',
            margin: 0,
            color: 'var(--ink)',
            maxWidth: 820,
          }}>
            Yang tidak ada di harga — tapi Anda terima.
          </h2>

          <div style={{
            marginTop: 48,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 18,
          }}>
            {PRICING.addOns.map((a, i) => (
              <div key={i} style={{
                padding: 28,
                background: 'var(--bg-card)',
                border: '1px solid var(--line)',
              }}>
                <div className="samase-mono" style={{ color: 'var(--gold)', marginBottom: 14, fontSize: 9 }}>
                  {a.value}
                </div>
                <div className="samase-display" style={{ fontSize: 22, color: 'var(--ink)', marginBottom: 10 }}>
                  {a.title}
                </div>
                <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.6 }}>
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 0', background: 'var(--ink)', color: 'var(--bg)' }}>
        <div className="samase-container" style={{ textAlign: 'center' }}>
          <h2 className="samase-display" style={{
            fontSize: 'clamp(36px, 5vw, 68px)',
            margin: 0,
            maxWidth: 820,
            marginInline: 'auto',
            lineHeight: 1.05,
          }}>
            Kunci harga <span className="samase-serif-italic" style={{ color: 'var(--gold)' }}>{PRICING.batches[activeBatch].label}</span> sekarang.
          </h2>
          <p className="samase-serif-italic" style={{
            margin: '24px auto 0',
            maxWidth: 580,
            fontSize: 18,
            opacity: 0.7,
            lineHeight: 1.5,
          }}>
            Saat batch ini penuh, harga akan otomatis naik ke tier berikutnya. Tidak ada retroactive discount.
          </p>
          <a href="index.html#section-form" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            marginTop: 40,
            padding: '18px 32px',
            background: 'var(--gold)',
            color: 'var(--ink)',
            borderRadius: 999,
            fontWeight: 500,
          }}>
            <span className="samase-mono" style={{ fontSize: 11 }}>Amankan Slot Saya</span>
            <span>→</span>
          </a>
        </div>
      </section>

      <PricingFooter />
    </div>
  );
}

function PackageCard({ pkg, activeBatch }) {
  const isForThisBatch = pkg.batch === 'all' || pkg.batch === activeBatch;
  const savings = pkg.normal - pkg.fm;
  const pct = Math.round((savings / pkg.normal) * 100);

  // Hide batch-specific cards if not this batch
  if (pkg.batch !== 'all' && pkg.batch !== activeBatch) {
    return (
      <div style={{
        padding: 28,
        border: '1px solid var(--line)',
        opacity: 0.4,
        background: 'var(--bg-elev)',
      }}>
        <div className="samase-mono" style={{ color: 'var(--ink-mute)', marginBottom: 14, fontSize: 9 }}>
          Batch {PRICING.batches[pkg.batch].label}
        </div>
        <div className="samase-display" style={{ fontSize: 20, color: 'var(--ink)', marginBottom: 8 }}>
          {pkg.name}
        </div>
        <div className="samase-mono" style={{ color: 'var(--ink-mute)', fontSize: 10 }}>
          Tidak aktif di batch ini
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: 28,
      border: pkg.highlight || pkg.best ? '1px solid var(--gold)' : '1px solid var(--line)',
      background: pkg.highlight || pkg.best ? 'var(--bg-card)' : 'var(--bg-card)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      minHeight: 280,
    }}>
      {pkg.best && (
        <div style={{
          position: 'absolute', top: -10, left: 16,
          background: 'var(--ink)', color: 'var(--bg)',
          padding: '3px 10px',
          fontSize: 9, letterSpacing: '0.12em',
          fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontWeight: 600,
        }}>
          Best Value
        </div>
      )}
      {pkg.highlight && !pkg.best && (
        <div style={{
          position: 'absolute', top: -10, left: 16,
          background: 'var(--gold)', color: 'var(--ink)',
          padding: '3px 10px',
          fontSize: 9, letterSpacing: '0.12em',
          fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontWeight: 600,
        }}>
          Popular
        </div>
      )}

      <div>
        <div className="samase-display" style={{ fontSize: 22, color: 'var(--ink)', lineHeight: 1.15, marginBottom: 6 }}>
          {pkg.name}
        </div>
        <div className="samase-mono" style={{ color: 'var(--ink-mute)', fontSize: 9 }}>
          {pkg.duration} · {pkg.sessions}
        </div>
      </div>

      <div style={{ paddingTop: 14, paddingBottom: 8, borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="samase-mono" style={{ color: 'var(--ink-mute)', fontSize: 9, marginBottom: 4 }}>
          FM Price
        </div>
        <div className="samase-display" style={{ fontSize: 28, color: 'var(--ink)', lineHeight: 1 }}>
          {formatIDR(pkg.fm)}
        </div>
        {pkg.note !== 'Harga tetap' && savings > 0 && (
          <div style={{ marginTop: 6, display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, textDecoration: 'line-through', color: 'var(--ink-mute)' }}>
              {formatIDR(pkg.normal)}
            </span>
            <span className="samase-mono" style={{ color: 'var(--gold)', fontSize: 9 }}>
              Hemat {pct}% · {formatIDR(savings)}
            </span>
          </div>
        )}
        {pkg.note && <div className="samase-mono" style={{ color: 'var(--ink-mute)', fontSize: 9, marginTop: 4 }}>{pkg.note}</div>}
      </div>

      {pkg.bonus && (
        <div style={{
          padding: '10px 12px',
          background: 'var(--bg-elev)',
          borderLeft: '2px solid var(--gold)',
          fontSize: 12,
          color: 'var(--ink-soft)',
          lineHeight: 1.5,
        }}>
          <span style={{ color: 'var(--gold)', fontWeight: 600 }}>+ Bonus</span>  · {pkg.bonus.replace('Visionary:', activeBatch === 'visionary' ? '' : `Hanya untuk Visionary ·`)}
        </div>
      )}

      <div style={{ flex: 1 }} />

      <a href="index.html#section-form" style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '12px 20px',
        background: pkg.best ? 'var(--ink)' : 'transparent',
        color: pkg.best ? 'var(--bg)' : 'var(--ink)',
        border: pkg.best ? 'none' : '1px solid var(--ink)',
        borderRadius: 999,
        fontSize: 12,
        transition: 'all 180ms',
      }}>
        <span className="samase-mono" style={{ fontSize: 10 }}>Pilih paket ini</span>
        <span>→</span>
      </a>
    </div>
  );
}

function PricingNav() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      padding: '18px 0',
      background: 'color-mix(in srgb, var(--bg) 88%, transparent)',
      backdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--line)',
    }}>
      <div className="samase-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="index.html" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SamaseMark size={20} />
        </a>
        <a href="index.html" className="samase-mono" style={{
          color: 'var(--ink-soft)',
          fontSize: 10.5,
        }}>
          ← Kembali ke Home
        </a>
      </div>
    </nav>
  );
}

function PricingFooter() {
  return (
    <footer style={{ padding: '60px 0 40px', borderTop: '1px solid var(--line)', background: 'var(--bg)' }}>
      <div className="samase-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <SamaseMark size={20} subtitle="Pre-opening · 2026" />
          <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="https://bebascedera.com/" target="_blank" rel="noopener noreferrer" className="samase-mono" style={{ color: 'var(--ink-mute)' }}>Bebascedera ↗</a>
            <a href="index.html" className="samase-mono" style={{ color: 'var(--ink-mute)' }}>Home</a>
            <a href="index.html#section-faq" className="samase-mono" style={{ color: 'var(--ink-mute)' }}>FAQ</a>
          </div>
        </div>
        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--line-soft)', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <span className="samase-mono" style={{ color: 'var(--ink-mute)', fontSize: 10 }}>© SAMASE Sports Club 2026</span>
          <span className="samase-mono" style={{ color: 'var(--ink-mute)', fontSize: 10 }}>Bintaro · Juli 2026</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { PRICING, PricingPage, PackageCard, PricingNav, PricingFooter, formatIDR });
