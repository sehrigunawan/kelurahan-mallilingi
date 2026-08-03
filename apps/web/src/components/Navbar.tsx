"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Beranda" },
    { href: "/profil", label: "Profil" },
    { href: "/layanan", label: "Layanan" },
    { href: "/berita", label: "Berita" },
    { href: "/umkm", label: "UMKM" },
    { href: "/struktur", label: "Struktur" },
    { href: "/kontak", label: "Kontak" },
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-info">
            <div>📍 Jl. Sungai Calendu, Kel. Mallilingi, Kec. Bantaeng (92411)</div>
            <div>📞 (0413) 21001</div>
          </div>
          <div>🕒 Jam Pelayanan: Senin - Jumat (08.00 - 16.00 WITA)</div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="container">
          <Link href="/" className="brand-logo">
            <div className="logo-icon">M</div>
            <div>
              <h1 className="brand-title">
                Kelurahan Mallilingi <span className="brand-sub">• Kec. Bantaeng, Kab. Bantaeng</span>
              </h1>
            </div>
          </Link>

          <ul className="nav-links">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link href={item.href} className={`nav-link ${isActive ? "active" : ""}`}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link href="/admin" className="nav-link" style={{ color: "#059669", fontWeight: 700, background: "#ecfdf5", borderRadius: "6px" }}>
                🔐 Admin
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
