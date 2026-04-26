# SAMASE Admin — Visual + Photo Manager Update

## Yang Baru

### 1. Tab Visual (rebuilt)

**Sebelum:** Hanya fitspace yang bisa switch layout.
**Sekarang:** Satu halaman Visual yang berisi:

- **Color Palette (global)** — 3 skin (Warm / Deep / Stone). Satu pilihan berlaku untuk SEMUA page.
- **Layout per Halaman** — 4 section layout picker:
  - **Main Brand**: Editorial · Cinematic
  - **Fitspace**: Cinematic · Editorial
  - **Physio**: Grid Pricing · Stacked Pricing
  - **Campaign**: Split · Centered
- **Legacy: ui.layout** (collapsible) — key lama untuk backward compat (6 opsi layout fitspace lama)

Setiap layout punya deskripsi + reset button kalau ada override.

### 2. Tab Photo Manager (baru)

Di grup **Media** di sidebar. Fitur:

- **Summary bar** — tampilkan X dari N slot terisi, plus 2 tombol global:
  - "Muat semua demo" — seed semua slot dengan Unsplash
  - "Bersihkan demo" — hapus hanya yang masih demo (upload asli aman)

- **5 group card** per page:
  - **Main Brand** (4 slot): Hero Background + 3 sub-brand cards
  - **Fitspace** (16 slot): Hero Cinematic, 6 Facilities, 4 Founding, Physio split, 4 Coach portraits
  - **Physio** (1 slot): Physio Hero
  - **Campaign** (1 slot): Campaign Hero
  - **Padel** (1 slot): Padel Teaser

- **Per slot** — card besar dengan:
  - Preview area (drag & drop atau klik untuk upload)
  - Status badge: **Upload** (hijau) · **Demo** (terracotta) · **Empty** (abu)
  - 3 tombol: "Upload/Ganti" · "✦ Demo" (kalau tersedia) · "✕" (hapus)

## Layout Variants — Penjelasan

### Main Brand
- **Editorial** (default): Hero split (80% height), philosophy di posisi 2, sub-brand di posisi 3. Tenang, brand-first, Aesop-like.
- **Cinematic**: Hero full-viewport center-aligned dengan photo dramatis, sub-brand langsung muncul setelah hero. Lebih impact.

### Fitspace
- **Cinematic** (default): Photo-rich hero, facilities zero-gap tiles, founding section dark. Rhythm visual kuat.
- **Editorial**: Magazine-style, less photo. Lebih tenang untuk user yang baca lama.

### Physio
- **Grid Pricing** (default): 3 tier berdampingan horizontal. Gampang bandingkan side-by-side.
- **Stacked Pricing**: 3 tier vertikal, masing-masing row besar. Fokus ke detail per tier, Starter jadi pusat perhatian.

### Campaign
- **Split** (default): Context di kiri (75% info), form di kanan (bigger). Paling informatif.
- **Centered**: Form di tengah, context di atas. Fokus single-action, less scrolling.

## Cara Pakai

1. **Switch palette global**: Admin → Visual → Color Palette → klik salah satu swatch. Semua page langsung pakai palette baru.

2. **Switch layout per page**: Admin → Visual → scroll ke "Layout per Halaman" → klik kartu layout yang diinginkan. Preview di kanan auto-update.

3. **Upload foto**:
   - Admin → Photo Manager (grup Media)
   - Cari slot yang mau di-upload
   - Drag & drop file gambar, atau klik preview area
   - Max 6 MB, format image (.jpg, .png, .webp)

4. **Pakai demo Unsplash sementara**:
   - Klik tombol "✦ Demo" di slot manapun yang support demo
   - Atau klik "Muat semua demo" di summary bar

5. **Bersihkan demo sebelum launch**:
   - Klik "Bersihkan demo" — hanya hapus yang masih URL demo, upload asli AMAN.

## Technical Notes

### Keys di content.js
```js
ui: {
  variant: 'warm',  // global palette
  layout: 'cinematic',  // legacy fitspace — kept for backward compat
  layouts: {
    main: 'editorial',       // 'editorial' | 'cinematic'
    fitspace: 'cinematic',   // 'cinematic' | 'editorial' (uses old layout system)
    physio: 'grid',          // 'grid' | 'stack'
    campaign: 'split',       // 'split' | 'centered'
  },
}
```

### File yang ditambah
- `src/admin-tab-photos.jsx` — Photo Manager tab
- `UmbrellaHeroCinematic` in umbrella-app.jsx — cinematic hero variant
- `PhysioTierRow` in physio-app.jsx — stacked pricing variant

### File yang dimodifikasi
- `src/admin-tabs.jsx` — TabVisual rewritten
- `src/admin-app.jsx` — tab registry + render switch
- `src/umbrella-app.jsx` — layout switcher + cinematic variant
- `src/physio-app.jsx` — layout prop + stack variant
- `src/campaign-app.jsx` — layout prop + centered variant
- `src/App.js` — prefer `ui.layouts.fitspace` over legacy `ui.layout`
- `src/content.js` — `ui.layouts` object added

## Known Caveats

1. **Layout switch butuh reload iframe preview** — admin auto-handles ini via BroadcastChannel, tapi kalau preview nggak langsung update, refresh manual.

2. **Palette "deep" dan "stone"** belum sepenuhnya di-test di semua 4 layout. Warm = paling matang. Kalau ada visual bug di palette lain, kasih tahu.

3. **Layout "editorial" untuk Fitspace** pakai sistem layout lama (yang masih punya 6 opsi di Legacy dropdown). Switch ke "Cinematic" dari per-page picker akan sync ke `ui.layout` juga via App.js.

4. **Drag & drop di Photo Manager** hanya terima satu file per drop. Multi-upload next iteration.
