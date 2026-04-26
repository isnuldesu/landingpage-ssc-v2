// SAMASE — Layout variants (orchestration layer)
// Each layout changes the hero composition + section rhythm.
// Palette is applied independently via body class.

// Layout: Editorial (current / default) — magazine-style, serif-forward, grid backdrop
function LayoutEditorial() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Audience />
      <Facilities />
      <Physio />
      <Founding />
      <Coach />
      <ScheduleSection />
      <BlogSection />
      <EventsSection />
      <FAQ />
      <FormSection />
    </>
  );
}

// Layout: Zen Minimal — huge negative space, single column, ultra calm
function LayoutZen() {
  return (
    <>
      <ZenHero />
      <div className="zen-section-wrap">
        <Philosophy />
        <Audience />
        <Facilities />
        <Physio />
      </div>
      <Founding />
      <div className="zen-section-wrap">
        <Coach />
        <ScheduleSection />
        <BlogSection />
        <EventsSection />
        <FAQ />
      </div>
      <FormSection />
      <style>{`
        body.layout-zen section { padding-top: 160px !important; padding-bottom: 160px !important; }
        body.layout-zen .samase-container { max-width: 980px !important; }
        body.layout-zen h1, body.layout-zen h2 { font-weight: 300 !important; letter-spacing: -0.03em !important; }
      `}</style>
    </>
  );
}

// Layout: Architectural Grid — heavy grid lines, brutalist editorial
function LayoutArchitectural() {
  return (
    <>
      <ArchHero />
      <Philosophy />
      <Audience />
      <Facilities />
      <Physio />
      <Founding />
      <Coach />
      <ScheduleSection />
      <BlogSection />
      <EventsSection />
      <FAQ />
      <FormSection />
      <style>{`
        body.layout-arch section { border-bottom: 1px solid var(--line); }
        body.layout-arch .samase-container {
          position: relative;
        }
        body.layout-arch .samase-container::before,
        body.layout-arch .samase-container::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 1px;
          background: var(--line-soft);
          pointer-events: none;
        }
        body.layout-arch .samase-container::before { left: 0; }
        body.layout-arch .samase-container::after { right: 0; }
        body.layout-arch h1, body.layout-arch h2 {
          font-family: var(--font-body) !important;
          font-weight: 500 !important;
          letter-spacing: -0.02em !important;
          text-transform: none !important;
        }
      `}</style>
    </>
  );
}

// Layout: Hero-Focus — cinematic hero that takes >100vh, rest is dense
function LayoutHeroFocus() {
  return (
    <>
      <CinematicHero />
      <Philosophy />
      <Audience />
      <Facilities />
      <Physio />
      <Founding />
      <Coach />
      <ScheduleSection />
      <BlogSection />
      <EventsSection />
      <FAQ />
      <FormSection />
      <style>{`
        body.layout-hero section:not(#section-hero) { padding-top: 80px !important; padding-bottom: 80px !important; }
      `}</style>
    </>
  );
}

