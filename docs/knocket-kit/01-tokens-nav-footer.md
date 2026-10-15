# 01 · Tokens, fonts, nav, footer (ชั้นที่ทุก section ใช้ร่วมกัน)

ที่มา: `tokens.css`, `pages.css`, `hero-refresh.css`, `index.D0krzfCX.css` และ `<head>` ของ https://knocket.trtc.io/ (อ่านเมื่อ 2026-10-14)

## ข้อค้นพบหลัก

เว็บมี design language ซ้อนกัน 2 ชั้น และหน้าแรกใช้ชั้นที่สองเกือบทั้งหมด

1. ชั้นเก่า "neo-brutalist" ใน `tokens.css` + `pages.css`: lemon/ink, ขอบ ink 2-3px, เงาแข็ง offset, cursor กำปั้น. ยังใช้กับ footer, FAQ, marquee, หน้าย่อย
2. ชั้น "refresh" ใน `hero-refresh.css`, `home-refresh.css`, `mobile-refresh.css`: cream `#f8f5eb`, เขียวเข้ม `#073d28`, mint, lime `#dffc63`, nav ลอยทรง pill, ไม่มีขอบหนา ไม่มีเงาแข็ง. override ชั้นเก่าด้วย `!important` และ patch ซ้อนกัน v1..v20

Kit ของเราควรยึด palette ของชั้น refresh และเก็บ vocabulary เงาแข็งของชั้นเก่าไว้เป็น variant (`--kn-shadow-hard`) สำหรับ footer/FAQ/card แบบ sticker เท่านั้น

ลำดับโหลด CSS ต้นฉบับ: Google Fonts → tokens → pages → hero-refresh → home-refresh → mobile-refresh → index.*.css

## Tokens (`:root` ใน tokens.css บรรทัด 20-61)

สี

| token | ค่า |
|---|---|
| `--k-green` | `#16A34A` |
| `--k-green-dark` | `#0D4A24` |
| `--k-ink` | `#0A1A0F` |
| `--k-ink-2` | `#1a2820` |
| `--k-lemon` | `#DFF362` |
| `--k-lemon-soft` | `#EEF9A6` |
| `--k-lemon-deep` | `#C7DF3D` |
| `--k-coral` | `#FF5638` |
| `--k-hot-pink` | `#FF3D82` |
| `--k-lilac` | `#C9B8FF` |
| `--k-sky` | `#A8DBFF` |
| `--k-peach` | `#FFC7A8` |
| `--k-cream` | `#F5EFE0` |
| `--k-paper` | `#FFFCF3` |
| `--k-line` | `#E8E1CE` |
| `--k-muted` | `#6B7D6E` |
| `--k-white` | `#FFFFFF` |

ฟอนต์

| token | ค่า |
|---|---|
| `--font-sans` | `'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif` |
| `--font-display` | `'Space Grotesk','Inter',sans-serif` |
| `--font-serif` | `'Instrument Serif',Georgia,serif` (แทบไม่ใช้) |
| `--font-mono` | `'JetBrains Mono',ui-monospace,monospace` |
| `--font-hand` | `'Caveat',cursive` |

รัศมี: `--r-sm 12px`, `--r-md 20px`, `--r-lg 32px`, `--r-xl 48px`, `--r-pill 999px`

เงา: `--sh-hard: 6px 6px 0 var(--k-ink)`, `--sh-hard-lg: 10px 10px 0 var(--k-ink)`, `--sh-lift: 0 40px 80px -20px rgba(10,26,15,.35)`, `--sh-glow-lemon: 0 0 60px rgba(232,255,59,.5)`

ไม่มี token สำหรับ spacing, easing, z-index เลย (ค่าทั้งหมดเป็นตัวเลขตรงใน CSS). ค่า easing ที่ซ้ำบ่อย: spring `cubic-bezier(.34,1.56,.64,1)`, settle `cubic-bezier(.16,1,.3,1)`. z-index ที่ใช้: nav 1000, cursor 9999, cursor-label 10000, ripple 9998, locale-menu 60, dropdown 100, contact widget 10001

### Refresh-layer vars (palette จริงของหน้าแรก)

ประกาศบน `.home-refresh-page` ไม่ใช่ `:root`

