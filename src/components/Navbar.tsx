"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfilOpen, setIsProfilOpen] = useState(false);
  const [isLayananOpen, setIsLayananOpen] = useState(false);

  const isProfilActive = pathname === "/profil" || pathname === "/struktur";
  const isBeritaActive = pathname === "/berita" || pathname.startsWith("/berita/");
  const isLayananActive = pathname === "/pengaduan" || pathname === "/administrasi" || pathname === "/layanan";

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="brand-logo">
          <div className="logo-icon" style={{ background: "none" }}>
            <img
              src="/assets/images/logo_bantaeng.png"
              alt="Logo Kabupaten Bantaeng - Kelurahan Mallilingi"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div>
            <h1 className="brand-title">
              Kelurahan Mallilingi
              <span className="brand-sub">  • Kec. Bantaeng</span>
            </h1>
          </div>
        </Link>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-btn"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>

        {/* Nav Links */}
        <ul className={`nav-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          <li>
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`nav-link ${pathname === "/" ? "active" : ""}`}
            >
              Beranda
            </Link>
          </li>

          {/* 1. Profil Dropdown Menu (Profil & Struktur) */}
          <li
            className="nav-dropdown-item"
            style={{ position: "relative" }}
            onMouseEnter={() => setIsProfilOpen(true)}
            onMouseLeave={() => setIsProfilOpen(false)}
          >
            <button
              onClick={() => setIsProfilOpen(!isProfilOpen)}
              className={`nav-link ${isProfilActive ? "active" : ""}`}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.3rem",
                fontSize: "0.9rem",
                fontFamily: "inherit",
                fontWeight: 500,
              }}
            >
              <span>Profil</span>
              <span style={{ fontSize: "0.7rem", transition: "transform 0.2s ease", transform: isProfilOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
            </button>

            {isProfilOpen && (
              <div className="dropdown-menu">
                <Link
                  href="/profil"
                  onClick={() => { setIsProfilOpen(false); setIsMobileMenuOpen(false); }}
                  className={`dropdown-link ${pathname === "/profil" ? "active" : ""}`}
                >
                  Profil & Visi Misi
                </Link>

                <Link
                  href="/struktur"
                  onClick={() => { setIsProfilOpen(false); setIsMobileMenuOpen(false); }}
                  className={`dropdown-link ${pathname === "/struktur" ? "active" : ""}`}
                >
                  Struktur Organisasi (SOTK)
                </Link>
              </div>
            )}
          </li>

          {/* 2. Berita Direct Top-Level Nav Link */}
          <li>
            <Link
              href="/berita"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`nav-link ${isBeritaActive ? "active" : ""}`}
            >
              Berita
            </Link>
          </li>

          {/* 3. Layanan Dropdown Menu */}
          <li
            className="nav-dropdown-item"
            style={{ position: "relative" }}
            onMouseEnter={() => setIsLayananOpen(true)}
            onMouseLeave={() => setIsLayananOpen(false)}
          >
            <button
              onClick={() => setIsLayananOpen(!isLayananOpen)}
              className={`nav-link ${isLayananActive ? "active" : ""}`}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.3rem",
                fontSize: "0.9rem",
                fontFamily: "inherit",
                fontWeight: 500,
              }}
            >
              <span>Layanan</span>
              <span style={{ fontSize: "0.7rem", transition: "transform 0.2s ease", transform: isLayananOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
            </button>

            {isLayananOpen && (
              <div className="dropdown-menu">
                <Link
                  href="/pengaduan"
                  onClick={() => { setIsLayananOpen(false); setIsMobileMenuOpen(false); }}
                  className={`dropdown-link ${pathname === "/pengaduan" ? "active" : ""}`}
                >
                  Pengaduan Warga
                </Link>

                <Link
                  href="/administrasi"
                  onClick={() => { setIsLayananOpen(false); setIsMobileMenuOpen(false); }}
                  className={`dropdown-link ${(pathname === "/administrasi" || pathname === "/layanan") ? "active" : ""}`}
                >
                  Layanan Administrasi
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
