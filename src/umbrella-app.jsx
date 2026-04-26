// SAMASE Sports Club — Umbrella Brand App
// Main page: editorial tone, brand DNA, 3 sub-brand cards, single CTA to /campaign.
// No pricing. No FM detail. No form.
//
// Tone reference: Aesop, Rimowa — calm, declarative, price-as-fact in sub-pages only.

function UmbrellaApp() {
  const S = window.SAMASE || window.SAMASE_DEFAULTS;
  const layout = S.ui?.layouts?.main || 'editorial';
  const variant = S.ui?.variant || 'warm';

  React.useEffect(() => {
    document.body.classList.add('umbrella-loaded');
    // Apply palette variant class to body
    document.body.classList.remove('variant-warm', 'variant-deep', 'variant-stone');
    document.body.classList.add(`variant-${variant}`);
  }, [variant]);

  // Layout: editorial = softer hero + philosophy first; cinematic = full-bleed hero + sub-brands
  if (layout === 'cinematic') {
    return (
      <div className="umbrella-root" data-layout="cinematic">
        <UmbrellaNav />
        <UmbrellaHeroCinematic S={S} />
        <UmbrellaSubBrands S={S} />
        <UmbrellaPhilosophy S={S} />
        <UmbrellaScarcityNarrative S={S} />
        <UmbrellaCTA S={S} />
        <UmbrellaFooter S={S} />
        {window.AdminFloatingLink && <window.AdminFloatingLink />}
      </div>
    );
  }

  // Default: editorial
  return (
    <div className="umbrella-root" data-layout="editorial">
      <UmbrellaNav />
      <UmbrellaHero S={S} />
      <UmbrellaPhilosophy S={S} />
      <UmbrellaSubBrands S={S} />
      <UmbrellaScarcityNarrative S={S} />
      <UmbrellaCTA S={S} />
      <UmbrellaFooter S={S} />
      {window.AdminFloatingLink && <window.AdminFloatingLink />}
    </div>
  );
}

// ─────────────────────────────────────────────
// HERO (Cinematic variant) — bigger photo, sub-brands lead immediately after
// ─────────────────────────────────────────────
function UmbrellaHeroCinematic({ S }) {
  const b = S.brand;
  return (
    <section style={{
      minHeight: '100vh',
      position: 'relative',
      background: '#0A0706',
      color: '#F2EEE5',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      textAlign: 'center',
      padding: '120px 40px',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <window.PhotoSlot
          slotKey="hero.umbrella"
          label="MAIN · CINEMATIC HERO"
          subject="silhouette"
          tone="cinematic"
          aspect="auto"
          style={{ width: '100%', height: '100%', aspectRatio: 'auto' }}
        />
      </div>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(10,7,6,0.4) 0%, rgba(10,7,6,0.9) 80%)',
      }}/>
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100 }}>
        <div className="samase-mono" style={{
          fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
          color: '#E8B88A', marginBottom: 40,
        }}>
          {S.hero.kicker}
        </div>
        <h1 style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 9vw, 140px)',
          fontWeight: 200,
          lineHeight: 1.0,
          letterSpacing: '-0.035em',
        }}>
          {S.hero.titleTop}<br/>
          <span style={{ fontStyle: 'italic', fontWeight: 300 }}>{S.hero.titleMid}</span><br/>
          {S.hero.titleBot}
        </h1>
        <p style={{
          margin: '48px auto 0', maxWidth: 580,
          fontSize: 17, lineHeight: 1.7,
          color: 'rgba(242,238,229,0.78)',
        }}>
          {S.hero.lede}
        </p>
        <div style={{ marginTop: 56, display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="campaign.html" className="umbrella-primary-cta">
            Jadwalkan Postural Assessment →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// NAV — minimal, top-aligned
// ─────────────────────────────────────────────
function UmbrellaNav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: scrolled ? '14px 32px' : '22px 32px',
      background: scrolled ? 'rgba(10,7,6,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 300ms ease',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      color: '#F2EEE5',
    }}>
      <a href="index.html" style={{
        fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: '-0.01em',
        color: '#F2EEE5', textDecoration: 'none',
      }}>
        SAMASE<span style={{ opacity: 0.5, marginLeft: 4 }}> · Sports Club</span>
      </a>
      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        <a href="fitspace.html" className="umbrella-nav-link">Fitspace</a>
        <a href="physio.html" className="umbrella-nav-link">Physio</a>
        <a href="padel.html" className="umbrella-nav-link">Padel</a>
        <a href="campaign.html" className="umbrella-nav-cta">
          Postural Assessment →
        </a>
      </div>
      <style>{`
        .umbrella-nav-link {
          color: rgba(242,238,229,0.7); text-decoration: none; font-size: 13px;
          letter-spacing: 0.04em; transition: color 180ms;
        }
        .umbrella-nav-link:hover { color: #F2EEE5; }
        .umbrella-nav-cta {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 10px 18px; border: 1px solid rgba(242,238,229,0.35);
          color: #F2EEE5; text-decoration: none; transition: all 220ms;
        }
        .umbrella-nav-cta:hover {
          background: #F2EEE5; color: #0A0706; border-color: #F2EEE5;
        }
        @media (max-width: 720px) {
          .umbrella-nav-link { display: none; }
        }
      `}</style>
    </nav>
  );
}

