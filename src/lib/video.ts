/**
 * Kart videolarının bellek yönetimi (Demo sitelerimiz + Anamorfik videolarımız).
 *
 * SORUN: Bir <video>'ya src bir kez atanınca tarayıcı çözücüyü ve tamponlanan
 * kareleri, öğe sayfada kaldığı sürece tutar. pause() bunları bırakmaz. Ana
 * sayfada kaydırdıkça 8 video (1600×900 VP9 + 1280×720 H.264) birikiyordu.
 * Üstüne üç WebGL sahnesi de eklenince iOS Safari sekme bellek tavanını
 * aşıyor ve sayfayı öldürüyordu ("Bu web sayfasında bir sorun oluştu").
 *
 * ÇÖZÜM (yalnızca dokunmatik cihazlar): Video, kart ekrana 400 px yaklaşınca
 * yüklenir; kart bu bölgeden çıkınca RELEASE_MS sonra tamamen boşaltılır (src
 * kaldırılır + load(), çözücüyü bırakan resmi yol budur). Poster kalır, kart
 * aynı görünür. Böylece bellekte yalnızca ekrana yakın 2-3 kartın videosu olur.
 *
 * ZAMANLAMA KURALLARI (WebKit testinde bulundu): Hızlı kaydırmada video,
 * src atandıktan ~0,3 sn sonra play() alıyordu; video daha `#t=` başlangıç
 * karesini yüklerken gelen play(), WebKit'in medya katmanını kilitleyip
 * sekmeyi donduruyordu (iPad emülasyonunda 16 denemede 5-9 donma; ana iş
 * parçacığı medya katmanında takılı). Eski kod videoyu src'den ~1,3 sn sonra
 * başlatıyordu ve hiç donmadı. Bu yüzden dokunmatikte:
 *   - src, kart YAKLAŞIRKEN (400 px) atanır.
 *   - Oynatma için kart ekranda DWELL_MS kalmalı VE src en az SETTLE_MS önce
 *     atanmış olmalı. Parmakla savrulan sayfada video hiç başlatılmaz.
 *   - Boşaltma gecikmelidir (RELEASE_MS), kart geri gelirse iptal edilir,
 *     başlamakta olan videoyu beklemeye uyar.
 */

const DWELL_MS = 700;
const SETTLE_MS = 1200;
const RELEASE_MS = 2000;
/** Kartın "yakın" sayıldığı mesafe: video bu bölgede yüklü durur. */
export const NEAR_MARGIN = "400px";

/** Hover'ı olmayan (dokunmatik) cihaz mı? Videoları boşaltma kararı buna bağlı. */
export const isTouchOnly = () => !window.matchMedia("(hover: hover)").matches;

/** src yoksa atar. `#t=` ile video doğrudan kapak karesinden başlar. */
export function ensureVideoSrc(v: HTMLVideoElement, src: string, startAt: number) {
  if (!v.getAttribute("src")) v.setAttribute("src", `${src}#t=${startAt}`);
}

/*
 * GÜVENLİ DURDUR. Başlamakta olan videoya (play() henüz sonuçlanmamış) pause
 * verilmez — istenen durum not edilir, play() sonuçlanınca uygulanır.
 * Boşaltma da başlamakta olan videoyu bekler (createTouchVideo).
 */
const pendingPlay = new WeakMap<HTMLVideoElement, Promise<void>>();
const wantPlaying = new WeakMap<HTMLVideoElement, boolean>();

export function playVideo(v: HTMLVideoElement) {
  wantPlaying.set(v, true);
  if (pendingPlay.has(v) || !v.paused) return;
  const pr: Promise<void> = v
    .play()
    .catch(() => {
      /* otomatik oynatma engellenebilir — poster karesi kalır */
    })
    .finally(() => {
      if (pendingPlay.get(v) === pr) pendingPlay.delete(v);
      if (!wantPlaying.get(v)) v.pause();
    });
  pendingPlay.set(v, pr);
}

/** Durdurur; play() hâlâ sürüyorsa durdurmayı onun sonuna bırakır. */
export function pauseVideo(v: HTMLVideoElement) {
  wantPlaying.set(v, false);
  if (!pendingPlay.has(v)) v.pause();
}

/** play() sonuçlanmamış (video henüz başlamaya çalışıyor) mu? */
export const isStarting = (v: HTMLVideoElement) => pendingPlay.has(v);

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

/**
 * Dokunmatik kart videosu. İki gözlemciden beslenir:
 *   near/far  → kart 400 px bölgesine girdi/çıktı (yükle / gecikmeli boşalt)
 *   show/hide → kart ekranın ortasında / değil (bekleyip oynat / durdur)
 */
export function createTouchVideo(
  v: HTMLVideoElement,
  src: string,
  startAt: number,
  play: (v: HTMLVideoElement) => void,
  stop: (v: HTMLVideoElement) => void,
) {
  let dwell: number | undefined;
  let release: number | undefined;
  let srcAt = 0;
  const load = () => {
    if (!v.getAttribute("src")) {
      ensureVideoSrc(v, src, startAt);
      srcAt = performance.now();
    }
  };
  return {
    near() {
      window.clearTimeout(release);
      load();
    },
    far() {
      window.clearTimeout(release);
      // Başlamakta olan videoyu sökme: play() sonuçlanana kadar ertele.
      const tryUnload = () => {
        if (isStarting(v)) release = window.setTimeout(tryUnload, 500);
        else unloadVideo(v);
      };
      release = window.setTimeout(tryUnload, RELEASE_MS);
    },
    show() {
      window.clearTimeout(dwell);
      // Normalde src "near" ile çoktan atanmış olur; yine de güvence.
      load();
      const wait = Math.max(DWELL_MS, srcAt + SETTLE_MS - performance.now());
      dwell = window.setTimeout(() => play(v), wait);
    },
    hide() {
      window.clearTimeout(dwell);
      stop(v);
    },
    dispose() {
      window.clearTimeout(dwell);
      window.clearTimeout(release);
    },
  };
}
