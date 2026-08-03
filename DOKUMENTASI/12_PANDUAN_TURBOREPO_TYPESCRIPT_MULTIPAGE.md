# Panduan Arsitektur Turborepo Monorepo (Next.js 14 + TypeScript + Multi-Page Routing)

## 📌 1. Deskripsi Perubahan Arsitektur
Website Portal & Pengelolaan Media Kelurahan Mallilingi telah **berhasil dimigrasikan dari Vanilla HTML/CSS/JS menjadi Arsitektur Modern Monorepo berbasis Turborepo, Next.js 14 (App Router), dan TypeScript**.

---

## 🛠️ 2. Struktur Monorepo (`Turborepo Workspace`)

```text
WebKelurahan/
├── package.json                   # Root monorepo workspace configuration
├── turbo.json                     # Turborepo task pipeline (build, dev, lint)
├── vercel.json                    # Vercel monorepo automatic deployment config
├── DOKUMENTASI/                   # Folder dokumentasi terpadu proyek
├── packages/
│   └── config-typescript/         # Shared TSConfig base package (@kelurahan/config-typescript)
└── apps/
    └── web/                       # Aplikasi Utama Next.js 14 (App Router + TypeScript)
        ├── src/
        │   ├── types/index.ts     # TypeScript Domain Interfaces (Info, Berita, UMKM, Layanan)
        │   ├── lib/data.ts        # Client Supabase Cloud TS + Data Store Fallback
        │   ├── styles/globals.css # Tema CSS Global (Font: Arial, Helvetica, sans-serif)
        │   └── app/               # Multi-Page Separate Routes:
        │       ├── page.tsx       # GET / (Beranda)
        │       ├── profil/        # GET /profil (Profil & Visi Misi & Sambutan Lurah)
        │       ├── layanan/       # GET /layanan (Katalog & Pencarian Layanan Surat)
        │       ├── berita/        # GET /berita (Berita & Pengumuman)
        │       │   └── [id]/      # GET /berita/[id] (Halaman Detail Artikel Berita)
        │       ├── umkm/          # GET /umkm (Katalog & Pemesanan WA UMKM Warga)
        │       ├── struktur/      # GET /struktur (Aparatur & Perangkat Kelurahan)
        │       ├── kontak/        # GET /kontak (Kontak & Navigasi Peta Google Maps)
        │       └── admin/         # GET /admin (Dashboard Pengelolaan Media Petugas)
        └── public/assets/         # Aset gambar publik
```

---

## 🎨 3. Pengaturan Font Sistem & Tipografi Modern
Seluruh halaman web kini menggunakan font stack sistem yang sangat tajam, bersih, dan cepat dimuat:
```css
body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f8fafc;
  color: #0f172a;
}
```

---

## 🚀 4. Perintah Membuka & Mengembangkan Proyek

### A. Menjalankan Mode Development (Server Lokal):
Di Terminal root proyek (`D:\KKN\Code\WebKelurahan`), jalankan:
```bash
npx turbo run dev
```
Buka browser di **`http://localhost:3000`**.

### B. Membangun Production Build:
```bash
npx turbo run build
```

---

## 🌐 5. Deployment Otomatis ke Vercel

Monorepo ini telah dilengkapi dengan berkas **`vercel.json`** khusus monorepo. Untuk mempublikasikannya ke Vercel:
```bash
git add .
git commit -m "Migrasi ke Turborepo TypeScript Multi-Page Routing"
git push origin main
```
Vercel akan secara otomatis mendeteksi Turborepo monorepo dan mempublikasikan versi Next.js TypeScript Multi-Page terbaru dalam hitungan detik!
