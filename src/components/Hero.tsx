"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

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
      {/* En arkada: çapraz akan KARNER filament shader arka planı */}
      <div className="absolute inset-0 z-0">
        <KarnerLineFlow angleDeg={-22} />
      </div>

      {/* robotların arkasında yumuşak mor hâle (atmosfer) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[8]"
      >
        {/* blur filtresi yok: radial-gradient zaten yumuşak geçişli, üstüne
            blur eklemek scroll sırasında boşuna repaint maliyeti çıkarıyordu. */}
        <div className="absolute left-[14%] top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(123,63,228,0.28),transparent_70%)]" />
        <div className="absolute right-[14%] top-1/2 h-[34rem] w-[34rem] translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.26),transparent_70%)]" />
      </div>

      {/* 3B robot maskotlar — shader'ın üstünde, metnin altında (mobilde de görünür) */}
      <div className="absolute inset-0 z-[12]">
        <HeroRobots />
      </div>

      {/* Robot konuşma balonları (karşılayıcı + asistan) */}
      <HeroAssistant />

      {/* gradient karartma — metin okunurluğu için (robotların üstünde ince bir kat) */}
      <div className="pointer-events-none absolute inset-0 z-[14] bg-gradient-to-b from-background/40 via-transparent to-background" />

      {/* Üst navigasyon */}
      <nav className="absolute top-0 z-30 flex w-full items-center justify-between px-6 py-6 sm:px-10">
        <a href="#" className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="KARNER"
            width={72}
            height={72}
            className="h-16 w-16 rounded-xl object-cover shadow-lg shadow-accent/20 ring-1 ring-white/10"
            priority
          />
          <span className="text-2xl font-bold tracking-[0.25em]">KARNER</span>
        </a>
        <div className="hidden gap-8 text-sm text-white/70 sm:flex">
          {[
            { label: "Hizmetler", href: "#hizmetler" },
            { label: "İşlerimiz", href: "#isler" },
            { label: "Hakkımızda", href: "#hakkimizda" },
            { label: "İletişim", href: "#iletisim" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative px-1 transition-colors duration-300 hover:text-white"
            >
              <span className="relative z-10 transition-[text-shadow] duration-300 group-hover:[text-shadow:0_0_14px_rgba(123,63,228,0.95)]">
                {item.label}
              </span>
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-accent to-accent-2 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
      </nav>

      {/* Merkez içerik.
          Mobil: blok tüm yüksekliği kaplar, metin üstte (navigasyonun hemen
          altında), butonlar `mt-auto` ile en alta yapışır. Robotlar ortada
          kaldığı için ikisi de onlarla çakışmaz. Ortalanmış yerleşimde bu
          mümkün değildi — araya eklenen her boşluk bloğu yeniden ortalayıp
          kazanımı geri alıyordu.
          Masaüstü: eskisi gibi dikeyde ortalanmış, yer bol. */}
      <div className="relative z-20 flex w-full flex-1 flex-col items-center px-6 pb-8 pt-28 text-center sm:w-auto sm:flex-none sm:pb-0 sm:pt-0">
        {/* initial'da opacity YOK — metin sunucudan görünür gelsin. JavaScript
            çalışmasa da okunur kalır (arama motorları ve AI botları ham HTML'i
            okuyor). Giriş efekti kaydırmayla korunuyor. */}
        <motion.p
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-[11px] uppercase tracking-[0.3em] text-accent-light sm:mb-6 sm:text-sm sm:tracking-[0.4em]"
        >
Yazılım ve Medya Şirketi
        </motion.p>

        <motion.h1
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-[18rem] text-3xl font-semibold leading-[1.15] sm:max-w-4xl sm:text-7xl sm:leading-[1.05]"
        >
          Geleceği{" "}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            mühendislikle
          </span>{" "}
          inşa ediyoruz
        </motion.h1>

        <motion.p
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-5 max-w-[19rem] text-sm leading-relaxed text-white/60 sm:mt-8 sm:max-w-xl sm:text-lg"
        >
          3D, WebGL ve modern yazılım teknolojileriyle markalar için sıra dışı
          dijital deneyimler tasarlıyoruz.
        </motion.p>

        <motion.div
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          // Mobilde alta yapıştırmak yerine yüzdeyle konumlandırılıyor: robotların
          // ayakları hero yüksekliğinin ~%77.5'ine denk geliyor (kamera fov 38°,
          // z=8.2, ayak seviyesi -1.55 birim). %83 onların hemen altında kalıyor
          // ve boşluk ekran yüksekliğiyle orantılı büyüyüp küçülüyor — alta
          // yapışıkken bu mesafe uzun telefonlarda açılıyordu.
          className="absolute inset-x-0 top-[83%] flex flex-wrap items-center justify-center gap-4 sm:static sm:mt-12"
        >
          <a href="#hizmetler" className="btn btn-primary">
            Keşfet
          </a>
          <a href="#iletisim" className="btn btn-secondary">
            İletişime Geç
          </a>
        </motion.div>
      </div>

      {/* Scroll göstergesi — mobilde gizli: butonlar artık en altta duruyor,
          ikisi aynı yeri paylaşıyordu. */}
      <motion.div
        initial={{ y: 10 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 z-20 hidden flex-col items-center gap-2 text-white/60 sm:flex"
      >
        <span className="text-xs uppercase tracking-widest">Kaydır</span>
        <span className="h-10 w-px animate-pulse bg-white/40" />
      </motion.div>
    </section>
  );
}
