import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "vibesite — Bespoke Digital Studio & Web Craft",
  description:
    "vibesite crafts bespoke launch websites, high-conversion online stores, and custom web applications engineered to elevate ambitious brands.",
  keywords: [
    "vibesite",
    "web design studio",
    "custom websites",
    "shopify commerce",
    "creative web development",
    "luxury web design",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0B0E0B] text-[#F2EFE9] overflow-x-hidden selection:bg-[#C87D55]/30 selection:text-[#F2EFE9]">
        {children}
      </body>
    </html>
  );
}
