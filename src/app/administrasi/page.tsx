import { getMallilingiDataAsync } from "../../lib/data";
import LayananListClient from "../layanan/LayananListClient";

export default async function AdministrasiPage() {
  const data = await getMallilingiDataAsync();

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">PANDUAN PUBLIK</span>
          <h2>Layanan Administrasi Kependudukan</h2>
          <p>Persyaratan dan alur pengurusan 19 dokumen surat keterangan publik yang mudah, cepat, dan transparan.</p>
        </div>

        <LayananListClient initialLayanan={data.layanan} whatsappNumber={data.info.whatsapp} />
      </div>
    </section>
  );
}
