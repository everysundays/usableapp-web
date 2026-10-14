# 02 · Section ต่อ section (โครง HTML, CSS desktop, CSS mobile, props)

ที่มา: `<main class="home-refresh">` ใน index.html, `home-refresh.css` (232 บรรทัด, patch ซ้อน v1..v20), `mobile-refresh.css` (239 บรรทัด, โหลดท้ายสุด ใช้ `!important`). ค่าที่ให้คือค่าสุดท้ายหลัง cascade ยังไม่ได้ยืนยันด้วย computed style ในเบราว์เซอร์ทุกค่า

ลำดับ section และจังหวะสีพื้นหลัง (desktop 1440px สูงรวม 10558px, mobile 375px สูงรวม 8538px)

| # | section | bg | สูง desktop | สูง mobile |
|---|---|---|---|---|
| 0 | `nav.k-nav` (fixed) | cream .9 blur | 82 | 68 |
| 1 | `section.hr-hero[data-motion=hero]` | `#16ad63` | 900 | 844 |
| 2 | `section#surfaces.hr-rail-section[data-motion=rail]` | `#fff` | 1325 | 835 |
| 3 | `section.hr-inbox-section` | `#e3f2df` + การ์ดเข้ม `#073d28` | 812 | 547 |
| 4 | `section.hr-demos` (2 article: web, contact reversed) | `#eef7e8`, `#e3f2df` | 1656 | 1150 |
| 5 | `section#telegram.hr-feature-stage` | `#cae7d3` | 846 | 612 |
| 6 | `section#ai.hr-feature-stage.is-reversed` | `#e3f2df` | 846 | 612 |
| 7 | `section.hr-demos.hr-demos-late` (1 article: mobile reversed) | `#eef7e8` | 828 | 556 |
| 8 | `section#how.hr-steps[data-motion=steps]` | `#bedfca`, radius บน 70px | 1079 | 806 |
| 9 | `section#capabilities.hr-genre[data-motion=genre]` | `#35d878` | 841 | 485 |
| 10 | `section.hr-final` | `#06150e`, radius บน 70px | 648 | 362 |
| 11 | `footer.k-foot` | ink | 778 | 1730 |

## กฎร่วมที่ทุก section พึ่ง

- `main.home-refresh{overflow:clip;background:var(--hr-cream);color:var(--hr-dark)}`
- `.home-refresh h1,h2,h3{font-family:var(--font-display);letter-spacing:-.065em}`
- `.hr-kicker{font:800 12px/1 var(--font-sans);letter-spacing:.13em;text-transform:uppercase}`
- `.hr-section-head` (ใช้ใน Rail และ Steps): `max-width:1520px;margin:0 auto 54px;display:flex;align-items:end;justify-content:space-between;gap:30px;padding:0 max(5vw,24px)`; `h2{margin-top:14px;font-size:clamp(58px,7vw,118px);line-height:.82}`; `>p{max-width:350px;font-size:18px;line-height:1.45}`. ≤720: เป็น column, `h2 clamp(40px,11vw,56px)/.92`, `padding:0 20px;margin-bottom:30px`
- `<em>`/`<span>` ใน h2 ถูกบังคับ `color:inherit;font-style:normal` (v16) จึงไม่มี emphasis จริง
- รูปแบบ copy block ที่ซ้ำกันใน inbox / demo / feature / final: `kicker → h2 → p? → cta`. Section ทั่วไปของ kit ควรรับ `{kicker, heading, body?, cta?, media, side:left|right, tone}`
- ไม่มี inline SVG ใน main เลย ลูกศร `→ ←` เป็นตัวอักษร; ภาพทั้งหมดเป็น `<img>`/`<video>`; CSS วาดเองมีแค่ blob ใน steps

## 1 · Hero `section.hr-hero[data-motion=hero]`

```
section.hr-hero[data-motion=hero]
  div.hr-hero-copy
    h1 > span ×3            (บรรทัดละ span เพื่อ animation)
    p.hr-lead
    div.hr-hero-actions
      a.hr-button "Start Free" > span "→"
      a.hr-free-note > b "100% Free" + span "Read why →"
  figure.hr-hero-art[data-parallax=hero-art] > img (loading=eager)
```

