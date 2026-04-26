// SAMASE — more sections: Facilities, Physio, Founding (Batch system) — v3

const S2 = window.SAMASE;

// ============ Facilities ============
function Facilities() {
  const SS = (window.useSAMASE ? window.useSAMASE() : (window.SAMASE || {}));
  const f = SS.facilities || {};
  const items = Array.isArray(f.items) ? f.items : [];
  const layout = (SS.ui && SS.ui.facilityLayout) || 'grid';
  const kicker = (window._t && window._t('facilities.kicker')) || f.kicker;
  const title = (window._t && window._t('facilities.title')) || f.title;
  const lede = (window._t && window._t('facilities.lede')) || f.lede;

  return (
    <section
      id="section-facilities"
      style={{ padding: '120px 0', background: 'var(--bg-elev)' }}
    >
      <div className="samase-container">
        <SectionKicker number={f.number} label={kicker} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          marginBottom: 80,
          alignItems: 'end',
        }} className="fac-head">
          <Reveal>
            <h2 className="samase-display" style={{
              fontSize: 'clamp(36px, 4.6vw, 68px)',
              margin: 0,
              color: 'var(--ink)',
            }}>
              {title}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="samase-serif-italic" style={{
              fontSize: 20,
              color: 'var(--ink-soft)',
              margin: 0,
              lineHeight: 1.5,
              maxWidth: 440,
            }}>
              {lede}
            </p>
          </Reveal>
        </div>

        {layout === 'fullphoto' ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
          }} className="fac-grid">
            {items.map((it, i) => (
              <Reveal key={it.n} delay={(i % 3) * 60}>
                <FacilityFullPhotoCell {...it} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }} className="fac-grid">
            {items.map((it, i) => (
              <Reveal key={it.n} delay={(i % 3) * 60}>
                <FacilityCell {...it} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .fac-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 700px) {
          .fac-head { grid-template-columns: 1fr !important; gap: 32px !important; }
          .fac-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============ Full-photo layout: photo fills card, title overlaid at bottom ============
function FacilityFullPhotoCell({ n, title, body, photos, coverPhoto }) {
  const [hover, setHover] = React.useState(false);
  const cover = coverPhoto || (photos && photos[0] && photos[0].url) || '';
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        aspectRatio: '3/4',
        overflow: 'hidden',
        background: 'var(--ink)',
        cursor: 'pointer',
      }}
    >
      {/* Photo or placeholder */}
      {cover ? (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${cover})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          transform: hover ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 600ms cubic-bezier(.2,.6,.2,1)',
        }} />
      ) : (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, #3B2F24 0%, #1C1510 100%)',
          display: 'grid', placeItems: 'center',
        }}>
          <div className="samase-mono" style={{
            color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.2em',
            textAlign: 'center', padding: 24,
          }}>
            {title.toUpperCase()}<br/><span style={{opacity: 0.6}}>PHOTO PLACEHOLDER</span>
          </div>
        </div>
      )}

      {/* Gradient for readable text */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.8) 100%)',
      }} />

      {/* Number top-left */}
      <div style={{
        position: 'absolute', top: 18, left: 20,
        color: '#FFF', fontSize: 11, letterSpacing: '0.14em',
        fontFamily: "'JetBrains Mono', monospace",
        mixBlendMode: 'difference',
        opacity: 0.9,
      }}>
        {n}
      </div>

      {/* Title + body at bottom */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '22px 24px 24px',
        color: '#FFF',
      }}>
        <div className="samase-display" style={{
          fontSize: 26, lineHeight: 1.1, margin: 0,
          transform: hover ? 'translateY(0)' : 'translateY(6px)',
          transition: 'transform 320ms',
        }}>
          {title}
        </div>
        <p style={{
          margin: '8px 0 0', fontSize: 13, lineHeight: 1.55,
          color: 'rgba(255,255,255,0.8)',
          maxHeight: hover ? 100 : 0,
          opacity: hover ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 320ms, opacity 240ms',
        }}>
          {body}
        </p>
      </div>
    </div>
  );
}

