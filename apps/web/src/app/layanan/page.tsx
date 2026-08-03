import { getMallilingiDataAsync } from "../../lib/data";
import LayananListClient from "./LayananListClient";

export default async function LayananPage() {
  const data = await getMallilingiDataAsync();

  return (
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">PANDUAN PUBLIK</span>
          <h2>Pelayanan Administrasi Kependudukan</h2>
          <p>Persyaratan dan alur pengurusan surat keterangan publik yang mudah, cepat, dan transparan.</p>
        </div>

        <LayananListClient initialLayanan={data.layanan} whatsappNumber={data.info.whatsapp} />
      </div>
    </section>
  );
}
