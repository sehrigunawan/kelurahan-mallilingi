import Link from "next/link";
import { getMallilingiDataAsync } from "../lib/data";

export default async function HomePage() {
  const data = await getMallilingiDataAsync();
  const info = data.info;

  return (
    <>
      {/* Hero Section */}
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <div class="hero-badge">
              🏛️ Portal Informasi Resmi Kelurahan Mallilingi
            </div>
            <h1>Pelayanan Publik Cepat, Transparan, & Terintegrasi</h1>
            <p>
              Selamat datang di platform resmi Kelurahan Mallilingi, Kecamatan Bantaeng.
              Akses informasi layanan surat kependudukan, berita kegiatan desa, direktori UMKM warga, dan profil wilayah dalam satu platform terpadu.
            </p>
            <div class="hero-buttons">
              <Link href="/layanan" class="btn btn-primary">
                🔍 Syarat Layanan Surat
              </Link>
              <Link href="/profil" class="btn btn-secondary">
                📖 Profil & Visi Misi Kelurahan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Profil Kelurahan Teaser Section */}
      <section class="section" style={{ backgroundColor: "#ffffff" }}>
        <div class="container">
          <div class="section-header">
            <span class="section-tag">TENTANG KELURAHAN</span>
            <h2>Sekilas Profil Mallilingi</h2>
            <p>Gambaran singkat pimpinan, visi pembangunan, dan statistik wilayah Kelurahan Mallilingi.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "center" }}>
            {/* Lurah Preview Card */}
            <div style={{ background: "#f8fafc", padding: "2rem", borderRadius: "16px", border: "1px solid #e2e8f0", textAlign: "center" }}>
              <div style={{ width: "120px", height: "120px", margin: "0 auto 1rem auto", borderRadius: "9999px", overflow: "hidden", border: "4px solid #ecfdf5", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <img src={info.fotoLurah || "/assets/images/lurah.jpg"} alt={info.namaLurah} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.2rem" }}>{info.namaLurah}</h3>
              <div style={{ color: "#059669", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem" }}>Lurah Mallilingi</div>
              <p style={{ fontSize: "0.9rem", color: "#475569", fontStyle: "italic", marginBottom: "1.5rem" }}>
                "{info.sambutanLurah.slice(0, 140)}..."
              </p>
              <Link href="/profil" class="btn btn-outline" style={{ fontSize: "0.85rem", width: "100%" }}>
                Baca Sambutan Lengkap & Visi Misi →
              </Link>
            </div>

            {/* Quick Stats & Geography */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ background: "#f8fafc", padding: "1.5rem", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#0f172a" }}>📊 Ringkasan Statistik</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Jumlah Penduduk</span>
                    <h4 style={{ fontSize: "1.2rem", color: "#059669" }}>{info.jumlahPenduduk}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Kepala Keluarga</span>
                    <h4 style={{ fontSize: "1.2rem", color: "#059669" }}>{info.jumlahKK}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Luas Wilayah</span>
                    <h4 style={{ fontSize: "1.2rem", color: "#0f172a" }}>{info.luasWilayah}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Wilayah RT/RW</span>
                    <h4 style={{ fontSize: "1.2rem", color: "#0f172a" }}>{info.jumlahRW} / {info.jumlahRT}</h4>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <Link href="/profil" class="btn btn-primary">
                  Buka Halaman Profil Selengkapnya →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Layanan Surat Teaser Section */}
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">PANDUAN PUBLIK</span>
            <h2>Layanan Administrasi Kependudukan</h2>
            <p>Informasi persyaratan dokumen kependudukan yang transparan tanpa pungutan biaya (Rp 0).</p>
          </div>

          <div class="layanan-grid">
            {data.layanan.slice(0, 3).map((item) => (
              <div key={item.id} class="layanan-card" style={{ padding: "1.5rem" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", background: "#ecfdf5", color: "#059669", padding: "0.25rem 0.6rem", borderRadius: "9999px", fontWeight: 700 }}>
                    {item.kategori}
                  </span>
                  <h3 style={{ fontSize: "1.1rem", margin: "0.75rem 0 0.5rem 0" }}>{item.judul}</h3>
                  <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem" }}>
                    ⏱️ Estimasi: {item.waktu} | 💰 {item.biaya}
                  </div>
                </div>
                <Link href="/layanan" class="btn btn-outline" style={{ fontSize: "0.825rem", marginTop: "auto" }}>
                  Lihat Syarat & Alur →
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/layanan" class="btn btn-primary">
              Buka Halaman Katalog Layanan Surat ({data.layanan.length}) →
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Kabar Terkini Teaser Section */}
      <section class="section" style={{ backgroundColor: "#ffffff" }}>
        <div class="container">
          <div class="section-header">
            <span class="section-tag">KABAR TERKINI</span>
            <h2>Berita & Pengumuman Terbaru</h2>
            <p>Publikasi resmi mengenai kegiatan pembangunan, sosial kemasyarakatan, dan program kelurahan.</p>
          </div>

          <div class="berita-grid">
            {data.berita.slice(0, 3).map((item) => (
              <article key={item.id} class="berita-card">
                <img src={item.gambar || "/assets/images/kantor_kelurahan.jpg"} alt={item.judul} class="berita-img" />
                <div class="berita-body">
                  <div>
                    <div class="berita-date">📅 {item.tanggal} • {item.kategori || "Pengumuman"}</div>
                    <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>{item.judul}</h3>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem" }}>{item.ringkasan}</p>
                  </div>
                  <Link href={`/berita/${item.id}`} class="btn btn-outline" style={{ fontSize: "0.825rem", marginTop: "auto" }}>
                    Baca Selengkapnya →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/berita" class="btn btn-primary">
              Buka Halaman Arsip Berita Kelurahan →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Katalog UMKM Teaser Section */}
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">EKONOMI LOKAL</span>
            <h2>Katalog Produk UMKM Warga</h2>
            <p>Dukung perekonomian warga Kelurahan Mallilingi dengan membeli produk lokal berkualitas.</p>
          </div>

          <div class="umkm-grid">
            {data.umkm.slice(0, 3).map((item) => (
              <div key={item.id} class="umkm-card">
                <img src={item.foto} alt={item.nama} class="umkm-img" />
                <div class="umkm-body">
                  <div>
                    <span style={{ fontSize: "0.75rem", background: "#f0fdf4", color: "#047857", padding: "0.25rem 0.6rem", borderRadius: "9999px", fontWeight: 700 }}>
                      {item.kategori}
                    </span>
                    <h3 style={{ fontSize: "1.1rem", margin: "0.5rem 0 0.25rem 0" }}>{item.nama}</h3>
                    <div style={{ fontSize: "0.825rem", color: "#059669", fontWeight: 600, marginBottom: "0.5rem" }}>
                      👤 Pemilik: {item.pemilik}
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem" }}>{item.deskripsi}</p>
                  </div>

                  <Link href={`/umkm/${item.id}`} class="btn btn-outline" style={{ fontSize: "0.825rem", marginTop: "auto" }}>
                    Lihat Detail Produk UMKM →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/umkm" class="btn btn-primary">
              Buka Halaman Katalog UMKM Selengkapnya →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
