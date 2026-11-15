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
 * ZAMANLAMA KURALLARI (WebKit testinde bulundu): src'yi oynatmadan hemen önce
 * atamak, `#t=` başlangıç atlaması ile play() aynı anda medya katmanına
 * düşüyordu; hızlı kaydırmada sekme kilitleniyordu (iPad emülasyonunda 16
 * denemede 5-8 donma, ana iş parçacığı medya katmanında takılı). Bu yüzden:
 *   - src, kart YAKLAŞIRKEN atanır — oynatma anında değil. Atlama, kart ekrana
 *     gelmeden biter.
 *   - Oynatma, kart ekranda DWELL_MS kaldıktan sonra başlar — parmakla
 *     savrulan sayfada video hiç başlatılmaz.
 *   - Boşaltma gecikmelidir ve kart geri gelirse iptal edilir.
 */

const DWELL_MS = 300;
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
 * GÜVENLİ OYNAT / DURDUR. iPad'de yan yana iki kart aynı anda ekrana girince
 * iki video 15 ms arayla play() alıyordu; ikisi birden başlamaya çalışırken
 * (readyState 0) medya katmanı kilitlenip sekmeyi donduruyordu. Araya giren
 * pause() da aynı etkiyi yapıyordu. Kurallar:
 *   1) Videolar SIRAYLA başlar: bir video gerçekten oynamaya başlayana kadar
 *      (en çok START_GAP_MS) sıradaki bekler.
 *   2) Başlamakta olan videoya pause verilmez — istenen durum not edilir,
 *      play() sonuçlanınca uygulanır.
 *   3) Boşaltma da başlamakta olan videoyu beklemeye uyar (createTouchVideo).
 */
const START_GAP_MS = 3000;
const pendingPlay = new WeakMap<HTMLVideoElement, Promise<void>>();
const wantPlaying = new WeakMap<HTMLVideoElement, boolean>();
let startQueue: Promise<void> = Promise.resolve();

export function playVideo(v: HTMLVideoElement) {
  wantPlaying.set(v, true);
  if (pendingPlay.has(v) || !v.paused) return;
  const pr: Promise<void> = startQueue
    .then(() => {
      // Sıra gelene kadar vazgeçildiyse ya da video boşaltıldıysa başlatma.
      if (!wantPlaying.get(v) || !v.getAttribute("src")) return;
      return v.play().catch(() => {
        /* otomatik oynatma engellenebilir — poster karesi kalır */
      });
    })
    .finally(() => {
      if (pendingPlay.get(v) === pr) pendingPlay.delete(v);
      if (!wantPlaying.get(v)) v.pause();
    });
  pendingPlay.set(v, pr);
  // Takılan bir yükleme kuyruğu sonsuza dek kilitlemesin.
  startQueue = Promise.race([
    pr,
    new Promise<void>((r) => window.setTimeout(r, START_GAP_MS)),
  ]);
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
  return {
    near() {
      window.clearTimeout(release);
      ensureVideoSrc(v, src, startAt);
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
      dwell = window.setTimeout(() => {
        // Normalde src "near" ile çoktan atanmış olur; yine de güvence.
        ensureVideoSrc(v, src, startAt);
        play(v);
      }, DWELL_MS);
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
