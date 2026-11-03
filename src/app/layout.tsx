import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#0B0E0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vibesite.in"),
  title: {
    default: "vibesite — Bespoke Web Studio & Digital Architecture",
    template: "%s | vibesite studio",
  },
  description:
    "vibesite cultivates bespoke websites that feel alive. Fast-launch architectures, high-conversion online stores, and bespoke web apps with zero bloated templates.",
  keywords: [
    "vibesite",
    "vibesite studio",
    "bespoke web design",
    "creative web development",
    "3d webgl websites",
    "shopify commerce experts",
    "luxury web agency",
    "delhi web studio",
    "high conversion web design",
  ],
  authors: [{ name: "vibesite studio", url: "https://vibesite.in" }],
  creator: "vibesite studio",
  publisher: "vibesite studio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vibesite.in",
    siteName: "vibesite studio",
    title: "vibesite — Bespoke Web Studio & Digital Architecture",
    description:
      "We cultivate websites that feel alive. High-craft editorial design, living 3D GLSL physics, and obsessive human attention to every conversion touchpoint.",
  },
  twitter: {
    card: "summary_large_image",
    title: "vibesite — Bespoke Web Studio",
    description:
      "Bespoke websites that feel alive. Zero templates. Living 3D GLSL physics and rapid 7–10 day turnaround.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
