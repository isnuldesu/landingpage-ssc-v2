// SAMASE — remaining sections (Coach, FAQ, Form, Footer)

const S3 = window.SAMASE;

// ============ Coach — general intro + team grid ============
function Coach() {
  const c = S3.coach;
  const team = c.team || [];
  return (
    <section
      id="section-coach"
      style={{ padding: '120px 0' }}
    >
      <div className="samase-container">
        <SectionKicker number={c.number} label={c.kicker} />

        {/* Header — general intro */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 80,
          marginBottom: 72,
          alignItems: 'end',
        }} className="coach-head">
          <Reveal>
            <h2 className="samase-display" style={{
              fontSize: 'clamp(36px, 4.6vw, 64px)',
              margin: 0,
              color: 'var(--ink)',
              lineHeight: 1.08,
            }}>
              {c.title}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p style={{
              margin: 0,
              color: 'var(--ink-soft)',
              fontSize: 17,
              lineHeight: 1.7,
              maxWidth: 540,
            }}>
              {c.body}
            </p>
          </Reveal>
        </div>

        {/* Team grid — 4 cards */}
        <div
          className="coach-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
          }}
        >
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 80}>
              <CoachCard {...member} />
            </Reveal>
          ))}
        </div>

        {/* Consult CTA */}
        <Reveal delay={300}>
          <div style={{
            marginTop: 72,
            paddingTop: 36,
            borderTop: '1px solid var(--line)',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 40,
            alignItems: 'center',
          }} className="coach-cta">
            <p className="samase-serif-italic" style={{
              margin: 0,
              color: 'var(--ink-soft)',
              fontSize: 18,
              lineHeight: 1.5,
              maxWidth: 560,
            }}>
              {c.consultLabel}
            </p>
            <a href="#section-form" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 24px',
              background: 'var(--ink)',
              color: 'var(--bg)',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 500,
              transition: 'all 200ms',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--ink)'; }}
            >
              <span className="samase-mono" style={{ fontSize: 11 }}>{c.ctaLabel}</span>
              <span>→</span>
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .coach-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 860px) {
          .coach-head { grid-template-columns: 1fr !important; gap: 32px !important; }
          .coach-grid { grid-template-columns: 1fr !important; }
          .coach-cta { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}

// ============ Coach Card ============
function CoachCard({ name, role, specialty, bio, photo, tags }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--line)',
        padding: 0,
        overflow: 'hidden',
        transition: 'all 280ms cubic-bezier(.2,.6,.2,1)',
        transform: hover ? 'translateY(-3px)' : 'none',
        boxShadow: hover ? '0 20px 44px -22px rgba(30,22,10,0.22)' : 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Photo area — placeholder until real photo set */}
      <CoachPortrait photo={photo} name={name} />

      {/* Content */}
      <div style={{ padding: '24px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="samase-display" style={{
          fontSize: 22,
          color: 'var(--ink)',
          lineHeight: 1.15,
          marginBottom: 4,
        }}>
          {name}
        </div>
        <div className="samase-mono" style={{
          color: 'var(--accent)',
          fontSize: 10,
          marginBottom: 14,
        }}>
          {role}
        </div>
        <div className="samase-serif-italic" style={{
          color: 'var(--ink-soft)',
          fontSize: 14,
          marginBottom: 14,
          lineHeight: 1.45,
        }}>
          {specialty}
        </div>
        <p style={{
          margin: 0,
          color: 'var(--ink-soft)',
          fontSize: 13,
          lineHeight: 1.6,
          flex: 1,
        }}>
          {bio}
        </p>
        {tags && tags.length > 0 && (
          <div style={{
            marginTop: 16,
            paddingTop: 14,
            borderTop: '1px solid var(--line-soft)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
          }}>
            {tags.map((t, i) => (
              <span key={i} className="samase-mono" style={{
                fontSize: 8,
                padding: '3px 8px',
                background: 'var(--bg-elev)',
                color: 'var(--ink-mute)',
                borderRadius: 999,
              }}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============ Coach Portrait — placeholder or real image ============
function CoachPortrait({ photo, name }) {
  // If photo URL is set, show image
  if (photo) {
    return (
      <div style={{
        aspectRatio: '4 / 5',
        backgroundImage: `url(${photo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        background: 'var(--bg-elev)',
      }} />
    );
  }
  // Else — stylized silhouette placeholder
  return (
    <div style={{
      aspectRatio: '4 / 5',
      background: 'linear-gradient(180deg, var(--bg-elev) 0%, var(--line) 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <svg
        viewBox="0 0 100 125"
        preserveAspectRatio="xMidYMax meet"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '72%',
          height: '90%',
          opacity: 0.28,
        }}
      >
        <defs>
          <linearGradient id={`silh-${name?.replace(/\s/g, '') || 'g'}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="28" r="13" fill={`url(#silh-${name?.replace(/\s/g, '') || 'g'})`} />
        <path
          d="M 25 125 Q 25 62 50 54 Q 75 62 75 125 Z"
          fill={`url(#silh-${name?.replace(/\s/g, '') || 'g'})`}
        />
      </svg>
      <span className="samase-mono" style={{
        position: 'absolute',
        top: 14,
        left: 16,
        color: 'var(--ink-mute)',
        fontSize: 9,
        opacity: 0.7,
      }}>
        Portrait
      </span>
      <span className="samase-mono" style={{
        position: 'absolute',
        bottom: 14,
        right: 16,
        color: 'var(--ink-mute)',
        fontSize: 9,
        opacity: 0.5,
      }}>
        Photo TBA
      </span>
    </div>
  );
}

// ============ FAQ ============
function FAQ() {
  const f = S3.faq;
  const [open, setOpen] = React.useState(0);
  return (
    <section
      id="section-faq"
      style={{ padding: '120px 0', background: 'var(--bg-elev)' }}
    >
      <div className="samase-container">
        <SectionKicker number={f.number} label={f.kicker} />

        <Reveal>
          <h2 className="samase-display" style={{
            fontSize: 'clamp(36px, 4.6vw, 64px)',
            margin: '0 0 64px 0',
            color: 'var(--ink)',
            maxWidth: 900,
          }}>
            {f.title}
          </h2>
        </Reveal>

        <div style={{
          borderTop: '1px solid var(--line)',
        }}>
          {f.items.map((item, i) => (
            <FAQItem
              key={i}
              n={String(i + 1).padStart(2, '0')}
              q={item.q}
              a={item.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ n, q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid var(--line)' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '28px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          textAlign: 'left',
          color: 'var(--ink)',
        }}
      >
        <div style={{ display: 'flex', gap: 28, alignItems: 'baseline', flex: 1 }}>
          <span className="samase-mono" style={{ color: 'var(--ink-mute)', flexShrink: 0 }}>
            {n}
          </span>
          <span className="samase-display" style={{ fontSize: 'clamp(18px, 2.2vw, 24px)' }}>
            {q}
          </span>
        </div>
        <span style={{
          fontSize: 22,
          color: 'var(--ink-mute)',
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          transition: 'transform 260ms cubic-bezier(.2,.6,.2,1)',
          flexShrink: 0,
        }}>
          +
        </span>
      </button>
      <div style={{
        maxHeight: open ? 400 : 0,
        overflow: 'hidden',
        transition: 'max-height 400ms cubic-bezier(.2,.6,.2,1)',
      }}>
        <p style={{
          margin: 0,
          padding: '0 0 32px 62px',
          color: 'var(--ink-soft)',
          fontSize: 16,
          lineHeight: 1.75,
          maxWidth: 780,
        }} className="faq-answer">
          {a}
        </p>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .faq-answer { padding-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}

// ============ Form ============
function FormSection() {
  const SS = window.useSAMASE ? window.useSAMASE() : window.SAMASE;
  const f = SS.form || {};
  const fields = Array.isArray(f.fields) ? f.fields : [];
  const batches = Array.isArray(SS.founding?.batches) ? SS.founding.batches : [];

  // Auto-assign: derive batch from slot availability instead of user picking.
  const ctx = (window.getFoundingContext && window.getFoundingContext()) || null;
  const autoBatch = ctx?.batch || batches.find(b => b.status === 'active') || batches[0] || { id: 'visionary', label: 'Visionary', perks: [] };
  const allFull = !!ctx?.allFull;
  const showManualPicker = !!f.showBatchPicker; // admin-advanced only; hidden by default
  const activeBatch = autoBatch;
  const title = (window._t && window._t('form.title')) || f.title;
  const lede = (window._t && window._t('form.lede')) || f.lede;
  const kicker = (window._t && window._t('form.kicker')) || f.kicker;
  const benefitsHead = (window._t && window._t('form.benefitsHead')) || f.benefitsHead;
  const submitLabelRaw = (window._t && window._t('form.submitLabel')) || f.submitLabel || 'Kirim';
  const submitLabelWaitlist = f.submitLabelWaitlist || 'Daftar waitlist';
  const submitLabel = allFull ? submitLabelWaitlist : submitLabelRaw;
  const successTitle = allFull
    ? (f.submitSuccessTitleWaitlist || 'Kamu masuk waitlist prioritas.')
    : ((window._t && window._t('form.successTitle')) || f.successTitle || f.submitSuccessTitle);
  const successBody = allFull
    ? (f.submitSuccessBodyWaitlist || 'Kami kabari segera saat ada slot lepas.')
    : ((window._t && window._t('form.successBody')) || f.successBody || f.submitSuccessBody);

  // --- Inline slot-status line (quiet, calm). Replaces the old terracotta card. ---
  const priceK = autoBatch.priceOpenGym3M ? Math.round(autoBatch.priceOpenGym3M / 1000) : null;
  const remaining = ctx?.remaining ?? 0;
  const gelombangNum = (autoBatch.gelombang || autoBatch.label || '').match(/\d+/)?.[0] || autoBatch.label;
  const fillTpl = (tpl) => (tpl || '')
    .replace('{gelombang}', gelombangNum || '')
    .replace('{remaining}', String(remaining))
    .replace('{priceK}', priceK != null ? priceK.toLocaleString('id-ID') : '—');
  let inlineSlotText = '';
  if (allFull) {
    inlineSlotText = f.slotInlineFull || 'Founding Member tutup · masuk waitlist prioritas.';
  } else if (remaining > 0 && remaining <= 10) {
    inlineSlotText = fillTpl(f.slotInlineFew || f.slotInlineActive);
  } else {
    inlineSlotText = fillTpl(f.slotInlineActive);
  }

  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState(() => {
    const init = { batch: activeBatch.id };
    fields.forEach(fd => { init[fd.id] = ''; });
    return init;
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const selectedBatch = batches.find(b => b.id === form.batch) || activeBatch;
  const displayPerks = (selectedBatch.perks || []).slice(0, 5);

  return (
    <section
      id="section-form"
      style={{ padding: '120px 0', background: 'var(--bg-elev)' }}
    >
      <div className="samase-container">
        <SectionKicker number={f.number} label={kicker} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'start',
        }} className="form-grid">
          {/* LEFT — headline + lead magnets */}
          <div>
            <Reveal>
              <h2 className="samase-display" style={{
                fontSize: 'clamp(40px, 5.2vw, 72px)',
                margin: 0,
                color: 'var(--ink)',
                lineHeight: 1.02,
              }}>
                {title}
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p style={{
                marginTop: 24,
                color: 'var(--ink-soft)',
                fontSize: 17,
                lineHeight: 1.7,
                maxWidth: 520,
              }}>
                {lede}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div style={{
                marginTop: 44,
                padding: '28px',
                background: 'var(--bg-card)',
                border: '1px solid var(--line)',
              }}>
                <div className="samase-mono" style={{ color: 'var(--ink-mute)', marginBottom: 6 }}>
                  {benefitsHead}
                </div>
                <div className="samase-display" style={{
                  fontSize: 22,
                  color: 'var(--ink)',
                  marginBottom: 22,
                  lineHeight: 1.25,
                }}>
                  Gratis saat Anda isi form hari ini
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {displayPerks.map((p, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      gap: 12,
                      fontSize: 14,
                      color: 'var(--ink-soft)',
                      lineHeight: 1.55,
                    }}>
                      <span style={{ color: 'var(--gold)', flexShrink: 0, fontWeight: 500 }}>✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="samase-mono" style={{
                  marginTop: 20,
                  paddingTop: 18,
                  borderTop: '1px solid var(--line-soft)',
                  color: 'var(--ink-mute)',
                  fontSize: 10,
                  lineHeight: 1.6,
                }}>
                  Benefit di atas berlaku untuk gelombang <span style={{ color: 'var(--gold)' }}>{selectedBatch.label}</span>. Gelombang berikutnya dapat benefit yang lebih sedikit. Isi form sekarang untuk mengunci benefit ini.
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — form */}
          <Reveal delay={140}>
            <div style={{
              padding: '36px 32px',
              background: 'var(--bg-card)',
              border: '1px solid var(--line)',
            }} className="form-card">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{
                    width: 56, height: 56,
                    margin: '0 auto 20px',
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--ink)', fontSize: 24,
                  }}>✓</div>
                  <div className="samase-display" style={{
                    fontSize: 28, color: 'var(--ink)', marginBottom: 12, lineHeight: 1.2,
                  }}>
                    {successTitle}
                  </div>
                  <p className="samase-serif-italic" style={{
                    margin: '0 auto', maxWidth: 420, fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.5,
                  }}>
                    {successBody}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      const init = { batch: activeBatch.id };
                      fields.forEach(fd => { init[fd.id] = ''; });
                      setForm(init);
                    }}
                    className="samase-mono"
                    style={{
                      marginTop: 28, background: 'none', border: 'none',
                      color: 'var(--ink-mute)', textDecoration: 'underline', cursor: 'pointer',
                    }}
                  >
                    Kirim lagi
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  {fields.map((fd) => (
                    <DynamicField
                      key={fd.id}
                      field={fd}
                      value={form[fd.id] || ''}
                      onChange={update(fd.id)}
                    />
                  ))}

                  {batches.length > 0 && showManualPicker && (
                    <div>
                      <div className="samase-mono" style={{ color: 'var(--ink-mute)', marginBottom: 10 }}>
                        Gelombang yang diminati (opsional)
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {batches.map(b => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setForm({ ...form, batch: b.id })}
                            disabled={b.status === 'closed'}
                            className="samase-mono"
                            style={{
                              flex: '1 1 100px',
                              padding: '10px 12px',
                              background: form.batch === b.id ? 'var(--ink)' : 'transparent',
                              color: form.batch === b.id ? 'var(--bg)' : b.status === 'closed' ? 'var(--ink-mute)' : 'var(--ink)',
                              border: `1px solid ${form.batch === b.id ? 'var(--ink)' : 'var(--line)'}`,
                              fontSize: 10,
                              cursor: b.status === 'closed' ? 'not-allowed' : 'pointer',
                              opacity: b.status === 'closed' ? 0.4 : 1,
                              transition: 'all 180ms',
                            }}
                          >
                            {b.label}
                            {b.status === 'active' && <span style={{ marginLeft: 6, color: 'var(--gold)' }}>●</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quiet inline slot-status line — the calm version of the terracotta card */}
                  {batches.length > 0 && (
                    <div
                      role="status"
                      aria-live="polite"
                      style={{
                        marginTop: 4,
                        paddingTop: 14,
                        borderTop: '1px solid var(--line-soft)',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 10,
                        fontSize: 12.5,
                        lineHeight: 1.55,
                        color: allFull ? 'var(--ink-mute)' : 'var(--ink-soft)',
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          flexShrink: 0,
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          transform: 'translateY(-1px)',
                          background: allFull ? 'var(--ink-mute)' : 'var(--accent)',
                          boxShadow: allFull ? 'none' : '0 0 0 3px color-mix(in oklch, var(--accent) 22%, transparent)',
                        }}
                      />
                      <span>{inlineSlotText}</span>
                    </div>
                  )}

                  <button type="submit" style={{
                    marginTop: 6, padding: '16px 28px',
                    background: allFull ? 'var(--ink)' : 'var(--form-cta)',
                    color: allFull ? 'var(--bg)' : 'var(--form-cta-ink)',
                    border: 'none', borderRadius: 999, fontSize: 14, fontWeight: 500,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    gap: 12, transition: 'background 200ms', cursor: 'pointer',
                  }}
                  onMouseEnter={e => { if (!allFull) e.currentTarget.style.background = 'var(--accent)'; }}
                  onMouseLeave={e => { if (!allFull) e.currentTarget.style.background = 'var(--form-cta)'; }}
                  >
                    <span className="samase-mono" style={{fontSize: 11}}>{submitLabel}</span>
                    <span>→</span>
                  </button>

                  <p className="samase-mono" style={{
                    margin: 0, color: 'var(--ink-mute)', fontSize: 10,
                    textAlign: 'center', lineHeight: 1.5,
                  }}>
                    Data kamu aman. Tidak dibagikan ke pihak ketiga. Respon dalam 1x24 jam.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .form-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .form-card { padding: 28px 22px !important; }
        }
      `}</style>
    </section>
  );
}

// Dynamic field renderer — reads SAMASE.form.fields (editable via admin)
function DynamicField({ field, value, onChange }) {
  const type = field.type || 'text';
  if (type === 'select') {
    const opts = Array.isArray(field.options) ? field.options : [];
    return (
      <SelectField
        label={field.label + (field.required ? ' *' : '')}
        value={value}
        onChange={onChange}
        options={[{ v: '', l: field.placeholder || 'Pilih…' }, ...opts.map(o => ({ v: o, l: o }))]}
      />
    );
  }
  if (type === 'textarea') {
    return (
      <Field
        label={field.label}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        required={field.required}
        textarea
      />
    );
  }
  return (
    <Field
      label={field.label}
      value={value}
      onChange={onChange}
      placeholder={field.placeholder}
      required={field.required}
      type={type === 'tel' ? 'tel' : type === 'email' ? 'email' : 'text'}
    />
  );
}

function SelectField({ label, value, onChange, options }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div>
      <label className="samase-mono" style={{
        display: 'block',
        color: focus ? 'var(--ink)' : 'var(--ink-mute)',
        marginBottom: 4,
        transition: 'color 180ms',
      }}>
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: '100%',
          padding: '14px 0',
          background: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${focus ? 'var(--ink)' : 'var(--line)'}`,
          color: 'var(--ink)',
          fontSize: 15,
          fontFamily: 'var(--font-body)',
          outline: 'none',
        }}
      >
        {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder, textarea, required }) {
  const [focus, setFocus] = React.useState(false);
  const base = {
    width: '100%',
    padding: '14px 0',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focus ? 'var(--ink)' : 'var(--line)'}`,
    color: 'var(--ink)',
    fontSize: 16,
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 180ms',
    resize: 'vertical',
  };
  return (
    <div>
      <label className="samase-mono" style={{
        display: 'block',
        color: focus ? 'var(--ink)' : 'var(--ink-mute)',
        marginBottom: 4,
        transition: 'color 180ms',
      }}>
        {label}{required && <span style={{color: 'var(--gold)', marginLeft: 4}}>*</span>}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={base}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={base}
        />
      )}
    </div>
  );
}

// ============ Footer ============
function Footer() {
  const S = window.SAMASE || {};
  const c = S.contact || {};
  const L = S.legal || {};
  const b = S.brand || {};
  return (
    <footer style={{
      padding: '60px 0 40px',
      borderTop: '1px solid var(--line)',
      background: 'var(--bg)',
    }}>
      <div className="samase-container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 32,
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SamaseMark size={20} subtitle={b.tag || 'Pre-opening · 2026'} />
            {(c.addressLine1 || c.addressLine2) && (
              <address className="samase-mono" style={{
                fontStyle: 'normal', color: 'var(--ink-mute)', fontSize: 11, lineHeight: 1.7,
              }}>
                {c.addressLine1}{c.addressLine2 && <><br />{c.addressLine2}</>}
                {c.mapsUrl && <>
                  {' · '}
                  <a href={c.mapsUrl} target="_blank" rel="noopener noreferrer"
                     style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                    Lihat di peta ↗
                  </a>
                </>}
              </address>
            )}
          </div>
          <div style={{
            display: 'flex',
            gap: 26,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            {S.physio?.partner?.url && (
              <a href={S.physio.partner.url} target="_blank" rel="noopener noreferrer"
                 className="samase-mono" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>
                {S.physio.partner.name || 'Bebascedera'} ↗
              </a>
            )}
            {c.instagramUrl && (
              <a href={c.instagramUrl} target="_blank" rel="noopener noreferrer"
                 className="samase-mono" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>
                Instagram ↗
              </a>
            )}
            {c.tiktokUrl && (
              <a href={c.tiktokUrl} target="_blank" rel="noopener noreferrer"
                 className="samase-mono" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>
                TikTok ↗
              </a>
            )}
            {c.whatsappUrl && (
              <a href={c.whatsappUrl} target="_blank" rel="noopener noreferrer"
                 className="samase-mono" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>
                WhatsApp ↗
              </a>
            )}
            {c.email && (
              <a href={`mailto:${c.email}`}
                 className="samase-mono" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>
                {c.email}
              </a>
            )}
          </div>
        </div>

        <div style={{
          marginTop: 40,
          paddingTop: 24,
          borderTop: '1px solid var(--line-soft)',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}>
          <span className="samase-mono" style={{ color: 'var(--ink-mute)', fontSize: 10 }}>
            {L.copyright || '© SAMASE Sports Club 2026 — All rights reserved.'}
            {L.registrationNote && <> · {L.registrationNote}</>}
          </span>
          <span className="samase-mono" style={{ color: 'var(--ink-mute)', fontSize: 10, display: 'flex', gap: 14 }}>
            {L.privacyUrl && L.privacyUrl !== '#' && (
              <a href={L.privacyUrl} style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
            )}
            {L.termsUrl && L.termsUrl !== '#' && (
              <a href={L.termsUrl} style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
            )}
            <span>{b.city || 'Jakarta'} · {b.opening || 'Juli 2026'}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Coach, CoachCard, CoachPortrait, FAQ, FAQItem, FormSection, DynamicField, Field, SelectField, Footer });
