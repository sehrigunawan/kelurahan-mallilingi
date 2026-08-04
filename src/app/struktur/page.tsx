import { getMallilingiDataAsync, DEFAULT_RW_RT_LIST } from "../../lib/data";

export default async function StrukturPage() {
  const data = await getMallilingiDataAsync();
  const lurah = data.struktur[0];
  const seklur = data.struktur[1];
  const kasiList = data.struktur.slice(2, 5);
  const mitraLembagaList = data.struktur.slice(5);

  const getCategoryBadge = (index: number) => {
    if (index === 0) return { label: "Pimpinan Tinggi", bg: "#059669" };
    if (index === 1) return { label: "Sekretariat", bg: "#0d9488" };
    if (index >= 2 && index <= 4) return { label: "Kepala Seksi", bg: "#2563eb" };
    return { label: "Mitra & Keamanan", bg: "#475569" };
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">APARAT & KEMITRAAN KELURAHAN</span>
          <h2>Struktur Organisasi & Pengurus Wilayah</h2>
          <p>Daftar resmi aparatur kelurahan, lembaga kemasyarakatan, serta ketua RW & RT se-Kelurahan Mallilingi.</p>
        </div>

        {/* 1. SEKSI PIMPINAN & SEKRETARIAT */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>Pimpinan & Sekretariat</h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[lurah, seklur].map((person, idx) => {
              const badge = getCategoryBadge(idx);
              return (
                <div key={idx} className="sotk-hover-card">
                  <div style={{ position: "relative", marginBottom: "1rem" }}>
                    <div style={{ width: "90px", height: "90px", borderRadius: "9999px", overflow: "hidden", border: `3px solid ${badge.bg}`, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                      <img src={person.foto} alt={person.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  </div>

                  <span style={{ fontSize: "0.725rem", background: badge.bg, color: "#ffffff", padding: "0.2rem 0.75rem", borderRadius: "9999px", fontWeight: 600, textTransform: "uppercase", marginBottom: "0.6rem" }}>
                    {badge.label}
                  </span>

                  <h4 style={{ fontSize: "1.05rem", color: "#0f172a", fontWeight: 700, marginBottom: "0.2rem" }}>{person.nama}</h4>
                  <div style={{ color: badge.bg, fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.25rem" }}>{person.jabatan}</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{person.nip}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. SEKSI KASI OPERASIONAL */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>Seksi Operasional Kelurahan</h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {kasiList.map((kasi, idx) => {
              const badge = getCategoryBadge(idx + 2);
              return (
                <div key={idx} className="sotk-hover-card">
                  <div style={{ position: "relative", marginBottom: "1rem" }}>
                    <div style={{ width: "84px", height: "84px", borderRadius: "9999px", overflow: "hidden", border: `3px solid ${badge.bg}`, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                      <img src={kasi.foto} alt={kasi.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  </div>

                  <span style={{ fontSize: "0.7rem", background: badge.bg, color: "#ffffff", padding: "0.18rem 0.65rem", borderRadius: "9999px", fontWeight: 600, textTransform: "uppercase", marginBottom: "0.5rem" }}>
                    {badge.label}
                  </span>

                  <h4 style={{ fontSize: "1rem", color: "#0f172a", fontWeight: 700, marginBottom: "0.2rem" }}>{kasi.nama}</h4>
                  <div style={{ color: badge.bg, fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.25rem" }}>{kasi.jabatan}</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{kasi.nip}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. UNSUR KEAMANAN & MITRA LPM */}
        <div style={{ marginBottom: "3.5rem" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>Unsur Keamanan (Babinsa/Binmas) & LPM</h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {mitraLembagaList.map((lem, idx) => {
              const badge = getCategoryBadge(idx + 5);
              return (
                <div key={idx} className="sotk-hover-card">
                  <div style={{ position: "relative", marginBottom: "1rem" }}>
                    <div style={{ width: "80px", height: "80px", borderRadius: "9999px", overflow: "hidden", border: `3px solid ${badge.bg}`, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                      <img src={lem.foto} alt={lem.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  </div>

                  <span style={{ fontSize: "0.7rem", background: badge.bg, color: "#ffffff", padding: "0.18rem 0.65rem", borderRadius: "9999px", fontWeight: 600, textTransform: "uppercase", marginBottom: "0.5rem" }}>
                    {badge.label}
                  </span>

                  <h4 style={{ fontSize: "0.975rem", color: "#0f172a", fontWeight: 700, marginBottom: "0.2rem" }}>{lem.nama}</h4>
                  <div style={{ color: badge.bg, fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.25rem" }}>{lem.jabatan}</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{lem.nip}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. DIREKTORI LENGKAP PENGURUS RW & RT SE-KELURAHAN MALLILINGI */}
        <div style={{ background: "#ffffff", padding: "2.25rem", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
          <div style={{ marginBottom: "1.75rem" }}>
            <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>
              DIREKTORI WILAYAH
            </span>
            <h3 style={{ fontSize: "1.4rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>
              Daftar Pengurus RW & RT Kelurahan Mallilingi (8 RW / 25 RT)
            </h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {DEFAULT_RW_RT_LIST.map((item, idx) => (
              <div key={idx} style={{ background: "#f8fafc", borderRadius: "12px", border: "1px solid #cbd5e1", padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", borderBottom: "2px solid #059669", paddingBottom: "0.5rem" }}>
                  <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>{item.rw}</span>
                  <span style={{ fontSize: "0.75rem", background: "#ecfdf5", color: "#059669", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px" }}>
                    Ketua RW
                  </span>
                </div>

                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#047857", marginBottom: "1rem" }}>
                  {item.ketua}
                </div>

                <div style={{ fontSize: "0.825rem", color: "#475569", fontWeight: 600, marginBottom: "0.4rem" }}>
                  Pengurus RT Pendukung:
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {item.rtList.map((rtItem, rtIdx) => (
                    <div key={rtIdx} style={{ background: "#ffffff", padding: "0.45rem 0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.825rem" }}>{rtItem.rt}</span>
                      <span style={{ color: "#334155", fontSize: "0.85rem" }}>{rtItem.nama}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
