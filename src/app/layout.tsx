import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const dharmaGothic = localFont({
  src: "../fonts/font/DharmaGothicE-HeavyItalic.woff2",
  variable: "--font-dharma-gothic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Viktor Ahnström | Software Developer",
  description: "Portfolio of Viktor Ahnström - Software Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dharmaGothic.variable} antialiased`}>
        <SmoothScroll />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
