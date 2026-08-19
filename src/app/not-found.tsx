import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(123,63,228,0.15),transparent_65%)] blur-2xl" />
      <div className="relative">
        <Image
          src="/logo-emblem.png"
          alt="KARNER"
          width={64}
          height={64}
          className="mx-auto h-16 w-16 object-contain"
        />
        <p className="mt-8 text-sm uppercase tracking-[0.35em] text-accent-light">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
          Aradığınız sayfa burada değil
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-white/60">
          Sayfa taşınmış veya adres yanlış yazılmış olabilir. Ana sayfadan
          devam edebilir ya da hizmetlerimize göz atabilirsiniz.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn btn-primary">
            Ana Sayfa
          </Link>
          <Link
            href="/#hizmetler"
            className="btn btn-secondary inline-flex items-center gap-2"
          >
            Hizmetler
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
