// SAMASE Admin — main app shell
// Handles: login, layout (sidebar + main + preview), routing between sections

const ADMIN_PASSCODE = /*EDITMODE-PASSCODE*/ 'samase2026' /*EDITMODE-PASSCODE-END*/;
const ADMIN_SESSION_KEY = 'samase_admin_session';

function AdminApp() {
  const [unlocked, setUnlocked] = React.useState(() => {
    try { return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'ok'; } catch (_) { return false; }
  });

  if (!unlocked) {
    return <AdminLogin onSuccess={() => {
      try { sessionStorage.setItem(ADMIN_SESSION_KEY, 'ok'); } catch (_) {}
      setUnlocked(true);
    }} />;
  }

  return <AdminShell onLogout={() => {
    try { sessionStorage.removeItem(ADMIN_SESSION_KEY); } catch (_) {}
    setUnlocked(false);
  }} />;
}

// ============ Login ============
function AdminLogin({ onSuccess }) {
  const [pw, setPw] = React.useState('');
  const [err, setErr] = React.useState(false);

  const submit = (e) => {
    e && e.preventDefault();
    if (pw === ADMIN_PASSCODE) {
      setErr(false);
      onSuccess();
    } else {
      setErr(true);
      setTimeout(() => setErr(false), 2500);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      padding: 32,
      background: 'linear-gradient(135deg, #F2EEE5 0%, #EAE3D4 100%)',
    }}>
      <form onSubmit={submit} style={{
        width: 440, maxWidth: '100%',
        background: '#FFFFFF',
        borderRadius: 16,
        padding: 40,
        boxShadow: '0 30px 80px -30px rgba(42,31,23,0.35)',
      }}>
        <div className="samase-mono" style={{
          fontSize: 10, color: '#A68D6F', marginBottom: 16, textTransform: 'uppercase',
        }}>
          SAMASE · Sports Club
        </div>
        <h1 className="samase-display" style={{
          margin: '0 0 10px', fontSize: 34, lineHeight: 1.1, fontWeight: 400,
        }}>
          Kelola Landing Page
        </h1>
        <p style={{
          margin: '0 0 28px',
          color: 'var(--ink-mute)', fontSize: 14, lineHeight: 1.6,
        }}>
          Admin panel eksklusif untuk tim SAMASE — atur layout, palette, batch kuota, copy hero, persona, fasilitas, tim coach, FAQ, brand logo, dan banyak lagi.
        </p>

        <label className="lbl">Passcode</label>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoFocus
          placeholder="••••••••"
          className="inp"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.2em',
            fontSize: 15,
            padding: '12px 14px',
            borderColor: err ? 'var(--accent)' : 'var(--line)',
          }}
        />
        {err && (
          <div style={{ color: 'var(--accent)', fontSize: 12, marginTop: 8 }}>
            Passcode salah. Coba lagi.
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
          <a href="SAMASE Sports Club — Landing Page.html" className="btn btn-ghost"
             style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            ← Kembali ke situs
          </a>
          <button type="submit" className="btn btn-primary">
            Masuk Admin →
          </button>
        </div>

        <div style={{
          marginTop: 28, paddingTop: 18, borderTop: '1px solid var(--line-soft)',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#A68D6F',
          lineHeight: 1.6,
        }}>
          Default passcode: <b style={{color: 'var(--ink)'}}>samase2026</b>
          <br />
          Ganti di <code>src/admin-app.jsx</code> baris 3
        </div>
      </form>
    </div>
  );
}

