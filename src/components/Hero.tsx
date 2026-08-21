"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import DeferredMount from "@/components/DeferredMount";

// Shader sadece tarayıcıda yüklensin (SSR kapalı)
const KarnerLineFlow = dynamic(
  () =>
    import("@/components/ui/karner-line-flow").then((m) => ({
      default: m.KarnerLineFlow,
    })),
  { ssr: false }
);

// 3B robot maskotlar (yalnızca tarayıcıda, SSR kapalı)
const HeroRobots = dynamic(() => import("@/components/three/HeroRobots"), {
  ssr: false,
});

// Robot konuşma balonları + asistan (yalnızca tarayıcıda)
const HeroAssistant = dynamic(() => import("@/components/HeroAssistant"), {
  ssr: false,
});

export default function Hero() {
  // min-h-dvh (100vh değil): mobil tarayıcılarda 100vh, alt/üst çubukların
  // arkasında kalan alanı da sayar. Butonlar en alta yapıştığı için 100vh ile
  // Safari'nin çubuğunun altında kalıp görünmez oluyorlardı.
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background">
      {/* En arkada: çapraz akan KARNER filament shader arka planı.
          DeferredMount: shader + robotlar kritik render yolundan çıkarıldı —
          metin ve gradient anında boyanır (LCP), sahneler ardından gelir. */}
      <div className="absolute inset-0 z-0">
        <DeferredMount>
          <KarnerLineFlow angleDeg={-22} />
        </DeferredMount>
      </div>

      {/* robotların arkasında yumuşak mor hâle (atmosfer) */}
      <div
        aria-hidden
        className="hero-halo pointer-events-none absolute inset-0 z-[8]"
      >
        {/* blur filtresi yok: radial-gradient zaten yumuşak geçişli, üstüne
            blur eklemek scroll sırasında boşuna repaint maliyeti çıkarıyordu. */}
        <div className="absolute left-[14%] top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(123,63,228,0.28),transparent_70%)]" />
        <div className="absolute right-[14%] top-1/2 h-[34rem] w-[34rem] translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.26),transparent_70%)]" />
      </div>

      {/* 3B robot maskotlar — shader'ın üstünde, metnin altında (mobilde de görünür) */}
      <div className="absolute inset-0 z-[12]">
        <DeferredMount>
          <HeroRobots />
        </DeferredMount>
      </div>

      {/* Robot konuşma balonları (karşılayıcı + asistan) */}
      <DeferredMount>
        <HeroAssistant />
      </DeferredMount>

      {/* gradient karartma — metin okunurluğu için (robotların üstünde ince bir kat) */}
      <div className="pointer-events-none absolute inset-0 z-[14] bg-gradient-to-b from-background/40 via-transparent to-background" />

      {/* Üst navigasyon: site geneli sabit SiteNav (layout) */}

      {/* Merkez içerik.
          Mobil: blok tüm yüksekliği kaplar, metin üstte (navigasyonun hemen
          altında), butonlar `mt-auto` ile en alta yapışır. Robotlar ortada
          kaldığı için ikisi de onlarla çakışmaz. Ortalanmış yerleşimde bu
          mümkün değildi — araya eklenen her boşluk bloğu yeniden ortalayıp
          kazanımı geri alıyordu.
          Masaüstü: eskisi gibi dikeyde ortalanmış, yer bol. */}
      <div className="relative z-20 flex w-full flex-1 flex-col items-center px-6 pb-8 pt-24 text-center sm:w-auto sm:flex-none sm:pb-0 sm:pt-0">
        {/* initial'da opacity YOK — metin sunucudan görünür gelsin. JavaScript
            çalışmasa da okunur kalır (arama motorları ve AI botları ham HTML'i
            okuyor). Giriş efekti kaydırmayla korunuyor. */}
        {/* Girişler saf CSS (.rise-in): framer-motion'a bağlı olsaydı boyama
            hydration'ı beklerdi — LCP bu yüzden 6 sn'ye sarkıyordu. */}
        <p className="rise-in rise-in-1 mb-4 text-[11px] uppercase tracking-[0.3em] text-accent-light sm:mb-6 sm:text-sm sm:tracking-[0.4em]">
          Yazılım ve Medya Ajansı
        </p>

        <h1 className="rise-in rise-in-2 max-w-[18rem] text-3xl font-semibold leading-[1.15] sm:max-w-4xl sm:text-7xl sm:leading-[1.05]">
          Geleceği{" "}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            mühendislikle
          </span>{" "}
          inşa ediyoruz
          <span className="mt-3 block text-sm font-normal leading-snug tracking-normal text-white/65 sm:mt-5 sm:text-xl">
            Türkiye genelinde yazılım ve medya ajansı
          </span>
        </h1>

        {/* Mobilde kısa sürüm: uzun paragraf robotların kafasına iniyordu. */}
        <p className="rise-in rise-in-3 mt-4 max-w-[19rem] text-sm leading-relaxed text-white/60 sm:hidden">
          Web, mobil, yapay zekâ içerik, arama görünürlüğü ve otomasyon —
          işletmenizin dijital tarafını tek ekip kurar.
        </p>
        <p className="rise-in rise-in-3 mt-8 hidden max-w-xl text-lg leading-relaxed text-white/60 sm:block">
          Web sitesi ve mobil uygulamadan yapay zekâ video ve görsele, arama
          görünürlüğünden otomasyon, marka ve sosyal medya içeriğine — işletmenizin
          dijital tarafını tek ekip, uçtan uca kurar.
        </p>

        {/* Mobil: butonlar robotların ayağının 26 px altında. Robot kafası 392 px'te,
            boyu clamp(140px, 100dvh − 541px, 230px) (HeroRobots.tsx ile aynı formül) →
            ayak = 392 + boy, buton = ayak + 26 = 418 + boy. */}
        <div className="rise-in rise-in-4 absolute inset-x-0 top-[calc(418px_+_clamp(140px,100dvh_-_541px,230px))] flex flex-wrap items-center justify-center gap-4 sm:static sm:mt-12">
          <a href="#hizmetler" className="btn btn-primary">
            Keşfet
          </a>
          <a href="#iletisim" className="btn btn-secondary">
            İletişime Geç
          </a>
        </div>
      </div>

      {/* Scroll göstergesi — mobilde gizli: butonlar artık en altta duruyor,
          ikisi aynı yeri paylaşıyordu. */}
      <div className="rise-in rise-in-4 absolute bottom-8 z-20 hidden flex-col items-center gap-2 text-white/60 sm:flex">
        <span className="text-xs uppercase tracking-widest">Kaydır</span>
        <span className="h-10 w-px animate-pulse bg-white/40" />
      </div>
    </section>
  );
}
