// SAMASE — new sections v1: Blog, Events, Schedule
// All sections are opt-in (SAMASE.blog.enabled / SAMASE.events.enabled / SAMASE.schedule.enabled)

// ============ Blog / Journal ============
function BlogSection() {
  const SS = window.useSAMASE ? window.useSAMASE() : window.SAMASE;
  const b = SS?.blog;
  if (!b || !b.enabled) return null;
  const items = Array.isArray(b.items) ? b.items : [];
  const kicker = (window._t && window._t('blog.kicker')) || b.kicker;
  const title = (window._t && window._t('blog.title')) || b.title;
  const lede = (window._t && window._t('blog.lede')) || b.lede;

  return (
    <section id="section-blog" style={{ padding: '120px 0', background: 'var(--bg)' }}>
      <div className="samase-container">
        <SectionKicker number={b.number} label={kicker} />

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 80, alignItems: 'end', marginBottom: 72,
        }} className="blog-head">
          <Reveal>
            <h2 className="samase-display" style={{
              fontSize: 'clamp(36px, 4.6vw, 68px)', margin: 0, color: 'var(--ink)',
            }}>{title}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="samase-serif-italic" style={{
              fontSize: 20, color: 'var(--ink-soft)', margin: 0, maxWidth: 480, lineHeight: 1.5,
            }}>{lede}</p>
          </Reveal>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 28,
        }} className="blog-grid">
          {items.slice(0, 6).map((it, i) => (
            <Reveal key={it.id || i} delay={(i % 3) * 70}>
              <BlogCard item={it} />
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .blog-head { grid-template-columns: 1fr !important; gap: 32px !important; }
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function BlogCard({ item }) {
  const [hover, setHover] = React.useState(false);
  const date = item.date ? formatDate(item.date) : '';
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexDirection: 'column',
        borderTop: '1px solid var(--ink)',
        paddingTop: 16,
        cursor: 'pointer',
      }}
    >
      <div style={{
        aspectRatio: '4/3',
        background: item.cover ? `url(${item.cover}) center/cover` : 'var(--bg-elev)',
        marginBottom: 18,
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid var(--line-soft)',
      }}>
        {!item.cover && (
          <div style={{
            position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
            color: 'var(--ink-mute)', fontSize: 10, letterSpacing: '0.16em',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            JOURNAL · {item.category?.toUpperCase()}
          </div>
        )}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          padding: '4px 10px',
          background: 'var(--bg)',
          fontSize: 9, letterSpacing: '0.15em',
          color: 'var(--ink-soft)',
          fontFamily: "'JetBrains Mono', monospace",
          textTransform: 'uppercase',
        }}>
          {item.category}
        </div>
      </div>

      <div className="samase-mono" style={{
        fontSize: 10, color: 'var(--ink-mute)',
        letterSpacing: '0.08em', marginBottom: 10,
      }}>
        {date} · {item.author}
      </div>
      <h3 className="samase-display" style={{
        margin: '0 0 10px', fontSize: 22, lineHeight: 1.22,
        color: 'var(--ink)',
        textDecoration: hover ? 'underline' : 'none',
        textUnderlineOffset: 6,
      }}>
        {item.title}
      </h3>
      <p style={{
        margin: 0, color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.65,
      }}>{item.excerpt}</p>
      <div className="samase-mono" style={{
        marginTop: 14, fontSize: 10,
        color: 'var(--accent)', letterSpacing: '0.14em',
      }}>
        Baca selengkapnya →
      </div>
    </article>
  );
}

