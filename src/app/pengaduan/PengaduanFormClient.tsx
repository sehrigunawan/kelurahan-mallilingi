"use client";

import { useState } from "react";
import { sendPengaduanWargaAsync } from "../../lib/data";

export default function PengaduanFormClient({ whatsappNumber }: { whatsappNumber: string }) {
  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    kategori: "Pelayanan Kependudukan",
    judul: "",
    isi: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [lastSubmittedText, setLastSubmittedText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.judul || !formData.isi || !formData.telepon) {
      alert("Harap lengkapi Nama, No. WhatsApp, Judul, dan Isi Pengaduan Anda.");
      return;
    }

    setIsSubmitting(true);
    setStatusMsg("");

    try {
      // 1. Send complaint directly to Supabase Database
      const res = await sendPengaduanWargaAsync({
        nama: formData.nama,
        telepon: formData.telepon,
        kategori: formData.kategori,
        judul: formData.judul,
        isi: formData.isi,
      });

      if (!res.success) {
        alert(`Gagal menyimpan ke Database Supabase: ${res.error || "401 Unauthorized"}.\n\nHarap pastikan Kunci API Supabase (NEXT_PUBLIC_SUPABASE_ANON_KEY) valid.`);
        setIsSubmitting(false);
        return;
      }

      // Prepare text for optional WhatsApp redirect
      const textMessage = `*FORMULIR PENGADUAN WARGA KELURAHAN MALLILINGI*%0A%0A` +
        `*Nama Pelapor:* ${encodeURIComponent(formData.nama)}%0A` +
        `*No. Telp/WA:* ${encodeURIComponent(formData.telepon)}%0A` +
        `*Kategori Aduan:* ${encodeURIComponent(formData.kategori)}%0A` +
        `*Judul Laporan:* ${encodeURIComponent(formData.judul)}%0A%0A` +
        `*Rincian Pengaduan:*%0A${encodeURIComponent(formData.isi)}`;

      setLastSubmittedText(textMessage);
      setStatusMsg("Pengaduan Anda telah berhasil dikirim ke Admin Kelurahan Mallilingi dan akan segera ditindaklanjuti!");
      
      // Clear form
      setFormData({
        nama: "",
        telepon: "",
        kategori: "Pelayanan Kependudukan",
        judul: "",
        isi: "",
      });
    } catch (error) {
      console.error("Gagal mengirim pengaduan:", error);
      alert("Terjadi kendala saat mengirim pengaduan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenWhatsApp = () => {
    if (lastSubmittedText) {
      const waUrl = `https://wa.me/${whatsappNumber}?text=${lastSubmittedText}`;
      window.open(waUrl, "_blank");
    }
  };

  return (
    <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
      <h3 style={{ fontSize: "1.2rem", color: "#0f172a", fontWeight: 700, marginBottom: "0.25rem" }}>Formulir Kirim Pengaduan Warga</h3>
      <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.5rem" }}>
        Laporan yang Anda kirim akan langsung tercatat di Sistem Dashboard Admin Kelurahan Mallilingi.
      </p>

      {statusMsg && (
        <div style={{ background: "#ecfdf5", color: "#047857", border: "1px solid #a7f3d0", padding: "1rem 1.25rem", borderRadius: "10px", marginBottom: "1.5rem" }}>
          <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem" }}>
            ✅ Berhasil Terkirim!
          </div>
          <p style={{ fontSize: "0.875rem", margin: 0, lineHeight: 1.6 }}>
            {statusMsg}
          </p>
          {lastSubmittedText && (
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="btn btn-outline"
              style={{ marginTop: "0.85rem", fontSize: "0.825rem", padding: "0.4rem 0.85rem", background: "#ffffff" }}
            >
              💬 Ingin Juga Kirim via WhatsApp Langsung? Klik di Sini
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Row 1: Nama & Telepon */}
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
              No. HP / WhatsApp Pelapor *
            </label>
            <input
              type="text"
              required
              placeholder="0852xxxxxxxx"
              value={formData.telepon}
              onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
              style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>
        </div>

        {/* Row 2: Kategori */}
        <div style={{ marginBottom: "1rem" }}>
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

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem", color: "#1e293b" }}>
            Judul / Topik Pengaduan *
          </label>
          <input
            type="text"
            required
            placeholder="Contoh: Genangan Air di Saluran RW 002"
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

        <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: "100%", fontSize: "0.925rem", padding: "0.75rem" }}>
          {isSubmitting ? "Mengirim Laporan ke Database Admin..." : "Kirim Pengaduan ke Admin Kelurahan"}
        </button>
      </form>
    </div>
  );
}
