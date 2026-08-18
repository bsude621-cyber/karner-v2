import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import {
  ORG_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  organizationJsonLd,
  webSiteJsonLd,
} from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Logo'yla uyumlu geometrik başlık fontu (spiral KARNER yazısı için)
const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KARNER — Yazılım ve Medya Ajansı | 3D Web, Mobil, AI Video",
    template: `%s | ${SITE_NAME}`,
  },
  description: ORG_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "tr_TR",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
};

// Organization + WebSite düğümleri @id ile birbirine bağlı tek graph —
// sayfa bazlı schema'lar (Service, AboutPage...) bu @id'lere referans verir.
const rootJsonLd = {
  "@context": "https://schema.org",
  "@graph": [organizationJsonLd(), webSiteJsonLd()],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable}`}
    >
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
