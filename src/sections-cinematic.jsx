// SAMASE — Layout variant: Cinematic
// Photo-as-background treatment for the key sections (Hero, Facilities, Physio,
// Founding, Coach). All other sections stay clean (Philosophy, Audience, Schedule,
// Blog, Events, FAQ, Form) so the rhythm breathes and the final CTA lands.
//
// Structure, copy, and data are unchanged. Each Cinematic* component re-composes
// the same CMS content over a full-bleed PhotoSlot with a dark scrim, oversized
// ALL-CAPS title, small kicker, and a discrete terracotta accent.
//
// Upload real photos via Admin → Facilities / Coach / Hero. Until then, PhotoSlot
// renders the placeholder gradient + subject hint so layout is testable.

// ============================================================
// 1. CinematicHero — full-bleed hero photo + oversized ALL CAPS
// ============================================================
function CinematicPhotoHero() {
  const S = window.useSAMASE ? window.useSAMASE() : window.SAMASE;
  const h = S.hero;
  const ctx = (window.getFoundingContext && window.getFoundingContext()) || null;

  return (
    <section id="section-hero" data-screen-label="01 Hero (Cinematic)"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0',
        color: '#F2EEE5',
        overflow: 'hidden',
        background: '#0A0706',
      }}>
      {/* Full-bleed photo */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <window.PhotoSlot
          slotKey="hero.cinematic"
          label="HERO · MAIN BACKDROP"
          subject="silhouette"
          tone="cinematic"
          aspect="auto"
          style={{ width: '100%', height: '100%', aspectRatio: 'auto' }}
        />
      </div>

      {/* Dark gradient scrim for text legibility */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,7,6,0.55) 0%, rgba(10,7,6,0.25) 35%, rgba(10,7,6,0.85) 100%)',
        pointerEvents: 'none',
      }}/>

      {/* Top-left kicker */}
      <div style={{
        position: 'absolute', top: 120, left: 0, right: 0, zIndex: 2,
      }}>
        <div className="samase-container" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <span className="samase-mono" style={{ color: '#F2EEE5', opacity: 0.85, letterSpacing: '0.2em' }}>
            <span style={{
              display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
              background: 'var(--accent)', marginRight: 10, verticalAlign: 'middle',
              animation: 'samase-pulse 2.4s ease-in-out infinite',
            }} />
            {h.kicker}
          </span>
          <span className="samase-mono" style={{ color: '#F2EEE5', opacity: 0.55 }}>
            {S.brand.opening} · {S.brand.city}
          </span>
        </div>
      </div>

      {/* Headline bottom-left */}
      <div className="samase-container" style={{
        position: 'relative', zIndex: 2, paddingBottom: 80, paddingTop: 160,
      }}>
        <Reveal>
          <h1 style={{
            margin: 0,
            color: '#F2EEE5',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(40px, 7.2vw, 108px)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.035em',
            textTransform: 'uppercase',
            textWrap: 'balance',
          }}>
            {h.titleTop}<br/>
            {h.titleMid}<br/>
            <span style={{ color: 'var(--accent)' }}>{h.titleBot}</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <div className="cine-hero-bottom" style={{
            marginTop: 48,
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 48,
            alignItems: 'end',
          }}>
            <p style={{
              margin: 0,
              maxWidth: 560,
              fontSize: 17,
              lineHeight: 1.7,
              color: '#F2EEE5',
              opacity: 0.82,
            }}>
              {h.lede}
            </p>

            {ctx && ctx.batch && !ctx.allFull && (
              <div style={{
                minWidth: 260,
                padding: '20px 24px',
                border: '1px solid rgba(242,238,229,0.2)',
                background: 'rgba(10,7,6,0.5)',
                backdropFilter: 'blur(8px)',
              }}>
                <div className="samase-mono" style={{ fontSize: 9, opacity: 0.65, marginBottom: 8, color: '#F2EEE5' }}>
                  Slot kamu · {ctx.batch.label}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 28, color: '#F2EEE5', letterSpacing: '-0.02em' }}>
                  {ctx.batch.slotsTaken}<span style={{ opacity: 0.4 }}>/{ctx.batch.slotsTotal}</span>
                </div>
                <div style={{ height: 2, background: 'rgba(242,238,229,0.18)', marginTop: 10, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${ctx.pct}%`, background: 'var(--accent)' }} />
                </div>
                <a href="#section-form" className="samase-mono" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  marginTop: 18, padding: '12px 18px', fontSize: 10,
                  background: 'var(--accent)', color: '#F2EEE5',
                  borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.16em',
                }}>
                  Amankan Slot →
                </a>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {/* Bottom strip */}
      <div style={{ position: 'relative', zIndex: 2, paddingBottom: 32 }}>
        <div className="samase-container" style={{
          display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
          borderTop: '1px solid rgba(242,238,229,0.18)', paddingTop: 20,
        }}>
          <span className="samase-serif-italic" style={{ color: '#F2EEE5', opacity: 0.65, fontSize: 15 }}>{h.footer}</span>
          <a href="#section-philosophy" className="samase-mono" style={{ color: '#F2EEE5', opacity: 0.65 }}>Scroll ↓</a>
        </div>
      </div>

      <style>{`
        @keyframes samase-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.85); }
        }
        @media (max-width: 860px) {
          .cine-hero-bottom { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// 2. CinematicFacilities — photo full-bleed per tile, ALL CAPS label bottom-left
// ============================================================
function CinematicFacilities() {
  const S = window.useSAMASE ? window.useSAMASE() : window.SAMASE;
  const fac = S.facilities || {};
  const items = Array.isArray(fac.items) ? fac.items : [];

  const subjects = ['equipment','portrait','women','senior','padel','recovery','space','physio'];

  return (
    <section id="section-facilities" data-screen-label="04 Facilities (Cinematic)"
      style={{ padding: '0', background: '#0A0706', color: '#F2EEE5' }}>
      {/* Section header on dark */}
      <div style={{ padding: '120px 0 60px' }}>
        <div className="samase-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
            <span className="samase-mono" style={{ color: '#F2EEE5', opacity: 0.6 }}>
              {fac.number} · {fac.kicker}
            </span>
            <span style={{ flex: 1, height: 1, background: '#F2EEE5', opacity: 0.18 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'end' }} className="cine-fac-head">
            <h2 style={{
              margin: 0,
              fontSize: 'clamp(40px, 6vw, 88px)',
              fontFamily: 'var(--font-body)',
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: '#F2EEE5',
            }}>
              {fac.title}
            </h2>
            <p style={{
              margin: 0,
              fontSize: 16,
              lineHeight: 1.65,
              color: '#F2EEE5',
              opacity: 0.68,
              maxWidth: 460,
            }}>
              {fac.lede}
            </p>
          </div>
        </div>
      </div>

      {/* Photo tiles grid, zero-gap between */}
      <div className="cine-fac-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 0,
      }}>
        {items.map((item, i) => (
          <CinematicFacilityTile
            key={item.id || i}
            item={item}
            index={i}
            subject={subjects[i % subjects.length]}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .cine-fac-head { grid-template-columns: 1fr !important; gap: 24px !important; }
          .cine-fac-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function CinematicFacilityTile({ item, index, subject }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        aspectRatio: '4/5',
        overflow: 'hidden',
        cursor: 'default',
      }}>
      <div style={{
        position: 'absolute', inset: 0,
        transform: hover ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}>
        <window.PhotoSlot
          slotKey={`facility.${item.id || index}`}
          label={(item.title || '').toUpperCase()}
          subject={subject}
          tone="cinematic"
          aspect="auto"
          style={{ width: '100%', height: '100%', aspectRatio: 'auto' }}
        />
      </div>

      {/* Scrim */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: hover
          ? 'linear-gradient(180deg, rgba(10,7,6,0.25) 0%, rgba(10,7,6,0.8) 100%)'
          : 'linear-gradient(180deg, rgba(10,7,6,0.15) 0%, rgba(10,7,6,0.7) 100%)',
        transition: 'background 420ms ease',
        pointerEvents: 'none',
      }}/>

      {/* Index top-left */}
      <div className="samase-mono" style={{
        position: 'absolute', top: 22, left: 24,
        color: '#F2EEE5', opacity: 0.7, fontSize: 10, letterSpacing: '0.16em',
      }}>
        0{index + 1}
      </div>

      {/* Title bottom-left, ALL CAPS */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '28px 28px 32px',
      }}>
        <h3 style={{
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontWeight: 800,
          fontSize: 'clamp(22px, 2.4vw, 34px)',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#F2EEE5',
        }}>
          {item.title}
        </h3>
        <div style={{
          maxHeight: hover ? 80 : 0,
          opacity: hover ? 0.82 : 0,
          transition: 'max-height 320ms ease, opacity 320ms ease, margin-top 320ms ease',
          marginTop: hover ? 10 : 0,
          overflow: 'hidden',
        }}>
          <p style={{
            margin: 0,
            fontSize: 13,
            lineHeight: 1.5,
            color: '#F2EEE5',
          }}>
            {item.body || item.lede || item.copy || ''}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 3. CinematicPhysio — split photo, copy on right, dark bg
// ============================================================
function CinematicPhysio() {
  const S = window.useSAMASE ? window.useSAMASE() : window.SAMASE;
  const p = S.physio || {};
  const steps = Array.isArray(p.steps) ? p.steps : [];

  return (
    <section id="section-physio" data-screen-label="05 Physio (Cinematic)"
      style={{
        position: 'relative',
        background: '#0A0706',
        color: '#F2EEE5',
        padding: 0,
        overflow: 'hidden',
      }}>
      <div className="cine-physio-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '80vh',
      }}>
        {/* Left: photo */}
        <div style={{ position: 'relative', minHeight: 600 }}>
          <window.PhotoSlot
            slotKey="physio.hero"
            label="PHYSIO · POSTURAL ASSESSMENT"
            subject="physio"
            tone="cinematic"
            aspect="auto"
            style={{ width: '100%', height: '100%', aspectRatio: 'auto', position: 'absolute', inset: 0 }}
          />
        </div>

        {/* Right: copy */}
        <div style={{
          padding: '120px 8vw 120px 64px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <span className="samase-mono" style={{ color: '#F2EEE5', opacity: 0.6 }}>
              {p.number} · {p.kicker}
            </span>
            <span style={{ flex: 1, height: 1, background: '#F2EEE5', opacity: 0.18 }} />
          </div>

          <Reveal>
            <h2 style={{
              margin: 0,
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(36px, 4.6vw, 68px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: '#F2EEE5',
            }}>
              {p.title}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p style={{
              marginTop: 24, marginBottom: 40,
              fontSize: 17, lineHeight: 1.7,
              color: '#F2EEE5', opacity: 0.74,
              maxWidth: 480,
            }}>
              {p.lede}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <ol style={{
              listStyle: 'none', padding: 0, margin: 0,
              display: 'flex', flexDirection: 'column', gap: 18,
              borderTop: '1px solid rgba(242,238,229,0.18)',
              paddingTop: 28,
            }}>
              {steps.map((s, i) => (
                <li key={i} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 18, alignItems: 'start' }}>
                  <span className="samase-mono" style={{
                    fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', paddingTop: 4,
                  }}>
                    0{i + 1}
                  </span>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 17, fontWeight: 600, marginBottom: 4,
                      letterSpacing: '-0.01em',
                      color: '#F2EEE5',
                    }}>
                      {s.title}
                    </div>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: '#F2EEE5', opacity: 0.65 }}>
                      {s.body}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .cine-physio-grid { grid-template-columns: 1fr !important; }
          .cine-physio-grid > div:last-child { padding: 80px 6vw 80px !important; }
          .cine-physio-grid > div:first-child { min-height: 500px !important; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// 4. CinematicFounding — dark photo bg, 3 batch cards as info only, single CTA
// ============================================================
function CinematicFounding() {
  const S = window.useSAMASE ? window.useSAMASE() : window.SAMASE;
  const f = S.founding || {};
  const batches = Array.isArray(f.batches) ? f.batches : [];
  const ctx = (window.getFoundingContext && window.getFoundingContext()) || null;

  return (
    <section id="section-founding" data-screen-label="06 Founding (Cinematic)"
      style={{
        position: 'relative',
        color: '#F2EEE5',
        overflow: 'hidden',
        background: '#0A0706',
      }}>
      {/* Photo bg */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <window.PhotoSlot
          slotKey="founding.hero"
          label="FOUNDING · COMMUNITY"
          subject="duo"
          tone="cinematic"
          aspect="auto"
          style={{ width: '100%', height: '100%', aspectRatio: 'auto' }}
        />
      </div>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,7,6,0.75) 0%, rgba(10,7,6,0.9) 60%, rgba(10,7,6,0.95) 100%)',
      }}/>

      <div className="samase-container" style={{ position: 'relative', padding: '140px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
          <span className="samase-mono" style={{ color: '#F2EEE5', opacity: 0.6 }}>
            {f.number} · {f.kicker}
          </span>
          <span style={{ flex: 1, height: 1, background: '#F2EEE5', opacity: 0.18 }} />
        </div>

        <Reveal>
          <h2 style={{
            margin: 0,
            maxWidth: 1100,
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(40px, 6.4vw, 104px)',
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#F2EEE5',
          }}>
            {f.title}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="samase-serif-italic" style={{
            marginTop: 28,
            fontSize: 20,
            color: '#F2EEE5',
            opacity: 0.72,
            lineHeight: 1.55,
            maxWidth: 640,
          }}>
            {f.lede}
          </p>
        </Reveal>

        {/* Batch timeline row (info only, no per-card CTA) */}
        <Reveal delay={200}>
          <div className="cine-batch-row" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            marginTop: 64,
          }}>
            {batches.map((b, i) => (
              <CinematicBatchInfo key={b.id || i} batch={b} index={i} />
            ))}
          </div>
        </Reveal>

        {/* Live status + single CTA */}
        <Reveal delay={280}>
          <div style={{
            marginTop: 56,
            paddingTop: 32,
            borderTop: '1px solid rgba(242,238,229,0.18)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            gap: 24, flexWrap: 'wrap',
          }}>
            {ctx && !ctx.allFull && ctx.batch && (
              <div style={{ color: '#F2EEE5', opacity: 0.85, fontSize: 14, maxWidth: 600, lineHeight: 1.55 }}>
                Sekarang kamu akan masuk <b style={{ color: 'var(--accent)' }}>Gelombang {ctx.batch.gelombang || ctx.batch.label}</b>.
                Tersisa <b>{ctx.remaining}</b> slot dengan harga Rp {((ctx.batch.priceOpenGym3M || 0)/1000).toLocaleString('id-ID')}K.
                Slot ditetapkan otomatis saat kamu mendaftar.
              </div>
            )}
            {ctx && ctx.allFull && (
              <div style={{ color: '#F2EEE5', opacity: 0.75, fontSize: 14, maxWidth: 600, lineHeight: 1.55 }}>
                Founding member sudah tutup. Masuk <b style={{ color: 'var(--accent)' }}>waitlist eksklusif</b> — kamu diprioritaskan saat ada slot lepas atau gelombang reguler dibuka.
              </div>
            )}
            <a href="#section-form" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: '18px 28px',
              background: ctx && ctx.allFull ? 'transparent' : 'var(--accent)',
              color: '#F2EEE5',
              border: ctx && ctx.allFull ? '1px solid rgba(242,238,229,0.4)' : 'none',
              borderRadius: 999, fontSize: 14, fontWeight: 600,
            }}>
              <span className="samase-mono" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {ctx && ctx.allFull ? 'Daftar Waitlist' : (f.ctaLabelShort || 'Daftar Sekarang')}
              </span>
              <span>→</span>
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .cine-batch-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function CinematicBatchInfo({ batch, index }) {
  const isActive = batch.status === 'active';
  const isClosed = batch.status === 'closed';
  const pct = batch.slotsTotal ? Math.round((batch.slotsTaken / batch.slotsTotal) * 100) : 0;
  return (
    <div style={{
      position: 'relative',
      padding: '28px 26px 26px',
      background: '#141414',
      border: `1px solid ${isActive ? 'var(--accent)' : 'rgba(255,255,255,0.14)'}`,
      opacity: isClosed ? 0.55 : 1,
      display: 'flex', flexDirection: 'column', gap: 14,
      minHeight: 280,
      overflow: 'hidden',
      transition: 'transform 400ms ease',
    }}>
      {/* Per-batch photo backdrop */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <window.PhotoSlot
          slotKey={`founding.${batch.id || index}`}
          label={(batch.label || `Gelombang ${index + 1}`).toUpperCase()}
          subject={index === 0 ? 'silhouette' : index === 1 ? 'studio' : 'detail'}
          tone="cinematic"
          aspect="auto"
          style={{ width: '100%', height: '100%', aspectRatio: 'auto' }}
        />
      </div>
      {/* Dark scrim for legibility — stronger for active card to show accent */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: isActive
          ? 'linear-gradient(180deg, rgba(10,7,6,0.55) 0%, rgba(10,7,6,0.9) 100%)'
          : 'linear-gradient(180deg, rgba(10,7,6,0.7) 0%, rgba(10,7,6,0.95) 100%)',
      }}/>

      {/* Content on top of photo */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
        <div className="samase-mono" style={{ fontSize: 9, color: isActive ? 'var(--accent)' : '#F2EEE5', opacity: isActive ? 0.95 : 0.6, letterSpacing: '0.16em' }}>
          {batch.gelombang} · {isActive ? 'AKTIF SEKARANG' : isClosed ? 'TUTUP' : 'MENDATANG'}
        </div>
        <div style={{
          fontFamily: 'var(--font-body)', fontWeight: 800,
          fontSize: 36, color: '#F2EEE5', lineHeight: 1,
          textTransform: 'uppercase', letterSpacing: '-0.02em',
        }}>
          {batch.label}
        </div>
        <div style={{ fontSize: 13, color: '#F2EEE5', opacity: 0.75, lineHeight: 1.5 }}>
          Dari Rp {((batch.priceOpenGym3M || 0)/1000).toLocaleString('id-ID')}K · paket 3 bulan
        </div>
        {isActive && (
          <>
            <div style={{ height: 2, background: 'rgba(242,238,229,0.14)', overflow: 'hidden', marginTop: 'auto' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)' }} />
            </div>
            <div className="samase-mono" style={{ fontSize: 10, color: '#F2EEE5', opacity: 0.7 }}>
              {batch.slotsTaken}/{batch.slotsTotal} slot · {pct}% terisi
            </div>
          </>
        )}
        {!isActive && (
          <div style={{ marginTop: 'auto', fontSize: 11, color: '#F2EEE5', opacity: 0.5, lineHeight: 1.5 }} className="samase-mono">
            {isClosed ? 'Batch ini sudah tutup' : `Dibuka setelah ${index > 0 ? 'gelombang sebelumnya' : 'saat ini'} penuh`}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// 5. CinematicCoach — portrait grid full-bleed, name overlay bottom
// ============================================================
function CinematicCoach() {
  const S = window.useSAMASE ? window.useSAMASE() : window.SAMASE;
  const c = S.coach || {};
  const items = Array.isArray(c.team) ? c.team : (Array.isArray(c.items) ? c.items : []);

  return (
    <section id="section-coach" data-screen-label="07 Coach (Cinematic)"
      style={{ background: '#0A0706', color: '#F2EEE5', padding: '140px 0 0' }}>
      <div className="samase-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
          <span className="samase-mono" style={{ color: '#F2EEE5', opacity: 0.6 }}>
            {c.number} · {c.kicker}
          </span>
          <span style={{ flex: 1, height: 1, background: '#F2EEE5', opacity: 0.18 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'end' }} className="cine-coach-head">
          <h2 style={{
            margin: 0,
            fontFamily: 'var(--font-body)', fontWeight: 800,
            fontSize: 'clamp(40px, 6vw, 88px)',
            lineHeight: 0.92, letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#F2EEE5',
          }}>
            {c.title}
          </h2>
          <p style={{
            margin: 0, fontSize: 16, lineHeight: 1.65,
            color: '#F2EEE5', opacity: 0.68, maxWidth: 460,
          }}>
            {c.lede || c.body}
          </p>
        </div>
      </div>

      {/* Portrait grid — zero gap, full bleed */}
      <div className="cine-coach-grid" style={{
        marginTop: 80,
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.min(items.length, 4) || 1}, 1fr)`,
        gap: 0,
      }}>
        {items.map((coach, i) => (
          <CinematicCoachCard key={coach.id || i} coach={coach} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .cine-coach-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .cine-coach-grid { grid-template-columns: 1fr !important; }
          .cine-coach-head { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}

function CinematicCoachCard({ coach, index }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        transform: hover ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        filter: hover ? 'grayscale(0)' : 'grayscale(0.4)',
      }}>
        <window.PhotoSlot
          slotKey={`coach.${coach.id || index}`}
          label={(coach.name || '').toUpperCase()}
          subject="portrait"
          tone="cinematic"
          aspect="auto"
          style={{ width: '100%', height: '100%', aspectRatio: 'auto' }}
        />
      </div>

      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: hover
          ? 'linear-gradient(180deg, rgba(10,7,6,0.15) 0%, rgba(10,7,6,0.9) 100%)'
          : 'linear-gradient(180deg, rgba(10,7,6,0.2) 0%, rgba(10,7,6,0.7) 100%)',
        transition: 'background 420ms ease',
      }}/>

      <div className="samase-mono" style={{
        position: 'absolute', top: 22, left: 24,
        color: '#F2EEE5', opacity: 0.7, fontSize: 10, letterSpacing: '0.16em',
      }}>
        0{index + 1}
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 24px 30px',
      }}>
        <div className="samase-mono" style={{ color: 'var(--accent)', fontSize: 9, marginBottom: 8 }}>
          {coach.role || ''}
        </div>
        <h3 style={{
          margin: 0,
          fontFamily: 'var(--font-body)', fontWeight: 800,
          fontSize: 'clamp(20px, 2vw, 28px)',
          lineHeight: 1.05, letterSpacing: '-0.02em',
          textTransform: 'uppercase', color: '#F2EEE5',
        }}>
          {coach.name}
        </h3>

        <div style={{
          maxHeight: hover ? 140 : 0,
          opacity: hover ? 0.85 : 0,
          marginTop: hover ? 12 : 0,
          transition: 'max-height 340ms ease, opacity 340ms ease, margin-top 340ms ease',
          overflow: 'hidden',
        }}>
          {(Array.isArray(coach.tags) && coach.tags.length > 0 || coach.specialty) && (
            <div>
              {coach.specialty && (
                <div style={{ fontSize: 13, color: '#F2EEE5', opacity: 0.88, marginBottom: 6, lineHeight: 1.5 }}>
                  {coach.specialty}
                </div>
              )}
              {Array.isArray(coach.tags) && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {coach.tags.slice(0, 4).map((t, i) => (
                    <span key={i} className="samase-mono" style={{
                      fontSize: 9, padding: '4px 8px',
                      border: '1px solid rgba(242,238,229,0.3)',
                      color: '#F2EEE5', opacity: 0.8,
                      letterSpacing: '0.14em', textTransform: 'uppercase',
                    }}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  CinematicPhotoHero,
  CinematicFacilities,
  CinematicFacilityTile,
  CinematicPhysio,
  CinematicFounding,
  CinematicBatchInfo,
  CinematicCoach,
  CinematicCoachCard,
});
