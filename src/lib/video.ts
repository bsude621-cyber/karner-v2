/**
 * Kart videolarının bellek yönetimi (Demo sitelerimiz + Anamorfik videolarımız).
 *
 * SORUN: Bir <video>'ya src bir kez atanınca tarayıcı çözücüyü ve tamponlanan
 * kareleri, öğe sayfada kaldığı sürece tutar. pause() bunları bırakmaz. Ana
 * sayfada kaydırdıkça 8 video (1600×900 VP9 + 1280×720 H.264) birikiyordu.
 * Üstüne üç WebGL sahnesi de eklenince iOS Safari sekme bellek tavanını
 * aşıyor ve sayfayı öldürüyordu ("Bu web sayfasında bir sorun oluştu").
 *
 * ÇÖZÜM: Dokunmatik cihazda kart ekrandan çıkınca video tamamen boşaltılır:
 * src kaldırılır, ardından load() çağrılır (çözücüyü bırakan resmi yol budur).
 * Poster görseli kalır, yani kart yine aynı görünür. Kart geri gelince src
 * yeniden atanır. Böylece bellekte aynı anda en fazla bir video olur.
 */

/** Hover'ı olmayan (dokunmatik) cihaz mı? Videoları boşaltma kararı buna bağlı. */
export const isTouchOnly = () => !window.matchMedia("(hover: hover)").matches;

/** src yoksa atar. `#t=` ile video doğrudan kapak karesinden başlar. */
export function ensureVideoSrc(v: HTMLVideoElement, src: string, startAt: number) {
  if (!v.getAttribute("src")) v.setAttribute("src", `${src}#t=${startAt}`);
}

/** Videoyu durdurur ve çözücü/tampon belleğini tarayıcıya geri verir. */
export function unloadVideo(v: HTMLVideoElement) {
  if (!v.getAttribute("src")) return;
  v.pause();
  v.removeAttribute("src");
  try {
    v.load();
  } catch {
    /* bazı eski motorlar src'siz load()'da hata fırlatabilir; zararsız */
  }
}
