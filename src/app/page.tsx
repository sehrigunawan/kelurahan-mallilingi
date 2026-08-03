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
              🏛️ Portal Informasi Resmi Kelurahan Mallilingi
            </div>
            <h1>Pelayanan Publik Cepat, Transparan, & Terintegrasi</h1>
            <p>
              Selamat datang di platform resmi Kelurahan Mallilingi, Kecamatan Bantaeng.
              Akses informasi layanan surat kependudukan, berita kegiatan desa, dan profil wilayah dalam satu platform terpadu.
            </p>
            <div className="hero-buttons">
              <Link href="/administrasi" className="btn btn-primary">
                🔍 Syarat Layanan Surat
              </Link>
              <Link href="/profil" className="btn btn-secondary">
                📖 Profil Kelurahan & Visi Misi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sekilas Profil Mallilingi Section */}
      <section className="section" style={{ backgroundColor: "#ffffff" }}>
        <div className="container">
          
          {/* === A. PALING ATAS: DESAIN SAMBUTAN LURAH (Inspirasi Gambar Referensi) === */}
          <div className="sambutan-grid">
            
            {/* Left Column: Photo Frame + Floating Badge */}
            <div style={{ position: "relative" }}>
              {/* Outer Background Shadow Card */}
              <div style={{ position: "absolute", top: "15px", left: "15px", width: "100%", height: "100%", background: "#fecdd3", borderRadius: "24px", zIndex: 1 }} />
              
              {/* Main Photo Card */}
              <div style={{ position: "relative", zIndex: 2, background: "#f1f5f9", borderRadius: "24px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 10px 25px rgba(0,0,0,0.08)", height: "420px" }}>
                <img
                  src={info.fotoLurah || "/assets/images/lurah.jpg"}
                  alt={info.namaLurah}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />

                {/* Floating Bottom Left Badge (Matching Reference Image) */}
                <div style={{ position: "absolute", bottom: "20px", left: "20px", background: "#ffffff", padding: "0.85rem 1.25rem", borderRadius: "12px", boxShadow: "0 6px 20px rgba(0,0,0,0.15)", borderLeft: "4px solid #e11d48", zIndex: 3, maxWidth: "240px" }}>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.1rem" }}>{info.namaLurah}</div>
                  <div style={{ fontSize: "0.8rem", color: "#e11d48", fontWeight: 700 }}>Lurah Mallilingi</div>
                </div>
              </div>
            </div>

            {/* Right Column: Title & Paragraph Quotes (Matching Reference Image) */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div style={{ width: "32px", height: "2px", background: "#e11d48" }} />
                <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#e11d48", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  SAMBUTAN LURAH
                </span>
              </div>

              <h2 style={{ fontSize: "2.2rem", color: "#0f172a", fontWeight: 800, lineHeight: 1.2, marginBottom: "1.5rem" }}>
                Mewujudkan Pelayanan Publik Cepat, Transparan, & Mengayomi Warga
              </h2>

              <div style={{ fontSize: "0.98rem", color: "#334155", lineHeight: 1.85 }}>
                <p style={{ marginBottom: "1rem" }}>
                  &ldquo;{info.sambutanLurah}&rdquo;
                </p>

                <p style={{ marginBottom: "1.25rem" }}>
                  Dengan semangat gotong royong dan keterbukaan informasi, kami menyediakan pelayanan kependudukan yang ramah, transparan, dan terintegrasi demi kenyamanan dan kesejahteraan seluruh masyarakat Kelurahan Mallilingi.
                </p>

                <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "1.05rem" }}>
                  Mari bersinergi bersama membangun Kelurahan Mallilingi yang sejahtera dan berdaya saing.
                </div>
              </div>
            </div>

          </div>

          {/* === B. DITENGAH: RINGKASAN STATISTIK & DEMOGRAFI === */}
          <div style={{ marginBottom: "3.5rem" }}>
            <div className="stats-grid">
              <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "45px", height: "45px", background: "#ecfdf5", color: "#059669", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>👥</div>
                <div>
                  <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block" }}>Jumlah Penduduk</span>
                  <h4 style={{ fontSize: "1.25rem", color: "#0f172a", fontWeight: 800, margin: 0 }}>{info.jumlahPenduduk}</h4>
                </div>
              </div>

              <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "45px", height: "45px", background: "#ecfdf5", color: "#059669", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>🏠</div>
                <div>
                  <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block" }}>Kepala Keluarga (KK)</span>
                  <h4 style={{ fontSize: "1.25rem", color: "#0f172a", fontWeight: 800, margin: 0 }}>{info.jumlahKK}</h4>
                </div>
              </div>

              <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "45px", height: "45px", background: "#ecfdf5", color: "#059669", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>🗺️</div>
                <div>
                  <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block" }}>Luas Wilayah</span>
                  <h4 style={{ fontSize: "1.25rem", color: "#0f172a", fontWeight: 800, margin: 0 }}>{info.luasWilayah}</h4>
                </div>
              </div>

              <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "45px", height: "45px", background: "#ecfdf5", color: "#059669", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>🏢</div>
                <div>
                  <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block" }}>Wilayah RW / RT</span>
                  <h4 style={{ fontSize: "1.25rem", color: "#0f172a", fontWeight: 800, margin: 0 }}>{info.jumlahRW} / {info.jumlahRT}</h4>
                </div>
              </div>
            </div>
          </div>

          {/* === C. PALING BAWAH: GAMBAR PETA KELURAHAN (Format Gambar PNG/JPG Lokal) === */}
          <div>
            <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.06)", background: "#f8fafc" }}>
              <img
                src="/assets/images/peta_kelurahan.jpg"
                alt="Peta Geografis Kelurahan Mallilingi"
                style={{ width: "100%", maxHeight: "450px", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Layanan Publik Section (Unlimited Horizontal Marquee Scroll) */}
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
                  <span style={{ fontSize: "0.725rem", background: "#ecfdf5", color: "#059669", padding: "0.2rem 0.55rem", borderRadius: "9999px", fontWeight: 700, display: "inline-block", marginBottom: "0.5rem" }}>
                    {item.kategori}
                  </span>

                  <h3 style={{ fontSize: "1.05rem", color: "#0f172a", marginBottom: "0.4rem", fontWeight: 700, lineHeight: 1.3 }}>
                    {item.judul}
                  </h3>

                  <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, marginBottom: "1rem" }}>
                    {item.deskripsi}
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 600, marginBottom: "0.75rem", display: "flex", gap: "0.75rem" }}>
                    <span>⏱️ {item.waktu}</span>
                    <span>💰 {item.biaya}</span>
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

      {/* 4. Kabar Terkini Section (Unlimited Horizontal Marquee Scroll for Berita) */}
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
                    <div className="berita-date">📅 {item.tanggal} • {item.kategori || "Pengumuman"}</div>
                    <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem", color: "#0f172a" }}>{item.judul}</h3>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem" }}>{item.ringkasan}</p>
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
