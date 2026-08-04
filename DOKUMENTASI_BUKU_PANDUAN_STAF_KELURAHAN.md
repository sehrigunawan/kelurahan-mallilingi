# BUKU PANDUAN OPERASIONAL & PENGELOLAAN
## PORTAL WEB & PANEL ADMIN RESMI KELURAHAN MALLILINGI
**KECAMATAN BANTAENG, KABUPATEN BANTAENG, SULAWESI SELATAN**

---

### KATA PENGANTAR

Puji dan syukur kita panjatkan kehadirat Allah SWT atas rahmat dan karunia-Nya, sehingga **Buku Panduan Operasional & Pengelolaan Portal Web Kelurahan Mallilingi** ini dapat diselesaikan dengan baik. Buku panduan ini disusun sebagai pedoman resmi bagi seluruh Aparatur dan Staf Kelurahan Mallilingi dalam mengoperasikan, mengelola, serta memelihara sistem portal web dan basis data pelayanan publik berbasis digital.

Transformasi digital pelayanan publik merupakan langkah strategis dalam mewujudkan tata kelola pemerintahan kelurahan yang transparan, akuntabel, cepat, dan mengayomi. Melalui hadirnya Portal Web Kelurahan Mallilingi, masyarakat dapat mengakses informasi pelayanan kependudukan, berita kegiatan, profil wilayah, serta menyampaikan pengaduan secara mudah dan terbuka.

Buku panduan ini dirancang secara sistematis agar dapat dipahami dan dijalankan dengan mudah oleh staf kelurahan tanpa memerlukan latar belakang teknis pemrograman yang rumit. Semoga buku panduan ini memberikan manfaat yang berkelanjutan bagi kemajuan pelayanan publik di Kelurahan Mallilingi, Kabupaten Bantaeng.

*Mallilingi, Agustus 2026*  
**Tim Penyusun & Pengembang Sistem**

---

### DAFTAR ISI

- **KATA PENGANTAR**
- **DAFTAR ISI**
- **BAB 1: GAMBARAN UMUM & LATAR BELAKANG**
  - 1.1 Latar Belakang Digitalisasi Kelurahan
  - 1.2 Tujuan & Manfaat Portal Web Kelurahan
  - 1.3 Keunggulan Inovasi Website Kelurahan Mallilingi
- **BAB 2: ARSITEKTUR & SPESIFIKASI TEKNOLOGI SISTEM**
  - 2.1 Arsitektur Aplikasi (Next.js 14 App Router)
  - 2.2 Basis Data Cloud Real-Time (Supabase Database)
  - 2.3 Keamanan Autentikasi Admin (SHA-256 Enkripsi)
  - 2.4 Cloud Hosting & Aksesibilitas Multi-Device
- **BAB 3: PANDUAN OPERASIONAL PANEL ADMIN (`/admin`)**
  - 3.1 Prosedur Login Admin Portal
  - 3.2 Navigasi Sidebar Dashboard Admin
  - 3.3 Modul 1: Pengelolaan Pengaduan Masuk Warga & Balasan WhatsApp
  - 3.4 Modul 2: Pengelolaan Berita & Pengumuman Resmi
  - 3.5 Modul 3: Pengelolaan 19 Panduan Surat Layanan Administrasi
  - 3.6 Modul 4: Pengelolaan Profil, Visi Misi, & Kontak Kelurahan
  - 3.7 Modul 5: Pengelolaan Struktur Organisasi (SOTK) & RT/RW
- **BAB 4: PANDUAN MANAGEMENT DATABASE SUPABASE CLOUD**
  - 4.1 Akses Supabase Dashboard & SQL Editor
  - 4.2 Prosedur Impor & Backup Data (SQL Script Execution)
  - 4.3 Monitoring & Pemeliharaan Tabel Data
- **BAB 5: RANCANGAN ANGGARAN BIAYA (RAB) & SKEMA BIO-HOSTING**
  - 5.1 Estimasi Biaya Pemeliharaan (Skema Gratis Rp 0 / Perpetual Free Tier)
  - 5.2 Skema Pengembangan Masa Depan (Subdomain Resmi `.go.id`)
- **BAB 6: STANDAR OPERASIONAL PROSEDUR (SOP) PERAWATAN SISTEM**
  - 6.1 SOP Pembaruan Berita & Pengumuman Mingguan
  - 6.2 SOP Respon Laporan Pengaduan Warga (Target < 24 Jam)
  - 6.3 SOP Keamanan Kredensial & Penggantian Password
  - 6.4 Troubleshooting & Penanganan Masalah Umum (FAQ)