Desktop
- `.hr-hero{min-height:100svh;padding:170px max(5vw,24px) 80px;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:4vw;align-items:center;background:#16ad63}` ไม่มี container กลาง เป็น full-bleed
- `h1{max-width:750px;margin:22px 0 28px;font-size:clamp(56px,8vw,140px);line-height:.82;font-weight:800;text-wrap:balance;color:#fff}`; span `display:block`
- เข้าฉาก (CSS ล้วน): `span{opacity:0;transform:translateY(60px);animation:hr-rise .9s cubic-bezier(.16,1,.3,1) forwards}`; `span:nth-child(2){animation-delay:.1s}`
- `.hr-lead{max-width:620px;margin-bottom:32px;font-size:clamp(18px,1.55vw,24px);line-height:1.42;color:rgba(255,255,255,.9)}`
- `.hr-hero-actions{display:flex;align-items:center;gap:18px;flex-wrap:wrap}`
- `.hr-free-note{flex column;gap:3px;padding:9px 2px;color:rgba(255,255,255,.9)}` b 14px, span 13px, hover span `translateX(3px)`
- `.hr-hero-art img{width:112%;max-width:none;margin-left:-6%;height:auto;object-fit:contain;filter:drop-shadow(0 30px 35px rgba(7,61,40,.18))}` ภาพล้นคอลัมน์ข้างละ 6%
- JS: parallax `yPercent:9` scrub .55 ตลอด hero (ดู 03)

Mobile
- ≤1024: `h1 clamp(44px,9vw,96px)`; art width 100%, margin 0
- ≤900: `grid-template-columns:1fr;justify-items:start;gap:24px`; copy `max-width:640px`; art `max-width:460px;margin:4px auto 0;transform:none;order:2`
- ≤720: `padding:116px 20px 56px;gap:22px;min-height:auto`; `h1 clamp(46px,13.5vw,68px)/.9;margin:10px 0 20px`; lead `16px/1.5;margin-bottom:26px`; art `max-width:380px`; ปุ่ม `min-width:min(250px,100%);height:62px` chip 62
- ≤480: `h1 13vw`

Props: `lines[]`, `lead`, `primaryCta{label,href}`, `note{title,label,href}`, `image{src,alt}`

## 2 · Rail `section#surfaces.hr-rail-section[data-motion=rail]`

```
section.hr-rail-section[data-motion=rail]
  header.hr-section-head
    div > p.hr-kicker , h2
    div.hr-rail-nav > button[data-rail-prev] "←" , button[data-rail-next] "→"
  div.hr-rail-viewport
    div.hr-rail[data-rail-track]
      a.hr-product-card.is-lime|is-forest|is-mint[href] ×3
        div.hr-card-copy > span "01" , h3 , p , span.hr-card-cta ("Explore product" + b "→")
        div.hr-card-media > img
```

