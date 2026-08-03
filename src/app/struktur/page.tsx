import { getMallilingiDataAsync } from "../../lib/data";

export default async function StrukturPage() {
  const data = await getMallilingiDataAsync();
  const lurah = data.struktur[0];
  const seklur = data.struktur[1];
  const kasiList = data.struktur.slice(2, 5);
  const lembagaList = data.struktur.slice(5);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">BAGAN SOTK</span>
          <h2>Peta Struktur Organisasi & Tata Kerja</h2>
          <p>Bagan hierarki kepengurusan Pemerintah Kelurahan Mallilingi dan Lembaga Kemasyarakatan.</p>
        </div>

        {/* Organizational Tree Container */}
        <div style={{ background: "#ffffff", padding: "3rem 2rem", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.06)", overflowX: "auto" }}>
          <div style={{ minWidth: "850px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            
            {/* LEVEL 1: LURAH */}
            <div style={{ background: "#ecfdf5", border: "2px solid #059669", padding: "1.25rem 2rem", borderRadius: "14px", width: "320px", textAlign: "center", boxShadow: "0 4px 12px rgba(5,150,105,0.15)", position: "relative" }}>
              <div style={{ width: "90px", height: "90px", margin: "0 auto 0.75rem auto", borderRadius: "9999px", overflow: "hidden", border: "3px solid #ffffff", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                <img src={lurah.foto} alt={lurah.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <span style={{ fontSize: "0.75rem", background: "#059669", color: "white", padding: "0.2rem 0.65rem", borderRadius: "9999px", fontWeight: 700, textTransform: "uppercase" }}>
                Pimpinan Tinggi
              </span>
              <h3 style={{ fontSize: "1.1rem", color: "#0f172a", marginTop: "0.5rem", marginBottom: "0.15rem" }}>{lurah.nama}</h3>
              <div style={{ color: "#047857", fontWeight: 700, fontSize: "0.9rem" }}>{lurah.jabatan}</div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "0.2rem" }}>{lurah.nip}</div>
            </div>

            {/* Connecting Vertical Line (Lurah -> Seklur) */}
            <div style={{ width: "2px", height: "35px", background: "#059669" }} />

            {/* LEVEL 2: SEKRETARIS KELURAHAN */}
            <div style={{ background: "#ffffff", border: "2px solid #0d9488", padding: "1rem 1.75rem", borderRadius: "12px", width: "290px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ width: "75px", height: "75px", margin: "0 auto 0.5rem auto", borderRadius: "9999px", overflow: "hidden", border: "2px solid #ecfdf5" }}>
                <img src={seklur.foto} alt={seklur.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <span style={{ fontSize: "0.7rem", background: "#0d9488", color: "white", padding: "0.15rem 0.5rem", borderRadius: "9999px", fontWeight: 700 }}>
                Sekretariat
              </span>
              <h4 style={{ fontSize: "0.98rem", color: "#0f172a", marginTop: "0.35rem", marginBottom: "0.1rem" }}>{seklur.nama}</h4>
              <div style={{ color: "#0d9488", fontWeight: 600, fontSize: "0.85rem" }}>{seklur.jabatan}</div>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{seklur.nip}</div>
            </div>

            {/* Connecting Vertical Line (Seklur -> Branch Line) */}
            <div style={{ width: "2px", height: "35px", background: "#cbd5e1" }} />

            {/* Horizontal Branch Bar for Kasi */}
            <div style={{ width: "720px", height: "2px", background: "#cbd5e1", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "2px", height: "25px", background: "#cbd5e1" }} />
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "2px", height: "25px", background: "#cbd5e1" }} />
              <div style={{ position: "absolute", top: 0, right: 0, width: "2px", height: "25px", background: "#cbd5e1" }} />
            </div>

            {/* LEVEL 3: SEKSI-SEKSI (KASI) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem", width: "800px", marginTop: "25px", marginBottom: "3rem" }}>
              {kasiList.map((kasi, idx) => (
                <div key={idx} style={{ background: "#f8fafc", border: "1px solid #cbd5e1", padding: "1rem", borderRadius: "10px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: "65px", height: "65px", margin: "0 auto 0.5rem auto", borderRadius: "9999px", overflow: "hidden", border: "2px solid #ffffff" }}>
                    <img src={kasi.foto} alt={kasi.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#059669", marginBottom: "0.2rem" }}>{kasi.jabatan}</div>
                  <h5 style={{ fontSize: "0.9rem", color: "#0f172a", margin: "0.2rem 0" }}>{kasi.nama}</h5>
                  <div style={{ fontSize: "0.725rem", color: "#64748b" }}>{kasi.nip}</div>
                </div>
              ))}
            </div>

            {/* Division Line to Lembaga Kemasyarakatan */}
            <div style={{ width: "100%", borderTop: "2px dashed #cbd5e1", margin: "1rem 0 2rem 0", position: "relative", textAlign: "center" }}>
              <span style={{ position: "relative", top: "-13px", background: "#ffffff", padding: "0 1rem", fontSize: "0.8rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                🏛️ Mitra & Lembaga Kemasyarakatan Kelurahan
              </span>
            </div>

            {/* LEVEL 4: LEMBAGA KEMASYARAKATAN (LPM, PKK, KARANG TARUNA) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem", width: "800px" }}>
              {lembagaList.map((lem, idx) => (
                <div key={idx} style={{ background: "#ffffff", border: "1px solid #e2e8f0", padding: "1rem", borderRadius: "10px", textAlign: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: "60px", height: "60px", margin: "0 auto 0.5rem auto", borderRadius: "9999px", overflow: "hidden", border: "2px solid #ecfdf5" }}>
                    <img src={lem.foto} alt={lem.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0d9488", marginBottom: "0.2rem" }}>{lem.jabatan}</div>
                  <h5 style={{ fontSize: "0.875rem", color: "#0f172a", margin: "0.2rem 0" }}>{lem.nama}</h5>
                  <div style={{ fontSize: "0.725rem", color: "#64748b" }}>{lem.nip}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
