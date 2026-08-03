import { getMallilingiDataAsync } from "../../lib/data";
import ProfilInteractiveCard from "./ProfilInteractiveCard";

export default async function ProfilPage() {
  const data = await getMallilingiDataAsync();
  const info = data.info;

  return (
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">PROFIL MALAILINGI</span>
          <h2>Profil Kelurahan, Visi Misi, & Wilayah</h2>
          <p>Informasi mendalam mengenai pimpinan kelurahan, arah kebijakan pembangunan, data kependudukan, serta gambaran geografis Kelurahan Mallilingi.</p>
        </div>

        {/* Top Interactive Card Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "2.5rem", alignItems: "stretch", marginBottom: "4rem" }}>
          {/* Interactive Lurah & Visi Misi Card Component */}
          <ProfilInteractiveCard info={info} />

          {/* Stats Card Box */}
          <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "1.25rem", color: "#0f172a", marginBottom: "0.3rem" }}>📊 Data Statistik Kependudukan</h3>
              <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.25rem" }}>Data resmi wilayah dan demografi Kelurahan Mallilingi, Kecamatan Bantaeng.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1rem" }}>
                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "0.75rem 1rem", borderRadius: "10px", display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{ fontSize: "1.2rem", width: "38px", height: "38px", background: "#ecfdf5", color: "#059669", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>👥</div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Total Jumlah Penduduk</span>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{info.jumlahPenduduk}</h4>
                  </div>
                </div>

                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "0.75rem 1rem", borderRadius: "10px", display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{ fontSize: "1.2rem", width: "38px", height: "38px", background: "#ecfdf5", color: "#059669", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>🏠</div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Jumlah Kepala Keluarga (KK)</span>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{info.jumlahKK}</h4>
                  </div>
                </div>

                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "0.75rem 1rem", borderRadius: "10px", display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{ fontSize: "1.2rem", width: "38px", height: "38px", background: "#ecfdf5", color: "#059669", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>🗺️</div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Luas Total Wilayah</span>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{info.luasWilayah}</h4>
                  </div>
                </div>

                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "0.75rem 1rem", borderRadius: "10px", display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{ fontSize: "1.2rem", width: "38px", height: "38px", background: "#ecfdf5", color: "#059669", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>🏢</div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Pembagian Rukun Warga (RW) & Rukun Tetangga (RT)</span>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{info.jumlahRW} / {info.jumlahRT}</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Geografis Box */}
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "0.75rem 1rem", borderRadius: "10px" }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#047857", marginBottom: "0.35rem", textTransform: "uppercase" }}>📍 Batas Geografis Wilayah Kelurahan</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.25rem 0.6rem", fontSize: "0.75rem", color: "#166534" }}>
                <div><strong>Sebelah Utara:</strong> {info.batasWilayah?.utara}</div>
                <div><strong>Sebelah Selatan:</strong> {info.batasWilayah?.selatan}</div>
                <div><strong>Sebelah Timur:</strong> {info.batasWilayah?.timur}</div>
                <div><strong>Sebelah Barat:</strong> {info.batasWilayah?.barat}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Geography & Historical Overview Section */}
        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "2.5rem", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}>
          <h3 style={{ fontSize: "1.4rem", color: "#0f172a", marginBottom: "1rem" }}>🏛️ Gambaran Umum & Karakteristik Kelurahan Mallilingi</h3>
          
          <div style={{ fontSize: "1rem", lineHeight: 1.8, color: "#334155" }}>
            <p style={{ marginBottom: "1rem" }}>
              Kelurahan Mallilingi merupakan salah satu wilayah kelurahan di Kecamatan Bantaeng, Kabupaten Bantaeng, Provinsi Sulawesi Selatan. 
              Sebagai kawasan kelurahan yang berkembang pesat di pusat aktivitas perkotaan Bantaeng, Mallilingi memiliki potensi ekonomi lokal yang kuat, 
              kehidupan bermasyarakat yang rukun, serta komitmen tinggi terhadap inovasi pelayanan publik.
            </p>

            <h4 style={{ fontSize: "1.15rem", color: "#0f172a", marginTop: "1.5rem", marginBottom: "0.5rem" }}>🎯 Misi Utama Pembangunan Daerah:</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", margin: "1rem 0 1.5rem 0" }}>
              {(info.misi || []).map((misiItem, idx) => (
                <div key={idx} style={{ background: "#f8fafc", padding: "1rem 1.25rem", borderRadius: "10px", borderLeft: "4px solid #059669" }}>
                  <div style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700, marginBottom: "0.2rem" }}>MISI POIN {idx + 1}</div>
                  <div style={{ fontSize: "0.925rem", color: "#1e293b" }}>{misiItem}</div>
                </div>
              ))}
            </div>

            <p>
              Pemerintah Kelurahan Mallilingi di bawah kepemimpinan <strong>{info.namaLurah}</strong> terus mendorong digitalisasi pelayanan, 
              pemberdayaan UMKM lokal, dan keterbukaan informasi publik secara berkelanjutan untuk mendukung kemajuan Kabupaten Bantaeng.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