Desktop
- `.hr-rail-section{background:#fff;padding:140px 0}`; `.hr-rail-viewport{overflow:hidden;cursor:grab}`
- `.hr-rail{display:flex;width:max-content;gap:36px;padding:20px 8vw 50px;touch-action:pan-y;user-select:none;will-change:transform}` (GSAP ตั้ง `x` inline)
- `.hr-rail-nav{display:flex;gap:10px}` ปุ่ม `62x62;border-radius:50%;background:#07170f;color:#fff;font-size:26px` hover `scale(1.08)`
- `.hr-product-card{--surface-card-width:clamp(390px,36vw,560px);width:var(--surface-card-width);min-height:730px;padding:22px;display:flex;flex-direction:column;gap:18px;flex:none;border-radius:38px;border:2px solid rgba(7,61,40,.12);overflow:hidden;color:#073d28;box-shadow:0 12px 0 rgba(7,61,40,.08);transform:rotate(var(--card-r,-1deg));transition:transform .55s cubic-bezier(.16,1,.3,1),box-shadow .55s}` การ์ด 1/2/3 เอียง `-1deg / 1.5deg / -1.2deg`
- hover/focus-visible: `transform:rotate(0) translateY(-24px) scale(1.012);box-shadow:0 38px 70px rgba(7,61,40,.2)`
- โทน: `.is-lime #dffc63`, `.is-mint #bdf6d5`, `.is-forest #27c66f`
- `.hr-card-media{order:1;width:100%;height:455px;border-radius:26px;overflow:hidden;background:#fff}` img `object-fit:contain` hover `scale(1.035)` .75s
- `.hr-card-copy{order:2;flex:1;padding:2px 8px 8px;display:flex;flex-direction:column;align-items:flex-start}`; เลข `font-weight:900`; `h3{margin-top:18px;font-size:clamp(42px,4vw,62px);line-height:.85}`; `p{margin:12px 0 16px;font-size:18px;line-height:1.4}`
- `.hr-card-cta{inline-flex;gap:22px;margin-top:auto;padding:14px 14px 14px 20px;border-radius:12px;background:#073d28;color:#fff;font-weight:850;opacity:0;transform:translateY(18px)}` โผล่ตอน hover; chip `b` 28x28 radius 7 lime
- JS: GSAP Draggable + Inertia, snap ทีละการ์ด, skew ±5° ขณะลาก (ดู 03)

Mobile
- ≤800: `--surface-card-width:88vw;min-height:660px`; media 360px; h3 44px; `.hr-card-cta{opacity:1;transform:none}` (ไม่มี hover)
- ≤720: section `padding:64px 0 72px`; `.hr-rail{gap:16px;padding:8px 16px 30px}`; การ์ด `82vw;min-height:0;padding:16px;gap:14px;transform:none`; media 210px; h3 32px; p 15px; cta `padding:11px 12px 11px 16px`; ปุ่มลูกศรยังอยู่ (`align-self:flex-end`)
- ≤480: การ์ด 86vw

Props: `kicker`, `heading`, `cards[] {index,title,desc,ctaLabel,href,tone,image}`

## 3 · Inbox `section.hr-inbox-section`

```
section.hr-inbox-section
  div.hr-inbox-panel
    div.hr-inbox-copy > p.hr-kicker , h2 , a.hr-section-cta
    figure.hr-inbox-visual > img
```

- section `padding:72px max(3vw,20px) 100px;background:#e3f2df`
- `.hr-inbox-panel{max-width:1800px;min-height:640px;margin:auto;padding:clamp(36px,4vw,76px);display:grid;grid-template-columns:minmax(0,.37fr) minmax(0,.63fr);align-items:center;gap:clamp(28px,4vw,80px);border-radius:48px;background:#073d28;color:#fff;overflow:hidden}`
- copy `max-width:600px`; kicker `margin:0 0 28px;color:rgba(255,255,255,.72)`; `h2{font-size:clamp(48px,5.2vw,96px);line-height:.97;text-wrap:balance}`
- `.hr-inbox-visual{border-radius:28px;background:#fff;overflow:hidden}`
- CTA กลับสี (lime bg, chip dark)
- ≤1024: 1 คอลัมน์; ≤720: section `28px 14px 56px`, panel `padding:26px 20px;gap:22px;border-radius:26px`, `h2 clamp(30px,8.5vw,42px)/1.05`, visual radius 18
- ไม่มี JS

Props: `kicker`, `heading`, `cta`, `image`

## 4 และ 7 · Demos `section.hr-demos > article.hr-demo[.is-reversed]`

```
section.hr-demos
  article.hr-demo[.is-reversed]
    div.hr-demo-copy > p.hr-kicker , h2 (line1<br><span>line2</span>) , p , a.hr-section-cta
    div.hr-demo-video > video[muted loop playsinline preload=metadata]
```