| var | ค่า |
|---|---|
| `--hr-green` | `#27c66f` |
| `--hr-dark` | `#073d28` |
| `--hr-mint` | `#bdf6d5` |
| `--hr-lime` | `#dffc63` |
| `--hr-cream` | `#f8f5eb` |
| `--hero-green` | `#16ad63` |
| `--hero-cta` | `#ff0084` |
| `--hero-cta-height` / `--hero-cta-width` | `68px` / `250px` |
| `--section-green-1..5` | `#eef7e8` `#e3f2df` `#d7edd9` `#cae7d3` `#bedfca` |
| genre bg | `#35d878` |
| final / nav ink | `#06150e` |

สีเขียวเข้มที่ hardcode นอกระบบ token: nav ink `#06150e`, hover `#173328`, mint hover `#c9f0d8`, dropdown bg `#fbfdf9`, border `#d9eadf`, icon `#13764b`, sub-text `#5c7568`, subhead `#7c9488`, kicker/body `#355847`, lead on hero `rgba(255,255,255,.9)`

มี lime 3 ค่าปนกัน: `#DFF362` (token), `#dffc63` (refresh), `rgba(232,255,59,…)` (neon เก่าใน rgba). Kit ควรเหลือค่าเดียว

## ฟอนต์

โหลดจาก Google Fonts ลิงก์เดียว ไม่มี `@font-face`:

```
https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Instrument+Serif&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&family=Caveat:wght@600;700&display=swap
```

- Body = Inter. หัวข้อ = Space Grotesk 700-850 (แต่โหลดถึง 700 เท่านั้น ค่า 800/850 ถูก faux-bold). Kit ควรขอ 700 อย่างเดียวหรือยอมรับ faux-bold
- Caveat ใช้เฉพาะ hover ของ genre words
- JetBrains Mono ใช้กับ dropdown column header (10px/800/.15em), footer sub-label, cursor label
- `html{-webkit-font-smoothing:antialiased}`

### Type scale ของหน้าแรก (ทั้งหมด `font-family:var(--font-display)`, `letter-spacing:-.065em`)

| ที่ | font-size | line-height |
|---|---|---|
| `.hr-hero h1` | `clamp(56px,8vw,140px)` | .82 (≤1024: `clamp(44px,9vw,96px)`, ≤720: `clamp(46px,13.5vw,68px)`/.9, ≤480: `13vw`) |
| `.hr-section-head h2` | `clamp(58px,7vw,118px)` | .82 (≤720: `clamp(40px,11vw,56px)`/.92) |
| `.hr-feature-copy h2` | `clamp(50px,6vw,100px)` | 1.02 |
| `.hr-demo-copy h2` | `clamp(52px,6.2vw,105px)` | 1.02 (≤720: `clamp(34px,9.5vw,48px)`/1.04) |
| `.hr-inbox-copy h2` | `clamp(48px,5.2vw,96px)` | .97 (≤720: `clamp(30px,8.5vw,42px)`/1.05) |
| `.hr-final h2` | `clamp(72px,10vw,170px)` | .78 (≤720: `clamp(52px,16vw,84px)`) |
| `.hr-card-copy h3` | `clamp(42px,4vw,62px)` | .85 |
| `.hr-genre-list button` | `800 clamp(64px,8vw,140px)` | .78 (≤800: `13.8vw`, ≤720: `12.5vw`/.9) |
| `.hr-lead` | `clamp(18px,1.55vw,24px)` | 1.42 |
| `.hr-kicker` | `800 12px` Inter, `letter-spacing:.13em`, uppercase | 1 |

## Reset ที่ section ทุกตัวพึ่ง (tokens.css 66-72)

```css
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;overflow-x:clip}
html,body{background:var(--k-cream);color:var(--k-ink);font-family:var(--font-sans);-webkit-font-smoothing:antialiased;overflow-x:clip;max-width:100vw}
a{color:inherit;text-decoration:none}
button{font-family:inherit;border:none;cursor:pointer;color:inherit;background:none}
img,svg{display:block;width:100%}   /* ไอคอนทุกตัวต้องกำหนดขนาดเอง */
```

## ปุ่ม

### `.hr-button` (CTA แบบมี chip ลูกศร) home-refresh.css

