// Standalone, script-free viewing page for direct portfolio sharing.
// A Route Handler intentionally avoids the main site's client-side effects.
export const dynamic = "force-static";

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#05060a">
<title>FORME / 01 — Fragrance CGI study | KARNER Yazılım</title>
<meta name="description" content="Watch FORME / 01, an independent six-second fragrance CGI study by KARNER Yazılım. A fictional perfume bottle and a frame-break reveal.">
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="https://karneryazilim.com/watch/forme-01">
<link rel="icon" type="image/png" href="/logo-emblem-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="KARNER Yazılım">
<meta property="og:title" content="FORME / 01 — A fragrance CGI study">
<meta property="og:description" content="An independent six-second CGI concept by KARNER Yazılım. Watch in your browser.">
<meta property="og:url" content="https://karneryazilim.com/watch/forme-01">
<meta property="og:image" content="https://karneryazilim.com/isler/forme-01/forme-01-poster-v1.webp">
<meta property="og:image:width" content="1600">
<meta property="og:image:height" content="900">
<meta property="og:image:alt" content="A glass perfume bottle emerging from a warm architectural frame.">
<meta name="twitter:card" content="summary_large_image">
<style>
:root{color-scheme:dark;--bg:#05060a;--ink:#f2f3f7;--muted:#a6a9ad;--line:#303139;--accent:#ba9bef}
*{box-sizing:border-box}
html{background:var(--bg)}
body{margin:0;color:var(--ink);font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
a:focus-visible,video:focus-visible,summary:focus-visible{outline:3px solid var(--accent);outline-offset:6px}
.skip{position:absolute;left:24px;top:-80px;padding:12px 18px;background:var(--ink);color:var(--bg);z-index:2}
.skip:focus{top:16px}
.shell{width:min(1180px,calc(100% - 80px));margin-inline:auto}
header{display:flex;align-items:center;justify-content:space-between;gap:24px;min-height:108px;border-bottom:1px solid var(--line)}
.brand{display:flex;align-items:center;gap:13px;min-height:48px}
.brand img{display:block;width:42px;height:42px;object-fit:contain}
.brand strong{display:block;font-size:18px;letter-spacing:.17em;font-weight:700}
.brand small{display:block;font-size:11px;letter-spacing:.12em;color:var(--muted);margin-top:5px}
.home{display:inline-flex;align-items:center;min-height:44px;font-size:13px;color:var(--muted);border-bottom:1px solid transparent}
.home:hover{color:var(--ink);border-color:var(--ink)}
.intro{display:flex;align-items:flex-end;justify-content:space-between;gap:30px;padding:42px 0 26px}
.eyebrow{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin:0 0 14px}
h1{font-size:clamp(38px,5.4vw,70px);font-weight:500;letter-spacing:-.065em;line-height:1.03;margin:0}
.slash{color:var(--muted);font-weight:400}
.duration{font-size:12px;color:var(--muted);white-space:nowrap;margin:0 0 4px}
figure{margin:0}
video{width:100%;height:auto;aspect-ratio:16/9;display:block;background:#17130f;border:1px solid #393632;border-radius:5px}
figcaption{display:flex;justify-content:space-between;gap:24px;color:var(--muted);font-size:11px;line-height:1.5;padding:13px 1px}
.details{display:grid;grid-template-columns:1.2fr 1fr;gap:70px;padding:27px 0 34px}
h2{font-size:clamp(24px,2.7vw,33px);font-weight:400;line-height:1.2;letter-spacing:-.035em;margin:0 0 14px;max-width:430px}
.description{font-size:14px;line-height:1.65;color:var(--muted);margin:0;max-width:440px}
.contact{border-left:1px solid var(--line);padding-left:35px}
.contact p{font-size:14px;line-height:1.65;color:var(--muted);max-width:350px;margin:0 0 18px}
.cta{display:inline-flex;align-items:center;justify-content:space-between;gap:25px;min-height:48px;padding:12px 18px;background:#f2f3f7;color:#111217;border-radius:3px;font-size:13px;font-weight:600;transition:background-color 160ms ease}
.cta:hover{background:#ded6ee}
.email{display:block;width:fit-content;padding:13px 0 0;font-size:12px;color:var(--muted);overflow-wrap:anywhere}
.email:hover{text-decoration:underline;color:var(--ink)}
details{border-top:1px solid var(--line);padding:15px 0;color:var(--muted);font-size:12px;line-height:1.65}
summary{cursor:pointer;width:fit-content;min-height:30px;padding:4px 0}
details p{max-width:780px;margin:8px 0}
footer{display:flex;justify-content:space-between;gap:20px;padding:22px 0 30px;border-top:1px solid var(--line);font-size:10px;line-height:1.5;letter-spacing:.05em;color:var(--muted)}
@media(max-width:640px){.shell{width:calc(100% - 36px)}header{min-height:84px;gap:12px}.brand{gap:9px}.brand img{width:34px;height:34px}.brand strong{font-size:15px}.brand small{font-size:9px}.home{font-size:11px}.intro{padding:30px 0 21px;gap:12px}.eyebrow{font-size:9px}.duration{font-size:11px}figcaption{font-size:10px;gap:14px}.details{grid-template-columns:1fr;gap:24px;padding:22px 0 27px}.contact{border-left:0;border-top:1px solid var(--line);padding:23px 0 0}.contact p{max-width:none}.description{font-size:13px}.cta{min-height:48px}footer{font-size:9px}}
@media(prefers-reduced-motion:reduce){*{transition:none!important}}
@media(prefers-contrast:more){:root{--muted:#d6d8dd;--line:#777980}}
</style>
</head>
<body>
<a class="skip" href="#film">Skip to film</a>
<div class="shell">
<header>
<a class="brand" href="/" aria-label="KARNER Yazılım home"><img src="/logo-emblem-192.png" width="42" height="42" alt=""><span><strong>KARNER</strong><small>YAZILIM &amp; MEDYA</small></span></a>
<a class="home" href="/">Visit our studio <span aria-hidden="true">&nbsp;↗</span></a>
</header>
<main id="film">
<div class="intro"><div><p class="eyebrow">Independent CGI study · 01</p><h1>FORME <span class="slash">/</span> 01</h1></div><p class="duration">6 seconds · Silent film</p></div>
<figure>
<video controls playsinline preload="none" width="1600" height="900" poster="/isler/forme-01/forme-01-poster-v1.webp" aria-label="Play FORME 01, a six-second fragrance CGI concept" aria-describedby="film-caption">
<source src="/isler/forme-01/forme-01-v1.mp4" type="video/mp4">
Your browser does not support this video. Please email karneryazilim@gmail.com for an alternative viewing format.
</video>
<figcaption id="film-caption"><span>A fragrance study in glass, amber and depth.</span><span>CGI · Frame-break reveal</span></figcaption>
</figure>
<div class="details">
<section aria-labelledby="about-film"><h2 id="about-film">A small study in presence.</h2><p class="description">An independent portfolio concept featuring a fictional perfume bottle and a frame-break reveal. This six-second study explores glass, light and perceived depth.</p></section>
<section class="contact" aria-labelledby="contact-heading"><h2 id="contact-heading">Have a project in mind?</h2><p>Tell us about the product, the format and the idea you want to bring to life.</p><a class="cta" href="mailto:karneryazilim@gmail.com?subject=CGI%20production%20enquiry%20%E2%80%94%20FORME%2001">Discuss a project <span aria-hidden="true">↗</span></a><a class="email" href="mailto:karneryazilim@gmail.com">karneryazilim@gmail.com</a></section>
</div>
<details><summary>Visual description</summary><p>A clear glass perfume bottle filled with amber liquid moves forward from a warm, recessed architectural setting. A pale frame and projecting plinth create the impression of the bottle extending beyond the scene. The final view holds on the bottle and its FORME / 01 label. The film has no audio.</p></details>
</main>
<footer><span>KARNER Yazılım</span><span>Independent concept · Fictional product</span></footer>
</div>
</body>
</html>`;

export function GET() {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Language": "en",
      "X-Robots-Tag": "noindex, follow",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Content-Security-Policy":
        "default-src 'none'; style-src 'unsafe-inline'; img-src 'self'; media-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'self'",
    },
  });
}
