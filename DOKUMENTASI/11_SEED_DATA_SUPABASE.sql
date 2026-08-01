-- ====================================================================
-- 1-CLICK SEED DATA SCRIPT FOR SUPABASE CLOUD DATABASE
-- Mengisi seluruh data dummy awal (Info, Berita, UMKM, Layanan) secara instan!
-- ====================================================================

-- 1. SEED TABEL INFO KELURAHAN
INSERT INTO public.info (
  id, nama, kecamatan, kabupaten, provinsi, kodePos, alamat, telepon, whatsapp, email, jamKerja,
  luasWilayah, jumlahPenduduk, jumlahKK, jumlahRT, jumlahRW, sambutanLurah, namaLurah, nipLurah, fotoLurah, fotoKantor, visi, misi, batasWilayah
) VALUES (
  1,
  'Kelurahan Mallilingi',
  'Kecamatan Bantaeng',
  'Kabupaten Bantaeng',
  'Sulawesi Selatan',
  '92411',
  'Jl. Sungai Calendu, Kel. Mallilingi, Kec. Bantaeng, Kab. Bantaeng, Sulawesi Selatan 92411',
  '(0413) 21001',
  '6285255551234',
  'kelurahan.mallilingi@bantaengkab.go.id',
  'Senin - Jumat: 08.00 - 16.00 WITA',
  '0.84 km²',
  '3.420 Jiwa',
  '890 KK',
  '12 RT',
  '4 RW',
  'Selamat Datang di Portal Resmi Kelurahan Mallilingi. Kami berkomitmen memberikan pelayanan publik yang terbuka, cepat, dan transparan bagi seluruh warga Mallilingi serta masyarakat luas. Melalui media informasi terintegrasi ini, kami berharap pelayanan publik dan potensi lokal Kelurahan Mallilingi semakin dekat dengan Anda.',
  'H. Andi Syamsul, S.Sos., M.Si.',
  '19780512 200501 1 004',
  'assets/images/lurah.jpg',
  'assets/images/kantor_kelurahan.jpg',
  'Mewujudkan Kelurahan Mallilingi yang Mandiri, Sejahtera, Berdaya Saing, dan Unggul dalam Pelayanan Publik Berbasis Teknologi dan Kearifan Lokal.',
  '["Meningkatkan kualitas pelayanan administrasi kependudukan yang ramah, cepat, dan transparan.", "Mengembangkan ekonomi kerakyatan melalui pemberdayaan UMKM dan potensi lokal masyarakat Mallilingi.", "Meningkatkan kualitas sarana, kebersihan, dan ketertiban lingkungan kelurahan.", "Mendorong partisipasi aktif warga dalam pembangunan melalui lembaga kemasyarakatan."]'::jsonb,
  '{"utara": "Desa Ulugalung", "timur": "Kelurahan Lembang", "selatan": "Kelurahan Letta", "barat": "Kelurahan Pallantikang"}'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  sambutanLurah = EXCLUDED.sambutanLurah,
  namaLurah = EXCLUDED.namaLurah,
  nipLurah = EXCLUDED.nipLurah;

-- 2. SEED TABEL BERITA & PENGUMUMAN
INSERT INTO public.berita (id, judul, tanggal, kategori, gambar, ringkasan, isi) VALUES
(
  'berita-1',
  'Peluncuran Portal Informasi & Pelayanan Digital Kelurahan Mallilingi',
  '1 Agustus 2026',
  'Pengumuman Resmi',
  'assets/images/kantor_kelurahan.jpg',
  'Pemerintah Kelurahan Mallilingi secara resmi meluncurkan portal informasi terpadu berbasis web untuk mempermudah warga dalam mengakses syarat pelayanan surat dan direktori UMKM.',
  'Pemerintah Kelurahan Mallilingi, Kecamatan Bantaeng secara resmi meluncurkan Portal Informasi Publik Terpadu. Platform ini dirancang untuk mewujudkan tata kelola kelurahan yang transparan, responsif, dan berbasis digital. Warga Mallilingi kini dapat melihat berbagai informasi pelayanan administrasi kependudukan, berita terkini kelurahan, serta katalog produk UMKM warga secara langsung dari smartphone.'
),
(
  'berita-2',
  'Kegiatan Kerja Bakti Lingkungan dan Penghijauan Wilayah RT/RW Mallilingi',
  '28 Juli 2026',
  'Kegiatan Warga',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
  'Warga Kelurahan Mallilingi bersama staf aparat kelurahan menggelar aksi gotong royong pembersihan drainase dan penanaman bibit pohon di sepanjang jalur utama.',
  'Semangat gotong royong kembali ditunjukkan oleh seluruh elemen warga Kelurahan Mallilingi. Bersama para pengurus RT/RW, LPM, Karang Taruna, serta jajaran staf kelurahan, warga berbondong-bondong melakukan kerja bakti pembersihan saluran air dan penanaman pohon pelindung untuk menciptakan lingkungan yang asri dan bebas banjir.'
),
(
  'berita-3',
  'Sosialisasi Pendataan & Pemberdayaan UMKM Lokal Kelurahan Mallilingi',
  '20 Juli 2026',
  'Pemberdayaan Ekonomi',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80',
  'Dalam rangka memajukan ekonomi warga, Kelurahan Mallilingi membuka pendataan katalog UMKM digital untuk mempromosikan produk lokal secara online.',
  'Pemerintah Kelurahan Mallilingi berkomitmen mendorong daya saing produk lokal melalui pendataan dan promosi UMKM berbasis digital. Melalui program ini, usaha mikro dan kecil milik warga akan ditampilkan dalam katalog digital resmi kelurahan lengkap dengan tombol pemesanan langsung via WhatsApp.'
) ON CONFLICT (id) DO NOTHING;

-- 3. SEED TABEL KATALOG UMKM WARGA
INSERT INTO public.umkm (id, nama, kategori, pemilik, whatsapp, alamat, deskripsi, foto) VALUES
(
  'umkm-1',
  'Keripik Pisang Khas Mallilingi',
  'Makanan & Minuman',
  'Ibu Rahmawati',
  '6285255551234',
  'Jl. Sungai Calendu No. 12, RW 02 / RT 04, Mallilingi',
  'Keripik pisang olahan rumahan yang renyah dan gurih, dibuat dari pisang pilihan khas Bantaeng tanpa bahan pengawet.',
  'https://images.unsplash.com/photo-1621996346565-e3d5d6281359?auto=format&fit=crop&w=400&q=80'
),
(
  'umkm-2',
  'Kain Tenun & Kerajinan Tangan Mallilingi',
  'Kerajinan & Souvenir',
  'Pak Rustam',
  '6285255551234',
  'Jl. Kartini No. 45, RW 01 / RT 02, Mallilingi',
  'Kerajinan tangan dan kain tenun tradisional berkualitas tinggi dengan motif khas yang anggun dan bernilai seni tinggi.',
  'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=400&q=80'
),
(
  'umkm-3',
  'Warung Kopi & Kuliner Tradisional Bantaeng',
  'Kuliner & Resto',
  'Ibu Nurbaya',
  '6285255551234',
  'Jl. Merdeka No. 8, RW 03 / RT 01, Mallilingi',
  'Menyajikan aneka racikan kopi khas daerah dan kue-kue tradisional Sulawesi Selatan yang lezat dengan harga terjangkau.',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80'
) ON CONFLICT (id) DO NOTHING;

-- 4. SEED TABEL LAYANAN SURAT KEPENDUDUKAN
INSERT INTO public.layanan (id, judul, kategori, waktu, biaya, persyaratan, alur) VALUES
(
  'layanan-1',
  'Surat Keterangan Tidak Mampu (SKTM)',
  'Sosial & Kesejahteraan',
  '15 - 30 Menit',
  'Gratis (Rp 0)',
  '["Fotokopi KTP Pemohon (1 lembar)", "Fotokopi Kartu Keluarga / KK (1 lembar)", "Surat Pengantar dari Ketua RT dan RW setempat", "Surat Pernyataan Tidak Mampu bermaterai 10.000"]'::jsonb,
  '1. Pemohon membawa berkas ke Kantor Kelurahan Mallilingi.\n2. Petugas melakukan verifikasi berkas.\n3. Lurah / Kasi Kessos menandatangani SKTM.\n4. Penyerahan dokumen ke pemohon.'
),
(
  'layanan-2',
  'Surat Keterangan Usaha (SKU)',
  'Ekonomi & Perizinan',
  '15 - 30 Menit',
  'Gratis (Rp 0)',
  '["Fotokopi KTP Pemilik Usaha (1 lembar)", "Fotokopi Kartu Keluarga / KK (1 lembar)", "Surat Pengantar RT/RW mengenai lokasi dan jenis usaha", "Foto tempat usaha / lokasi kegiatan usaha"]'::jsonb,
  '1. Pemohon menyerahkan berkas ke meja pelayanan kelurahan.\n2. Pemeriksaan kelengkapan dokumen dan keabsahan lokasi usaha.\n3. Penerbitan & penandatanganan SKU oleh Lurah.\n4. Pengambilan dokumen SKU.'
),
(
  'layanan-3',
  'Surat Keterangan Domisili Usaha / Perorangan',
  'Kependudukan',
  '15 - 30 Menit',
  'Gratis (Rp 0)',
  '["Fotokopi KTP & KK Pemohon", "Surat Pengantar dari Ketua RT & RW setempat", "Bukti kepemilikan/sewa tempat domisili (bila ada)"]'::jsonb,
  '1. Verifikasi berkas oleh petugas pelayanan kelurahan.\n2. Pencatatan domisili dalam buku registrasi kelurahan.\n3. Penandatanganan dokumen domisili oleh Lurah/Seklur.'
),
(
  'layanan-4',
  'Surat Pengantar Pengurusan KTP-el / KK',
  'Administrasi Kependudukan',
  '10 - 20 Menit',
  'Gratis (Rp 0)',
  '["Fotokopi Kartu Keluarga (KK) lama", "Surat Pengantar RT/RW", "Surat Keterangan Kehilangan dari Kepolisian (jika KTP/KK hilang)"]'::jsonb,
  '1. Pemeriksaan dokumen pengantar di kantor kelurahan.\n2. Penerbitan Surat Pengantar Resmi Kelurahan ke Kantor Disdukcapil Bantaeng.'
) ON CONFLICT (id) DO NOTHING;
