import { getMallilingiDataAsync } from "../../lib/data";
import PengaduanFormClient from "./PengaduanFormClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PengaduanPage() {
  const data = await getMallilingiDataAsync();
  const info = data.info;

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">ASPIRASI & ADUAN WARGA</span>
          <h2>Layanan Pengaduan & Informasi Publik</h2>
          <p>Sampaikan laporan, keluhan, saran, atau pertanyaan Anda secara langsung kepada Pemerintah Kelurahan Mallilingi.</p>
        </div>

        <div className="pengaduan-grid">
          {/* Client Form Component */}
          <PengaduanFormClient whatsappNumber={info.whatsapp} />

          {/* Guidelines Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ background: "#ffffff", padding: "1.75rem", borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <h3 style={{ fontSize: "1.1rem", color: "#0f172a", fontWeight: 700, marginBottom: "1rem" }}>Ketentuan Pengaduan</h3>
              
              <ul style={{ paddingLeft: "1.25rem", fontSize: "0.875rem", color: "#334155", lineHeight: 1.7 }}>
                <li style={{ marginBottom: "0.6rem" }}>
                  <strong>Identitas Pelapor:</strong> Sertakan Nama Lengkap dan Nomor WhatsApp yang aktif untuk komunikasi lebih lanjut.
                </li>
                <li style={{ marginBottom: "0.6rem" }}>
                  <strong>Uraian Jelas:</strong> Jelaskan kronologi kejadian, lokasi spesifik, atau kendala yang dihadapi secara rinci.
                </li>
                <li style={{ marginBottom: "0.6rem" }}>
                  <strong>Kerahasiaan Terjamin:</strong> Identitas pelapor dijaga kerahasiannya oleh aparat kelurahan.
                </li>
                <li>
                  <strong>Tindak Lanjut Cepat:</strong> Pengaduan via WhatsApp akan direspons pada jam kerja (Senin - Jumat, 08.00 - 16.00 WITA).
                </li>
              </ul>
            </div>

            <div style={{ background: "#ecfdf5", padding: "1.75rem", borderRadius: "14px", border: "1px solid #a7f3d0" }}>
              <h3 style={{ fontSize: "1.05rem", color: "#047857", fontWeight: 700, marginBottom: "0.75rem" }}>Hotline Darurat & Kontak Kantor</h3>
              <p style={{ fontSize: "0.85rem", color: "#166534", marginBottom: "1rem", lineHeight: 1.6 }}>
                Untuk situasi darurat atau konsultasi langsung, Anda dapat menghubungi kantor atau mendatangi lokasi kantor kelurahan:
              </p>

              <div style={{ fontSize: "0.85rem", color: "#065f46", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div><strong>Kantor Kelurahan:</strong> (0413) 21001</div>
                <div><strong>WhatsApp Center:</strong> +{info.whatsapp}</div>
                <div><strong>Email Layanan:</strong> {info.email}</div>
                <div><strong>Alamat:</strong> {info.alamat}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
