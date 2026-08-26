/**
 * iOS'ta kaydırırken tuvallerin boşuna yeniden ayrılmasını engeller.
 *
 * SORUN
 * iPhone'da sayfayı kaydırdıkça Safari'nin üst URL çubuğu küçülüp büyüyor.
 * Görüntü alanının yüksekliği bu yüzden sürekli 60-120 piksel oynuyor ve her
 * oynamada `resize` / ResizeObserver tetikleniyor.
 *
 * Sitedeki dört tuvalin her biri bu olayda çizim tamponunu YENİDEN AYIRIYOR:
 * hero shader'ı, robot sahnesi (780×1328 ≈ 4 MB), yıldız alanı ve nokta
 * yüzeyi. Yani kullanıcı sayfayı bir aşağı bir yukarı kaydırdıkça saniyede
 * birkaç kez megabaytlarca GPU tamponu ayrılıp bırakılıyor. iOS Safari'nin
 * sekme başına bellek tavanı katı; bu tempo bir süre sonra sekmenin
 * öldürülmesine ("bu sayfada birçok kez sorun oluştu") kadar gidiyor.
 *
 * Belirtinin "bir süre sonra" ortaya çıkması bu yüzden: tek seferlik bir
 * patlama değil, gezindikçe biriken bir yük.
 *
 * ÇÖZÜM — iki katman:
 *  1. Gecikme (debounce): kaydırma sırasındaki olay seli tek bir çağrıya iner.
 *  2. Dokunmatik cihazda yalnızca GENİŞLİK değişimi ciddiye alınır. Yükseklikteki
 *     URL-çubuğu boyundaki oynamalar yok sayılır. Ekranı döndürmek genişliği
 *     değiştirdiği için o yakalanmaya devam eder.
 *
 * Masaüstünde ikinci kural uygulanmaz: orada pencereyi dikeyde büyütmek gerçek
 * bir yeniden boyutlandırmadır ve karşılanmalıdır.
 */

export type Size = { width: number; height: number };

export type StableResize = {
  /** Ham resize/ResizeObserver olayını buraya bağlayın. */
  notify: () => void;
  /** Bekleyen gecikmeli çağrıyı iptal eder (temizlikte çağırın). */
  dispose: () => void;
};

export function createStableResize(
  measure: () => Size,
  run: () => void,
  {
    delayMs = 180,
    /** Bu kadarlık yükseklik oynaması URL çubuğu sayılır (iOS'ta ~60-120 px). */
    heightTolerancePx = 140,
  } = {},
): StableResize {
  const coarse =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  let last = measure();
  let timer = 0;

  const notify = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      const next = measure();
      // Ölçüm henüz oturmamış (gizli/boş kapsayıcı) — dokunma.
      if (next.width === 0 || next.height === 0) return;

      if (
        coarse &&
        next.width === last.width &&
        Math.abs(next.height - last.height) <= heightTolerancePx
      ) {
        // Yalnızca URL çubuğu kıpırdadı. Tuval CSS ile zaten esniyor;
        // tamponu yeniden ayırmanın görsel bir karşılığı yok.
        return;
      }

      last = next;
      run();
    }, delayMs);
  };

  return {
    notify,
    dispose: () => window.clearTimeout(timer),
  };
}
