import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Portal Resmi Kelurahan Mallilingi - Kabupaten Bantaeng",
  description: "Website Resmi Kelurahan Mallilingi, Kecamatan Bantaeng, Kabupaten Bantaeng. Informasi pelayanan administrasi publik, berita desa, dan profil wilayah."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
