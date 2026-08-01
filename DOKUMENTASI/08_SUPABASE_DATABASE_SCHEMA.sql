-- ====================================================================
-- SQL SCHEMA FOR SUPABASE CLOUD DATABASE ($0 FREE TIER)
-- Portal Resmi & Pengelolaan Media Kelurahan Mallilingi
-- ====================================================================

-- 1. Table Info Kelurahan
CREATE TABLE IF NOT EXISTS public.info (
  id INT PRIMARY KEY DEFAULT 1,
  nama TEXT DEFAULT 'Kelurahan Mallilingi',
  kecamatan TEXT DEFAULT 'Kecamatan Bantaeng',
  kabupaten TEXT DEFAULT 'Kabupaten Bantaeng',
  provinsi TEXT DEFAULT 'Sulawesi Selatan',
  kodePos TEXT DEFAULT '92411',
  alamat TEXT,
  telepon TEXT,
  whatsapp TEXT,
  email TEXT,
  jamKerja TEXT,
  luasWilayah TEXT,
  jumlahPenduduk TEXT,
  jumlahKK TEXT,
  jumlahRT TEXT,
  jumlahRW TEXT,
  sambutanLurah TEXT,
  namaLurah TEXT,
  nipLurah TEXT,
  fotoLurah TEXT,
  fotoKantor TEXT,
  visi TEXT,
  misi JSONB,
  batasWilayah JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Table Layanan Surat Kependudukan
CREATE TABLE IF NOT EXISTS public.layanan (
  id TEXT PRIMARY KEY,
  judul TEXT NOT NULL,
  kategori TEXT,
  waktu TEXT,
  biaya TEXT DEFAULT 'Gratis (Rp 0)',
  persyaratan JSONB,
  alur TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Table Berita & Pengumuman
CREATE TABLE IF NOT EXISTS public.berita (
  id TEXT PRIMARY KEY,
  judul TEXT NOT NULL,
  tanggal TEXT,
  kategori TEXT,
  gambar TEXT,
  ringkasan TEXT,
  isi TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Table Katalog UMKM Warga
CREATE TABLE IF NOT EXISTS public.umkm (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  kategori TEXT,
  pemilik TEXT,
  whatsapp TEXT,
  alamat TEXT,
  deskripsi TEXT,
  foto TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Turn on Row Level Security (RLS) and enable public read access
ALTER TABLE public.info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.layanan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.umkm ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Info" ON public.info FOR SELECT USING (true);
CREATE POLICY "Public Read Layanan" ON public.layanan FOR SELECT USING (true);
CREATE POLICY "Public Read Berita" ON public.berita FOR SELECT USING (true);
CREATE POLICY "Public Read UMKM" ON public.umkm FOR SELECT USING (true);

-- Allow public write access for admin management
CREATE POLICY "Public Write Info" ON public.info FOR ALL USING (true);
CREATE POLICY "Public Write Layanan" ON public.layanan FOR ALL USING (true);
CREATE POLICY "Public Write Berita" ON public.berita FOR ALL USING (true);
CREATE POLICY "Public Write UMKM" ON public.umkm FOR ALL USING (true);
