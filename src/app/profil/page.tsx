import { getMallilingiDataAsync } from "../../lib/data";

export default async function ProfilPage() {
  const data = await getMallilingiDataAsync();
  const info = data.info;

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">PROFIL MALLILINGI</span>
          <h2>Profil Kelurahan, Visi Misi, & Wilayah</h2>
          <p>Informasi mendalam mengenai pimpinan kelurahan, arah kebijakan pembangunan, data kependudukan, serta gambaran geografis Kelurahan Mallilingi.</p>
        </div>

        {/* 1. SEPARATE CARD 1: Profil & Sambutan Kepala Kelurahan */}
        <div className="profile-card">
          <div className="profil-card-grid">
            
            {/* Lurah Photo Column */}
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "180px", height: "220px", margin: "0 auto 1rem auto", borderRadius: "16px", overflow: "hidden", border: "3px solid #ecfdf5", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                <img src={info.fotoLurah || "/assets/images/lurah.jpg"} alt={info.namaLurah} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 style={{ fontSize: "1.15rem", color: "#0f172a", marginBottom: "0.2rem", fontWeight: 700 }}>{info.namaLurah}</h3>
              <div style={{ color: "#059669", fontWeight: 700, fontSize: "0.9rem" }}>Lurah Mallilingi</div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "0.15rem" }}>NIP. {info.nipLurah}</div>
            </div>

            {/* Sambutan Text Column */}
            <div>
              <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem", display: "block" }}>
                SAMBUTAN KEPALA KELURAHAN
              </span>
              <h3 style={{ fontSize: "1.5rem", color: "#0f172a", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.3 }}>
                Komitmen Pelayanan Publik yang Transparan & Mengayomi
              </h3>
              <p style={{ fontSize: "1rem", color: "#334155", lineHeight: 1.85, fontStyle: "italic", marginBottom: "1rem" }}>
                &ldquo;{info.sambutanLurah}&rdquo;
              </p>
              <p style={{ fontSize: "0.925rem", color: "#64748b", lineHeight: 1.7 }}>
                Pemerintah Kelurahan Mallilingi senantiasa mengedepankan keterbukaan informasi, inovasi pelayanan publik digital, serta kemudahan administrasi bagi seluruh lapisan masyarakat di Kabupaten Bantaeng.
              </p>
            </div>

          </div>
        </div>

        {/* 2. SEPARATE CARD 2: Visi & Misi Pembangunan Kelurahan */}
        <div className="profile-card">
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "1.2rem" }}>🎯</span>
              <h3 style={{ fontSize: "1.3rem", color: "#0f172a", fontWeight: 800, margin: 0 }}>Visi Kelurahan Mallilingi</h3>
            </div>
            <div style={{ background: "#ecfdf5", borderLeft: "4px solid #059669", padding: "1.25rem 1.5rem", borderRadius: "8px", fontSize: "1.05rem", color: "#065f46", fontWeight: 600, lineHeight: 1.7 }}>
              {info.visi}
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "1.2rem" }}>🚀</span>
              <h3 style={{ fontSize: "1.3rem", color: "#0f172a", fontWeight: 800, margin: 0 }}>Misi Pembangunan Kelurahan</h3>
            </div>

            <div className="misi-grid">
              {(info.misi || []).map((misiItem, idx) => (
                <div key={idx} style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "0.78rem", color: "#059669", fontWeight: 800, marginBottom: "0.3rem" }}>MISI POIN 0{idx + 1}</div>
                  <div style={{ fontSize: "0.95rem", color: "#1e293b", lineHeight: 1.6 }}>{misiItem}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. CARD 3: Data Statistik Kependudukan & Batas Geografis */}
        <div className="profile-card">
          <h3 style={{ fontSize: "1.3rem", color: "#0f172a", fontWeight: 800, marginBottom: "1.25rem" }}>📊 Data Statistik & Demografi Wilayah</h3>

          <div className="stats-grid" style={{ marginBottom: "1.5rem" }}>
            <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "45px", height: "45px", background: "#ecfdf5", color: "#059669", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>👥</div>
              <div>
                <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block" }}>Total Jumlah Penduduk</span>
                <h4 style={{ fontSize: "1.25rem", color: "#0f172a", fontWeight: 800, margin: 0 }}>{info.jumlahPenduduk}</h4>
              </div>
            </div>

            <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "45px", height: "45px", background: "#ecfdf5", color: "#059669", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>🏠</div>
              <div>
                <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block" }}>Jumlah Kepala Keluarga</span>
                <h4 style={{ fontSize: "1.25rem", color: "#0f172a", fontWeight: 800, margin: 0 }}>{info.jumlahKK}</h4>
              </div>
            </div>

            <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "45px", height: "45px", background: "#ecfdf5", color: "#059669", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>🗺️</div>
              <div>
                <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block" }}>Luas Total Wilayah</span>
                <h4 style={{ fontSize: "1.25rem", color: "#0f172a", fontWeight: 800, margin: 0 }}>{info.luasWilayah}</h4>
              </div>
            </div>

            <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "45px", height: "45px", background: "#ecfdf5", color: "#059669", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>🏢</div>
              <div>
                <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block" }}>Wilayah RW / RT</span>
                <h4 style={{ fontSize: "1.25rem", color: "#0f172a", fontWeight: 800, margin: 0 }}>{info.jumlahRW} / {info.jumlahRT}</h4>
              </div>
            </div>
          </div>

          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "1rem 1.25rem", borderRadius: "12px" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#047857", marginBottom: "0.35rem", textTransform: "uppercase" }}>📍 Batas Geografis Wilayah Kelurahan</div>
            <div className="batas-grid">
              <div><strong>Sebelah Utara:</strong> {info.batasWilayah?.utara}</div>
              <div><strong>Sebelah Selatan:</strong> {info.batasWilayah?.selatan}</div>
              <div><strong>Sebelah Timur:</strong> {info.batasWilayah?.timur}</div>
              <div><strong>Sebelah Barat:</strong> {info.batasWilayah?.barat}</div>
            </div>
          </div>
        </div>

        {/* 4. CARD 4: Gambaran Umum & Karakteristik Kelurahan Mallilingi */}
        <div className="profile-card">
          <h3 style={{ fontSize: "1.3rem", color: "#0f172a", fontWeight: 800, marginBottom: "1rem" }}>🏛️ Gambaran Umum & Karakteristik Kelurahan Mallilingi</h3>
          
          <div style={{ fontSize: "1rem", lineHeight: 1.85, color: "#334155" }}>
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
