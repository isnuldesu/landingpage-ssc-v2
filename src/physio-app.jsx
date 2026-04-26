// SAMASE Physio by Bebascedera — Sub-brand page
// Focus: asesmen postur, pemulihan cedera, 3-tier pricing (Essential/Starter/Transformation)
// Tone: calm, medical-grade, no promo language. Price-as-fact.

function PhysioApp() {
  const S = window.SAMASE || window.SAMASE_DEFAULTS;
  const layout = S.ui?.layouts?.physio || 'grid';
  const variant = S.ui?.variant || 'warm';

  React.useEffect(() => {
    document.body.classList.remove('variant-warm', 'variant-deep', 'variant-stone');
    document.body.classList.add(`variant-${variant}`);
  }, [variant]);

  // Cinematic layout: photo-as-background for Hero, Approach, Partner, CTA.
  // Pricing, Combo, FAQ stay clean to keep the final commitment grounded.
  if (layout === 'cinematic') {
    return (
      <div className="physio-root" data-layout="cinematic">
        <UmbrellaNav />
        <PhysioHeroCinematic S={S} />
        <PhysioApproachCinematic S={S} />
        <PhysioPricing S={S} layout="grid" />
        <PhysioComboPreview S={S} />
        <PhysioPartnerCinematic S={S} />
        <PhysioFAQ S={S} />
        <PhysioCTACinematic S={S} />
        <UmbrellaFooter S={S} />
        {window.AdminFloatingLink && <window.AdminFloatingLink />}
      </div>
    );
  }

  return (
    <div className="physio-root" data-layout={layout}>
      <UmbrellaNav />
      <PhysioHero S={S} />
      <PhysioApproach S={S} />
      <PhysioPricing S={S} layout={layout} />
      <PhysioComboPreview S={S} />
      <PhysioPartner S={S} />
      <PhysioFAQ S={S} />
      <PhysioCTA S={S} />
      <UmbrellaFooter S={S} />
      {window.AdminFloatingLink && <window.AdminFloatingLink />}
    </div>
  );
}

// ============================================================
// CINEMATIC VARIANTS — Photo-as-background treatment
// Matches the Legacy Fitspace Cinematic style: full-bleed photo,
// dark scrim, oversized ALL-CAPS title, terracotta accent.
// ============================================================

function PhysioHeroCinematic({ S }) {
  return (
    <section style={{
      minHeight: '100vh', position: 'relative',
      background: '#0A0706', color: '#F2EEE5',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <window.PhotoSlot
          slotKey="physio.sub.hero"
          label="PHYSIO · CINEMATIC HERO"
          subject="physio"
          tone="cinematic"
          aspect="auto"
          style={{ width: '100%', height: '100%', aspectRatio: 'auto' }}
        />
      </div>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,7,6,0.55) 0%, rgba(10,7,6,0.25) 35%, rgba(10,7,6,0.85) 100%)',
      }}/>

      {/* Top-left kicker */}
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, padding: '0 40px', zIndex: 2 }}>
        <div className="samase-mono" style={{
          fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#F2EEE5', opacity: 0.85,
        }}>
          <span style={{
            display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
            background: '#E8B88A', marginRight: 10, verticalAlign: 'middle',
          }} />
          SAMASE Physio · by Bebascedera
        </div>
      </div>

      {/* Oversized ALL-CAPS headline */}
      <div style={{ position: 'relative', zIndex: 2, padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        <h1 style={{
          margin: 0,
          color: '#F2EEE5',
          fontSize: 'clamp(48px, 10vw, 160px)',
          fontWeight: 800,
          lineHeight: 0.92,
          letterSpacing: '-0.035em',
          textTransform: 'uppercase',
          textWrap: 'balance',
          fontFamily: 'var(--font-display)',
        }}>
          Baca tubuhmu<br/>
          <span style={{ color: '#E8B88A' }}>dulu.</span>
        </h1>

        <div style={{
          marginTop: 48,
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 48, alignItems: 'end',
        }} className="physio-cine-hero-bottom">
          <p style={{
            margin: 0, maxWidth: 560,
            fontSize: 17, lineHeight: 1.7,
            color: '#F2EEE5', opacity: 0.82,
          }}>
            Kebanyakan orang mulai dari target — turun berapa kilo, naik berapa otot. Kami mulai dari apa yang sudah ada di tubuhmu.
          </p>
          <a href="campaign.html?src=physio" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 22px',
            background: '#E8B88A', color: '#0A0706',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
            textDecoration: 'none', fontWeight: 600,
          }}>
            Jadwalkan Assessment →
          </a>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ position: 'relative', zIndex: 2, paddingBottom: 32 }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto', padding: '20px 40px 0',
          display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
          borderTop: '1px solid rgba(242,238,229,0.18)',
        }}>
          <span style={{ color: '#F2EEE5', opacity: 0.65, fontSize: 14, fontStyle: 'italic' }}>
            Ruang klinik di dalam SAMASE Sports Club.
          </span>
          <a href="#paket" className="samase-mono" style={{ color: '#F2EEE5', opacity: 0.65, textDecoration: 'none' }}>
            Lihat paket ↓
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .physio-cine-hero-bottom { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}

