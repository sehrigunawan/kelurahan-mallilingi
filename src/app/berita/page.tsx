import Link from "next/link";
import { getMallilingiDataAsync } from "../../lib/data";

export default async function BeritaPage() {
  const data = await getMallilingiDataAsync();

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">KABAR TERKINI</span>
          <h2>Berita & Pengumuman Kelurahan</h2>
          <p>Informasi kegiatan pembangunan, sosial kemasyarakatan, dan kabar program KKN.</p>
        </div>

        <div className="berita-grid">
          {data.berita.map((item) => (
            <article key={item.id} className="berita-card">
              <img src={item.gambar || "/assets/images/kantor_kelurahan.jpg"} alt={item.judul} className="berita-img" />
              <div className="berita-body">
                <div>
                  <div className="berita-date">{item.tanggal} • {item.kategori || "Pengumuman"}</div>
                  <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem", fontWeight: 600 }}>{item.judul}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem", lineHeight: 1.55 }}>{item.ringkasan}</p>
                </div>
                <Link href={`/berita/${item.id}`} className="btn btn-outline" style={{ fontSize: "0.825rem", marginTop: "auto" }}>
                  Baca Selengkapnya →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
