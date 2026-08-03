export default function Footer() {
  return (
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h4 class="footer-title">📍 Informasi Kantor & Kontak</h4>
            <ul style={{ listStyle: "none", fontSize: "0.9rem", color: "#cbd5e1", lineHeight: 1.6 }}>
              <li style={{ marginBottom: "0.85rem" }}>
                <strong style={{ color: "white", display: "block", marginBottom: "0.2rem" }}>
                  Alamat Kantor Kelurahan:
                </strong>
                Jl. Sungai Calendu, Kel. Mallilingi, Kec. Bantaeng, Kab. Bantaeng, Sulawesi Selatan (Kode Pos 92411)
              </li>
              <li style={{ marginBottom: "0.85rem" }}>
                <strong style={{ color: "white", display: "block", marginBottom: "0.2rem" }}>
                  Telepon / WhatsApp:
                </strong>
                (0413) 21001 / +62 852-5555-1234
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong style={{ color: "white", display: "block", marginBottom: "0.2rem" }}>
                  Email Resmi:
                </strong>
                kelurahan.mallilingi@bantaengkab.go.id
              </li>
            </ul>
          </div>

          <div>
            <h4 class="footer-title">🗺️ Peta Lokasi Kantor (Google Maps Overview)</h4>
            <div style={{ height: "240px", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
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

        <div class="copyright">
          &copy; 2026 Pemerintah Kelurahan Mallilingi. Hak Cipta Dilindungi.
        </div>
      </div>
    </footer>
  );
}
