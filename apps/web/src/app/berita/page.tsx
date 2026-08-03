import Link from "next/link";
import { getMallilingiDataAsync } from "../../lib/data";

export default async function BeritaPage() {
  const data = await getMallilingiDataAsync();

  return (
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">KABAR TERKINI</span>
          <h2>Berita & Pengumuman Kelurahan</h2>
          <p>Informasi kegiatan pembangunan, sosial kemasyarakatan, dan kabar program KKN.</p>
        </div>

        <div class="berita-grid">
          {data.berita.map((item) => (
            <article key={item.id} class="berita-card">
              <img src={item.gambar || "/assets/images/kantor_kelurahan.jpg"} alt={item.judul} class="berita-img" />
              <div class="berita-body">
                <div>
                  <div class="berita-date">📅 {item.tanggal} • {item.kategori || "Pengumuman"}</div>
                  <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>{item.judul}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem" }}>{item.ringkasan}</p>
                </div>
                <Link href={`/berita/${item.id}`} class="btn btn-outline" style={{ fontSize: "0.825rem", marginTop: "auto" }}>
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
