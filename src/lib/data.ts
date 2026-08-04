import { createClient } from "@supabase/supabase-js";
import { MallilingiData, PengaduanWarga } from "../types";

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
    email: "kelurahanmallilingi@gmail.com",
    jamKerja: "Senin - Jumat: 08.00 - 16.00 WITA",
    luasWilayah: "0.84 km²",
    jumlahPenduduk: "3.420 Jiwa",
    jumlahKK: "890 KK",
    jumlahRT: "25 RT",
    jumlahRW: "8 RW",
    sambutanLurah: "Selamat datang di portal resmi Kelurahan Mallilingi. Kami berkomitmen memberikan pelayanan publik yang ramah, transparan, cepat, dan mengayomi bagi seluruh masyarakat Kelurahan Mallilingi.",
    namaLurah: "ILHAM",
    nipLurah: "Kepala Kelurahan Mallilingi",
    fotoLurah: "/assets/images/lurah.jpg",
    fotoKantor: "/assets/images/kantor_kelurahan.jpg",
    visi: "Mengutamakan pelayanan kemandirian dan keamanan untuk kemajuan atas iman dan taqwa.",
    misi: [
      "Meningkatkan mutu pelayanan serta kualitas hidup masyarakat.",
      "Memperkuat lembaga-lembaga kemasyarakatan sebagai wadah untuk memotivasi masyarakat dalam meningkatkan partisipasinya.",
      "Mengendalikan sistem keamanan lingkungan ketertiban masyarakat.",
      "Menggalang potensi pemuda yang berhubungan dengan kemandirian dan kreatifitas, dalam rangka membangun ketegaran pemuda memasuki era globalisasi.",
      "Melibatkan sektor swasta dalam meningkatkan kemitraan."
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
      deskripsi: "Pengantar resmi bantuan sosial, beasiswa pendidikan, dan keringanan biaya pengobatan bagi keluarga prasejahtera.",
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
      judul: "Surat Keterangan Pindah / Pergi",
      kategori: "Kependudukan",
      waktu: "15 - 30 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Surat pengantar perpindahan domisili warga dari Kelurahan Mallilingi menuju daerah, kota, atau provinsi lain.",
      persyaratan: [
        "Kartu Keluarga (KK) Asli & Fotokopi",
        "Fotokopi KTP Pemohon",
        "Surat Pengantar Pindah dari RT/RW setempat",
        "Alamat Lengkap Tujuan Pindah"
      ],
      alur: "1. Verifikasi berkas di meja pelayanan kelurahan.\n2. Penerbitan Surat Pengantar Pindah Kelurahan untuk diteruskan ke Disdukcapil Bantaeng."
    },
    {
      id: "layanan-3",
      judul: "Surat Keterangan Hilang",
      kategori: "Administrasi Umum",
      waktu: "10 - 20 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Pengantar pengurusan dokumen atau barang berharga yang hilang untuk diteruskan ke Kepolisian setempat.",
      persyaratan: [
        "Fotokopi KTP / KK Pemohon",
        "Surat Pengantar dari RT/RW setempat",
        "Rincian dokumen/barang yang hilang beserta lokasi kejadian"
      ],
      alur: "1. Pelaporan barang/dokumen hilang di kelurahan.\n2. Verifikasi identitas pemohon.\n3. Penerbitan surat keterangan hilang kelurahan."
    },
    {
      id: "layanan-4",
      judul: "Surat Keterangan Menutup Jalan",
      kategori: "Ketertiban & Fasilitas Publik",
      waktu: "15 - 30 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Izin sementara penggunaan sebagian badan jalan untuk hajatan warga, resepsi nikah, atau kegiatan kemasyarakatan.",
      persyaratan: [
        "Fotokopi KTP Penanggung Jawab Acara",
        "Surat Pengantar & Persetujuan Warga/RT/RW setempat",
        "Denah lokasi penutupan jalan dan rute pengalihan arus"
      ],
      alur: "1. Pemohon membawa berkas persetujuan warga setempat.\n2. Pemeriksaan kelayakan lokasi oleh Kasi Trantib.\n3. Penerbitan surat rekomendasi kelurahan."
    },
    {
      id: "layanan-5",
      judul: "Surat Rekomendasi Nikah",
      kategori: "Administrasi Nikah",
      waktu: "20 - 40 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Rekomendasi resmi kelurahan bagi warga Mallilingi yang akan melangsungkan pernikahan di luar wilayah Bantaeng.",
      persyaratan: [
        "Fotokopi KTP & KK Calon Pengantin",
        "Surat Pengantar RT/RW setempat",
        "Fotokopi Akta Kelahiran & Ijazah Terakhir",
        "Pasfoto 2x3 dan 3x4 Latar Biru (4 lembar)"
      ],
      alur: "1. Pemeriksaan berkas di kantor kelurahan.\n2. Penerbitan Surat Rekomendasi Nikah Kelurahan ke KUA asal/tujuan."
    },
    {
      id: "layanan-6",
      judul: "Surat Pengantar NA (Nikah / N1-N4)",
      kategori: "Administrasi Nikah",
      waktu: "20 - 40 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Formulir kelengkapan administrasi calon pengantin (N1 - N4) untuk pendaftaran resmi di KUA Kecamatan Bantaeng.",
      persyaratan: [
        "Fotokopi KTP & KK Pasangan Calon Pengantin",
        "Fotokopi Akta Kelahiran & Ijazah",
        "Surat Pengantar RT/RW",
        "Imunisasi TT bagi calon pengantin wanita"
      ],
      alur: "1. Penyerahan dokumen ke bagian pelayanan.\n2. Pengisian formulir N1, N2, N3, N4.\n3. Penandatanganan oleh Lurah Mallilingi."
    },
    {
      id: "layanan-7",
      judul: "Surat Keterangan Akta Kelahiran",
      kategori: "Kependudukan",
      waktu: "15 - 30 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Pengantar pelaporan kelahiran anak baru lahir untuk penambahan di KK dan penerbitan Akta Kelahiran Disdukcapil.",
      persyaratan: [
        "Surat Keterangan Lahir dari Bidan / Rumah Sakit",
        "Fotokopi KTP Ayah & Ibu",
        "Fotokopi Buku Nikah Orang Tua",
        "Fotokopi Kartu Keluarga (KK)"
      ],
      alur: "1. Pelaporan kelahiran oleh orang tua/keluarga.\n2. Verifikasi data bayi dan KK.\n3. Penerbitan Surat Keterangan Kelahiran."
    },
    {
      id: "layanan-8",
      judul: "Surat Keterangan Izin Keramaian",
      kategori: "Ketertiban & Ketentraman",
      waktu: "15 - 30 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Pengantar pelaksanaan acara atau hajatan warga yang melibatkan kerumunan massa untuk diteruskan ke Kepolisian.",
      persyaratan: [
        "Fotokopi KTP Ketua Panitia / Penanggung Jawab",
        "Surat Pengantar RT/RW setempat",
        "Rincian susunan acara dan jumlah perkiraan undangan"
      ],
      alur: "1. Pemeriksaan permohonan izin keramaian.\n2. Rekomendasi dari Kasi Trantib Kelurahan.\n3. Penerbitan Surat Keterangan Izin Keramaian."
    },
    {
      id: "layanan-9",
      judul: "Surat Keterangan Domisili",
      kategori: "Kependudukan",
      waktu: "15 - 30 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Konfirmasi resmi domisili tempat tinggal perorangan, kantor usaha, atau lembaga di Kelurahan Mallilingi.",
      persyaratan: [
        "Fotokopi KTP & KK Pemohon",
        "Surat Pengantar RT/RW setempat",
        "Bukti kepemilikan/sewa tempat domisili (bila ada)"
      ],
      alur: "1. Verifikasi berkas oleh petugas kelurahan.\n2. Pencatatan domisili dalam buku buku kelurahan.\n3. Penandatanganan oleh Lurah/Seklur."
    },
    {
      id: "layanan-10",
      judul: "Surat Pengantar Ahli Waris",
      kategori: "Hukum & Pertanahan",
      waktu: "30 - 60 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Penerbitan surat keterangan silsilah dan kesepakatan seluruh ahli waris atas almarhum/almarhumah.",
      persyaratan: [
        "Fotokopi Surat Kematian Almarhum/Almarhumah",
        "Fotokopi KTP & KK Seluruh Ahli Waris",
        "Fotokopi Buku Nikah Almarhum/Almarhumah",
        "Surat Pernyataan Ahli Waris diketahui RT/RW & Materai 10.000"
      ],
      alur: "1. Penyerahan draf pernyataan ahli waris lengkap.\n2. Verifikasi saksi-saksi dan keabsahan silsilah waris.\n3. Penandatanganan dan pengesahan Lurah Mallilingi."
    },
    {
      id: "layanan-11",
      judul: "Surat Keterangan Usaha (SKU)",
      kategori: "Ekonomi & Perizinan",
      waktu: "15 - 30 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Pengesahan resmi legalitas dan keberadaan lokasi usaha warga untuk pengajuan KUR perbankan & izin usaha.",
      persyaratan: [
        "Fotokopi KTP Pemilik Usaha",
        "Fotokopi Kartu Keluarga (KK)",
        "Surat Pengantar RT/RW lokasi usaha",
        "Foto tempat kegiatan usaha"
      ],
      alur: "1. Verifikasi dokumen dan jenis usaha.\n2. Pencatatan registrasi SKU kelurahan.\n3. Penandatanganan SKU oleh Lurah."
    },
    {
      id: "layanan-12",
      judul: "Surat Pengantar Kartu Keluarga (KK)",
      kategori: "Kependudukan",
      waktu: "10 - 20 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Pengantar pengajuan KK baru, penambahan/pengurangan anggota keluarga, atau penggantian KK yang rusak/hilang.",
      persyaratan: [
        "Fotokopi KK Lama / Surat Kehilangan (jika hilang)",
        "Surat Pengantar RT/RW setempat",
        "Fotokopi KTP / Akta Kelahiran anggota baru"
      ],
      alur: "1. Pemeriksaan berkas dan data KK.\n2. Penerbitan Surat Pengantar Resmi ke Disdukcapil Bantaeng."
    },
    {
      id: "layanan-13",
      judul: "Surat Pengantar Penguburan",
      kategori: "Sosial & Kependudukan",
      waktu: "10 - 20 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Surat izin penguburan dan penggunaan lahan TPU bagi warga almarhum/almarhumah yang meninggal dunia.",
      persyaratan: [
        "Surat Keterangan Meninggal dari RS / Dokter / RT/RW",
        "Fotokopi KTP & KK Almarhum/Almarhumah",
        "Fotokopi KTP Pelapor/Penanggung Jawab"
      ],
      alur: "1. Pelaporan peristiwa kematian oleh keluarga.\n2. Penerbitan Surat Pengantar Penguburan darurat/seketika."
    },
    {
      id: "layanan-14",
      judul: "Rekomendasi BBM (Bahan Bakar Minyak)",
      kategori: "Ekonomi & Pertanian",
      waktu: "15 - 30 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Rekomendasi pengisian BBM bersubsidi (Solar/Pertalite) bagi pelaku usaha mikro, nelayan, dan mesin pertanian.",
      persyaratan: [
        "Fotokopi KTP Pemohon Usaha/Tani/Ternak",
        "Surat Keterangan Usaha (SKU) aktif",
        "Foto mesin/alat produksi pertanian/perikanan/mikro",
        "Surat Pengantar RT/RW setempat"
      ],
      alur: "1. Verifikasi kepemilikan alat/mesin usaha.\n2. Penentuan alokasi kuota kebutuhan mingguan.\n3. Penerbitan Surat Rekomendasi Pembelian BBM Subsidi."
    },
    {
      id: "layanan-15",
      judul: "Surat Keterangan Pindah Datang",
      kategori: "Kependudukan",
      waktu: "15 - 30 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Penerimaan resmi pendaftaran domisili warga baru yang pindah masuk ke wilayah Kelurahan Mallilingi.",
      persyaratan: [
        "Surat Keterangan Pindah (SKPWNI) dari daerah asal",
        "Fotokopi KTP & KK Tujuan Pindah",
        "Surat Pengantar Penerimaan dari RT/RW setempat"
      ],
      alur: "1. Penyerahan berkas pindah masuk.\n2. Verifikasi alamat RT/RW tujuan.\n3. Penerbitan Surat Keterangan Pindah Datang Kelurahan."
    },
    {
      id: "layanan-16",
      judul: "Surat Keterangan Kematian",
      kategori: "Kependudukan",
      waktu: "15 - 30 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Pelaporan resmi kematian warga untuk penyesuaian data KK, penetapan status waris, dan Akta Kematian.",
      persyaratan: [
        "Surat Keterangan Meninggal dari RS / Puskesmas / Bidan",
        "Surat Pengantar RT/RW setempat",
        "KTP & KK Asli Almarhum/Almarhumah",
        "Fotokopi KTP Pelapor"
      ],
      alur: "1. Pemeriksaan dokumen pelaporan kematian.\n2. Pencatatan pada Buku Induk Kematian Kelurahan.\n3. Penerbitan Surat Keterangan Kematian."
    },
    {
      id: "layanan-17",
      judul: "Surat Pengantar SKCK",
      kategori: "Administrasi Umum",
      waktu: "10 - 20 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Pengantar resmi pembuatan Surat Keterangan Catatan Kepolisian (SKCK) di Polsek / Polres Bantaeng.",
      persyaratan: [
        "Fotokopi KTP Pemohon (1 lembar)",
        "Fotokopi Kartu Keluarga (1 lembar)",
        "Surat Pengantar Kelakuan Baik dari RT/RW",
        "Pasfoto 4x6 Latar Merah (2 lembar)"
      ],
      alur: "1. Verifikasi catatan kependudukan pemohon.\n2. Penerbitan Surat Pengantar SKCK Kelurahan."
    },
    {
      id: "layanan-18",
      judul: "Surat Keterangan Belum Menikah",
      kategori: "Kependudukan",
      waktu: "15 - 30 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Surat pernyataan resmi status lajang / belum pernah menikah untuk keperluan lamaran kerja, beasiswa, atau KPR.",
      persyaratan: [
        "Fotokopi KTP & KK Pemohon",
        "Surat Pengantar RT/RW setempat",
        "Surat Pernyataan Belum Menikah bermaterai 10.000"
      ],
      alur: "1. Pemeriksaan data status pernikahan di buku kelurahan.\n2. Penandatanganan Surat Keterangan Belum Menikah."
    },
    {
      id: "layanan-19",
      judul: "Pengantar Hewan",
      kategori: "Peternakan & Perdagangan",
      waktu: "15 - 30 Menit",
      biaya: "Gratis (Rp 0)",
      deskripsi: "Surat pengantar lalulintas / pengangkutan hewan ternak (sapi, kambing, ungsa, dll) keluar atau masuk wilayah.",
      persyaratan: [
        "Fotokopi KTP Pemilik / Pengangkut Hewan Ternak",
        "Surat Keterangan Kesehatan Hewan dari Dinas Pertanian/Peternakan",
        "Surat Pengantar RT/RW kepemilikan hewan ternak",
        "Rincian jumlah & jenis hewan ternak"
      ],
      alur: "1. Pemeriksaan bukti kepemilikan hewan ternak.\n2. Verifikasi dokumen kesehatan hewan.\n3. Penerbitan Surat Pengantar Lalulintas Ternak Kelurahan."
    }
  ],

  berita: [
    {
      id: "berita-1",
      judul: "Peluncuran Portal Informasi & Pelayanan Digital Kelurahan Mallilingi",
      tanggal: "1 Agustus 2026",
      kategori: "Pengumuman Resmi",
      gambar: "/assets/images/kantor_kelurahan.jpg",
      ringkasan: "Pemerintah Kelurahan Mallilingi secara resmi meluncurkan portal informasi terpadu berbasis web untuk mempermudah warga dalam mengakses syarat pelayanan surat.",
      isi: "Pemerintah Kelurahan Mallilingi, Kecamatan Bantaeng secara resmi meluncurkan Portal Informasi Publik Terpadu. Platform ini dirancang untuk mewujudkan tata kelola kelurahan yang transparan, responsif, dan berbasis digital. Warga Mallilingi kini dapat melihat berbagai informasi pelayanan administrasi kependudukan dan berita terkini kelurahan secara langsung dari smartphone."
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
      judul: "Sosialisasi Pendataan & Pelayanan Publik Digital Kelurahan Mallilingi",
      tanggal: "20 Juli 2026",
      kategori: "Pemberdayaan Masyarakat",
      gambar: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80",
      ringkasan: "Dalam rangka meningkatkan mutu layanan warga, Kelurahan Mallilingi membuka sosialisasi tata cara pengajuan surat administrasi secara online.",
      isi: "Pemerintah Kelurahan Mallilingi berkomitmen mendorong mutu pelayanan publik berbasis digital. Melalui program ini, syarat dan alur pengurusan 19 dokumen kependudukan dapat diakses warga dengan cepat, jelas, dan transparan."
    }
  ],

  struktur: [
    // Pimpinan & Sekretariat
    { nama: "ILHAM", jabatan: "Kepala Kelurahan Mallilingi", nip: "-", foto: "/assets/images/default_profile.jpg" },
    { nama: "YUDHIE YUDHA DHARMA, A.Md", jabatan: "Sekretaris Kelurahan", nip: "NIP. 19750315 200904 1 003", foto: "/assets/images/default_profile.jpg" },
    { nama: "NURAENI", jabatan: "Staf Sekretariat", nip: "-", foto: "/assets/images/default_profile.jpg" },
    { nama: "AGUS SALIM, SM", jabatan: "Staf Sekretariat", nip: "-", foto: "/assets/images/default_profile.jpg" },

    // Seksi Pemerintahan
    { nama: "FITRIAH, S.E", jabatan: "Kasi Pemerintahan", nip: "NIP. 19780830 201212 2 001", foto: "/assets/images/default_profile.jpg" },
    { nama: "SYAHRIR", jabatan: "Staf Seksi Pemerintahan (PNS)", nip: "NIP. 19670815 200604 1 011", foto: "/assets/images/default_profile.jpg" },
    { nama: "ANANG ADENANGST DJALIL", jabatan: "Staf Seksi Pemerintahan (PNS)", nip: "NIP. 19800526 200502 1 001", foto: "/assets/images/default_profile.jpg" },
    { nama: "FATIMAH", jabatan: "Staf Seksi Pemerintahan", nip: "-", foto: "/assets/images/default_profile.jpg" },
    { nama: "M. RUSDY", jabatan: "Staf Seksi Pemerintahan", nip: "-", foto: "/assets/images/default_profile.jpg" },
    { nama: "AKHMAD HARIS", jabatan: "Staf Seksi Pemerintahan", nip: "-", foto: "/assets/images/default_profile.jpg" },

    // Seksi Pelayanan Umum
    { nama: "FITRIANI, SE", jabatan: "Kasi Pelayanan Umum", nip: "NIP. 19850723 200903 2 011", foto: "/assets/images/default_profile.jpg" },
    { nama: "NURAENI", jabatan: "Staf Pelayanan Umum (PNS)", nip: "NIP. 19810531 201212 2 002", foto: "/assets/images/default_profile.jpg" },
    { nama: "HUDAEDAH S", jabatan: "Staf Pelayanan Umum", nip: "-", foto: "/assets/images/default_profile.jpg" },
    { nama: "HALIMAH", jabatan: "Staf Pelayanan Umum", nip: "-", foto: "/assets/images/default_profile.jpg" },
    { nama: "ROSMITA", jabatan: "Staf Pelayanan Umum", nip: "-", foto: "/assets/images/default_profile.jpg" },
    { nama: "A. NURSYANTI", jabatan: "Staf Pelayanan Umum", nip: "-", foto: "/assets/images/default_profile.jpg" },

    // Seksi Pembangunan & Pemberdayaan Masyarakat
    { nama: "A. ERNAWATI", jabatan: "Staf Seksi Pembangunan & PM", nip: "-", foto: "/assets/images/default_profile.jpg" },
    { nama: "SYAMSURYANTI", jabatan: "Staf Seksi Pembangunan & PM", nip: "-", foto: "/assets/images/default_profile.jpg" },
    { nama: "NASTRI", jabatan: "Staf Seksi Pembangunan & PM", nip: "-", foto: "/assets/images/default_profile.jpg" },
    { nama: "IRAWATI", jabatan: "Staf Seksi Pembangunan & PM", nip: "-", foto: "/assets/images/default_profile.jpg" },

    // Unsur Keamanan & LPM
    { nama: "Sertu Akhmad Panisi", jabatan: "Babinsa Mallilingi", nip: "TNI AD / Babinsa", foto: "/assets/images/default_profile.jpg" },
    { nama: "Arwan Hamid", jabatan: "Binmas / Bhabinkamtibmas", nip: "Polri / Binmas", foto: "/assets/images/default_profile.jpg" },
    { nama: "A. Rahman AB, S.Ilkom", jabatan: "Ketua LPM Mallilingi", nip: "LPM Mallilingi", foto: "/assets/images/default_profile.jpg" },
    { nama: "Muh. Alwih", jabatan: "Anggota LPM Mallilingi", nip: "LPM Mallilingi", foto: "/assets/images/default_profile.jpg" }
  ],

  pengaduan: [
    {
      id: "aduan-1",
      tanggal: "03 Agustus 2026",
      nama: "Ahmad Hidayat",
      nik: "7303011504880001",
      telepon: "6281234567890",
      kategori: "Infrastruktur & Jalan",
      judul: "Saluran Air Tersumbat di Jalan Calendu RW 002",
      isi: "Mohon bantuan petugas kelurahan untuk membersihkan drainase/saluran air di dekat perempatan RT 002 RW 002 yang tersumbat agar tidak menyebabkan genangan air.",
      status: "Baru"
    },
    {
      id: "aduan-2",
      tanggal: "01 Agustus 2026",
      nama: "Nurhalimah",
      nik: "7303015809920003",
      telepon: "6285299887766",
      kategori: "Pelayanan Kependudukan",
      judul: "Konsultasi Persyaratan Pengurusan SKTM",
      isi: "Apakah pengurusan SKTM untuk keringanan biaya rumah sakit dapat diwakilkan oleh anggota keluarga yang terdaftar dalam 1 KK?",
      status: "Proses"
    },
    {
      id: "aduan-3",
      tanggal: "28 Juli 2026",
      nama: "Baharuddin",
      nik: "7303011210750002",
      telepon: "6282111223344",
      kategori: "Kebersihan & Saluran Air",
      judul: "Pengangkutan Sampah di Wilayah RW 005",
      isi: "Terima kasih atas tindak lanjut armada kebersihan yang telah mengangkut tumpukan sampah di tempat penampungan sementara RW 005.",
      status: "Selesai"
    }
  ]
};

