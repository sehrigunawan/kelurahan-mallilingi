import Link from "next/link";
import { getMallilingiDataAsync } from "../lib/data";

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
                Profil Kelurahan & Visi Misi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sekilas Profil Mallilingi Section */}
      <section className="section" style={{ backgroundColor: "#ffffff" }}>
        <div className="container">
          
          {/* === A. PALING ATAS: DESAIN SAMBUTAN LURAH === */}
          <div className="sambutan-grid">
            
            {/* Left Column: Photo Frame + Floating Badge */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: "12px", left: "12px", width: "100%", height: "100%", background: "#fecdd3", borderRadius: "20px", zIndex: 1 }} />
              
              <div style={{ position: "relative", zIndex: 2, background: "#f1f5f9", borderRadius: "20px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.06)", height: "400px" }}>
                <img
                  src={info.fotoLurah || "/assets/images/lurah.jpg"}
                  alt={info.namaLurah}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />

                <div style={{ position: "absolute", bottom: "16px", left: "16px", background: "#ffffff", padding: "0.75rem 1.15rem", borderRadius: "10px", boxShadow: "0 4px 14px rgba(0,0,0,0.1)", borderLeft: "4px solid #e11d48", zIndex: 3, maxWidth: "240px" }}>
                  <div style={{ fontSize: "0.925rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.1rem" }}>{info.namaLurah}</div>
                  <div style={{ fontSize: "0.78rem", color: "#e11d48", fontWeight: 600 }}>Lurah Mallilingi</div>
                </div>
              </div>
            </div>

            {/* Right Column: Title & Paragraph Quotes */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.65rem" }}>
                <div style={{ width: "28px", height: "2px", background: "#e11d48" }} />
                <span style={{ fontSize: "0.825rem", fontWeight: 700, color: "#e11d48", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  SAMBUTAN LURAH
                </span>
              </div>

              <h2 style={{ fontSize: "2rem", color: "#0f172a", fontWeight: 700, lineHeight: 1.25, marginBottom: "1.25rem" }}>
                Mewujudkan Pelayanan Publik Cepat, Transparan, & Mengayomi Warga
              </h2>

              <div style={{ fontSize: "0.975rem", color: "#334155", lineHeight: 1.8 }}>
                <p style={{ marginBottom: "1rem" }}>
                  &ldquo;{info.sambutanLurah}&rdquo;
                </p>

                <p style={{ marginBottom: "1.25rem" }}>
                  Dengan semangat gotong royong dan keterbukaan informasi, kami menyediakan pelayanan kependudukan yang ramah, transparan, dan terintegrasi demi kenyamanan dan kesejahteraan seluruh masyarakat Kelurahan Mallilingi.
                </p>

                <div style={{ fontWeight: 600, color: "#0f172a", fontSize: "1rem" }}>
                  Mari bersinergi bersama membangun Kelurahan Mallilingi yang sejahtera dan berdaya saing.
                </div>
              </div>
            </div>

          </div>

          {/* === B. DITENGAH: RINGKASAN STATISTIK & DEMOGRAFI === */}
          <div style={{ marginBottom: "3.5rem" }}>
            <div className="stats-grid">
              <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block", marginBottom: "0.2rem" }}>Jumlah Penduduk</span>
                <h4 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>{info.jumlahPenduduk}</h4>
              </div>

              <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block", marginBottom: "0.2rem" }}>Kepala Keluarga (KK)</span>
                <h4 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>{info.jumlahKK}</h4>
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

        {/* Unlimited Horizontal Scroll Marquee for Layanan */}
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

        {/* Unlimited Horizontal Scroll Marquee for Berita */}
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
      </section>
    </>
  );
}