// ==================== Hero variants ====================
function ZenHero() {
  const h = window.SAMASE.hero;
  const S = window.SAMASE;
  return (
    <section id="section-hero" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '120px 0',
      textAlign: 'center',
    }}>
      <div className="samase-container">
        <Reveal>
          <div className="samase-mono" style={{ color: 'var(--ink-mute)', marginBottom: 64, letterSpacing: '0.2em' }}>
            {h.kicker}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="samase-display" style={{
            fontSize: 'clamp(40px, 6vw, 96px)',
            fontWeight: 300,
            margin: 0,
            color: 'var(--ink)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}>
            {h.titleTop} {h.titleMid}<br />
            <span className="samase-serif-italic">{h.titleBot}</span>
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <p style={{
            marginTop: 48,
            color: 'var(--ink-soft)',
            fontSize: 17,
            lineHeight: 1.7,
            maxWidth: 520,
            margin: '48px auto 0',
          }}>
            {h.lede}
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div style={{ marginTop: 72, display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
            <MetaBlock label={h.meta1Label} value={h.meta1Value} />
            <div style={{ width: 1, background: 'var(--line)' }} />
            <MetaBlock label={h.meta2Label} value={h.meta2Value} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArchHero() {
  const h = window.SAMASE.hero;
  return (
    <section id="section-hero" style={{
      minHeight: '100vh',
      paddingTop: 140,
      paddingBottom: 80,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      borderBottom: '1px solid var(--line)',
    }}>
      {/* Heavy grid */}
      <div aria-hidden style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.5,
        backgroundImage: 'linear-gradient(to right, var(--line-soft) 1px, transparent 1px), linear-gradient(to bottom, var(--line-soft) 1px, transparent 1px)',
        backgroundSize: '120px 120px',
      }}/>
      <div className="samase-container" style={{ position: 'relative', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'end',
        }} className="arch-grid">
          <div>
            <Reveal>
              <div className="samase-mono" style={{
                color: 'var(--ink-mute)',
                marginBottom: 32,
                padding: '6px 12px',
                background: 'var(--bg-card)',
                border: '1px solid var(--line)',
                display: 'inline-block',
              }}>
                {h.kicker}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h1 style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(44px, 6.4vw, 104px)',
                fontWeight: 500,
                margin: 0,
                color: 'var(--ink)',
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
              }}>
                {h.titleTop}<br/>
                {h.titleMid}<br/>
                {h.titleBot}
              </h1>
            </Reveal>
          </div>
          <Reveal delay={180}>
            <div style={{
              padding: 32,
              border: '1px solid var(--line)',
              background: 'var(--bg-card)',
            }}>
              <p style={{
                margin: 0,
                color: 'var(--ink-soft)',
                fontSize: 16,
                lineHeight: 1.7,
              }}>
                {h.lede}
              </p>
              <div style={{
                marginTop: 28,
                paddingTop: 22,
                borderTop: '1px solid var(--line)',
                display: 'flex',
                gap: 40,
              }}>
                <MetaBlock label={h.meta1Label} value={h.meta1Value} />
                <MetaBlock label={h.meta2Label} value={h.meta2Value} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) {
          .arch-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

function CinematicHero() {
  const h = window.SAMASE.hero;
  const S = window.SAMASE;
  const active = S.founding.batches.find(b => b.status === 'active') || S.founding.batches[0];
  const pct = Math.round((active.slotsTaken / active.slotsTotal) * 100);
  return (
    <section id="section-hero" style={{
      minHeight: '110vh',
      padding: '120px 0 80px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      background: 'var(--bg)',
      overflow: 'hidden',
    }}>
      {/* Gold ambient corner */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '50%', right: '-20%',
        width: '60%', height: '60%',
        background: 'radial-gradient(ellipse at center, var(--gold) 0%, transparent 65%)',
        opacity: 0.1,
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }}/>
      <div className="samase-container" style={{ position: 'relative', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 48 }}>
        <Reveal>
          <div className="samase-mono" style={{ color: 'var(--ink-mute)' }}>
            <span style={{
              display: 'inline-block',
              width: 6, height: 6,
              borderRadius: '50%',
              background: 'var(--gold)',
              marginRight: 10,
              verticalAlign: 'middle',
              animation: 'pulse 2.4s ease-in-out infinite',
            }} />
            {h.kicker} · {S.brand.opening}, {S.brand.city}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="samase-display" style={{
            fontSize: 'clamp(56px, 11vw, 172px)',
            fontWeight: 300,
            margin: 0,
            color: 'var(--ink)',
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
          }}>
            {h.titleTop}<br/>
            <span className="samase-serif-italic" style={{ color: 'var(--accent)' }}>{h.titleMid}</span><br/>
            {h.titleBot}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 48,
            alignItems: 'end',
          }} className="cine-bottom">
            <p style={{
              margin: 0,
              color: 'var(--ink-soft)',
              fontSize: 18,
              lineHeight: 1.65,
              maxWidth: 540,
            }}>
              {h.lede}
            </p>
            <div style={{ minWidth: 260 }}>
              <div className="samase-mono" style={{ color: 'var(--ink-mute)', marginBottom: 8, fontSize: 9 }}>
                Gelombang aktif · {active.label}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: 'var(--font-display)' }}>
                <span style={{ fontSize: 28, color: 'var(--ink)' }}>{active.slotsTaken}<span style={{ opacity: 0.45 }}>/{active.slotsTotal}</span></span>
                <span className="samase-mono" style={{ color: 'var(--gold)', alignSelf: 'flex-end' }}>{pct}%</span>
              </div>
              <div style={{ height: 2, background: 'var(--line)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: 'var(--gold)' }} />
              </div>
              <a href="#section-form" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginTop: 20,
                padding: '14px 22px',
                background: 'var(--ink)',
                color: 'var(--bg)',
                borderRadius: 999,
                fontSize: 12,
              }}>
                <span className="samase-mono" style={{fontSize: 10}}>Amankan Slot</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="samase-container" style={{ position: 'relative', marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <span className="samase-serif-italic" style={{ color: 'var(--ink-soft)', fontSize: 16 }}>{h.footer}</span>
        <a href="#section-philosophy" className="samase-mono" style={{ color: 'var(--ink-mute)' }}>Scroll ↓</a>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @media (max-width: 860px) {
          .cine-bottom { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// Layout: Cinematic — Photo-as-background for key sections, clean rhythm sections between.
// Rhythm: Hero(photo) → Philosophy(clean) → Audience(clean) → Facilities(photo) → Physio(photo)
//         → Founding(photo) → Coach(photo) → Schedule(clean) → Blog(clean) → Events(clean)
//         → FAQ(clean) → Form(clean). Foto-clean-foto-clean biar mata istirahat, CTA akhir jelas.
function LayoutCinematic() {
  const Hero = window.CinematicPhotoHero || window.Hero;
  const Fac = window.CinematicFacilities || window.Facilities;
  const Phy = window.CinematicPhysio || window.Physio;
  const Fnd = window.CinematicFounding || window.Founding;
  const Coa = window.CinematicCoach || window.Coach;
  return (
    <>
      <Hero />
      <Philosophy />
      <Audience />
      <Fac />
      <Phy />
      <Fnd />
      <Coa />
      <ScheduleSection />
      <BlogSection />
      <EventsSection />
      <FAQ />
      <FormSection />
      <style>{`
        /* Tighter section breaks in cinematic — the photos carry the rhythm */
        body.layout-cinematic section#section-philosophy,
        body.layout-cinematic section#section-audience {
          padding-top: 140px !important;
          padding-bottom: 140px !important;
        }
        body.layout-cinematic section#section-hero ~ section#section-philosophy {
          background: var(--bg) !important;
        }
        /* Remove any existing white space between stacked dark sections */
        body.layout-cinematic #section-facilities + #section-physio,
        body.layout-cinematic #section-physio + #section-founding,
        body.layout-cinematic #section-founding + #section-coach {
          margin-top: 0 !important;
        }
      `}</style>
    </>
  );
}

// Main layout renderer
function LayoutRenderer({ layout }) {
  switch (layout) {
    case 'zen': return <LayoutZen />;
    case 'architectural': return <LayoutArchitectural />;
    case 'hero': return <LayoutHeroFocus />;
    case 'photo': return window.LayoutPhotoForward ? <LayoutPhotoForward /> : <LayoutEditorial />;
    case 'cinematic': return <LayoutCinematic />;
    case 'editorial':
    default: return <LayoutEditorial />;
  }
}

Object.assign(window, {
  LayoutEditorial, LayoutZen, LayoutArchitectural, LayoutHeroFocus, LayoutCinematic,
  ZenHero, ArchHero, CinematicHero, LayoutRenderer,
});
