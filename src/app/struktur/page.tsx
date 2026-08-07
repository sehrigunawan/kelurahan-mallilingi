import { getMallilingiDataAsync, DEFAULT_RW_RT_LIST } from "../../lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StrukturPage() {
  const data = await getMallilingiDataAsync();
  const aparaturList = data.struktur;

  // Filter into categories
  const pimpinanSekretariat = aparaturList.filter((p) =>
    p.jabatan.includes("Kepala Kelurahan") || p.jabatan.includes("Sekretaris") || p.jabatan.includes("Staf Sekretariat")
  );

  const seksiPemerintahan = aparaturList.filter((p) => p.jabatan.includes("Pemerintahan"));
  const seksiPelayanan = aparaturList.filter((p) => p.jabatan.includes("Pelayanan"));
  const seksiPembangunan = aparaturList.filter((p) => p.jabatan.includes("Pembangunan"));

  const mitraKeamananLpm = aparaturList.filter((p) =>
    p.jabatan.includes("Babinsa") || p.jabatan.includes("Binmas") || p.jabatan.includes("LPM")
  );

  const getRankWeight = (jabatan: string): number => {
    const j = (jabatan || "").toLowerCase();
    if (j.includes("kepala kelurahan") || j.includes("lurah")) return 1;
    if (j.includes("sekretaris kelurahan") || j.includes("seklur")) return 2;
    if (j.includes("kasi") || j.includes("head")) return 3;
    if (j.includes("babinsa") || j.includes("binmas") || j.includes("bhabinkamtibmas")) return 4;
    if (j.includes("ketua lpm")) return 5;
    if (j.includes("pns")) return 6;
    if (j.includes("staf") || j.includes("staff") || j.includes("anggota")) return 7;
    return 8;
  };

  const sortByRank = (list: typeof aparaturList) =>
    [...list].sort((a, b) => getRankWeight(a.jabatan) - getRankWeight(b.jabatan));

  const renderCardGrid = (list: typeof aparaturList, accentColor: string) => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
      {sortByRank(list).map((person, idx) => (
        <div key={person.id || idx} className="sotk-hover-card" style={{ padding: "1.5rem 1.25rem" }}>
          <div style={{ position: "relative", marginBottom: "0.85rem" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "9999px", overflow: "hidden", border: `3px solid ${accentColor}`, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <img src={person.foto} alt={person.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>

          <h4 style={{ fontSize: "1rem", color: "#0f172a", fontWeight: 700, marginBottom: "0.2rem" }}>{person.nama}</h4>
          <div style={{ color: accentColor, fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>{person.jabatan}</div>
          
          {/* NIP display instead of generic category label */}
          <div style={{ fontSize: "0.78rem", color: "#64748b", background: "#f1f5f9", padding: "0.2rem 0.65rem", borderRadius: "6px", display: "inline-block" }}>
            {person.nip && person.nip !== "-" ? person.nip : "Staff / Non-PNS"}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">APARAT & KEMITRAAN KELURAHAN</span>
          <h2>Struktur Organisasi & Aparatur Kelurahan</h2>
          <p>Daftar resmi jajaran aparatur PNS, staf kelurahan, mitra keamanan, serta pengurus RW & RT Kelurahan Mallilingi.</p>
        </div>

        {/* 1. PIMPINAN & SEKRETARIAT */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>Pimpinan & Sekretariat Kelurahan</h3>
          </div>
          {renderCardGrid(pimpinanSekretariat, "#059669")}
        </div>

        {/* 2. SEKSI PEMERINTAHAN */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>Seksi Pemerintahan</h3>
          </div>
          {renderCardGrid(seksiPemerintahan, "#2563eb")}
        </div>

        {/* 3. SEKSI PELAYANAN UMUM */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>Seksi Pelayanan Umum</h3>
          </div>
          {renderCardGrid(seksiPelayanan, "#0d9488")}
        </div>

        {/* 4. SEKSI PEMBANGUNAN & PM */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>Seksi Pembangunan & Pemberdayaan Masyarakat</h3>
          </div>
          {renderCardGrid(seksiPembangunan, "#d97706")}
        </div>

        {/* 5. UNSUR KEAMANAN & LPM */}
        <div style={{ marginBottom: "3.5rem" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>Unsur Keamanan (Babinsa/Binmas) & LPM</h3>
          </div>
          {renderCardGrid(mitraKeamananLpm, "#475569")}
        </div>

        {/* 6. DIREKTORI LENGKAP PENGURUS RW & RT SE-KELURAHAN MALLILINGI */}
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
            {(data.rwRtList || []).map((item: any, idx: number) => (
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
                  {(item.rtList || []).map((rtItem: any, rtIdx: number) => (
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