export const DEFAULT_RW_RT_LIST = [
  {
    rw: "RW 001",
    ketua: "Haeruddin",
    rtList: [
      { rt: "RT 001", nama: "Samsir" },
      { rt: "RT 002", nama: "Abd. Latif" },
      { rt: "RT 003", nama: "Awaluddin H.A" }
    ]
  },
  {
    rw: "RW 002",
    ketua: "A. Nur Alam Samad",
    rtList: [
      { rt: "RT 001", nama: "Parwan" },
      { rt: "RT 002", nama: "M. Ali R" },
      { rt: "RT 003", nama: "Andi Amir" }
    ]
  },
  {
    rw: "RW 003",
    ketua: "M. Djafar",
    rtList: [
      { rt: "RT 001", nama: "Hasan Ranja" },
      { rt: "RT 002", nama: "Ahmad Ikbal" },
      { rt: "RT 003", nama: "Wawan Rahmat" }
    ]
  },
  {
    rw: "RW 004",
    ketua: "Saharuddin Umar",
    rtList: [
      { rt: "RT 001", nama: "M. Arif" },
      { rt: "RT 002", nama: "A. Noor Ilham Rahmat" },
      { rt: "RT 003", nama: "Syamsir Umar" }
    ]
  },
  {
    rw: "RW 005",
    ketua: "Ar Sakbir Jepsah",
    rtList: [
      { rt: "RT 001", nama: "Ar Rosmah Jepsah" },
      { rt: "RT 002", nama: "Lahamuddin" },
      { rt: "RT 003", nama: "Saparuddin" }
    ]
  },
  {
    rw: "RW 006",
    ketua: "A. Amri Langgara (Kr. Bambi)",
    rtList: [
      { rt: "RT 001", nama: "Marniati" },
      { rt: "RT 002", nama: "Nurjannah" },
      { rt: "RT 003", nama: "Abd. Wahid Saad" }
    ]
  },
  {
    rw: "RW 007",
    ketua: "Sukri Anwar",
    rtList: [
      { rt: "RT 001", nama: "Saharuddin" },
      { rt: "RT 002", nama: "Ahmad Sewan" },
      { rt: "RT 003", nama: "Muchtar" }
    ]
  },
  {
    rw: "RW 008",
    ketua: "Haeruddin",
    rtList: [
      { rt: "RT 001", nama: "Muh Nasir" },
      { rt: "RT 002", nama: "St Nurhikmah" },
      { rt: "RT 003", nama: "Ancu" },
      { rt: "RT 004", nama: "Mursalim" }
    ]
  }
];

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
      const [infoRes, beritaRes, layananRes, strukturRes, pengaduanRes, rwRtRes] = await Promise.all([
        supabaseClient.from("info").select("*").single(),
        supabaseClient.from("berita").select("*").order("created_at", { ascending: false }),
        supabaseClient.from("layanan").select("*"),
        supabaseClient.from("struktur").select("*"),
        supabaseClient.from("pengaduan").select("*").order("created_at", { ascending: false }),
        supabaseClient.from("rw_rt_list").select("*")
      ]);

      if (infoRes.data) {
        let rawInfo = infoRes.data;
        let infoObj = {
          ...DEFAULT_MALLILINGI_DATA.info,
          ...rawInfo,
          kodePos: rawInfo.kodePos || rawInfo.kodepos || rawInfo.kode_pos || DEFAULT_MALLILINGI_DATA.info.kodePos,
          namaLurah: rawInfo.namaLurah || rawInfo.namalurah || rawInfo.nama_lurah || DEFAULT_MALLILINGI_DATA.info.namaLurah,
          nipLurah: rawInfo.nipLurah || rawInfo.niplurah || rawInfo.nip_lurah || DEFAULT_MALLILINGI_DATA.info.nipLurah,
          fotoLurah: rawInfo.fotoLurah || rawInfo.fotolurah || rawInfo.foto_lurah || DEFAULT_MALLILINGI_DATA.info.fotoLurah,
          sambutanLurah: rawInfo.sambutanLurah || rawInfo.sambutanlurah || rawInfo.sambutan_lurah || DEFAULT_MALLILINGI_DATA.info.sambutanLurah,
          luasWilayah: rawInfo.luasWilayah || rawInfo.luaswilayah || rawInfo.luas_wilayah || DEFAULT_MALLILINGI_DATA.info.luasWilayah,
          jumlahPenduduk: rawInfo.jumlahPenduduk || rawInfo.jumlahpenduduk || rawInfo.jumlah_penduduk || DEFAULT_MALLILINGI_DATA.info.jumlahPenduduk,
          jumlahKK: rawInfo.jumlahKK || rawInfo.jumlahkk || rawInfo.jumlah_kk || DEFAULT_MALLILINGI_DATA.info.jumlahKK,
          jumlahRT: rawInfo.jumlahRT || rawInfo.jumlahrt || rawInfo.jumlah_rt || DEFAULT_MALLILINGI_DATA.info.jumlahRT,
          jumlahRW: rawInfo.jumlahRW || rawInfo.jumlahrw || rawInfo.jumlah_rw || DEFAULT_MALLILINGI_DATA.info.jumlahRW,
          jamKerja: rawInfo.jamKerja || rawInfo.jamkerja || rawInfo.jam_kerja || DEFAULT_MALLILINGI_DATA.info.jamKerja,
        };

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
          layanan: (layananList.length > 0) ? layananList : DEFAULT_MALLILINGI_DATA.layanan,
          struktur: (strukturRes.data && strukturRes.data.length > 0) ? strukturRes.data : DEFAULT_MALLILINGI_DATA.struktur,
          pengaduan: (pengaduanRes.data && pengaduanRes.data.length > 0) ? pengaduanRes.data : DEFAULT_MALLILINGI_DATA.pengaduan,
          rwRtList: (rwRtRes.data && rwRtRes.data.length > 0) ? rwRtRes.data : DEFAULT_RW_RT_LIST
        };
      }
    } catch (err) {
      console.warn("Supabase async error, fallback to default seed dataset:", err);
    }
  }
  return {
    ...DEFAULT_MALLILINGI_DATA,
    rwRtList: DEFAULT_RW_RT_LIST
  };
}

