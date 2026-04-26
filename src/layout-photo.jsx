// SAMASE — Layout variant: Photo-forward / Editorial Magazine
// Heavy visual style with full-bleed photos, asymmetric grids, oversized type overlays.
// Uses PhotoSlot component: shows placeholder if no photo uploaded yet, renders real image
// from MediaStore when user uploads via admin.
//
// Section structure remains the same as Editorial, but each section is re-composed to
// foreground photography over copy. All text remains CMS-editable.

// =========================================================
// PhotoSlot — placeholder-first image component
// Renders: gradient background + mono label + subject hint when empty,
// or the uploaded image from MediaStore when available.
// =========================================================
function PhotoSlot({ slotKey, label, subject, aspect = '4/5', tone = 'warm', className = '', overlay = 0, style = {} }) {
  const [bust, setBust] = React.useState(0);
  React.useEffect(() => {
    if (!window.MediaStore) return;
    const unsub = window.MediaStore.subscribe(() => setBust(b => b + 1));
    return unsub;
  }, []);

  const url = window.MediaStore?.get(slotKey);

  // Palette per tone
  const tones = {
    warm:        { bg: 'linear-gradient(135deg, #C9A884 0%, #8F6B4A 45%, #4A3A2C 100%)', ink: '#F2EEE5' },
    dark:        { bg: 'linear-gradient(140deg, #2A1F17 0%, #0F0B08 100%)',                ink: '#C9A884' },
    sand:        { bg: 'linear-gradient(145deg, #E8DCC4 0%, #C9B896 55%, #8F7E65 100%)',   ink: '#3B2F24' },
    terracotta:  { bg: 'linear-gradient(130deg, #C56A44 0%, #8F3E22 100%)',                ink: '#F2EEE5' },
    stone:       { bg: 'linear-gradient(145deg, #B8B0A2 0%, #68635A 100%)',                ink: '#F2EEE5' },
    ink:         { bg: 'linear-gradient(150deg, #1C1A17 0%, #0A0907 100%)',                ink: '#A8967A' },
    cinematic:   { bg: 'linear-gradient(155deg, #3B2F24 0%, #1C1510 60%, #0A0706 100%)',   ink: '#E8B88A' },
  };
  const t = tones[tone] || tones.warm;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        aspectRatio: aspect,
        overflow: 'hidden',
        background: url ? '#000' : t.bg,
        color: t.ink,
        ...style,
      }}
    >
      {url ? (
        <img key={bust} src={url} alt={label || ''}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <PhotoPlaceholderArt subject={subject} tone={tone} ink={t.ink} />
      )}

      {/* Optional dark overlay for text legibility */}
      {overlay > 0 && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `rgba(0,0,0,${overlay})`,
        }} />
      )}

      {/* Slot label at bottom-left when empty (so admin knows which slot this is) */}
      {!url && (
        <div style={{
          position: 'absolute', bottom: 12, left: 14, right: 14,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          pointerEvents: 'none',
          gap: 12,
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: t.ink, opacity: 0.55,
          }}>
            {label}
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: t.ink, opacity: 0.35,
            textAlign: 'right', maxWidth: '60%',
          }}>
            {slotKey}
          </div>
        </div>
      )}
    </div>
  );
}

