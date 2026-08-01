# 📘 DOKUMEN PANDUAN OPERASIONAL MEDIA TERINTEGRASI
## Kelurahan Mallilingi, Kecamatan Bantaeng, Kabupaten Bantaeng
**Modul Pembaruan Data Mandiri untuk Perangkat Pemerintah Kelurahan**  
*Output Program Kerja Individu KKN 2026*

---

## 📌 BAB 1: PENDAHULUAN & GAMBARAN SISTEM

Sistem Informasi Profil dan Pengelolaan Media Terintegrasi Kelurahan Mallilingi dirancang khusus untuk mempermudah pelayanan publik dan keterbukaan informasi. Sistem ini terdiri dari dua halaman utama:

1. **Portal Publik (`index.html`)**: Dapat diakses oleh warga masyarakat umum untuk melihat profil, pengurusan layanan surat, berita desa, dan direktori UMKM.
2. **Dashboard Pengelolaan Media (`admin.html`)**: Halaman khusus perangkat kelurahan untuk memperbarui data website secara mandiri tanpa memerlukan keahlian koding programming.

---

## 🔑 BAB 2: CARA MASUK (LOGIN) PANEL PENGELOLAAN MEDIA

1. Buka halaman utama website Kelurahan Mallilingi di browser.
2. Klik tombol **"🔐 Pengelolaan Media"** di pojok kanan atas navigasi utama, atau buka file `admin.html`.
3. Masukkan **PIN Akses Petugas**:
   - PIN Standar KKN: `1234` atau `mallilingi`
4. Setelah PIN diverifikasi, Anda akan masuk ke Dashboard Pengelolaan Media Kelurahan.

---

## 📝 BAB 3: PANDUAN PEMBARUAN DATA BERDASARKAN KATEGORI

### A. Memperbarui Informasi Umum, Lurah, & Visi-Misi
1. Masuk ke Tab **⚙️ Informasi Kelurahan**.
2. Anda dapat merubah:
   - Nama Lurah & NIP resmi.
   - Sambutan Lurah & Kalimat Visi-Misi.
   - Angka Statistik (Jumlah Penduduk, Jumlah KK, Luas Wilayah).
   - Nomor Telepon Kantor & WhatsApp Resmi Pelayanan.
3. Setelah selesai mengubah data, klik tombol **"💾 Simpan Perubahan Informasi"**.

### B. Menambah Berita & Pengumuman Baru
1. Masuk ke Tab **📰 Berita & Pengumuman**.
2. Klik tombol **"➕ Terbitkan Berita Baru"**.
3. Isi Judul Berita, Kategori, Ringkasan, dan Isi Lengkap Berita.
4. Klik **OK** / **Simpan**. Berita akan langsung tayang secara otomatis di portal publik warga.

### C. Menambah Layanan Surat & Persyaratan Baru
1. Masuk ke Tab **📋 Layanan Surat & Syarat**.
2. Klik tombol **"➕ Tambah Jenis Layanan Surat"**.
3. Isi Jenis Surat (misal: *Surat Keterangan Usaha*), Kategori, Estimasi Waktu, dan Dokumen Persyaratan.
4. Klik **Simpan**. Warga kini bisa melihat persyaratan surat tersebut di pencarian portal publik.

### D. Mendaftarkan UMKM Warga Mallilingi
1. Masuk ke Tab **🛒 Produk & UMKM Warga**.
2. Klik tombol **"➕ Tambah Produk UMKM"**.
3. Isi Nama Produk, Nama Pemilik, Harga, Nomor WhatsApp Pemilik, dan Deskripsi Singkat.
4. Setelah disimpan, produk warga akan otomatis tampil di katalog UMKM publik dengan tombol pemesanan WhatsApp langsung ke penjual.

---

## 📦 BAB 4: PANDUAN CADANGAN & PEMULIHAN DATA (BACKUP & RESTORE)

Untuk mencegah kehilangan data apabila perangkat komputer kelurahan berganti atau di-reset:

### Cara Mengunduh Backup Data (Cadangan):
1. Masuk ke Tab **📦 Cadangan Data (JSON)**.
2. Klik tombol **"📥 Download File Backup Data (.json)"**.
3. Simpan file berformat `.json` tersebut di flashdisk atau Google Drive kelurahan.

### Cara Memulihkan Data dari File Backup:
1. Klik tombol **"📤 Restore Data dari File Backup (.json)"**.
2. Pilih file cadangan `.json` dari laptop/flashdisk.
3. Seluruh data website akan kembali secara otomatis dalam 1 detik.

---

## 🌐 BAB 5: PANDUAN PELUNCURAN (HOSTING) ONLINE GRATIS

Website ini siap diluncurkan secara online agar bisa diakses oleh masyarakat umum melalui browser smartphone:

### Menggunakan GitHub Pages / Vercel / Netlify (Gratis Selamanya):
1. Buat akun di [Vercel.com](https://vercel.com) atau [Netlify.com](https://netlify.com).
2. Unggah (drag & drop) seluruh folder `WebKelurahan` ini.
3. Website langsung aktif dan dapat dihubungkan dengan domain resmi pemerintah seperti `mallilingi.bantaengkab.go.id` atau domain `.id`.

---

*Dokumen ini disusun oleh Mahasiswa KKN sebagai Paket Serah Terima Resmi Proker Individu kepada Pemerintah Kelurahan Mallilingi, Kabupaten Bantaeng.*
