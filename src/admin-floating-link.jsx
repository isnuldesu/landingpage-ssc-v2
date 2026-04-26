// SAMASE — Floating "Admin ↗" pill (bottom-right)
// Shared across all landing pages: index, fitspace, physio, campaign, padel.
//
// 3 ways to open admin:
//   1. Click the dot (always visible bottom-right)
//   2. Keyboard: Ctrl/Cmd+.  (period)
//   3. URL: append ?admin=1 then Enter
//
// Hide temporarily with Ctrl/Cmd+Shift+H (saved to sessionStorage).

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
      // Ctrl/Cmd + Shift + H → toggle visibility
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
        background: hover ? 'rgba(28,26,23,0.94)' : 'rgba(28,26,23,0.72)',
        color: '#F2EEE5',
        border: '1px solid rgba(242,238,229,0.2)',
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
          : '0 4px 12px -4px rgba(28,26,23,0.3)',
        transition: 'all 220ms cubic-bezier(.2,.6,.2,1)',
        transform: hover ? 'translateY(-1px)' : 'none',
        textDecoration: 'none',
        opacity: hover ? 1 : 0.72,
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

window.AdminFloatingLink = AdminFloatingLink;