- base: `display:inline-flex;align-items:center;gap:34px;padding:17px 18px 17px 24px;border-radius:12px;background:#073d28;color:#fff;font-weight:800;transition:transform .25s ease,background .25s ease`
- chip `span`: `30x30;border-radius:8px;background:#dffc63;color:#073d28;display:grid;place-items:center`
- hover: `translateY(-3px);background:#021f14`
- `.is-light`: bg lime, text dark, chip bg dark, chip text white
- hero variant: `gap:0;padding:0 0 0 24px;background:#ff0084;border-radius:14px;overflow:hidden;min-width:250px;height:68px;justify-content:space-between;font-size:18px`; chip `68x68;flex:0 0 68px;border-radius:0;background:#ff0084;border-left:2px solid rgba(255,255,255,.42);font-size:24px`; hover `#e80078`. ≤720: height 62, chip 62
- final variant: `padding:18px 22px 18px 32px;font-size:clamp(16px,1.4vw,20px);gap:28px;border-radius:14px`; chip `40x40;radius 10;font-size 20px`. ≤720: `padding:16px 20px 16px 26px;font-size:16px;gap:20px`; chip 36

### `.hr-section-cta` (CTA ใน section อื่น)

`inline-flex;gap:18px;margin-top:30px;padding:15px 17px 15px 22px;border-radius:14px;background:#09281c;color:#fff;font-weight:800;box-shadow:0 12px 24px rgba(7,35,27,.15)`; chip `30x30;radius 8;bg #dffc63;color #09281c`; hover `translateY(-3px);box-shadow:0 18px 28px rgba(7,35,27,.23)`. ใน `.hr-inbox-copy` กลับสี (bg lime, chip dark)

### ชั้นเก่า `.btn` (tokens.css 169-207) ใช้กับ nav CTA และหน้าย่อย

- `.btn`: `inline-flex;gap:10px;padding:16px 26px;border-radius:999px;font-weight:700;font-size:15px;letter-spacing:-.005em;border:2px solid var(--k-ink);line-height:1;white-space:nowrap;transition:transform .18s cubic-bezier(.34,1.56,.64,1),box-shadow .18s`
- `.btn-lemon`: bg lemon, `--sh-hard`; hover `translate(-2px,-2px)` + `--sh-hard-lg`; active `translate(2px,2px)` + `2px 2px 0`
- `.btn-ink`: bg ink, text lemon, `6px 6px 0 var(--k-lemon)`
- `.btn-coral`, `.btn-ghost`; ขนาด `.btn-lg` (20px 32px/17px), `.btn-xl` (26px 40px/20px, border 2.5px); `.btn-arrow::after{content:'↗'}`, `.btn-play::before{content:'▸'}`
- ใน `.k-nav` ถูกทาสีใหม่เป็น `background:#06150e;color:#fff;border:2px solid #06150e;border-radius:999px;box-shadow:none;min-height:68px;padding:0 28px`; hover `#173328` + `translateY(-1px)`

### Pill/badge

`.pill`: white, `border:2px solid ink`, 12px/800 uppercase `.1em`, padding 8x16, `box-shadow:3px 3px 0 ink`; `.pill-lemon`, `.pill-dark`, `.pill-coral`. `.nav-featured` (POPULAR): `padding:2px 6px;border-radius:999px;background:#dffc7c;color:#17452c;font-size:9px;font-weight:800;letter-spacing:.04em`

## Nav desktop (`nav.k-nav`) hero-refresh.css + pages.css 286-425

โครง HTML

```html
<nav class="k-nav">
  <a href="/" class="k-logo k-logo--icon"><img 54px><span>Knocket</span></a>
  <div class="k-nav-links">
    <div class="has-drop"><span class="drop-label">Products <span class="caret">▾</span></span>
      <div class="drop"><a class="drop-item"><span class="drop-ic">svg</span><div><b>Title <span class="nav-featured">POPULAR</span></b><span>sub</span></div></a>…</div></div>
    <div class="has-drop has-drop-wide"><span class="drop-label">Solutions</span>
      <div class="drop drop-wide"><div class="drop-col"><div class="drop-col-h">BY ROLE</div><a class="drop-item">…</a></div><div class="drop-col">…</div></div></div>
    <a class="nav-top-link nav-top-link--plain">Tutorials</a> …
  </div>
  <details class="k-mobile-nav">…(ดูด้านล่าง)…</details>
  <div class="k-nav-cta"><details class="k-locale">…</details><a class="btn btn-lemon btn-arrow">Start Free</a></div>
</nav>
```

