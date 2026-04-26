// SAMASE — Landing page App root
// State is driven entirely by CMSStore (src/cms-store.js).
// Admin lives at admin.html (separate page).

function App() {
  // Bump tick on store changes to force re-render
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    if (!window.CMSStore) return;
    const unsub = window.CMSStore.subscribe(() => {
      applyBodyClasses();
      applySeoMeta();
      setTick((t) => t + 1);
    });
    const onLang = () => setTick((t) => t + 1);
    window.addEventListener('samase:lang-change', onLang);
    applyBodyClasses();
    applySeoMeta();
    return () => {
      unsub();
      window.removeEventListener('samase:lang-change', onLang);
    };
  }, []);

  const S = window.SAMASE || {};
  const ui = S.ui || {};
  const variant = ui.variant || 'warm';
  // Prefer new per-page layout key, fall back to legacy ui.layout
  const layout = ui.layouts?.fitspace || ui.layout || 'editorial';

  return (
    <div key={`${variant}-${layout}-${tick}`}>
      <AnnouncementBanner />
      <Navbar />
      <main>
        <LayoutRenderer layout={layout} />
      </main>
      <Footer />
      <LangSwitcher />
      <AdminFloatingLink />
    </div>
  );
}

// ─── Language switcher (ID / EN) ───
function LangSwitcher() {
  const [lang, setLang] = React.useState(() =>
    window.SamaseI18n ? window.SamaseI18n.getLang() : 'id'
  );
  const available = (window.SAMASE?.i18n?.available) || ['id', 'en'];
  if (!available || available.length < 2) return null;

  const choose = (l) => {
    setLang(l);
    if (window.SamaseI18n) window.SamaseI18n.setLang(l);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      left: 20,
      zIndex: 9000,
      display: 'flex',
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(28,26,23,0.08)',
      borderRadius: 999,
      padding: 3,
      fontFamily: 'var(--font-mono)',
      boxShadow: '0 10px 30px -12px rgba(28,26,23,0.2)',
    }}>
      {available.map(l => (
        <button
          key={l}
          onClick={() => choose(l)}
          style={{
            padding: '6px 14px',
            background: lang === l ? 'var(--ink)' : 'transparent',
            color: lang === l ? 'var(--bg)' : 'var(--ink-soft)',
            border: 'none',
            borderRadius: 999,
            fontSize: 10,
            letterSpacing: '0.16em',
            cursor: 'pointer',
            textTransform: 'uppercase',
            fontFamily: 'inherit',
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

// ─── Announcement banner — thin top strip, CMS-toggled ───
function AnnouncementBanner() {
  const a = (window.SAMASE && window.SAMASE.announcement) || {};
  if (!a.enabled) return null;
  return (
    <div style={{
      background: a.bg || '#1C1A17',
      color: a.fg || '#F2EEE5',
      padding: '11px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 18, flexWrap: 'wrap',
      fontFamily: 'var(--font-body)',
      fontSize: 13, lineHeight: 1.4,
      position: 'relative', zIndex: 60,
    }}>
      <span style={{ textAlign: 'center' }}>{a.message}</span>
      {a.linkUrl && a.linkLabel && (
        <a href={a.linkUrl} style={{
          color: 'inherit', textDecoration: 'underline',
          textUnderlineOffset: 3, fontSize: 12, opacity: 0.92,
        }}>
          {a.linkLabel} →
        </a>
      )}
    </div>
  );
}

// ─── Sync meta tags from CMS.seo ───
function applySeoMeta() {
  const seo = (window.SAMASE && window.SAMASE.seo) || {};
  if (seo.title) document.title = seo.title;

  const setMeta = (name, content, attr = 'name') => {
    if (!content) return;
    let tag = document.querySelector(`meta[${attr}="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attr, name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  setMeta('description', seo.description);
  setMeta('keywords', seo.keywords);
  setMeta('theme-color', seo.themeColor);
  setMeta('og:title', seo.title, 'property');
  setMeta('og:description', seo.description, 'property');
  setMeta('og:image', seo.ogImage, 'property');
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', seo.title);
  setMeta('twitter:description', seo.description);
  setMeta('twitter:image', seo.ogImage);

  if (seo.favicon) {
    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = seo.favicon;
  }
}

function applyBodyClasses() {
  const S = window.SAMASE || {};
  const ui = S.ui || {};
  const variant = ui.variant || 'warm';
  const layout = ui.layouts?.fitspace || ui.layout || 'editorial';

  document.body.classList.remove('variant-warm', 'variant-deep', 'variant-stone');
  document.body.classList.add('variant-' + variant);
  document.body.classList.toggle('body-dark', variant === 'deep');

  document.body.classList.remove('layout-editorial', 'layout-zen', 'layout-arch', 'layout-hero', 'layout-photo', 'layout-cinematic');
  const shortLayout = layout === 'architectural' ? 'arch' : layout;
  document.body.classList.add('layout-' + shortLayout);
}

// Bottom-right anchor to the Admin page.
// ALWAYS visible as a small discreet dot. Hover to expand.
// Hide entirely with Ctrl/Cmd+Shift+H (for recording/demo).
// 3 alt ways to open admin:
//   1. Click the dot (default visible)
//   2. Keyboard: Ctrl/Cmd + .  (period) opens admin directly
//   3. URL: ?admin=1 (also sets a visible flag permanently for this session)
function AdminFloatingLink() {
  const [hover, setHover] = React.useState(false);
  const [visible, setVisible] = React.useState(() => {
    try {
      const hidden = sessionStorage.getItem('samase_admin_pill_hidden') === '1';
      return !hidden;
    } catch (_) { return true; }
  });

  // Keyboard shortcuts
  React.useEffect(() => {
    const onKey = (e) => {
      // Ctrl/Cmd + . → open admin directly
      if ((e.metaKey || e.ctrlKey) && e.key === '.') {
        e.preventDefault();
        window.open('admin.html', '_blank', 'noopener,noreferrer');
      }
      // Ctrl/Cmd + Shift + H → toggle pill visibility (for demos/recordings)
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'H' || e.key === 'h')) {
        e.preventDefault();
        setVisible(v => {
          const next = !v;
          try {
            if (next) sessionStorage.removeItem('samase_admin_pill_hidden');
            else sessionStorage.setItem('samase_admin_pill_hidden', '1');
          } catch (_) {}
          return next;
        });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="admin.html"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 10000,
        display: 'inline-flex',
        alignItems: 'center',
        gap: hover ? 10 : 0,
        padding: hover ? '12px 18px' : '10px',
        background: hover ? 'rgba(28,26,23,0.94)' : 'rgba(28,26,23,0.55)',
        color: '#F2EEE5',
        border: '1px solid rgba(242,238,229,0.15)',
        borderRadius: 999,
        cursor: 'pointer',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: hover
          ? '0 14px 40px -12px rgba(28,26,23,0.5)'
          : '0 4px 12px -4px rgba(28,26,23,0.25)',
        transition: 'all 220ms cubic-bezier(.2,.6,.2,1)',
        transform: hover ? 'translateY(-1px)' : 'none',
        textDecoration: 'none',
        opacity: hover ? 1 : 0.55,
      }}
      title="Admin Panel · Ctrl/Cmd+. · hide: Ctrl/Cmd+Shift+H"
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#E8B88A',
          boxShadow: '0 0 8px #E8B88A',
          flexShrink: 0,
          animation: hover ? 'none' : 'samase-admin-pulse 2.2s ease-in-out infinite',
        }}
      />
      <span style={{
        maxWidth: hover ? 120 : 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        transition: 'max-width 220ms cubic-bezier(.2,.6,.2,1)',
      }}>
        Admin ↗
      </span>
      <style>{`
        @keyframes samase-admin-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </a>
  );
}

window.App = App;
window.AdminFloatingLink = AdminFloatingLink;
window.LangSwitcher = LangSwitcher;