// ─────────────────────────────────────────────
// HERO — one-line positioning, editorial
// ─────────────────────────────────────────────
function UmbrellaHero({ S }) {
  const b = S.brand;
  return (
    <section style={{
      minHeight: '100vh',
      position: 'relative',
      background: '#0A0706',
      color: '#F2EEE5',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      padding: '0',
      overflow: 'hidden',
    }}>
      {/* Background photo slot */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <window.PhotoSlot
          slotKey="hero.umbrella"
          label="MAIN BRAND · BACKDROP"
          subject="silhouette"
          tone="cinematic"
          aspect="auto"
          style={{ width: '100%', height: '100%', aspectRatio: 'auto' }}
        />
      </div>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,7,6,0.65) 0%, rgba(10,7,6,0.35) 40%, rgba(10,7,6,0.95) 100%)',
      }}/>

      {/* Top meta */}
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, padding: '0 40px', zIndex: 2 }}>
        <div className="samase-mono" style={{
          fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#E8B88A', opacity: 0.9,
        }}>
          {S.hero.kicker}
        </div>
      </div>

      {/* Main headline */}
      <div style={{ position: 'relative', zIndex: 2, padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
        <h1 style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(44px, 7.5vw, 120px)',
          fontWeight: 300,
          lineHeight: 1.02,
          letterSpacing: '-0.028em',
          color: '#F2EEE5',
          maxWidth: '14ch',
        }}>
          {S.hero.titleTop} <span style={{ fontStyle: 'italic', fontWeight: 300 }}>{S.hero.titleMid}</span> {S.hero.titleBot}
        </h1>

        <p style={{
          marginTop: 40, maxWidth: 620,
          fontSize: 17, lineHeight: 1.7,
          color: 'rgba(242,238,229,0.78)',
        }}>
          {S.hero.lede}
        </p>

        <div style={{ marginTop: 56, display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          <a href="campaign.html" className="umbrella-primary-cta">
            Jadwalkan Postural Assessment
          </a>
          <a href="#tiga-layanan" className="umbrella-ghost-link">
            Jelajahi tiga layanan ↓
          </a>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(242,238,229,0.15)', padding: '22px 40px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span className="samase-serif-italic" style={{ color: 'rgba(242,238,229,0.65)', fontSize: 14 }}>
            {S.hero.footer}
          </span>
          <span className="samase-mono" style={{ fontSize: 10, letterSpacing: '0.16em', color: 'rgba(242,238,229,0.5)' }}>
            BINTARO · JULI 2026
          </span>
        </div>
      </div>

      <style>{`
        .umbrella-primary-cta {
          display: inline-block;
          padding: 18px 30px;
          background: #F2EEE5; color: #0A0706;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none;
          transition: all 220ms ease;
        }
        .umbrella-primary-cta:hover {
          background: #E8B88A;
          transform: translateY(-1px);
        }
        .umbrella-ghost-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(242,238,229,0.7); text-decoration: none;
          padding: 18px 8px;
        }
        .umbrella-ghost-link:hover { color: #F2EEE5; }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────
// PHILOSOPHY — editorial paragraph, like Aesop
// ─────────────────────────────────────────────
function UmbrellaPhilosophy({ S }) {
  return (
    <section style={{
      background: '#F2EEE5',
      padding: '140px 40px',
      color: '#1C1A17',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80 }} className="umbrella-philo-grid">
          <div>
            <div className="samase-mono" style={{
              fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#776F63',
            }}>
              01 · Filosofi
            </div>
          </div>
          <div>
            <p style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3.2vw, 40px)',
              lineHeight: 1.35,
              fontWeight: 300,
              letterSpacing: '-0.015em',
              color: '#1C1A17',
              textWrap: 'pretty',
            }}>
              Dibangun seperti ruang pribadi. Tenang, presisi, dijaga. Klub ini bukan panggung, dan anggotanya bukan audiens. Setiap ruang, jadwal, dan percakapan dirancang agar tubuh bisa mendengar dirinya sendiri — sebelum instruksi masuk dari luar.
            </p>
            <p style={{
              marginTop: 40, marginBottom: 0,
              maxWidth: 620,
              fontSize: 16, lineHeight: 1.75,
              color: '#433E36',
            }}>
              SAMASE Sports Club dibuka di Bintaro pada Juli 2026 dengan tiga layanan yang saling menopang. Tidak ada yang dipaksakan, tidak ada yang dijual keras. Yang kami tawarkan adalah struktur — waktu, ruang, dan pendampingan yang konsisten.
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) {
          .umbrella-philo-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────
// SUB-BRANDS — 3 cards, editorial, photo-rich
// ─────────────────────────────────────────────
function UmbrellaSubBrands({ S }) {
  const sb = S.subBrands || { items: [] };
  return (
    <section id="tiga-layanan" style={{
      background: '#0A0706', color: '#F2EEE5',
      padding: '140px 0 160px',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 48 }}>
          <span className="samase-mono" style={{ color: 'rgba(242,238,229,0.6)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            {sb.number} · {sb.kicker}
          </span>
          <span style={{ flex: 1, height: 1, background: 'rgba(242,238,229,0.18)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'end', marginBottom: 72 }} className="umbrella-sb-head">
          <h2 style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 4.6vw, 64px)',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: '#F2EEE5',
          }}>
            {sb.title}
          </h2>
          <p style={{
            margin: 0, maxWidth: 460,
            fontSize: 16, lineHeight: 1.7,
            color: 'rgba(242,238,229,0.72)',
          }}>
            {sb.lede}
          </p>
        </div>
      </div>

      {/* Cards, zero-gap bleed */}
      <div className="umbrella-sb-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 0,
        maxWidth: 1600, margin: '0 auto',
      }}>
        {(sb.items || []).map((item, i) => (
          <SubBrandCard key={item.id} item={item} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .umbrella-sb-grid { grid-template-columns: 1fr !important; }
          .umbrella-sb-head { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </section>
  );
}

function SubBrandCard({ item, index }) {
  const [hover, setHover] = React.useState(false);
  const isMenyusul = item.status && item.status.toLowerCase().includes('menyusul');

  return (
    <a
      href={item.slug}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        aspectRatio: '3/4.2',
        display: 'block',
        overflow: 'hidden',
        textDecoration: 'none',
        color: '#F2EEE5',
        cursor: 'pointer',
      }}>
      <div style={{
        position: 'absolute', inset: 0,
        transform: hover ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}>
        <window.PhotoSlot
          slotKey={`umbrella.subbrand.${item.id}`}
          label={item.label.toUpperCase()}
          subject={item.id === 'fitspace' ? 'equipment' : item.id === 'physio' ? 'physio' : 'padel'}
          tone="cinematic"
          aspect="auto"
          style={{ width: '100%', height: '100%', aspectRatio: 'auto' }}
        />
      </div>

      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: hover
          ? 'linear-gradient(180deg, rgba(10,7,6,0.25) 0%, rgba(10,7,6,0.92) 100%)'
          : 'linear-gradient(180deg, rgba(10,7,6,0.35) 0%, rgba(10,7,6,0.85) 100%)',
        transition: 'background 420ms ease',
      }}/>

      {/* Top index + status */}
      <div style={{ position: 'absolute', top: 28, left: 28, right: 28, display: 'flex', justifyContent: 'space-between' }}>
        <span className="samase-mono" style={{
          fontSize: 10, letterSpacing: '0.2em', color: 'rgba(242,238,229,0.65)',
        }}>
          0{index + 1}
        </span>
        <span className="samase-mono" style={{
          fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
          padding: '5px 10px',
          border: `1px solid ${isMenyusul ? 'rgba(242,238,229,0.3)' : 'rgba(232,184,138,0.5)'}`,
          color: isMenyusul ? 'rgba(242,238,229,0.55)' : '#E8B88A',
          background: 'rgba(10,7,6,0.35)',
        }}>
          {item.status}
        </span>
      </div>

      {/* Bottom content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 32px 36px' }}>
        <div className="samase-mono" style={{
          fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#E8B88A', marginBottom: 14,
        }}>
          {item.kicker}
        </div>
        <h3 style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(24px, 2.4vw, 34px)',
          fontWeight: 300,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: '#F2EEE5',
        }}>
          {item.label}
        </h3>
        <p style={{
          marginTop: 14, marginBottom: 22,
          fontSize: 14, lineHeight: 1.65,
          color: 'rgba(242,238,229,0.75)',
          maxWidth: '28ch',
        }}>
          {item.lede}
        </p>
        <span className="samase-mono" style={{
          fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: hover ? '#E8B88A' : 'rgba(242,238,229,0.85)',
          transition: 'color 220ms',
        }}>
          {item.ctaLabel} →
        </span>
      </div>
    </a>
  );
}

// ─────────────────────────────────────────────
// SCARCITY NARRATIVE — the "luxury" framing
// ─────────────────────────────────────────────
function UmbrellaScarcityNarrative({ S }) {
  return (
    <section style={{
      background: '#F2EEE5',
      color: '#1C1A17',
      padding: '160px 40px',
    }}>
      <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
        <div className="samase-mono" style={{
          fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
          color: '#776F63', marginBottom: 32,
        }}>
          03 · Founding Member
        </div>
        <h2 style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 4.8vw, 72px)',
          fontWeight: 300,
          lineHeight: 1.08,
          letterSpacing: '-0.025em',
          color: '#1C1A17',
          textWrap: 'balance',
        }}>
          Pintu ini dibuka sekali, <span style={{ fontStyle: 'italic' }}>lalu ditutup.</span>
        </h2>
        <p style={{
          margin: '40px auto 0', maxWidth: 640,
          fontSize: 17, lineHeight: 1.75,
          color: '#433E36',
        }}>
          SAMASE menerima 435 Founding Member. Di antaranya tiga gelombang, dengan akses dan ritme yang berbeda. Setelah angka ini penuh, kami tidak membuka Founding lagi. Keanggotaan baru masuk di tarif standar klub.
        </p>

        {/* Progress visual — minimal */}
        <div style={{
          marginTop: 72, padding: '36px 40px',
          border: '1px solid #D4CAB8',
          background: 'rgba(255,255,255,0.5)',
          maxWidth: 720, margin: '72px auto 0',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <span className="samase-mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: '#776F63', textTransform: 'uppercase' }}>
              Terisi saat ini
            </span>
            <span className="samase-mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: '#776F63', textTransform: 'uppercase' }}>
              / 435 total
            </span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 8,
            fontFamily: 'var(--font-display)', marginBottom: 16,
          }}>
            <span style={{ fontSize: 52, fontWeight: 300, letterSpacing: '-0.02em' }}>58</span>
            <span style={{ fontSize: 20, color: '#776F63' }}>dari 435</span>
          </div>
          <div style={{ height: 2, background: '#E3DCCB', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.round(58/435*100)}%`, background: '#6B5842' }} />
          </div>
          <div style={{ marginTop: 14, fontSize: 13, color: '#433E36', lineHeight: 1.6 }}>
            Gelombang 01 · Visionary — <span style={{ color: '#1C1A17' }}>{58} dari {80} slot terisi</span>. Harga Founding berlaku hingga 15 Juni 2026 atau sampai total 435 penuh.
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FINAL CTA — one action
// ─────────────────────────────────────────────
function UmbrellaCTA({ S }) {
  return (
    <section style={{
      background: '#0A0706',
      color: '#F2EEE5',
      padding: '140px 40px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: 960, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr auto', gap: 56, alignItems: 'center',
      }} className="umbrella-cta-grid">
        <div>
          <div className="samase-mono" style={{
            fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'rgba(232,184,138,0.85)', marginBottom: 24,
          }}>
            Titik Awal
          </div>
          <h2 style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px, 4vw, 52px)',
            fontWeight: 300, lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#F2EEE5',
          }}>
            Mulai dari membaca <span style={{ fontStyle: 'italic' }}>tubuhmu.</span>
          </h2>
          <p style={{
            marginTop: 24, maxWidth: 520,
            fontSize: 16, lineHeight: 1.7,
            color: 'rgba(242,238,229,0.72)',
          }}>
            Bukan pembelian. Bukan trial gym. Postural Assessment adalah percakapan 15–30 menit dengan fisioterapis Bebascedera — titik awal untuk menentukan apakah SAMASE cocok untukmu.
          </p>
        </div>
        <div>
          <a href="campaign.html" className="umbrella-primary-cta">
            Jadwalkan Sekarang →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .umbrella-cta-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function UmbrellaFooter({ S }) {
  const c = S.contact || {};
  return (
    <footer style={{
      background: '#0A0706',
      color: '#F2EEE5',
      padding: '72px 40px 48px',
      borderTop: '1px solid rgba(242,238,229,0.12)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40,
          paddingBottom: 40,
        }} className="umbrella-footer-grid">
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 300,
              letterSpacing: '-0.015em', color: '#F2EEE5', marginBottom: 10,
            }}>
              SAMASE Sports Club
            </div>
            <p style={{
              margin: 0, maxWidth: 360,
              fontSize: 13, lineHeight: 1.65,
              color: 'rgba(242,238,229,0.6)',
            }}>
              {S.brand.positioning}
            </p>
          </div>
          <div>
            <div className="samase-mono" style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(242,238,229,0.5)', marginBottom: 14 }}>
              Layanan
            </div>
            <FooterLink href="fitspace.html">Fitspace</FooterLink>
            <FooterLink href="physio.html">Physio</FooterLink>
            <FooterLink href="padel.html">Padel</FooterLink>
          </div>
          <div>
            <div className="samase-mono" style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(242,238,229,0.5)', marginBottom: 14 }}>
              Mulai
            </div>
            <FooterLink href="campaign.html">Postural Assessment</FooterLink>
            <FooterLink href="Pricing.html">Harga & Paket</FooterLink>
          </div>
          <div>
            <div className="samase-mono" style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(242,238,229,0.5)', marginBottom: 14 }}>
              Kontak
            </div>
            {c.whatsappUrl && <FooterLink href={c.whatsappUrl} external>WhatsApp</FooterLink>}
            {c.instagramUrl && <FooterLink href={c.instagramUrl} external>Instagram</FooterLink>}
            {c.email && <FooterLink href={`mailto:${c.email}`}>Email</FooterLink>}
          </div>
        </div>
        <div style={{
          paddingTop: 24, borderTop: '1px solid rgba(242,238,229,0.1)',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
          fontSize: 11, letterSpacing: '0.06em',
          color: 'rgba(242,238,229,0.4)',
          fontFamily: 'JetBrains Mono, monospace',
        }}>
          <span>© 2026 SAMASE Sports Club · Bintaro</span>
          <span>Grand Opening Juli 2026</span>
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) {
          .umbrella-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterLink({ href, children, external }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{
        display: 'block', padding: '6px 0',
        color: 'rgba(242,238,229,0.72)', textDecoration: 'none',
        fontSize: 13, transition: 'color 180ms',
      }}
      onMouseEnter={(e) => e.currentTarget.style.color = '#F2EEE5'}
      onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(242,238,229,0.72)'}
    >
      {children}
    </a>
  );
}

window.UmbrellaApp = UmbrellaApp;
