import Link from "next/link";
import { getMallilingiDataAsync } from "../../../lib/data";
import { notFound } from "next/navigation";

export default async function UMKMDetailPage({ params }: { params: { id: string } }) {
  const data = await getMallilingiDataAsync();
  const item = data.umkm.find((u) => u.id === params.id);

  if (!item) {
    notFound();
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "880px" }}>
        <Link href="/umkm" style={{ color: "#059669", fontWeight: 600, fontSize: "0.9rem", display: "inline-block", marginBottom: "1.5rem" }}>
          ← Kembali ke Katalog UMKM
        </Link>

        <div style={{ background: "#ffffff", borderRadius: "16px", padding: "2.5rem", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "center" }}>
            <img
              src={item.foto}
              alt={item.nama}
              style={{ width: "100%", height: "320px", objectFit: "cover", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
            />

            <div>
              <span style={{ fontSize: "0.78rem", background: "#f0fdf4", color: "#047857", padding: "0.25rem 0.65rem", borderRadius: "9999px", fontWeight: 700 }}>
                {item.kategori}
              </span>
              <h1 style={{ fontSize: "1.8rem", color: "#0f172a", margin: "0.5rem 0 0.5rem 0", lineHeight: 1.2 }}>
                {item.nama}
              </h1>

              <div style={{ fontSize: "0.95rem", color: "#059669", fontWeight: 600, marginBottom: "1rem" }}>
                👤 Pemilik Usaha: {item.pemilik}
              </div>

              <p style={{ fontSize: "0.95rem", color: "#334155", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                {item.deskripsi}
              </p>

              <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "2rem", background: "#f8fafc", padding: "0.75rem 1rem", borderRadius: "8px" }}>
                📍 <strong>Alamat Usaha:</strong> {item.alamat}
              </div>

              <a
                href={`https://wa.me/${item.whatsapp}?text=Halo%20${encodeURIComponent(item.pemilik)},%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(item.nama)}%20di%20Web%20Kelurahan%20Mallilingi.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: "100%", textDecoration: "none", fontSize: "0.95rem" }}
              >
                💬 Pesan Langsung via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
