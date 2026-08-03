import { getMallilingiDataAsync } from "../../lib/data";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminPage() {
  const initialData = await getMallilingiDataAsync();

  return (
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">AKSES PETUGAS</span>
          <h2>Dashboard Pengelolaan Media Kelurahan</h2>
          <p>Sistem manajemen data terpadu untuk pengeditan berita, layanan surat, katalog UMKM, dan profil kelurahan.</p>
        </div>

        <AdminDashboardClient initialData={initialData} />
      </div>
    </section>
  );
}
