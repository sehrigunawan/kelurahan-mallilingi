# Panduan Deployment Gratis ($0) ke Vercel & GitHub Pages

## 📌 Pendahuluan
Website Kelurahan Mallilingi kini telah siap untuk dipublikasikan ke hosting cloud gratis. Dokumen ini memuat langkah-langkah mempublikasikan website ke **Vercel** atau **GitHub Pages** hanya dalam waktu **2 menit (100% Gratis Selamanya)**.

---

## 🚀 OPSI A: Deployment Gratis Menggunakan Vercel (Rekomendasi Utama - Paling Cepat)

### Langkah 1: Buat Akun Vercel Gratis
1. Buka [https://vercel.com/signup](https://vercel.com/signup).
2. Pilih **Continue with GitHub** (atau dengan Email/Google).

### Langkah 2: Publikasi Folder Proyek
**Metode 1: Menggunakan Vercel CLI (Sangat Mudah)**
1. Buka terminal/PowerShell di folder proyek `D:\KKN\Code\WebKelurahan`.
2. Jalankan perintah berikut:
   ```bash
   npx vercel
   ```
3. Ikuti petunjuk singkat di layar (pencet `Enter` untuk opsi default).
4. Selesai! Vercel akan langsung memberikan link publik gratis, contoh:  
   👉 **`https://kelurahan-mallilingi.vercel.app`**

**Metode 2: Upload via Dashboard Vercel**
1. Buka [https://vercel.com/new](https://vercel.com/new).
2. Hubungkan repository GitHub proyek ini, lalu klik **Deploy**.

---

## 🐙 OPSI B: Deployment Gratis Menggunakan GitHub Pages

### Langkah 1: Buat Repository di GitHub
1. Buka [https://github.com/new](https://github.com/new).
2. Beri nama repository: `kelurahan-mallilingi`.
3. Pilih **Public**, lalu klik **Create repository**.

### Langkah 2: Push Kode ke GitHub
Di terminal folder `D:\KKN\Code\WebKelurahan`, jalankan:
```bash
git init
git add .
git commit -m "Initial commit website Kelurahan Mallilingi"
git branch -M main
git remote add origin https://github.com/USERNAME_ANDA/kelurahan-mallilingi.git
git push -u origin main
```

### Langkah 3: Aktifkan GitHub Pages
1. Buka repository Anda di GitHub ➔ **Settings** ➔ **Pages**.
2. Di bagian **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **`main`** / **`/(root)`**
3. Klik **Save**.
4. Dalam 1 menit, website Anda resmi aktif di link:  
   👉 **`https://USERNAME_ANDA.github.io/kelurahan-mallilingi`**

---

## ⚡ Langkah Selanjutnya Setelah Website Live:

Begitu website sudah aktif dan ber-URL *live* (misalnya `https://kelurahan-mallilingi.vercel.app`), Anda siap menyerahkan URL ini ke Diskominfo Kabupaten Bantaeng untuk ditautkan (*CNAME DNS*) ke subdomain resmi:  
👉 **`mallilingi.bantaengkab.go.id`**
