import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import Navbar from "@/components/navbar";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
});

export const metadata: Metadata = {
  title: "Klok - Sustainable Furniture",
  description: "Furniture shapes how people live every day. Klok explores how furniture can be created responsibly without exhausting natural resources, transforming reclaimed and recycled wood into functional pieces that support everyday comfort at home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
