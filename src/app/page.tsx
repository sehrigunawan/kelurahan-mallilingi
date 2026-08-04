import Link from "next/link";
import { getMallilingiDataAsync } from "../lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const data = await getMallilingiDataAsync();
  const info = data.info;

  // Duplicate arrays for seamless unlimited horizontal marquee scrolling
  const marqueeLayananList = [...data.layanan, ...data.layanan];
  const marqueeBeritaList = [...data.berita, ...data.berita, ...data.berita];

  return (
    <>
      {/* 1. Hero Section with Parallax Background */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              Portal Informasi Resmi Kelurahan Mallilingi
            </div>
            <h1>Pelayanan Publik Cepat, Transparan, & Terintegrasi</h1>
            <p>
              Selamat datang di platform resmi Kelurahan Mallilingi, Kecamatan Bantaeng.
              Akses informasi layanan surat kependudukan, berita kegiatan desa, dan profil wilayah dalam satu platform terpadu.
            </p>
            <div className="hero-buttons">
              <Link href="/administrasi" className="btn btn-primary">
                Syarat Layanan Surat
              </Link>
              <Link href="/profil" className="btn btn-secondary">
                Profil Kelurahan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Ringkasan Wilayah & Sambutan Lurah */}
      <section className="section" style={{ backgroundColor: "#ffffff" }}>
        <div className="container">
          
          {/* === A. PALING ATAS: SAMBUTAN KEPALA KELURAHAN === */}
          <div style={{ background: "#f8fafc", padding: "2.25rem", borderRadius: "16px", border: "1px solid #cbd5e1", marginBottom: "3.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "2rem", alignItems: "center" }}>
              
              <div style={{ textAlign: "center" }}>
                <div style={{ width: "130px", height: "130px", margin: "0 auto 0.75rem auto", borderRadius: "9999px", overflow: "hidden", border: "3px solid #059669", boxShadow: "0 4px 12px rgba(5,150,105,0.15)" }}>
                  <img
                    src={info.fotoLurah || "/assets/images/default_profile.jpg"}
                    alt={info.namaLurah}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <h3 style={{ fontSize: "1.05rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>
                  {info.namaLurah}
                </h3>
                <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 600, display: "block" }}>
                  Kepala Kelurahan Mallilingi
                </span>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: "0.35rem" }}>
                  SAMBUTAN KEPALA KELURAHAN
                </span>
                <h3 style={{ fontSize: "1.25rem", color: "#0f172a", fontWeight: 700, lineHeight: 1.35, marginBottom: "0.75rem" }}>
                  &ldquo;{info.sambutanLurah}&rdquo;
                </h3>
                <p style={{ fontSize: "0.925rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                  Pemerintah Kelurahan Mallilingi berkomitmen memberikan pelayanan publik terbaik berbasis digital, terbuka, dan cepat bagi seluruh warga masyarakat di Kabupaten Bantaeng.
                </p>
              </div>

            </div>

          </div>

          {/* === B. DITENGAH: RINGKASAN STATISTIK & DEMOGRAFI === */}
          <div style={{ marginBottom: "3.5rem" }}>
            <div className="stats-grid">
              <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block", marginBottom: "0.2rem" }}>Jumlah Penduduk / Jiwa</span>
                <h4 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>{info.jumlahPenduduk}</h4>
              </div>

              <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block", marginBottom: "0.2rem" }}>Luas Wilayah</span>
                <h4 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>{info.luasWilayah}</h4>
              </div>

              <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block", marginBottom: "0.2rem" }}>Wilayah RW / RT</span>
                <h4 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>{info.jumlahRW} / {info.jumlahRT}</h4>
              </div>
            </div>
          </div>

          {/* === C. PALING BAWAH: GAMBAR PETA KELURAHAN === */}
          <div>
            <div style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 2px 10px rgba(0,0,0,0.04)", background: "#f8fafc" }}>
              <img
                src="/assets/images/peta_kelurahan.jpg"
                alt="Peta Geografis Kelurahan Mallilingi"
                style={{ width: "100%", maxHeight: "420px", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Layanan Publik Section */}
      <section className="section" style={{ overflow: "hidden", background: "#f8fafc" }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: "2rem" }}>
            <span className="section-tag">PANDUAN PUBLIK</span>
            <h2>Pelayanan Administrasi Kependudukan</h2>
            <p>Informasi persyaratan dan alur dokumen kependudukan yang transparan tanpa pungutan biaya (Rp 0).</p>
          </div>
        </div>

        {/* Unlimited Horizontal Scroll Marquee for Layanan with Fixed Overlay */}
        <div className="marquee-wrapper marquee-wrapper-bg-slate">
          <div className="marquee-container">
            <div className="marquee-track">
              {marqueeLayananList.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="marquee-card">
                  <div>
                    <span style={{ fontSize: "0.725rem", background: "#ecfdf5", color: "#059669", padding: "0.2rem 0.55rem", borderRadius: "9999px", fontWeight: 600, display: "inline-block", marginBottom: "0.5rem" }}>
                      {item.kategori}
                    </span>

                    <h3 style={{ fontSize: "1rem", color: "#0f172a", marginBottom: "0.4rem", fontWeight: 600, lineHeight: 1.35 }}>
                      {item.judul}
                    </h3>

                    <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.55, marginBottom: "1rem" }}>
                      {item.deskripsi}
                    </p>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 500, marginBottom: "0.75rem", display: "flex", gap: "0.75rem" }}>
                      <span>Waktu: {item.waktu}</span>
                      <span>• {item.biaya}</span>
                    </div>

                    <Link href="/administrasi" className="btn btn-outline" style={{ fontSize: "0.8rem", width: "100%", padding: "0.45rem" }}>
                      Lihat Syarat & Alur →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Kabar Terkini Section */}
      <section className="section" style={{ overflow: "hidden", backgroundColor: "#ffffff" }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: "2rem" }}>
            <span className="section-tag">KABAR TERKINI</span>
            <h2>Berita & Pengumuman Terbaru</h2>
            <p>Publikasi resmi mengenai kegiatan pembangunan, sosial kemasyarakatan, dan program kelurahan.</p>
          </div>
        </div>

        {/* Unlimited Horizontal Scroll Marquee for Berita with Fixed Overlay */}
        <div className="marquee-wrapper">
          <div className="marquee-container">
            <div className="marquee-track" style={{ animationDuration: "40s" }}>
              {marqueeBeritaList.map((item, idx) => (
                <article key={`${item.id}-${idx}`} className="berita-marquee-card">
                  <img src={item.gambar || "/assets/images/kantor_kelurahan.jpg"} alt={item.judul} className="berita-img" />
                  <div className="berita-body">
                    <div>
                      <div className="berita-date">{item.tanggal} • {item.kategori || "Pengumuman"}</div>
                      <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "#0f172a", fontWeight: 600 }}>{item.judul}</h3>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem", lineHeight: 1.55 }}>{item.ringkasan}</p>
                    </div>
                    <Link href={`/berita/${item.id}`} className="btn btn-outline" style={{ fontSize: "0.825rem", marginTop: "auto" }}>
                      Baca Selengkapnya →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
