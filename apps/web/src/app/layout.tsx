import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Portal Resmi Kelurahan Mallilingi - Kabupaten Bantaeng",
  description: "Website Resmi Kelurahan Mallilingi, Kecamatan Bantaeng, Kabupaten Bantaeng. Informasi pelayanan administrasi publik, berita desa, potensi UMKM, dan profil wilayah."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
