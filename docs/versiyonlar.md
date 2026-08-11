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