- `.k-nav`: `position:fixed;top:20px;left:22px;right:22px;z-index:1000;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;min-height:82px;padding:5px 7px 5px 20px;border-radius:999px;gap:22px;background:rgba(248,245,235,.9);backdrop-filter:blur(18px);border:0;box-shadow:0 14px 40px rgba(7,61,40,.12)`
- logo: img 54px radius 15px + wordmark Space Grotesk 24px/850/-.045em `#0A1A0F`, gap 18px, height 72
- links: `justify-self:center;padding:8px;gap:2px`; แต่ละลิงก์/`.drop-label`: `min-height:48px;padding:0 17px;border-radius:999px;font-weight:750;font-size:16px`; hover bg `#c9f0d8`
- dropdown `.drop`: `position:absolute;top:calc(100% + 12px);left:50%;transform:translateX(-50%) translateY(6px);min-width:260px;background:#fbfdf9;border:1px solid #d9eadf;border-radius:20px;box-shadow:0 20px 48px rgba(8,52,33,.16);padding:10px;opacity:0;pointer-events:none;transition:opacity .18s,transform .18s;z-index:100`; เปิดด้วย `.has-drop:hover` และ `:focus-within` (ไม่มี JS); `.has-drop::after` สูง 14px เป็นสะพาน hover
- `.drop-wide`: `min-width:620px;grid 1fr 1fr;gap:12px;padding:14px`; `.drop-ic` 40x40 radius 12 bg `#e9f7eb` border `1px solid #d0ebd9`, hover bg `#16885a` icon ขาว; `.drop-item b` display 14px/800, sub 12px muted
- ≤900px: `.k-nav-links` และ `.k-nav-cta` `display:none`

## Nav mobile (≤900px) `details.k-mobile-nav` ไม่มี JS

```html
<details class="k-mobile-nav">
  <summary aria-label="Open navigation"><span></span><span></span></summary>
  <div class="k-mobile-nav-panel">
    <details class="k-mnav-group" open><summary>Products <span class="k-mnav-caret">▾</span></summary>
      <div class="k-mnav-sub"><a><b>Title</b><span>sub</span></a>…</div></details>
    <details class="k-mnav-group">… <div class="k-mnav-subhead">By role</div> …</details>
    <a class="k-mnav-top">Tutorials</a> …
    <a class="k-mnav-cta">Start Free <span>→</span></a>
    <details class="k-locale k-locale--mobile" open>…</details>
  </div>
</details>
```

- nav grid `auto 1fr 58px`, `top:10px;left:12px;right:12px;min-height:68px;padding:5px 5px 5px 12px;border-radius:34px`; logo 58px + wordmark 20px
- hamburger `summary`: `58x58;border-radius:16px;background:var(--k-ink);display:grid;place-content:center;gap:7px`; ขีดขาว 22x2px สองเส้น; `[open]` หมุน `translateY(4.5px) rotate(45deg)` / `translateY(-4.5px) rotate(-45deg)`
- panel: `position:absolute;top:66px;right:0;width:min(320px,calc(100vw - 20px));max-height:calc(100svh - 96px);overflow-y:auto;padding:10px;display:grid;gap:2px;border:1px solid rgba(7,61,40,.13);border-radius:20px;background:#f8f5eb;box-shadow:0 24px 50px rgba(7,61,40,.18)`
- `.k-mnav-group>summary`, `.k-mnav-top`: `padding:14px 15px;border-radius:13px;font-weight:800;font-size:16px`; hover `#eaf3ec`, open `#e7f3ea`; caret หมุน 180
- `.k-mnav-sub a`: column, `padding:10px 13px;border-radius:10px;font-size:15px`; span 12.5px `#5c7568`; hover `#dff0e4`
- `.k-mnav-subhead`: `10.5px/850;letter-spacing:.14em;uppercase;#7c9488`
- `.k-mnav-cta`: `margin-top:8px;padding:15px 18px;border-radius:14px;bg #06150e;color #fff;font-weight:800`
- บั๊กต้นฉบับ: กฎ `.k-mobile-nav summary` รั่วไปโดน summary ของ group ต้องรีเซ็ตกลับ. Kit ควรผูกสไตล์ hamburger กับ class ไม่ใช่ element

