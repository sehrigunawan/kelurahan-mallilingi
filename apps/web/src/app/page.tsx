import Link from "next/link";
import { getMallilingiDataAsync } from "../lib/data";

export default async function HomePage() {
  const data = await getMallilingiDataAsync();

  return (
    <>
      {/* Hero Section */}
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <div class="hero-badge">
              🏛️ Portal Informasi Publik Kelurahan Mallilingi
            </div>
            <h1>Pelayanan Publik Cepat, Transparan, & Terintegrasi</h1>
            <p>
              Selamat datang di platform resmi Kelurahan Mallilingi, Kecamatan Bantaeng.
              Dapatkan kemudahan informasi persyaratan surat kependudukan, berita desa, dan direktori usaha warga Mallilingi.
            </p>
            <div class="hero-buttons">
              <Link href="/layanan" class="btn btn-primary">
                🔍 Cari Syarat Layanan Surat
              </Link>
              <Link href="/profil" class="btn btn-secondary">
                📖 Lihat Profil & Visi Misi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Kabar Terkini (Berita Highlight) */}
      <section class="section" style={{ backgroundColor: "#ffffff" }}>
        <div class="container">
          <div class="section-header">
            <span class="section-tag">KABAR TERKINI</span>
            <h2>Berita & Pengumuman Kelurahan</h2>
            <p>Informasi kegiatan pembangunan, sosial kemasyarakatan, dan kabar program KKN.</p>
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
              Lihat Seluruh Berita ({data.berita.length}) →
            </Link>
          </div>
        </div>
      </section>

      {/* Layanan Surat Preview */}
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">PANDUAN PUBLIK</span>
            <h2>Pelayanan Administrasi Kependudukan</h2>
            <p>Persyaratan dan alur pengurusan surat keterangan publik yang mudah dan transparan.</p>
          </div>

          <div class="layanan-grid">
            {data.layanan.slice(0, 3).map((item) => (
              <div key={item.id} class="layanan-card" style={{ padding: "1.5rem" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", background: "#ecfdf5", color: "#059669", padding: "0.25rem 0.6rem", borderRadius: "999px", fontWeight: 700 }}>
                    {item.kategori}
                  </span>
                  <h3 style={{ fontSize: "1.1rem", margin: "0.75rem 0 0.5rem 0" }}>{item.judul}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem" }}>
                    ⏱️ Estimasi: {item.waktu} | 💰 Biaya: {item.biaya}
                  </p>
                </div>
                <Link href="/layanan" class="btn btn-outline" style={{ fontSize: "0.825rem", marginTop: "auto" }}>
                  Lihat Syarat & Alur →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