function PhysioApproachCinematic({ S }) {
  const p = S.physio || {};
  const steps = p.steps || [];
  return (
    <section style={{
      position: 'relative',
      background: '#0A0706', color: '#F2EEE5',
      padding: '120px 0',
      overflow: 'hidden',
    }}>
      {/* Background photo */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <window.PhotoSlot
          slotKey="physio.approach.bg"
          label="PHYSIO · APPROACH BG"
          subject="equipment"
          tone="cinematic"
          aspect="auto"
          style={{ width: '100%', height: '100%', aspectRatio: 'auto' }}
        />
      </div>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,7,6,0.82) 0%, rgba(10,7,6,0.92) 100%)',
      }}/>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
          <span className="samase-mono" style={{ color: '#F2EEE5', opacity: 0.6, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            {p.number} · {p.kicker}
          </span>
          <span style={{ flex: 1, height: 1, background: 'rgba(242,238,229,0.2)' }} />
        </div>

        <h2 style={{
          margin: 0,
          fontSize: 'clamp(40px, 6vw, 88px)',
          fontWeight: 800, lineHeight: 0.95,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: '#F2EEE5',
          maxWidth: '14ch',
          fontFamily: 'var(--font-display)',
        }}>
          {p.title}
        </h2>

        <p style={{
          marginTop: 28, maxWidth: 640,
          fontSize: 17, lineHeight: 1.7,
          color: '#F2EEE5', opacity: 0.75,
        }}>
          {p.lede}
        </p>

        {/* 3 steps — photo-bg numbered cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2, marginTop: 64,
        }} className="physio-cine-steps">
          {steps.map((s, i) => (
            <div key={i} style={{
              padding: '40px 28px 32px',
              background: 'rgba(242,238,229,0.04)',
              border: '1px solid rgba(242,238,229,0.1)',
              minHeight: 260,
              display: 'flex', flexDirection: 'column',
            }}>
              <div className="samase-mono" style={{
                fontSize: 11, color: '#E8B88A', letterSpacing: '0.22em', marginBottom: 24, textTransform: 'uppercase',
              }}>
                {s.n} · {s.meta}
              </div>
              <h3 style={{
                margin: 0, marginBottom: 14,
                fontSize: 24, fontWeight: 800,
                lineHeight: 1.1, letterSpacing: '-0.015em',
                color: '#F2EEE5',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-display)',
              }}>
                {s.title}
              </h3>
              <p style={{
                margin: 0, fontSize: 14, lineHeight: 1.65,
                color: '#F2EEE5', opacity: 0.72,
              }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .physio-cine-steps { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function PhysioPartnerCinematic({ S }) {
  const p = S.physio?.partner || {};
  return (
    <section style={{
      position: 'relative',
      minHeight: '70vh',
      background: '#0A0706', color: '#F2EEE5',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <window.PhotoSlot
          slotKey="physio.partner.bg"
          label="PHYSIO · PARTNER BG"
          subject="physio"
          tone="cinematic"
          aspect="auto"
          style={{ width: '100%', height: '100%', aspectRatio: 'auto' }}
        />
      </div>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(10,7,6,0.92) 0%, rgba(10,7,6,0.65) 60%, rgba(10,7,6,0.3) 100%)',
      }}/>

      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '100px 40px',
        position: 'relative', zIndex: 2, width: '100%',
      }}>
        <div className="samase-mono" style={{
          fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
          color: '#E8B88A', marginBottom: 24,
        }}>
          Mitra Klinis
        </div>
        <h2 style={{
          margin: 0,
          fontSize: 'clamp(36px, 5.5vw, 76px)',
          fontWeight: 800, lineHeight: 0.95,
          letterSpacing: '-0.03em',
          color: '#F2EEE5',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-display)',
          maxWidth: '12ch',
        }}>
          Bersama <span style={{ color: '#E8B88A' }}>Bebascedera.</span>
        </h2>
        <p style={{
          margin: '28px 0 0', maxWidth: 600,
          fontSize: 16, lineHeight: 1.75,
          color: '#F2EEE5', opacity: 0.75,
        }}>
          {p.body}
        </p>
        {p.url && (
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="samase-mono" style={{
            display: 'inline-block', marginTop: 32,
            fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#E8B88A', textDecoration: 'none',
            borderBottom: '1px solid #E8B88A', paddingBottom: 3,
          }}>
            Kunjungi bebascedera.com →
          </a>
        )}
      </div>
    </section>
  );
}

function PhysioCTACinematic({ S }) {
  return (
    <section style={{
      position: 'relative',
      minHeight: '80vh',
      background: '#0A0706', color: '#F2EEE5',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <window.PhotoSlot
          slotKey="physio.cta.bg"
          label="PHYSIO · FINAL CTA BG"
          subject="silhouette"
          tone="cinematic"
          aspect="auto"
          style={{ width: '100%', height: '100%', aspectRatio: 'auto' }}
        />
      </div>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(10,7,6,0.6) 0%, rgba(10,7,6,0.95) 80%)',
      }}/>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 860, padding: '100px 40px', textAlign: 'center' }}>
        <div className="samase-mono" style={{
          fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase',
          color: '#E8B88A', marginBottom: 32,
        }}>
          Titik Awal
        </div>
        <h2 style={{
          margin: 0,
          fontSize: 'clamp(36px, 6.5vw, 92px)',
          fontWeight: 800, lineHeight: 0.95,
          letterSpacing: '-0.03em',
          color: '#F2EEE5',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-display)',
          textWrap: 'balance',
        }}>
          Postural <span style={{ color: '#E8B88A' }}>Assessment.</span>
        </h2>
        <p style={{
          margin: '28px auto 0', maxWidth: 540,
          fontSize: 16, lineHeight: 1.75,
          color: '#F2EEE5', opacity: 0.75,
        }}>
          Bukan pembelian, bukan trial. Percakapan 15–30 menit bersama tim Bebascedera untuk memahami tubuhmu dulu.
        </p>
        <a href="campaign.html?src=physio" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          marginTop: 48,
          padding: '18px 32px',
          background: '#E8B88A', color: '#0A0706',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase',
          textDecoration: 'none', fontWeight: 600,
          borderRadius: 0,
        }}>
          Jadwalkan Sekarang →
        </a>
      </div>
    </section>
  );
}

// HERO
function PhysioHero({ S }) {
  return (
    <section style={{
      minHeight: '85vh', position: 'relative',
      background: '#0A0706', color: '#F2EEE5',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <window.PhotoSlot
          slotKey="physio.sub.hero"
          label="PHYSIO · HERO"
          subject="physio"
          tone="cinematic"
          aspect="auto"
          style={{ width: '100%', height: '100%', aspectRatio: 'auto' }}
        />
      </div>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,7,6,0.55) 0%, rgba(10,7,6,0.3) 45%, rgba(10,7,6,0.95) 100%)',
      }}/>
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, padding: '0 40px', zIndex: 2 }}>
        <div className="samase-mono" style={{
          fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#E8B88A',
        }}>
          SAMASE Physio · by Bebascedera
        </div>
      </div>
      <div style={{ position: 'relative', zIndex: 2, padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
        <h1 style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(40px, 7vw, 108px)',
          fontWeight: 300,
          lineHeight: 1.02,
          letterSpacing: '-0.028em',
          maxWidth: '16ch',
        }}>
          Latihan dimulai setelah <span style={{ fontStyle: 'italic' }}>postur kamu</span> kami baca.
        </h1>
        <p style={{
          marginTop: 36, maxWidth: 580,
          fontSize: 17, lineHeight: 1.7,
          color: 'rgba(242,238,229,0.8)',
        }}>
          Kebanyakan orang memulai dari target — turun berapa kilo, naik berapa otot. Kami memulai dari apa yang sudah ada di tubuhmu. Bebascedera adalah tim fisioterapis tersertifikat yang beroperasi di dalam klub.
        </p>
        <div style={{ marginTop: 48, display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          <a href="campaign.html?src=physio" className="umbrella-primary-cta">
            Jadwalkan Postural Assessment
          </a>
          <a href="#paket" className="umbrella-ghost-link">
            Lihat paket Physio ↓
          </a>
        </div>
      </div>
    </section>
  );
}

// APPROACH — 3 steps (Screening → Assessment → Program)
function PhysioApproach({ S }) {
  const p = S.physio || {};
  const steps = p.steps || [];
  return (
    <section style={{
      background: '#F2EEE5', color: '#1C1A17',
      padding: '140px 40px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 48 }}>
          <span className="samase-mono" style={{ color: '#776F63', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            04 · {p.kicker}
          </span>
          <span style={{ flex: 1, height: 1, background: '#D4CAB8' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 56, marginBottom: 72 }} className="physio-approach-head">
          <h2 style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 4.6vw, 64px)',
            fontWeight: 300, lineHeight: 1.08,
            letterSpacing: '-0.025em',
          }}>
            {p.title}
          </h2>
          <p style={{
            margin: 0, fontSize: 16, lineHeight: 1.75,
            color: '#433E36', maxWidth: 480,
          }}>
            {p.lede}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }} className="physio-steps-grid">
          {steps.map((s, i) => (
            <div key={i} style={{
              padding: '36px 32px',
              border: '1px solid #D4CAB8',
              background: 'rgba(255,255,255,0.5)',
            }}>
              <div className="samase-mono" style={{
                fontSize: 10, letterSpacing: '0.2em', color: '#6B5842', marginBottom: 20,
              }}>
                {s.n} · {s.meta}
              </div>
              <h3 style={{
                margin: 0, marginBottom: 14,
                fontFamily: 'var(--font-display)',
                fontSize: 24, fontWeight: 400, lineHeight: 1.15,
                letterSpacing: '-0.015em',
              }}>
                {s.title}
              </h3>
              <p style={{
                margin: 0, fontSize: 14, lineHeight: 1.65, color: '#433E36',
              }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .physio-approach-head, .physio-steps-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </section>
  );
}

// PRICING TIERS — supports 'grid' (default 3-col) or 'stack' (vertical fokus)
function PhysioPricing({ S, layout = 'grid' }) {
  const pp = S.physioPricing || { tiers: [] };
  const isStack = layout === 'stack';

  return (
    <section id="paket" style={{
      background: '#0A0706', color: '#F2EEE5',
      padding: '140px 40px',
    }}>
      <div style={{ maxWidth: isStack ? 860 : 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 48 }}>
          <span className="samase-mono" style={{ color: 'rgba(242,238,229,0.6)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            {pp.number} · {pp.kicker}
          </span>
          <span style={{ flex: 1, height: 1, background: 'rgba(242,238,229,0.18)' }} />
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isStack ? '1fr' : '1.2fr 1fr',
          gap: isStack ? 20 : 56,
          marginBottom: 72,
        }} className="physio-pricing-head">
          <h2 style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontSize: isStack ? 'clamp(32px, 4.8vw, 56px)' : 'clamp(32px, 4.6vw, 64px)',
            fontWeight: 300, lineHeight: 1.08,
            letterSpacing: '-0.025em',
            color: '#F2EEE5',
            textAlign: isStack ? 'center' : 'left',
          }}>
            {pp.title}
          </h2>
          <p style={{
            margin: isStack ? '0 auto' : 0,
            fontSize: 16, lineHeight: 1.75,
            color: 'rgba(242,238,229,0.72)',
            maxWidth: isStack ? 560 : 480,
            textAlign: isStack ? 'center' : 'left',
          }}>
            {pp.lede}
          </p>
        </div>

        {isStack ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {pp.tiers.map((t, i) => (
              <PhysioTierRow key={t.id} tier={t} index={i} isLast={i === pp.tiers.length - 1} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }} className="physio-tiers-grid">
            {pp.tiers.map((t, i) => (
              <PhysioTierCard key={t.id} tier={t} isLast={i === pp.tiers.length - 1} />
            ))}
          </div>
        )}

        <p style={{
          marginTop: 40, fontSize: 13, color: 'rgba(242,238,229,0.55)',
          lineHeight: 1.7, maxWidth: 760,
          textAlign: isStack ? 'center' : 'left',
          marginLeft: isStack ? 'auto' : 0,
          marginRight: isStack ? 'auto' : 0,
        }}>
          {pp.footnote}
        </p>
      </div>
      <style>{`
        @media (max-width: 1000px) {
          .physio-pricing-head, .physio-tiers-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </section>
  );
}

// Stack-layout row (horizontal card with price on right)
function PhysioTierRow({ tier, index, isLast }) {
  const isHighlight = tier.highlighted;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 200px',
      gap: 32,
      padding: '36px 32px',
      background: isHighlight ? '#141010' : 'transparent',
      border: '1px solid rgba(242,238,229,0.14)',
      borderBottom: isLast ? '1px solid rgba(242,238,229,0.14)' : 'none',
      position: 'relative',
      alignItems: 'start',
    }} className="physio-tier-row">
      {isHighlight && (
        <div className="samase-mono" style={{
          position: 'absolute', top: -12, left: 32,
          padding: '5px 12px',
          background: '#E8B88A', color: '#0A0706',
          fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
        }}>
          {tier.positioning}
        </div>
      )}
      <div>
        <div className="samase-mono" style={{
          fontSize: 10, letterSpacing: '0.2em',
          color: isHighlight ? '#E8B88A' : 'rgba(242,238,229,0.55)',
          textTransform: 'uppercase', marginBottom: 10,
        }}>
          {!isHighlight && tier.positioning}
          {isHighlight && '\u00A0'}
        </div>
        <h3 style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontSize: 32, fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em',
          color: '#F2EEE5',
        }}>
          {tier.label}
        </h3>
        <p style={{
          marginTop: 8, marginBottom: 18,
          fontSize: 14, color: 'rgba(242,238,229,0.7)', lineHeight: 1.55,
        }}>
          {tier.tagline}
        </p>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px 20px' }}>
          {tier.includes.map((inc, i) => (
            <li key={i} style={{
              fontSize: 13, lineHeight: 1.5,
              color: 'rgba(242,238,229,0.72)',
              paddingLeft: 14, position: 'relative',
            }}>
              <span style={{ position: 'absolute', left: 0, top: 7, width: 6, height: 1, background: '#E8B88A' }} />
              {inc}
            </li>
          ))}
        </ul>
        <p style={{
          marginTop: 18, marginBottom: 0,
          fontSize: 12, color: 'rgba(242,238,229,0.55)', fontStyle: 'italic', lineHeight: 1.55,
        }}>
          Cocok untuk: {tier.bestFor}
        </p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div className="samase-mono" style={{ fontSize: 9, color: 'rgba(242,238,229,0.5)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>
          Harga Founding
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 38, fontWeight: 300, letterSpacing: '-0.02em',
          lineHeight: 1, color: '#F2EEE5',
        }}>
          Rp {(tier.priceFounding / 1000).toLocaleString('id-ID')}<span style={{ fontSize: 14, color: 'rgba(242,238,229,0.55)' }}>K</span>
        </div>
        <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(242,238,229,0.5)' }}>
          dari Rp {(tier.priceNormal / 1000).toLocaleString('id-ID')}K
        </div>
      </div>
      <style>{`
        @media (max-width: 760px) {
          .physio-tier-row { grid-template-columns: 1fr !important; }
          .physio-tier-row > div:last-child { text-align: left !important; margin-top: 20px; }
        }
      `}</style>
    </div>
  );
}

function PhysioTierCard({ tier, isLast }) {
  const isHighlight = tier.highlighted;
  return (
    <div style={{
      padding: '44px 36px 40px',
      background: isHighlight ? '#141010' : 'transparent',
      border: '1px solid rgba(242,238,229,0.14)',
      borderRight: isLast ? '1px solid rgba(242,238,229,0.14)' : 'none',
      position: 'relative',
      display: 'flex', flexDirection: 'column',
    }}>
      {isHighlight && (
        <div className="samase-mono" style={{
          position: 'absolute', top: -12, left: 32,
          padding: '5px 12px',
          background: '#E8B88A', color: '#0A0706',
          fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
        }}>
          {tier.positioning}
        </div>
      )}
      <div className="samase-mono" style={{
        fontSize: 10, letterSpacing: '0.2em',
        color: isHighlight ? '#E8B88A' : 'rgba(242,238,229,0.55)',
        textTransform: 'uppercase', marginBottom: 14,
      }}>
        {!isHighlight && tier.positioning}
        {isHighlight && '\u00A0'}
      </div>
      <h3 style={{
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontSize: 36, fontWeight: 300, lineHeight: 1, letterSpacing: '-0.02em',
        color: '#F2EEE5',
      }}>
        {tier.label}
      </h3>
      <p style={{
        marginTop: 10, marginBottom: 28,
        fontSize: 14, color: 'rgba(242,238,229,0.7)', lineHeight: 1.55,
      }}>
        {tier.tagline}
      </p>

      {/* Price block */}
      <div style={{ marginBottom: 28 }}>
        <div className="samase-mono" style={{ fontSize: 9, color: 'rgba(242,238,229,0.5)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>
          Harga Founding
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 42, fontWeight: 300, letterSpacing: '-0.02em',
          lineHeight: 1, color: '#F2EEE5',
        }}>
          Rp {(tier.priceFounding / 1000).toLocaleString('id-ID')}<span style={{ fontSize: 16, color: 'rgba(242,238,229,0.55)' }}>K</span>
        </div>
        <div style={{ marginTop: 6, fontSize: 12, color: 'rgba(242,238,229,0.5)' }}>
          Tarif klub Rp {(tier.priceNormal / 1000).toLocaleString('id-ID')}K
        </div>
      </div>

      {/* Includes */}
      <div style={{ flex: 1, marginBottom: 28 }}>
        <div className="samase-mono" style={{ fontSize: 9, color: 'rgba(242,238,229,0.5)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>
          Termasuk
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {tier.includes.map((inc, i) => (
            <li key={i} style={{
              padding: '7px 0',
              fontSize: 13, lineHeight: 1.55,
              color: 'rgba(242,238,229,0.78)',
              borderBottom: i < tier.includes.length - 1 ? '1px solid rgba(242,238,229,0.08)' : 'none',
            }}>
              {inc}
            </li>
          ))}
        </ul>
      </div>

      {/* Best for */}
      <div style={{
        padding: '14px 0 0',
        borderTop: '1px solid rgba(242,238,229,0.1)',
      }}>
        <div className="samase-mono" style={{ fontSize: 9, color: 'rgba(242,238,229,0.5)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>
          Cocok untuk
        </div>
        <p style={{
          margin: 0, fontSize: 12, lineHeight: 1.55,
          color: 'rgba(242,238,229,0.65)', fontStyle: 'italic',
        }}>
          {tier.bestFor}
        </p>
      </div>
    </div>
  );
}

// COMBO PREVIEW
function PhysioComboPreview({ S }) {
  const c = S.combo || {};
  return (
    <section style={{
      background: '#F2EEE5', color: '#1C1A17',
      padding: '120px 40px',
    }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, alignItems: 'center' }} className="physio-combo-grid">
          <div>
            <div className="samase-mono" style={{
              fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#6B5842', marginBottom: 20,
            }}>
              Combo · Fitspace + Physio
            </div>
            <h2 style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.6vw, 44px)',
              fontWeight: 300, lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              {c.title}
            </h2>
            <p style={{
              marginTop: 20, fontSize: 15, lineHeight: 1.7,
              color: '#433E36',
            }}>
              {c.lede}
            </p>
          </div>
          <div style={{
            padding: '32px 36px',
            background: '#FFFFFF',
            border: '1px solid #D4CAB8',
          }}>
            {c.items && c.items.map((item, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                padding: '12px 0',
                borderBottom: '1px solid #EDE7D9',
              }}>
                <div>
                  <div style={{ fontSize: 14, color: '#1C1A17', fontWeight: 500 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: '#776F63', marginTop: 3 }}>{item.note}</div>
                </div>
                <div className="samase-mono" style={{ fontSize: 13, color: '#1C1A17' }}>
                  Rp {(item.price / 1000).toLocaleString('id-ID')}K
                </div>
              </div>
            ))}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              padding: '16px 0 6px',
            }}>
              <div className="samase-mono" style={{ fontSize: 10, letterSpacing: '0.16em', color: '#6B5842', textTransform: 'uppercase' }}>
                Combo Founding
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 32, fontWeight: 300, letterSpacing: '-0.02em',
              }}>
                Rp {(c.totalCombo / 1000).toLocaleString('id-ID')}K
              </div>
            </div>
            <p style={{
              margin: '16px 0 0', fontSize: 12, lineHeight: 1.6, color: '#776F63',
              fontStyle: 'italic',
            }}>
              {c.noteLong}
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .physio-combo-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