// ============ Facility cell — with auto-sliding photo gallery ============
function FacilityCell({ n, title, body, photos }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--line)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 280ms cubic-bezier(.2,.6,.2,1)',
        transform: hover ? 'translateY(-3px)' : 'none',
        boxShadow: hover ? '0 18px 40px -22px rgba(30,22,10,0.18)' : 'none',
      }}
    >
      {/* Photo slider */}
      <FacilitySlider photos={photos || []} paused={hover} title={title} />

      {/* Content */}
      <div style={{ padding: '24px 26px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <span className="samase-mono" style={{ color: 'var(--accent)', fontSize: 10 }}>
            {n}
          </span>
        </div>
        <div className="samase-display" style={{
          fontSize: 22,
          color: 'var(--ink)',
          marginBottom: 10,
          lineHeight: 1.15,
        }}>
          {title}
        </div>
        <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.6 }}>
          {body}
        </p>
      </div>
    </div>
  );
}

// ============ Photo slider — auto + manual ============
function FacilitySlider({ photos, paused, title }) {
  const slides = photos && photos.length > 0 ? photos : [
    { label: 'Photo 1', caption: 'Placeholder' },
    { label: 'Photo 2', caption: 'Placeholder' },
  ];
  const [idx, setIdx] = React.useState(0);

  // Auto-slide every 4s, pause on hover
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIdx(i => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const go = (delta) => setIdx(i => (i + delta + slides.length) % slides.length);
  const jump = (i) => setIdx(i);

  const cur = slides[idx];

  return (
    <div style={{
      position: 'relative',
      aspectRatio: '4 / 3',
      overflow: 'hidden',
      background: 'var(--bg-elev)',
    }}>
      {/* Sliding viewport */}
      <div style={{
        display: 'flex',
        width: `${slides.length * 100}%`,
        height: '100%',
        transform: `translateX(-${idx * (100 / slides.length)}%)`,
        transition: 'transform 560ms cubic-bezier(.2,.6,.2,1)',
      }}>
        {slides.map((s, i) => (
          s.url ? (
            <div key={i} style={{
              width: `${100 / slides.length}%`,
              height: '100%',
              backgroundImage: `url(${s.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              flex: 'none',
            }} />
          ) : (
            <FacilityPhotoPlaceholder
              key={i}
              label={s.label}
              caption={s.caption}
              facilityTitle={title}
              index={i}
              width={`${100 / slides.length}%`}
            />
          )
        ))}
      </div>

      {/* Manual prev / next */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous"
        style={arrowStyle('left')}
      >‹</button>
      <button
        onClick={() => go(1)}
        aria-label="Next"
        style={arrowStyle('right')}
      >›</button>

      {/* Dots */}
      <div style={{
        position: 'absolute',
        bottom: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 6,
        zIndex: 2,
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => jump(i)}
            aria-label={`Go to photo ${i + 1}`}
            style={{
              width: i === idx ? 18 : 6,
              height: 6,
              borderRadius: 999,
              border: 'none',
              background: i === idx ? 'var(--bg-card)' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 260ms',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Caption */}
      {cur && cur.caption && (
        <div style={{
          position: 'absolute',
          top: 12,
          left: 14,
          background: 'rgba(28,26,23,0.7)',
          color: '#F2EEE5',
          padding: '4px 10px',
          fontSize: 10,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.08em',
          borderRadius: 999,
          backdropFilter: 'blur(6px)',
          zIndex: 2,
        }}>
          {cur.caption}
        </div>
      )}
    </div>
  );
}

function arrowStyle(side) {
  return {
    position: 'absolute',
    top: '50%',
    [side]: 10,
    transform: 'translateY(-50%)',
    width: 32,
    height: 32,
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(255,255,255,0.85)',
    color: 'var(--ink)',
    cursor: 'pointer',
    fontSize: 20,
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
    zIndex: 2,
    fontFamily: 'var(--font-display)',
    paddingBottom: 3,
  };
}

// ============ Facility photo placeholder ============
// Beautiful gradient + icon placeholder until real photos are added.
// Each placeholder varies by facility + index for visual variety.
function FacilityPhotoPlaceholder({ label, caption, facilityTitle, index, width }) {
  // Rotate through visual treatments
  const palette = [
    { bg: 'linear-gradient(135deg, var(--bg-elev) 0%, var(--line) 100%)', icon: 'grid' },
    { bg: 'linear-gradient(135deg, var(--line-soft) 0%, var(--bg-elev) 100%)', icon: 'dots' },
    { bg: 'linear-gradient(180deg, var(--bg-elev) 0%, var(--line-soft) 100%)', icon: 'arch' },
  ];
  const p = palette[index % palette.length];

  return (
    <div style={{
      width: width,
      height: '100%',
      flexShrink: 0,
      position: 'relative',
      background: p.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Subtle geometric decoration */}
      <svg
        viewBox="0 0 100 75"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.18,
        }}
      >
        {p.icon === 'grid' && (
          <>
            <line x1="20" y1="0" x2="20" y2="75" stroke="var(--accent)" strokeWidth="0.25" />
            <line x1="50" y1="0" x2="50" y2="75" stroke="var(--accent)" strokeWidth="0.25" />
            <line x1="80" y1="0" x2="80" y2="75" stroke="var(--accent)" strokeWidth="0.25" />
            <line x1="0" y1="25" x2="100" y2="25" stroke="var(--accent)" strokeWidth="0.25" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="var(--accent)" strokeWidth="0.25" />
          </>
        )}
        {p.icon === 'dots' && (
          <>
            {Array.from({ length: 8 }).map((_, r) =>
              Array.from({ length: 10 }).map((_, c) => (
                <circle
                  key={`${r}-${c}`}
                  cx={c * 10 + 5}
                  cy={r * 10 + 4}
                  r="0.8"
                  fill="var(--accent)"
                />
              ))
            )}
          </>
        )}
        {p.icon === 'arch' && (
          <>
            <path d="M 0 75 Q 25 45 50 75 Q 75 45 100 75" stroke="var(--accent)" strokeWidth="0.4" fill="none" />
            <path d="M 0 75 Q 25 55 50 75 Q 75 55 100 75" stroke="var(--accent)" strokeWidth="0.3" fill="none" />
            <path d="M 0 75 Q 25 65 50 75 Q 75 65 100 75" stroke="var(--accent)" strokeWidth="0.2" fill="none" />
          </>
        )}
      </svg>

      {/* Centered badge */}
      <div style={{
        textAlign: 'center',
        color: 'var(--ink-mute)',
        fontFamily: 'var(--font-mono)',
        position: 'relative',
      }}>
        <div style={{
          fontSize: 9,
          letterSpacing: '0.22em',
          opacity: 0.55,
          marginBottom: 6,
          textTransform: 'uppercase',
        }}>
          Photo Placeholder
        </div>
        <div style={{
          fontSize: 11,
          letterSpacing: '0.06em',
          opacity: 0.8,
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
        }}>
          {label}
        </div>
      </div>
    </div>
  );
}

// ============ Physio × Bebascedera ============
function Physio() {
  const p = window.SAMASE.physio;
  return (
    <section
      id="section-physio"
      style={{ padding: '120px 0' }}
    >
      <div className="samase-container">
        <SectionKicker number={p.number} label={p.kicker} />

        <Reveal>
          <h2 className="samase-display" style={{
            fontSize: 'clamp(36px, 4.6vw, 62px)',
            margin: 0,
            color: 'var(--ink)',
            maxWidth: 900,
          }}>
            {p.title}
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p style={{
            marginTop: 32,
            color: 'var(--ink-soft)',
            fontSize: 17,
            lineHeight: 1.7,
            maxWidth: 720,
          }}>
            {p.lede}
          </p>
        </Reveal>

        <div style={{
          marginTop: 80,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 40,
        }} className="phys-steps">
          {p.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 110}>
              <PhysioStep {...s} isLast={i === p.steps.length - 1} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={220}>
          <PartnerBlock partner={p.partner} />
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .phys-steps { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

function PhysioStep({ n, title, meta, body, isLast }) {
  return (
    <div style={{ position: 'relative' }}>
      <div className="samase-display" style={{
        fontSize: 56,
        color: 'var(--gold)',
        lineHeight: 1,
        marginBottom: 20,
        opacity: 0.85,
      }}>
        {n}
      </div>
      <div className="samase-display" style={{
        fontSize: 26,
        color: 'var(--ink)',
        marginBottom: 8,
      }}>
        {title}
      </div>
      <div className="samase-mono" style={{ color: 'var(--ink-mute)', marginBottom: 18 }}>
        {meta}
      </div>
      <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.65 }}>
        {body}
      </p>
    </div>
  );
}

function PartnerBlock({ partner }) {
  return (
    <div style={{
      marginTop: 96,
      padding: '48px',
      background: 'var(--bg-elev)',
      border: '1px solid var(--line)',
      display: 'grid',
      gridTemplateColumns: '1fr 1.4fr',
      gap: 48,
      alignItems: 'center',
    }} className="partner-block">
      <div>
        <div className="samase-mono" style={{ color: 'var(--ink-mute)', marginBottom: 14 }}>
          {partner.label}
        </div>
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="samase-display"
          style={{
            fontSize: 'clamp(32px, 4vw, 52px)',
            color: 'var(--ink)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
            borderBottom: '1px solid var(--line)',
            paddingBottom: 6,
          }}
        >
          {partner.name}
          <span style={{ fontSize: 24, color: 'var(--gold)' }}>↗</span>
        </a>
      </div>
      <div>
        <p style={{
          margin: 0,
          color: 'var(--ink-soft)',
          fontSize: 16,
          lineHeight: 1.7,
        }}>
          {partner.body}
        </p>
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="samase-mono"
          style={{ color: 'var(--ink-mute)', display: 'inline-block', marginTop: 14 }}
        >
          bebascedera.com →
        </a>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .partner-block { grid-template-columns: 1fr !important; gap: 28px !important; padding: 32px !important; }
        }
      `}</style>
    </div>
  );
}

// ============ Countdown hook ============
function useCountdown(targetIso) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, new Date(targetIso).getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s, done: diff === 0 };
}

// ============ Founding — Batch System ============
function Founding({ scarcityOverride, batchesOverride }) {
  const S = window.SAMASE;
  const f = S.founding;
  const scarcityMode = scarcityOverride || f.scarcityMode;
  const batches = batchesOverride || f.batches;

  const activeBatch = batches.find(b => b.status === 'active') || batches[0];
  const totalApplicants = batches.reduce((sum, b) => sum + b.slotsTaken, 0);

  return (
    <section
      id="section-founding"
      style={{
        padding: '120px 0',
        background: 'var(--founding-bg)',
        color: 'var(--founding-ink)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle noise / depth via radial */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 80% 20%, var(--founding-bg-2) 0%, transparent 60%)',
        opacity: 0.6,
        pointerEvents: 'none',
      }}/>
      <div className="samase-container" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
          <span className="samase-mono" style={{ color: 'var(--founding-ink)', opacity: 0.6 }}>
            {f.number} · {f.kicker}
          </span>
          <span style={{ flex: 1, height: 1, background: 'var(--founding-ink)', opacity: 0.18 }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 80,
          marginBottom: 72,
        }} className="found-grid">
          <div>
            <Reveal>
              <h2 className="samase-display" style={{
                fontSize: 'clamp(36px, 4.6vw, 68px)',
                margin: 0,
                color: 'var(--founding-ink)',
              }}>
                {f.title}
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="samase-serif-italic" style={{
                marginTop: 28,
                fontSize: 20,
                color: 'var(--founding-ink)',
                opacity: 0.72,
                lineHeight: 1.55,
                maxWidth: 520,
              }}>
                {f.lede}
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal delay={150}>
              <ScarcitySignal mode={scarcityMode} batches={batches} totalApplicants={totalApplicants} />
            </Reveal>
          </div>
        </div>

        {/* Batch cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          marginBottom: 48,
        }} className="batch-grid">
          {batches.map((b, i) => (
            <Reveal key={b.id} delay={i * 100}>
              <BatchCard batch={b} scarcityMode={scarcityMode} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={250}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 24,
            paddingTop: 36,
            borderTop: '1px solid rgba(255,255,255,0.12)',
            flexWrap: 'wrap',
          }}>
            <p style={{
              margin: 0,
              fontSize: 13,
              color: 'var(--founding-ink)',
              opacity: 0.55,
              lineHeight: 1.6,
              maxWidth: 600,
            }}>
              {f.disclaimer}
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="Pricing.html" className="samase-mono" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 22px',
                border: '1px solid rgba(255,255,255,0.24)',
                color: 'var(--founding-ink)',
                borderRadius: 999,
                fontSize: 11,
              }}>
                {f.ctaLabel} →
              </a>
              <a href="#section-form" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 22px',
                background: 'var(--founding-accent)',
                color: 'var(--founding-bg-2)',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
              }}>
                <span className="samase-mono" style={{fontSize: 11}}>{f.ctaLabelShort}</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .found-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .batch-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ---------- Scarcity signal (top-right of founding header) ----------
function ScarcitySignal({ mode, batches, totalApplicants }) {
  const S = window.SAMASE;
  const copy = S.scarcityCopy[mode] || S.scarcityCopy.hard;
  const closing = S.brand.closingDate;
  const cd = useCountdown(closing);
  const active = batches.find(b => b.status === 'active') || batches[0];

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.14)',
      padding: 28,
      borderRadius: 0,
    }}>
      <div className="samase-mono" style={{ color: 'var(--founding-accent)', marginBottom: 16 }}>
        {mode === 'hard' ? 'HARD QUOTA' : mode === 'soft' ? 'LIMITED COHORT' : 'HYBRID SCARCITY'}
      </div>
      <div className="samase-display" style={{
        fontSize: 22,
        color: 'var(--founding-ink)',
        lineHeight: 1.3,
        marginBottom: 8,
      }}>
        {copy.headline}
      </div>
      <p className="samase-serif-italic" style={{
        margin: '0 0 22px 0',
        fontSize: 15,
        color: 'var(--founding-ink)',
        opacity: 0.65,
        lineHeight: 1.5,
      }}>
        {copy.sub}
      </p>

      {/* Mode-specific detail */}
      {mode === 'hard' && (
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
            <span className="samase-mono" style={{ color: 'var(--founding-ink)', opacity: 0.55, fontSize: 10 }}>
              Gelombang aktif · {active.label}
            </span>
            <span className="samase-display" style={{ fontSize: 22, color: 'var(--founding-ink)' }}>
              {active.slotsTaken}<span style={{ opacity: 0.45 }}>/{active.slotsTotal}</span>
            </span>
          </div>
          <div style={{ height: 2, background: 'rgba(255,255,255,0.14)', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${Math.round((active.slotsTaken / active.slotsTotal) * 100)}%`,
              background: 'var(--founding-accent)',
              transition: 'width 1s cubic-bezier(.2,.6,.2,1)',
            }} />
          </div>
        </div>
      )}

      {mode === 'soft' && (
        <CountdownBlock cd={cd} />
      )}

      {mode === 'hybrid' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginBottom: 16 }}>
            <span className="samase-mono" style={{ color: 'var(--founding-ink)', opacity: 0.55, fontSize: 10 }}>
              Early applicants
            </span>
            <span className="samase-display" style={{ fontSize: 24, color: 'var(--founding-ink)' }}>
              {totalApplicants}+
            </span>
          </div>
          <CountdownBlock cd={cd} small />
        </div>
      )}
    </div>
  );
}

function CountdownBlock({ cd, small }) {
  const items = [
    { v: cd.d, l: 'Hari' },
    { v: cd.h, l: 'Jam' },
    { v: cd.m, l: 'Menit' },
    { v: cd.s, l: 'Detik' },
  ];
  return (
    <div>
      <div className="samase-mono" style={{ color: 'var(--founding-ink)', opacity: 0.55, marginBottom: 10, fontSize: 10 }}>
        Registrasi ditutup dalam
      </div>
      <div style={{ display: 'flex', gap: 14 }}>
        {items.map(({v,l}, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div className="samase-display" style={{
              fontSize: small ? 24 : 30,
              color: 'var(--founding-ink)',
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
            }}>
              {String(v).padStart(2, '0')}
            </div>
            <div className="samase-mono" style={{ color: 'var(--founding-ink)', opacity: 0.45, marginTop: 6, fontSize: 9 }}>
              {l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Batch Card ----------
function BatchCard({ batch, scarcityMode }) {
  const isActive = batch.status === 'active';
  const isClosed = batch.status === 'closed';
  const pct = Math.round((batch.slotsTaken / batch.slotsTotal) * 100);

  return (
    <div style={{
      padding: 32,
      background: isActive ? 'var(--bg-card)' : 'rgba(255,255,255,0.04)',
      color: isActive ? 'var(--ink)' : 'var(--founding-ink)',
      border: `1px solid ${isActive ? 'var(--founding-accent)' : 'rgba(255,255,255,0.14)'}`,
      borderRadius: 0,
      opacity: isClosed ? 0.5 : 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      position: 'relative',
      minHeight: 440,
    }}>
      {isActive && (
        <div style={{
          position: 'absolute',
          top: -10, right: 16,
          background: 'var(--founding-accent)',
          color: 'var(--founding-bg-2)',
          padding: '4px 10px',
          fontSize: 9,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
        }}>
          {batch.badge}
        </div>
      )}

      <div>
        <div className="samase-mono" style={{
          color: isActive ? 'var(--ink-mute)' : 'rgba(255,255,255,0.5)',
          marginBottom: 10,
          fontSize: 10,
        }}>
          {batch.gelombang}
        </div>
        <div className="samase-display" style={{
          fontSize: 42,
          lineHeight: 1,
          marginBottom: 8,
        }}>
          {batch.label}
        </div>
        <p className="samase-serif-italic" style={{
          margin: 0,
          fontSize: 14,
          opacity: 0.7,
          lineHeight: 1.45,
        }}>
          {batch.tagline}
        </p>
      </div>

      {/* Sample price */}
      <div style={{
        paddingTop: 18,
        paddingBottom: 6,
        borderTop: `1px solid ${isActive ? 'var(--line)' : 'rgba(255,255,255,0.1)'}`,
        borderBottom: `1px solid ${isActive ? 'var(--line)' : 'rgba(255,255,255,0.1)'}`,
      }}>
        <div className="samase-mono" style={{
          fontSize: 9,
          opacity: 0.55,
          marginBottom: 6,
        }}>
          Open Gym 3 Bulan — dari
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <span className="samase-display" style={{ fontSize: 28 }}>
            Rp {(batch.priceOpenGym3M/1000).toLocaleString('id-ID')}K
          </span>
          <span style={{
            fontSize: 13,
            textDecoration: 'line-through',
            opacity: 0.4,
          }}>
            Rp {(batch.priceOpenGym3MNormal/1000).toLocaleString('id-ID')}K
          </span>
        </div>
        <div className="samase-mono" style={{ fontSize: 9, color: isActive ? 'var(--accent)' : 'var(--founding-accent)', marginTop: 6 }}>
          Hemat Rp {((batch.priceOpenGym3MNormal - batch.priceOpenGym3M)/1000).toFixed(0)}K
        </div>
      </div>

      {/* Progress (only in hard mode and if active) */}
      {scarcityMode === 'hard' && !isClosed && (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 10,
            marginBottom: 6,
          }} className="samase-mono">
            <span style={{ opacity: 0.55 }}>Slot terisi</span>
            <span>{batch.slotsTaken}/{batch.slotsTotal}</span>
          </div>
          <div style={{
            height: 2,
            background: isActive ? 'var(--line)' : 'rgba(255,255,255,0.12)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: isActive ? 'var(--gold)' : 'var(--founding-accent)',
            }} />
          </div>
        </div>
      )}

      {scarcityMode !== 'hard' && isActive && (
        <div className="samase-mono" style={{
          fontSize: 10,
          color: 'var(--gold)',
        }}>
          {scarcityMode === 'soft' ? 'Limited · Application only' : `${batch.slotsTaken}+ early applicants`}
        </div>
      )}
      {scarcityMode !== 'hard' && !isActive && (
        <div className="samase-mono" style={{
          fontSize: 10,
          color: 'var(--founding-accent)',
          opacity: 0.65,
        }}>
          Segera dibuka
        </div>
      )}

      {/* Perks */}
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        flex: 1,
      }}>
        {batch.perks.slice(0, 6).map((p, i) => (
          <li key={i} style={{
            display: 'flex',
            gap: 10,
            fontSize: 13,
            lineHeight: 1.55,
            opacity: 0.88,
          }}>
            <span style={{ color: isActive ? 'var(--gold)' : 'var(--founding-accent)', flexShrink: 0 }}>✓</span>
            <span>{p}</span>
          </li>
        ))}
        {batch.perks.length > 6 && (
          <li className="samase-mono" style={{
            fontSize: 9,
            opacity: 0.55,
            marginTop: 4,
          }}>
            +{batch.perks.length - 6} benefit lainnya
          </li>
        )}
      </ul>

      {/* CTA */}
      <a
        href={isClosed ? '#' : '#section-form'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          padding: '14px 20px',
          background: isActive ? 'var(--ink)' : 'transparent',
          color: isActive ? 'var(--bg)' : 'var(--founding-ink)',
          border: isActive ? 'none' : '1px solid rgba(255,255,255,0.24)',
          borderRadius: 999,
          fontSize: 13,
          pointerEvents: isClosed ? 'none' : 'auto',
        }}
      >
        <span className="samase-mono" style={{fontSize: 10}}>
          {isActive ? 'Amankan Slot Saya' : isClosed ? 'Gelombang Tutup' : 'Daftar Waiting List'}
        </span>
        {!isClosed && <span>→</span>}
      </a>
    </div>
  );
}

Object.assign(window, { Facilities, Physio, Founding, FacilityCell, FacilityFullPhotoCell, FacilitySlider, FacilityPhotoPlaceholder, PhysioStep, PartnerBlock, BatchCard, ScarcitySignal, useCountdown, CountdownBlock });
