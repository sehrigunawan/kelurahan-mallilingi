"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MallilingiData, LayananSurat, BeritaPengumuman, Aparatur, PengaduanWarga } from "../../types";
import { saveMallilingiDataAsync, updatePengaduanStatusAsync, deletePengaduanAsync, deleteLayananAsync, deleteBeritaAsync } from "../../lib/data";

// Helper function to calculate SHA-256 hash using Web Crypto API
async function hashPasswordSHA256(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Allowed Admin Passwords (SHA-256 Hashes)
const VALID_PASSWORD_HASHES = [
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH || "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",
  "9c4b78912e96d997d4c2b95b8782a2082b26ecf17730e666a0ae8f93a127a659"
];

export default function AdminDashboardClient({ initialData }: { initialData: MallilingiData }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  
  const [activeTab, setActiveTab] = useState<"info" | "layanan" | "berita" | "struktur" | "pengaduan">("info");
  const [data, setData] = useState<MallilingiData>(initialData);
  const [statusMsg, setStatusMsg] = useState("");
  const [pengaduanFilter, setPengaduanFilter] = useState<"Semua" | "Baru" | "Proses" | "Selesai">("Semua");

  // Modal Editors
  const [editingLayanan, setEditingLayanan] = useState<LayananSurat | null>(null);
  const [editingBerita, setEditingBerita] = useState<BeritaPengumuman | null>(null);
  const [editingStruktur, setEditingStruktur] = useState<{ item: Aparatur; index: number } | null>(null);

  // Auxiliary Textarea States
  const [persyaratanText, setPersyaratanText] = useState("");
  const [misiText, setMisiText] = useState("");

  useEffect(() => {
    const auth = sessionStorage.getItem("MALLILINGI_ADMIN_AUTH");
    if (auth === "true") setIsAuthenticated(true);

    try {
      const stored = localStorage.getItem("mallilingi_pengaduan_list");
      if (stored) {
        const localList: PengaduanWarga[] = JSON.parse(stored);
        if (localList && localList.length > 0) {
          setData((prev) => {
            const combined = [...localList, ...(prev.pengaduan || [])].filter(
              (v, i, a) => a.findIndex((t) => t.id === v.id) === i
            );
            return { ...prev, pengaduan: combined };
          });
        }
      }
    } catch (e) {
      console.warn("localStorage read error:", e);
    }
  }, []);

  useEffect(() => {
    if (data.info.misi) {
      setMisiText(Array.isArray(data.info.misi) ? data.info.misi.join("\n") : "");
    }
  }, [data.info.misi]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const inputUser = usernameInput.trim().toLowerCase();
    const inputHash = await hashPasswordSHA256(passwordInput.trim());
    const validUsername = (process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin").toLowerCase();

    if ((inputUser === validUsername || inputUser === "mallilingi") && VALID_PASSWORD_HASHES.includes(inputHash)) {
      sessionStorage.setItem("MALLILINGI_ADMIN_AUTH", "true");
      setIsAuthenticated(true);
    } else {
      setLoginError("Username atau Password yang Anda masukkan salah.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, onComplete: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          onComplete(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const router = useRouter();

  const handleSaveAllData = async (updatedData?: MallilingiData) => {
    const dataToSave = updatedData || data;
    await saveMallilingiDataAsync(dataToSave);
    router.refresh();
    setStatusMsg("Seluruh perubahan website berhasil disimpan ke Database!");
    setTimeout(() => setStatusMsg(""), 3500);
  };

  const updatePengaduanStatus = async (id: string, newStatus: "Baru" | "Proses" | "Selesai") => {
    const updatedList = (data.pengaduan || []).map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    const updatedData = { ...data, pengaduan: updatedList };
    setData(updatedData);
    await updatePengaduanStatusAsync(id, newStatus);
    handleSaveAllData(updatedData);
  };

  const deletePengaduan = async (id: string) => {
    if (confirm("Hapus catatan pengaduan warga ini?")) {
      const updatedList = (data.pengaduan || []).filter((item) => item.id !== id);
      const updatedData = { ...data, pengaduan: updatedList };
      setData(updatedData);
      await deletePengaduanAsync(id);
      handleSaveAllData(updatedData);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: "440px", margin: "3rem auto", background: "#ffffff", borderRadius: "16px", padding: "2.5rem 2rem", border: "1px solid #cbd5e1", boxShadow: "0 10px 25px rgba(0,0,0,0.06)" }}>
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div style={{ width: "56px", height: "56px", background: "#ecfdf5", color: "#059669", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", margin: "0 auto 1rem auto" }}>
            🔒
          </div>
          <h3 style={{ fontSize: "1.3rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>Portal Pengelola Kelurahan</h3>
          <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.35rem" }}>
            Silakan login untuk mengelola berita, layanan, profil, & pengaduan warga.
          </p>
        </div>

        {loginError && (
          <div style={{ background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca", padding: "0.75rem 1rem", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "1.25rem", textAlign: "center" }}>
            {loginError}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#1e293b", marginBottom: "0.3rem" }}>
              Username Pengelola
            </label>
            <input
              type="text"
              required
              placeholder="Masukkan Username Pengelola"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              style={{ width: "100%", padding: "0.7rem 0.85rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#1e293b", marginBottom: "0.3rem" }}>
              Password Admin
            </label>
            <input
              type="password"
              required
              placeholder="Masukkan Password Admin"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={{ width: "100%", padding: "0.7rem 0.85rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.75rem", fontSize: "0.925rem" }}>
            Masuk Dashboard Admin →
          </button>
        </form>
      </div>
    );
  }

  const listPengaduan = data.pengaduan || [];
  const countBaru = listPengaduan.filter((p) => p.status === "Baru").length;
  const countProses = listPengaduan.filter((p) => p.status === "Proses").length;
  const countSelesai = listPengaduan.filter((p) => p.status === "Selesai").length;

  const filteredPengaduan = listPengaduan.filter((p) => {
    if (pengaduanFilter === "Semua") return true;
    return p.status === pengaduanFilter;
  });

  return (
    <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.04)", overflow: "hidden" }}>
      
      {/* Top Header Bar */}
      <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", background: "#f8fafc" }}>
        <div>
          <h3 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700 }}>Panel Pengelola Kelurahan Mallilingi</h3>
          <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 600 }}>Sistem Manajemen Terpadu & Layanan Warga</span>
        </div>
        <div className="admin-header-actions">
          <button onClick={() => handleSaveAllData()} className="btn btn-primary" style={{ fontSize: "0.85rem" }}>
            Simpan Perubahan
          </button>
          <button onClick={() => { sessionStorage.removeItem("MALLILINGI_ADMIN_AUTH"); setIsAuthenticated(false); }} className="btn btn-outline" style={{ fontSize: "0.85rem" }}>
            Keluar (Logout)
          </button>
        </div>
      </div>

      {statusMsg && (
        <div style={{ background: "#ecfdf5", color: "#047857", borderBottom: "1px solid #a7f3d0", padding: "0.75rem 1.5rem", fontWeight: 600, fontSize: "0.875rem" }}>
          {statusMsg}
        </div>
      )}

      {/* Main Admin Sidebar & Content Grid */}
      <div className="admin-layout-grid" style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "600px" }}>
        
        {/* === LEFT SIDEBAR NAVIGATION MENU === */}
        <aside style={{ background: "#f8fafc", borderRight: "1px solid #e2e8f0", padding: "1.25rem 0.85rem" }}>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", padding: "0 0.5rem 0.65rem 0.5rem", borderBottom: "1px solid #cbd5e1", marginBottom: "0.85rem" }}>
            MENU MODUL ADMIN
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <button
              onClick={() => setActiveTab("info")}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "0.7rem 0.85rem",
                borderRadius: "8px",
                border: "none",
                background: activeTab === "info" ? "#ecfdf5" : "transparent",
                color: activeTab === "info" ? "#059669" : "#334155",
                fontWeight: activeTab === "info" ? 700 : 500,
                fontSize: "0.875rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <span>Profil & Informasi</span>
            </button>

            <button
              onClick={() => setActiveTab("layanan")}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "0.7rem 0.85rem",
                borderRadius: "8px",
                border: "none",
                background: activeTab === "layanan" ? "#ecfdf5" : "transparent",
                color: activeTab === "layanan" ? "#059669" : "#334155",
                fontWeight: activeTab === "layanan" ? 700 : 500,
                fontSize: "0.875rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <span>Layanan Surat</span>
              <span style={{ fontSize: "0.75rem", background: activeTab === "layanan" ? "#059669" : "#e2e8f0", color: activeTab === "layanan" ? "#ffffff" : "#475569", padding: "0.15rem 0.55rem", borderRadius: "9999px", fontWeight: 600 }}>
                {data.layanan.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("berita")}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "0.7rem 0.85rem",
                borderRadius: "8px",
                border: "none",
                background: activeTab === "berita" ? "#ecfdf5" : "transparent",
                color: activeTab === "berita" ? "#059669" : "#334155",
                fontWeight: activeTab === "berita" ? 700 : 500,
                fontSize: "0.875rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <span>Berita & Pengumuman</span>
              <span style={{ fontSize: "0.75rem", background: activeTab === "berita" ? "#059669" : "#e2e8f0", color: activeTab === "berita" ? "#ffffff" : "#475569", padding: "0.15rem 0.55rem", borderRadius: "9999px", fontWeight: 600 }}>
                {data.berita.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("struktur")}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "0.7rem 0.85rem",
                borderRadius: "8px",
                border: "none",
                background: activeTab === "struktur" ? "#ecfdf5" : "transparent",
                color: activeTab === "struktur" ? "#059669" : "#334155",
                fontWeight: activeTab === "struktur" ? 700 : 500,
                fontSize: "0.875rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <span>Struktur SOTK</span>
              <span style={{ fontSize: "0.75rem", background: activeTab === "struktur" ? "#059669" : "#e2e8f0", color: activeTab === "struktur" ? "#ffffff" : "#475569", padding: "0.15rem 0.55rem", borderRadius: "9999px", fontWeight: 600 }}>
                {data.struktur.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("pengaduan")}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "0.7rem 0.85rem",
                borderRadius: "8px",
                border: "none",
                background: activeTab === "pengaduan" ? "#ecfdf5" : "transparent",
                color: activeTab === "pengaduan" ? "#059669" : "#334155",
                fontWeight: activeTab === "pengaduan" ? 700 : 500,
                fontSize: "0.875rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <span>Pengaduan Masuk</span>
              <span style={{ fontSize: "0.75rem", background: countBaru > 0 ? "#e11d48" : "#94a3b8", color: "#ffffff", padding: "0.15rem 0.55rem", borderRadius: "9999px", fontWeight: 700 }}>
                {countBaru} Baru
              </span>
            </button>
          </nav>
        </aside>

        {/* === RIGHT MAIN CONTENT AREA === */}
        <main style={{ padding: "1.5rem" }}>
          
          {/* ================= TAB 1: PROFIL & INFORMASI KELURAHAN ================= */}
          {activeTab === "info" && (
            <form onSubmit={(e) => {
              e.preventDefault();
              const newMisi = misiText.split("\n").filter((m) => m.trim().length > 0);
              const updated = { ...data, info: { ...data.info, misi: newMisi } };
              setData(updated);
              handleSaveAllData(updated);
            }}>
              {/* SECTION A: INFORMASI KONTAK & ALAMAT KANTOR */}
              <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "1.5rem" }}>
                <h4 style={{ fontSize: "1.05rem", color: "#0f172a", marginBottom: "1rem", fontWeight: 700 }}>
                  Informasi Alamat & Kontak Kelurahan
                </h4>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Alamat Lengkap Kantor Kelurahan</label>
                  <textarea
                    rows={2}
                    value={data.info.alamat}
                    onChange={(e) => setData({ ...data, info: { ...data.info, alamat: e.target.value } })}
                    style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                  />
                </div>

                <div className="admin-form-grid-3">
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Nomor Telepon Kantor</label>
                    <input
                      type="text"
                      value={data.info.telepon}
                      onChange={(e) => setData({ ...data, info: { ...data.info, telepon: e.target.value } })}
                      style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>WhatsApp Center / Pengaduan</label>
                    <input
                      type="text"
                      value={data.info.whatsapp}
                      onChange={(e) => setData({ ...data, info: { ...data.info, whatsapp: e.target.value } })}
                      placeholder="Contoh: 6285255551234"
                      style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Email Resmi Kelurahan</label>
                    <input
                      type="email"
                      value={data.info.email}
                      onChange={(e) => setData({ ...data, info: { ...data.info, email: e.target.value } })}
                      style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                    />
                  </div>
                </div>

                <div className="admin-form-grid-2">
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Jam Pelayanan Operasional</label>
                    <input
                      type="text"
                      value={data.info.jamKerja}
                      onChange={(e) => setData({ ...data, info: { ...data.info, jamKerja: e.target.value } })}
                      placeholder="Senin - Jumat: 08.00 - 16.00 WITA"
                      style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Kode Pos Wilayah</label>
                    <input
                      type="text"
                      value={data.info.kodePos}
                      onChange={(e) => setData({ ...data, info: { ...data.info, kodePos: e.target.value } })}
                      placeholder="92411"
                      style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION B: DATA PIMPINAN & SAMBUTAN LURAH */}
              <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "1.5rem" }}>
                <h4 style={{ fontSize: "1.05rem", color: "#0f172a", marginBottom: "1rem", fontWeight: 700 }}>Data Pimpinan & Sambutan Lurah</h4>
                <div className="admin-form-grid-2">
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Nama Lurah</label>
                    <input
                      type="text"
                      value={data.info.namaLurah}
                      onChange={(e) => setData({ ...data, info: { ...data.info, namaLurah: e.target.value } })}
                      style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>NIP Lurah</label>
                    <input
                      type="text"
                      value={data.info.nipLurah}
                      onChange={(e) => setData({ ...data, info: { ...data.info, nipLurah: e.target.value } })}
                      style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Upload Foto Lurah</label>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                    <div style={{ width: "65px", height: "75px", borderRadius: "6px", overflow: "hidden", border: "1px solid #cbd5e1", background: "#f8fafc" }}>
                      <img src={data.info.fotoLurah} alt="Foto Lurah" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, (base64) => setData({ ...data, info: { ...data.info, fotoLurah: base64 } }))}
                      style={{ fontSize: "0.85rem" }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Sambutan Lurah</label>
                  <textarea
                    rows={3}
                    value={data.info.sambutanLurah}
                    onChange={(e) => setData({ ...data, info: { ...data.info, sambutanLurah: e.target.value } })}
                    style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                  />
                </div>
              </div>

              {/* SECTION C: VISI & MISI */}
              <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "1.5rem" }}>
                <h4 style={{ fontSize: "1.05rem", color: "#0f172a", marginBottom: "1rem", fontWeight: 700 }}>Visi & Misi Pembangunan</h4>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Visi Kelurahan</label>
                  <textarea
                    rows={2}
                    value={data.info.visi}
                    onChange={(e) => setData({ ...data, info: { ...data.info, visi: e.target.value } })}
                    style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Misi Pembangunan (Tuliskan 1 Poin Misi Per Baris)</label>
                  <textarea
                    rows={4}
                    value={misiText}
                    onChange={(e) => setMisiText(e.target.value)}
                    style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                  />
                </div>
              </div>

              {/* SECTION D: BATAS GEOGRAFIS & STATISTIK */}
              <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "1.5rem" }}>
                <h4 style={{ fontSize: "1.05rem", color: "#0f172a", marginBottom: "1rem", fontWeight: 700 }}>Statistik & Batas Geografis Wilayah</h4>
                <div className="admin-form-grid-2">
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Jumlah Penduduk / Jiwa</label>
                    <input
                      type="text"
                      value={data.info.jumlahPenduduk}
                      onChange={(e) => setData({ ...data, info: { ...data.info, jumlahPenduduk: e.target.value } })}
                      style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Luas Total Wilayah</label>
                    <input
                      type="text"
                      value={data.info.luasWilayah}
                      onChange={(e) => setData({ ...data, info: { ...data.info, luasWilayah: e.target.value } })}
                      style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                    />
                  </div>
                </div>

                <div className="admin-form-grid-2">
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Batas Utara</label>
                    <input
                      type="text"
                      value={data.info.batasWilayah?.utara}
                      onChange={(e) => setData({ ...data, info: { ...data.info, batasWilayah: { ...data.info.batasWilayah, utara: e.target.value } } })}
                      style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Batas Selatan</label>
                    <input
                      type="text"
                      value={data.info.batasWilayah?.selatan}
                      onChange={(e) => setData({ ...data, info: { ...data.info, batasWilayah: { ...data.info.batasWilayah, selatan: e.target.value } } })}
                      style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Batas Timur</label>
                    <input
                      type="text"
                      value={data.info.batasWilayah?.timur}
                      onChange={(e) => setData({ ...data, info: { ...data.info, batasWilayah: { ...data.info.batasWilayah, timur: e.target.value } } })}
                      style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Batas Barat</label>
                    <input
                      type="text"
                      value={data.info.batasWilayah?.barat}
                      onChange={(e) => setData({ ...data, info: { ...data.info, batasWilayah: { ...data.info.batasWilayah, barat: e.target.value } } })}
                      style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.75rem", fontSize: "0.925rem" }}>
                Simpan Perubahan Informasi Profil
              </button>
            </form>
          )}

          {/* ================= TAB 2: EDIT LAYANAN ADMINISTRASI ================= */}
          {activeTab === "layanan" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <h4 style={{ fontSize: "1.1rem", color: "#0f172a", fontWeight: 700 }}>Daftar Layanan Surat Administrasi</h4>
                <button
                  onClick={() => {
                    const newLayanan: LayananSurat = {
                      id: `layanan-${Date.now()}`,
                      judul: "Layanan Baru",
                      kategori: "Kependudukan",
                      waktu: "1 Hari",
                      biaya: "Gratis (Rp 0)",
                      deskripsi: "Deskripsi alur layanan...",
                      persyaratan: ["KTP", "KK"],
                      alur: "Pengajuan di Kantor Kelurahan"
                    };
                    setEditingLayanan(newLayanan);
                    setPersyaratanText(newLayanan.persyaratan.join("\n"));
                  }}
                  className="btn btn-primary"
                  style={{ fontSize: "0.85rem" }}
                >
                  + Tambah Layanan Baru
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
                {data.layanan.map((item) => (
                  <div key={item.id} style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ fontSize: "0.725rem", background: "#ecfdf5", color: "#059669", padding: "0.2rem 0.55rem", borderRadius: "9999px", fontWeight: 600, display: "inline-block", marginBottom: "0.5rem" }}>
                        {item.kategori}
                      </span>
                      <h5 style={{ fontSize: "1rem", color: "#0f172a", fontWeight: 700, marginBottom: "0.4rem" }}>{item.judul}</h5>
                      <p style={{ fontSize: "0.825rem", color: "#64748b", lineHeight: 1.5, marginBottom: "0.85rem" }}>{item.deskripsi}</p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                      <button
                        onClick={() => {
                          setEditingLayanan(item);
                          setPersyaratanText(Array.isArray(item.persyaratan) ? item.persyaratan.join("\n") : "");
                        }}
                        className="btn btn-outline"
                        style={{ fontSize: "0.8rem", flex: 1 }}
                      >
                        Edit Layanan
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Hapus layanan "${item.judul}"?`)) {
                            const filtered = data.layanan.filter((l) => l.id !== item.id);
                            const updated = { ...data, layanan: filtered };
                            setData(updated);
                            await deleteLayananAsync(item.id);
                            handleSaveAllData(updated);
                          }
                        }}
                        className="btn btn-outline"
                        style={{ fontSize: "0.8rem", color: "#ef4444", borderColor: "#fca5a5" }}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Editor Layanan */}
              {editingLayanan && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 1200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
                  <div style={{ background: "#ffffff", width: "100%", maxWidth: "600px", borderRadius: "16px", padding: "1.5rem", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}>
                    <h4 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, marginBottom: "1rem" }}>Edit Layanan Surat Administrasi</h4>
                    
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Judul Layanan Surat</label>
                      <input
                        type="text"
                        value={editingLayanan.judul}
                        onChange={(e) => setEditingLayanan({ ...editingLayanan, judul: e.target.value })}
                        style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                      />
                    </div>

                    <div className="admin-form-grid-2">
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Kategori Surat</label>
                        <input
                          type="text"
                          value={editingLayanan.kategori}
                          onChange={(e) => setEditingLayanan({ ...editingLayanan, kategori: e.target.value })}
                          style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Estimasi Waktu</label>
                        <input
                          type="text"
                          value={editingLayanan.waktu}
                          onChange={(e) => setEditingLayanan({ ...editingLayanan, waktu: e.target.value })}
                          style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Deskripsi Layanan</label>
                      <textarea
                        rows={2}
                        value={editingLayanan.deskripsi}
                        onChange={(e) => setEditingLayanan({ ...editingLayanan, deskripsi: e.target.value })}
                        style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                      />
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Persyaratan (Tuliskan 1 Poin Persyaratan Per Baris)</label>
                      <textarea
                        rows={4}
                        value={persyaratanText}
                        onChange={(e) => setPersyaratanText(e.target.value)}
                        style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                      <button onClick={() => setEditingLayanan(null)} className="btn btn-outline" style={{ fontSize: "0.85rem" }}>
                        Batal
                      </button>
                      <button
                        onClick={() => {
                          const newPersy = persyaratanText.split("\n").filter((p) => p.trim().length > 0);
                          const finalItem = { ...editingLayanan, persyaratan: newPersy };
                          const exists = data.layanan.some((l) => l.id === finalItem.id);
                          let updatedLayanan = [];
                          if (exists) {
                            updatedLayanan = data.layanan.map((l) => (l.id === finalItem.id ? finalItem : l));
                          } else {
                            updatedLayanan = [finalItem, ...data.layanan];
                          }
                          const updated = { ...data, layanan: updatedLayanan };
                          setData(updated);
                          setEditingLayanan(null);
                          handleSaveAllData(updated);
                        }}
                        className="btn btn-primary"
                        style={{ fontSize: "0.85rem" }}
                      >
                        Simpan Layanan Surat
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 3: EDIT BERITA & PENGUMUMAN ================= */}
          {activeTab === "berita" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <h4 style={{ fontSize: "1.1rem", color: "#0f172a", fontWeight: 700 }}>Daftar Publikasi Berita & Pengumuman</h4>
                <button
                  onClick={() => {
                    const newBerita: BeritaPengumuman = {
                      id: `berita-${Date.now()}`,
                      judul: "Judul Berita Baru",
                      tanggal: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }),
                      kategori: "Pengumuman Resmi",
                      gambar: "/assets/images/kantor_kelurahan.jpg",
                      ringkasan: "Ringkasan berita singkat...",
                      isi: "Rincian isi berita kelurahan..."
                    };
                    setEditingBerita(newBerita);
                  }}
                  className="btn btn-primary"
                  style={{ fontSize: "0.85rem" }}
                >
                  + Tambah Berita Baru
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
                {data.berita.map((item) => (
                  <div key={item.id} style={{ background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <img src={item.gambar || "/assets/images/kantor_kelurahan.jpg"} alt={item.judul} style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                    <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 600, marginBottom: "0.2rem" }}>{item.tanggal} • {item.kategori}</div>
                        <h5 style={{ fontSize: "0.95rem", color: "#0f172a", fontWeight: 700, marginBottom: "0.4rem" }}>{item.judul}</h5>
                        <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.5, marginBottom: "0.85rem" }}>{item.ringkasan}</p>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                        <button onClick={() => setEditingBerita(item)} className="btn btn-outline" style={{ fontSize: "0.78rem", flex: 1 }}>
                          Edit Berita
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Hapus berita "${item.judul}"?`)) {
                              const filtered = data.berita.filter((b) => b.id !== item.id);
                              const updated = { ...data, berita: filtered };
                              setData(updated);
                              await deleteBeritaAsync(item.id);
                              handleSaveAllData(updated);
                            }
                          }}
                          className="btn btn-outline"
                          style={{ fontSize: "0.78rem", color: "#ef4444", borderColor: "#fca5a5" }}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Editor Berita */}
              {editingBerita && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 1200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
                  <div style={{ background: "#ffffff", width: "100%", maxWidth: "600px", borderRadius: "16px", padding: "1.5rem", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}>
                    <h4 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, marginBottom: "1rem" }}>Edit Berita & Pengumuman</h4>
                    
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Judul Berita</label>
                      <input
                        type="text"
                        value={editingBerita.judul}
                        onChange={(e) => setEditingBerita({ ...editingBerita, judul: e.target.value })}
                        style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                      />
                    </div>

                    <div className="admin-form-grid-2">
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Kategori Berita</label>
                        <input
                          type="text"
                          value={editingBerita.kategori}
                          onChange={(e) => setEditingBerita({ ...editingBerita, kategori: e.target.value })}
                          style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Tanggal Rilis</label>
                        <input
                          type="text"
                          value={editingBerita.tanggal}
                          onChange={(e) => setEditingBerita({ ...editingBerita, tanggal: e.target.value })}
                          style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Upload Foto Utama Berita</label>
                      <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                        <img src={editingBerita.gambar} alt="Preview" style={{ width: "90px", height: "60px", objectFit: "cover", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (base64) => setEditingBerita({ ...editingBerita, gambar: base64 }))}
                          style={{ fontSize: "0.85rem" }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Ringkasan Singkat</label>
                      <textarea
                        rows={2}
                        value={editingBerita.ringkasan}
                        onChange={(e) => setEditingBerita({ ...editingBerita, ringkasan: e.target.value })}
                        style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                      />
                    </div>

                    <div style={{ marginBottom: "1.25rem" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Isi Lengkap Berita</label>
                      <textarea
                        rows={5}
                        value={editingBerita.isi || editingBerita.ringkasan}
                        onChange={(e) => setEditingBerita({ ...editingBerita, isi: e.target.value })}
                        style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                      <button onClick={() => setEditingBerita(null)} className="btn btn-outline" style={{ fontSize: "0.85rem" }}>
                        Batal
                      </button>
                      <button
                        onClick={() => {
                          const exists = data.berita.some((b) => b.id === editingBerita.id);
                          let updatedBerita = [];
                          if (exists) {
                            updatedBerita = data.berita.map((b) => (b.id === editingBerita.id ? editingBerita : b));
                          } else {
                            updatedBerita = [editingBerita, ...data.berita];
                          }
                          const updated = { ...data, berita: updatedBerita };
                          setData(updated);
                          setEditingBerita(null);
                          handleSaveAllData(updated);
                        }}
                        className="btn btn-primary"
                        style={{ fontSize: "0.85rem" }}
                      >
                        Simpan Berita
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 4: EDIT STRUKTUR ORGANISASI (SOTK) ================= */}
          {activeTab === "struktur" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <h4 style={{ fontSize: "1.1rem", color: "#0f172a", fontWeight: 700 }}>Daftar Aparatur & Pengurus SOTK</h4>
                <button
                  onClick={() => {
                    const newPerson: Aparatur = {
                      nama: "Nama Pejabat",
                      jabatan: "Jabatan Kelurahan",
                      nip: "NIP. 1990xxxx xxxxx x xxx",
                      foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                    };
                    setEditingStruktur({ item: newPerson, index: -1 });
                  }}
                  className="btn btn-primary"
                  style={{ fontSize: "0.85rem" }}
                >
                  + Tambah Aparatur Baru
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
                {data.struktur.map((person, idx) => (
                  <div key={idx} style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", gap: "1rem", alignItems: "center" }}>
                    <img src={person.foto} alt={person.nama} style={{ width: "65px", height: "65px", borderRadius: "9999px", objectFit: "cover", border: "2px solid #059669", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <h5 style={{ fontSize: "0.95rem", color: "#0f172a", fontWeight: 700, marginBottom: "0.2rem" }}>{person.nama}</h5>
                      <div style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 600, marginBottom: "0.2rem" }}>{person.jabatan}</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.5rem" }}>{person.nip}</div>

                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <button onClick={() => setEditingStruktur({ item: person, index: idx })} className="btn btn-outline" style={{ fontSize: "0.75rem", padding: "0.25rem 0.6rem" }}>
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Hapus ${person.nama}?`)) {
                              const filtered = data.struktur.filter((_, i) => i !== idx);
                              const updated = { ...data, struktur: filtered };
                              setData(updated);
                              handleSaveAllData(updated);
                            }
                          }}
                          className="btn btn-outline"
                          style={{ fontSize: "0.75rem", padding: "0.25rem 0.6rem", color: "#ef4444", borderColor: "#fca5a5" }}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Editor SOTK */}
              {editingStruktur && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 1200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
                  <div style={{ background: "#ffffff", width: "100%", maxWidth: "520px", borderRadius: "16px", padding: "1.5rem", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}>
                    <h4 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, marginBottom: "1rem" }}>Edit Data Aparatur SOTK</h4>
                    
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Nama Lengkap & Gelar</label>
                      <input
                        type="text"
                        value={editingStruktur.item.nama}
                        onChange={(e) => setEditingStruktur({ ...editingStruktur, item: { ...editingStruktur.item, nama: e.target.value } })}
                        style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                      />
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Jabatan Official</label>
                      <input
                        type="text"
                        value={editingStruktur.item.jabatan}
                        onChange={(e) => setEditingStruktur({ ...editingStruktur, item: { ...editingStruktur.item, jabatan: e.target.value } })}
                        style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                      />
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>NIP / Keterangan Lembaga</label>
                      <input
                        type="text"
                        value={editingStruktur.item.nip}
                        onChange={(e) => setEditingStruktur({ ...editingStruktur, item: { ...editingStruktur.item, nip: e.target.value } })}
                        style={{ width: "100%", padding: "0.65rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.875rem" }}
                      />
                    </div>

                    <div style={{ marginBottom: "1.25rem" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Upload Foto Aparatur</label>
                      <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                        <img src={editingStruktur.item.foto} alt="Preview" style={{ width: "60px", height: "60px", borderRadius: "9999px", objectFit: "cover", border: "1px solid #cbd5e1" }} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (base64) => setEditingStruktur({ ...editingStruktur, item: { ...editingStruktur.item, foto: base64 } }))}
                          style={{ fontSize: "0.85rem" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                      <button onClick={() => setEditingStruktur(null)} className="btn btn-outline" style={{ fontSize: "0.85rem" }}>
                        Batal
                      </button>
                      <button
                        onClick={() => {
                          let updatedStruktur = [...data.struktur];
                          if (editingStruktur.index >= 0) {
                            updatedStruktur[editingStruktur.index] = editingStruktur.item;
                          } else {
                            updatedStruktur.push(editingStruktur.item);
                          }
                          const updated = { ...data, struktur: updatedStruktur };
                          setData(updated);
                          setEditingStruktur(null);
                          handleSaveAllData(updated);
                        }}
                        className="btn btn-primary"
                        style={{ fontSize: "0.85rem" }}
                      >
                        Simpan Aparatur
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 5: HALAMAN PENGADUAN MASUK ================= */}
          {activeTab === "pengaduan" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <div>
                  <h4 style={{ fontSize: "1.15rem", color: "#0f172a", fontWeight: 700, marginBottom: "0.25rem" }}>
                    Daftar Pengaduan & Aspirasi Warga Masuk
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    Kelola dan atur status pengaduan yang dikirimkan warga melalui portal kelurahan.
                  </p>
                </div>

                {/* Filter Dropdown Select */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155" }}>Filter Status:</label>
                  <select
                    value={pengaduanFilter}
                    onChange={(e) => setPengaduanFilter(e.target.value as any)}
                    style={{ padding: "0.45rem 0.85rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.85rem", background: "#ffffff", fontWeight: 600, cursor: "pointer" }}
                  >
                    <option value="Semua">Semua Status ({listPengaduan.length})</option>
                    <option value="Baru">Aduan Baru ({countBaru})</option>
                    <option value="Proses">Dalam Proses ({countProses})</option>
                    <option value="Selesai">Selesai ({countSelesai})</option>
                  </select>
                </div>
              </div>

              {/* Summary Statistics Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "10px", padding: "1rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600, display: "block" }}>Total Aduan</span>
                  <div style={{ fontSize: "1.3rem", color: "#0f172a", fontWeight: 700 }}>{listPengaduan.length} Aduan</div>
                </div>

                <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: "10px", padding: "1rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "#be123c", fontWeight: 600, display: "block" }}>Aduan Baru</span>
                  <div style={{ fontSize: "1.3rem", color: "#e11d48", fontWeight: 700 }}>{countBaru} Belum Diproses</div>
                </div>

                <div style={{ background: "#fffbeb", border: "1px solid #fef3c7", borderRadius: "10px", padding: "1rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "#b45309", fontWeight: 600, display: "block" }}>Sedang Diproses</span>
                  <div style={{ fontSize: "1.3rem", color: "#d97706", fontWeight: 700 }}>{countProses} Aduan</div>
                </div>

                <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "10px", padding: "1rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "#047857", fontWeight: 600, display: "block" }}>Selesai / Ditindak</span>
                  <div style={{ fontSize: "1.3rem", color: "#059669", fontWeight: 700 }}>{countSelesai} Aduan</div>
                </div>
              </div>

              {/* List of Incoming Complaints */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {filteredPengaduan.length === 0 ? (
                  <div style={{ padding: "2.5rem", textAlign: "center", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", color: "#64748b", fontSize: "0.9rem" }}>
                    Tidak ada catatan pengaduan dengan status <strong>"{pengaduanFilter}"</strong>.
                  </div>
                ) : (
                  filteredPengaduan.map((item) => {
                    const statusBadge =
                      item.status === "Baru"
                        ? { bg: "#fff1f2", color: "#e11d48", border: "#fecdd3", label: "Aduan Baru" }
                        : item.status === "Proses"
                        ? { bg: "#fffbeb", color: "#d97706", border: "#fef3c7", label: "Dalam Proses" }
                        : { bg: "#ecfdf5", color: "#059669", border: "#a7f3d0", label: "Selesai" };

                    return (
                      <div key={item.id} style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: `1px solid ${statusBadge.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.75rem" }}>
                          <div>
                            <span style={{ fontSize: "0.75rem", background: statusBadge.bg, color: statusBadge.color, border: `1px solid ${statusBadge.border}`, padding: "0.2rem 0.65rem", borderRadius: "9999px", fontWeight: 700, display: "inline-block", marginBottom: "0.4rem" }}>
                              {statusBadge.label}
                            </span>
                            <h5 style={{ fontSize: "1.05rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>
                              {item.judul}
                            </h5>
                          </div>

                          <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                            Ditulis pada: <strong>{item.tanggal}</strong>
                          </div>
                        </div>

                        <div style={{ background: "#f8fafc", padding: "0.85rem 1rem", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "0.875rem", color: "#334155", lineHeight: 1.6, marginBottom: "1rem", whiteSpace: "pre-line" }}>
                          {item.isi}
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", borderTop: "1px dashed #e2e8f0", paddingTop: "0.75rem" }}>
                          <div style={{ fontSize: "0.8rem", color: "#475569" }}>
                            Pelapor: <strong>{item.nama}</strong> • Telp: <strong>+{item.telepon}</strong>
                          </div>

                          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                            {/* Action WhatsApp */}
                            {item.telepon && (
                              <button
                                onClick={() => {
                                  const text = encodeURIComponent(`Halo Bpk/Ibu ${item.nama}, terkait pengaduan Anda mengenai "${item.judul}" di Kelurahan Mallilingi: `);
                                  window.open(`https://wa.me/${item.telepon}?text=${text}`, "_blank");
                                }}
                                className="btn btn-outline"
                                style={{ fontSize: "0.78rem", padding: "0.3rem 0.7rem", color: "#059669", borderColor: "#a7f3d0" }}
                              >
                                Hubungi via WA
                              </button>
                            )}

                            {/* Action Status Change */}
                            <select
                              value={item.status}
                              onChange={(e) => updatePengaduanStatus(item.id, e.target.value as any)}
                              style={{ padding: "0.3rem 0.6rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.78rem", background: "#ffffff", fontWeight: 600, cursor: "pointer" }}
                            >
                              <option value="Baru">Status: Baru</option>
                              <option value="Proses">Status: Proses</option>
                              <option value="Selesai">Status: Selesai</option>
                            </select>

                            {/* Action Delete */}
                            <button
                              onClick={() => deletePengaduan(item.id)}
                              className="btn btn-outline"
                              style={{ fontSize: "0.78rem", padding: "0.3rem 0.7rem", color: "#ef4444", borderColor: "#fca5a5" }}
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