// PARTNER — Bebascedera
function PhysioPartner({ S }) {
  const p = S.physio?.partner || {};
  return (
    <section style={{
      background: '#0A0706', color: '#F2EEE5',
      padding: '120px 40px',
      borderTop: '1px solid rgba(242,238,229,0.08)',
    }}>
      <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
        <div className="samase-mono" style={{
          fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
          color: '#E8B88A', marginBottom: 24,
        }}>
          Mitra Klinis
        </div>
        <h2 style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4vw, 52px)',
          fontWeight: 300, lineHeight: 1.12,
          letterSpacing: '-0.02em',
          color: '#F2EEE5',
        }}>
          Bersama <span style={{ fontStyle: 'italic' }}>Bebascedera.</span>
        </h2>
        <p style={{
          margin: '28px auto 0', maxWidth: 640,
          fontSize: 16, lineHeight: 1.75,
          color: 'rgba(242,238,229,0.75)',
        }}>
          {p.body}
        </p>
        {p.url && (
          <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block', marginTop: 28,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: '#E8B88A', textDecoration: 'none',
            borderBottom: '1px solid #E8B88A',
            paddingBottom: 3,
          }}>
            Kunjungi bebascedera.com →
          </a>
        )}
      </div>
    </section>
  );
}

// FAQ (sub-selection dari main FAQ)
function PhysioFAQ({ S }) {
  const allFaq = S.faq?.items || [];
  // Hand-picked Physio-relevant questions
  const slugs = [
    'Apa yang terjadi setelah saya menjadwalkan Postural Assessment?',
    'Apakah Physio bisa diambil tanpa keanggotaan Fitspace?',
    'Bagaimana kerja sama dengan Bebascedera berlangsung?',
    'Saya berusia 55+. Apakah program ini untuk saya?',
    'Kalau setelah Consultation saya memutuskan tidak bergabung?',
  ];
  const items = allFaq.filter(it => slugs.some(s => it.q.includes(s.split('?')[0].slice(0, 20))));
  const [open, setOpen] = React.useState(0);

  return (
    <section style={{
      background: '#F2EEE5', color: '#1C1A17',
      padding: '120px 40px',
    }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div className="samase-mono" style={{
          fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#776F63', marginBottom: 20,
        }}>
          FAQ · Physio
        </div>
        <h2 style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 4.2vw, 54px)',
          fontWeight: 300, lineHeight: 1.1,
          letterSpacing: '-0.02em', marginBottom: 48,
        }}>
          Yang sering ditanyakan.
        </h2>
        <div>
          {items.map((item, i) => (
            <div key={i} style={{
              borderTop: '1px solid #D4CAB8',
              borderBottom: i === items.length - 1 ? '1px solid #D4CAB8' : 'none',
            }}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  width: '100%', padding: '24px 0',
                  background: 'transparent', border: 'none',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24,
                  cursor: 'pointer', textAlign: 'left',
                  color: '#1C1A17',
                  fontFamily: 'inherit',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 400,
                  lineHeight: 1.4, letterSpacing: '-0.01em',
                }}>
                  {item.q}
                </span>
                <span className="samase-mono" style={{
                  fontSize: 14, color: '#6B5842', flexShrink: 0, marginTop: 4,
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform 220ms',
                }}>+</span>
              </button>
              <div style={{
                maxHeight: open === i ? 300 : 0,
                overflow: 'hidden',
                transition: 'max-height 320ms ease',
              }}>
                <p style={{
                  margin: 0, padding: '0 0 24px',
                  fontSize: 15, lineHeight: 1.7, color: '#433E36',
                  maxWidth: 720,
                }}>
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FINAL CTA
function PhysioCTA({ S }) {
  return (
    <section style={{
      background: '#0A0706', color: '#F2EEE5',
      padding: '120px 40px',
    }}>
      <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(30px, 4vw, 56px)',
          fontWeight: 300, lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}>
          Titik awalnya sama: <span style={{ fontStyle: 'italic' }}>Postural Assessment.</span>
        </h2>
        <p style={{
          margin: '24px auto 40px', maxWidth: 560,
          fontSize: 16, lineHeight: 1.7, color: 'rgba(242,238,229,0.72)',
        }}>
          Baik kamu datang untuk cedera, pemulihan, atau pencegahan — prosesnya dimulai dari sesi asesmen 15–30 menit bersama tim Bebascedera.
        </p>
        <a href="campaign.html?src=physio" className="umbrella-primary-cta">
          Jadwalkan Assessment →
        </a>
      </div>
    </section>
  );
}

window.PhysioApp = PhysioApp;
