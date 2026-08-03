"use client";

import { useState } from "react";
import { InfoKelurahan } from "../../types";

export default function ProfilInteractiveCard({ info }: { info: InfoKelurahan }) {
  const [activeView, setActiveView] = useState<"sambutan" | "visimisi">("sambutan");

  return (
    <div style={{ background: "#ffffff", borderRadius: "16px", padding: "1.75rem", boxShadow: "0 4px 14px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gridTemplateRows: "1fr", flex: 1 }}>
        {/* View A: Sambutan */}
        <div style={{ gridArea: "1 / 1 / 2 / 2", opacity: activeView === "sambutan" ? 1 : 0, visibility: activeView === "sambutan" ? "visible" : "hidden", pointerEvents: activeView === "sambutan" ? "auto" : "none", display: "flex", flexDirection: "column", justifyContent: "center", transition: "opacity 0.35s ease, visibility 0.35s ease" }}>
          <div style={{ width: "130px", height: "130px", margin: "0 auto 0.85rem auto", borderRadius: "9999px", overflow: "hidden", border: "4px solid #ecfdf5", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <img src={info.fotoLurah || "/assets/images/lurah.jpg"} alt={info.namaLurah} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <h3 style={{ fontSize: "1.15rem", marginBottom: "0.2rem" }}>{info.namaLurah}</h3>
          <div style={{ color: "#059669", fontWeight: 600, fontSize: "0.88rem", marginBottom: "0.3rem" }}>Lurah Mallilingi</div>
          <div style={{ fontSize: "0.78rem", color: "#64748b" }}>NIP. {info.nipLurah}</div>
          <p style={{ fontSize: "0.88rem", color: "#475569", marginTop: "0.75rem", fontStyle: "italic" }}>
            "{info.sambutanLurah}"
          </p>
        </div>

        {/* View B: Visi Misi */}
        <div style={{ gridArea: "1 / 1 / 2 / 2", opacity: activeView === "visimisi" ? 1 : 0, visibility: activeView === "visimisi" ? "visible" : "hidden", pointerEvents: activeView === "visimisi" ? "auto" : "none", display: "flex", flexDirection: "column", justifyContent: "center", transition: "opacity 0.35s ease, visibility 0.35s ease" }}>
          <div style={{ marginBottom: "1rem" }}>
            <h4 style={{ fontSize: "0.98rem", marginBottom: "0.4rem" }}>🎯 Visi Kelurahan Mallilingi</h4>
            <p style={{ fontSize: "0.88rem", color: "#334155" }}>{info.visi}</p>
          </div>
          <h4 style={{ fontSize: "0.95rem", marginBottom: "0.5rem", color: "#0f172a", textAlign: "left" }}>🚀 Misi Pembangunan:</h4>
          <ul style={{ textAlign: "left", fontSize: "0.85rem", paddingLeft: "1.2rem", color: "#334155" }}>
            {(info.misi || []).map((m, idx) => (
              <li key={idx} style={{ marginBottom: "0.3rem" }}>{m}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pagination Dots */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.6rem", marginTop: "1rem", paddingTop: "0.5rem" }}>
        <button
          title="Sambutan Lurah"
          onClick={() => setActiveView("sambutan")}
          style={{
            width: activeView === "sambutan" ? "26px" : "10px",
            height: "10px",
            borderRadius: activeView === "sambutan" ? "10px" : "50%",
            border: "2px solid #059669",
            background: activeView === "sambutan" ? "#059669" : "#cbd5e1",
            cursor: "pointer",
            padding: 0,
            transition: "all 0.35s ease"
          }}
        />
        <button
          title="Visi & Misi"
          onClick={() => setActiveView("visimisi")}
          style={{
            width: activeView === "visimisi" ? "26px" : "10px",
            height: "10px",
            borderRadius: activeView === "visimisi" ? "10px" : "50%",
            border: "2px solid #059669",
            background: activeView === "visimisi" ? "#059669" : "#cbd5e1",
            cursor: "pointer",
            padding: 0,
            transition: "all 0.35s ease"
          }}
        />
      </div>
    </div>
  );
}
