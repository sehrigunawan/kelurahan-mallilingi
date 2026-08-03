import { getMallilingiDataAsync } from "../../lib/data";

export default async function StrukturPage() {
  const data = await getMallilingiDataAsync();

  return (
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">TATA KELOLA WILAYAH</span>
          <h2>Perangkat & Aparatur Kelurahan</h2>
          <p>Susunan pimpinan, staf pelaksana, dan ketua lembaga kemasyarakatan Kelurahan Mallilingi.</p>
        </div>

        <div class="struktur-grid">
          {data.struktur.map((item, idx) => (
            <div key={idx} class="struktur-card" style={{ padding: "1.5rem", textAlign: "center" }}>
              <div style={{ width: "110px", height: "110px", margin: "0 auto 1rem auto", borderRadius: "9999px", overflow: "hidden", border: "3px solid #ecfdf5", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <img src={item.foto} alt={item.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "0.2rem" }}>{item.nama}</h3>
              <div style={{ color: "#059669", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.25rem" }}>{item.jabatan}</div>
              <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{item.nip}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
