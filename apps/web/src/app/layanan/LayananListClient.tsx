"use client";

import { useState } from "react";
import { LayananSurat } from "../../types";

export default function LayananListClient({ initialLayanan, whatsappNumber }: { initialLayanan: LayananSurat[]; whatsappNumber: string }) {
  const [query, setQuery] = useState("");
  const [activeModal, setActiveModal] = useState<LayananSurat | null>(null);

  const filtered = initialLayanan.filter(item =>
    item.judul.toLowerCase().includes(query.toLowerCase()) ||
    item.kategori.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Search Input */}
      <div style={{ maxWidth: "540px", margin: "0 auto 2.5rem auto" }}>
        <input
          type="text"
          placeholder="🔍 Cari jenis surat atau persyaratan (contoh: SKTM, SKU, KTP)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "100%", padding: "0.85rem 1.25rem", borderRadius: "9999px", border: "1px solid #cbd5e1", fontSize: "0.95rem", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", outline: "none" }}
        />
      </div>

      {/* Grid */}
      <div class="layanan-grid">
        {filtered.map((item) => (
          <div key={item.id} class="layanan-card" style={{ padding: "1.5rem" }}>
            <div>
              <span style={{ fontSize: "0.75rem", background: "#ecfdf5", color: "#059669", padding: "0.25rem 0.6rem", borderRadius: "9999px", fontWeight: 700 }}>
                {item.kategori}
              </span>
              <h3 style={{ fontSize: "1.1rem", margin: "0.75rem 0 0.5rem 0" }}>{item.judul}</h3>
              <div style={{ display: "flex", gap: "1rem", fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem" }}>
                <span>⏱️ {item.waktu}</span>
                <span>💰 {item.biaya}</span>
              </div>
            </div>
            <button onClick={() => setActiveModal(item)} class="btn btn-outline" style={{ fontSize: "0.825rem", marginTop: "auto" }}>
              Lihat Syarat & Alur →
            </button>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {activeModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
          <div style={{ background: "#ffffff", borderRadius: "16px", maxWidth: "600px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "2rem", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.2rem", color: "#0f172a" }}>{activeModal.judul}</h3>
              <button onClick={() => setActiveModal(null)} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.75rem", background: "#ecfdf5", color: "#059669", padding: "0.25rem 0.6rem", borderRadius: "9999px", fontWeight: 700 }}>
                {activeModal.kategori}
              </span>
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem", fontWeight: 600, fontSize: "0.9rem", color: "#059669" }}>
                <div>⏱️ Estimasi Waktu: {activeModal.waktu}</div>
                <div>💰 Biaya: {activeModal.biaya}</div>
              </div>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <h4 style={{ fontSize: "1.05rem", marginBottom: "0.5rem", color: "#0f172a" }}>📄 Dokumen Persyaratan:</h4>
              <ul style={{ paddingLeft: "1.25rem", color: "#334155", fontSize: "0.95rem" }}>
                {(activeModal.persyaratan || []).map((s, idx) => (
                  <li key={idx} style={{ marginBottom: "0.3rem" }}>{s}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ fontSize: "1.05rem", marginBottom: "0.5rem", color: "#0f172a" }}>🔄 Alur Pengurusan:</h4>
              <div style={{ background: "#f8fafc", borderLeft: "3px solid #059669", padding: "1rem", borderRadius: "6px", fontSize: "0.9rem", color: "#334155", whiteSpace: "pre-line" }}>
                {activeModal.alur}
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <a href={`https://wa.me/${whatsappNumber}?text=Halo%20Kelurahan%20Mallilingi,%20saya%20ingin%20bertanya%20mengenai%20${encodeURIComponent(activeModal.judul)}`} target="_blank" rel="noopener noreferrer" class="btn btn-primary" style={{ fontSize: "0.85rem" }}>
                💬 Tanya Petugas via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
