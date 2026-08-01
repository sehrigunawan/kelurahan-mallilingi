/**
 * Web Profile Kelurahan Mallilingi - Master Data Store
 * Disusun untuk Proker Individu KKN
 */

const DEFAULT_MALLILINGI_DATA = {
  info: {
    nama: "Kelurahan Mallilingi",
    kecamatan: "Kecamatan Bantaeng",
    kabupaten: "Kabupaten Bantaeng",
    provinsi: "Sulawesi Selatan",
    kodePos: "92411",
    alamat: "Jl. Sungai Calendu, Kel. Mallilingi, Kec. Bantaeng, Kab. Bantaeng, Sulawesi Selatan 92411",
    telepon: "(0413) 21001",
    whatsapp: "6285255551234",
    email: "kelurahan.mallilingi@bantaengkab.go.id",
    jamKerja: "Senin - Jumat: 08.00 - 16.00 WITA",
    luasWilayah: "0.84 km²",
    jumlahPenduduk: "3.420 Jiwa",
    jumlahKK: "890 KK",
    jumlahRT: "12 RT",
    jumlahRW: "4 RW",
    sambutanLurah: "Selamat Datang di Portal Resmi Kelurahan Mallilingi. Kami berkomitmen memberikan pelayanan publik yang terbuka, cepat, dan transparan bagi seluruh warga Mallilingi serta masyarakat luas. Melalui media informasi terintegrasi ini, kami berharap pelayanan publik dan potensi lokal Kelurahan Mallilingi semakin dekat dengan Anda.",
    namaLurah: "H. Andi Syamsul, S.Sos., M.Si.",
    nipLurah: "19780512 200501 1 004",
    fotoLurah: "assets/images/lurah.jpg",
    fotoKantor: "assets/images/kantor_kelurahan.jpg",
    visi: "Mewujudkan Kelurahan Mallilingi yang Mandiri, Sejahtera, Berdaya Saing, dan Unggul dalam Pelayanan Publik Berbasis Teknologi dan Kearifan Lokal.",
    misi: [
      "Meningkatkan kualitas pelayanan administrasi kependudukan yang ramah, cepat, dan transparan.",
      "Mengembangkan ekonomi kerakyatan melalui pemberdayaan UMKM dan potensi lokal masyarakat Mallilingi.",
      "Meningkatkan kualitas sarana, kebersihan, dan ketertiban lingkungan kelurahan.",
      "Mendorong partisipasi aktif warga dalam pembangunan melalui lembaga kemasyarakatan."
    ],
    batasWilayah: {
      utara: "Desa Ulugalung",
      timur: "Kelurahan Lembang",
      selatan: "Kelurahan Letta",
      barat: "Kelurahan Pallantikang"
    }
  },

  layanan: [
    {
      id: "layanan-1",
      judul: "Surat Keterangan Tidak Mampu (SKTM)",
      kategori: "Sosial & Kesejahteraan",
      waktu: "15 - 30 Menit",
      biaya: "Gratis (Rp 0)",
      persyaratan: [
        "Pengantar dari Ketua RT dan RW setempat",
        "Fotokopi KTP Pemohon (1 Lembar)",
        "Fotokopi Kartu Keluarga / KK (1 Lembar)",
        "Surat Pernyataan Tidak Mampu bermaterai 10.000"
      ],
      alur: "1. Pemohon meminta surat pengantar dari RT/RW.\n2. Mengunjungi Kantor Lurah Mallilingi membawa dokumen lengkap.\n3. Petugas melakukan verifikasi berkas.\n4. Lurah/Seklur menandatangani SKTM.\n5. Surat siap diambil."
    },
    {
      id: "layanan-2",
      judul: "Surat Keterangan Usaha (SKU)",
      kategori: "Ekonomi & Usaha",
      waktu: "20 - 30 Menit",
      biaya: "Gratis (Rp 0)",
      persyaratan: [
        "Pengantar dari Ketua RT dan RW",
        "Fotokopi KTP Pemohon",
        "Fotokopi Kartu Keluarga",
        "Foto tempat lokasi usaha (ukuran 3x4 2 lembar / cetak)"
      ],
      alur: "1. Minta pengantar RT/RW.\n2. Bawa berkas ke bagian pelayanan umum kantor lurah.\n3. Petugas memverifikasi usaha di wilayah Mallilingi.\n4. Penandatanganan dokumen SKU."
    },
    {
      id: "layanan-3",
      judul: "Pengantar KTP-el / Kartu Keluarga",
      kategori: "Kependudukan",
      waktu: "10 - 20 Menit",
      biaya: "Gratis (Rp 0)",
      persyaratan: [
        "Surat Pengantar RT/RW",
        "Fotokopi KK lama (jika perubahan) atau KK Orang Tua",
        "Pas Foto 3x4 (2 Lembar background Merah/Biru)"
      ],
      alur: "1. Verifikasi berkas di Kantor Lurah Mallilingi.\n2. Penerbitan Surat Pengantar ke Kantor Disdukcapil Kab. Bantaeng."
    },
    {
      id: "layanan-4",
      judul: "Surat Keterangan Pindah Masuk/Keluar",
      kategori: "Kependudukan",
      waktu: "1 Hari Kerja",
      biaya: "Gratis (Rp 0)",
      persyaratan: [
        "Surat Pengantar RT/RW lokasi asal",
        "Kartu Keluarga (KK) Asli & Fotokopi",
        "KTP Asli Pemohon",
        "Alamat tujuan lengkap"
      ],
      alur: "1. Pengecekan data kependudukan.\n2. Pembuatan surat pengantar pindah resmi."
    },
    {
      id: "layanan-5",
      judul: "Surat Pengantar Nikah (N1 - N4)",
      kategori: "Pernikahan & Kesra",
      waktu: "1 Hari Kerja",
      biaya: "Gratis (Rp 0)",
      persyaratan: [
        "Pengantar RT/RW",
        "Fotokopi KTP & KK Calon Pengantin (Masing-masing 2 lembar)",
        "Fotokopi Akta Kelahiran & Ijazah Terakhir",
        "Pas foto 2x3 & 3x4 background Biru (Masing-masing 4 lembar)"
      ],
      alur: "1. Membawa persyaratan lengkap ke seksi Kesra Kelurahan.\n2. Pembuatan berkas pengantar untuk KUA Bantaeng."
    }
  ],

  berita: [
    {
      id: "news-1",
      judul: "Pelaksanaan Proker KKN & Peluncuran Website Resmi Kelurahan Mallilingi",
      kategori: "KKN & Teknologi",
      tanggal: "30 Juli 2026",
      penulis: "Tim Mahasiswa KKN",
      ringkasan: "Pemerintah Kelurahan Mallilingi bersama Mahasiswa KKN meluncurkan portal informasi dan pengelolaan media terintegrasi untuk mempermudah pelayanan warga.",
      konten: "Kelurahan Mallilingi resmi memiliki sistem informasi profil dan pengelolaan media publik berbasis digital. Inisiatif ini diwujudkan sebagai bagian dari program kerja individu mahasiswa KKN. Melalui portal ini, masyarakat dapat mengakses info syarat surat, berita desa, hingga katalog UMKM lokal secara langsung dari smartphone.",
      gambar: "assets/images/kantor_kelurahan.jpg"
    },
    {
      id: "news-2",
      judul: "Penyaluran Bantuan Pangan & Penguatan Usaha Mikro Warga Mallilingi",
      kategori: "Pemerintahan & Sosmas",
      tanggal: "25 Juli 2026",
      penulis: "Humas Kelurahan",
      ringkasan: "Kegiatan penyaluran bantuan pangan dan pendampingan UMKM dilaksanakan tertib di Aula Kantor Lurah Mallilingi.",
      konten: "Pemerintah Kelurahan Mallilingi menyalurkan program bantuan pangan serta membuka pendampingan pendaftaran izin usaha mikro bagi para pelaku UMKM setempat. Kegiatan ini bertujuan memperkuat ketahanan ekonomi warga.",
      gambar: "assets/images/kantor_kelurahan.jpg"
    },
    {
      id: "news-3",
      judul: "Kerja Bakti Bersama & Gotong Royong Kebersihan Lingkungan RT/RW",
      kategori: "Kegiatan Warga",
      tanggal: "18 Juli 2026",
      penulis: "Karang Taruna Mallilingi",
      ringkasan: "Warga Kelurahan Mallilingi antusias mengikuti aksi bersih lingkungan di sepanjang Jl. Sungai Calendu.",
      konten: "Aksi gotong royong kebersihan saluran air dan pemangkasan dahan pohon dilakukan serentak di 4 RW Kelurahan Mallilingi untuk memelihara keasrian dan kenyamanan wilayah.",
      gambar: "assets/images/kantor_kelurahan.jpg"
    }
  ],

  umkm: [
    {
      id: "umkm-1",
      nama: "Keripik Rumput Laut Mallilingi",
      pemilik: "Ibu Nurhayati (RW 02)",
      kategori: "Kuliner & Olahan Sea Food",
      harga: "Rp 15.000 / bungkus",
      whatsapp: "6285255558811",
      deskripsi: "Camilan gurih renyah berbahan dasar rumput laut pilihan khas Kabupaten Bantaeng. Tanpa bahan pengawet.",
      lokasi: "Jl. Sungai Calendu No. 14, Mallilingi"
    },
    {
      id: "umkm-2",
      nama: "Sirup Marquisa & Olahan Jagung Bantaeng",
      pemilik: "Pak Syamsuddin",
      kategori: "Minuman & Hasil Tani",
      harga: "Rp 25.000 / botol",
      whatsapp: "6281344449922",
      deskripsi: "Minuman segar alami khas Bantaeng manis asam alami menyegarkan.",
      lokasi: "RT 03 / RW 01 Kelurahan Mallilingi"
    },
    {
      id: "umkm-3",
      nama: "Kerajinan Anyaman Bambu & Souvenir Lokal",
      pemilik: "Kelompok Usaha Ibu PKK",
      kategori: "Kerajinan Tangan",
      harga: "Rp 35.000 - Rp 150.000",
      whatsapp: "6285255551234",
      deskripsi: "Aneka tas anyaman, tempat tisu, dan souvenir khas berbahan bambu lokal buatan warga Mallilingi.",
      lokasi: "Aula PKK Kantor Lurah Mallilingi"
    }
  ],

  struktur: [
    { nama: "H. Andi Syamsul, S.Sos., M.Si.", jabatan: "Lurah Mallilingi", nip: "NIP. 19780512 200501 1 004", foto: "assets/images/lurah.jpg" },
    { nama: "Rahmatia, S.AP.", jabatan: "Sekretaris Kelurahan", nip: "NIP. 19820315 200902 2 008", foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" },
    { nama: "Bachtiar, S.E.", jabatan: "Kasi Ketentraman & Ketertiban", nip: "NIP. 19850720 201101 1 012", foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" },
    { nama: "Hj. Mariani, S.P.", jabatan: "Kasi Perekonomian & PMK", nip: "NIP. 19801104 200604 2 005", foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80" },
    { nama: "Nurhalimah, S.Pd.", jabatan: "Kasi Kesejahteraan Rakyat", nip: "NIP. 19880910 201403 2 002", foto: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80" },
    { nama: "Drs. Muhammad Aris", jabatan: "Ketua LPM Mallilingi", nip: "Lembaga Masyarakat", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" },
    { nama: "Hj. Andi Tenri", jabatan: "Ketua TP PKK Mallilingi", nip: "Lembaga Masyarakat", foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80" },
    { nama: "Faisal Azis, S.T.", jabatan: "Ketua Karang Taruna", nip: "Lembaga Kepemudaan", foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" }
  ]
};

// Helper for loading data from localStorage or default
function getMallilingiData() {
  const savedData = localStorage.getItem("MALLILINGI_WEB_DATA");
  if (savedData) {
    try {
      const data = JSON.parse(savedData);
      if (Array.isArray(data.struktur)) {
        data.struktur = data.struktur.map((st, idx) => ({
          ...(DEFAULT_MALLILINGI_DATA.struktur[idx] || {}),
          ...st
        }));
      }
      return data;
    } catch (e) {
      console.error("Gagal membaca data localStorage, menggunakan default:", e);
    }
  }
  return DEFAULT_MALLILINGI_DATA;
}

function saveMallilingiData(data) {
  localStorage.setItem("MALLILINGI_WEB_DATA", JSON.stringify(data));
}

function resetMallilingiData() {
  localStorage.setItem("MALLILINGI_WEB_DATA", JSON.stringify(DEFAULT_MALLILINGI_DATA));
  return DEFAULT_MALLILINGI_DATA;
}

/* ==========================================================================
   SUPABASE CLOUD DATABASE CONFIGURATION ($0 FREE TIER)
   ========================================================================== */
const SUPABASE_CONFIG = {
  // Masukkan URL dan Anon Key Supabase Anda dari dashboard https://supabase.com
  url: "https://your-project-id.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key-here",
  enabled: false // Ubah ke true jika sudah memasukkan API Key resmi Supabase
};

// Inisialisasi Supabase JS Client jika SDK dimuat & enabled = true
let supabaseClient = null;
if (window.supabase && SUPABASE_CONFIG.enabled && !SUPABASE_CONFIG.url.includes("your-project-id")) {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log("⚡ Supabase Cloud Database Terhubung!");
  } catch (err) {
    console.warn("⚠️ Supabase Client init gagal, mengalihkan ke LocalStorage:", err);
  }
}

/**
 * Dual-Mode Data Fetcher:
 * 1. Jika Supabase terhubung -> Ambil data langsung dari Supabase Cloud DB.
 * 2. Jika offline / belum set API key -> Ambil data dari LocalStorage / DEFAULT_MALLILINGI_DATA.
 */
async function getMallilingiDataAsync() {
  if (supabaseClient) {
    try {
      const [infoRes, beritaRes, umkmRes, layananRes] = await Promise.all([
        supabaseClient.from('info').select('*').single(),
        supabaseClient.from('berita').select('*').order('created_at', { ascending: false }),
        supabaseClient.from('umkm').select('*'),
        supabaseClient.from('layanan').select('*')
      ]);

      if (!infoRes.error && !beritaRes.error && !umkmRes.error && !layananRes.error) {
        return {
          info: infoRes.data || DEFAULT_MALLILINGI_DATA.info,
          berita: beritaRes.data || DEFAULT_MALLILINGI_DATA.berita,
          umkm: umkmRes.data || DEFAULT_MALLILINGI_DATA.umkm,
          layanan: layananRes.data || DEFAULT_MALLILINGI_DATA.layanan,
          struktur: DEFAULT_MALLILINGI_DATA.struktur
        };
      }
    } catch (err) {
      console.warn("⚠️ Gagal mengambil dari Supabase Cloud DB, fallback ke LocalStorage:", err);
    }
  }
  return getMallilingiData();
}

/**
 * Dual-Mode Data Saver:
 * Menyimpan data ke LocalStorage & mencoba sinkronisasi ke Supabase Cloud jika terhubung.
 */
async function saveMallilingiDataAsync(data) {
  saveMallilingiData(data); // Selalu simpan ke LocalStorage agar 100% aman offline
  
  if (supabaseClient) {
    try {
      await Promise.all([
        supabaseClient.from('info').upsert(data.info),
        supabaseClient.from('berita').upsert(data.berita),
        supabaseClient.from('umkm').upsert(data.umkm),
        supabaseClient.from('layanan').upsert(data.layanan)
      ]);
      console.log("✅ Data berhasil disinkronkan ke Supabase Cloud DB!");
    } catch (err) {
      console.error("❌ Sinkronisasi ke Supabase Gagal:", err);
    }
  }
}
