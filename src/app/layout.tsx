import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SiteBackground from "@/components/SiteBackground";
import CustomCursor from "@/components/CustomCursor";
import DeferredMount from "@/components/DeferredMount";
import SiteNav from "@/components/SiteNav";
import { Analytics } from "@vercel/analytics/next";
import {
  ORG_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  organizationJsonLd,
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9ebef" },
    { media: "(prefers-color-scheme: dark)", color: "#05060a" },
  ],
};

/** Tema ilk boyamadan önce: localStorage tercihi yoksa sistem (telefon/PC) moduna uyar. */
const THEME_SCRIPT =
  "(function(){try{var k='karner-theme',s=localStorage.getItem(k),m=window.matchMedia('(prefers-color-scheme: light)'),t=(s==='light'||s==='dark')?s:(m.matches?'light':'dark');document.documentElement.dataset.theme=t;if(m.addEventListener){m.addEventListener('change',function(e){if(!localStorage.getItem(k)){document.documentElement.dataset.theme=e.matches?'light':'dark';}});}}catch(e){}})();";

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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable}`}
    >
      <body className="min-h-screen antialiased">
        {/* Tema — ilk boyamadan önce çalışır (FOUC yok) */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
        {/* Site geneli sabit yıldız alanı — tüm sayfa bunun üzerinde kayar */}
        <SiteBackground />
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
