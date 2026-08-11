# KARNER — Marka Kimliği

**Şirket adı:** KARNER
**Slogan / alt başlık:** Yazılım ve Medya Şirketi

## Renk Paleti

| Renk | HEX | Kullanım |
|------|-----|----------|
| Açık Gümüş | `#A6A9AD` | İkincil metin, kenarlıklar, ikonlar |
| Koyu Gri | `#5C5F66` | Pasif metin, ayraçlar |
| Parlak Mor | `#7B3FE4` | Ana vurgu (accent), butonlar, linkler |
| Derin Mor | `#4B1D96` | İkincil vurgu, gradyan geçişleri, gölgeler |

### Önerilen koyu zemin
- Arka plan: `#05060a` (logodaki lacivert tona yakın koyu zemin)
- Ön plan / metin: `#f2f3f7`

## Tipografi
- Başlıklar: Geist Sans (semibold)
- Gövde: Geist Sans
- Mono: Geist Mono

## Logo
- Dosya: `public/logo.png`
- Stil: Gümüş + mor metalik "KN" monogram, daire içinde; altında "KARNER" yazısı.
- Koyu zeminlerde kullanılır.

## CSS değişkenleri (src/app/globals.css)
```css
--accent: #7B3FE4;   /* parlak mor */
--accent-2: #4B1D96; /* derin mor */
--silver: #A6A9AD;
--gray: #5C5F66;
```
