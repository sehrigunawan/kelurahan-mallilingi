"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Beranda" },
    { href: "/profil", label: "Profil & Visi" },
    { href: "/layanan", label: "Layanan Surat" },
    { href: "/berita", label: "Kabar Terkini" },
    { href: "/umkm", label: "Katalog UMKM" },
    { href: "/struktur", label: "Perangkat" },
    { href: "/kontak", label: "Kontak" },
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div class="top-bar">
        <div class="container">
          <div class="top-bar-info">
            <div>📍 Jl. Sungai Calendu, Kel. Mallilingi, Kec. Bantaeng (92411)</div>
            <div>📞 (0413) 21001</div>
          </div>
          <div>🕒 Jam Kerja: Senin - Jumat (08.00 - 16.00 WITA)</div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav class="navbar">
        <div class="container">
          <Link href="/" class="brand-logo">
            <div class="logo-icon">M</div>
            <div>
              <h1 class="brand-title">
                Kelurahan Mallilingi <span class="brand-sub">• Kec. Bantaeng, Kab. Bantaeng</span>
              </h1>
            </div>
          </Link>

          <ul class="nav-links">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link href={item.href} class={`nav-link ${isActive ? "active" : ""}`}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link href="/admin" class="nav-link" style={{ color: "#059669", fontWeight: 700 }}>
                🔐 Admin
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
