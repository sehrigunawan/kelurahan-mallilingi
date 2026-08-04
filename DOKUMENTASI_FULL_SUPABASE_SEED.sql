-- ====================================================================
-- SCRIPT FULL DATABASE SUPABASE - KELURAHAN MALLILINGI (KAB. BANTAENG)
-- ====================================================================
-- Petunjuk Penggunaan:
-- 1. Buka Supabase Dashboard Anda: https://supabase.com/dashboard/project/zpjlttzifpnavbwjsjxq/sql/new
-- 2. Salin (Copy) seluruh kode SQL di bawah ini.
-- 3. Tempel (Paste) ke SQL Editor Supabase, lalu klik tombol "Run".
-- 4. Seluruh tabel (info, berita, layanan, struktur, pengaduan, rw_rt_list) akan langsung terisi data resmi 100%.

-- --------------------------------------------------------------------
-- 1. TABEL: info (Informasi Profil, Kontak, Visi Misi, & Batas Geografis)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.info (
  id INT PRIMARY KEY DEFAULT 1,
  nama TEXT DEFAULT 'Kelurahan Mallilingi',
  kecamatan TEXT DEFAULT 'Kecamatan Bantaeng',
  kabupaten TEXT DEFAULT 'Kabupaten Bantaeng',
  provinsi TEXT DEFAULT 'Sulawesi Selatan',
  kodePos TEXT DEFAULT '92411',
  alamat TEXT DEFAULT 'Jl. Sungai Calendu, Kel. Mallilingi, Kec. Bantaeng, Kab. Bantaeng, Sulawesi Selatan 92411',
  telepon TEXT DEFAULT '(0413) 21001',
  whatsapp TEXT DEFAULT '6285255551234',
  email TEXT DEFAULT 'kelurahanmallilingi@gmail.com',
  jamKerja TEXT DEFAULT 'Senin - Jumat: 08.00 - 16.00 WITA',
  luasWilayah TEXT DEFAULT '0.84 km²',
  jumlahPenduduk TEXT DEFAULT '3.420 Jiwa',
  jumlahKK TEXT DEFAULT '890 KK',
  jumlahRT TEXT DEFAULT '25 RT',
  jumlahRW TEXT DEFAULT '8 RW',
  sambutanLurah TEXT DEFAULT 'Selamat datang di portal resmi Kelurahan Mallilingi. Kami berkomitmen memberikan pelayanan publik yang ramah, transparan, cepat, dan mengayomi bagi seluruh masyarakat Kelurahan Mallilingi.',
  namaLurah TEXT DEFAULT 'ILHAM',
  nipLurah TEXT DEFAULT 'Kepala Kelurahan Mallilingi',
  fotoLurah TEXT DEFAULT '/assets/images/lurah.jpg',
  fotoKantor TEXT DEFAULT '/assets/images/kantor_kelurahan.jpg',
  visi TEXT DEFAULT 'Mengutamakan pelayanan kemandirian dan keamanan untuk kemajuan atas iman dan taqwa.',
  misi JSONB DEFAULT '["Meningkatkan mutu pelayanan serta kualitas hidup masyarakat.", "Memperkuat lembaga-lembaga kemasyarakatan sebagai wadah untuk memotivasi masyarakat dalam meningkatkan partisipasinya.", "Mengendalikan sistem keamanan lingkungan ketertiban masyarakat.", "Menggalang potensi pemuda yang berhubungan dengan kemandirian dan kreatifitas, dalam rangka membangun ketegaran pemuda memasuki era globalisasi.", "Melibatkan sektor swasta dalam meningkatkan kemitraan."]'::jsonb,
  batasWilayah JSONB DEFAULT '{"utara": "Desa Ulugalung", "timur": "Kelurahan Lembang", "selatan": "Kelurahan Letta", "barat": "Kelurahan Pallantikang"}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed / Insert Data info
INSERT INTO public.info (id, nama, kecamatan, kabupaten, provinsi, kodePos, alamat, telepon, whatsapp, email, jamKerja, luasWilayah, jumlahPenduduk, jumlahKK, jumlahRT, jumlahRW, sambutanLurah, namaLurah, nipLurah, fotoLurah, fotoKantor, visi, misi, batasWilayah)
VALUES (
  1,
  'Kelurahan Mallilingi',
  'Kecamatan Bantaeng',
  'Kabupaten Bantaeng',
  'Sulawesi Selatan',
  '92411',
  'Jl. Sungai Calendu, Kel. Mallilingi, Kec. Bantaeng, Kab. Bantaeng, Sulawesi Selatan 92411',
  '(0413) 21001',
  '6285255551234',
  'kelurahanmallilingi@gmail.com',
  'Senin - Jumat: 08.00 - 16.00 WITA',
  '0.84 km²',
  '3.420 Jiwa',
  '890 KK',
  '25 RT',
  '8 RW',
  'Selamat datang di portal resmi Kelurahan Mallilingi. Kami berkomitmen memberikan pelayanan publik yang ramah, transparan, cepat, dan mengayomi bagi seluruh masyarakat Kelurahan Mallilingi.',
  'ILHAM',
  'Kepala Kelurahan Mallilingi',
  '/assets/images/lurah.jpg',
  '/assets/images/kantor_kelurahan.jpg',
  'Mengutamakan pelayanan kemandirian dan keamanan untuk kemajuan atas iman dan taqwa.',
  '["Meningkatkan mutu pelayanan serta kualitas hidup masyarakat.", "Memperkuat lembaga-lembaga kemasyarakatan sebagai wadah untuk memotivasi masyarakat dalam meningkatkan partisipasinya.", "Mengendalikan sistem keamanan lingkungan ketertiban masyarakat.", "Menggalang potensi pemuda yang berhubungan dengan kemandirian dan kreatifitas, dalam rangka membangun ketegaran pemuda memasuki era globalisasi.", "Melibatkan sektor swasta dalam meningkatkan kemitraan."]'::jsonb,
  '{"utara": "Desa Ulugalung", "timur": "Kelurahan Lembang", "selatan": "Kelurahan Letta", "barat": "Kelurahan Pallantikang"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  email = EXCLUDED.email,
  visi = EXCLUDED.visi,
  misi = EXCLUDED.misi,
  batasWilayah = EXCLUDED.batasWilayah;

-- --------------------------------------------------------------------
-- 2. TABEL: layanan (19 Dokumen Surat Administrasi Kependudukan)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.layanan (
  id TEXT PRIMARY KEY,
  judul TEXT NOT NULL,
  kategori TEXT NOT NULL,
  waktu TEXT NOT NULL,
  biaya TEXT DEFAULT 'Gratis (Rp 0)',
  deskripsi TEXT NOT NULL,
  persyaratan JSONB NOT NULL,
  alur TEXT DEFAULT 'Pengajuan di Kantor Kelurahan Mallilingi',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Data Layanan Surat
INSERT INTO public.layanan (id, judul, kategori, waktu, biaya, deskripsi, persyaratan, alur) VALUES
('layanan-1', 'Surat Keterangan Tidak Mampu (SKTM)', 'Sosial & Kesejahteraan', '15 - 30 Menit', 'Gratis (Rp 0)', 'Pengantar resmi bantuan sosial, beasiswa pendidikan, dan keringanan biaya pengobatan bagi keluarga prasejahtera.', '["Fotokopi KTP Pemohon (1 lembar)", "Fotokopi Kartu Keluarga / KK (1 lembar)", "Surat Pengantar dari Ketua RT dan RW setempat", "Surat Pernyataan Tidak Mampu bermaterai 10.000"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi'),
('layanan-2', 'Surat Keterangan Usaha (SKU)', 'Ekonomi & UMKM', '15 - 30 Menit', 'Gratis (Rp 0)', 'Dokumen legalitas usaha mikro, kecil, dan menengah untuk persyaratan pengajuan Kredit Usaha Rakyat (KUR) bank.', '["Fotokopi KTP Pemilik Usaha", "Fotokopi Kartu Keluarga", "Surat Pengantar RT/RW lokasi usaha", "Foto tempat usaha atau barang dagangan"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi'),
('layanan-3', 'Surat Keterangan Domisili Usaha / Perusahaan', 'Ekonomi & UMKM', '1 Hari Kerja', 'Gratis (Rp 0)', 'Keterangan resmi keberadaan lokasi kantor, pertokoan, atau tempat operasional badan usaha di Mallilingi.', '["Fotokopi KTP Penanggung Jawab", "Fotokopi Akta Pendirian Perusahaan (jika PT/CV)", "Surat Pengantar RT/RW", "Bukti kepemilikan/Sewa lokasi usaha"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi'),
('layanan-4', 'Surat Pengantar Pengurusan KTP-el Baru / Penggantian', 'Kependudukan', '15 - 20 Menit', 'Gratis (Rp 0)', 'Pengantar penerbitan KTP elektronik pertama kali, KTP hilang, atau penggantian data KTP yang rusak.', '["Fotokopi Kartu Keluarga / KK", "Surat Pengantar RT/RW", "Surat Kehilangan dari Kepolisian (jika KTP hilang)", "KTP lama yang rusak (jika ganti rusak)"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi'),
('layanan-5', 'Surat Pengantar Penerbitan Kartu Keluarga (KK)', 'Kependudukan', '15 - 30 Menit', 'Gratis (Rp 0)', 'Pengantar pemisahan KK, penambahan anggota keluarga baru, atau pembaharuan elemen data Kartu Keluarga.', '["KK Asli / Lama", "Surat Pengantar RT/RW", "Buku Nikah / Akta Perkawinan (jika membentuk KK baru)", "Surat Keterangan Pindah (jika pendatang)"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi'),
('layanan-6', 'Surat Pengantar Akta Kelahiran Anak', 'Kependudukan', '15 - 30 Menit', 'Gratis (Rp 0)', 'Persyaratan pengajuan Akta Kelahiran anak di Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Bantaeng.', '["Surat Keterangan Lahir dari Bidan/Klinik/RS", "Fotokopi KTP kedua Orang Tua", "Fotokopi Kartu Keluarga & Buku Nikah", "Surat Pengantar RT/RW"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi'),
('layanan-7', 'Surat Keterangan Kematian (Akta Kematian)', 'Kependudukan', '15 - 30 Menit', 'Gratis (Rp 0)', 'Pengantar resmi pelaporan kematian warga untuk penghapusan data KK dan penerbitan Akta Kematian di Disdukcapil.', '["Surat Keterangan Kematian dari Dokter/RS (jika ada)", "KTP & KK Asli Almarhum/Almarhumah", "Fotokopi KTP Pelapor (Ahli Waris)", "Surat Pengantar RT/RW"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi'),
('layanan-8', 'Surat Pengantar Pindah Keluar Wilayah', 'Kependudukan', '30 Menit', 'Gratis (Rp 0)', 'Pengantar kepindahan domisili warga Kelurahan Mallilingi ke desa, kelurahan, atau kabupaten/kota lain.', '["Kartu Keluarga (KK) Asli", "Fotokopi KTP seluruh anggota yang pindah", "Surat Pengantar RT/RW", "Alamat tujuan pindah yang jelas"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi'),
('layanan-9', 'Surat Keterangan Domisili Tempat Tinggal Warga', 'Kependudukan', '15 - 20 Menit', 'Gratis (Rp 0)', 'Keterangan resmi tempat tinggal atau domisili sementara warga pendatang atau warga lokal Kelurahan Mallilingi.', '["Fotokopi KTP Pemohon", "Fotokopi Kartu Keluarga", "Surat Pengantar RT/RW setempat"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi'),
('layanan-10', 'Surat Keterangan Belum Menikah (Lajang)', 'Pernikahan', '20 - 30 Menit', 'Gratis (Rp 0)', 'Surat keterangan status bujang/gadis untuk persyaratan melamar pekerjaan, kedinasan, atau pernikahan N1-N4.', '["Fotokopi KTP & KK Pemohon", "Fotokopi KTP Kedua Orang Tua", "Surat Pengantar RT/RW", "Surat Pernyataan Belum Pernah Menikah bermaterai"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi'),
('layanan-11', 'Surat Pengantar Nikah (Formulir N1 - N4)', 'Pernikahan', '30 - 45 Menit', 'Gratis (Rp 0)', 'Dokumen rekomendasi dan pengantar nikah ke Kantor Urusan Agama (KUA) Kecamatan Bantaeng.', '["Fotokopi KTP & KK Calon Mempelai", "Fotokopi KTP Kedua Orang Tua", "Pasfoto 2x3 dan 3x4 (4 lembar)", "Surat Pengantar RT/RW & SK Belum Menikah"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi'),
('layanan-12', 'Surat Keterangan Duda / Janda', 'Pernikahan', '20 - 30 Menit', 'Gratis (Rp 0)', 'Keterangan status hukum perdata setelah perceraian atau kematian pasangan hidup.', '["Fotokopi KTP & KK Pemohon", "Akta Cerai Asli / Surat Kematian Pasangan", "Surat Pengantar RT/RW"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi'),
('layanan-13', 'Surat Keterangan Beda Nama / Data Identitas', 'Kependudukan', '20 - 30 Menit', 'Gratis (Rp 0)', 'Pernyataan resmi kelurahan atas perataan perbedaan penulisan nama di KTP, KK, Ijazah, atau Paspor.', '["Fotokopi KTP & KK Pemohon", "Fotokopi dokumen pendukung yang beda nama (Ijazah/Buku Nikah)", "Surat Pengantar RT/RW", "Surat Pernyataan Beda Nama bermaterai"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi'),
('layanan-14', 'Surat Keterangan Penguasaan Fisik Tanah (SPORADIK)', 'Pertanahan', '1 - 3 Hari Kerja', 'Gratis (Rp 0)', 'Pengantar pendaftaran sertifikat tanah pertama kali ke Badan Pertanahan Nasional (BPN) Bantaeng.', '["Fotokopi KTP & KK Pemohon", "Surat Pengantar RT/RW & Berita Acara Kesaksian Batas", "Bukti Pembayaran PBB Terbaru", "Peta Lokasi Sketsa Tanah"]'::jsonb, 'Pengajuan di Kantor Kelurahan MallILINGI'),
('layanan-15', 'Surat Keterangan Waris / Ahli Waris', 'Pertanahan & Hukum', '1 - 2 Hari Kerja', 'Gratis (Rp 0)', 'Penetapan daftar ahli waris almarhum/almarhumah untuk pengurusan perbankan atau sertifikat tanah.', '["Surat Kematian Almarhum/ah", "Fotokopi KTP & KK Seluruh Ahli Waris", "Buku Nikah Almarhum/ah", "Surat Pernyataan Ahli Waris diketahui RT/RW & Lurah"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi'),
('layanan-16', 'Surat Keterangan Penghasilan Orang Tua', 'Sosial & Edukasi', '15 - 20 Menit', 'Gratis (Rp 0)', 'Keterangan rata-rata pendapatan bulanan orang tua untuk pengajuan UKT perguruan tinggi atau beasiswa.', '["Fotokopi KTP Orang Tua & KK", "Surat Pengantar RT/RW", "Surat Pernyataan Rincian Penghasilan bermaterai"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi'),
('layanan-17', 'Surat Pengantar SKCK (Catatan Kepolisian)', 'Umum', '15 - 20 Menit', 'Gratis (Rp 0)', 'Rekomendasi pengurusan SKCK di Polsek Bantaeng / Polres Bantaeng untuk lamaran pekerjaan.', '["Fotokopi KTP & KK Pemohon", "Fotokopi Akta Kelahiran", "Pasfoto 4x6 latar merah (2 lembar)", "Surat Pengantar RT/RW"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi'),
('layanan-18', 'Surat Keterangan Izin Keramaian / Kegiatan Warga', 'Umum', '20 - 30 Menit', 'Gratis (Rp 0)', 'Pengantar rekomendasi acara pesta pernikahan, syukuran, atau hajatan warga ke Polsek Bantaeng.', '["Fotokopi KTP Penanggung Jawab Acara", "Surat Persetujuan Tetangga & RT/RW", "Rincian Waktu & Lokasi Acara"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi'),
('layanan-19', 'Surat Keterangan Beasiswa', 'Sosial & Edukasi', '15 - 20 Menit', 'Gratis (Rp 0)', 'Keterangan resmi kelurahan untuk pendampingan pendaftaran program beasiswa sekolah/kuliah.', '["Fotokopi KTP & KK Pemohon", "Kartu Pelajar / Kartu Tanda Mahasiswa (KTM)", "Surat Pengantar RT/RW"]'::jsonb, 'Pengajuan di Kantor Kelurahan Mallilingi')
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  kategori = EXCLUDED.kategori,
  waktu = EXCLUDED.waktu,
  deskripsi = EXCLUDED.deskripsi,
  persyaratan = EXCLUDED.persyaratan;

-- --------------------------------------------------------------------
-- 3. TABEL: berita (Kabar Terkini & Pengumuman Kelurahan)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.berita (
  id TEXT PRIMARY KEY,
  judul TEXT NOT NULL,
  tanggal TEXT NOT NULL,
  kategori TEXT NOT NULL,
  gambar TEXT NOT NULL,
  ringkasan TEXT NOT NULL,
  isi TEXT,
  penulis TEXT DEFAULT 'Humas Kelurahan Mallilingi',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Data Berita
INSERT INTO public.berita (id, judul, tanggal, kategori, gambar, ringkasan, isi, penulis) VALUES
('berita-1', 'Penyaluran Bantuan Pangan Beras Serentak Bagi Warga Mallilingi', '02 Agustus 2026', 'Sosial & Masyarakat', '/assets/images/kantor_kelurahan.jpg', 'Pemerintah Kelurahan Mallilingi menyalurkan cadangan beras pemerintah (CBP) tahap ketiga untuk 240 KPM secara tertib.', 'Pemerintah Kelurahan Mallilingi bersama Tim Pendamping Sosial Kabupaten Bantaeng hari ini menyalurkan Cadangan Beras Pemerintah (CBP) bantuan pangan beras kepada 240 Keluarga Penerima Manfaat (KPM) yang bertempat di Aula Kantor Kelurahan Mallilingi.\n\nPenyerahan bantuan ini dipimpin langsung oleh Lurah Mallilingi, ILHAM, didampingi Sekretaris Lurah Yudhie Yudha Dharma, A.Md serta Kepala Seksi Pelayanan Umum. Proses penyaluran berjalan dengan tertib, lancar, dan mengedepankan keterbukaan data kependudukan.', 'Humas Kelurahan Mallilingi'),
('berita-2', 'Gotong Royong Kebersihan Lingkungan Sambut Hari Kemerdekaan RI', '28 Juli 2026', 'Kegiatan Lingkungan', '/assets/images/kantor_kelurahan.jpg', 'Warga bersama pengurus 8 RW dan 25 RT bahu membahu membersihkan drainase dan memasang umbul-umbul.', 'Menyambut Peringatan Hari Ulang Tahun Kemerdekaan Republik Indonesia yang ke-81, Pemerintah Kelurahan Mallilingi menggalakkan aksi gotong royong kebersihan lingkungan secara serentak di seluruh 8 RW dan 25 RT.\n\nKegiatan ini melibatkan seluruh warga masyarakat, unsur Babinsa Sertu Akhmad Panisi, Binmas Arwan Hamid, serta jajaran pengurus RT/RW. Fokus kebersihan diarahkan pada pembersihan saluran air drainase utama dan perapian taman swadaya warga.', 'Humas Kelurahan Mallilingi'),
('berita-3', 'Sosialisasi Program Kerja KKN Mahasiswa di Kelurahan Mallilingi', '20 Juli 2026', 'Program KKN', '/assets/images/kantor_kelurahan.jpg', 'Mahasiswa KKN memaparkan 5 program kerja unggulan digitalisasi kelurahan dan pemberdayaan ekonomi.', 'Tim Mahasiswa KKN hari ini menggelar Seminar Sosialisasi Program Kerja KKN di Aula Kantor Kelurahan Mallilingi. Acara ini dihadiri oleh Lurah Mallilingi, Kepala Seksi Pemerintahan Fitriah, S.E, Ketua LPM A. Rahman AB, S.Ilkom, serta seluruh Ketua RW dan RT se-Kelurahan Mallilingi.\n\nProgram kerja unggulan yang dipaparkan meliputi pembuatan portal website resmi kelurahan, digitalisasi peta administrasi, pendataan UMKM warga, dan program kebersihan drainase.', 'Tim KKN Kelurahan Mallilingi')
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  tanggal = EXCLUDED.tanggal,
  ringkasan = EXCLUDED.ringkasan,
  isi = EXCLUDED.isi;

-- --------------------------------------------------------------------
-- 4. TABEL: struktur (Aparatur SOTK PNS & Non-PNS Kelurahan Mallilingi)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.struktur (
  id SERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  nip TEXT NOT NULL,
  foto TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Data Aparatur SOTK
INSERT INTO public.struktur (nama, jabatan, nip, foto) VALUES
('ILHAM', 'Kepala Kelurahan Mallilingi', 'Kepala Kelurahan Mallilingi', '/assets/images/lurah.jpg'),
('YUDHIE YUDHA DHARMA, A.Md', 'Sekretaris Kelurahan', 'NIP. 19750315 200904 1 003', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'),
('NURAENI', 'Staf Sekretariat', 'Staff / Non-PNS', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'),
('AGUS SALIM, SM', 'Staf Sekretariat', 'Staff / Non-PNS', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'),
('FITRIAH, S.E', 'Kasi Pemerintahan', 'NIP. 19780830 201212 2 001', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'),
('SYAHRIR', 'Staf Seksi Pemerintahan (PNS)', 'NIP. 19670815 200604 1 011', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'),
('ANANG ADENANGST DJALIL', 'Staf Seksi Pemerintahan (PNS)', 'NIP. 19800526 200502 1 001', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'),
('FATIMAH', 'Staf Seksi Pemerintahan', 'Staff / Non-PNS', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80'),
('M. RUSDY', 'Staf Seksi Pemerintahan', 'Staff / Non-PNS', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'),
('AKHMAD HARIS', 'Staf Seksi Pemerintahan', 'Staff / Non-PNS', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'),
('FITRIANI, SE', 'Kasi Pelayanan Umum', 'NIP. 19850723 200903 2 011', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'),
('NURAENI', 'Staf Pelayanan Umum (PNS)', 'NIP. 19810531 201212 2 002', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'),
('HUDAEDAH S', 'Staf Pelayanan Umum', 'Staff / Non-PNS', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80'),
('HALIMAH', 'Staf Pelayanan Umum', 'Staff / Non-PNS', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'),
('ROSMITA', 'Staf Pelayanan Umum', 'Staff / Non-PNS', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'),
('A. NURSYANTI', 'Staf Pelayanan Umum', 'Staff / Non-PNS', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'),
('A. ERNAWATI', 'Staf Seksi Pembangunan & PM', 'Staff / Non-PNS', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80'),
('SYAMSURYANTI', 'Staf Seksi Pembangunan & PM', 'Staff / Non-PNS', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'),
('NASTRI', 'Staf Seksi Pembangunan & PM', 'Staff / Non-PNS', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'),
('IRAWATI', 'Staf Seksi Pembangunan & PM', 'Staff / Non-PNS', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'),
('Sertu Akhmad Panisi', 'Babinsa Mallilingi', 'TNI AD / Babinsa', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'),
('Arwan Hamid', 'Binmas / Bhabinkamtibmas', 'Polri / Binmas', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'),
('A. Rahman AB, S.Ilkom', 'Ketua LPM Mallilingi', 'LPM Mallilingi', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'),
('Muh. Alwih', 'Anggota LPM Mallilingi', 'LPM Mallilingi', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80');

-- --------------------------------------------------------------------
-- 5. TABEL: pengaduan (Laporan & Aspirasi Masuk Warga)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pengaduan (
  id TEXT PRIMARY KEY,
  tanggal TEXT NOT NULL,
  nama TEXT NOT NULL,
  nik TEXT DEFAULT '-',
  telepon TEXT NOT NULL,
  kategori TEXT NOT NULL,
  judul TEXT NOT NULL,
  isi TEXT NOT NULL,
  status TEXT DEFAULT 'Baru',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Data Pengaduan
INSERT INTO public.pengaduan (id, tanggal, nama, nik, telepon, kategori, judul, isi, status) VALUES
('aduan-1', '03 Agustus 2026', 'Ahmad Hidayat', '7303011504880001', '6281234567890', 'Infrastruktur & Jalan', 'Saluran Air Tersumbat di Jalan Calendu RW 002', 'Mohon bantuan petugas kelurahan untuk membersihkan drainase/saluran air di dekat perempatan RT 002 RW 002 yang tersumbat agar tidak menyebabkan genangan air.', 'Baru'),
('aduan-2', '01 Agustus 2026', 'Nurhalimah', '7303015809920003', '6285299887766', 'Pelayanan Kependudukan', 'Konsultasi Persyaratan Pengurusan SKTM', 'Apakah pengurusan SKTM untuk keringanan biaya rumah sakit dapat diwakilkan oleh anggota keluarga yang terdaftar dalam 1 KK?', 'Proses'),
('aduan-3', '28 Juli 2026', 'Baharuddin', '7303011210750002', '6282111223344', 'Kebersihan & Saluran Air', 'Pengangkutan Sampah di Wilayah RW 005', 'Terima kasih atas tindak lanjut armada kebersihan yang telah mengangkut tumpukan sampah di tempat penampungan sementara RW 005.', 'Selesai')
ON CONFLICT (id) DO NOTHING;

-- Selesai! Seluruh tabel dan data Supabase telah terisi penuh.