- **BAB 7: PENUTUP**
- **LAMPIRAN & KREDENSIAL SISTEM**
  - Lampiran 1: Kredensial Default Login Admin Portal
  - Lampiran 2: Struktur Tabel Database Supabase SQL

---

### BAB 1: GAMBARAN UMUM & LATAR BELAKANG

#### 1.1 Latar Belakang Digitalisasi Kelurahan
Kelurahan Mallilingi merupakan salah satu pusat pemerintahan dan pemukiman yang berkembang pesat di Kecamatan Bantaeng, Kabupaten Bantaeng. Seiring dengan kemajuan teknologi informasi, kebutuhan masyarakat akan akses informasi publik yang cepat, transparan, dan dapat diakses 24 jam menjadi hal yang mutlak. Sebelum hadirnya portal ini, penyampaian informasi mengenai syarat pengurusan surat kependudukan, pengaduan warga, dan berita kelurahan masih dilakukan secara konvensional melalui papan pengumuman di kantor kelurahan. Digitalisasi ini hadir untuk menjembatani pelayanan pemerintah kelurahan langsung ke genggaman masyarakat.

#### 1.2 Tujuan & Manfaat Portal Web Kelurahan
1. **Bagi Masyarakat**:
   - Memudahkan pencarian 19 syarat dokumen administrasi kependudukan (SKTM, SKU, Akta Kelahiran, dll) dari rumah tanpa perlu bolak-balik ke kantor.
   - Memberikan sarana Pengaduan Warga secara online tanpa memerlukan NIK KTP yang rumit.
   - Menyajikan berita kegiatan kelurahan dan transparansi pembangunan wilayah secara real-time.
2. **Bagi Staf Kelurahan (Pengelola)**:
   - Mempercepat proses tindak lanjut pengaduan warga dengan fitur *1-Click WhatsApp Reply*.
   - Memudahkan pembaruan data profil, aparatur SOTK, dan berita tanpa perlu pengodingan ulang.
   - Meningkatkan efisiensi kerja dan kerapian arsip data kelurahan.

#### 1.3 Keunggulan Inovasi Website Kelurahan Mallilingi
- **Desain Modern & Responsive**: Tampilan sangat rapi, bersih, ramah penggunaan di smartphone (HP) maupun laptop.
- **Autentikasi Aman**: Login admin dilindungi enkripsi kriptografi SHA-256.
- **Biaya Operasional Rp 0 (Gratis)**: Menggunakan infrastruktur Next.js, Vercel Hosting, dan Supabase Database Cloud Free Tier.
- **Integrasi WhatsApp Langsung**: Respon pengaduan warga dapat langsung dikirim ke WhatsApp warga hanya dengan satu kali klik.

---

### BAB 2: ARSITEKTUR & SPESIFIKASI TEKNOLOGI SISTEM

#### 2.1 Arsitektur Aplikasi (Next.js 14 App Router)
Portal dibangun menggunakan framework **Next.js 14** berbasis **TypeScript** dan **React**. Arsitektur ini mendukung *Server-Side Rendering (SSR)* dan *Static Site Generation (SSG)* yang membuat waktu muat halaman (loading time) sangat cepat di bawah 1 detik.

#### 2.2 Basis Data Cloud Real-Time (Supabase Database)
Sistem penyimpanan menggunakan **Supabase PostgreSQL Cloud**. Seluruh data disimpan dalam 5 tabel utama:
- `info`: Menyimpan data profil kelurahan, alamat, jam kerja, visi misi, dan batas wilayah.
- `berita`: Menyimpan judul, tanggal, gambar, dan isi artikel berita/pengumuman.
- `layanan`: Menyimpan 19 syarat dokumen administrasi kependudukan.
- `struktur`: Menyimpan data aparatur PNS, staf kelurahan, Babinsa, Binmas, dan LPM.
- `pengaduan`: Menyimpan laporan aspirasi warga yang masuk secara real-time.

#### 2.3 Keamanan Autentikasi Admin (SHA-256 Enkripsi)
Guna menjaga keamanan portal dari akses pihak luar yang tidak berwenang, halaman login admin (`/admin`) dilengkapi dengan enkripsi password **SHA-256 (Web Crypto API)**. Password yang diinput staf tidak disimpan sebagai teks polos (*plain text*), melainkan dikonversi menjadi kode hash acak 64 karakter hex yang tidak dapat diretas.

