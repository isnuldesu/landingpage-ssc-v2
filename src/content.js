// SAMASE — canonical content (v4)
// Copy rewritten with Seven Sweeps framework + marketing psychology:
//   - Zero-risk framing near CTA ("tanpa komitmen beli")
//   - Specific numbers + timeframes (no more vague "1 hari")
//   - Customer language ("nggak bikin minder", "pamer", "sungkan")
//   - Heightened emotion (paint before state of judgmental gyms)
//   - Objection handling in FAQ (10 items, covers top regret triggers)
// Tone: natural Indonesian, conversational "kamu", marketing-aware.
// Partner: Bebascedera

const SAMASE = {
  // ── UI preferences ──
  ui: {
    variant: 'warm',         // Global palette: 'warm' | 'deep' | 'stone'
    layout: 'cinematic',     // Legacy for fitspace — kept for backward compat
    language: 'id',          // 'id' | 'en'
    facilityLayout: 'card',  // 'card' | 'fullphoto'
    // ── Layout per page (new) ──
    layouts: {
      main: 'editorial',       // 'editorial' | 'cinematic' — main umbrella page
      fitspace: 'cinematic',   // 'cinematic' | 'editorial' — fitspace sub-brand
      physio: 'grid',          // 'grid' | 'stack' — physio pricing layout
      campaign: 'split',       // 'split' | 'centered' — campaign form layout
    },
  },

  // ── Brand ──
  brand: {
    name: 'SAMASE Sports Club',
    tag: 'Pre-opening 2026',
    opening: 'Juli 2026',
    city: 'Jakarta, Bintaro',
    slotsTaken: 182,
    slotsTotal: 435,  // Founding Member total cap (from funnel)
    openingDate: '2026-07-01T00:00:00+07:00',
    closingDate: '2026-06-15T23:59:00+07:00',
    // Main brand tagline for umbrella page
    positioning: 'Klub olahraga yang dibangun seperti ruang pribadi — tenang, presisi, dan dijaga.',
    oneLiner: 'Tiga layanan, satu standar: Fitspace untuk latihan, Physio untuk pemulihan, Private Padel untuk bermain.',
  },

  // ── AI Assistant (hero search) ──
  ai: {
    enabled: true,
    kicker: 'Tanya sebelum menjadwalkan',
    placeholder: 'Tanyakan tentang layanan, ritme klub, atau proses Founding.',
    greeting: 'Halo. Kamu bisa menanyakan apa saja tentang SAMASE — filosofi klub, tiga layanan, proses keanggotaan, atau ritme harian. Untuk hal yang butuh jawaban manusia, tim kami akan melanjutkan percakapan.',
    suggestions: [
      'Apa perbedaan Fitspace dan Physio?',
      'Apa yang terjadi setelah saya menjadwalkan Postural Assessment?',
      'Ada jadwal khusus muslimah di Fitspace?',
      'Apakah Physio bisa diambil terpisah dari keanggotaan Fitspace?',
    ],
    disclaimer: 'Dijawab asisten AI. Keputusan final selalu disampaikan oleh tim SAMASE.',
    customKnowledge: '',
  },

  // ── Hero ──
  hero: {
    kicker: 'SAMASE Sports Club · Bintaro · Juli 2026',
    titleTop: 'Ruang pribadi',
    titleMid: 'untuk yang',
    titleBot: 'berlatih dengan niat.',
    lede: 'Klub olahraga di Bintaro dengan tiga layanan yang saling menopang: Fitspace untuk latihan, Physio untuk pemulihan, dan Private Padel untuk bermain. Dibangun seperti ruang pribadi — tenang, presisi, dan dijaga.',
    meta1Label: 'Juli',
    meta1Value: '2026 Grand Opening',
    meta2Label: 'Bintaro',
    meta2Value: 'Lokasi diumumkan saat pembukaan',
    footer: 'Pintu ini dibuka untuk 435 Founding Member. Setelah itu, kembali ke ritme biasa.',
    // Media background — set via admin upload. Key lives in MediaStore.
    media: {
      type: 'none',   // 'none' | 'image' | 'video'
      url: null,      // dataUrl (resolved from MediaStore)
      key: null,      // MediaStore key
      poster: null,   // video poster (optional)
      overlay: 0.3,   // 0..1 scrim opacity
    },
  },

  // ── A/B Variants ──
  ab: {
    enabled: false,
    heroVariant: 'A',
    variants: {
      A: {
        titleTop: 'Olahraga rutin',
        titleMid: 'tanpa harus tampil,',
        titleBot: 'tanpa harus ribut.',
        lede: 'Klub olahraga privat di Bintaro untuk yang ingin konsisten, bukan untuk pamer. Coach bersertifikat, fisioterapi di tempat, dan jadwal khusus muslimah. Dibuka Juli 2026.',
      },
      B: {
        titleTop: 'Gym yang nggak',
        titleMid: 'bikin kamu',
        titleBot: 'merasa dinilai.',
        lede: 'Dirancang untuk yang ingin mulai olahraga tanpa sungkan. Privat, terkurasi, dan didampingi coach yang paham mulai dari nol. Dibuka Juli 2026 di Bintaro.',
      },
    },
  },

  // ── Philosophy ──
  philosophy: {
    number: '01',
    kicker: 'Filosofi',
    title: 'Konsistensi datang dari tempat yang tenang.',
    quote: 'Quiet Structure — kekuatan yang bertahan dibangun dalam diam.',
    body: [
      'Gym yang baik bukan yang paling ramai. Musik keras, cermin di mana-mana, dan budaya pamer justru bikin banyak orang berhenti setelah bulan kedua.',
      'SAMASE dirancang sebaliknya. Ruang yang bersih, coach yang mendengar, dan jadwal yang menghormati ritme kamu. Karena yang bikin kamu kuat bukan intensitas satu sesi, tapi seberapa sering kamu mau kembali.',
    ],
    pillars: [
      { n: '01', title: 'Modern', body: 'Alat dan metode yang terbaru. Dipakai seperlunya, bukan buat pamer spek.' },
      { n: '02', title: 'Sophisticated', body: 'Layout rapi, layanan presisi, detail yang dipikirkan — bahkan di hal yang tidak terlihat.' },
      { n: '03', title: 'Privacy-first', body: 'Private corner, no-photo zone, dan kode etik yang tenang. Kamu fokus latihan, bukan khawatir dilihat.' },
    ],
  },

  // ── Audience ──
  audience: {
    number: '02',
    kicker: 'Untuk Siapa',
    title: 'Bukan untuk semua orang. Justru di situ letak kenyamanannya.',
    lede: 'Kami memilih fokus di lima persona utama. Setiap kelompok punya ruang, jadwal, dan coach yang benar-benar mengerti konteksnya — bukan program template yang dipaksa cocok untuk semua.',
    personas: [
      {
        n: '01',
        title: 'Lansia Aktif',
        age: '55+ · Golden Member',
        priority: 'Prioritas · Tinggi',
        hook: 'Sehat di usia 60+, ibadah tetap khusyuk.',
        body: 'Program disesuaikan dengan kondisi sendi, tekanan darah, dan riwayat kesehatan. Coach khusus 50+ yang tenang, dengan fisioterapi preventif bareng Bebascedera — jadi kamu aktif tanpa khawatir cedera.',
        fit: ['Golden FitSpace PT', 'Fisioterapi Bebascedera', 'Group Class ringan'],
      },
      {
        n: '02',
        title: 'Akhwat / Muslimah',
        age: '28–50 · Area khusus perempuan',
        priority: 'Prioritas · Tinggi',
        hook: 'Olahraga nyaman tanpa harus sungkan.',
        body: 'Area dan jadwal khusus muslimah, dengan coach perempuan. Cocok untuk pemulihan postpartum, mengembalikan energi setelah lama berhenti, atau memulai rutinitas sehat tanpa merasa diawasi.',
        fit: ['Women PT / Duo PT', 'Women-only Group Class', 'Open Gym Women Session'],
      },
      {
        n: '03',
        title: 'Bapak / Laki-laki Dewasa',
        age: '30+ · Profesional urban',
        priority: 'Prioritas · Tinggi',
        hook: 'Punggung tidak lagi pegal setelah rapat seharian.',
        body: 'Untuk yang duduk 8 jam sehari dan merasa stamina makin turun. Program realistis yang bisa dijalani 2–3 kali seminggu — fokus ke postur, kekuatan fungsional, dan energi harian. Bukan transformasi 30 hari yang nggak realistis.',
        fit: ['Men PT', 'Open Gym', 'Group Class', 'Padel'],
      },
      {
        n: '04',
        title: 'Young Adult',
        age: '20–30 · Baru mulai',
        priority: 'Pintu masuk · Awareness',
        hook: 'Gym pertama yang nggak bikin minder.',
        body: 'Untuk yang ingin serius tapi capek dengan vibe gym yang judgmental. Free posture assessment di awal, komunitas yang supportive, dan coach yang terbiasa mulai dari nol. Kamu nggak harus sudah fit untuk mulai.',
        fit: ['Open Gym', 'Group Class', 'Padel'],
      },
      {
        n: '05',
        title: 'Kids & Teens',
        age: '8–19 · Melalui orang tua',
        priority: 'Sekunder · Menengah',
        hook: 'Alternatif sehat buat yang terlalu lama di depan layar.',
        body: 'Program anak fokus pada postur, keseimbangan, dan kepercayaan diri — bukan beban berat. Dibimbing coach bersertifikat yang paham tumbuh kembang, dalam kelompok kecil supaya setiap anak mendapat perhatian.',
        fit: ['Program Anak', 'Group Class Teens', 'Fisioterapi tumbuh kembang'],
      },
    ],
  },

  // ── Facilities ──
  facilities: {
    number: '03',
    kicker: 'Fasilitas',
    title: 'Enam ruang, satu ritme yang sama: tenang.',
    lede: 'Setiap ruang dirancang untuk satu tujuan spesifik. Tidak ada fasilitas yang cuma jadi pajangan — semuanya kepake, rapi, dan bersih.',
    items: [
      {
        n: '01', title: 'Group Class Studio',
        body: 'Kapasitas 3–10 orang, bukan 30. Coach bisa mengoreksi form satu per satu, dan kamu dapat perhatian yang sama dengan sesi privat — dengan harga yang lebih bersahabat.',
        heroImage: null,
        photos: [
          { label: 'Studio overview', caption: 'Studio lantai kayu, kapasitas 3 sampai 10 orang', key: null },
          { label: 'Morning class', caption: 'Jadwal pagi untuk muslimah', key: null },
          { label: 'Mobility corner', caption: 'Area stretch dan warm-up', key: null },
        ],
      },
      {
        n: '02', title: 'Private Training',
        body: 'Sesi 1-on-1 atau 2-on-1 dengan coach yang membaca hasil postural screening kamu dulu. Program disusun dari kondisi tubuhmu, bukan template generik.',
        heroImage: null,
        photos: [
          { label: 'PT session', caption: 'Sesi 1-on-1 di private corner', key: null },
          { label: 'Duo training', caption: 'Duo session 2-on-1', key: null },
          { label: 'Equipment', caption: 'Functional dan free-weight area', key: null },
        ],
      },
      {
        n: '03', title: 'Fisioterapi Bebascedera',
        body: 'Klinik fisioterapi di dalam klub, bukan di seberang jalan. Tim Bebascedera tersertifikat membantu kamu sembuh dari cedera lama dan mencegah yang baru — sebelum jadi kronis.',
        heroImage: null,
        photos: [
          { label: 'Screening room', caption: 'Postural screening dan assessment', key: null },
          { label: 'Treatment area', caption: 'Area fisioterapi privat', key: null },
          { label: 'Recovery tools', caption: 'Soft release dan mobility tools', key: null },
        ],
      },
      {
        n: '04', title: 'Open Gym Women & Men',
        body: 'Functional zone, free-weight area, recovery corner, dan loker. Ada jam dan area khusus muslimah — bukan cuma slogan, tapi benar-benar terpisah secara fisik.',
        heroImage: null,
        photos: [
          { label: 'Women FitSpace', caption: 'Area eksklusif untuk muslimah', key: null },
          { label: 'Men FitSpace', caption: 'Area functional dan strength', key: null },
          { label: 'Recovery lounge', caption: 'Sauna, stretching, quiet zone', key: null },
        ],
      },
      {
        n: '05', title: 'Golden FitSpace',
        body: 'Area khusus 50+ dengan lantai anti-slip, pegangan pengaman, dan kursi recovery. Coach yang terlatih untuk mobility, balance, dan stabilitas — bukan sekadar gym biasa yang diperlambat.',
        heroImage: null,
        photos: [
          { label: 'Senior studio', caption: 'Tempo lembut, lantai anti-slip', key: null },
          { label: 'Balance training', caption: 'Program stability 50+', key: null },
          { label: 'Community', caption: 'Social hour setelah kelas', key: null },
        ],
      },
      {
        n: '06', title: 'Padel Court',
        body: 'Lapangan padel di dalam komplek klub. Mudah diakses setelah sesi gym, atau jadi alasan tambahan untuk ajak teman jadi member. Weekend social match setiap Sabtu.',
        heroImage: null,
        photos: [
          { label: 'Court overview', caption: 'Lapangan premium outdoor', key: null },
          { label: 'Social play', caption: 'Weekend community match', key: null },
          { label: 'Club house', caption: 'Lounge dan refreshment', key: null },
        ],
      },
    ],
  },

  // ── Physio ──
  physio: {
    number: '04',
    kicker: 'Fisioterapi × Bebascedera',
    title: 'Latihan dimulai setelah postur kamu kami baca.',
    lede: 'Kebanyakan orang mulai olahraga dari target — turun 5 kg, naik 2 kg otot. Kami mulai dari yang sudah ada di tubuhmu. Karena program yang dipaksa ke postur yang salah justru mempercepat cedera.',
    steps: [
      { n: '01', title: 'Postural Screening', meta: '15–20 menit · Gratis', body: 'Pemetaan postur cepat oleh fisioterapis Bebascedera. Kami lihat pola gerak, titik keluhan, dan riwayatmu — jadi kami paham kamu dulu, sebelum kasih rekomendasi apa pun.' },
      { n: '02', title: 'Assessment & Persona', meta: '30 menit konsultasi', body: 'Hasil screening jadi peta: persona latihan yang realistis sesuai umur, jadwal, kondisi, dan tujuan. Bukan program yang paling agresif — yang paling bisa kamu jalani konsisten.' },
      { n: '03', title: 'Program Suitability', meta: 'Rekomendasi final', body: 'Kami sarankan program yang paling cocok: Group Class, Private Training, atau Golden FitSpace. Kalau belum siap latihan, kami juga terbuka bilang begitu — lebih baik mundur sebentar daripada cedera.' },
    ],
    partner: {
      label: 'Bersama',
      name: 'Bebascedera',
      url: 'https://bebascedera.com/',
      body: 'Tim fisioterapis tersertifikat yang sudah menangani ribuan klien di Jakarta. Fokus pada pencegahan cedera, bukan sekadar menyembuhkan setelah sakit.',
    },
  },

  // ── Founding Member ──
  // Narrative framing, bukan discount framing.
  // Tone: declarative, calm, price-as-fact. Scarcity muncul dari jumlah tetap, bukan urgency timer.
  founding: {
    number: '05',
    kicker: 'Founding Member',
    title: 'Pintu ini dibuka sekali, lalu ditutup.',
    lede: 'SAMASE menerima 435 Founding Member. Di antaranya tiga gelombang, dengan akses dan ritme yang berbeda. Kamu tidak memilih gelombang — posisi kamu ditentukan oleh kapan kamu masuk. Setelah angka ini penuh, pintu tidak dibuka lagi.',
    scarcityMode: 'narrative',  // narrative | hard | soft | hybrid
    batches: [
      {
        id: 'visionary',
        label: 'Visionary',
        gelombang: 'Gelombang 01',
        tagline: 'Akses paling awal. Ritme yang paling kamu bentuk sendiri.',
        slotsTaken: 58,
        slotsTotal: 80,
        priceOpenGym3M: 1100000,
        priceOpenGym3MNormal: 1590000,
        status: 'active',
        badge: 'Sedang terbuka',
        perks: [
          'Harga Founding untuk seluruh paket (Open Gym, PT, Group Class)',
          'Postural Assessment oleh tim Bebascedera',
          'Dua sesi Group Class atau Open Gym sebagai bagian dari onboarding',
          'Konsultasi 30 menit dengan coach senior',
          'Dua sesi PT tambahan pada paket Body Rebuild ke atas',
          'SAMASE Welcome Kit (tote, botol, handuk, merch)',
          'Harga renewal terkunci seumur keanggotaan',
          'Undangan ke Founding Gathering sebelum grand opening',
          'Prioritas booking PT dan Physio',
          'Akses grup WhatsApp Visionary',
        ],
      },
      {
        id: 'pioneer',
        label: 'Pioneer',
        gelombang: 'Gelombang 02',
        tagline: 'Gelombang kedua. Komunitas sudah mulai hidup.',
        slotsTaken: 0,
        slotsTotal: 120,
        priceOpenGym3M: 1300000,
        priceOpenGym3MNormal: 1590000,
        status: 'upcoming',
        badge: 'Dibuka setelah Visionary penuh',
        perks: [
          'Harga Founding untuk seluruh paket',
          'Postural Assessment oleh tim Bebascedera',
          'Satu sesi Group Class atau Open Gym sebagai bagian dari onboarding',
          'Konsultasi 20 menit dengan coach',
          'Satu sesi PT tambahan pada paket Body Rebuild ke atas',
          'SAMASE Welcome Kit (tote, botol)',
          'Undangan ke Founding Gathering sebelum grand opening',
          'Prioritas booking PT dan Physio',
          'Akses grup WhatsApp Founding Members',
        ],
      },
      {
        id: 'founder',
        label: 'Founder',
        gelombang: 'Gelombang 03',
        tagline: 'Gelombang terakhir. Setelahnya, pintu ditutup.',
        slotsTaken: 0,
        slotsTotal: 150,
        priceOpenGym3M: 1450000,
        priceOpenGym3MNormal: 1590000,
        status: 'upcoming',
        badge: 'Dibuka setelah Pioneer penuh',
        perks: [
          'Harga Founding untuk seluruh paket',
          'Postural Assessment oleh tim Bebascedera',
          'Konsultasi 15 menit dengan coach',
          'SAMASE Tote sebagai welcome token',
          'Undangan ke Founding Gathering sebelum grand opening',
          'Akses grup WhatsApp Founding Members',
        ],
      },
    ],
    disclaimer: 'Harga Founding berlaku hingga 15 Juni 2026 atau sampai 435 slot penuh — mana yang tercapai lebih dulu. Setelah itu, harga kembali ke standar klub.',
    ctaLabel: 'Jadwalkan Postural Assessment',
    ctaLabelShort: 'Jadwalkan Assessment',
  },

  // ── Physio Pricing Tiers (new — for /physio page) ──
  // Adapted from Bebascedera pricelist, restructured Good-Better-Best.
  // Tone: calm, no urgency. Prices shown alongside normal rates, no %/discount shouting.
  physioPricing: {
    number: '05',
    kicker: 'Paket Physio · Founding',
    title: 'Tiga tingkat kedalaman, satu pendekatan.',
    lede: 'Setiap paket dirancang di sekitar cara tubuh memulihkan diri. Harga Founding terkunci untuk anggota yang masuk sebelum 15 Juni 2026. Setelah itu, paket kembali ke tarif standar.',
    tiers: [
      {
        id: 'essential',
        label: 'Essential',
        positioning: 'Entry',
        tagline: 'Titik awal. Satu sesi, satu percakapan.',
        priceFounding: 395000,
        priceNormal: 725000,
        includes: [
          'Konsultasi awal 20 menit',
          'Satu sesi Pain Physio Rehab (First Visit)',
          'Rekomendasi lanjutan tertulis',
        ],
        bestFor: 'Keluhan baru, atau yang ingin memulai tanpa komitmen panjang.',
      },
      {
        id: 'starter',
        label: 'Starter',
        positioning: 'Most Chosen',
        tagline: 'Tiga sesi. Cukup untuk membaca pola.',
        priceFounding: 1250000,
        priceNormal: 1875000,
        includes: [
          'Konsultasi awal 30 menit',
          'Tiga sesi Pain Physio Rehab',
          'Program home-exercise tertulis',
          'Review kemajuan di sesi terakhir',
        ],
        bestFor: 'Cedera ringan, postur duduk lama, atau pemulihan pasca-olahraga.',
        highlighted: true,
      },
      {
        id: 'transformation',
        label: 'Transformation',
        positioning: 'Deep Work',
        tagline: 'Sepuluh sesi. Untuk yang butuh dibangun ulang.',
        priceFounding: 3750000,
        priceNormal: 5900000,
        includes: [
          'Konsultasi dengan founder Bebascedera (Pak Asep)',
          'Sepuluh sesi Pain Physio Rehab',
          'Program progresif yang disesuaikan tiap dua minggu',
          'Akses prioritas booking & WhatsApp langsung',
          'Welcome pack Physio (handuk, stretch band, panduan)',
        ],
        bestFor: 'Cedera berulang, pemulihan pasca-operasi, atau yang ingin membangun fondasi gerak dari nol.',
      },
    ],
    footnote: 'Semua paket mencakup akses ke tim Bebascedera tersertifikat dan ruang klinik di dalam SAMASE Sports Club. Paket tidak bisa ditransfer, berlaku 12 bulan sejak pembelian.',
  },

  // ── Combo Pack (Fitspace + Physio) ──
  // Hero preview offer — shown on main, /fitspace, /physio as teaser.
  // Not directly buyable; introduced as "harga yang ditawarkan setelah Postural Assessment."
  combo: {
    number: 'Combo',
    kicker: 'SAMASE Founding Combo',
    title: 'Dua layanan, satu kunci pembukaan.',
    lede: 'Harga Founding untuk anggota yang mengambil Fitspace dan Physio bersamaan. Ditawarkan setelah Postural Assessment selesai — bukan pembelian langsung, melainkan kelanjutan dari percakapan.',
    items: [
      { label: 'Fitspace · Open Gym 3 bulan', price: 1100000, note: 'Harga Founding Visionary' },
      { label: 'Physio · Starter (3 sesi)', price: 1250000, note: 'Harga Founding Starter' },
    ],
    totalSeparate: 2350000,
    totalCombo: 2150000,
    noteShort: 'Total Combo: Rp 2.150.000',
    noteLong: 'Kamu tidak membeli paket ini di sini. Jadwalkan Postural Assessment — paket Combo ditawarkan sebagai opsi kalau hasil assessment menunjukkan Fitspace dan Physio saling melengkapi.',
  },

  // ── Customer Journey (6-step funnel) ──
  // Shown on /campaign page as "what happens after you book."
  journey: {
    number: 'Journey',
    kicker: 'Proses',
    title: 'Enam langkah, tanpa tekanan beli.',
    lede: 'Kamu tidak membeli keanggotaan di form ini. Ini awal percakapan — tim kami akan mendampingi dari assessment sampai keputusan.',
    steps: [
      {
        n: '01', title: 'First Touch',
        meta: 'Awareness',
        body: 'Kamu menemukan SAMASE — lewat konten, rekomendasi, atau pencarian. CTA di semua titik mengarah ke satu tempat: Postural Assessment.',
      },
      {
        n: '02', title: 'Postural Assessment',
        meta: '15–30 menit · oleh Bebascedera',
        body: 'Bukan trial gym. Ini asesmen postur dan kondisi tubuhmu — di klinik kami atau salah satu partner fisio. Data tercatat untuk rekomendasi yang akurat.',
      },
      {
        n: '03', title: 'Qualification',
        meta: 'Filter kecocokan',
        body: 'Tidak semua yang assessment akan lanjut. Kami cek kecocokan dari empat sisi: pain point, jarak lokasi, timing, dan budget fit. Kalau tidak cocok, kami jujur katakan.',
      },
      {
        n: '04', title: 'Free Consultation',
        meta: '30 menit · on-site',
        body: 'Kunjungan langsung ke SAMASE. Ketemu Coach Raihan atau coach senior. Tour fasilitas, jelaskan program yang disusun dari hasil assessment-mu. Bukan tur penjualan — tur kecocokan.',
      },
      {
        n: '05', title: 'Founding Member Offer',
        meta: 'Komitmen, bukan diskon',
        body: 'Setelah konsultasi, kami tawarkan paket Founding yang paling sesuai — Fitspace, Physio, atau Combo. Harga Founding dikunci hanya untuk anggota yang melewati tahap ini.',
      },
      {
        n: '06', title: 'Community',
        meta: 'Mulai latihan',
        body: 'Kamu masuk ke WhatsApp grup, undangan ke gathering, akses ritual klub. Satu tahun pertama adalah fondasi — dibangun bersama, bukan sendirian.',
      },
    ],
  },

  // ── Coach ──
  coach: {
    number: '06',
    kicker: 'Tim Coach',
    title: 'Coach yang mendengar dulu, baru mengoreksi.',
    body: 'Semua coach SAMASE tersertifikat dan lolos tiga putaran kurasi internal: cara mendengar, cara menjelaskan ulang, dan cara menghormati batas. Sertifikat itu wajib, tapi tidak cukup — tiga hal tadi yang menentukan apakah kamu nyaman balik minggu depan.',
    consultLabel: 'Gratis 15–30 menit konsultasi via video call atau di klinik Bebascedera — khusus calon Founding Member. Tidak ada pitching paket di sesi ini.',
    ctaLabel: 'Jadwalkan Konsultasi Gratis',
    team: [
      {
        name: 'Coach Raihan',
        role: 'Head of Movement',
        specialty: 'Longevity & Functional Training',
        bio: '10+ tahun melatih klien di Jakarta, mulai dari eksekutif yang duduk seharian sampai Bapak 65 tahun yang ingin masih bisa bawa cucu. Filosofinya: kuat itu bukan soal angka di barbel, tapi soal tetap bisa gerakin badan dengan nyaman di usia 80.',
        photo: null,
        photoKey: null,
        tags: ['1-on-1', 'Golden 50+', 'Rehab'],
      },
      {
        name: 'Coach Laras',
        role: 'Women Program Lead',
        specialty: 'Women Training & Postnatal',
        bio: 'Sertifikasi pre dan postnatal training internasional. Sudah mendampingi ratusan ibu kembali aktif setelah melahirkan, dan perempuan yang bertahun-tahun merasa gym bukan tempatnya. Di SAMASE, ruang dan jadwalnya dirancang supaya kamu nggak harus pilih antara nyaman dan serius.',
        photo: null,
        photoKey: null,
        tags: ['Women FitSpace', 'Group Class', '2-on-1'],
      },
      {
        name: 'Coach Dimas',
        role: 'Strength & Conditioning',
        specialty: 'Hypertrophy & Athletic Performance',
        bio: 'Mantan atlet nasional yang pernah cedera parah dan balik kuat. Sekarang fokus pada pria dewasa yang ingin membangun kekuatan tanpa mengulang kesalahannya dulu — angkat berat boleh, asal postur dan recovery dijaga.',
        photo: null,
        photoKey: null,
        tags: ['Men FitSpace', 'Private PT', 'Performance'],
      },
      {
        name: 'Coach Nadia',
        role: 'Movement & Mobility',
        specialty: 'Yoga, Pilates, Group Class',
        bio: 'Spesialis mobility, breath work, dan gerakan mindful. Percaya bahwa napas yang tenang lebih dulu, gerakan yang kuat menyusul. Memimpin Morning Mobility dan kelas recovery setelah latihan berat.',
        photo: null,
        photoKey: null,
        tags: ['Group Class', 'Recovery', 'Community'],
      },
    ],
  },

  // ── FAQ ──
  // Tone: deklaratif, calm. No promo talk, no urgency panic. Objection handled with dignity.
  faq: {
    number: '07',
    kicker: 'Pertanyaan',
    title: 'Yang sering ditanyakan sebelum menjadwalkan.',
    items: [
      { q: 'Apa perbedaan SAMASE Sports Club, Fitspace, Physio, dan Padel?', a: 'SAMASE Sports Club adalah klub payung yang menaungi tiga layanan: Fitspace untuk latihan rutin (gym, group class, PT), Physio by Bebascedera untuk asesmen postur dan pemulihan, dan Private Padel untuk bermain (dibuka menyusul). Kamu bisa mengambil satu layanan, atau menggabungkan keduanya.' },
      { q: 'Apa yang terjadi setelah saya menjadwalkan Postural Assessment?', a: 'Tim kami menghubungi di WhatsApp pada jam kerja untuk konfirmasi waktu. Assessment berlangsung 15\u201330 menit bersama fisioterapis Bebascedera. Hasilnya kami gunakan untuk menyusun rekomendasi \u2014 Fitspace saja, Physio saja, atau keduanya. Tidak ada pembelian di tahap ini.' },
      { q: 'Apakah saya harus membeli keanggotaan di landing page ini?', a: 'Tidak. Halaman ini hanya untuk menjadwalkan Assessment. Penawaran keanggotaan Founding disampaikan setelah Free Consultation \u2014 langsung oleh coach kami, di tempat. Kami tidak menjual di landing page.' },
      { q: 'Kenapa pintu Founding ditutup di 435 anggota?', a: 'Jumlah ini bukan target penjualan \u2014 ini kapasitas yang kami anggap sehat untuk tahun pertama. Dengan 435 anggota, setiap orang mendapat ruang, jadwal, dan perhatian yang layak. Setelah penuh, kami tidak membuka Founding lagi. Anggota baru masuk di tarif standar klub.' },
      { q: 'Apakah Physio bisa diambil tanpa keanggotaan Fitspace?', a: 'Bisa. Paket Physio (Essential, Starter, Transformation) berdiri sendiri dan tidak mengharuskan keanggotaan Fitspace. Kalau hasil Assessment menunjukkan keduanya saling melengkapi, kami tawarkan opsi Combo \u2014 tapi keputusannya tetap di kamu.' },
      { q: 'Bagaimana privasi dijaga di dalam klub?', a: 'Private corners di area gym, no-photo zone di ruang ganti dan studio, dan kode etik anggota yang tenang. Jadwal kelas dikurasi per persona (muslimah, 50+, dll.) supaya ritme setiap kelompok terjaga. Ini klub, bukan ruang dokumentasi.' },
      { q: 'Apakah ada jadwal khusus muslimah?', a: 'Ada. Women FitSpace punya jadwal, area, dan coach perempuan tersendiri \u2014 Senin dan Kamis pagi sepanjang hari, plus slot akhir pekan. Detail lengkap disampaikan saat Consultation, dan bisa disesuaikan dengan ritme kerja atau ibadah.' },
      { q: 'Saya berusia 55+. Apakah program ini untuk saya?', a: 'Golden FitSpace dirancang khusus untuk 50+: lantai anti-slip, coach yang memahami tekanan darah dan sendi, dan fisioterapi preventif bersama Bebascedera. Assessment akan menentukan tempo yang aman untukmu.' },
      { q: 'Bagaimana kerja sama dengan Bebascedera berlangsung?', a: 'Bebascedera adalah tim fisioterapis tersertifikat yang beroperasi di dalam klub \u2014 bukan rujukan ke klinik luar. Setiap anggota SAMASE mendapat Postural Assessment sebagai titik awal. Paket Physio (Essential / Starter / Transformation) menggunakan ruang dan tim yang sama.' },
      { q: 'Kalau setelah Consultation saya memutuskan tidak bergabung?', a: 'Tidak ada tekanan. Kami lebih menghargai keputusan jujur \u2014 baik iya maupun tidak \u2014 daripada anggota yang bergabung karena sungkan. Kalau bentuk kami tidak cocok untukmu, kami akan menyarankan alternatif yang lebih sesuai.' },
    ],
  },

  // ── Blog / Journal ──
  blog: {
    enabled: true,
    number: '08',
    kicker: 'Journal',
    title: 'Catatan kecil dari ruang yang sedang dibangun.',
    lede: 'Cerita di balik layar, keputusan desain, dan prinsip latihan dari tim SAMASE — ditulis oleh coach dan tim operasional kami sendiri.',
    items: [
      {
        slug: 'filosofi-quiet-structure',
        title: 'Kenapa SAMASE memilih diam daripada ramai.',
        excerpt: 'Banyak gym di Jakarta bersaing lewat volume musik, banyaknya cermin, dan intensitas. Kami pilih jalur lain — dan alasannya bukan estetika.',
        body: 'Ini bukan soal anti-tren, tapi soal fokus. Kalau ruang olahraga terlalu bising, tubuh kesulitan mendengar dirinya sendiri. Padahal dalam latihan, mendengar tubuh adalah separuh pekerjaan.',
        date: '2026-03-12',
        author: 'Tim SAMASE',
        category: 'Filosofi',
        cover: null,
        coverKey: null,
      },
      {
        slug: 'cara-kami-memilih-coach',
        title: 'Cara kami memilih coach — dan kenapa sertifikat saja tidak cukup.',
        excerpt: 'Dari 40 kandidat, kami ambil 4. Yang bikin kami menolak 36 lainnya bukan soal teknis — justru hal yang lebih sulit diukur.',
        body: 'Selain background teknis, kami perhatikan tiga hal di setiap kandidat. Cara mendengar. Cara menjelaskan ulang. Cara menghormati batas. Tiga hal ini menentukan apakah seseorang bisa membangun kepercayaan dengan member jangka panjang.',
        date: '2026-03-02',
        author: 'Coach Raihan',
        category: 'Tim',
        cover: null,
        coverKey: null,
      },
      {
        slug: 'postur-sebelum-program',
        title: 'Postur dulu, program menyusul — bukan sebaliknya.',
        excerpt: 'Kebanyakan gym mulai dari target: turun berapa kilo, bentuk apa. Kami mulai dari apa yang sudah ada di tubuhmu sekarang.',
        body: 'Setiap orang datang dengan riwayat, kebiasaan duduk, dan pola gerak sendiri. Kalau program disusun tanpa memetakan itu, risiko cedera naik dan progresnya juga tidak efisien.',
        date: '2026-02-20',
        author: 'Bebascedera',
        category: 'Fisioterapi',
        cover: null,
        coverKey: null,
      },
    ],
  },

  // ── Events ──
  events: {
    enabled: true,
    number: '09',
    kicker: 'Agenda',
    title: 'Yang bisa kamu ikuti sebelum grand opening.',
    lede: 'Tidak perlu nunggu Juli 2026 untuk mulai kenal SAMASE. Beberapa momen di bawah terbuka untuk Founding Member dan waitlist prioritas.',
    items: [
      {
        id: 'gathering-01',
        title: 'Founding Gathering 01',
        date: '2026-05-17',
        time: '15:00 WIB',
        location: 'Bintaro',
        body: 'Pertemuan santai khusus Founding Member. Perkenalan tim, tour fasilitas, dan sesi tanya jawab.',
        audience: 'Visionary',
        status: 'upcoming',
      },
      {
        id: 'preview-01',
        title: 'Preview Class Session',
        date: '2026-06-07',
        time: '07:00 WIB',
        location: 'Studio SAMASE, Bintaro',
        body: 'Kelas pembuka untuk mencoba metode dan coach. Kapasitas terbatas, first-come first-served.',
        audience: 'Visionary',
        status: 'upcoming',
      },
      {
        id: 'screening-day',
        title: 'Postural Screening Day',
        date: '2026-06-14',
        time: '09:00 WIB',
        location: 'Bebascedera Clinic',
        body: 'Sesi screening untuk Founding Member. Booking slot via tim kami.',
        audience: 'Semua Founding',
        status: 'upcoming',
      },
      {
        id: 'grand-opening',
        title: 'Grand Opening SAMASE',
        date: '2026-07-01',
        time: '08:00 WIB',
        location: 'Bintaro',
        body: 'Pembukaan resmi SAMASE Sports Club. Ceremony, community run, dan open day.',
        audience: 'Semua',
        status: 'upcoming',
      },
    ],
  },

  // ── Schedule ──
  schedule: {
    enabled: true,
    number: '10',
    kicker: 'Jadwal',
    title: 'Jadwal Group Class mingguan.',
    lede: 'Jadwal indikatif menjelang pembukaan. Final schedule dikonfirmasi setelah onboarding.',
    days: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    items: [
      { day: 'Senin', time: '06:00', className: 'Morning Mobility', coach: 'Coach Nadia', audience: 'Semua', spots: 8 },
      { day: 'Senin', time: '07:30', className: 'Women Functional', coach: 'Coach Laras', audience: 'Women', spots: 6 },
      { day: 'Senin', time: '17:00', className: 'Strength Base', coach: 'Coach Dimas', audience: 'Men', spots: 8 },
      { day: 'Selasa', time: '07:30', className: 'Golden Mobility', coach: 'Coach Raihan', audience: '50+', spots: 6 },
      { day: 'Selasa', time: '19:00', className: 'Pilates Core', coach: 'Coach Nadia', audience: 'Semua', spots: 10 },
      { day: 'Rabu', time: '06:00', className: 'Morning Mobility', coach: 'Coach Nadia', audience: 'Semua', spots: 8 },
      { day: 'Rabu', time: '17:00', className: 'Teens Athletic', coach: 'Coach Dimas', audience: 'Kids/Teens', spots: 8 },
      { day: 'Kamis', time: '07:30', className: 'Women Functional', coach: 'Coach Laras', audience: 'Women', spots: 6 },
      { day: 'Kamis', time: '19:00', className: 'Padel Social', coach: 'Coach Raihan', audience: 'Semua', spots: 4 },
      { day: 'Jumat', time: '06:00', className: 'Strength Base', coach: 'Coach Dimas', audience: 'Men', spots: 8 },
      { day: 'Jumat', time: '17:00', className: 'Yoga & Breath', coach: 'Coach Nadia', audience: 'Semua', spots: 10 },
      { day: 'Sabtu', time: '07:30', className: 'Community Run', coach: 'Coach Raihan', audience: 'Semua', spots: 20 },
      { day: 'Sabtu', time: '19:00', className: 'Open Gym Coached', coach: 'Coach Dimas', audience: 'Semua', spots: 12 },
    ],
  },

  // ── Form (dynamic fields) ──
  // Gelombang bukan field lagi. Auto-assign dari founding-logic.js.
  // Admin bisa hidupin manual picker via `showBatchPicker: true` (advanced).
  form: {
    number: '11',
    kicker: 'Postural Assessment',
    title: 'Mulai dari membaca tubuhmu.',
    lede: 'Jadwalkan Postural Assessment bersama tim Bebascedera. Bukan trial, bukan pembelian — asesmen 15–30 menit untuk memahami kondisi tubuhmu sebelum kami memberi rekomendasi apa pun. Tim kami merespons di WhatsApp dalam jam kerja (08.00–20.00 WIB).',
    benefitsHead: 'Yang kamu dapatkan dari Assessment',
    showBatchPicker: false, // default: gelombang auto-assigned, bukan opsi user
    fields: [
      { id: 'name', label: 'Nama lengkap', type: 'text', required: true, placeholder: 'Contoh: Raihan Kurniawan' },
      { id: 'whatsapp', label: 'Nomor WhatsApp aktif', type: 'tel', required: true, placeholder: '08xx...' },
      { id: 'email', label: 'Email (opsional)', type: 'email', required: false, placeholder: 'kamu@email.com' },
      { id: 'interest', label: 'Layanan yang ingin dijajaki', type: 'select', required: true, options: ['Fitspace — latihan rutin', 'Physio — pemulihan atau pencegahan', 'Keduanya — belum tahu mana dulu', 'Private Padel (menyusul)'] },
      { id: 'persona', label: 'Saya paling dekat dengan', type: 'select', required: true, options: ['Lansia Aktif (55+)', 'Muslimah / Akhwat', 'Bapak / Pria Dewasa', 'Young Adult (20–30)', 'Kids & Teens (via ortu)', 'Belum yakin'] },
      { id: 'notes', label: 'Apa yang ingin kamu ceritakan?', type: 'textarea', required: false, placeholder: 'Mis. keluhan postur, pemulihan pasca-cedera, preferensi jadwal, atau hal lain yang perlu kami tahu.' },
    ],
    submitLabel: 'Jadwalkan Postural Assessment',
    submitLabelWaitlist: 'Masuk daftar prioritas',
    // Inline slot-status copy — narrative, not urgent.
    slotInlineActive: 'Kalau kamu melanjutkan ke Founding Member setelah Assessment, kamu akan masuk Gelombang {gelombang}.',
    slotInlineFew:    'Gelombang {gelombang} hampir penuh. Kamu tetap bisa menjadwalkan Assessment — keputusan keanggotaan dibicarakan setelahnya.',
    slotInlineFull:   'Gelombang Founding sudah penuh. Kamu bisa masuk daftar prioritas — kami kabari bila slot terbuka atau keanggotaan reguler dimulai.',
    submitSuccessTitle: 'Jadwal Assessment kamu tercatat.',
    submitSuccessBody: 'Tim SAMASE akan menghubungi kamu di WhatsApp pada jam kerja (08.00–20.00 WIB) untuk mengkonfirmasi waktu Postural Assessment. Tidak ada pembelian apapun di tahap ini — kita mulai dari percakapan.',
    submitSuccessTitleWaitlist: 'Kamu tercatat di daftar prioritas.',
    submitSuccessBodyWaitlist: 'Kami akan mengabari kamu saat ada pembukaan berikutnya. Event komunitas tetap terbuka untuk daftar prioritas.',
  },

  // ── Contact ──
  contact: {
    whatsapp: '+62 811-1234-5678',
    whatsappUrl: 'https://wa.me/628111234567',
    email: 'hello@samasesportsclub.com',
    instagram: '@samasesportsclub',
    instagramUrl: 'https://instagram.com/samasesportsclub',
    tiktok: '@samasesportsclub',
    tiktokUrl: 'https://tiktok.com/@samasesportsclub',
    addressLine1: 'Bintaro Sektor 7',
    addressLine2: 'Tangerang Selatan, Indonesia',
    mapsUrl: 'https://maps.google.com/?q=Bintaro+Sektor+7',
  },

  // ── SEO ──
  seo: {
    title: 'SAMASE Sports Club · Gym Privat di Bintaro, Pre-opening Juli 2026',
    description: 'Klub olahraga privat di Bintaro untuk yang ingin konsisten tanpa ribut. Coach bersertifikat, fisioterapi Bebascedera di tempat, jadwal khusus muslimah dan 50+. Founding Member dibuka sekarang, diskon hingga 30%.',
    keywords: 'gym bintaro, private gym jakarta, gym muslimah bintaro, gym lansia, samase sports club, bebascedera, fisioterapi bintaro, founding member gym, personal trainer bintaro',
    ogImage: 'brand/og-image.jpg',
    themeColor: '#A94E2C',
    favicon: 'brand/favicon.svg',
  },

  // ── Announcement ──
  announcement: {
    enabled: false,
    message: 'Visionary sudah terisi 72% — sisa 22 slot dengan diskon 30%+. Setelah ini, Pioneer (harga naik Rp 200K/3bln).',
    linkLabel: 'Amankan slot Visionary',
    linkUrl: '#founding',
    bg: '#1C1A17',
    fg: '#F2EEE5',
  },

  // ── Pricing page ──
  pricing: {
    hero: {
      kicker: 'Harga dan Paket',
      title: 'Harga yang tertulis, tarif yang berlaku.',
      lede: 'Tidak ada joining fee, tidak ada lock-in kontrak. Harga Founding berlaku bagi anggota yang bergabung melalui proses Postural Assessment sebelum 15 Juni 2026.',
    },
    disclaimer: 'Harga Founding khusus 435 anggota pertama. Pajak dan biaya administrasi sudah termasuk. Setelah Juli 2026, tarif kembali ke standar klub.',
  },

  // ── Sub-brands (for main brand page) ──
  subBrands: {
    number: '02',
    kicker: 'Tiga Layanan',
    title: 'Dirancang sebagai satu, dijalankan sebagai tiga.',
    lede: 'Setiap sub-brand berdiri di atas fondasi yang sama \u2014 ruang yang tenang, pendekatan yang presisi \u2014 tapi melayani kebutuhan yang berbeda.',
    items: [
      {
        id: 'fitspace',
        label: 'SAMASE Fitspace',
        slug: 'fitspace.html',
        kicker: 'Latihan',
        lede: 'Gym dan studio untuk latihan rutin. Open gym, group class, private training, area khusus muslimah, dan Golden FitSpace untuk 50+.',
        status: 'Founding Member dibuka',
        ctaLabel: 'Jelajahi Fitspace',
      },
      {
        id: 'physio',
        label: 'SAMASE Physio by Bebascedera',
        slug: 'physio.html',
        kicker: 'Pemulihan',
        lede: 'Klinik fisioterapi di dalam klub, dijalankan oleh tim Bebascedera tersertifikat. Asesmen postur, pemulihan cedera, dan program pencegahan.',
        status: 'Founding Member dibuka',
        ctaLabel: 'Jelajahi Physio',
      },
      {
        id: 'padel',
        label: 'SAMASE Private Padel',
        slug: 'padel.html',
        kicker: 'Permainan',
        lede: 'Lapangan padel privat dengan fasilitas premium. Sewa court, coaching privat, dan turnamen komunitas.',
        status: 'Menyusul',
        ctaLabel: 'Baca lebih lanjut',
      },
    ],
  },

  // ── Legal ──
  legal: {
    privacyUrl: '#',
    termsUrl: '#',
    copyright: '© 2026 SAMASE Sports Club. All rights reserved.',
    registrationNote: 'PT SAMASE Gaya Aktif, terdaftar di Tangerang Selatan',
  },

  // ── Scarcity mode copy ──
  scarcityCopy: {
    hard: {
      headline: 'Kuota terbatas per gelombang — harga naik setiap satu penuh.',
      sub: 'Progress real-time di bawah. Begitu gelombang ini penuh, harga otomatis naik ke gelombang berikutnya.',
    },
    soft: {
      headline: 'Pendaftaran Founding Member ditutup 15 Juni 2026.',
      sub: 'Setelah itu, harga pre-opening tidak berlaku lagi — kembali ke harga normal Juli 2026.',
    },
    hybrid: {
      headline: 'Sudah 182 orang mendaftar — dari target 350 Founding Member.',
      sub: 'Registrasi ditutup 15 Juni 2026 atau lebih cepat saat total kuota penuh.',
    },
  },

  // ── i18n config ──
  i18n: { default: 'id', available: ['id', 'en'] },

  // ── English translation (S.en.*) ──
  en: {
      brand: {
        tag: 'Pre-opening 2026',
        opening: 'July 2026',
        city: 'Jakarta, Bintaro',
      },
      hero: {
        kicker: 'Founding Member open · Pre-opening July 2026',
        titleTop: 'Train consistently',
        titleMid: 'without performing,',
        titleBot: 'without the noise.',
        lede: 'A private sports club in Bintaro for people who want to be consistent, not to show off. Certified coaches, on-site physiotherapy, and schedules built around muslim women and active seniors. Opening July 2026.',
        meta1Label: 'July',
        meta1Value: '2026 Grand Opening',
        meta2Label: 'Bintaro',
        meta2Value: 'Location revealed soon',
        footer: 'The building is almost finished. The community has already started training.',
      },
      ai: {
        placeholder: 'Ask anything about SAMASE, programs, or your training...',
      },
      philosophy: {
        number: '01',
        kicker: 'Philosophy',
        title: 'Caring for the body, quietly.',
        quote: 'Quiet Structure: calm is the foundation of consistency.',
        body: [
          'In a busy city we try to offer a space that does not add to the noise. A place to move without pressure to look a certain way.',
          'We believe lasting strength is not loud. It is steady and well kept. Like a structure that is maintained with care.',
        ],
        pillars: [
          { n: '01', title: 'Modern', body: 'Current facilities and methods, used with restraint.' },
          { n: '02', title: 'Sophisticated', body: 'Calm aesthetics, precise service, details cared for.' },
          { n: '03', title: 'Privacy-first', body: 'A space that respects personal boundaries. No judgement.' },
        ],
      },
      audience: {
        number: '02',
        kicker: 'Who it is for',
        title: 'Designed for those who want to move with calm.',
        lede: 'We are not for everyone, and that is part of the philosophy. Each persona receives its own space, schedule, and program.',
      },
      facilities: {
        number: '03',
        kicker: 'Facilities',
        title: 'Facilities maintained with intent.',
        lede: 'Not to show off. To support movement that matters.',
      },
      physio: {
        number: '04',
        kicker: 'Physiotherapy × Bebascedera',
        title: 'From screening, to program, to proper movement.',
        lede: 'We partner with Bebascedera, a certified physiotherapy team. Understand posture first, then recommend the right program.',
      },
      founding: {
        number: '05',
        kicker: 'Founding Member',
        title: 'Three waves, one opportunity.',
        lede: 'We open Founding Member in three waves. The earlier you join, the deeper the discount and the richer the benefits. Once a wave fills, prices rise.',
        disclaimer: 'Offer valid until each wave is full, or until June 15, 2026, whichever comes first. Prices return to normal after grand opening in July 2026.',
        ctaLabel: 'See Pricing and Packages',
        ctaLabelShort: 'Secure My Slot',
      },
      coach: {
        number: '06',
        kicker: 'Coaching Team',
        title: 'Guided by a team that understands body and goals.',
        body: 'Every SAMASE coach is certified and internally curated. We ensure a way of teaching that is calm, responsible, and focused on the long term. No templates. Every session is adapted to posture, history, and intent.',
        consultLabel: 'A free 15 to 30 minute consultation with one of our coaches is available for prospective Founding Members.',
        ctaLabel: 'Schedule Free Consultation',
      },
      faq: {
        number: '07',
        kicker: 'Questions',
        title: 'Things people usually ask.',
      },
      blog: {
        number: '08',
        kicker: 'Journal',
        title: 'Small notes from a space being built.',
        lede: 'Thoughts, field stories, and process updates from the SAMASE team.',
      },
      events: {
        number: '09',
        kicker: 'Agenda',
        title: 'Agenda leading up to the opening.',
        lede: 'A few moments you can join before SAMASE officially opens.',
      },
      schedule: {
        number: '10',
        kicker: 'Schedule',
        title: 'Weekly Group Class schedule.',
        lede: 'Indicative schedule ahead of opening. Final schedule confirmed during onboarding.',
      },
      form: {
        number: '11',
        kicker: 'Sign up',
        title: 'Hold your slot — no purchase commitment.',
        lede: 'Fill the 4 fields below. We reply on WhatsApp within 1–2 hours during business hours (8 AM–8 PM WIB), next morning at the latest. We start with a free Postural Screening and a relaxed chat — not a pitch.',
        benefitsHead: 'What you get right after signing up',
        submitLabel: 'Send — we\u2019ll reply on WhatsApp',
      },
      contact: {
        addressLine2: 'Tangerang Selatan, Indonesia',
      },
  },
};

// Register as defaults; CMS overrides layer on top
window.SAMASE_DEFAULTS = SAMASE;
window.SAMASE = SAMASE;
if (window.CMSStore) {
  window.CMSStore.init();
}
