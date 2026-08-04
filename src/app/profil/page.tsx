import { getMallilingiDataAsync } from "../../lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProfilPage() {
  const data = await getMallilingiDataAsync();
  const info = data.info;

  return (
    <section className="section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">PROFIL & KEMITRAAN</span>
          <h2>Profil & Visi Misi Kelurahan Mallilingi</h2>
          <p>Mengenal lebih dekat pimpinan, gambaran umum wilayah, dan arah pembangunan Kelurahan Mallilingi.</p>
        </div>

        {/* 1. SEPARATE CARD 1: Profil & Sambutan Kepala Kelurahan */}
        <div className="profile-card">
          <div className="profil-card-grid">
            
            {/* Lurah Photo Column */}
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "160px", height: "160px", margin: "0 auto 1rem auto", borderRadius: "9999px", overflow: "hidden", border: "3px solid #059669", boxShadow: "0 4px 12px rgba(5,150,105,0.15)" }}>
                <img
                  src={info.fotoLurah || "/assets/images/lurah.jpg"}
                  alt={info.namaLurah}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <h3 style={{ fontSize: "1.1rem", color: "#0f172a", fontWeight: 700, marginBottom: "0.15rem" }}>
                {info.namaLurah}
              </h3>
              <div style={{ fontSize: "0.85rem", color: "#059669", fontWeight: 600, marginBottom: "0.4rem" }}>
                Kepala Kelurahan Mallilingi
              </div>
              <span style={{ fontSize: "0.75rem", background: "#f1f5f9", color: "#475569", padding: "0.2rem 0.65rem", borderRadius: "9999px", fontWeight: 500 }}>
                Kecamatan Bantaeng
              </span>
            </div>

            {/* Lurah Sambutan Brief */}
            <div>
              <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                SAMBUTAN KEPALA KELURAHAN
              </span>
              
              <h3 style={{ fontSize: "1.4rem", color: "#0f172a", fontWeight: 700, lineHeight: 1.3, marginBottom: "1rem" }}>
                &ldquo;{info.sambutanLurah}&rdquo;
              </h3>

              <p style={{ fontSize: "0.95rem", color: "#334155", lineHeight: 1.75, marginBottom: "0.85rem" }}>
                Selamat datang di portal informasi resmi Kelurahan Mallilingi. Kami berkomitmen memberikan pelayanan publik yang ramah, transparan, cepat, dan mengayomi bagi seluruh masyarakat.
              </p>
              <p style={{ fontSize: "0.925rem", color: "#64748b", lineHeight: 1.7 }}>
                Pemerintah Kelurahan Mallilingi senantiasa mengedepankan keterbukaan informasi, inovasi pelayanan publik digital, serta kemudahan administrasi bagi seluruh lapisan masyarakat di Kabupaten Bantaeng.
              </p>
            </div>

          </div>
        </div>

        {/* 2. CARD 2: Tugas Pokok dan Uraian Tugas Lurah */}
        <div className="profile-card">
          <h3 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, marginBottom: "1.25rem" }}>
            Tugas Pokok & Uraian Tugas Lurah
          </h3>

          <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "0.78rem", color: "#059669", fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>
              TUGAS POKOK
            </span>
            <p style={{ fontSize: "0.95rem", color: "#1e293b", lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
              Memimpin, melaksanakan sebagai kewenangan pemerintahan yang dilimpahkan oleh camat kepada kelurahan dan tugas lain yang diberikan oleh atasan.
            </p>
          </div>

          <div>
            <span style={{ fontSize: "0.78rem", color: "#059669", fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
              URAIAN TUGAS
            </span>
            <ul style={{ paddingLeft: "1.25rem", fontSize: "0.925rem", color: "#334155", lineHeight: 1.75 }}>
              <li style={{ marginBottom: "0.5rem" }}>
                Menyelenggarakan pelayanan masyarakat dan memberikan pelayanan administrative lingkup kelurahan.
              </li>
              <li>
                Menyusun, menetapkan pemberdayaan yang timbul atas inisiatif masyarakat.
              </li>
            </ul>
          </div>
        </div>

        {/* 3. CARD 3: Visi & Misi Pembangunan Kelurahan */}
        <div className="profile-card">
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
              <h3 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>Visi Kelurahan Mallilingi</h3>
            </div>
            <div style={{ background: "#ecfdf5", borderLeft: "4px solid #059669", padding: "1.15rem 1.35rem", borderRadius: "6px", fontSize: "1rem", color: "#065f46", fontWeight: 600, lineHeight: 1.7 }}>
              {info.visi}
            </div>
          </div>

          <div>
            <div style={{ marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>Misi Pembangunan Kelurahan</h3>
            </div>

            <div className="misi-grid">
              {(info.misi || []).map((misiItem, idx) => (
                <div key={idx} style={{ background: "#f8fafc", padding: "1.15rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 700, marginBottom: "0.3rem" }}>MISI POIN 0{idx + 1}</div>
                  <div style={{ fontSize: "0.925rem", color: "#1e293b", lineHeight: 1.6 }}>{misiItem}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. CARD 4: Data Statistik Kependudukan, Batas Geografis & Peta Wilayah */}
        <div className="profile-card">
          <h3 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, marginBottom: "1.25rem" }}>Data Statistik & Demografi Wilayah</h3>

          <div className="stats-grid" style={{ marginBottom: "1.5rem" }}>
            <div style={{ background: "#f8fafc", padding: "1.15rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block", marginBottom: "0.2rem" }}>Total Jumlah Penduduk / Jiwa</span>
              <h4 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>{info.jumlahPenduduk}</h4>
            </div>

            <div style={{ background: "#f8fafc", padding: "1.15rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block", marginBottom: "0.2rem" }}>Luas Total Wilayah</span>
              <h4 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>{info.luasWilayah}</h4>
            </div>

            <div style={{ background: "#f8fafc", padding: "1.15rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block", marginBottom: "0.2rem" }}>Wilayah RW / RT</span>
              <h4 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>{info.jumlahRW} / {info.jumlahRT}</h4>
            </div>
          </div>

          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "1rem 1.25rem", borderRadius: "10px", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#047857", marginBottom: "0.35rem", textTransform: "uppercase" }}>Batas Geografis Wilayah Kelurahan</div>
            <div className="batas-grid">
              <div><strong>Sebelah Utara:</strong> {info.batasWilayah?.utara}</div>
              <div><strong>Sebelah Selatan:</strong> {info.batasWilayah?.selatan}</div>
              <div><strong>Sebelah Timur:</strong> {info.batasWilayah?.timur}</div>
              <div><strong>Sebelah Barat:</strong> {info.batasWilayah?.barat}</div>
            </div>
          </div>

          {/* Peta Wilayah Kelurahan Image Container */}
          <div>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#475569", marginBottom: "0.5rem", display: "block", textTransform: "uppercase" }}>
              Peta Administrasi & Geografis Kelurahan Mallilingi
            </span>
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #cbd5e1", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <img
                src="/assets/images/peta_kelurahan.jpg"
                alt="Peta Wilayah Kelurahan Mallilingi"
                style={{ width: "100%", maxHeight: "450px", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>

        {/* 5. CARD 5: Gambaran Umum & Karakteristik Kelurahan Mallilingi */}
        <div className="profile-card">
          <h3 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, marginBottom: "1rem" }}>Gambaran Umum & Karakteristik Kelurahan Mallilingi</h3>
          
          <div style={{ fontSize: "0.975rem", lineHeight: 1.8, color: "#334155" }}>
            <p style={{ marginBottom: "1.25rem" }}>
              Kelurahan Mallilingi merupakan salah satu wilayah kelurahan di Kecamatan Bantaeng, Kabupaten Bantaeng, Provinsi Sulawesi Selatan. 
              Sebagai kawasan kelurahan yang berkembang pesat di pusat aktivitas perkotaan Bantaeng, Mallilingi memiliki potensi ekonomi lokal yang kuat, 
              kehidupan bermasyarakat yang rukun, serta komitmen tinggi terhadap inovasi pelayanan publik.
            </p>

            <p>
              Pemerintah Kelurahan Mallilingi di bawah kepemimpinan <strong>{info.namaLurah}</strong> terus mendorong digitalisasi pelayanan, 
              pemberdayaan potensi lokal, dan keterbukaan informasi publik secara berkelanjutan untuk mendukung kemajuan Kabupaten Bantaeng.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