## Locale switcher `details.k-locale`

- summary: `flex;gap:6px;padding:7px 10px;border-radius:10px;font-size:14px`, globe 17px, `.k-locale-caret` 10px opacity .55 หมุน 180 เมื่อ open
- `.k-locale-menu`: `position:absolute;top:calc(100% + 6px);right:0;z-index:60;min-width:172px;padding:6px;border:1px solid rgba(0,0,0,.08);border-radius:12px;background:#fff;box-shadow:0 12px 32px #0000001f`; item `padding:8px 10px;radius 8px` + `<small>` 11px opacity .5
- mobile variant `.k-locale--mobile` เปิดค้างใน panel, menu `position:static`
- JS ~400 bytes: click นอก + Escape ปิด (ยกเว้น mobile)

## Footer `footer.k-foot` pages.css 547-609

```html
<footer class="k-foot"><div class="k-foot-inner">
  <div class="k-foot-top">
    <div class="k-foot-brand"><a class="k-logo"><div class="k-logo-mark"><img 30px></div><span>Knocket</span></a><p>tagline</p></div>
    <div><h3>Product</h3><ul><li><a>…</a></li></ul></div> ×3
    <div class="k-foot-wide"><h3>Solutions</h3><div class="k-foot-two"><ul><li class="k-foot-sub">BY ROLE</li>…</ul><ul>…</ul></div></div>
  </div>
  <div class="k-foot-bot"><span>© …</span><div><a>Privacy</a><a>Terms</a></div></div>
</div></footer>
```

- `.k-foot`: `background:ink;color:cream;padding:100px 32px 40px;position:relative;overflow:hidden`; `::before{content:'KNOCKET';position:absolute;bottom:-20px;left:50%;font-size:clamp(120px,22vw,340px);font-weight:900;color:rgba(232,255,59,.08);letter-spacing:-.05em;line-height:1;white-space:nowrap}`
- `.k-foot-inner{max-width:1360px;margin:0 auto}`; `.k-foot-top{grid-template-columns:1.4fr .8fr 1.2fr .9fr 2.2fr;gap:32px;padding-bottom:60px;border-bottom:1px solid rgba(255,255,255,.1)}`
- `h3{12px/800;letter-spacing:.15em;uppercase;color:lemon;margin-bottom:40px}`; `ul` column gap 16; `a{rgba(245,239,224,.7);15px}` hover lemon
- `.k-foot-two{grid 1fr 1fr;gap:28px}`; `.k-foot-sub` mono 10px/800 uppercase `.12em` `rgba(232,255,59,.5)`
- `.k-foot-brand p{rgba(245,239,224,.6);15px/1.6;max-width:340px}`; `.k-foot-bot{flex;space-between;padding-top:30px;13px;rgba(245,239,224,.4)}`
- ≤900: padding `60px 20px 30px`, top เป็น 1 คอลัมน์ `gap:34px`, `.k-foot-two` ยัง 2 คอลัมน์ `gap:12px 24px`, bot เป็น column กึ่งกลาง
- `.k-logo-mark` 36px radius 10 ink + `knock-shake` hover

## Cursor กำปั้น (desktop `(hover:hover) and (pointer:fine)` เท่านั้น)

`body{cursor:none}` + `.k-cursor` 42px fixed SVG (`.big` 52px, `.knocking` หมุน 18deg), `.k-cursor-label` ink bg lemon mono 11px/700 uppercase, `.k-ripple` วง lemon 2px ขยาย 20→220px ใน .7s. ≤900 ซ่อนทั้งหมด. DOM ทั้งหมดถูกสร้างโดย interactions.js

## Breakpoints ที่ใช้จริง

nav/footer สลับที่ 900. section ใช้ 1024, 900, 800, 720, 480. Kit ควรรวมเหลือ 900 / 720 / 480 (หรือใช้ container query ตาม css-guide)

## สิ่งที่ไม่ควรพอร์ต

cookie `saas_token` → `html.k-logged`, `window.knocketAuthTarget`, chat SDK (`trtc.io/knocket-sdk`), analytics `shence814.min.js`, Astro islands (`LoginAwareCta`, `Providers`), promo bar `.k-promo` (ถูกซ่อนอยู่แล้ว), safe-area padding ใต้ footer (มีไว้หลบ chat widget)
