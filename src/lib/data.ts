import { createClient } from "@supabase/supabase-js";
import { MallilingiData, InfoKelurahan, LayananSurat, BeritaPengumuman, UMKM, Aparatur } from "../types";

export const SUPABASE_CONFIG = {
  url: "https://zpjlttzifpnavbwjsjxq.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwanR0emlmcG5hdmJ3anNqeHEiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc1NDA3ODA5MywiZXhwIjoyMDY5NjU0MDkzfQ.dummyKeyIfAny",
  enabled: true
};

export const DEFAULT_MALLILINGI_DATA: MallilingiData = {
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
    sambutanLurah: "Selamat Datang di Portal Resmi Kelurahan Mallilingi. Kami berkomitmen memberikan pelayanan publik yang terbuka, cepat, dan transparan bagi seluruh warga Mallilingi serta masyarakat luas.",
    namaLurah: "H. Andi Syamsul, S.Sos., M.Si.",
    nipLurah: "19780512 200501 1 004",
    fotoLurah: "/assets/images/lurah.jpg",
    fotoKantor: "/assets/images/kantor_kelurahan.jpg",
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
        "Fotokopi KTP Pemohon (1 lembar)",
        "Fotokopi Kartu Keluarga / KK (1 lembar)",
        "Surat Pengantar dari Ketua RT dan RW setempat",
        "Surat Pernyataan Tidak Mampu bermaterai 10.000"
      ],
      alur: "1. Pemohon membawa berkas ke Kantor Kelurahan Mallilingi.\n2. Petugas melakukan verifikasi berkas.\n3. Lurah / Kasi Kessos menandatangani SKTM.\n4. Penyerahan dokumen ke pemohon."
    },
    {
      id: "layanan-2",
      judul: "Surat Keterangan Usaha (SKU)",
      kategori: "Ekonomi & Perizinan",
      waktu: "15 - 30 Menit",
      biaya: "Gratis (Rp 0)",
      persyaratan: [
        "Fotokopi KTP Pemilik Usaha (1 lembar)",
        "Fotokopi Kartu Keluarga / KK (1 lembar)",
        "Surat Pengantar RT/RW mengenai lokasi dan jenis usaha",
        "Foto tempat usaha / lokasi kegiatan usaha"
      ],
      alur: "1. Pemohon menyerahkan berkas ke meja pelayanan kelurahan.\n2. Pemeriksaan kelengkapi dokumen dan keabsahan lokasi usaha.\n3. Penerbitan & penandatanganan SKU oleh Lurah.\n4. Pengambilan dokumen SKU."
    },
    {
      id: "layanan-3",
      judul: "Surat Keterangan Domisili Usaha / Perorangan",
      kategori: "Kependudukan",
      waktu: "15 - 30 Menit",
      biaya: "Gratis (Rp 0)",
      persyaratan: [
        "Fotokopi KTP & KK Pemohon",
        "Surat Pengantar dari Ketua RT & RW setempat",
        "Bukti kepemilikan/sewa tempat domisili (bila ada)"
      ],
      alur: "1. Verifikasi berkas oleh petugas pelayanan kelurahan.\n2. Pencatatan domisili dalam buku registrasi kelurahan.\n3. Penandatanganan dokumen domisili oleh Lurah/Seklur."
    },
    {
      id: "layanan-4",
      judul: "Surat Pengantar Pengurusan KTP-el / KK",
      kategori: "Administrasi Kependudukan",
      waktu: "10 - 20 Menit",
      biaya: "Gratis (Rp 0)",
      persyaratan: [
        "Fotokopi Kartu Keluarga (KK) lama",
        "Surat Pengantar RT/RW",
        "Surat Keterangan Kehilangan dari Kepolisian (jika KTP/KK hilang)"
      ],
      alur: "1. Pemeriksaan dokumen pengantar di kantor kelurahan.\n2. Penerbitan Surat Pengantar Resmi Kelurahan ke Kantor Disdukcapil Bantaeng."
    }
  ],

  berita: [
    {
      id: "berita-1",
      judul: "Peluncuran Portal Informasi & Pelayanan Digital Kelurahan Mallilingi",
      tanggal: "1 Agustus 2026",
      kategori: "Pengumuman Resmi",
      gambar: "/assets/images/kantor_kelurahan.jpg",
      ringkasan: "Pemerintah Kelurahan Mallilingi secara resmi meluncurkan portal informasi terpadu berbasis web untuk mempermudah warga dalam mengakses syarat pelayanan surat dan direktori UMKM.",
      isi: "Pemerintah Kelurahan Mallilingi, Kecamatan Bantaeng secara resmi meluncurkan Portal Informasi Publik Terpadu. Platform ini dirancang untuk mewujudkan tata kelola kelurahan yang transparan, responsif, dan berbasis digital. Warga Mallilingi kini dapat melihat berbagai informasi pelayanan administrasi kependudukan, berita terkini kelurahan, serta katalog produk UMKM warga secara langsung dari smartphone."
    },
    {
      id: "berita-2",
      judul: "Kegiatan Kerja Bakti Lingkungan dan Penghijauan Wilayah RT/RW Mallilingi",
      tanggal: "28 Juli 2026",
      kategori: "Kegiatan Warga",
      gambar: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
      ringkasan: "Warga Kelurahan Mallilingi bersama staf aparat kelurahan menggelar aksi gotong royong pembersihan drainase dan penanaman bibit pohon di sepanjang jalur utama.",
      isi: "Semangat gotong royong kembali ditunjukkan oleh seluruh elemen warga Kelurahan Mallilingi. Bersama para pengurus RT/RW, LPM, Karang Taruna, serta jajaran staf kelurahan, warga berbondong-bondong melakukan kerja bakti pembersihan saluran air dan penanaman pohon pelindung untuk menciptakan lingkungan yang asri dan bebas banjir."
    },
    {
      id: "berita-3",
      judul: "Sosialisasi Pendataan & Pemberdayaan UMKM Lokal Kelurahan Mallilingi",
      tanggal: "20 Juli 2026",
      kategori: "Pemberdayaan Ekonomi",
      gambar: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80",
      ringkasan: "Dalam rangka memajukan ekonomi warga, Kelurahan Mallilingi membuka pendataan katalog UMKM digital untuk mempromosikan produk lokal secara online.",
      isi: "Pemerintah Kelurahan Mallilingi berkomitmen mendorong daya saing produk lokal melalui pendataan dan promosi UMKM berbasis digital. Melalui program ini, usaha mikro dan kecil milik warga akan ditampilkan dalam katalog digital resmi kelurahan lengkap dengan tombol pemesanan langsung via WhatsApp."
    }
  ],

  umkm: [
    {
      id: "umkm-1",
      nama: "Keripik Pisang Khas Mallilingi",
      kategori: "Makanan & Minuman",
      pemilik: "Ibu Rahmawati",
      whatsapp: "6285255551234",
      alamat: "Jl. Sungai Calendu No. 12, RW 02 / RT 04, Mallilingi",
      deskripsi: "Keripik pisang olahan rumahan yang renyah dan gurih, dibuat dari pisang pilihan khas Bantaeng tanpa bahan pengawet.",
      foto: "https://images.unsplash.com/photo-1621996346565-e3d5d6281359?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "umkm-2",
      nama: "Kain Tenun & Kerajinan Tangan Mallilingi",
      kategori: "Kerajinan & Souvenir",
      pemilik: "Pak Rustam",
      whatsapp: "6285255551234",
      alamat: "Jl. Kartini No. 45, RW 01 / RT 02, Mallilingi",
      deskripsi: "Kerajinan tangan dan kain tenun tradisional berkualitas tinggi dengan motif khas yang anggun dan bernilai seni tinggi.",
      foto: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "umkm-3",
      nama: "Warung Kopi & Kuliner Tradisional Bantaeng",
      kategori: "Kuliner & Resto",
      pemilik: "Ibu Nurbaya",
      whatsapp: "6285255551234",
      alamat: "Jl. Merdeka No. 8, RW 03 / RT 01, Mallilingi",
      deskripsi: "Menyajikan aneka racikan kopi khas daerah dan kue-kue tradisional Sulawesi Selatan yang lezat dengan harga terjangkau.",
      foto: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80"
    }
  ],

  struktur: [
    { nama: "H. Andi Syamsul, S.Sos., M.Si.", jabatan: "Lurah Mallilingi", nip: "NIP. 19780512 200501 1 004", foto: "/assets/images/lurah.jpg" },
    { nama: "Rahmatia, S.AP.", jabatan: "Sekretaris Kelurahan", nip: "NIP. 19820315 200902 2 008", foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" },
    { nama: "Bachtiar, S.E.", jabatan: "Kasi Ketentraman & Ketertiban", nip: "NIP. 19850720 201101 1 012", foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" },
    { nama: "Hj. Mariani, S.P.", jabatan: "Kasi Perekonomian & PMK", nip: "NIP. 19801104 200604 2 005", foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80" },
    { nama: "Nurhalimah, S.Pd.", jabatan: "Kasi Kesejahteraan Rakyat", nip: "NIP. 19880910 201403 2 002", foto: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80" },
    { nama: "Drs. Muhammad Aris", jabatan: "Ketua LPM Mallilingi", nip: "Lembaga Masyarakat", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" },
    { nama: "Hj. Andi Tenri", jabatan: "Ketua TP PKK Mallilingi", nip: "Lembaga Masyarakat", foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80" },
    { nama: "Faisal Azis, S.T.", jabatan: "Ketua Karang Taruna", nip: "Lembaga Kepemudaan", foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" }
  ]
};

let supabaseClient: any = null;
if (SUPABASE_CONFIG.enabled && !SUPABASE_CONFIG.url.includes("your-project")) {
  try {
    supabaseClient = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
  } catch (e) {
    console.warn("Supabase client init fallback:", e);
  }
}

export async function getMallilingiDataAsync(): Promise<MallilingiData> {
  if (supabaseClient) {
    try {
      const [infoRes, beritaRes, umkmRes, layananRes] = await Promise.all([
        supabaseClient.from("info").select("*").single(),
        supabaseClient.from("berita").select("*").order("created_at", { ascending: false }),
        supabaseClient.from("umkm").select("*"),
        supabaseClient.from("layanan").select("*")
      ]);

      if (infoRes.data) {
        let infoObj = { ...DEFAULT_MALLILINGI_DATA.info, ...infoRes.data };
        if (typeof infoObj.misi === "string") {
          try { infoObj.misi = JSON.parse(infoObj.misi); } catch (e) { infoObj.misi = DEFAULT_MALLILINGI_DATA.info.misi; }
        }
        if (typeof infoObj.batasWilayah === "string") {
          try { infoObj.batasWilayah = JSON.parse(infoObj.batasWilayah); } catch (e) { infoObj.batasWilayah = DEFAULT_MALLILINGI_DATA.info.batasWilayah; }
        }

        let layananList = (layananRes.data || []).map((item: any) => {
          let persy = item.persyaratan;
          if (typeof persy === "string") {
            try { persy = JSON.parse(persy); } catch (e) { persy = []; }
          }
          return {
            ...item,
            persyaratan: Array.isArray(persy) ? persy : []
          };
        });

        return {
          info: infoObj,
          berita: (beritaRes.data && beritaRes.data.length > 0) ? beritaRes.data : DEFAULT_MALLILINGI_DATA.berita,
          umkm: (umkmRes.data && umkmRes.data.length > 0) ? umkmRes.data : DEFAULT_MALLILINGI_DATA.umkm,
          layanan: (layananList.length > 0) ? layananList : DEFAULT_MALLILINGI_DATA.layanan,
          struktur: DEFAULT_MALLILINGI_DATA.struktur
        };
      }
    } catch (err) {
      console.warn("Supabase async error, fallback to default:", err);
    }
  }
  return DEFAULT_MALLILINGI_DATA;
}

export async function saveMallilingiDataAsync(data: MallilingiData): Promise<void> {
  if (supabaseClient) {
    try {
      await Promise.all([
        supabaseClient.from("info").upsert({ id: 1, ...data.info }),
        supabaseClient.from("berita").upsert(data.berita),
        supabaseClient.from("umkm").upsert(data.umkm),
        supabaseClient.from("layanan").upsert(data.layanan)
      ]);
    } catch (e) {
      console.error("Supabase async save error:", e);
    }
  }
}
