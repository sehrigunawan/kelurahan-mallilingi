"use client";

import { useState, useEffect } from "react";
import { MallilingiData, LayananSurat, BeritaPengumuman, Aparatur } from "../../types";
import { saveMallilingiDataAsync } from "../../lib/data";

export default function AdminDashboardClient({ initialData }: { initialData: MallilingiData }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [activeTab, setActiveTab] = useState<"info" | "layanan" | "berita" | "struktur">("info");
  const [data, setData] = useState<MallilingiData>(initialData);
  const [statusMsg, setStatusMsg] = useState("");

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
  }, []);

  useEffect(() => {
    if (data.info.misi) {
      setMisiText(Array.isArray(data.info.misi) ? data.info.misi.join("\n") : "");
    }
  }, [data.info.misi]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "1234" || pinInput === "mallilingi") {
      sessionStorage.setItem("MALLILINGI_ADMIN_AUTH", "true");
      setIsAuthenticated(true);
    } else {
      alert("PIN Salah! PIN Bawaan: 1234");
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

  const handleSaveAllData = async (updatedData?: MallilingiData) => {
    const dataToSave = updatedData || data;
    await saveMallilingiDataAsync(dataToSave);
    setStatusMsg("✅ Seluruh perubahan website berhasil disimpan ke Supabase Cloud & Database!");
    setTimeout(() => setStatusMsg(""), 3500);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: "440px", margin: "3rem auto", background: "#ffffff", padding: "2.5rem", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 10px 25px rgba(0,0,0,0.08)", textAlign: "center" }}>
        <div style={{ width: "60px", height: "60px", background: "#ecfdf5", color: "#059669", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", margin: "0 auto 1.25rem auto" }}>
          🔐
        </div>
        <h3 style={{ fontSize: "1.35rem", color: "#0f172a", marginBottom: "0.4rem", fontWeight: 800 }}>Masuk Dashboard Admin</h3>
        <p style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "1.75rem", lineHeight: 1.6 }}>
          Masukkan PIN Akses Petugas Kelurahan untuk mengelola seluruh informasi website publik.
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Masukkan PIN (Default: 1234)"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "10px", border: "1px solid #cbd5e1", marginBottom: "1.25rem", textAlign: "center", fontSize: "1.05rem", letterSpacing: "0.1em" }}
          />
          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.85rem" }}>
            Masuk Dashboard Admin →
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ background: "#ffffff", borderRadius: "20px", padding: "2rem", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
      
      {/* Top Header & Status Notification */}
      <div style={{ marginBottom: "1.5rem", borderBottom: "1px solid #e2e8f0", paddingBottom: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h3 style={{ fontSize: "1.4rem", color: "#0f172a", fontWeight: 800 }}>Panel Pengelola Website Kelurahan Mallilingi</h3>
          <span style={{ fontSize: "0.825rem", color: "#059669", fontWeight: 600 }}>⚡ Sistem Pengaturan Terpadu & Supabase Cloud Sync</span>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button onClick={() => handleSaveAllData()} className="btn btn-primary" style={{ fontSize: "0.875rem" }}>
            💾 Simpan Semua Perubahan
          </button>
          <button onClick={() => { sessionStorage.removeItem("MALLILINGI_ADMIN_AUTH"); setIsAuthenticated(false); }} className="btn btn-outline" style={{ fontSize: "0.875rem" }}>
            Keluar (Logout)
          </button>
        </div>
      </div>

      {statusMsg && (
        <div style={{ background: "#ecfdf5", color: "#047857", border: "1px solid #a7f3d0", padding: "0.85rem 1.25rem", borderRadius: "10px", marginBottom: "1.5rem", fontWeight: 600 }}>
          {statusMsg}
        </div>
      )}

      {/* Module Navigation Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", borderBottom: "2px solid #e2e8f0", marginBottom: "2rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
        <button
          onClick={() => setActiveTab("info")}
          style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", border: "none", background: activeTab === "info" ? "#ecfdf5" : "transparent", color: activeTab === "info" ? "#059669" : "#64748b", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", whiteSpace: "nowrap" }}
        >
          🏛️ Profil & Informasi Umum
        </button>
        <button
          onClick={() => setActiveTab("layanan")}
          style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", border: "none", background: activeTab === "layanan" ? "#ecfdf5" : "transparent", color: activeTab === "layanan" ? "#059669" : "#64748b", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", whiteSpace: "nowrap" }}
        >
          📋 Layanan Administrasi ({data.layanan.length})
        </button>
        <button
          onClick={() => setActiveTab("berita")}
          style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", border: "none", background: activeTab === "berita" ? "#ecfdf5" : "transparent", color: activeTab === "berita" ? "#059669" : "#64748b", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", whiteSpace: "nowrap" }}
        >
          📰 Berita ({data.berita.length})
        </button>
        <button
          onClick={() => setActiveTab("struktur")}
          style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", border: "none", background: activeTab === "struktur" ? "#ecfdf5" : "transparent", color: activeTab === "struktur" ? "#059669" : "#64748b", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", whiteSpace: "nowrap" }}
        >
          👥 Struktur SOTK ({data.struktur.length})
        </button>
      </div>

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
          <div style={{ background: "#f8fafc", padding: "1.5rem", borderRadius: "14px", border: "1px solid #e2e8f0", marginBottom: "2rem" }}>
            <h4 style={{ fontSize: "1.1rem", color: "#0f172a", marginBottom: "1rem", fontWeight: 800 }}>
              🏢 Informasi Alamat & Kontak Kelurahan (Top Bar, Footer, & Pengaduan)
            </h4>

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Alamat Lengkap Kantor Kelurahan</label>
              <textarea
                rows={2}
                value={data.info.alamat}
                onChange={(e) => setData({ ...data, info: { ...data.info, alamat: e.target.value } })}
                style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Nomor Telepon Kantor</label>
                <input
                  type="text"
                  value={data.info.telepon}
                  onChange={(e) => setData({ ...data, info: { ...data.info, telepon: e.target.value } })}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>WhatsApp Center / Pengaduan</label>
                <input
                  type="text"
                  value={data.info.whatsapp}
                  onChange={(e) => setData({ ...data, info: { ...data.info, whatsapp: e.target.value } })}
                  placeholder="Contoh: 6285255551234"
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Email Resmi Kelurahan</label>
                <input
                  type="email"
                  value={data.info.email}
                  onChange={(e) => setData({ ...data, info: { ...data.info, email: e.target.value } })}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Jam Pelayanan Operasional</label>
                <input
                  type="text"
                  value={data.info.jamKerja}
                  onChange={(e) => setData({ ...data, info: { ...data.info, jamKerja: e.target.value } })}
                  placeholder="Senin - Jumat: 08.00 - 16.00 WITA"
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Kode Pos Wilayah</label>
                <input
                  type="text"
                  value={data.info.kodePos}
                  onChange={(e) => setData({ ...data, info: { ...data.info, kodePos: e.target.value } })}
                  placeholder="92411"
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              </div>
            </div>
          </div>

          {/* SECTION B: DATA PIMPINAN & SAMBUTAN LURAH */}
          <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "14px", border: "1px solid #e2e8f0", marginBottom: "2rem" }}>
            <h4 style={{ fontSize: "1.1rem", color: "#0f172a", marginBottom: "1rem", fontWeight: 800 }}>Data Pimpinan & Sambutan Lurah</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Nama Lurah</label>
                <input
                  type="text"
                  value={data.info.namaLurah}
                  onChange={(e) => setData({ ...data, info: { ...data.info, namaLurah: e.target.value } })}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>NIP Lurah</label>
                <input
                  type="text"
                  value={data.info.nipLurah}
                  onChange={(e) => setData({ ...data, info: { ...data.info, nipLurah: e.target.value } })}
                  style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Upload Foto Lurah</label>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <div style={{ width: "70px", height: "80px", borderRadius: "8px", overflow: "hidden", border: "1px solid #cbd5e1", background: "#f8fafc" }}>
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
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Sambutan Lurah</label>
              <textarea
                rows={3}
                value={data.info.sambutanLurah}
                onChange={(e) => setData({ ...data, info: { ...data.info, sambutanLurah: e.target.value } })}
                style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
              />
            </div>
          </div>

          {/* SECTION C: VISI & MISI */}
          <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "14px", border: "1px solid #e2e8f0", marginBottom: "2rem" }}>
            <h4 style={{ fontSize: "1.1rem", color: "#0f172a", marginBottom: "1rem", fontWeight: 800 }}>Visi & Misi Pembangunan</h4>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Visi Kelurahan</label>
              <textarea
                rows={2}
                value={data.info.visi}
                onChange={(e) => setData({ ...data, info: { ...data.info, visi: e.target.value } })}
                style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Misi Pembangunan (Tuliskan 1 Poin Misi Per Baris)</label>
              <textarea
                rows={4}
                value={misiText}
                onChange={(e) => setMisiText(e.target.value)}
                style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
              />
            </div>
          </div>

          {/* SECTION D: BATAS GEOGRAFIS & STATISTIK */}
          <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "14px", border: "1px solid #e2e8f0", marginBottom: "2rem" }}>
            <h4 style={{ fontSize: "1.1rem", color: "#0f172a", marginBottom: "1rem", fontWeight: 800 }}>Batas Geografis & Demografi</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.2rem" }}>Batas Utara</label>
                <input type="text" value={data.info.batasWilayah?.utara || ""} onChange={(e) => setData({ ...data, info: { ...data.info, batasWilayah: { ...data.info.batasWilayah, utara: e.target.value } } })} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.2rem" }}>Batas Selatan</label>
                <input type="text" value={data.info.batasWilayah?.selatan || ""} onChange={(e) => setData({ ...data, info: { ...data.info, batasWilayah: { ...data.info.batasWilayah, selatan: e.target.value } } })} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.2rem" }}>Batas Timur</label>
                <input type="text" value={data.info.batasWilayah?.timur || ""} onChange={(e) => setData({ ...data, info: { ...data.info, batasWilayah: { ...data.info.batasWilayah, timur: e.target.value } } })} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.2rem" }}>Batas Barat</label>
                <input type="text" value={data.info.batasWilayah?.barat || ""} onChange={(e) => setData({ ...data, info: { ...data.info, batasWilayah: { ...data.info.batasWilayah, barat: e.target.value } } })} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Jumlah Penduduk</label>
                <input type="text" value={data.info.jumlahPenduduk} onChange={(e) => setData({ ...data, info: { ...data.info, jumlahPenduduk: e.target.value } })} style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Jumlah KK</label>
                <input type="text" value={data.info.jumlahKK} onChange={(e) => setData({ ...data, info: { ...data.info, jumlahKK: e.target.value } })} style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Luas Wilayah</label>
                <input type="text" value={data.info.luasWilayah} onChange={(e) => setData({ ...data, info: { ...data.info, luasWilayah: e.target.value } })} style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Wilayah RW / RT</label>
                <input type="text" value={`${data.info.jumlahRW} RW / ${data.info.jumlahRT} RT`} disabled style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#f1f5f9" }} />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: "0.85rem 1.75rem" }}>
            💾 Simpan Seluruh Informasi & Kontak Kelurahan
          </button>
        </form>
      )}

      {/* ================= TAB 2: LAYANAN ADMINISTRASI ================= */}
      {activeTab === "layanan" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "1.1rem", color: "#0f172a", fontWeight: 700 }}>Daftar Layanan Surat ({data.layanan.length})</h4>
            <button
              onClick={() => {
                setEditingLayanan({ id: `layanan-${Date.now()}`, judul: "", kategori: "Kependudukan", waktu: "15 - 30 Menit", biaya: "Gratis (Rp 0)", deskripsi: "", persyaratan: [], alur: "" });
                setPersyaratanText("");
              }}
              className="btn btn-primary"
              style={{ fontSize: "0.85rem" }}
            >
              ➕ Tambah Layanan Baru
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            {data.layanan.map((lay) => (
              <div key={lay.id} style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.75rem", background: "#ecfdf5", color: "#059669", padding: "0.2rem 0.5rem", borderRadius: "9999px", fontWeight: 700 }}>
                  {lay.kategori}
                </span>
                <h5 style={{ fontSize: "1rem", color: "#0f172a", margin: "0.5rem 0 0.25rem 0", fontWeight: 700 }}>{lay.judul}</h5>
                <div style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 600, marginBottom: "0.4rem" }}>⏱️ {lay.waktu} | 💰 {lay.biaya}</div>
                <p style={{ fontSize: "0.825rem", color: "#64748b", marginBottom: "0.75rem", lineHeight: 1.5 }}>{lay.deskripsi}</p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={() => { setEditingLayanan(lay); setPersyaratanText((lay.persyaratan || []).join("\n")); }} className="btn btn-outline" style={{ fontSize: "0.78rem", padding: "0.3rem 0.6rem" }}>
                    ✏️ Edit Lengkap
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Hapus layanan "${lay.judul}"?`)) {
                        const newLayanan = data.layanan.filter((l) => l.id !== lay.id);
                        const updated = { ...data, layanan: newLayanan };
                        setData(updated);
                        handleSaveAllData(updated);
                      }
                    }}
                    className="btn btn-outline"
                    style={{ fontSize: "0.78rem", padding: "0.3rem 0.6rem", color: "#e11d48", borderColor: "#fecdd3" }}
                  >
                    🗑️ Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Editor Layanan Surat Lengkap */}
          {editingLayanan && (
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: "#ffffff", width: "90%", maxWidth: "620px", padding: "2rem", borderRadius: "20px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
                <h4 style={{ fontSize: "1.25rem", color: "#0f172a", marginBottom: "1.25rem", fontWeight: 800 }}>Editor Lengkap Layanan Surat</h4>
                
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.2rem" }}>Judul Layanan Surat</label>
                  <input type="text" value={editingLayanan.judul} onChange={(e) => setEditingLayanan({ ...editingLayanan, judul: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.2rem" }}>Kategori</label>
                    <input type="text" value={editingLayanan.kategori} onChange={(e) => setEditingLayanan({ ...editingLayanan, kategori: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.2rem" }}>Estimasi Waktu</label>
                    <input type="text" value={editingLayanan.waktu} onChange={(e) => setEditingLayanan({ ...editingLayanan, waktu: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.2rem" }}>Biaya Layanan</label>
                    <input type="text" value={editingLayanan.biaya} onChange={(e) => setEditingLayanan({ ...editingLayanan, biaya: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.2rem" }}>Deskripsi Singkat</label>
                  <textarea rows={2} value={editingLayanan.deskripsi} onChange={(e) => setEditingLayanan({ ...editingLayanan, deskripsi: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }} />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.2rem" }}>📑 Dokumen Persyaratan (Tuliskan 1 Syarat Per Baris)</label>
                  <textarea rows={4} value={persyaratanText} onChange={(e) => setPersyaratanText(e.target.value)} placeholder="Contoh:&#10;Fotokopi KTP Pemohon (1 lembar)&#10;Fotokopi KK (1 lembar)" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }} />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.2rem" }}>🔄 Alur Pengurusan Step-by-Step</label>
                  <textarea rows={4} value={editingLayanan.alur} onChange={(e) => setEditingLayanan({ ...editingLayanan, alur: e.target.value })} placeholder="Contoh:&#10;1. Pemohon membawa berkas ke Kantor Kelurahan.&#10;2. Petugas melakukan verifikasi berkas." style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }} />
                </div>

                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                  <button onClick={() => setEditingLayanan(null)} className="btn btn-outline">Batal</button>
                  <button
                    onClick={() => {
                      const newPersy = persyaratanText.split("\n").filter((p) => p.trim().length > 0);
                      const finalLayanan: LayananSurat = { ...editingLayanan, persyaratan: newPersy };
                      const exists = data.layanan.find((l) => l.id === finalLayanan.id);
                      let newLayananList = exists ? data.layanan.map((l) => (l.id === finalLayanan.id ? finalLayanan : l)) : [...data.layanan, finalLayanan];
                      const updated = { ...data, layanan: newLayananList };
                      setData(updated);
                      handleSaveAllData(updated);
                      setEditingLayanan(null);
                    }}
                    className="btn btn-primary"
                  >
                    💾 Simpan Layanan Surat
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 3: BERITA & PENGUMUMAN ================= */}
      {activeTab === "berita" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "1.1rem", color: "#0f172a", fontWeight: 700 }}>Daftar Artikel Berita ({data.berita.length})</h4>
            <button
              onClick={() => setEditingBerita({ id: `berita-${Date.now()}`, judul: "", tanggal: "3 Agustus 2026", kategori: "Pengumuman", gambar: "/assets/images/kantor_kelurahan.jpg", ringkasan: "", isi: "" })}
              className="btn btn-primary"
              style={{ fontSize: "0.85rem" }}
            >
              ➕ Tambah Berita Baru
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {data.berita.map((brt) => (
              <div key={brt.id} style={{ background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                <img src={brt.gambar || "/assets/images/kantor_kelurahan.jpg"} alt={brt.judul} style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                <div style={{ padding: "1rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 700 }}>📅 {brt.tanggal}</span>
                  <h5 style={{ fontSize: "0.95rem", margin: "0.4rem 0 0.25rem 0", color: "#0f172a", fontWeight: 700 }}>{brt.judul}</h5>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "0.75rem" }}>{brt.ringkasan}</p>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => setEditingBerita(brt)} className="btn btn-outline" style={{ fontSize: "0.78rem", padding: "0.3rem 0.6rem" }}>
                      ✏️ Edit Berita
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus berita "${brt.judul}"?`)) {
                          const newBerita = data.berita.filter((b) => b.id !== brt.id);
                          const updated = { ...data, berita: newBerita };
                          setData(updated);
                          handleSaveAllData(updated);
                        }
                      }}
                      className="btn btn-outline"
                      style={{ fontSize: "0.78rem", padding: "0.3rem 0.6rem", color: "#e11d48", borderColor: "#fecdd3" }}
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Edit/Tambah Berita dengan Upload Foto */}
          {editingBerita && (
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: "#ffffff", width: "90%", maxWidth: "620px", padding: "2rem", borderRadius: "20px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
                <h4 style={{ fontSize: "1.25rem", color: "#0f172a", marginBottom: "1.25rem", fontWeight: 800 }}>Form Editor Berita</h4>
                
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.2rem" }}>Judul Berita</label>
                  <input type="text" value={editingBerita.judul} onChange={(e) => setEditingBerita({ ...editingBerita, judul: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.2rem" }}>Tanggal Berita</label>
                    <input type="text" value={editingBerita.tanggal} onChange={(e) => setEditingBerita({ ...editingBerita, tanggal: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.2rem" }}>Kategori</label>
                    <input type="text" value={editingBerita.kategori} onChange={(e) => setEditingBerita({ ...editingBerita, kategori: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.2rem" }}>Upload Gambar Cover Berita</label>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <div style={{ width: "100px", height: "70px", borderRadius: "8px", overflow: "hidden", border: "1px solid #cbd5e1", background: "#f8fafc" }}>
                      <img src={editingBerita.gambar} alt="Cover Berita" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, (base64) => setEditingBerita({ ...editingBerita, gambar: base64 }))}
                      style={{ fontSize: "0.85rem" }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.2rem" }}>Ringkasan Singkat Berita</label>
                  <textarea rows={2} value={editingBerita.ringkasan} onChange={(e) => setEditingBerita({ ...editingBerita, ringkasan: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }} />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.2rem" }}>Isi Berita Lengkap</label>
                  <textarea rows={5} value={editingBerita.isi || ""} onChange={(e) => setEditingBerita({ ...editingBerita, isi: e.target.value })} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }} />
                </div>

                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                  <button onClick={() => setEditingBerita(null)} className="btn btn-outline">Batal</button>
                  <button
                    onClick={() => {
                      const exists = data.berita.find((b) => b.id === editingBerita.id);
                      let newBerita = exists ? data.berita.map((b) => (b.id === editingBerita.id ? editingBerita : b)) : [...data.berita, editingBerita];
                      const updated = { ...data, berita: newBerita };
                      setData(updated);
                      handleSaveAllData(updated);
                      setEditingBerita(null);
                    }}
                    className="btn btn-primary"
                  >
                    💾 Simpan Berita
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 4: STRUKTUR ORGANISASI SOTK ================= */}
      {activeTab === "struktur" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "1.1rem", color: "#0f172a", fontWeight: 700 }}>Aparatur & Pengurus SOTK ({data.struktur.length})</h4>
            <button
              onClick={() => setEditingStruktur({ item: { nama: "", jabatan: "", nip: "NIP.", foto: "/assets/images/lurah.jpg" }, index: -1 })}
              className="btn btn-primary"
              style={{ fontSize: "0.85rem" }}
            >
              ➕ Tambah Pengurus SOTK
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {data.struktur.map((st, idx) => (
              <div key={idx} style={{ background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                <img src={st.foto} alt={st.nama} style={{ width: "60px", height: "60px", borderRadius: "10px", objectFit: "cover" }} />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: "0.925rem", color: "#0f172a", margin: 0, fontWeight: 700 }}>{st.nama}</h5>
                  <div style={{ fontSize: "0.78rem", color: "#059669", fontWeight: 600 }}>{st.jabatan}</div>
                  <div style={{ fontSize: "0.725rem", color: "#64748b", marginBottom: "0.5rem" }}>{st.nip}</div>
                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    <button onClick={() => setEditingStruktur({ item: st, index: idx })} className="btn btn-outline" style={{ fontSize: "0.725rem", padding: "0.2rem 0.5rem" }}>
                      ✏️ Edit Pengurus
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus pengurus "${st.nama}"?`)) {
                          const newStruktur = data.struktur.filter((_, i) => i !== idx);
                          const updated = { ...data, struktur: newStruktur };
                          setData(updated);
                          handleSaveAllData(updated);
                        }
                      }}
                      className="btn btn-outline"
                      style={{ fontSize: "0.725rem", padding: "0.2rem 0.5rem", color: "#e11d48", borderColor: "#fecdd3" }}
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Edit/Tambah Struktur dengan Upload Foto */}
          {editingStruktur && (
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: "#ffffff", width: "90%", maxWidth: "520px", padding: "2rem", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
                <h4 style={{ fontSize: "1.25rem", color: "#0f172a", marginBottom: "1.25rem", fontWeight: 800 }}>Form Editor Pengurus SOTK</h4>
                
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.2rem" }}>Nama Lengkap</label>
                  <input type="text" value={editingStruktur.item.nama} onChange={(e) => setEditingStruktur({ ...editingStruktur, item: { ...editingStruktur.item, nama: e.target.value } })} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.2rem" }}>Jabatan</label>
                  <input type="text" value={editingStruktur.item.jabatan} onChange={(e) => setEditingStruktur({ ...editingStruktur, item: { ...editingStruktur.item, jabatan: e.target.value } })} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.2rem" }}>NIP / Status Lembaga</label>
                  <input type="text" value={editingStruktur.item.nip} onChange={(e) => setEditingStruktur({ ...editingStruktur, item: { ...editingStruktur.item, nip: e.target.value } })} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.2rem" }}>Upload Foto Aparatur</label>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <img src={editingStruktur.item.foto} alt="Preview Foto" style={{ width: "60px", height: "60px", borderRadius: "10px", objectFit: "cover", border: "1px solid #cbd5e1" }} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, (base64) => setEditingStruktur({ ...editingStruktur, item: { ...editingStruktur.item, foto: base64 } }))}
                      style={{ fontSize: "0.85rem" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                  <button onClick={() => setEditingStruktur(null)} className="btn btn-outline">Batal</button>
                  <button
                    onClick={() => {
                      let newStruktur = [...data.struktur];
                      if (editingStruktur.index >= 0) {
                        newStruktur[editingStruktur.index] = editingStruktur.item;
                      } else {
                        newStruktur.push(editingStruktur.item);
                      }
                      const updated = { ...data, struktur: newStruktur };
                      setData(updated);
                      handleSaveAllData(updated);
                      setEditingStruktur(null);
                    }}
                    className="btn btn-primary"
                  >
                    💾 Simpan Pengurus
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
