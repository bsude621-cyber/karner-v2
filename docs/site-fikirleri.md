# KARNER Web Sitesi — Fikir Listesi

> Kaynaklar: 21st.dev/community/components (UI bileşenleri) + aitmpl.com (Claude Code şablonları)
> Şirket bağlamı: `sirket-context.md` (yazılım + medya, Muğla/Ankara, AYSA referansı)

## A. Sayfa Yapısı (Bölümler)

1. **Hero** ✅ (mevcut — Purple Wave Shader + logo + slogan)
   - CTA: "Projeni Konuşalım" + "Çalışmalarımız"
2. **Güven barı** — birlikte çalışılan/araç logoları (Next.js, Supabase, n8n, Veo, Claude…) — kayan logo şeridi (21st: "Logo Cloud / Marquee")
3. **Hizmetler** — 4 ana hizmet kartı (21st: "Features / Bento Grid"):
   - Web sitesi geliştirme (3D/animasyonlu)
   - Mobil uygulama (Expo/React Native)
   - AI video & reklam ajansı (Veo/Kling/Firefly)
   - AI ürün görseli / sanal manken (try-on)
4. **Vitrin / Portföy** — AYSA, Çolakoğlu Emlak, BNS Enerji, Kötekli Emlak (21st: "Gallery / Project Cards" + hover 3D tilt)
5. **AYSA vaka analizi (EN GÜÇLÜ KOZ)** — özel bölüm:
   - "ChatGPT + Google AI Overview + organik 2. sıra" üçlü görünürlük kanıtı
   - SEO/GEO/AEO satış mesajı
6. **Süreç** — "Nasıl çalışıyoruz" 3-4 adımlı zaman çizelgesi (21st: "Timeline / Steps")
7. **Müşteri yorumları** (21st: "Testimonials") — sosyal kanıt
8. **Fiyat/paketler** (opsiyonel) — abonelik/bakım modeli vurgusu (21st: "Pricing")
9. **İletişim / Teklif Al** — form + WhatsApp (21st: "Contact / CTA")
10. **Footer** — hizmetler, sosyal, lokasyon (21st: "Footer")

## B. 21st.dev'den Çekilecek Bileşenler (Magic MCP)

- [ ] Animated Feature/Bento grid (hizmetler)
- [ ] Logo cloud / marquee (güven barı)
- [ ] Testimonials carousel
- [ ] Pricing cards (abonelik modeli için)
- [ ] Footer (kurumsal)
- [ ] Contact form + map
- [ ] Scroll-reveal / parallax animasyonları (GSAP — kurulu)
- [ ] AI chat widget (kendi WhatsApp/Telegram asistanı tanıtımı için)

## C. "Mühendislik Eseri" Dokunuşlar (rakipten ayrışma)

- Sayfa boyunca **akıcı scroll** (Lenis — kurulu) + scroll-tetikli 3D/animasyon
- Portföy kartlarında **3D tilt** ve hover video önizleme
- AI ürün görseli hizmeti için **before/after slider** (foto → manken üzerinde)
- AI video hizmeti için **otomatik oynayan reel galerisi**
- Koyu tema + mor marka kimliği (mevcut), micro-interactions
- Performans: görseller optimize, Lighthouse 90+ hedefi (AYSA/SEO iddiasını desteklemek için kritik)

## D. AI / Otomasyon Entegrasyonları (gelir modeline bağlı)

- **Site içi AI chatbot** — ziyaretçiye hizmet öneren, lead toplayan (n8n + Claude API)
- **Teklif formu → otomatik skorlama** (Claude API) → Telegram bildirimi
- **SEO/GEO/AEO odaklı içerik** — yapısal veri (schema.org), AI aramalarda görünürlük

## E. aitmpl.com'dan İş Akışı İçin (site içeriği değil, geliştirme)

- Hazır Claude Code **agent**'ları: kod review, SEO audit, component builder
- **MCP** entegrasyonları: Supabase, GitHub, web scraping (Bright Data)
- Tekrarlayan işler için **command/skill** şablonları

## F. Öncelik Sırası (önerilen)

1. Hizmetler + Vitrin + AYSA vaka → site "satış yapar" hale gelsin
2. İletişim/Teklif formu → lead toplasın
3. Testimonials + Süreç → güven
4. Pricing + AI chatbot → tekrarlayan gelir modeli