Desktop
- `.hr-demo{min-height:92vh;padding:110px max(5vw,24px);display:grid;grid-template-columns:.62fr 1.38fr;align-items:center;gap:5vw;color:#06150e}`
- `.is-reversed{grid-template-columns:1.38fr .62fr}` + copy `order:2` (สลับฝั่งด้วย class ไม่ใช่ DOM)
- สีพื้นหลังผูกกับ `nth-child` ใน wrapper: child 1 `#eef7e8`, child 2 `#e3f2df` (จุดอ่อน: ย้ายลำดับแล้วสีเปลี่ยน; kit ควรเป็น prop `tone`)
- `h2{margin:18px 0 24px;font-size:clamp(52px,6.2vw,105px);line-height:1.02}`; kicker และ p `#355847`; `>p:last-child{max-width:520px;font-size:18px;line-height:1.5}`
- `.hr-demo-video{width:100%;border-radius:34px;overflow:hidden;background:#073d28;box-shadow:0 30px 70px rgba(7,61,40,.18)}`; `video{aspect-ratio:16/9;object-fit:contain;background:#073d28}` ไม่มี `autoplay` (JS เล่นเมื่อเห็น 38%)
- JS reveal: `from(copy children + video, {y:65,autoAlpha:0,stagger:.075,duration:.85,ease:power3.out})` trigger `top 74%`, ย้อนกลับเมื่อเลื่อนขึ้น

Mobile
- ≤900: `display:block;min-height:0;padding:56px 20px`; copy ก่อนเสมอ; video `margin-top:32px;transform:none`
- ≤720: `padding:52px 20px`; `h2 clamp(34px,9.5vw,48px)/1.04;margin:12px 0 14px`; p 15.5px; CTA `margin-top:20px`; video radius 20, `object-fit:cover`

Props: `kicker`, `heading(2 บรรทัด)`, `body`, `cta`, `video{src,poster?}`, `reversed`, `tone`

## 5 และ 6 · Feature stage `section.hr-feature-stage[#id][.is-reversed]`

โครงเหมือน demo ทุกอย่าง ต่างแค่
- grid `.78fr 1.22fr` (reversed `1.22fr .78fr`), `gap:6vw`
- bg: `#telegram #cae7d3`, `#ai #e3f2df`
- `h2 clamp(50px,6vw,100px)/1.02;margin:18px 0 26px`; `>p:last-child{font-size:19px;max-width:560px}`
- `.hr-feature-video{border-radius:36px;box-shadow:0 35px 75px rgba(7,61,40,.22);transform:rotate(-1deg)}`
- mobile เหมือน demo (ไม่เอียง)

ข้อเสนอ: รวม demo + feature เป็น component เดียว `MediaSplit` มี option `ratio`, `tilt`, `tone`, `reversed`

## 8 · Steps `section#how.hr-steps[data-motion=steps]`

```
section.hr-steps[data-motion=steps]
  div.hr-flow-blob[aria-hidden]
  header.hr-section-head > div > p.hr-kicker , h2 ; p[data-step-note]
  div.hr-step-stage[data-plop-in]
    article.hr-step-card[data-plop-in-item][style="--i:N;--step-bg:…;--rest-r:…"] ×5
      span "Step #01" , img , h3 , p
  ol.hr-steps-mobile            ← markup ซ้ำสำหรับ mobile เท่านั้น
    li.hr-mstep ×5 > span.hr-mstep-no "01" , div.hr-mstep-body > h3 , p
```

Desktop
- `.hr-steps{position:relative;overflow:hidden;padding:140px 0 96px;background:#bedfca;color:#06150e;border-radius:70px 70px 0 0}`
- `.hr-flow-blob{position:absolute;inset:8% -12% -18%;background:rgba(255,255,255,.42);border-radius:50% 45% 35% 55%;pointer-events:none}` + parallax `yPercent:-14` scrub .45
- `.hr-step-stage{position:relative;height:680px;max-width:1600px;margin:auto;padding:0 4vw;display:flex;align-items:center;justify-content:center}`
- `.hr-step-card{position:relative;width:min(22vw,360px);height:570px;padding:24px;margin-left:-3.2vw;border-radius:30px;border:2px solid rgba(7,35,27,.18);box-shadow:0 18px 30px rgba(30,40,45,.09);transform:rotate(var(--rest-r));transform-origin:center 90%;z-index:calc(var(--i) + 1);cursor:pointer}` การ์ดแรก margin 0
- สีการ์ด 5 ใบ `#78d9d1 #e3b1dd #f7d86f #ada1df #9bddad`; มุมพัก `-6 3 -2 5 -3` deg
- `img{height:285px;object-fit:contain;margin:18px 0;mix-blend-mode:multiply}`; `h3{30px/.9}`; `p{margin-top:14px;16px/1.4}`; `>span{font-weight:850}`
- hover: `border-color:rgba(7,61,40,.28);box-shadow:0 34px 58px rgba(7,61,40,.2)` + GSAP lift `y:-64,scale:1.045,rotation:0`
- JS plop-in: `fromTo scale:.06,y:150,rotation:[-12,10,-8,13,-9] → scale:1,y:0,rotation:[-6,3,-2,5,-3], duration:.72, stagger:.12, ease:back.out(2.4)`, trigger `top 82%` once
- 1024: การ์ด `38vw`

