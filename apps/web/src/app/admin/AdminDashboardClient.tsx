"use client";

import { useState, useEffect } from "react";
import { MallilingiData } from "../../types";
import { saveMallilingiDataAsync } from "../../lib/data";

export default function AdminDashboardClient({ initialData }: { initialData: MallilingiData }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [data, setData] = useState<MallilingiData>(initialData);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    const auth = sessionStorage.getItem("MALLILINGI_ADMIN_AUTH");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "1234" || pinInput === "mallilingi") {
      sessionStorage.setItem("MALLILINGI_ADMIN_AUTH", "true");
      setIsAuthenticated(true);
    } else {
      alert("PIN Salah! PIN Bawaan: 1234");
    }
  };

  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveMallilingiDataAsync(data);
    setStatusMsg("✅ Informasi Umum & Supabase Cloud berhasil diperbarui!");
    setTimeout(() => setStatusMsg(""), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: "420px", margin: "2rem auto", background: "#ffffff", padding: "2rem", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.08)", textAlign: "center" }}>
        <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>🔐 Masuk Dashboard Admin</h3>
        <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.5rem" }}>Masukkan PIN Akses Petugas untuk mengelola media kelurahan.</p>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Masukkan PIN (Default: 1234)"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "1rem", textAlign: "center", fontSize: "1rem" }}
          />
          <button type="submit" class="btn btn-primary" style={{ width: "100%" }}>
            Masuk Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ background: "#ffffff", borderRadius: "16px", padding: "2rem", border: "1px solid #e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}>
      {statusMsg && (
        <div style={{ background: "#ecfdf5", color: "#047857", border: "1px solid #a7f3d0", padding: "0.85rem 1.25rem", borderRadius: "8px", marginBottom: "1.5rem", fontWeight: 600 }}>
          {statusMsg}
        </div>
      )}

      <div style={{ marginBottom: "2rem", borderBottom: "1px solid #e2e8f0", paddingBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h3 style={{ fontSize: "1.25rem", color: "#0f172a" }}>Edit Profil & Informasi Kelurahan</h3>
          <span style={{ fontSize: "0.825rem", color: "#059669" }}>⚡ Supabase Cloud Database Enabled</span>
        </div>
        <button onClick={() => { sessionStorage.removeItem("MALLILINGI_ADMIN_AUTH"); setIsAuthenticated(false); }} class="btn btn-outline" style={{ fontSize: "0.8rem" }}>
          Keluar (Logout)
        </button>
      </div>

      <form onSubmit={handleSaveInfo}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
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

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Sambutan Lurah</label>
          <textarea
            rows={3}
            value={data.info.sambutanLurah}
            onChange={(e) => setData({ ...data, info: { ...data.info, sambutanLurah: e.target.value } })}
            style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Visi Kelurahan</label>
          <textarea
            rows={2}
            value={data.info.visi}
            onChange={(e) => setData({ ...data, info: { ...data.info, visi: e.target.value } })}
            style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Jumlah Penduduk</label>
            <input
              type="text"
              value={data.info.jumlahPenduduk}
              onChange={(e) => setData({ ...data, info: { ...data.info, jumlahPenduduk: e.target.value } })}
              style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Jumlah KK</label>
            <input
              type="text"
              value={data.info.jumlahKK}
              onChange={(e) => setData({ ...data, info: { ...data.info, jumlahKK: e.target.value } })}
              style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>Luas Wilayah</label>
            <input
              type="text"
              value={data.info.luasWilayah}
              onChange={(e) => setData({ ...data, info: { ...data.info, luasWilayah: e.target.value } })}
              style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}
            />
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          💾 Simpan Perubahan ke Supabase Cloud
        </button>
      </form>
    </div>
  );
}
