# SAMASE Sports Club — Landing Page v2
## Developer Hand-off Package

**Version:** 2.0 · April 2026
**Domain target:** samasesportsclub.com (atau TBD)
**Partner:** [Bebascedera](https://bebascedera.com/) — fisioterapi tersertifikasi
**Status:** Pre-launch, membuka Founding Member membership sekarang. Grand opening Juli 2026 di Bintaro, Jakarta.

---

## 1. File Structure

```
/
├── SAMASE Sports Club — Landing Page.html   ← main landing page
├── Pricing.html                              ← full pricing page
├── index.html                                ← redirect shortcut → landing page
└── src/
    ├── content.js       ← canonical copy (hero, philosophy, audience, faq, etc.)
    ├── tokens.css       ← design tokens (type, spacing, radius, colors)
    ├── warm.css         ← Warm palette (cream/bone editorial)
    ├── deep.css         ← Deep palette (dark editorial)
    ├── stone.css        ← Stone palette (cool gray modernist)
    ├── SamaseMark.js    ← logo component
    ├── sections.js      ← Navbar, Hero (editorial), Philosophy, Audience
    ├── sections2.js     ← Facilities, Physio, Founding (batches + scarcity)
    ├── sections3.js     ← Coach, FAQ, Form, Footer
    ├── layouts.js       ← 4 layout variants (Editorial/Zen/Architectural/Hero-Focus)
    ├── Pricing.js       ← pricing page data + components (all tiers, packages)
    ├── TweaksPanel.js   ← CMS/tweaks UI (visual, batches, scarcity, copy)
    └── App.js           ← root component + tweaks state
```

---

## 2. Tech Stack

- **No build step.** Pure HTML + React 18 via CDN (pinned with SRI hashes) + in-browser Babel.
- **Fonts:** Google Fonts (Fraunces · Inter Tight · JetBrains Mono).
- **Storage:** localStorage (`samase_tweaks_v2`) for CMS state persistence.
- **Postmessage protocol:** `__edit_mode_set_keys` for CMS → host file sync.

To go production:
1. Precompile Babel scripts → use Vite/Next or a simple Babel CLI step.
2. Replace `unpkg.com` CDN references with bundled React.
3. Inline critical CSS for faster FCP.
4. Replace in-memory Tweaks panel with a real CMS backend (Sanity/Strapi/Supabase).

---

## 3. Design System

### Colors (Warm palette — default)
| Token         | Value     | Use                                 |
|---------------|-----------|--------------------------------------|
| `--bg`        | `#FAF7F1` | Page background                     |
| `--bg-elev`   | `#F3EEE4` | Elevated surface (alternating bg)   |
| `--bg-card`   | `#FFFFFF` | Card background                     |
| `--ink`       | `#1C1A17` | Primary text + dark sections        |
| `--ink-soft`  | `#433E36` | Body text                           |
| `--ink-mute`  | `#776F63` | Metadata, muted labels              |
| `--line`      | `#E3DCCB` | Dividers, borders                   |
| `--line-soft` | `#EDE7D9` | Subtle lines                        |
| `--accent`    | `#6B5842` | Hover states, muted accents         |
| `--gold`      | `#B89467` | **Brand accent** — CTAs, progress    |

Other palettes: `--variant-deep` (dark) and `--variant-stone` (cool gray). See `deep.css`, `stone.css`.

### Typography
- `--font-display`: **Fraunces** (serif) — 300–600 weight. Used for H1–H3, editorial.
- `--font-body`: **Inter Tight** — 400–600. Used for body copy, buttons.
- `--font-mono`: **JetBrains Mono** — 400–500. Used for eyebrow labels, metadata.
- Italic: `.samase-serif-italic` — Fraunces italic for pull quotes.

### Spacing scale (`--s-*`)
`4, 8, 12, 16, 24, 32, 48, 64, 96, 128` px.

---

## 4. Founding Member Batch System

Three waves — each with its own quota, pricing, and benefit stack. Quota + status configurable via Tweaks CMS panel.

| Batch       | Gelombang       | Open Gym 3mo  | Benefits stack                          |
|-------------|-----------------|---------------|------------------------------------------|
| **Visionary** | 01 · Earliest | Rp 1.100.000  | Deepest discount (30%+), +2 bonus PT sessions, full welcome kit, all free trials |
| **Pioneer**   | 02 · Early    | Rp 1.300.000  | ~18% discount, +1 bonus session, lite welcome kit |
| **Founder**   | 03 · Final    | Rp 1.450.000  | ~9% discount, tote only, no bonus sessions |

Normal (non-FM) Open Gym 3mo price: Rp 1.590.000.

### Scarcity modes (`S.founding.scarcityMode`)
- `hard` — show exact `58/80` slot counter + progress bar
- `soft` — no numbers; countdown timer + "by application only"
- `hybrid` — show "58+ early applicants" + countdown, no ceiling

Switchable in the Tweaks CMS panel (Batches & Scarcity tab).

### Bonus sessions — marketing angle
Visionary gets extra free sessions attached to paid PT / Group Class packages. Pioneer gets half. Founder gets none. This drives Visionary urgency naturally — every extra day of hesitation = lost bonus sessions.

---

## 5. Pricing Page (`Pricing.html`)

Six categories, from Meeting Guide source-of-truth:
1. **Open Gym Membership** (Women & Men FitSpace) — 3mo / 6mo / 12mo
2. **Private Training 1-on-1** — 4 / 8 / 12 / 24 sessions
3. **Private Duo 2-on-1** (Women) — 4 / 8 / 12 / 24 sessions
4. **Group Class** (Women, 3–10 people) — single / 8 / 12 / 24 classes
5. **Private Class · Group Booking** — Core / Performance / Elite Circle
6. **Golden FitSpace · PT Private** — 50+ only, 4 / 8 / 12 / 24 sessions

All figures sourced from "Meeting Guide — SAMASE × Isnul · April 2026" document. Single source of truth: `src/Pricing.js`.

---

## 6. CMS / Tweaks Panel

Activated via host toolbar toggle (postMessage `__activate_edit_mode`). Three tabs:

### Visual tab
- Layout: `editorial` · `zen` · `architectural` · `hero`
- Palette: `warm` · `deep` · `stone`

### Batches & Scarcity tab
- Scarcity mode: `hard` · `soft` · `hybrid`
- Per-batch editable: slots taken, slots total, status (active / upcoming / closed)
- Closing date picker

### Copy tab
- Hero title 3 lines + lede
- Brand opening month + city

All changes auto-persist via `__edit_mode_set_keys` postMessage to host, which rewrites the `TWEAK_DEFAULTS` block in `src/App.js`.

---

## 7. Form & Lead Magnets

Form fields: name, WhatsApp (required), age, persona, goal, batch choice.

**Lead magnet stack by selected batch:**
- Visionary: Postural Screening (15–20m) · Free trial 2 sesi · 30m consult · +2 bonus PT sessions · full welcome kit · lock-in harga
- Pioneer: Postural Screening · 1 free trial · 20m consult · +1 bonus session · tote + botol
- Founder: Postural Screening · 15m consult · tote only

The "Founding Gathering" and "WhatsApp community" are universal across batches.

Form submit currently calls a stub (local state only). Wire to:
- Backend API (create CRM lead)
- WhatsApp notification to sales team
- Email autoresponder with batch-specific benefit confirmation

---

## 8. Accessibility & Performance

- Semantic HTML: `<section>`, `<nav>`, `<footer>`, `<form>`.
- Focus styles preserved on interactive elements.
- `prefers-reduced-motion` not yet handled — add to `Reveal` component for production.
- Color contrast meets WCAG AA for all palettes.
- Image-less page — fast even on 3G. Any future imagery should be `<picture>` with AVIF/WebP sources.

---

## 9. SEO Checklist (pre-launch)

- [ ] Fill in meta description + OG image (`og:image`) in each HTML
- [ ] Add `<link rel="canonical">` once domain is chosen
- [ ] Submit to Google Search Console
- [ ] Structured data: `Organization`, `LocalBusiness`, `Service`
- [ ] Prepare Pricing page sitemap entry
- [ ] Add GA4 / GTM

---

## 10. Known Gaps / TODO

1. **No real imagery yet.** Hero, facilities, and coach all use SVG placeholders. Brief a shoot.
2. **Form backend not wired.** Currently a stub. Recommend Formspree or a simple Vercel function.
3. **Pricing page mobile** — tested at breakpoint 600px but not pixel-perfect audited.
4. **Scarcity `soft` mode** hides batch numbers entirely but still shows batch card prices — consider deeper copy review if using this mode in production.
5. **No auth/admin** for CMS — the Tweaks panel is a design-preview CMS. Production CMS needed.

---

## Contact

For design questions / component variations, see:
- `src/layouts.js` — extend by adding a new `Layout*` component + case in `LayoutRenderer`
- `src/Pricing.js` — edit `PRICING.categories[]` to add/modify packages
- `src/content.js` — all landing-page copy in one place

**Typo history:** "Bebasecidera.id" → fixed to **"Bebascedera"** with canonical URL `https://bebascedera.com/` throughout.
