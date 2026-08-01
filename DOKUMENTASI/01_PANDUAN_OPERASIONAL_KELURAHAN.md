# Panduan Operasional Platform Web & Dashboard Pengelolaan Media
## Kelurahan Mallilingi, Kecamatan Bantaeng, Kabupaten Bantaeng

---

## 📌 1. Pendahuluan
Dokumen ini merupakan panduan resmi penggunaan dan pengelolaan **Portal Informasi & Pengelolaan Media Kelurahan Mallilingi**. Platform ini dikembangkan sebagai luaran **Program Kerja Individu KKN** untuk membantu Pemerintah Kelurahan Mallilingi dalam meningkatkan transparansi pelayanan publik, publikasi berita desa, dan promosi direktori UMKM lokal.

---

## 🌐 2. Alamat & Akses Platform

1. **Portal Publik Warga**:
   - Berkas: `index.html`
   - Peruntukan: Masyarakat umum, warga Kelurahan Mallilingi, dan pengunjung luar.
2. **Dashboard Pengelolaan Media (Admin Staf)**:
   - Berkas: `admin.html`
   - Peruntukan: Staf Kelurahan Mallilingi / Admin Pengelola Media.
   - **PIN Keamanan Default**: `1234`

---

## 🔐 3. Tata Cara Login Dashboard Admin (`admin.html`)

1. Buka berkas `admin.html` pada web browser (Google Chrome / Mozilla Firefox / Microsoft Edge).
2. Masukkan **PIN Akses**: `1234`.
3. Klik tombol **"Masuk Dashboard"**.
4. Setelah berhasil masuk, Anda akan diarahkan ke halaman pengelolaan data terpadu.

---

## 🛠️ 4. Fitur-Fitur Pengelolaan Data (`admin.html`)

### A. Pengelolaan Profil Kelurahan & Lurah
- **Nama Lurah & NIP**: Dapat diubah sesuai pejabat yang menjabat.
- **Sambutan Lurah**: Kalimat pembuka untuk warga di halaman utama.
- **Visi & Misi**: Poin-poin Visi & Misi Pembangunan Kelurahan.
- **Kontak & Jam Kerja**: Alamat kantor, no. telepon/WA, email, dan jam pelayanan.

### B. Pengelolaan Layanan Surat Kependudukan
- **Tambah Layanan**: Judul Surat, Kategori, Waktu Penyelesaian, Biaya, Persyaratan, dan Alur Pengurusan.
- **Edit / Hapus Layanan**: Memperbarui atau menghapus layanan surat yang sudah tidak berlaku.

### C. Pengelolaan Berita & Pengumuman
- **Tambah Berita**: Judul, Tanggal, Kategori, Ringkasan, Isi Lengkap, dan URL Gambar Header.
- **Fitur Hapus & Edit**: Memastikan berita di portal utama selalu terbarui (*up-to-date*).

### D. Pengelolaan Katalog UMKM Warga
- **Daftar Usaha Warga**: Nama UMKM, Kategori Produk, Nama Pemilik, No. WhatsApp Penjual, Alamat, Deskripsi Produk, dan Foto Produk.
- **Direct WhatsApp Link**: Pembeli langsung terhubung ke WhatsApp pemilik usaha saat menekan tombol "Hubungi Penjual".

### E. Pengelolaan Perangkat Kelurahan (Struktur Organisasi)
- **Susunan Aparatur**: Nama, Jabatan, NIP/Lembaga, dan Foto Resmi Aparatur.

---

## 💾 5. Prosedur Cadangan Data (*Backup & Restore*)

> [!IMPORTANT]
> **Sangat Disarankan**: Lakukan ekspor cadangan data (`.json`) secara berkala (misal: sebulan sekali atau setelah menambah banyak data baru).

1. **Cara Mengunduh Cadangan Data (Backup)**:
   - Buka `admin.html` ➔ Scroll ke bagian **"Ekspor / Impor Data (Backup)"**.
   - Klik tombol **"📥 Download Backup Data JSON"**.
   - Berkas bernama `backup_mallilingi_data.json` akan otomatis terunduh ke komputer Anda.
2. **Cara Mengembalikan Data (Restore)**:
   - Klik tombol **"📂 Pilih File Backup JSON"**.
   - Pilih berkas `.json` cadangan yang pernah diunduh.
   - Klik **"📤 Restore Data dari File"**. Data akan otomatis terisi kembali.

---

## 📞 6. Kontak Bantuan & Serah Terima KKN
Apabila terdapat kendala teknis dalam penggunaan platform ini, silakan hubungi tim penyusun Proker KKN atau pihak Kelurahan Mallilingi:
- **Kantor Kelurahan Mallilingi**: Jl. Sungai Calendu, Kec. Bantaeng, Kab. Bantaeng.
- **Email Resmi**: `kelurahan.mallilingi@bantaengkab.go.id`
