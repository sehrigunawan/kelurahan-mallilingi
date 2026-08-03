import { getMallilingiDataAsync } from "../../lib/data";

export default async function UMKMPage() {
  const data = await getMallilingiDataAsync();

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">PEMBERDAYAAN EKONOMI</span>
          <h2>Katalog UMKM & Potensi Lokal</h2>
          <p>Mendukung usaha mikro, kecil, dan menengah warga Kelurahan Mallilingi untuk bertumbuh bersama.</p>
        </div>

        <div className="umkm-grid">
          {data.umkm.map((item) => (
            <div key={item.id} className="umkm-card">
              <img src={item.foto} alt={item.nama} className="umkm-img" />
              <div className="umkm-body">
                <div>
                  <span style={{ fontSize: "0.75rem", background: "#f0fdf4", color: "#047857", padding: "0.25rem 0.6rem", borderRadius: "9999px", fontWeight: 700 }}>
                    {item.kategori}
                  </span>
                  <h3 style={{ fontSize: "1.1rem", margin: "0.5rem 0 0.25rem 0" }}>{item.nama}</h3>
                  <div style={{ fontSize: "0.825rem", color: "#059669", fontWeight: 600, marginBottom: "0.5rem" }}>
                    👤 Pemilik: {item.pemilik}
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem" }}>{item.deskripsi}</p>
                  <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginBottom: "1.25rem" }}>
                    📍 {item.alamat}
                  </div>
                </div>

                <a
                  href={`https://wa.me/${item.whatsapp}?text=Halo%20${encodeURIComponent(item.pemilik)},%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(item.nama)}%20di%20Web%20Kelurahan%20Mallilingi.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ fontSize: "0.825rem", marginTop: "auto", textDecoration: "none" }}
                >
                  💬 Hubungi Penjual via WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
