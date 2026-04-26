// SAMASE — section components
// NOTE: read window.SAMASE at render time (NOT at module load) so CMS updates
// re-render correctly. Use the `useSAMASE()` hook below.

function useSAMASE() {
  const [, setTick] = React.useState(0);
  React.useEffect(() => {
    if (!window.CMSStore) return;
    const unsub = window.CMSStore.subscribe(() => setTick(t => t + 1));
    const onLang = () => setTick(t => t + 1);
    window.addEventListener('samase:lang-change', onLang);
    return () => { unsub(); window.removeEventListener('samase:lang-change', onLang); };
  }, []);
  return window.SAMASE || {};
}
// Backward compat reference (not reactive, but kept so old code doesn't break)
let S = window.SAMASE;

function _t(path) {
  if (window.SamaseI18n) return window.SamaseI18n.t(window.SAMASE, path);
  return (path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), window.SAMASE || {}));
}

// ============ Shared primitives ============
function SectionKicker({ number, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
      <span
        className="samase-mono"
        style={{ color: 'var(--ink-mute)' }}
      >
        {number} · {label}
      </span>
      <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div
      className="samase-mono"
      style={{ color: 'var(--ink-mute)', marginBottom: 16 }}
    >
      {children}
    </div>
  );
}

function Reveal({ children, delay = 0 }) {
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setTimeout(() => setVis(true), delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={'reveal' + (vis ? ' in' : '')}>
      {children}
    </div>
  );
}

