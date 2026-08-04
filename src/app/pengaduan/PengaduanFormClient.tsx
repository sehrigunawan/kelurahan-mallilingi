"use client";

import { useState } from "react";

export default function PengaduanFormClient({ whatsappNumber }: { whatsappNumber: string }) {
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    telepon: "",
    kategori: "Pelayanan Kependudukan",
    judul: "",
    isi: "",
  });

  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.judul || !formData.isi) {
      alert("Harap lengkapi Nama, Judul, dan Isi Pengaduan Anda.");
      return;
    }

    const textMessage = `*FORMULIR PENGADUAN WARGA KELURAHAN MALLILINGI*%0A%0A` +
      `*Nama Pelapor:* ${encodeURIComponent(formData.nama)}%0A` +
      `*NIK:* ${encodeURIComponent(formData.nik || "-")}%0A` +
      `*No. Telp/WA:* ${encodeURIComponent(formData.telepon || "-")}%0A` +
      `*Kategori Aduan:* ${encodeURIComponent(formData.kategori)}%0A` +
      `*Judul Laporan:* ${encodeURIComponent(formData.judul)}%0A%0A` +
      `*Rincian Pengaduan:*%0A${encodeURIComponent(formData.isi)}`;

    const waUrl = `https://wa.me/${whatsappNumber}?text=${textMessage}`;
    window.open(waUrl, "_blank");
    setStatusMsg("Pesan pengaduan siap dikirim via WhatsApp.");
  };

  return (
    <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
      <h3 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, marginBottom: "0.25rem" }}>Formulir Pengaduan & Aspirasi</h3>
      <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.5rem" }}>
        Isi formulir di bawah ini untuk mengirimkan laporan resmi secara langsung.
      </p>

      {statusMsg && (
        <div style={{ background: "#ecfdf5", color: "#047857", border: "1px solid #a7f3d0", padding: "0.75rem 1rem", borderRadius: "6px", marginBottom: "1.25rem", fontSize: "0.875rem", fontWeight: 500 }}>
          {statusMsg}
        </div>
      )}

      <form onSubmit={handleSubmitWhatsApp}>
        {/* Row 1: Nama & NIK */}
        <div className="form-row-grid">
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem", color: "#1e293b" }}>
              Nama Lengkap Pelapor *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Ahmad Hidayat"
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem", color: "#1e293b" }}>
              NIK KTP (16 Digit)
            </label>
            <input
              type="text"
              placeholder="730301xxxxxxxxxx"
              value={formData.nik}
              onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
              style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>
        </div>

        {/* Row 2: Telepon & Kategori */}
        <div className="form-row-grid">
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem", color: "#1e293b" }}>
              No. HP / WhatsApp Pelapor
            </label>
            <input
              type="text"
              placeholder="0852xxxxxxxx"
              value={formData.telepon}
              onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
              style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem", color: "#1e293b" }}>
              Kategori Pengaduan *
            </label>
            <select
              value={formData.kategori}
              onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
              style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem", background: "#ffffff" }}
            >
              <option value="Pelayanan Kependudukan">Pelayanan Kependudukan</option>
              <option value="Kebersihan & Saluran Air">Kebersihan & Saluran Air</option>
              <option value="Infrastruktur & Jalan">Infrastruktur & Jalan</option>
              <option value="Ketentraman & Ketertiban">Ketentraman & Ketertiban</option>
              <option value="Bantuan Sosial">Bantuan Sosial</option>
              <option value="Saran & Aspirasi">Saran & Aspirasi</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem", color: "#1e293b" }}>
            Judul / Topik Pengaduan *
          </label>
          <input
            type="text"
            required
            placeholder="Contoh: Genangan Air di Saluran RW 02"
            value={formData.judul}
            onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
            style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem", color: "#1e293b" }}>
            Rincian Laporan Pengaduan *
          </label>
          <textarea
            rows={5}
            required
            placeholder="Uraikan detail lokasi, waktu, dan permasalahan yang ingin Anda laporkan..."
            value={formData.isi}
            onChange={(e) => setFormData({ ...formData, isi: e.target.value })}
            style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem", lineHeight: 1.6 }}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: "100%", fontSize: "0.925rem" }}>
          Kirim Pengaduan via WhatsApp Kelurahan
        </button>
      </form>
    </div>
  );
}
