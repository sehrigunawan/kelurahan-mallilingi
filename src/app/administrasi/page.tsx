import { getMallilingiDataAsync } from "../../lib/data";
import LayananListClient from "../layanan/LayananListClient";

export default async function AdministrasiPage() {
  const data = await getMallilingiDataAsync();

  const alurSteps = [
    {
      step: "01",
      title: "Pemohon (Persiapan Berkas)",
      desc: "Menyediakan fotokopi KTP, KK/Asli, dan identitas pendukung. Pemohon mengajukan permohonan tertulis mengenai peruntukan berkas."
    },
    {
      step: "02",
      title: "Surat Pengantar RT / RW",
      desc: "Mengambil dan mengurus Surat Pengantar resmi di pengurus RT dan RW setempat sesuai jenis pelayanan yang dituju."
    },
    {
      step: "03",
      title: "Kantor Kelurahan (Petugas Informasi)",
      desc: "Menuju Bagian Urusan Pelayanan Kelurahan. Petugas Informasi menerima, meregister permohonan, dan memeriksa kelengkapan berkas."
    },
    {
      step: "04",
      title: "Agendasi & Pencatatan Operator",
      desc: "Meng-agendakan pembukuan resmi sebelum dicatat oleh operator. Operator mencatat agenda dan menyerahkan berkas ke Pejabat Kelurahan."
    },
    {
      step: "05",
      title: "Pemeriksaan & Disposisi Pejabat",
      desc: "Pejabat Kelurahan memeriksa keabsahan informasi berkas, melakukan penandatanganan dokumen, dan memberikan instruksi disposisi."
    },
    {
      step: "06",
      title: "Penyerahan Dokumen (Selesai)",
      desc: "Pemohon menerima dokumen/informasi pelayanan publik yang resmi dan terverifikasi dari pihak Kelurahan Mallilingi."
    }
  ];

  return (
    <section className="section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">PANDUAN PUBLIK</span>
          <h2>Layanan Administrasi Kependudukan</h2>
          <p>Persyaratan dan alur pengurusan dokumen surat keterangan publik yang mudah, cepat, dan transparan.</p>
        </div>

        {/* Official Standard Operating Procedure (Alur Pelayanan Umum) Card */}
        <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.04)", marginBottom: "3rem" }}>
          <div style={{ textAlign: "center", maxWidth: "650px", margin: "0 auto 2rem auto" }}>
            <span style={{ fontSize: "0.78rem", color: "#059669", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>
              STANDAR OPERASIONAL PROSEDUR
            </span>
            <h3 style={{ fontSize: "1.4rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>
              Alur Standar Pelayanan Umum Kelurahan Mallilingi
            </h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {alurSteps.map((item, idx) => (
              <div key={idx} style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #cbd5e1", position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.6rem" }}>
                  <span style={{ width: "36px", height: "36px", background: "#ecfdf5", color: "#059669", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", border: "1px solid #a7f3d0", flexShrink: 0 }}>
                    {item.step}
                  </span>
                  <h4 style={{ fontSize: "0.975rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>
                    {item.title}
                  </h4>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Layanan Surat Directory Component */}
        <LayananListClient initialLayanan={data.layanan} whatsappNumber={data.info.whatsapp} />

      </div>
    </section>
  );
}