// ============ Main shell — sidebar + content + preview ============
function AdminShell({ onLogout }) {
  const [tab, setTab] = React.useState('main-brand');
  const [previewOpen, setPreviewOpen] = React.useState(true);
  const [toast, setToast] = React.useState(null);
  const [tick, setTick] = React.useState(0);

  // Mark this as the admin tab (so beforeunload warning triggers on dirty draft)
  React.useEffect(() => {
    window.__SAMASE_ADMIN__ = true;
    return () => { delete window.__SAMASE_ADMIN__; };
  }, []);

  // Subscribe to CMS changes to re-render
  React.useEffect(() => {
    if (!window.CMSStore) return;
    const unsub = window.CMSStore.subscribe(() => setTick(t => t + 1));
    return unsub;
  }, []);

  // Save hotkey: Ctrl/Cmd+S
  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (window.CMSStore?.isDirty()) {
          window.CMSStore.commit();
          setToast({ kind: 'ok', text: 'Perubahan tersimpan' });
          setTimeout(() => setToast(null), 2200);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const flash = (text, kind = 'ok') => {
    setToast({ text, kind });
    setTimeout(() => setToast(null), 2400);
  };

  const tabs = [
    // ── Main Brand (umbrella page) ──
    { id: 'main-brand',   label: 'Main Brand',  icon: '◉', desc: 'Umbrella & hero',          group: 'Main Brand' },
    { id: 'sub-brands',   label: 'Sub-brands',  icon: '◈', desc: '3 kartu sub-brand',        group: 'Main Brand' },

    // ── Design ──
    { id: 'visual',       label: 'Visual',      icon: '◐', desc: 'Layout & palette',         group: 'Design' },
    { id: 'announcement', label: 'Banner',      icon: '▬', desc: 'Top strip promo',          group: 'Design' },
    { id: 'ai',           label: 'AI Search',   icon: '★', desc: 'Hero assistant widget',    group: 'Design' },

    // ── Fitspace (sub-brand content) ──
    { id: 'hero',         label: 'Hero',        icon: '☀', desc: 'Headline · media · A/B',   group: 'Fitspace' },
    { id: 'batches',      label: 'Batches',     icon: '◉', desc: 'Kuota + scarcity',         group: 'Fitspace' },
    { id: 'audience',     label: 'Audience',    icon: '☻', desc: 'Persona cards',            group: 'Fitspace' },
    { id: 'facilities',   label: 'Fasilitas',   icon: '◧', desc: 'Layout + foto',            group: 'Fitspace' },
    { id: 'coach',        label: 'Coach',       icon: '☗', desc: 'Tim + portraits',          group: 'Fitspace' },
    { id: 'schedule',     label: 'Schedule',    icon: '▦', desc: 'Jadwal kelas',             group: 'Fitspace' },

    // ── Physio (sub-brand content) ──
    { id: 'physio',       label: 'Physio Flow', icon: '✚', desc: 'Screening → Assessment',   group: 'Physio' },
    { id: 'physio-pricing', label: 'Physio Pricing', icon: '⌗', desc: '3 tier Essential/Starter/Transformation', group: 'Physio' },
    { id: 'combo',        label: 'Combo Pack',  icon: '⊡', desc: 'Fitspace + Physio bundle', group: 'Physio' },

    // ── Campaign & Funnel ──
    { id: 'campaign-form', label: 'Campaign Form', icon: '✎', desc: 'Postural Assessment form', group: 'Campaign' },
    { id: 'journey',      label: 'Journey',     icon: '➤', desc: '6-step funnel flow',       group: 'Campaign' },

    // ── Shared Content ──
    { id: 'blog',         label: 'Journal',     icon: '¶', desc: 'Artikel pendek',           group: 'Content' },
    { id: 'events',       label: 'Events',      icon: '◈', desc: 'Kalender agenda',          group: 'Content' },
    { id: 'faq',          label: 'FAQ',         icon: '?', desc: 'Pertanyaan umum',          group: 'Content' },
    { id: 'form',         label: 'Form Legacy', icon: '✎', desc: 'Form lama (fitspace)',     group: 'Content' },
    { id: 'pricing',      label: 'Pricing',     icon: '⌗', desc: 'Harga Fitspace lengkap',   group: 'Content' },

    // ── Identity ──
    { id: 'brand',        label: 'Brand',       icon: '◆', desc: 'Logo & brand',             group: 'Identity' },
    { id: 'contact',      label: 'Contact',     icon: '✉', desc: 'Social · WA · alamat',     group: 'Identity' },
    { id: 'seo',          label: 'SEO / Meta',  icon: '⊚', desc: 'Title · OG · favicon',     group: 'Identity' },
    { id: 'i18n',         label: 'Bahasa',      icon: '⊕', desc: 'ID / EN translation',      group: 'Identity' },

    // ── Photos & System ──
    { id: 'photos',       label: 'Photo Manager', icon: '▣', desc: 'Upload foto per page', group: 'Media' },
    { id: 'demo',         label: 'Demo Photos', icon: '✦', desc: 'Seed Unsplash / stakeholder',  group: 'Media' },
    { id: 'advanced',     label: 'Advanced',    icon: '⚙', desc: 'Import/Export/Reset',      group: 'System' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: previewOpen ? '220px 1fr 520px' : '220px 1fr 0px',
      height: '100vh',
      transition: 'grid-template-columns 300ms',
    }}>
      {/* Sidebar */}
      <aside style={{
        background: '#FFFFFF',
        borderRight: '1px solid var(--line-soft)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '22px 20px 16px',
          borderBottom: '1px solid var(--line-soft)',
        }}>
          <div className="samase-mono" style={{
            fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>
            SAMASE · Admin
          </div>
          <div className="samase-display" style={{
            fontSize: 18, marginTop: 6, lineHeight: 1.1,
          }}>
            Kelola Landing
          </div>
        </div>

        <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 10px' }}>
          {tabs.map((t, i) => {
            const prev = tabs[i - 1];
            const showGroupLabel = t.group && (!prev || prev.group !== t.group);
            return (
              <React.Fragment key={t.id}>
                {showGroupLabel && (
                  <div className="samase-mono" style={{
                    padding: '14px 12px 6px', fontSize: 8,
                    color: 'var(--ink-mute)', letterSpacing: '0.18em',
                    textTransform: 'uppercase', fontWeight: 500,
                  }}>
                    {t.group}
                  </div>
                )}
            <button
              onClick={() => setTab(t.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '10px 12px',
                background: tab === t.id ? 'var(--bg-elev)' : 'transparent',
                color: tab === t.id ? 'var(--ink)' : 'var(--ink-soft)',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                textAlign: 'left',
                marginBottom: 2,
                fontSize: 13,
                transition: 'all 120ms',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => { if (tab !== t.id) e.currentTarget.style.background = 'var(--line-soft)'; }}
              onMouseLeave={e => { if (tab !== t.id) e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{
                width: 22, height: 22,
                display: 'grid', placeItems: 'center',
                fontSize: 14, color: tab === t.id ? 'var(--accent)' : 'var(--ink-mute)',
              }}>{t.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: tab === t.id ? 500 : 400 }}>{t.label}</div>
                <div className="samase-mono" style={{
                  fontSize: 8, color: 'var(--ink-mute)', marginTop: 2,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>{t.desc}</div>
              </div>
            </button>
              </React.Fragment>
            );
          })}
        </nav>

        <div style={{
          padding: '14px 14px 18px',
          borderTop: '1px solid var(--line-soft)',
          display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          {[
            { href: 'index.html', label: 'Main Brand (umbrella)' },
            { href: 'fitspace.html', label: 'Fitspace' },
            { href: 'physio.html', label: 'Physio' },
            { href: 'campaign.html', label: 'Campaign Form' },
            { href: 'padel.html', label: 'Padel (coming soon)' },
            { href: 'Pricing.html', label: 'Pricing lengkap' },
          ].map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 11, color: 'var(--ink-soft)',
                textDecoration: 'none', padding: '7px 10px',
                borderRadius: 6, display: 'flex', alignItems: 'center', gap: 8,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elev)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span>↗</span> {link.label}
            </a>
          ))}
          <button
            onClick={onLogout}
            style={{
              fontSize: 11, color: 'var(--ink-mute)',
              background: 'transparent', border: 'none',
              padding: '8px 10px', borderRadius: 6,
              cursor: 'pointer', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elev)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span>⎋</span> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{
        overflowY: 'auto',
        padding: '28px 44px 160px',
        background: 'var(--bg)',
      }}>
        <AdminHeader
          tab={tab}
          tabs={tabs}
          previewOpen={previewOpen}
          togglePreview={() => setPreviewOpen(!previewOpen)}
          flash={flash}
        />

        <div style={{ maxWidth: 780, marginTop: 28 }}>
          {/* Main Brand (umbrella) */}
          {tab === 'main-brand' && <TabMainBrand flash={flash} />}
          {tab === 'sub-brands' && <TabSubBrands flash={flash} />}

          {/* Design */}
          {tab === 'visual' && <TabVisual flash={flash} />}
          {tab === 'announcement' && <TabAnnouncement flash={flash} />}
          {tab === 'ai' && <TabAI flash={flash} />}

          {/* Fitspace */}
          {tab === 'hero' && <TabHero flash={flash} />}
          {tab === 'batches' && <TabBatches flash={flash} />}
          {tab === 'audience' && <TabAudience flash={flash} />}
          {tab === 'facilities' && <TabFacilities flash={flash} />}
          {tab === 'coach' && <TabCoach flash={flash} />}
          {tab === 'schedule' && <TabSchedule flash={flash} />}

          {/* Physio */}
          {tab === 'physio' && <TabPhysio flash={flash} />}
          {tab === 'physio-pricing' && <TabPhysioPricing flash={flash} />}
          {tab === 'combo' && <TabCombo flash={flash} />}

          {/* Campaign */}
          {tab === 'campaign-form' && <TabCampaignForm flash={flash} />}
          {tab === 'journey' && <TabJourney flash={flash} />}

          {/* Shared */}
          {tab === 'blog' && <TabBlog flash={flash} />}
          {tab === 'events' && <TabEvents flash={flash} />}
          {tab === 'faq' && <TabFAQ flash={flash} />}
          {tab === 'form' && <TabForm flash={flash} />}
          {tab === 'pricing' && <TabPricing flash={flash} />}

          {/* Identity */}
          {tab === 'brand' && <TabBrand flash={flash} />}
          {tab === 'contact' && <TabContact flash={flash} />}
          {tab === 'seo' && <TabSEO flash={flash} />}
          {tab === 'i18n' && <TabI18n flash={flash} />}

          {/* Media */}
          {tab === 'photos' && <TabPhotos flash={flash} />}
          {tab === 'demo' && <TabDemoPhotos flash={flash} />}

          {/* System */}
          {tab === 'advanced' && <TabAdvanced flash={flash} />}
        </div>
      </main>

      {/* Preview pane */}
      {previewOpen && (
        <aside style={{
          background: '#1C1A17',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '12px 18px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: '1px solid #2A2620',
          }}>
            <div className="samase-mono" style={{
              color: '#E8B88A', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
            }}>
              Live Preview
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <PreviewViewportToggle />
              <button
                onClick={() => setPreviewOpen(false)}
                title="Close preview"
                style={{
                  width: 28, height: 28, border: 'none',
                  background: 'transparent', color: '#B89467',
                  cursor: 'pointer', borderRadius: 4, fontSize: 16,
                  fontFamily: 'inherit',
                }}
              >×</button>
            </div>
          </div>
          <LivePreview tick={tick} activeTab={tab} />
        </aside>
      )}

      {toast && (
        <div style={{
          position: 'fixed',
          bottom: 96, left: '50%', transform: 'translateX(-50%)',
          background: toast.kind === 'err' ? 'var(--accent)' : 'var(--ink)',
          color: '#F2EEE5',
          padding: '12px 22px',
          borderRadius: 999,
          fontSize: 13,
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.35)',
          zIndex: 120,
          fontFamily: 'JetBrains Mono, monospace',
          letterSpacing: '0.05em',
        }}>
          {toast.text}
        </div>
      )}

      <SaveBar flash={flash} />
    </div>
  );
}

// ============ SaveBar — draft/commit/discard ============
function SaveBar({ flash }) {
  const [, setTick] = React.useState(0);
  React.useEffect(() => {
    if (!window.CMSStore) return;
    const unsub = window.CMSStore.subscribe(() => setTick(t => t + 1));
    return unsub;
  }, []);

  const isDirty = window.CMSStore?.isDirty?.() || false;
  const count = window.CMSStore?.draftCount?.() || 0;
  const keys = (window.CMSStore?.draftKeys?.() || []).slice(0, 3);
  const [saving, setSaving] = React.useState(false);

  const onSave = () => {
    setSaving(true);
    setTimeout(() => {
      window.CMSStore.commit();
      setSaving(false);
      flash && flash(`✓ ${count} perubahan tersimpan`, 'ok');
    }, 120);
  };
  const onDiscard = () => {
    if (!confirm(`Batalkan ${count} perubahan yang belum disimpan?`)) return;
    window.CMSStore.discardDraft();
    flash && flash('Perubahan dibatalkan', 'ok');
  };

  return (
    <div style={{
      position: 'fixed', left: 220, right: 0, bottom: 0,
      padding: '14px 44px',
      background: isDirty ? 'var(--ink)' : 'rgba(255,255,255,0.9)',
      color: isDirty ? 'var(--bg)' : 'var(--ink-soft)',
      borderTop: `1px solid ${isDirty ? 'var(--ink)' : 'var(--line-soft)'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16, zIndex: 90,
      backdropFilter: 'blur(10px)',
      transition: 'background 180ms, color 180ms',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{
          width: 9, height: 9, borderRadius: '50%',
          background: isDirty ? 'var(--gold)' : 'var(--ok)',
          boxShadow: isDirty ? '0 0 10px rgba(232,184,138,0.7)' : 'none',
          animation: isDirty ? 'samase-pulse 1.6s infinite' : 'none',
        }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>
            {isDirty ? `${count} perubahan belum disimpan` : 'Semua perubahan tersimpan'}
          </div>
          <div className="samase-mono" style={{ fontSize: 9, opacity: 0.6, letterSpacing: '0.08em', marginTop: 2 }}>
            {isDirty
              ? (keys.join(' · ') + (count > keys.length ? ' · ...' : '') + ' · ⌘S untuk save cepat')
              : 'Landing page & pricing ter-sync otomatis'}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        {isDirty && (
          <button onClick={onDiscard} className="samase-mono" style={{
            padding: '9px 16px', background: 'transparent', color: 'var(--bg)',
            border: '1px solid rgba(242,238,229,0.3)', borderRadius: 999,
            fontSize: 11, letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'inherit',
          }}>Batalkan</button>
        )}
        <button onClick={onSave} disabled={!isDirty || saving} className="samase-mono" style={{
          padding: '9px 22px',
          background: isDirty ? 'var(--gold)' : 'rgba(200,139,94,0.25)',
          color: isDirty ? 'var(--ink)' : 'var(--ink-mute)',
          border: 'none', borderRadius: 999,
          fontSize: 11, letterSpacing: '0.1em',
          cursor: isDirty && !saving ? 'pointer' : 'default',
          fontFamily: 'inherit', fontWeight: 500,
          opacity: saving ? 0.6 : 1,
        }}>
          {saving ? 'Menyimpan...' : 'Save Changes'}
        </button>
      </div>
      <style>{`
        @keyframes samase-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.88); }
        }
      `}</style>
    </div>
  );
}

function AdminHeader({ tab, tabs, previewOpen, togglePreview, flash }) {
  const cur = tabs.find(t => t.id === tab);

  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      gap: 20, paddingBottom: 16,
      borderBottom: '1px solid var(--line)',
    }}>
      <div>
        <div className="samase-mono" style={{
          fontSize: 10, color: 'var(--ink-mute)',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          marginBottom: 4,
        }}>
          Section · {cur?.icon} {cur?.desc}
        </div>
        <h1 className="samase-display" style={{
          margin: 0, fontSize: 36, lineHeight: 1, fontWeight: 400,
        }}>
          {cur?.label}
        </h1>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          onClick={togglePreview}
          className="btn btn-ghost"
          style={{ fontSize: 11 }}
        >
          {previewOpen ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>
    </div>
  );
}

// ============ Live Preview iframe ============
// Preview URL is driven by active tab so user sees relevant page while editing.
const TAB_TO_PAGE = {
  'main-brand': 'index.html',
  'sub-brands': 'index.html',
  'hero': 'fitspace.html',
  'batches': 'fitspace.html',
  'audience': 'fitspace.html',
  'facilities': 'fitspace.html',
  'coach': 'fitspace.html',
  'schedule': 'fitspace.html',
  'physio': 'physio.html',
  'physio-pricing': 'physio.html',
  'combo': 'physio.html',
  'campaign-form': 'campaign.html',
  'journey': 'campaign.html',
  'faq': 'fitspace.html',
  'form': 'fitspace.html',
  'blog': 'fitspace.html',
  'events': 'fitspace.html',
  'pricing': 'Pricing.html',
  // Default for design/identity/system tabs: show main brand
};

function LivePreview({ tick, activeTab }) {
  const iframeRef = React.useRef(null);
  const [viewport, setViewport] = React.useState('desktop');
  const [manualOverride, setManualOverride] = React.useState(null);

  // Auto-pick page based on tab (unless user manually overrode)
  const autoPage = TAB_TO_PAGE[activeTab] || 'index.html';
  const currentPage = manualOverride || autoPage;

  // Clear manual override when user switches tabs
  React.useEffect(() => {
    setManualOverride(null);
  }, [activeTab]);

  const widths = { desktop: '100%', tablet: 768, mobile: 390 };

  const pages = [
    { id: 'index.html', label: 'Main' },
    { id: 'fitspace.html', label: 'Fitspace' },
    { id: 'physio.html', label: 'Physio' },
    { id: 'campaign.html', label: 'Campaign' },
    { id: 'padel.html', label: 'Padel' },
    { id: 'Pricing.html', label: 'Pricing' },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Page picker strip */}
      <div style={{
        padding: '10px 14px',
        background: '#141414',
        borderBottom: '1px solid #2A2620',
        display: 'flex', gap: 4, overflowX: 'auto',
        scrollbarWidth: 'thin',
      }}>
        {pages.map(p => {
          const isActive = currentPage === p.id;
          const isAuto = !manualOverride && autoPage === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setManualOverride(p.id === autoPage ? null : p.id)}
              title={p.id}
              style={{
                padding: '6px 12px',
                background: isActive ? '#E8B88A' : 'transparent',
                color: isActive ? '#1C1A17' : '#B89467',
                border: isActive ? 'none' : '1px solid #2A2620',
                borderRadius: 4,
                fontSize: 10,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'JetBrains Mono, monospace',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', gap: 5,
              }}
            >
              {p.label}
              {isAuto && isActive && <span style={{ fontSize: 8, opacity: 0.6 }}>●</span>}
            </button>
          );
        })}
      </div>

      <div style={{
        flex: 1,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: viewport === 'desktop' ? 0 : 20,
        background: '#0E0E0E',
        overflow: 'auto',
      }}>
        <iframe
          key={currentPage}
          ref={iframeRef}
          src={currentPage + '?_t=' + tick}
          title="Live preview"
          style={{
            width: widths[viewport],
            height: '100%',
            minHeight: viewport === 'desktop' ? '100%' : 800,
            border: 'none',
            background: '#F2EEE5',
            borderRadius: viewport === 'desktop' ? 0 : 12,
            boxShadow: viewport === 'desktop' ? 'none' : '0 20px 60px rgba(0,0,0,0.4)',
          }}
        />
      </div>
    </div>
  );
}

function PreviewViewportToggle() {
  const [v, setV] = React.useState('desktop');
  const items = [
    { id: 'desktop', label: '▭' },
    { id: 'tablet', label: '▯' },
    { id: 'mobile', label: '▫' },
  ];
  // Broadcast viewport via DOM attribute on iframe's parent
  React.useEffect(() => {
    const frame = document.querySelector('iframe[title="Live preview"]');
    if (!frame) return;
    const widths = { desktop: '100%', tablet: '768px', mobile: '390px' };
    frame.style.width = widths[v];
    frame.style.borderRadius = v === 'desktop' ? '0' : '12px';
  }, [v]);
  return (
    <div style={{ display: 'flex', background: '#2A2620', borderRadius: 6, padding: 2 }}>
      {items.map(it => (
        <button
          key={it.id}
          onClick={() => setV(it.id)}
          title={it.id}
          style={{
            width: 26, height: 24, border: 'none',
            background: v === it.id ? '#E8B88A' : 'transparent',
            color: v === it.id ? '#1C1A17' : '#B89467',
            cursor: 'pointer',
            borderRadius: 4,
            fontSize: 12,
            fontFamily: 'inherit',
          }}
        >{it.label}</button>
      ))}
    </div>
  );
}

window.AdminApp = AdminApp;
