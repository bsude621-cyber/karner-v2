// IndexNow submit — deploy SONRASI çalıştır: npm run indexnow
// Bing + Yandex + Naver anında indeksler; ChatGPT Search Bing'den beslenir.
// HOST'u NEXT_PUBLIC_SITE_URL'den alır; domain bağlanmadan (vercel.app) çalıştırma.
const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/\/+$/, "");
if (!SITE || SITE.includes("vercel.app") || SITE.includes("karner.example")) {
  console.error("NEXT_PUBLIC_SITE_URL gerçek domain olmalı (örn. https://karneryazilim.com). Çıkılıyor.");
  process.exit(1);
}
const HOST = new URL(SITE).host;
const KEY = "5dcc3769d9a5e8af3e3a869997a6599d";
const paths = [
  "/", "/hizmetler", "/hakkimizda",
  "/3d-web-sitesi", "/yapay-zeka-reklam-videosu", "/yapay-zeka-aramasinda-gorunmek",
  "/hizmetler/web-sitesi-gelistirme", "/hizmetler/mobil-uygulama", "/hizmetler/ai-video-reklam",
  "/hizmetler/ai-urun-gorseli", "/hizmetler/seo-geo-aeo", "/hizmetler/otomasyon-sistemleri",
  "/hizmetler/marka-grafik-tasarim", "/llms.txt", "/llms-full.txt",
];
const urlList = paths.map((p) => SITE + p);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: SITE + "/" + KEY + ".txt", urlList }),
});
console.log("IndexNow: HTTP " + res.status + " " + (res.status === 200 || res.status === 202 ? "✓ kabul edildi" : "✗ kontrol et"));
console.log(urlList.join("\n"));
