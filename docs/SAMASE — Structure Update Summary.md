# SAMASE — Restructure Summary (selesai)

## Struktur Baru

```
index.html             → SAMASE Sports Club (Main Brand, editorial)
fitspace.html          → SAMASE Fitspace (sub-brand, existing content preserved)
physio.html            → SAMASE Physio by Bebascedera (NEW sub-brand)
padel.html             → SAMASE Private Padel (soft Coming Soon)
campaign.html          → Postural Assessment booking form (unified)
Pricing.html           → (tetap, full breakdown)
admin.html             → (tetap, CMS tool)

SAMASE Sports Club — Landing Page.html → redirect ke index.html (legacy)
```

## Yang Berubah dari Brief

### Tone of Voice — "jualan mobil mewah"
**Dihilangkan sepenuhnya dari landing pages:**
- Kata "diskon", "hemat", "promo", "gratis" (sekarang: "harga Founding", "termasuk dalam", "akses awal")
- Framing urgency panik (sekarang: kalimat deklaratif)
- Countdown timer / flashing "Limited!" badge (tidak ada)

**Yang dipertahankan:**
- "Kamu" (bukan "Anda") — tetap accessible
- Angka konkret (Rp 1.100K, 435 anggota, 15 Juni)
- Scarcity NARRATIVE, bukan tekanan

### Postural Assessment (bukan "Moti Screening")
Istilah "Moti" diganti semua jadi "Postural Assessment" — sesuai arahan kamu.

### Funnel 6-step tersembunyi di /campaign
Halaman `campaign.html` sekarang menampilkan 6-step Journey (First Touch → Postural Assessment → Qualification → Free Consultation → FM Offer → Community) sebagai **transparansi proses**, bukan sales pitch. Ini applies Goal-Gradient Effect + Commitment Consistency dari marketing-psychology.

## Pricing Physio (Final)

| Tier | Harga Founding | Tarif Klub | Positioning |
|------|---------------|------------|-------------|
| Essential | Rp 395.000 | Rp 725.000 | Entry |
| **Starter** ⭐ | **Rp 1.250.000** | Rp 1.875.000 | **Most Chosen** |
| Transformation | Rp 3.750.000 | Rp 5.900.000 | Deep Work |

Essential baru (adaptasi First Visit Promo + Konsultasi digabung). Starter jadi hero tier (highlighted card). Transformation pakai Konsultasi Founder Bebascedera dari list Pak Asep.

## Combo Pack (Preview, bukan direct checkout)

Ditampilkan di `/physio` (dan akan di `/fitspace` kalau mau lanjut):

- Fitspace Visionary (3 bulan) + Physio Starter (3 sesi)
- Total terpisah: Rp 2.350.000
- **Combo Founding: Rp 2.150.000** (hemat Rp 200K — sesuai pilihan kamu "hati-hati")

Copy menekankan: *"Kamu tidak membeli paket ini di sini. Jadwalkan Postural Assessment — paket Combo ditawarkan sebagai opsi kalau hasil assessment menunjukkan Fitspace dan Physio saling melengkapi."*

## Arsitektur File

### Shared components
- `src/content.js` v14 — single source of truth, semua copy di sini
- `src/umbrella-app.jsx` — `UmbrellaNav`, `UmbrellaFooter` (dipakai semua page)
- `src/layout-photo.jsx` — `PhotoSlot` (dipakai semua page)

### Per-page apps
- `src/umbrella-app.jsx` — main page (Hero, Philosophy, SubBrands, Scarcity, CTA)
- `src/physio-app.jsx` — physio page (Hero, Approach, Pricing, Combo, Partner, FAQ, CTA)
- `src/campaign-app.jsx` — campaign page (Hero, Form, Journey)

## Yang Belum Selesai (next iteration)

1. **Fitspace page nav + CTA wiring** — Halaman fitspace.html masih pakai `App.js` lama dengan layout Cinematic. Umbrella nav sudah ditambahkan di atas, tapi internal form di dalam fitspace masih ada (tidak konflik, tapi redundan dengan `/campaign`). Rekomendasi: di iterasi berikutnya, ganti internal form jadi link ke `campaign.html?src=fitspace`.

2. **Photo slots baru** — Beberapa slotKey baru yang butuh foto:
   - `hero.umbrella` (main page hero)
   - `umbrella.subbrand.fitspace`, `umbrella.subbrand.physio`, `umbrella.subbrand.padel`
   - `physio.sub.hero`, `padel.hero`, `campaign.hero`
   
   Bisa di-load lewat admin demo-photos atau upload manual.

3. **Admin panel** — Sekarang belum ada tab untuk mengelola `physioPricing` dan `combo` di admin. Tetap bisa diedit manual di `src/content.js`, tapi CMS UI perlu di-update kalau stakeholder non-teknis mau edit.

4. **Form submission backend** — Form di `/campaign` saat ini hanya `console.log` submission. Perlu di-wire ke endpoint real (Google Sheet, webhook, atau CRM).

5. **Multi-campaign per sub-brand** — Sesuai brief kamu, ini next phase setelah pre-launch. Struktur sudah siap — tinggal duplicate `campaign.html` jadi `campaign-fitspace.html`, `campaign-physio.html` dengan form field yang disesuaikan.

## Testing Manual Checklist

- [ ] `index.html` membuka tanpa error, hero headline, 3 card sub-brand, scarcity section, CTA ke campaign
- [ ] Klik "Fitspace" di nav → `fitspace.html` membuka dengan nav umbrella di atas + content lama
- [ ] Klik "Physio" di nav → `physio.html` membuka dengan 3 tier pricing + combo preview
- [ ] Klik "Padel" di nav → `padel.html` soft coming-soon
- [ ] Klik "Postural Assessment" → `campaign.html` dengan form
- [ ] Isi form, klik submit → success screen muncul
- [ ] Query param: buka `campaign.html?src=fitspace` → interest field pre-filled "Fitspace — latihan rutin"
- [ ] `campaign.html?src=physio` → pre-filled "Physio — pemulihan atau pencegahan"
- [ ] `campaign.html?src=bundle` → pre-filled "Keduanya"
