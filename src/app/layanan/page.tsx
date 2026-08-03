import { getMallilingiDataAsync } from "../../lib/data";
import LayananListClient from "./LayananListClient";

export default async function LayananPage() {
  const data = await getMallilingiDataAsync();

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">PANDUAN PUBLIK</span>
          <h2>Pelayanan Administrasi Kependudukan</h2>
          <p>Persyaratan dan alur pengurusan surat keterangan publik yang mudah, cepat, dan transparan.</p>
        </div>

        <LayananListClient initialLayanan={data.layanan} whatsappNumber={data.info.whatsapp} />
      </div>
    </section>
  );
}