// ============ Events ============
function EventsSection() {
  const SS = window.useSAMASE ? window.useSAMASE() : window.SAMASE;
  const e = SS?.events;
  if (!e || !e.enabled) return null;
  const items = Array.isArray(e.items) ? e.items : [];
  const kicker = (window._t && window._t('events.kicker')) || e.kicker;
  const title = (window._t && window._t('events.title')) || e.title;
  const lede = (window._t && window._t('events.lede')) || e.lede;

  return (
    <section id="section-events" style={{ padding: '120px 0', background: 'var(--bg-elev)' }}>
      <div className="samase-container">
        <SectionKicker number={e.number} label={kicker} />

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 80, alignItems: 'end', marginBottom: 64,
        }} className="evt-head">
          <Reveal>
            <h2 className="samase-display" style={{
              fontSize: 'clamp(36px, 4.6vw, 68px)', margin: 0, color: 'var(--ink)',
            }}>{title}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="samase-serif-italic" style={{
              fontSize: 20, color: 'var(--ink-soft)', margin: 0, maxWidth: 480, lineHeight: 1.5,
            }}>{lede}</p>
          </Reveal>
        </div>

        <div style={{ borderTop: '1px solid var(--line)' }}>
          {items.map((ev, i) => (
            <Reveal key={ev.id || i} delay={i * 60}>
              <EventRow ev={ev} />
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .evt-head { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

function EventRow({ ev }) {
  const [open, setOpen] = React.useState(false);
  const d = parseDate(ev.date);
  const day = d ? d.getDate() : '—';
  const mon = d ? d.toLocaleString('id-ID', { month: 'short' }) : '';
  const year = d ? d.getFullYear() : '';
  const statusColor = ev.status === 'upcoming' ? 'var(--accent)' : ev.status === 'past' ? 'var(--ink-mute)' : 'var(--ink-soft)';

  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        borderBottom: '1px solid var(--line)',
        padding: '24px 0',
        cursor: 'pointer',
        display: 'grid',
        gridTemplateColumns: '120px 1fr auto',
        gap: 32,
        alignItems: 'center',
      }}
      className="evt-row"
    >
      <div>
        <div className="samase-display" style={{
          fontSize: 44, lineHeight: 1, color: 'var(--ink)',
        }}>{day}</div>
        <div className="samase-mono" style={{
          fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '0.14em',
          textTransform: 'uppercase', marginTop: 4,
        }}>
          {mon} {year}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
          <span className="samase-mono" style={{
            fontSize: 9, color: statusColor, letterSpacing: '0.15em',
            textTransform: 'uppercase', padding: '2px 8px',
            border: `1px solid ${statusColor}`, borderRadius: 999,
          }}>
            {ev.audience || 'Semua'}
          </span>
          <span className="samase-mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>
            {ev.time} · {ev.location}
          </span>
        </div>
        <div className="samase-display" style={{
          fontSize: 22, color: 'var(--ink)', lineHeight: 1.2,
        }}>
          {ev.title}
        </div>
        {open && (
          <p style={{
            margin: '12px 0 0', color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.65,
            maxWidth: 680,
          }}>
            {ev.body}
          </p>
        )}
      </div>

      <div style={{
        width: 40, height: 40, border: '1px solid var(--line)', borderRadius: '50%',
        display: 'grid', placeItems: 'center',
        color: 'var(--ink-mute)', fontSize: 14,
        transform: open ? 'rotate(45deg)' : 'rotate(0)',
        transition: 'transform 200ms',
      }}>+</div>
    </div>
  );
}

// ============ Schedule ============
function ScheduleSection() {
  const SS = window.useSAMASE ? window.useSAMASE() : window.SAMASE;
  const s = SS?.schedule;
  if (!s || !s.enabled) return null;
  const kicker = (window._t && window._t('schedule.kicker')) || s.kicker;
  const title = (window._t && window._t('schedule.title')) || s.title;
  const lede = (window._t && window._t('schedule.lede')) || s.lede;

  const days = s.days || ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const items = Array.isArray(s.items) ? s.items : [];
  const [activeDay, setActiveDay] = React.useState(days[0]);
  const dayItems = items.filter(it => it.day === activeDay).sort((a, b) => (a.time || '').localeCompare(b.time || ''));

  return (
    <section id="section-schedule" style={{ padding: '120px 0', background: 'var(--bg)' }}>
      <div className="samase-container">
        <SectionKicker number={s.number} label={kicker} />

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 80, alignItems: 'end', marginBottom: 56,
        }} className="sch-head">
          <Reveal>
            <h2 className="samase-display" style={{
              fontSize: 'clamp(36px, 4.6vw, 68px)', margin: 0, color: 'var(--ink)',
            }}>{title}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="samase-serif-italic" style={{
              fontSize: 20, color: 'var(--ink-soft)', margin: 0, maxWidth: 480, lineHeight: 1.5,
            }}>{lede}</p>
          </Reveal>
        </div>

        {/* Day tabs */}
        <div style={{
          display: 'flex', gap: 6, marginBottom: 28,
          flexWrap: 'wrap',
          borderBottom: '1px solid var(--line)',
          paddingBottom: 4,
        }}>
          {days.map(d => {
            const count = items.filter(it => it.day === d).length;
            const active = d === activeDay;
            return (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                style={{
                  padding: '10px 18px',
                  border: 'none',
                  borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
                  background: 'transparent',
                  color: active ? 'var(--ink)' : 'var(--ink-mute)',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  fontWeight: active ? 500 : 400,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                  marginBottom: -1,
                }}
              >
                {d}
                <span className="samase-mono" style={{
                  fontSize: 9, color: 'var(--ink-mute)', letterSpacing: '0.08em',
                }}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Day grid */}
        {dayItems.length === 0 ? (
          <p style={{
            textAlign: 'center', padding: 60,
            color: 'var(--ink-mute)', fontStyle: 'italic',
          }}>Tidak ada kelas pada hari ini.</p>
        ) : (
          <div style={{ display: 'grid', gap: 0 }}>
            {dayItems.map((it, i) => (
              <ScheduleRow key={i} item={it} />
            ))}
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .sch-head { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

function ScheduleRow({ item }) {
  const isWomen = /women/i.test(item.audience || '');
  const isMen = /^men/i.test(item.audience || '');
  const is50 = /50\+|senior|golden/i.test(item.audience || '');
  const pillBg = isWomen ? 'rgba(198,139,94,0.12)' : isMen ? 'rgba(29,40,55,0.08)' : is50 ? 'rgba(74,119,84,0.12)' : 'rgba(28,26,23,0.05)';
  const pillColor = isWomen ? 'var(--gold)' : isMen ? '#3D4247' : is50 ? 'var(--ok)' : 'var(--ink-soft)';

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '90px 1fr 220px 120px auto',
      gap: 24,
      padding: '18px 0',
      borderBottom: '1px solid var(--line-soft)',
      alignItems: 'center',
    }} className="sch-row">
      <div className="samase-mono" style={{
        fontSize: 14, color: 'var(--ink)', fontWeight: 500,
      }}>{item.time}</div>
      <div className="samase-display" style={{
        fontSize: 18, color: 'var(--ink)', lineHeight: 1.2,
      }}>{item.className}</div>
      <div className="samase-mono" style={{
        fontSize: 11, color: 'var(--ink-mute)', letterSpacing: '0.04em',
      }}>{item.coach}</div>
      <div>
        <span className="samase-mono" style={{
          fontSize: 9, padding: '4px 10px', borderRadius: 999,
          background: pillBg, color: pillColor,
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>{item.audience}</span>
      </div>
      <div className="samase-mono" style={{
        fontSize: 11, color: 'var(--ink-mute)', textAlign: 'right',
      }}>
        {item.spots} slot
      </div>
    </div>
  );
}

// ============ Helpers ============
function parseDate(s) {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}
function formatDate(s) {
  const d = parseDate(s);
  if (!d) return '';
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

Object.assign(window, { BlogSection, BlogCard, EventsSection, EventRow, ScheduleSection, ScheduleRow });