export async function saveMallilingiDataAsync(data: MallilingiData): Promise<void> {
  if (supabaseClient) {
    try {
      await Promise.all([
        supabaseClient.from("info").upsert({ id: 1, ...data.info }),
        supabaseClient.from("berita").upsert(data.berita),
        supabaseClient.from("layanan").upsert(data.layanan),
        supabaseClient.from("struktur").upsert(data.struktur),
        supabaseClient.from("pengaduan").upsert(data.pengaduan)
      ]);
    } catch (e) {
      console.error("Supabase async save error:", e);
    }
  }
}

export async function sendPengaduanWargaAsync(aduan: { nama: string; telepon: string; kategori: string; judul: string; isi: string }): Promise<boolean> {
  const newAduan: PengaduanWarga = {
    id: `aduan-${Date.now()}`,
    tanggal: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }),
    nama: aduan.nama,
    nik: "-",
    telepon: aduan.telepon,
    kategori: aduan.kategori,
    judul: aduan.judul,
    isi: aduan.isi,
    status: "Baru"
  };

  if (supabaseClient) {
    try {
      const { error } = await supabaseClient.from("pengaduan").insert([newAduan]);
      if (error) console.error("Error inserting pengaduan to Supabase:", error);
    } catch (e) {
      console.error("Supabase insert pengaduan error:", e);
    }
  }

  DEFAULT_MALLILINGI_DATA.pengaduan = [newAduan, ...(DEFAULT_MALLILINGI_DATA.pengaduan || [])];
  return true;
}
