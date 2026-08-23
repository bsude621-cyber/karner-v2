# Kayıtlı Versiyonlar (geri dönüş noktaları)

Bu dosya, beğenilen ara tasarımları işaretler. İstendiğinde o haline dönülebilir.

## Sim / Spiral

### `versionsim1` (git tag → commit 6a2280e)
- **Görünüm:** Belirgin / büyük sim noktaları (nokta boyutu derinliğe göre `sw * 0.65`), ~4400 yıldız.
- Renkler: beyaz ağırlıklı + az açık mor.
- KARNER yazısı: metalik mor (gölge yok).
- **Geri dönmek için:**
  ```bash
  git checkout versionsim1 -- src/components/ui/spiral-animation.tsx
  # veya tüm overlay dahil:
  git checkout versionsim1 -- src/components/ui/spiral-animation.tsx src/components/LocationOverlay.tsx
  ```

### Şu anki hal (varsayılan)
- Minik yıldız noktaları (boyut sabit 0.5px, orijinal spiral gibi), 5000 yıldız → gerçek galaksi hissi.

## Tema konseptleri

### `konsept/cizgisel-mod` (git tag → commit 372500c)
- **Görünüm:** Aydınlık modun "Mühendis Kâğıdı" hâli — teknik çizim dili.
  Krem kâğıt zemin (`#f6f3ee`), mürekkep menekşe çizgi (`#1a1430`), köşe kesim
  işaretleri, ölçü çizgileri, çizim anteti, sağ kenar cetveli, §01 bölüm
  numaraları, duotone→renk kart hover, robotun teknik tel-kafes çizimi.
- **Neden ayrıldı:** Aydınlık ve karanlık iki ayrı konsepttik (çizgi vs. galaksi);
  aynı sitede iki tasarım dili profesyonel durmuyordu.
- **Arşiv:** `concepts/cizgisel-mod/` — bileşenler, ayıklanmış CSS ve kurulum
  rehberi. Başka bir projede yeniden kullanmak için oradaki README yeterli.
- **Siteyi o hâliyle görmek için:**
  ```bash
  git checkout konsept/cizgisel-mod
  ```

### Şu anki hâl (varsayılan)
- Tek konsept: galaksi. Aydınlık mod, karanlık modun **açık uzay grisi renk
  ikizi** — yapı, bileşen ve efektler birebir aynı, yalnızca palet değişir.
- Aydınlık palet: zemin `#e9ebef`, mürekkep `#14161c`, galaksi parçacıkları
  soğuk gri (`#5b6270`–`#99a2b1`). KARNER moru (`#7b3fe4`) iki modda da aynı.
- Footer iki modda da koyu levha (içeriği `text-paper` ile yazılı).