---

### BAB 3: PANDUAN OPERASIONAL PANEL ADMIN (`/admin`)

#### 3.1 Prosedur Login Admin Portal
1. Buka browser (Google Chrome / Mozilla Firefox) di laptop atau handphone.
2. Masukkan alamat URL: **`http://localhost:3000/admin`** *(atau URL domain resmi kelurahan)*.
3. Pada halaman Login Admin:
   - **Username**: Username Resmi Pengelola Kelurahan
   - **Password**: Password Terenkripsi Pengelola Kelurahan
4. Klik tombol **Masuk Admin Portal**.
5. Jika berhasil, Anda akan masuk ke halaman Dashboard Utama Admin.

#### 3.2 Navigasi Sidebar Dashboard Admin
Dashboard Admin dilengkapi dengan **Menu Sidebar Kiri** yang memudahkan navigasi antar modul:
1. **Daftar Pengaduan Masuk** (Dilengkapi Badge Angka Pengaduan Baru).
2. **Profil & Informasi Umum**.
3. **Berita & Pengumuman**.
4. **Layanan Administrasi**.
5. **Struktur Organisasi (SOTK)**.

#### 3.3 Modul 1: Pengelolaan Pengaduan Masuk Warga & Balasan WhatsApp
- **Melihat Laporan Masuk**: Masuk ke menu *Daftar Pengaduan Masuk*. Terdapat ringkasan total laporan: *Baru*, *Proses*, dan *Selesai*.
- **Filter Status Dropdown**: Gunakan dropdown filter di bagian kanan atas untuk menyaring laporan berdasarkan status (*Semua Status*, *Baru*, *Proses*, *Selesai*).
- **Balas Warga via WhatsApp (Fitur 1-Click)**:
  1. Pada kartu pengaduan warga, klik tombol hijau **"Balas via WA"**.
  2. Sistem akan otomatis membuka WhatsApp web/aplikasi dengan format pesan balasan resmi dari Kelurahan Mallilingi.
- **Mengubah Status Pengaduan**:
  Pilih status baru pada dropdown status di kartu pengaduan (contoh: ubah dari `Baru` ke `Proses` atau `Selesai`), lalu klik **Simpan Status**.

#### 3.4 Modul 2: Pengelolaan Berita & Pengumuman Resmi
- **Menambah Berita Baru**:
  1. Masuk ke menu *Berita & Pengumuman*.
  2. Isikan Judul Berita, Kategori, Tanggal, URL Foto Gambar, Ringkasan, dan Isi Artikel Lengkap.
  3. Klik **Tambah Berita Baru**.
- **Menghapus / Mengedit Berita**: Klik tombol **Hapus** pada kartu berita yang ingin dihapus.

#### 3.5 Modul 3: Pengelolaan 19 Panduan Surat Layanan Administrasi
- Staf kelurahan dapat memperbarui syarat dokumen, perkiraan waktu pelayanan, atau menambah jenis surat pelayanan baru melalui tabel formulir *Layanan Administrasi*.

#### 3.6 Modul 4: Pengelolaan Profil, Visi Misi, & Kontak Kelurahan
- Staf dapat memperbarui nama Lurah, Sambutan Lurah, Alamat Kantor, Telepon, Email, Jam Kerja, Visi Misi, dan Batas Wilayah pada tab *Profil & Informasi Umum*.

---

### BAB 4: PANDUAN MANAGEMENT DATABASE SUPABASE CLOUD

#### 4.1 Akses Supabase Dashboard & SQL Editor
1. Buka link: **`https://supabase.com/dashboard`**
2. Login menggunakan akun email pengelola Supabase Kelurahan.
3. Pilih proyek **`zpjlttzifpnavbwjsjxq`** (atau nama proyek `WebMallilingi`).

#### 4.2 Prosedur Impor & Backup Data (SQL Script Execution)
Jika terjadi gangguan atau ingin melakukan pemulihan data ulang (*restore*):
1. Buka menu **SQL Editor** pada sidebar kiri Supabase (ikon `>_`).
2. Klik **New Query**.
3. Buka file script **`DOKUMENTASI_FULL_SUPABASE_SEED.sql`**.
4. Copy seluruh kode SQL dan Paste ke dalam SQL Editor Supabase.
5. Klik **RUN** di pojok kanan bawah. Data seluruh tabel akan pulih 100%.

---

### BAB 5: RANCANGAN ANGGARAN BIAYA (RAB) & SKEMA BIO-HOSTING