// Abstract placeholder art: layered shapes evoking the subject without explicit drawing
function PhotoPlaceholderArt({ subject, tone, ink }) {
  // Simple noise/grain texture + subject hint
  const hints = {
    studio:     'Studio interior · wooden floor · morning light',
    equipment:  'Functional equipment · warm shadow',
    portrait:   'Person training · hijab · side profile · moody',
    duo:        'Duo training · PT session · focus',
    women:      'Women-only space · hijab, niqab · serene',
    senior:     'Golden FitSpace · 50+ member with coach',
    padel:      'Padel court · outdoor · lifestyle',
    physio:     'Physiotherapy assessment · posture screening',
    recovery:   'Recovery zone · sauna · quiet',
    detail:     'Texture · grip · hands',
    silhouette: 'Silhouette · backlit · architectural',
    space:      'Architectural space · natural light · minimal',
  };
  const hint = hints[subject] || subject || 'SAMASE photo';

  return (
    <>
      {/* Subtle grain */}
      <svg
        aria-hidden
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12, mixBlendMode: 'overlay' }}
        preserveAspectRatio="none"
      >
        <filter id={`grain-${subject}-${tone}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0"/>
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${subject}-${tone})`} />
      </svg>

      {/* Abstract shapes hinting at subject */}
      <svg
        aria-hidden
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        {subject === 'studio' && (
          <>
            <rect x="0" y="300" width="400" height="200" fill={ink} opacity="0.08" />
            <line x1="0" y1="300" x2="400" y2="300" stroke={ink} strokeOpacity="0.25" strokeWidth="1" />
            <circle cx="200" cy="150" r="120" fill={ink} opacity="0.05" />
          </>
        )}
        {(subject === 'portrait' || subject === 'women' || subject === 'senior' || subject === 'duo') && (
          <>
            {/* Silhouette shoulder line */}
            <path d={`M 80 500 L 80 360 Q 80 280 160 260 Q 200 254 200 220 Q 200 180 240 180 Q 280 180 280 220 Q 280 254 320 260 Q 400 280 400 360 L 400 500 Z`}
                  fill={ink} opacity="0.18" />
            {/* Halo / face area */}
            <circle cx="200" cy="200" r="56" fill={ink} opacity="0.08" />
          </>
        )}
        {subject === 'equipment' && (
          <>
            <rect x="80" y="200" width="240" height="14" rx="6" fill={ink} opacity="0.18" />
            <rect x="130" y="280" width="140" height="10" rx="4" fill={ink} opacity="0.12" />
            <circle cx="100" cy="207" r="30" fill={ink} opacity="0.2" />
            <circle cx="300" cy="207" r="30" fill={ink} opacity="0.2" />
          </>
        )}
        {subject === 'padel' && (
          <>
            {/* Court lines */}
            <line x1="40" y1="120" x2="360" y2="120" stroke={ink} strokeOpacity="0.3" strokeWidth="2" />
            <line x1="40" y1="420" x2="360" y2="420" stroke={ink} strokeOpacity="0.3" strokeWidth="2" />
            <line x1="40" y1="120" x2="40" y2="420" stroke={ink} strokeOpacity="0.3" strokeWidth="2" />
            <line x1="360" y1="120" x2="360" y2="420" stroke={ink} strokeOpacity="0.3" strokeWidth="2" />
            <line x1="200" y1="120" x2="200" y2="420" stroke={ink} strokeOpacity="0.3" strokeWidth="2" />
          </>
        )}
        {subject === 'physio' && (
          <>
            <rect x="80" y="260" width="240" height="12" rx="6" fill={ink} opacity="0.22" />
            <circle cx="130" cy="200" r="22" fill={ink} opacity="0.15" />
            <path d="M 80 300 L 120 260 L 160 290" stroke={ink} strokeOpacity="0.2" strokeWidth="2" fill="none" />
          </>
        )}
        {subject === 'recovery' && (
          <>
            <rect x="0" y="350" width="400" height="150" fill={ink} opacity="0.1" />
            <circle cx="130" cy="200" r="60" fill={ink} opacity="0.08" />
            <circle cx="300" cy="260" r="45" fill={ink} opacity="0.1" />
          </>
        )}
        {subject === 'detail' && (
          <>
            <circle cx="100" cy="100" r="22" fill={ink} opacity="0.14" />
            <circle cx="180" cy="140" r="10" fill={ink} opacity="0.2" />
            <circle cx="280" cy="210" r="32" fill={ink} opacity="0.12" />
            <circle cx="140" cy="340" r="18" fill={ink} opacity="0.18" />
            <circle cx="250" cy="400" r="14" fill={ink} opacity="0.15" />
          </>
        )}
        {subject === 'silhouette' && (
          <>
            <path d="M 0 500 L 0 300 Q 150 240 200 220 Q 260 200 400 260 L 400 500 Z"
              fill={ink} opacity="0.14" />
          </>
        )}
        {(subject === 'space' || !subject) && (
          <>
            <line x1="0" y1="380" x2="400" y2="380" stroke={ink} strokeOpacity="0.3" strokeWidth="1" />
            <rect x="40" y="140" width="120" height="240" fill={ink} opacity="0.05" />
            <rect x="240" y="200" width="120" height="180" fill={ink} opacity="0.05" />
          </>
        )}
      </svg>

      {/* Centered subject hint — very subtle */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, textAlign: 'center',
        fontFamily: "'Exo 2', 'Inter Tight', sans-serif",
        fontStyle: 'italic',
        fontSize: 13, lineHeight: 1.5,
        color: ink, opacity: 0.45,
        letterSpacing: '0.02em',
        pointerEvents: 'none',
      }}>
        {hint}
      </div>
    </>
  );
}