// ============ Navbar ============
function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { href: '#section-philosophy', label: 'Filosofi' },
    { href: '#section-facilities', label: 'Fasilitas' },
    { href: '#section-physio', label: 'Fisioterapi' },
    { href: '#section-founding', label: 'Founding' },
    { href: '#section-faq', label: 'FAQ' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        padding: '18px 0',
        background: scrolled ? 'color-mix(in srgb, var(--bg) 88%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line-soft)' : '1px solid transparent',
        transition: 'all 300ms ease',
      }}
    >
      <div
        className="samase-container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <SamaseMark size={20} />
        <div className="nav-links" style={{ display: 'flex', gap: 34, alignItems: 'center' }}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="samase-mono"
              style={{
                color: 'var(--ink-soft)',
                fontSize: 10.5,
                transition: 'color 200ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#section-form"
          className="samase-mono"
          style={{
            padding: '10px 18px',
            border: '1px solid var(--ink)',
            borderRadius: 999,
            fontSize: 10.5,
            color: 'var(--ink)',
            transition: 'all 200ms',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--ink)';
            e.currentTarget.style.color = 'var(--bg)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--ink)';
          }}
        >
          Daftar
        </a>
      </div>
      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

// ============ Hero ============
function Hero() {
  const SS = useSAMASE();
  const h = SS.hero || {};
  const ab = SS.ab || {};
  const ai = SS.ai || {};

  // A/B variant support for headline
  let titleTop = _t('hero.titleTop');
  let titleMid = _t('hero.titleMid');
  let titleBot = _t('hero.titleBot');
  if (ab.enabled && ab.heroVariant && ab.variants && ab.variants[ab.heroVariant]) {
    const v = ab.variants[ab.heroVariant];
    titleTop = v.titleTop || titleTop;
    titleMid = v.titleMid || titleMid;
    titleBot = v.titleBot || titleBot;
  }

  const media = h.media || {};
  // Resolve url from MediaStore if key is set (dataUrl lives in separate bucket)
  const resolvedUrl = media.url || (media.key && window.MediaStore ? window.MediaStore.get(media.key) : null);
  const hasMediaBg = (media.type === 'image' || media.type === 'video') && resolvedUrl;

  return (
    <section
      style={{
        paddingTop: 160,
        paddingBottom: 120,
        position: 'relative',
        overflow: 'hidden',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        color: hasMediaBg ? '#FFF' : 'var(--ink)',
      }}
    >
      {/* Media background */}
      {hasMediaBg && resolvedUrl && (
        <>
          {media.type === 'image' && (
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${resolvedUrl})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              zIndex: 0,
            }} />
          )}
          {media.type === 'video' && (
            <video
              key={resolvedUrl}
              autoPlay muted loop playsInline
              poster={media.poster || undefined}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', zIndex: 0,
              }}
            >
              <source src={resolvedUrl} />
            </video>
          )}
          <div style={{
            position: 'absolute', inset: 0,
            background: `rgba(0,0,0,${media.overlay != null ? media.overlay : 0.25})`,
            zIndex: 1,
          }} />
        </>
      )}

      {/* Subtle grid backdrop (only when no media) */}
      {!hasMediaBg && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.35,
            backgroundImage:
              'linear-gradient(to right, var(--line-soft) 1px, transparent 1px)',
            backgroundSize: '96px 100%',
            maskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
          }}
        />
      )}

      <div className="samase-container" style={{ position: 'relative', width: '100%', zIndex: 2 }}>
        <Reveal>
          <div className="samase-mono" style={{
            color: hasMediaBg ? 'rgba(255,255,255,0.75)' : 'var(--ink-mute)',
            marginBottom: 48,
          }}>
            <span style={{
              display: 'inline-block',
              width: 6, height: 6,
              borderRadius: '50%',
              background: 'var(--gold)',
              marginRight: 10,
              verticalAlign: 'middle',
              animation: 'pulse 2.4s ease-in-out infinite',
            }} />
            {h.kicker}
            {ab.enabled && (
              <span style={{
                marginLeft: 12, padding: '2px 8px',
                fontSize: 9, letterSpacing: '0.1em',
                background: 'rgba(200,139,94,0.15)', color: 'var(--gold)',
                borderRadius: 999,
              }}>A/B · {ab.heroVariant}</span>
            )}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1
            className="samase-display hero-title"
            style={{
              fontSize: 'clamp(48px, 8.2vw, 128px)',
              margin: 0,
              color: 'inherit',
              maxWidth: 1100,
            }}
          >
            {titleTop}
            <br />
            <span className="samase-serif-italic">{titleMid}</span>
            <br />
            {titleBot}
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <div style={{
            marginTop: 56,
            display: 'grid',
            gridTemplateColumns: ai.enabled ? '1fr' : '1fr 1fr',
            gap: 48,
            maxWidth: ai.enabled ? 1100 : 900,
          }} className="hero-grid">
            <div>
              <p style={{
                margin: 0,
                color: hasMediaBg ? 'rgba(255,255,255,0.88)' : 'var(--ink-soft)',
                fontSize: 16,
                lineHeight: 1.7,
                maxWidth: 540,
              }}>
                {_t('hero.lede')}
              </p>
              {ai.enabled && (
                <div style={{ marginTop: 30, maxWidth: 620 }}>
                  <AIAssistant />
                </div>
              )}
              {!ai.enabled && (
                <div style={{ marginTop: 30, display: 'flex', gap: 24 }}>
                  <MetaBlock label={h.meta1Label} value={h.meta1Value} dark={hasMediaBg} />
                  <MetaBlock label={h.meta2Label} value={h.meta2Value} dark={hasMediaBg} />
                </div>
              )}
            </div>
            {ai.enabled && (
              <div style={{ display: 'flex', gap: 40, marginTop: 8 }}>
                <MetaBlock label={h.meta1Label} value={h.meta1Value} dark={hasMediaBg} />
                <MetaBlock label={h.meta2Label} value={h.meta2Value} dark={hasMediaBg} />
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div style={{
            marginTop: 80,
            paddingTop: 28,
            borderTop: `1px solid ${hasMediaBg ? 'rgba(255,255,255,0.2)' : 'var(--line)'}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 24,
            flexWrap: 'wrap',
          }}>
            <span className="samase-serif-italic" style={{
              fontSize: 18,
              color: hasMediaBg ? 'rgba(255,255,255,0.8)' : 'var(--ink-soft)',
            }}>
              {h.footer}
            </span>
            <a href="#section-philosophy" className="samase-mono" style={{
              color: hasMediaBg ? 'rgba(255,255,255,0.7)' : 'var(--ink-mute)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
            }}>
              Scroll ↓
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @media (max-width: 720px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

function MetaBlock({ label, value, dark }) {
  return (
    <div>
      <div className="samase-display" style={{
        fontSize: 32,
        color: dark ? '#FFF' : 'var(--ink)',
        marginBottom: 4,
      }}>
        {label}
      </div>
      <div className="samase-mono" style={{ color: dark ? 'rgba(255,255,255,0.7)' : 'var(--ink-mute)' }}>
        {value}
      </div>
    </div>
  );
}

// ============ Philosophy ============
function Philosophy() {
  const SS = useSAMASE();
  const p = SS.philosophy || {};
  // i18n overlays
  const title = _t('philosophy.title');
  const kicker = _t('philosophy.kicker');
  const quote = _t('philosophy.quote');
  const body = _t('philosophy.body') || [];
  const pillars = _t('philosophy.pillars') || [];
  return (
    <section
      id="section-philosophy"
      style={{ padding: '120px 0', background: 'var(--bg-elev)' }}
    >
      <div className="samase-container">
        <SectionKicker number={p.number} label={kicker} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 80,
          marginBottom: 80,
        }} className="phil-grid">
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
            <div>
              <p className="samase-serif-italic" style={{
                fontSize: 22,
                color: 'var(--ink)',
                lineHeight: 1.45,
                margin: '0 0 28px 0',
                paddingLeft: 20,
                borderLeft: '1px solid var(--gold)',
              }}>
                {quote}
              </p>
              {(body || []).map((t, i) => (
                <p key={i} style={{
                  color: 'var(--ink-soft)',
                  fontSize: 16,
                  lineHeight: 1.75,
                  marginBottom: 16,
                }}>
                  {t}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
          borderTop: '1px solid var(--line)',
        }} className="phil-pillars">
          {(pillars || []).map((pill, i) => (
            <Reveal key={pill.n} delay={i * 100}>
              <div style={{
                padding: '40px 32px 40px 0',
                borderRight: i < 2 ? '1px solid var(--line)' : 'none',
                paddingLeft: i > 0 ? 32 : 0,
              }} className="phil-pillar">
                <div className="samase-mono" style={{ color: 'var(--gold)', marginBottom: 20 }}>
                  {pill.n}
                </div>
                <div className="samase-display" style={{
                  fontSize: 26,
                  color: 'var(--ink)',
                  marginBottom: 12,
                }}>
                  {pill.title}
                </div>
                <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.65 }}>
                  {pill.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .phil-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .phil-pillars { grid-template-columns: 1fr !important; }
          .phil-pillar { border-right: none !important; padding-left: 0 !important; border-bottom: 1px solid var(--line); }
        }
      `}</style>
    </section>
  );
}

// ============ Audience — Primary 3 cards + Secondary row ============
function Audience() {
  const SS = useSAMASE();
  const a = SS.audience || {};
  const personas = Array.isArray(a.personas) ? a.personas : [];
  const primary = personas.slice(0, 3);
  const secondary = personas.slice(3);
  const kicker = _t('audience.kicker');
  const title = _t('audience.title');
  const lede = _t('audience.lede');

  return (
    <section
      id="section-audience"
      style={{ padding: '120px 0' }}
    >
      <div className="samase-container">
        <SectionKicker number={a.number} label={kicker} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          marginBottom: 72,
          alignItems: 'end',
        }} className="aud-grid">
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
              maxWidth: 480,
            }}>
              {lede}
            </p>
          </Reveal>
        </div>

        {/* Primary personas — 3-card grid (v1 style) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          marginBottom: 32,
        }} className="aud-cards">
          {primary.map((p, i) => (
            <Reveal key={p.n} delay={i * 90}>
              <PersonaCard {...p} />
            </Reveal>
          ))}
        </div>

        {/* Secondary row — Young Adult + Kids as slim cards */}
        <Reveal delay={220}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${secondary.length}, 1fr)`,
            gap: 24,
            paddingTop: 32,
            borderTop: '1px solid var(--line)',
          }} className="aud-secondary">
            <div className="samase-mono" style={{
              gridColumn: `1 / -1`,
              color: 'var(--ink-mute)',
              fontSize: 10,
              marginBottom: -16,
            }}>
              Juga untuk
            </div>
            {secondary.map((p, i) => (
              <PersonaMini key={p.n} {...p} />
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .aud-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .aud-cards { grid-template-columns: 1fr !important; }
          .aud-secondary { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function PersonaCard({ n, title, age, priority, hook, body, fit }) {
  const [hover, setHover] = React.useState(false);
  const isHighPriority = priority && priority.includes('High');
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--line)',
        padding: '36px 28px 28px',
        minHeight: 340,
        display: 'flex',
        flexDirection: 'column',
        transform: hover ? 'translateY(-3px)' : 'none',
        transition: 'all 280ms cubic-bezier(.2,.6,.2,1)',
        boxShadow: hover ? '0 18px 40px -20px rgba(30,22,10,0.18)' : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <span className="samase-mono" style={{ color: 'var(--gold)' }}>{n}</span>
        {isHighPriority && (
          <span className="samase-mono" style={{
            padding: '3px 8px',
            background: 'var(--gold)',
            color: 'var(--ink)',
            borderRadius: 999,
            fontSize: 8,
            letterSpacing: '0.12em',
          }}>
            PRIORITY
          </span>
        )}
      </div>
      <div className="samase-display" style={{
        fontSize: 26,
        color: 'var(--ink)',
        marginBottom: 6,
        lineHeight: 1.15,
      }}>
        {title}
      </div>
      <div className="samase-mono" style={{ color: 'var(--ink-mute)', marginBottom: 16, fontSize: 10 }}>
        {age}
      </div>
      {hook && (
        <p className="samase-serif-italic" style={{
          margin: '0 0 14px 0',
          color: 'var(--accent)',
          fontSize: 15,
          lineHeight: 1.45,
        }}>
          "{hook}"
        </p>
      )}
      <p style={{
        margin: 0,
        color: 'var(--ink-soft)',
        fontSize: 14,
        lineHeight: 1.65,
      }}>
        {body}
      </p>
      {fit && (
        <div style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: '1px solid var(--line-soft)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
        }}>
          {fit.map((item, i) => (
            <span key={i} className="samase-mono" style={{
              fontSize: 8,
              padding: '3px 8px',
              background: 'var(--bg-elev)',
              color: 'var(--ink-mute)',
              borderRadius: 999,
            }}>
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function PersonaMini({ n, title, age, hook, body }) {
  return (
    <div style={{
      padding: '24px 24px 20px',
      background: 'var(--bg-elev)',
      border: '1px solid var(--line-soft)',
    }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'baseline', marginBottom: 8 }}>
        <span className="samase-mono" style={{ color: 'var(--ink-mute)', fontSize: 9 }}>{n}</span>
        <span className="samase-display" style={{ fontSize: 18, color: 'var(--ink)' }}>{title}</span>
      </div>
      <div className="samase-mono" style={{ color: 'var(--ink-mute)', fontSize: 9, marginBottom: 10 }}>{age}</div>
      <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: 13, lineHeight: 1.6 }}>{body}</p>
    </div>
  );
}

Object.assign(window, { Navbar, Hero, Philosophy, Audience, SectionKicker, Eyebrow, Reveal, MetaBlock, PersonaCard, PersonaMini, useSAMASE, _t });
