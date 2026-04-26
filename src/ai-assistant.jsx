// SAMASE AI Assistant — grounded chat widget for the hero
// Uses window.claude.complete; system prompt grounded in window.SAMASE content.

function AIAssistant({ compact = false }) {
  const S = window.SAMASE || {};
  const ai = S.ai || {};
  const lang = (window.SamaseI18n && window.SamaseI18n.useLang) ? window.SamaseI18n.useLang() : 'id';
  const aiLocal = lang === 'en' ? (S.en && S.en.ai) || {} : ai;

  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([]); // [{role,content}]
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const systemPrompt = React.useMemo(() => buildSystemPrompt(S, lang), [S, lang]);

  async function ask(q) {
    if (!q || !q.trim() || loading) return;
    const userMsg = { role: 'user', content: q.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const reply = await window.claude.complete({
        messages: [
          { role: 'user', content: systemPrompt + '\n\n---\n\nUser: ' + q.trim() },
        ],
      });
      setMessages([...next, { role: 'assistant', content: reply || '(kosong)' }]);
    } catch (err) {
      setMessages([...next, {
        role: 'assistant',
        content: lang === 'en'
          ? 'Sorry, I could not respond right now. Please contact our team directly on WhatsApp.'
          : 'Maaf, saat ini saya tidak bisa menjawab. Silakan hubungi tim kami langsung lewat WhatsApp.'
      }]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      ask(input);
    }
  }

  if (!ai.enabled) return null;

  return (
    <div style={{
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(28,26,23,0.08)',
      borderRadius: 18,
      boxShadow: '0 30px 80px -30px rgba(42,31,23,0.35), 0 4px 14px rgba(42,31,23,0.06)',
      overflow: 'hidden',
      maxWidth: compact ? 560 : 620,
      width: '100%',
    }}>
      {/* Header */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          padding: '18px 22px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer',
          borderBottom: open ? '1px solid rgba(28,26,23,0.08)' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <AssistantIcon />
          <div>
            <div className="samase-mono" style={{
              fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--ink-mute, #7A6A5A)',
            }}>
              {aiLocal.kicker || 'Tanya langsung'}
            </div>
            <div style={{
              fontSize: 15, marginTop: 2, color: 'var(--ink, #1C1A17)',
              fontFamily: "'Exo 2', 'Inter Tight', sans-serif", fontWeight: 400,
            }}>
              {open ? (lang === 'en' ? 'SAMASE Assistant' : 'Asisten SAMASE') : (aiLocal.placeholder || ai.placeholder)}
            </div>
          </div>
        </div>
        <span style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'var(--ink, #1C1A17)', color: 'var(--bg, #F2EEE5)',
          display: 'grid', placeItems: 'center',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 200ms',
          fontSize: 14,
        }}>+</span>
      </div>

      {open && (
        <>
          <div
            ref={scrollRef}
            style={{
              maxHeight: 360, overflowY: 'auto', padding: '18px 22px',
              display: 'flex', flexDirection: 'column', gap: 12,
              background: '#FAF7F0',
            }}
          >
            {messages.length === 0 && (
              <div>
                <div style={{
                  color: 'var(--ink-soft, #4A3A2C)', fontSize: 14, lineHeight: 1.6,
                  padding: '10px 14px',
                  background: '#FFF', borderRadius: 12,
                  border: '1px solid rgba(28,26,23,0.06)',
                }}>
                  {aiLocal.greeting || ai.greeting}
                </div>
                <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div className="samase-mono" style={{
                    fontSize: 9, color: 'var(--ink-mute, #7A6A5A)', letterSpacing: '0.12em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>
                    {lang === 'en' ? 'Try asking' : 'Coba tanya'}
                  </div>
                  {(aiLocal.suggestions || ai.suggestions || []).map((s, i) => (
                    <button
                      key={i}
                      onClick={() => ask(s)}
                      className="samase-mono"
                      style={{
                        textAlign: 'left',
                        padding: '9px 14px',
                        background: '#FFF',
                        border: '1px solid rgba(28,26,23,0.08)',
                        borderRadius: 999,
                        fontSize: 11,
                        color: 'var(--ink-soft, #4A3A2C)',
                        cursor: 'pointer',
                        letterSpacing: '0.02em',
                        fontFamily: 'inherit',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F2EEE5'}
                      onMouseLeave={e => e.currentTarget.style.background = '#FFF'}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: 14,
                  background: m.role === 'user' ? 'var(--ink, #1C1A17)' : '#FFF',
                  color: m.role === 'user' ? 'var(--bg, #F2EEE5)' : 'var(--ink, #1C1A17)',
                  fontSize: 14, lineHeight: 1.55,
                  border: m.role === 'assistant' ? '1px solid rgba(28,26,23,0.06)' : 'none',
                  whiteSpace: 'pre-wrap',
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 14px', borderRadius: 14,
                  background: '#FFF', border: '1px solid rgba(28,26,23,0.06)',
                  color: 'var(--ink-mute, #7A6A5A)', fontSize: 13,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <TypingDot /> <TypingDot delay={150} /> <TypingDot delay={300} />
                </div>
              </div>
            )}
          </div>

          <div style={{
            padding: '12px 14px',
            borderTop: '1px solid rgba(28,26,23,0.08)',
            display: 'flex', gap: 8, alignItems: 'flex-end',
            background: '#FFF',
          }}>
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={aiLocal.placeholder || ai.placeholder}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: 14,
                fontFamily: 'inherit',
                resize: 'none',
                padding: '9px 10px',
                color: 'var(--ink, #1C1A17)',
                background: 'transparent',
              }}
            />
            <button
              onClick={() => ask(input)}
              disabled={!input.trim() || loading}
              style={{
                width: 36, height: 36, border: 'none', borderRadius: '50%',
                background: input.trim() && !loading ? 'var(--ink, #1C1A17)' : 'rgba(28,26,23,0.15)',
                color: 'var(--bg, #F2EEE5)',
                cursor: input.trim() && !loading ? 'pointer' : 'default',
                display: 'grid', placeItems: 'center',
                fontSize: 16,
                transition: 'background 150ms',
              }}
            >↑</button>
          </div>
          <div className="samase-mono" style={{
            padding: '0 18px 12px', fontSize: 9, color: 'var(--ink-mute, #7A6A5A)',
            letterSpacing: '0.08em', textAlign: 'center',
          }}>
            {aiLocal.disclaimer || ai.disclaimer}
          </div>
        </>
      )}
    </div>
  );
}

function AssistantIcon() {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      background: 'var(--accent, #A94E2C)',
      display: 'grid', placeItems: 'center',
      color: '#FFF', fontSize: 14,
      fontFamily: "'Exo 2', 'Inter Tight', sans-serif",
    }}>S</div>
  );
}

function TypingDot({ delay = 0 }) {
  return (
    <span style={{
      display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
      background: 'var(--ink-mute, #7A6A5A)',
      animation: `samase-typing 1.2s ${delay}ms infinite`,
    }} />
  );
}

// Inject keyframes once
(function injectTypingKeyframes() {
  if (document.getElementById('samase-typing-kf')) return;
  const st = document.createElement('style');
  st.id = 'samase-typing-kf';
  st.textContent = `@keyframes samase-typing { 0%,80%,100% { opacity:0.3; transform:translateY(0); } 40% { opacity:1; transform:translateY(-3px); } }`;
  document.head.appendChild(st);
})();

// Build grounded system prompt from SAMASE content
function buildSystemPrompt(S, lang) {
  const brand = S.brand || {};
  const hero = S.hero || {};
  const audience = S.audience || {};
  const facilities = S.facilities || {};
  const founding = S.founding || {};
  const coach = S.coach || {};
  const faq = S.faq || {};
  const contact = S.contact || {};
  const physio = S.physio || {};

  const batches = (founding.batches || []).map(b =>
    `- ${b.label} (${b.gelombang}): harga Open Gym 3 bulan Rp ${b.priceOpenGym3M?.toLocaleString('id-ID')} (normal Rp ${b.priceOpenGym3MNormal?.toLocaleString('id-ID')}). Kuota ${b.slotsTaken}/${b.slotsTotal}. Status ${b.status}. Perks: ${(b.perks || []).join('; ')}`
  ).join('\n');

  const personas = (audience.personas || []).map(p =>
    `- ${p.title} (${p.age}): ${p.hook} ${p.body} Cocok: ${(p.fit || []).join(', ')}`
  ).join('\n');

  const facs = (facilities.items || []).map(f => `- ${f.title}: ${f.body}`).join('\n');
  const faqs = (faq.items || []).map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n');
  const coaches = (coach.team || []).map(c => `- ${c.name} (${c.role}, ${c.specialty}): ${c.bio}`).join('\n');

  const extraKnowledge = S.ai?.customKnowledge ? `\n\nADDITIONAL KNOWLEDGE:\n${S.ai.customKnowledge}` : '';

  const basePrompt = lang === 'en'
    ? `You are the SAMASE Sports Club AI assistant. Help prospective members learn about SAMASE and answer their questions.

STYLE:
- Warm, calm, confident. Speak like a friendly staff member, not a chatbot.
- Short sentences. No em-dash. No forced three-part parallel structures.
- If you do not know something for certain, say so and suggest contacting the team on WhatsApp (${contact.whatsappUrl || ''}).
- You may answer general fitness and health questions using common knowledge, but clearly distinguish between SAMASE specifics and general advice.
- Respond in English.`
    : `Kamu adalah asisten AI SAMASE Sports Club. Bantu calon member mengenal SAMASE dan jawab pertanyaan mereka.

GAYA:
- Hangat, tenang, percaya diri. Seperti staf ramah, bukan chatbot.
- Kalimat pendek. Jangan pakai em-dash. Jangan paksa pola paralel tiga bagian.
- Kalau tidak tahu pasti, bilang terus terang dan sarankan hubungi tim via WhatsApp (${contact.whatsappUrl || ''}).
- Boleh menjawab pertanyaan umum seputar fitness dan kesehatan dengan pengetahuan umum, tapi bedakan jelas antara info pasti SAMASE dan saran umum.
- Jawab dalam Bahasa Indonesia.`;

  return `${basePrompt}

CONTEXT — SAMASE Sports Club:
Brand: ${brand.name}. Pre-opening. Grand opening ${brand.opening} di ${brand.city}.
Tagline: "${hero.titleTop} ${hero.titleMid} ${hero.titleBot}"
Deskripsi: ${hero.lede}

FILOSOFI: ${(S.philosophy?.body || []).join(' ')}

FOUNDING MEMBER BATCHES:
${batches}

Disclaimer: ${founding.disclaimer}

PERSONAS / TARGET:
${personas}

FASILITAS:
${facs}

FISIOTERAPI (${physio.partner?.name}): ${physio.lede}
${(physio.steps || []).map(s => `- ${s.title} (${s.meta}): ${s.body}`).join('\n')}

TIM COACH:
${coaches}

FAQ:
${faqs}

KONTAK: WhatsApp ${contact.whatsapp}, Email ${contact.email}, Instagram ${contact.instagram}.${extraKnowledge}

Jawab pertanyaan user berikut dengan akurat berdasar konteks di atas. Kalau user tanya di luar konteks SAMASE (misal fitness umum), jawab secara umum tapi tetap arahkan kembali ke SAMASE bila relevan.`;
}

window.AIAssistant = AIAssistant;