// =========================================================
// Photo-forward Hero
// Full-bleed background photo · oversized headline overlay · inline AI assistant
// =========================================================
function PhotoHero() {
  const SS = window.useSAMASE ? window.useSAMASE() : window.SAMASE;
  const h = SS.hero || {};
  const ai = SS.ai || {};
  const T = (p) => (window._t ? window._t(p) : null) || p.split('.').reduce((o, k) => o?.[k], SS);

  return (
    <section
      id="section-hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        color: '#F2EEE5',
        overflow: 'hidden',
      }}
    >
      {/* Full-bleed photo background */}
      <PhotoSlot
        slotKey="photo-hero-bg"
        label="Hero background"
        subject="space"
        tone="cinematic"
        aspect="auto"
        overlay={0.55}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          aspectRatio: 'unset',
        }}
      />

      {/* Vignette from bottom */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,7,6,0.35) 0%, rgba(10,7,6,0.1) 40%, rgba(10,7,6,0.85) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Top meta bar */}
      <div style={{
        position: 'absolute', top: 120, left: 0, right: 0,
        padding: '0 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'rgba(242,238,229,0.75)',
      }}>
        <span>{h.kicker || 'SAMASE'}</span>
        <span style={{ display: 'flex', gap: 24 }}>
          <span>{h.meta1Value || 'Juli 2026'}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>{h.meta2Label || 'Bintaro'}</span>
        </span>
      </div>

      {/* Main content — bottom aligned */}
      <div style={{ position: 'relative', padding: '0 48px 72px', zIndex: 2 }}>
        <Reveal>
          <h1 className="samase-display" style={{
            fontSize: 'clamp(56px, 10vw, 156px)',
            lineHeight: 0.92,
            margin: 0, color: '#F2EEE5',
            letterSpacing: '-0.02em',
            maxWidth: 1200,
          }}>
            {T('hero.titleTop')}
            <br />
            <span className="samase-serif-italic" style={{ color: '#E8B88A' }}>{T('hero.titleMid')}</span>
            <br />
            {T('hero.titleBot')}
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <div style={{
            marginTop: 40,
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 480px) 1fr',
            gap: 48,
            alignItems: 'end',
          }} className="ph-hero-bottom">
            <p style={{
              margin: 0,
              fontSize: 15,
              lineHeight: 1.7,
              color: 'rgba(242,238,229,0.85)',
            }}>
              {T('hero.lede')}
            </p>

            {ai.enabled && window.AIAssistant && (
              <div style={{ minWidth: 0 }}>
                <AIAssistant compact />
              </div>
            )}
            {!ai.enabled && (
              <div style={{ display: 'flex', gap: 40 }}>
                <div>
                  <div className="samase-display" style={{ fontSize: 40, color: '#F2EEE5' }}>{h.meta1Label}</div>
                  <div className="samase-mono" style={{ fontSize: 10, color: 'rgba(242,238,229,0.6)' }}>{h.meta1Value}</div>
                </div>
                <div>
                  <div className="samase-display" style={{ fontSize: 40, color: '#F2EEE5' }}>{h.meta2Label}</div>
                  <div className="samase-mono" style={{ fontSize: 10, color: 'rgba(242,238,229,0.6)' }}>{h.meta2Value}</div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .ph-hero-bottom { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </section>
  );
}

// =========================================================
// Photo-forward Philosophy
// Two-column: large vertical photo + text block
// =========================================================
function PhotoPhilosophy() {
  const SS = window.useSAMASE ? window.useSAMASE() : window.SAMASE;
  const p = SS.philosophy || {};
  const T = (path) => (window._t ? window._t(path) : null) || path.split('.').reduce((o, k) => o?.[k], SS);

  return (
    <section id="section-philosophy" style={{ padding: '120px 0', background: 'var(--bg)' }}>
      <div className="samase-container">
        <SectionKicker number={p.number} label={T('philosophy.kicker')} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '5fr 6fr',
          gap: 72,
          alignItems: 'stretch',
        }} className="ph-phil-grid">

          <Reveal>
            <PhotoSlot
              slotKey="photo-philosophy-main"
              label="Philosophy — space detail"
              subject="space"
              tone="warm"
              aspect="4/5"
            />
          </Reveal>

          <Reveal delay={140}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingTop: 16 }}>
              <h2 className="samase-display" style={{
                fontSize: 'clamp(36px, 4.4vw, 64px)',
                margin: 0, color: 'var(--ink)',
                lineHeight: 1.05,
              }}>
                {T('philosophy.title')}
              </h2>
              <p className="samase-serif-italic" style={{
                fontSize: 22, color: 'var(--ink)',
                lineHeight: 1.45, margin: 0,
                paddingLeft: 20, borderLeft: '1px solid var(--gold)',
              }}>
                {T('philosophy.quote')}
              </p>
              {(T('philosophy.body') || []).map((t, i) => (
                <p key={i} style={{
                  margin: 0, color: 'var(--ink-soft)',
                  fontSize: 15, lineHeight: 1.75,
                }}>{t}</p>
              ))}

              {/* Pillars stacked */}
              <div style={{
                marginTop: 20,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 18,
                paddingTop: 24,
                borderTop: '1px solid var(--line-soft)',
              }}>
                {(T('philosophy.pillars') || []).map((pl, i) => (
                  <div key={i}>
                    <div className="samase-mono" style={{
                      fontSize: 10, color: 'var(--gold)',
                      letterSpacing: '0.12em', marginBottom: 8,
                    }}>{pl.n}</div>
                    <div className="samase-display" style={{
                      fontSize: 18, color: 'var(--ink)', marginBottom: 6,
                    }}>{pl.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
                      {pl.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ph-phil-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

// =========================================================
// Photo-forward Audience
// Each persona as a tall card with full-bleed photo + text overlay
// =========================================================
function PhotoAudience() {
  const SS = window.useSAMASE ? window.useSAMASE() : window.SAMASE;
  const a = SS.audience || {};
  const T = (path) => (window._t ? window._t(path) : null) || path.split('.').reduce((o, k) => o?.[k], SS);
  const personas = Array.isArray(a.personas) ? a.personas : [];

  // Subject hints per persona
  const subjects = {
    '01': 'senior',
    '02': 'women',
    '03': 'portrait',
    '04': 'portrait',
    '05': 'duo',
  };
  const tones = {
    '01': 'sand',
    '02': 'warm',
    '03': 'dark',
    '04': 'terracotta',
    '05': 'stone',
  };

  return (
    <section id="section-audience" style={{ padding: '120px 0', background: 'var(--bg-elev)' }}>
      <div className="samase-container">
        <SectionKicker number={a.number} label={T('audience.kicker')} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 72, marginBottom: 72,
          alignItems: 'end',
        }} className="ph-aud-head">
          <Reveal>
            <h2 className="samase-display" style={{
              fontSize: 'clamp(36px, 4.4vw, 64px)',
              margin: 0, color: 'var(--ink)',
            }}>
              {T('audience.title')}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="samase-serif-italic" style={{
              fontSize: 18, color: 'var(--ink-soft)',
              margin: 0, maxWidth: 480, lineHeight: 1.55,
            }}>
              {T('audience.lede')}
            </p>
          </Reveal>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 14,
        }} className="ph-aud-grid">
          {personas.map((p, i) => (
            <Reveal key={p.n} delay={i * 80}>
              <PhotoPersonaCard
                persona={p}
                subject={subjects[p.n] || 'portrait'}
                tone={tones[p.n] || 'warm'}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1200px) {
          .ph-aud-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 820px) {
          .ph-aud-head { grid-template-columns: 1fr !important; gap: 24px !important; }
          .ph-aud-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 520px) {
          .ph-aud-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function PhotoPersonaCard({ persona, subject, tone }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#000',
      }}
    >
      <PhotoSlot
        slotKey={`photo-audience-${persona.n}`}
        label={`Audience ${persona.n} — ${persona.title}`}
        subject={subject}
        tone={tone}
        aspect="3/5"
        overlay={hover ? 0.15 : 0.45}
        style={{
          transition: 'opacity 300ms',
        }}
      />

      {/* Gradient scrim for text readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Top: number + age */}
      <div style={{
        position: 'absolute', top: 20, left: 20, right: 20,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}>
        <span className="samase-mono" style={{
          fontSize: 11, color: '#F2EEE5', letterSpacing: '0.14em',
        }}>{persona.n}</span>
        <span className="samase-mono" style={{
          fontSize: 9, color: 'rgba(242,238,229,0.75)',
          padding: '4px 10px',
          border: '1px solid rgba(242,238,229,0.3)',
          borderRadius: 999,
          backdropFilter: 'blur(4px)',
          letterSpacing: '0.12em',
        }}>{persona.age}</span>
      </div>

      {/* Bottom: title + hook */}
      <div style={{
        position: 'absolute', left: 20, right: 20, bottom: 22,
        color: '#F2EEE5',
      }}>
        <div className="samase-display" style={{
          fontSize: 24, lineHeight: 1.1, marginBottom: 8,
          transform: hover ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'transform 300ms cubic-bezier(.2,.6,.2,1)',
        }}>
          {persona.title}
        </div>
        <div className="samase-serif-italic" style={{
          fontSize: 14, lineHeight: 1.4,
          color: 'rgba(242,238,229,0.9)',
          maxHeight: hover ? 100 : 0,
          overflow: 'hidden',
          transition: 'max-height 340ms cubic-bezier(.2,.6,.2,1)',
        }}>
          {persona.hook}
        </div>
      </div>
    </div>
  );
}

// =========================================================
// Photo-forward Facilities
// Asymmetric editorial grid — 6 items in a 12-col grid with varied sizes
// =========================================================
function PhotoFacilities() {
  const SS = window.useSAMASE ? window.useSAMASE() : window.SAMASE;
  const f = SS.facilities || {};
  const T = (path) => (window._t ? window._t(path) : null) || path.split('.').reduce((o, k) => o?.[k], SS);
  const items = Array.isArray(f.items) ? f.items : [];

  // Subject + aspect config per facility (asymmetric layout)
  const configs = [
    { span: '7', aspect: '5/4', subject: 'studio', tone: 'warm' },
    { span: '5', aspect: '4/5', subject: 'duo', tone: 'dark' },
    { span: '5', aspect: '5/6', subject: 'physio', tone: 'sand' },
    { span: '7', aspect: '16/10', subject: 'space', tone: 'stone' },
    { span: '7', aspect: '5/4', subject: 'senior', tone: 'terracotta' },
    { span: '5', aspect: '4/5', subject: 'padel', tone: 'cinematic' },
  ];

  return (
    <section id="section-facilities" style={{ padding: '120px 0', background: 'var(--bg)' }}>
      <div className="samase-container">
        <SectionKicker number={f.number} label={T('facilities.kicker')} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 72, marginBottom: 72,
          alignItems: 'end',
        }} className="ph-fac-head">
          <Reveal>
            <h2 className="samase-display" style={{
              fontSize: 'clamp(36px, 4.4vw, 64px)',
              margin: 0, color: 'var(--ink)',
            }}>
              {T('facilities.title')}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="samase-serif-italic" style={{
              fontSize: 18, color: 'var(--ink-soft)',
              margin: 0, maxWidth: 480, lineHeight: 1.55,
            }}>
              {T('facilities.lede')}
            </p>
          </Reveal>
        </div>

        {/* Editorial 12-col grid with varied spans */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 16,
        }} className="ph-fac-grid">
          {items.slice(0, 6).map((it, i) => {
            const cfg = configs[i] || configs[0];
            return (
              <div
                key={it.n}
                className={`ph-fac-cell ph-fac-cell-${i}`}
                style={{ gridColumn: `span ${cfg.span}` }}
              >
                <Reveal delay={(i % 3) * 80}>
                  <PhotoFacilityCard
                    item={it}
                    subject={cfg.subject}
                    tone={cfg.tone}
                    aspect={cfg.aspect}
                  />
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ph-fac-head { grid-template-columns: 1fr !important; gap: 24px !important; }
          .ph-fac-grid { grid-template-columns: 1fr !important; }
          .ph-fac-cell { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}

function PhotoFacilityCard({ item, subject, tone, aspect }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', cursor: 'pointer' }}
    >
      <PhotoSlot
        slotKey={`photo-facility-${item.n}`}
        label={`Facility ${item.n} — ${item.title}`}
        subject={subject}
        tone={tone}
        aspect={aspect}
        overlay={hover ? 0.1 : 0.3}
      />
      {/* Overlay content */}
      <div style={{
        position: 'absolute', inset: 0,
        padding: 24,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        color: '#F2EEE5',
        pointerEvents: 'none',
      }}>
        <div className="samase-mono" style={{
          fontSize: 11, letterSpacing: '0.14em',
          opacity: 0.9,
        }}>{item.n}</div>

        <div>
          <div className="samase-display" style={{
            fontSize: 26, lineHeight: 1.1, marginBottom: 6,
          }}>
            {item.title}
          </div>
          <div style={{
            fontSize: 13, lineHeight: 1.55,
            color: 'rgba(242,238,229,0.85)',
            maxWidth: 360,
            maxHeight: hover ? 120 : 0,
            overflow: 'hidden',
            transition: 'max-height 320ms cubic-bezier(.2,.6,.2,1)',
          }}>
            {item.body}
          </div>
        </div>
      </div>
    </article>
  );
}

// =========================================================
// Photo-forward Coach
// Large portrait cards with tag overlay, 2-col layout
// =========================================================
function PhotoCoach() {
  const SS = window.useSAMASE ? window.useSAMASE() : window.SAMASE;
  const c = SS.coach || {};
  const T = (path) => (window._t ? window._t(path) : null) || path.split('.').reduce((o, k) => o?.[k], SS);
  const team = Array.isArray(c.team) ? c.team : [];

  return (
    <section id="section-coach" style={{ padding: '120px 0', background: 'var(--bg-elev)' }}>
      <div className="samase-container">
        <SectionKicker number={c.number} label={T('coach.kicker')} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 72, marginBottom: 72,
          alignItems: 'end',
        }} className="ph-coach-head">
          <Reveal>
            <h2 className="samase-display" style={{
              fontSize: 'clamp(36px, 4.4vw, 64px)',
              margin: 0, color: 'var(--ink)',
            }}>
              {T('coach.title')}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p style={{
              fontSize: 15, color: 'var(--ink-soft)',
              margin: 0, maxWidth: 480, lineHeight: 1.7,
            }}>
              {T('coach.body')}
            </p>
          </Reveal>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }} className="ph-coach-grid">
          {team.map((coach, i) => (
            <Reveal key={coach.name} delay={(i % 2) * 120}>
              <PhotoCoachCard coach={coach} subject={i % 2 === 0 ? 'portrait' : 'women'} tone={i % 2 === 0 ? 'dark' : 'warm'} />
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ph-coach-head { grid-template-columns: 1fr !important; gap: 24px !important; }
          .ph-coach-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function PhotoCoachCard({ coach, subject, tone }) {
  const [hover, setHover] = React.useState(false);
  const slotKey = `photo-coach-${(coach.name || '').toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', cursor: 'pointer' }}
    >
      <PhotoSlot
        slotKey={slotKey}
        label={`Coach ${coach.name}`}
        subject={subject}
        tone={tone}
        aspect="4/5"
        overlay={hover ? 0.15 : 0.4}
      />
      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        padding: '28px 26px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        color: '#F2EEE5',
      }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {(coach.tags || []).slice(0, 3).map((t, i) => (
            <span key={i} className="samase-mono" style={{
              fontSize: 9, letterSpacing: '0.12em',
              padding: '4px 10px',
              background: 'rgba(242,238,229,0.12)',
              border: '1px solid rgba(242,238,229,0.25)',
              borderRadius: 999,
              textTransform: 'uppercase',
              backdropFilter: 'blur(6px)',
            }}>
              {t}
            </span>
          ))}
        </div>

        <div>
          <div className="samase-mono" style={{
            fontSize: 10, letterSpacing: '0.14em',
            color: 'rgba(242,238,229,0.7)',
            marginBottom: 6,
          }}>{coach.role}</div>
          <div className="samase-display" style={{
            fontSize: 28, lineHeight: 1.1, marginBottom: 10,
          }}>
            {coach.name}
          </div>
          <div style={{
            fontSize: 13, color: 'rgba(242,238,229,0.88)', lineHeight: 1.6,
            maxWidth: 400,
            maxHeight: hover ? 200 : 0,
            overflow: 'hidden',
            transition: 'max-height 360ms cubic-bezier(.2,.6,.2,1)',
          }}>
            {coach.bio}
          </div>
        </div>
      </div>
    </article>
  );
}

// =========================================================
// Photo-forward Founding — lighter variation with photo accent
// Uses existing Founding component but wraps it in a photo band
// =========================================================
function PhotoFoundingBand() {
  return (
    <div style={{ position: 'relative' }}>
      {/* Thin photo accent band above */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2,
        height: 180,
      }}>
        <PhotoSlot slotKey="photo-founding-1" label="Community moment" subject="detail" tone="warm" aspect="auto" style={{ aspectRatio: 'unset', height: '100%' }} />
        <PhotoSlot slotKey="photo-founding-2" label="Group class" subject="studio" tone="dark" aspect="auto" style={{ aspectRatio: 'unset', height: '100%' }} />
        <PhotoSlot slotKey="photo-founding-3" label="Recovery" subject="recovery" tone="sand" aspect="auto" style={{ aspectRatio: 'unset', height: '100%' }} />
        <PhotoSlot slotKey="photo-founding-4" label="Coach and member" subject="duo" tone="terracotta" aspect="auto" style={{ aspectRatio: 'unset', height: '100%' }} />
      </div>
      <Founding />
    </div>
  );
}

// =========================================================
// Photo-forward Physio — split with detail photo
// =========================================================
function PhotoPhysio() {
  const SS = window.useSAMASE ? window.useSAMASE() : window.SAMASE;
  const p = SS.physio || {};
  const T = (path) => (window._t ? window._t(path) : null) || path.split('.').reduce((o, k) => o?.[k], SS);
  const steps = Array.isArray(p.steps) ? p.steps : [];

  return (
    <section id="section-physio" style={{ padding: '120px 0', background: 'var(--bg)' }}>
      <div className="samase-container">
        <SectionKicker number={p.number} label={T('physio.kicker')} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '6fr 5fr',
          gap: 72, alignItems: 'stretch',
        }} className="ph-physio-grid">
          <Reveal>
            <div>
              <h2 className="samase-display" style={{
                fontSize: 'clamp(36px, 4.4vw, 64px)',
                margin: 0, color: 'var(--ink)', lineHeight: 1.05,
              }}>
                {T('physio.title')}
              </h2>
              <p style={{
                marginTop: 20, color: 'var(--ink-soft)',
                fontSize: 15, lineHeight: 1.7, maxWidth: 560,
              }}>
                {T('physio.lede')}
              </p>

              <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 20 }}>
                {steps.map((s, i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '44px 1fr',
                    gap: 20, paddingBottom: 20,
                    borderBottom: i < steps.length - 1 ? '1px solid var(--line-soft)' : 'none',
                  }}>
                    <div className="samase-display" style={{ fontSize: 22, color: 'var(--gold)' }}>
                      {s.n}
                    </div>
                    <div>
                      <div style={{
                        display: 'flex', alignItems: 'baseline', gap: 12,
                        flexWrap: 'wrap', marginBottom: 6,
                      }}>
                        <span className="samase-display" style={{ fontSize: 20, color: 'var(--ink)' }}>
                          {s.title}
                        </span>
                        <span className="samase-mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>
                          {s.meta}
                        </span>
                      </div>
                      <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: 13, lineHeight: 1.65 }}>
                        {s.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <PhotoSlot
                slotKey="photo-physio-main"
                label="Physio assessment"
                subject="physio"
                tone="sand"
                aspect="4/5"
              />
              <PhotoSlot
                slotKey="photo-physio-detail"
                label="Recovery tools / hands detail"
                subject="detail"
                tone="warm"
                aspect="16/9"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ph-physio-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

// =========================================================
// Photo-forward Layout — orchestrator
// =========================================================
function LayoutPhotoForward() {
  return (
    <>
      <PhotoHero />
      <PhotoPhilosophy />
      <PhotoAudience />
      <PhotoFacilities />
      <PhotoPhysio />
      <PhotoFoundingBand />
      <PhotoCoach />
      <ScheduleSection />
      <BlogSection />
      <EventsSection />
      <FAQ />
      <FormSection />
      <style>{`
        body.layout-photo section { padding-top: 110px !important; padding-bottom: 110px !important; }
        body.layout-photo #section-hero { padding-top: 0 !important; padding-bottom: 0 !important; }
        body.layout-photo .samase-container { max-width: 1360px !important; }
        body.layout-photo h1, body.layout-photo h2 {
          font-weight: 400 !important;
          letter-spacing: -0.015em !important;
        }
      `}</style>
    </>
  );
}

// Register
Object.assign(window, {
  LayoutPhotoForward,
  PhotoSlot, PhotoPlaceholderArt,
  PhotoHero, PhotoPhilosophy, PhotoAudience, PhotoFacilities,
  PhotoPhysio, PhotoCoach, PhotoPersonaCard, PhotoFacilityCard, PhotoCoachCard,
  PhotoFoundingBand,
});
