# SAMASE — Brand Assets

## Logo pack

The official SAMASE Sports Club logopack was provided April 2026
(`01.LOGOPACK-20260422T185451Z-3-001.zip`).

It contains wordmark and monogram variants in multiple colors:
- **Wordmark**: "SAMASE SPORTS CLUB" (stacked) — in black, terracotta, brown, sand, and white
- **Monogram**: stylized "S²" ligature (butterfly silhouette) — in matching colors

### Swap in the real logo — 3 options

**Option A (Recommended) — Upload via Admin Panel:**
1. Open the site → click the **Kelola** pill bottom-right → passcode `samase2026`
2. Go to the **Brand** tab
3. Click **Upload SVG** for Monogram and/or Wordmark
4. Select the SVG file from your logopack → done! Saved in browser localStorage.

**Option B — Replace the inline SVG in source:**

Edit `src/SamaseMark.js` and replace the `DEFAULT_MONOGRAM_SVG` and
`DEFAULT_WORDMARK_SVG` string constants (top of file) with the real SVG source
(keep `fill="currentColor"` so palette colors still work).

**Option C — Point to file paths:**

Edit `brand/monogram.svg` and `brand/wordmark.svg` with the real SVG content,
then in `src/App.js` (inside App component, near top):
```js
React.useEffect(() => {
  window.SAMASE_LOGO = {
    monogram: 'brand/monogram.svg',
    wordmark: 'brand/wordmark.svg',
  };
  window.dispatchEvent(new Event('samase:logo-update'));
}, []);
```

## Color palette — Warm (matches samasesportsclub.com)

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F2EEE5` | Page cream background |
| `--ink` | `#2A1F17` | Headlines |
| `--accent` | `#A94E2C` | Brand terracotta (signature) |
| `--gold` | `#C68B5E` | Warm tan accent |
| `--founding-bg` | `#A94E2C` | Founding section terracotta |

## Admin Panel

The landing page has a built-in CMS/Admin Panel ("Kelola Landing Page"):

- **Trigger**: bottom-right floating pill labeled "Kelola"
- **Shortcut**: `Ctrl/Cmd + Shift + K`
- **Default passcode**: `samase2026`
- **Change passcode**: edit `ADMIN_PASSCODE` in `src/TweaksPanel.js` (line 6)

Admin tabs:
- **Visual** — layout (Editorial / Zen / Architectural / Hero) & palette (Warm / Deep / Stone)
- **Batches** — scarcity mode + live quota tracking per batch (Visionary / Pioneer / Founder)
- **Copy** — hero title, lede, opening date, city
- **Fasilitas** — overview of facility photo slots
- **Coach** — overview of coach team profiles

All changes persist to `localStorage` (per-browser) and via `postMessage` to the
host file during in-editor use.

## Facility photos

Each facility has 3 photo placeholders in `src/content.js`:
```js
{
  title: 'Group Class Studio',
  photos: [
    { label: 'Studio overview', caption: 'Studio lantai kayu…' },
    { label: 'Morning class',   caption: 'Jadwal pagi…' },
    { label: 'Mobility corner', caption: 'Area stretch…' },
  ],
}
```

To use real photos, add a `src` key:
```js
photos: [
  { src: 'brand/facilities/group-class-01.jpg', label: 'Studio overview', caption: '…' },
  ...
]
```

Then update `FacilityPhotoPlaceholder` in `src/sections2.js` to render the
image when `src` is present (placeholder renders otherwise).

## Coach photos

Each coach in `src/content.js` → `coach.team[]` has a `photo` key (currently `null`).
Set it to an image URL to replace the silhouette placeholder:
```js
{
  name: 'Coach Raihan',
  photo: 'brand/coaches/raihan.jpg',  // ← set this
  // ...
}
```
