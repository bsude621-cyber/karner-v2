# Çizgisel Mod — "Mühendis Kâğıdı"

KARNER sitesinin 2026-08 aydınlık modunda kullanılan **teknik çizim konsepti**.
Siteden kaldırıldı (aydınlık mod artık karanlık modun renk ikizi), burada
yeniden kullanılmak üzere bütün hâlinde duruyor.

**Dondurulmuş hâli:** `git checkout konsept/cizgisel-mod` (commit `372500c`)
— o etikette konsept sitede canlı ve çalışır durumda.

---

## Konsept nedir

Sayfa bir ekran değil, **çizim masasındaki bir pafta** gibi davranır. Her öğe
teknik resim dilinden gelir: kâğıt dokusu, mürekkep çizgi, ölçülendirme,
kesim işaretleri, antet, cetvel. İki renk, bir kural — krem kâğıt ve mürekkep
menekşe. Parlak mor yalnızca robotların kendi rengidir, arayüzde kullanılmaz.

Klişe "AI degrade" yok: zemin **düz**, gölgeler mürekkep, parıltı yok.

## Palet

| Rol | HEX | Not |
|---|---|---|
| Kâğıt (zemin) | `#f6f3ee` | Sıcak kırık beyaz, düz — degrade yok |
| Mürekkep (metin + çizgi) | `#1a1430` | Koyu menekşe; `--foreground` ve `--ink` |
| Mürekkep vurgu | `#3b1f7a` | `--accent` — butonlar, altı çizili kelimeler |
| Mürekkep koyu | `#22143f` | `--accent-2` — gradyan/gölge |
| Mürekkep açık | `#47178e` | `--accent-light` |
| Gümüş | `#6b6578` | İkincil metin |
| Kart | `#ffffff` / `#fbfaf7` | `--card-top` / `--card-bottom` |

Mürekkep şeffaflıkları çizgi ağırlığını belirler:
`0.55` kesim işareti · `0.45` antet çerçevesi · `0.35` ayraç ·
`0.28` ikincil çizgi · `0.12–0.18` ızgara ve kenarlık.

## Parçalar

| Parça | Dosya | Ne yapar |
|---|---|---|
| Kâğıt dokusu | `cizgisel-mod.css` → `body::before` | SVG turbulence grain, `mix-blend-mode: multiply`, opaklık `.05`. Kâğıt hissi. |
| Mühendis ızgarası | `cizgisel-mod.css` → `.hero-root` | 32px ince + 160px ana çizgi, kenarlara doğru erir. `grid-in` ile yumuşak doğar. |
| Kesim işaretleri + ölçü çizgileri + antet | `components/HeroDrafting.tsx` | Sunucu bileşeni, JS yok. Çizgiler `stroke-dashoffset` ile kendini çizer. |
| Kenar cetveli | `components/ScrollRuler.tsx` | Sağ kenarda tik işaretleri, bölüm etiketleri, kaydırmayla inen mürekkep imleç. Etikete tıklayınca bölüme gider. |
| Robot teknik çizimi | `three/AboutWireframe.tsx` | R3F tel kafes + ölçülendirme + numaralı açıklama etiketleri. |
| Mürekkep altı çizgisi | `cizgisel-mod.css` → `ink-underline` | Vurgu kelimelerin altına kalemle çekilmiş, 1.2° eğik çizgi. Hero'da yüklenince, başlıklarda kaydırmayla. |
| Cetvel ayraç | `cizgisel-mod.css` → `.section-divider` | Bölüm araları tik işaretli cetvel; ortada 45° kare nokta. |
| §01 bölüm numaraları | `cizgisel-mod.css` → `main section[id]` | CSS `counter` ile otomatik; eyebrow'un önüne `§ 01 ·`. |
| Duotone→renk hover | `cizgisel-mod.css` → `#hizmetler … img` | Kart görselleri mürekkep duotone; hover'da gerçek renge döner ("çizimden gerçeğe"). |
| Numaralı SSS | `cizgisel-mod.css` → `#sss` | `counter` ile `01.`, `02.`; açık soruda sol mürekkep şerit. |
| Mürekkep dolgu buton | `cizgisel-mod.css` → `.btn-secondary` | Hover'da alttan mürekkep dolar. |
| Pafta kartı | `cizgisel-mod.css` → `.about-sheet` | Beyaz kart + ince çerçeve + iki köşede asimetrik kesim işareti. |

### Bağımlı sınıf adları

CSS bu sınıfların TSX tarafında var olmasını bekler:
`.hero-root` `.hero-fade` `.hero-halo` `.section-divider` `.about-root`
`.about-sheet` `.about-grid` `.about-draw` `.about-dims` `.about-dim-line`
`.about-call` `.about-num` `.about-title` `.about-sub` `.about-dot`
`.about-spec` `.about-tag` `.about-l1…l4` `.draft-line` `.draft-block`
`.draft-row` `.drafting` `.scroll-ruler-*` `.brand-band` `.accent-tile`
`.accent-cta` `.night-section` `.tint-section` `.logo-emblem`
`.showreel-frame` `.showreel-perf`

Ayrıca `@theme inline` içinde `--color-white: var(--ink)` eşlemesi gerekir —
konsept, Tailwind'in `text-white`/`bg-white/…` yardımcılarını tema mürekkebine
çevirmek üzerine kurulu.

## Yeni bir projede nasıl kurulur

1. `cizgisel-mod.css` içeriğini `globals.css`'e yapıştır (Tailwind `@import`'undan sonra).
2. `@theme inline` bloğuna `--color-white: var(--ink);` ekle — yoksa mürekkep
   eşlemesi çalışmaz, her şey bembeyaz kalır.
3. `components/HeroDrafting.tsx` → hero'nun içine, `z-[15]`, robotların üstünde.
4. `components/ScrollRuler.tsx` → layout'a, `DeferredMount` içinde.
5. `three/AboutWireframe.tsx` → Hakkımızda bölümüne (`@react-three/fiber` + `three` gerekir).
6. Tema seçicisi `html[data-theme="light"]`. Farklıysa dosyada topluca değiştir.
7. Parçacık/shader bileşenlerin varsa mürekkep paletine çevir:
   `["#3b1f7a", "#47178e", "#22143f", "#5b3aa8", "#2e1566"]`

## Mobil notu

Konsept masaüstünde tam, mobilde diyetli çalışır — `cizgisel-mod.css` sonundaki
`@media (pointer: coarse)` bloğu grain'i, `backdrop-filter`'ı ve görsel
filtrelerini kapatır. Bunu silme: dahili GPU'lu cihazlarda kare düşmesinin
sebebi tam olarak bu katmanlardı.

## Neden kaldırıldı

Aydınlık ve karanlık mod iki ayrı konsepttir — biri teknik çizim, diğeri
galaksi. Aynı sitede iki dil profesyonel durmuyordu. Karar: karanlık moddaki
galaksi konsepti tek dil olarak kaldı, aydınlık mod onun açık uzay grisi renk
ikizi hâline getirildi. Çizgisel mod kendi başına güçlü olduğu için silinmedi,
buraya alındı.
