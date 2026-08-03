import { getMallilingiDataAsync } from "../../lib/data";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminPage() {
  const initialData = await getMallilingiDataAsync();

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">AKSES PETUGAS</span>
          <h2>Dashboard Pengelolaan Media Kelurahan</h2>
          <p>Sistem manajemen data terpadu untuk pengeditan berita, layanan surat, katalog UMKM, dan profil kelurahan.</p>
        </div>

        <AdminDashboardClient initialData={initialData} />
      </div>
    </section>
  );
}
