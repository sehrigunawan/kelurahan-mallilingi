import { getMallilingiDataAsync } from "../../lib/data";

export default async function KontakPage() {
  const data = await getMallilingiDataAsync();
  const info = data.info;

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">HUBUNGI KAMI</span>
          <h2>Kontak & Lokasi Kantor Kelurahan</h2>
          <p>Layanan informasi dan lokasi pelayanan masyarakat Kelurahan Mallilingi, Kecamatan Bantaeng.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "2.5rem", alignItems: "start" }}>
          {/* Info Card */}
          <div style={{ background: "#ffffff", borderRadius: "16px", padding: "2rem", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "1.25rem", color: "#0f172a" }}>📍 Kantor Kelurahan Mallilingi</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", fontSize: "0.95rem" }}>
              <div>
                <strong style={{ color: "#0f172a", display: "block", marginBottom: "0.2rem" }}>Alamat Lengkap:</strong>
                <span style={{ color: "#475569" }}>{info.alamat}</span>
              </div>

              <div>
                <strong style={{ color: "#0f172a", display: "block", marginBottom: "0.2rem" }}>Telepon / WhatsApp Pelayanan:</strong>
                <span style={{ color: "#059669", fontWeight: 600 }}>{info.telepon} / +{info.whatsapp}</span>
              </div>

              <div>
                <strong style={{ color: "#0f172a", display: "block", marginBottom: "0.2rem" }}>Email Resmi:</strong>
                <span style={{ color: "#475569" }}>{info.email}</span>
              </div>

              <div>
                <strong style={{ color: "#0f172a", display: "block", marginBottom: "0.2rem" }}>Jam Pelayanan Kantor:</strong>
                <span style={{ color: "#475569" }}>{info.jamKerja}</span>
              </div>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <a
                href={`https://wa.me/${info.whatsapp}?text=Halo%20Kelurahan%20Mallilingi,%20saya%20ingin%20bertanya%20mengenai%20pelayanan%20kelurahan.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: "100%", textDecoration: "none" }}
              >
                💬 Kirim Pesan via WhatsApp Resmi
              </a>
            </div>
          </div>

          {/* Maps Overview */}
          <div style={{ background: "#ffffff", borderRadius: "16px", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}>
            <h3 style={{ fontSize: "1.15rem", marginBottom: "1rem", color: "#0f172a" }}>🗺️ Peta Navigasi Google Maps</h3>
            <div style={{ height: "360px", borderRadius: "12px", overflow: "hidden", border: "1px solid #cbd5e1" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15886.99342784562!2d119.9400!3d-5.5450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbe2c75e2430001%3A0x899890a2a514d7a8!2sKelurahan%20Mallilingi!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
