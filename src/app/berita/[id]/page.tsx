import Link from "next/link";
import { getMallilingiDataAsync } from "../../../lib/data";
import { notFound } from "next/navigation";

export default async function BeritaDetailPage({ params }: { params: { id: string } }) {
  const data = await getMallilingiDataAsync();
  const item = data.berita.find((b) => b.id === params.id);

  if (!item) {
    notFound();
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "820px" }}>
        <Link href="/berita" style={{ color: "#059669", fontWeight: 600, fontSize: "0.9rem", display: "inline-block", marginBottom: "1.5rem" }}>
          ← Kembali ke Seluruh Berita
        </Link>

        <span className="section-tag">{item.kategori || "Pengumuman"}</span>
        <h1 style={{ fontSize: "2.2rem", color: "#0f172a", marginBottom: "0.75rem", lineHeight: 1.25 }}>
          {item.judul}
        </h1>

        <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.5rem" }}>
          📅 Ditayangkan pada {item.tanggal} • Oleh {item.penulis || "Pemerintah Kelurahan Mallilingi"}
        </div>

        <img
          src={item.gambar || "/assets/images/kantor_kelurahan.jpg"}
          alt={item.judul}
          style={{ width: "100%", borderRadius: "16px", maxHeight: "420px", objectFit: "cover", marginBottom: "2rem", boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}
        />

        <div style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#1e293b", whiteSpace: "pre-line" }}>
          {item.isi || item.ringkasan}
        </div>

        <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #e2e8f0" }}>
          <Link href="/berita" className="btn btn-outline">
            ← Kembali ke Kabar Terkini
          </Link>
        </div>
      </div>
    </section>
  );
}