Mobile
- ≤800: stage `height:auto;padding:20px;display:grid;gap:18px`; การ์ด `width:100%;height:auto;margin:0`; img 250px (ยังเอียงอยู่)
- ≤720: `.hr-steps{padding:56px 0 60px;border-radius:38px 38px 0 0}`; `.hr-step-stage{display:none}`; `.hr-steps-mobile{display:block}`
- `.hr-steps-mobile{list-style:none;max-width:520px;margin:4px auto 0;padding:0 18px;display:grid;gap:12px}`
- `.hr-mstep{display:grid;grid-template-columns:44px 1fr;gap:14px;align-items:start;padding:16px;background:rgba(255,255,255,.72);border:1px solid rgba(7,61,40,.12);border-radius:16px}`; `.hr-mstep-no{44x44;border-radius:12px;background:#09281c;color:#dffc63;display:grid;place-items:center;font-family:display;font-weight:800;font-size:19px;letter-spacing:-.03em}` สี chip ตามลำดับ `#09281c #1e7a4d #0f5a38 #2a8c5a #09281c`; `h3{20px/1.05;margin:2px 0 3px}`; `p{14px/1.4;color:#3c5a4b}`

ข้อเสนอ: component เดียว render ทั้งสองแบบจากข้อมูลชุดเดียว (ต้นฉบับเขียนเนื้อหาซ้ำ 2 ที่)

Props: `kicker`, `heading`, `note`, `steps[] {n,title,desc,image,bg,restRotation}`

## 9 · Genre / Capabilities `section#capabilities.hr-genre[data-motion=genre]`

```
section.hr-genre[data-motion=genre]
  p.hr-kicker
  div.hr-genre-images[aria-hidden]
    div.hr-capability-scene[data-capability-scene=0..5] > img ×6 (scene 0,1) หรือ ×2 (scene 2-5)
  div.hr-genre-list > button[data-genre-item=0..5] ×6
```

Desktop
- `.hr-genre{position:relative;overflow:hidden;background:#35d878;color:#06150e;padding:100px 3vw 90px}`
- `.hr-genre-list{position:relative;z-index:2;margin:70px auto 0;display:flex;flex-direction:column;align-items:center;gap:6px;max-width:1380px}`
- `button{display:block;font:800 clamp(64px,8vw,140px)/.78 var(--font-display);letter-spacing:-.065em;color:#07150e;white-space:nowrap}`
- hover/focus-visible/`.is-active`: `font-family:var(--font-hand);font-weight:700;letter-spacing:.015em;transform:scale(1.055)`; `.hr-genre-list:hover button:not(:hover){opacity:.28}`
- `.hr-capability-scene{position:absolute;inset:0;opacity:0;visibility:hidden;pointer-events:none}` `.is-active{opacity:1;visibility:visible}` (ยึดกับ `.hr-genre`)
- img: `position:absolute;z-index:3;object-fit:contain;border:5px solid #fff;border-radius:24px;box-shadow:0 30px 60px rgba(7,61,40,.22)`
- scene 2-5 (2 รูป): `width:min(17vw,330px);max-height:330px`; รูปแรก `left:2vw`, รูปสุดท้าย `right:2vw`; ตำแหน่ง/มุม: s2 `top:22% -3deg` / `bottom:9% 7deg`; s3 `top:14% 4deg` / `bottom:20% -6deg`; s4 `top:26% -5deg` / `bottom:14% 4deg`; s5 `top:18% 6deg` / `bottom:8% -5deg`
- scene 0-1 (6 รูป): `width:min(13vw,220px);max-height:205px`; nth 1 `left:1.5vw;top:18%;-7deg`, 2 `right:1.5vw;top:17%;6deg`, 3 `left:2.5vw;top:44%;5deg`, 4 `right:2.5vw;top:43%;-5deg`, 5 `left:1.5vw;top:70%;-4deg`, 6 `right:1.5vw;top:69%;7deg`; รูปแนวตั้ง (contact templates) `width:min(8vw,130px);aspect-ratio:1012/1800;object-fit:cover`
- ตอนโหลดครั้งแรกไม่มี scene ไหน active (เห็นแต่คำ) จนกว่าจะ hover/tap
- JS: pointerenter/focus/click สลับ scene (ดู 03)

