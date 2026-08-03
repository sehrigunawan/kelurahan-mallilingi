import { getMallilingiDataAsync } from "../../lib/data";
import ProfilInteractiveCard from "./ProfilInteractiveCard";

export default async function ProfilPage() {
  const data = await getMallilingiDataAsync();
  const info = data.info;

  return (
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">PROFIL & KOMITMEN</span>
          <h2>Profil Kelurahan & Visi Misi</h2>
          <p>Mewujudkan tata kelola kelurahan yang responsif, transparan, dan mengayomi seluruh lapisan warga.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "stretch" }}>
          {/* Interactive Lurah & Visi Misi Card Component */}
          <ProfilInteractiveCard info={info} />

          {/* Stats Card Box */}
          <div style={{ background: "#ffffff", padding: "1.75rem", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "1.2rem", color: "#0f172a", marginBottom: "0.2rem" }}>📊 Data Statistik & Demografi</h3>
              <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem" }}>Gambaran umum kependudukan & wilayah Kelurahan Mallilingi.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "0.75rem" }}>
                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "0.65rem 0.9rem", borderRadius: "10px", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ fontSize: "1.15rem", width: "36px", height: "36px", background: "#ecfdf5", color: "#059669", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>👥</div>
                  <div>
                    <span style={{ fontSize: "0.725rem", color: "#64748b", display: "block" }}>Jumlah Penduduk</span>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{info.jumlahPenduduk}</h4>
                  </div>
                </div>

                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "0.65rem 0.9rem", borderRadius: "10px", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ fontSize: "1.15rem", width: "36px", height: "36px", background: "#ecfdf5", color: "#059669", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>🏠</div>
                  <div>
                    <span style={{ fontSize: "0.725rem", color: "#64748b", display: "block" }}>Kepala Keluarga</span>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{info.jumlahKK}</h4>
                  </div>
                </div>

                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "0.65rem 0.9rem", borderRadius: "10px", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ fontSize: "1.15rem", width: "36px", height: "36px", background: "#ecfdf5", color: "#059669", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>🗺️</div>
                  <div>
                    <span style={{ fontSize: "0.725rem", color: "#64748b", display: "block" }}>Luas Wilayah</span>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{info.luasWilayah}</h4>
                  </div>
                </div>

                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "0.65rem 0.9rem", borderRadius: "10px", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ fontSize: "1.15rem", width: "36px", height: "36px", background: "#ecfdf5", color: "#059669", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>🏢</div>
                  <div>
                    <span style={{ fontSize: "0.725rem", color: "#64748b", display: "block" }}>Wilayah Administrasi</span>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{info.jumlahRW} / {info.jumlahRT}</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Geografis Box */}
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "0.65rem 0.85rem", borderRadius: "10px" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#047857", marginBottom: "0.25rem", textTransform: "uppercase" }}>📍 Batas Geografis Wilayah</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.2rem 0.5rem", fontSize: "0.725rem", color: "#166534" }}>
                <div><strong>Utara:</strong> {info.batasWilayah?.utara}</div>
                <div><strong>Selatan:</strong> {info.batasWilayah?.selatan}</div>
                <div><strong>Timur:</strong> {info.batasWilayah?.timur}</div>
                <div><strong>Barat:</strong> {info.batasWilayah?.barat}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