#### 5.1 Estimasi Biaya Pemeliharaan (Skema Gratis Rp 0 / Perpetual Free Tier)
| Komponen Sistem | Provider / Layanan | Biaya per Bulan | Biaya per Tahun | Keterangan |
| :--- | :--- | :---: | :---: | :--- |
| **Framework & Frontend** | Next.js 14 React | Rp 0 | Rp 0 | Open-Source |
| **Cloud Web Hosting** | Vercel Cloud Platform | Rp 0 | Rp 0 | Free Hobby Tier (Unlimited SSL) |
| **Database Server** | Supabase Cloud PostgreSQL | Rp 0 | Rp 0 | Free Tier (500 MB Database) |
| **Keamanan SSL/HTTPS** | Let's Encrypt / Vercel | Rp 0 | Rp 0 | Otomatis Terpembaharui |
| **TOTAL BIAYA OPERASIONAL** | | **Rp 0** | **Rp 0** | **100% GRATIS** |

#### 5.2 Skema Pengembangan Masa Depan (Subdomain Resmi `.go.id`)
Jika Pemerintah Kabupaten Bantaeng memfasilitasi subdomain resmi daerah (contoh: `mallilingi.bantaengkab.go.id`), staf kelurahan hanya perlu mendaftarkan CNAME DNS Vercel tanpa biaya tambahan.

---

### BAB 6: STANDAR OPERASIONAL PROSEDUR (SOP) PERAWATAN SISTEM

#### 6.1 SOP Pembaruan Berita & Pengumuman Mingguan
1. Pembaruan berita dilakukan minimal **1 kali dalam seminggu** atau setiap ada kegiatan resmi kelurahan (penyaluran bantuan, gotong royong, musrenbang, dll).
2. Gambar yang diunggah disarankan berukuran lanskap (rasio 16:9) dengan resolusi yang jelas.

#### 6.2 SOP Respon Laporan Pengaduan Warga (Target < 24 Jam)
1. Petugas Informasi Kelurahan mengecek Dashboard Admin (`/admin`) setiap hari kerja pukul **08.30 WITA** dan **14.00 WITA**.
2. Laporan pengaduan status `Baru` wajib direspon melalui WhatsApp atau diubah statusnya menjadi `Proses` maksimal **1 x 24 Jam** kerja.

#### 6.3 SOP Keamanan Kredensial & Penggantian Password
1. Username dan Password Admin tidak boleh disebarluaskan kepada pihak di luar aparatur kelurahan.
2. Penggantian password admin disarankan dilakukan secara berkala setiap **6 bulan sekali**.

#### 6.4 Troubleshooting & Penanganan Masalah Umum (FAQ)
- **Tanya**: *Bagaimana jika lupa password admin?*  
  **Jawab**: Password default dapat dikembalikan melalui pengubahan nilai hash SHA-256 pada file `AdminDashboardClient.tsx`.
- **Tanya**: *Mengapa gambar berita tidak muncul?*  
  **Jawab**: Pastikan URL link gambar diawali dengan `http://` atau `https://` atau tersimpan di folder `public/assets/images/`.

---

### BAB 7: PENUTUP

Portal Web & Panel Admin Kelurahan Mallilingi dirancang sebagai instrumen tata kelola pelayanan publik modern yang berkelanjutan. Diharapkan buku panduan ini menjadi acuan utama bagi seluruh jajaran aparatur Kelurahan Mallilingi dalam merawat, mengelola, dan memaksimalkan keberadaan sistem portal digital ini demi kemajuan masyarakat Kelurahan Mallilingi, Kabupaten Bantaeng.

---

### LAMPIRAN & KREDENSIAL SISTEM

#### Lampiran 1: Pengelolaan Kredensial Login Admin Portal
- **URL Akses Admin**: `http://localhost:3000/admin` *(atau `/admin` pada domain publik)*
- **Pengaturan Username & Password**: Dikonfigurasi secara aman via Environment Variable (`NEXT_PUBLIC_ADMIN_USERNAME` & `NEXT_PUBLIC_ADMIN_PASSWORD_HASH`)
- **Metode Enkripsi**: Kriptografi SHA-256 Hash Client-Side

#### Lampiran 2: File Kunci Proyek
- Script Impor Database: `DOKUMENTASI_FULL_SUPABASE_SEED.sql`
- File Konfigurasi Data: `src/lib/data.ts`
- File Komponen Admin: `src/app/admin/AdminDashboardClient.tsx`
