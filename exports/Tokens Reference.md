# SAMASE — Design Tokens Quick Reference

## Type scale
- Display: Fraunces 300/350/400/500 · `--font-display`
- Body: Inter Tight 400/500/600 · `--font-body`
- Mono: JetBrains Mono 400/500 · `--font-mono`
- Serif italic: Fraunces italic 300–500 · class `.samase-serif-italic`

## Type sizes (fluid)
- H1 hero: `clamp(48px, 8.2vw, 128px)` (Editorial) / `clamp(56px, 11vw, 172px)` (Cinematic)
- H2 section: `clamp(36px, 4.6vw, 68px)`
- H3 card: `22–26px`
- Body: `16–17px`
- Mono label: `10–11px`, letter-spacing `0.14em`, uppercase

## Spacing
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128` px

Standard section padding: **120px top/bottom** (80px on Hero-Focus layout).

## Border radii
- `--r-sm` 4 · inputs
- `--r-md` 8 · buttons (except pill CTAs)
- `--r-lg` 16
- `--r-xl` 24
- Pill: 999px for primary CTAs

## Color palettes (full)

### Warm
```
bg       #FAF7F1   ink       #1C1A17   accent      #6B5842
bg-elev  #F3EEE4   ink-soft  #433E36   accent-soft #A68D6F
bg-card  #FFFFFF   ink-mute  #776F63   gold        #B89467
line     #E3DCCB
line-soft #EDE7D9
```

### Deep
```
bg       #141414   ink       #F1ECE2   accent      #C2A57F
bg-elev  #1C1C1C   ink-soft  #C7BFB0   accent-soft #8E7757
bg-card  #1F1F1E   ink-mute  #8A8170   gold        #D4B585
line     #2E2D2A
line-soft #242321
```

### Stone
```
bg       #F3F3F1   ink       #17181A   accent      #3D4247
bg-elev  #E9E8E4   ink-soft  #3C3E41   accent-soft #6B7075
bg-card  #FFFFFF   ink-mute  #737679   gold        #8E8474
line     #D8D8D4
line-soft #E6E5E1
```

## Common patterns
- `samase-container` — max 1240px, 32px side padding (20px on mobile)
- `samase-mono` — uppercase tracking label (all caps)
- `samase-display` — serif display type
- `Reveal` — IntersectionObserver fade-in (12% threshold)
- `SectionKicker` — numbered kicker + horizontal rule

## Breakpoints
- `720px` — hero stacks
- `860px` — feature grids stack
- `960px` — batch cards stack
- `600px` — form cards compress

## Animations
- Section reveal: 900ms cubic-bezier(.2,.6,.2,1), 14px translateY
- Card hover: 280ms cubic-bezier(.2,.6,.2,1), 3px lift
- Progress bars: 1–1.2s ease-out width animation
- Pulse dot: 2.4s infinite

## Asset use
- No images yet. Coach portrait, hero, and facility imagery are **SVG placeholders**.
- Commission photography / illustration before production launch.