Mobile
- ≤800: scene `display:none`, `.is-active{display:block}`; scene 2-5 `width:25vw;max-height:200px`; scene 0-1 `width:24vw;max-height:145px;border-width:3px`; list `gap:8px`; button `13.8vw;white-space:normal;text-align:center`; section `padding:80px 14px`
- ≤720: `padding:56px 16px 64px`; button `12.5vw/.9`

Props: `kicker`, `items[] {label, images[] (2 หรือ 6)}`

## 10 · Final `section.hr-final`

`section.hr-final > p.hr-kicker , h2 , a.hr-button.is-light > span "→"`

- `.hr-final{min-height:72vh;padding:100px 24px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#06150e;color:#fff;border-radius:70px 70px 0 0}`
- `h2{max-width:1100px;margin:20px 0 42px;font-size:clamp(72px,10vw,170px);line-height:.78}`
- ปุ่ม: ดู final variant ใน 01 (quirk ต้นฉบับ: chip ถูกทับเป็น lime เหมือนปุ่ม เห็นแต่ลูกศร)
- ≤720: `min-height:0;padding:72px 22px;border-radius:38px 38px 0 0`; `h2 clamp(52px,16vw,84px);margin:14px 0 30px`
- ไม่มี JS

## CSS ตายที่ไม่ต้องพอร์ต

`.hr-nav*`, `.hr-mobile-menu`, `.hr-nav-toggle`, `.hr-word-wall/.hr-words/.hr-word-corners/.corner-*`, sprout `::before` ของ product card, blob `::before` ของ hero art, `video` hover swap ใน `.hr-card-media`, demo `nth-child(3)`, token `--section-blue/coral/violet/yellow/lavender`, `html[lang="zh-Hans"]` overrides

## Assets ที่หน้าใช้ (ดาวน์โหลดไว้แล้วใน scratchpad `knocket/dl/`, รวม 30 รูป 18MB; วิดีโอ 5 ไฟล์ 0.3-4.7MB)

- hero: `images/hero-connected-overview.png` (3030x2386)
- rail: `images/figma/web-widget-aurora.png`, `mock-contact.png`, `mock-mobile.png`
- inbox: `images/figma/mock-inbox.png`
- steps: `images/figma/step-{choose-surface,configure,connect-ai,connect-channels,go-live}.png`
- genre: `images/figma/capability-{web,contact,mobile,inbox,telegram,ai}-{primary,secondary}.png`, `images/web-widget-scenes/{dining,real-estate,nonprofit,coaching}.jpg`, `images/contact-templates/{01,03,06,08}.jpg`
- video: `videos/{web,contact-page,mobile,telegram-reply,ai-reply}.mp4`

ภาพและวิดีโอทั้งหมดเป็น mockup ผลิตภัณฑ์ของ Knocket (ลิขสิทธิ์ของเขา) ใช้ได้แค่เป็น placeholder ระหว่างพัฒนา ต้องแทนด้วยภาพของเราก่อนขึ้นจริง
