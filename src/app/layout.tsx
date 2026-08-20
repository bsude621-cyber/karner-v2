import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import DeferredMount from "@/components/DeferredMount";
import SiteNav from "@/components/SiteNav";
import { Analytics } from "@vercel/analytics/next";
import {
  ORG_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  organizationJsonLd,
  peopleJsonLd,
  webSiteJsonLd,
} from "@/lib/site";

// display: "optional" — font ilk ~100ms'de gelmezse o görüntülemede fallback
// kalır; geç swap büyük başlığı yeniden boyatıp LCP'yi geciktiriyordu.
// Fontlar preload'lu olduğu için normal bağlantıda fark hissedilmez.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
});

// Logo'yla uyumlu geometrik başlık fontu (spiral KARNER yazısı için)
const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "optional",
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
  "@graph": [organizationJsonLd(), webSiteJsonLd(), ...peopleJsonLd()],
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
        {/* Saf süsleme — kritik yol dışında, idle/etkileşim sonrası gelir */}
        <DeferredMount>
          <CustomCursor />
        </DeferredMount>
        <SiteNav />
        <SmoothScroll>{children}</SmoothScroll>
        {/* Vercel Web Analytics — çerezsiz, anonim sayfa görüntüleme (gizlilik metninde beyan edildi) */}
        <Analytics />
      </body>
    </html>
  );
}
