// IndexNow submit — deploy SONRASI çalıştır: npm run indexnow
// Bing + Yandex + Naver anında indeksler; ChatGPT Search Bing'den beslenir.
// HOST'u NEXT_PUBLIC_SITE_URL'den alır; domain bağlanmadan (vercel.app) çalıştırma.
//
// URL listesi YAYINDAKİ sitemap.xml'den okunur, elle tutulmaz. Önceden 13 yol
// bu dosyada sabitti ve site büyüdükçe geride kaldı: rehber, sektör ve iş
// sayfaları hiç bildirilmiyordu. Sitemap tek doğruluk kaynağı olduğu için
// yeni sayfa eklendiğinde burası kendiliğinden kapsar.
const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://karneryazilim.com").trim().replace(/\/+$/, "");
if (!SITE || SITE.includes("vercel.app") || SITE.includes("karner.example")) {
  console.error("NEXT_PUBLIC_SITE_URL gerçek domain olmalı (örn. https://karneryazilim.com). Çıkılıyor.");
  process.exit(1);
}
const HOST = new URL(SITE).host;
const KEY = "5dcc3769d9a5e8af3e3a869997a6599d";

// Sitemap'te yer almayan ama AI motorlarının okuduğu metin kaynakları.
const EXTRA_PATHS = ["/llms.txt", "/llms-full.txt"];

const sitemapUrl = `${SITE}/sitemap.xml`;
const sitemapRes = await fetch(sitemapUrl, { headers: { Accept: "application/xml" } });
if (!sitemapRes.ok) {
  console.error(`Sitemap okunamadı: ${sitemapUrl} → HTTP ${sitemapRes.status}. Dağıtım tamamlandı mı?`);
  process.exit(1);
}
const xml = await sitemapRes.text();

// <loc>…</loc> — sitemap'in tek adres alanı; ayrı XML bağımlılığına gerek yok.
const fromSitemap = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) =>
  // &amp; gibi XML kaçışları adresi bozmasın
  m[1].replace(/&amp;/g, "&"),
);
if (fromSitemap.length === 0) {
  console.error("Sitemap'te hiç <loc> bulunamadı; gönderim yapılmadı.");
  process.exit(1);
}

// Sitemap başka bir domaine işaret ediyorsa (önizleme dağıtımı) IndexNow reddeder.
const foreign = fromSitemap.filter((u) => new URL(u).host !== HOST);
if (foreign.length) {
  console.error(`Sitemap ${HOST} dışına işaret ediyor (örn. ${foreign[0]}). Çıkılıyor.`);
  process.exit(1);
}

const urlList = [...new Set([...fromSitemap, ...EXTRA_PATHS.map((p) => SITE + p)])];

// IndexNow tek istekte en fazla 10.000 adres kabul eder; bu site için tek parti yeterli.
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: SITE + "/" + KEY + ".txt", urlList }),
});
const ok = res.status === 200 || res.status === 202;
console.log(`IndexNow: HTTP ${res.status} ${ok ? "✓ kabul edildi" : "✗ kontrol et"} — ${urlList.length} adres (sitemap: ${fromSitemap.length})`);
console.log(urlList.join("\n"));
if (!ok) process.exit(1);
