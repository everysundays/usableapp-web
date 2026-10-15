# Knocket-style section kit · ข้อเสนอแนวทาง

ศึกษาจาก https://knocket.trtc.io/ เมื่อ 2026-10-14 (desktop 1440px และ mobile 375px, อ่าน CSS 6 ไฟล์ + JS 3 ไฟล์ + inline script ทั้งหมด). รายละเอียดอยู่ใน `01-tokens-nav-footer.md`, `02-sections.md`, `03-behaviors-js.md`

## สรุปสิ่งที่เว็บต้นฉบับทำ

- เป็นเว็บ Astro เหมือนโปรเจกต์เรา หน้าแรกมี 10 section + nav + footer
- ชั้นสไตล์มี 2 ชุดซ้อนกัน (เก่า: lemon/ink เงาแข็ง, ใหม่: cream/เขียวเข้ม/mint/lime นุ่ม) หน้าแรกใช้ชุดใหม่ และ override ชุดเก่าด้วย `!important` ซ้อนกัน 20 รอบ. Kit ของเราจะเขียนใหม่จากค่าสุดท้ายเท่านั้น
- JS มี 2 ชั้น
  - `interactions.js` (ไม่มี library): cursor กำปั้น, ripple, เสียง, tilt การ์ด, parallax, tabs, copy. หน้าแรกใช้แค่ cursor
  - bundle หน้าแรก (GSAP 3.15 + ScrollTrigger + Draggable + Inertia + Lenis 1.3.26): rail ลากได้, การ์ด step เด้งเข้า, สลับภาพตอน hover คำ, parallax hero/blob, reveal ตอน scroll, เล่นวิดีโอเมื่อเห็น, smooth scroll
- ของที่เป็น CSS ล้วนอยู่แล้ว: dropdown nav (`:hover`/`:focus-within`), hamburger mobile (`<details>`), locale (`<details>`), hero h1 ขึ้นมา (`@keyframes`)
- Section 4 ตัวจาก 10 ไม่มี JS เลย (inbox, final, และ demo/feature ถ้าตัด reveal ออก)

## แนวทางที่แนะนำ (A): Astro section components + CSS layers + motion kit กลางที่โหลด GSAP/Lenis แบบ lazy

เหตุผล: โปรเจกต์เป็น Astro 5 อยู่แล้ว, ต้นฉบับก็ Astro, และ Astro component รับ props + slots ได้ตรงกับโจทย์ "เลือก section มาเรียง แล้วเปลี่ยนเนื้อหาข้างใน" ไม่ต้องเพิ่ม framework

### โครงไฟล์

```
src/kit/
  styles/
    main.css            @layer reset, tokens, semantic, components, utilities + @import ทุกไฟล์
    reset.css           Josh Comeau reset + img/svg display:block
    tokens.css          --kn-* ทุกค่าจาก 01 (สี, ฟอนต์, radius, shadow, easing, z, breakpoint)
    typography.css      type scale ตาม 01 (class .kn-display-xl/.kn-h2/.kn-lead/.kn-kicker)
    components/
      nav.css  nav-mobile.css  locale.css  button.css  section-head.css  footer.css  cursor.css
      hero.css  rail.css  inbox.css  media-split.css  steps.css  genre.css  final.css
  components/
    Nav.astro  Footer.astro  Button.astro  SectionHead.astro
    sections/
      Hero.astro  Rail.astro  Inbox.astro  MediaSplit.astro  Steps.astro  Genre.astro  Final.astro
    registry.ts         map ชื่อ section → component (ใช้เรียงหน้าจาก array)
  motion/
    index.ts            initKit(root, options) / destroy()
    behaviors/
      video-visibility.ts  rail.ts  plop-in.ts  genre.ts  parallax.ts  reveal.ts  smooth-scroll.ts
      cursor.ts  tilt.ts  marquee.ts  tabs.ts  copy.ts  locale.ts
  data/
    nav.ts              เมนูชุดเดียว ใช้ทั้ง desktop dropdown, mobile accordion, footer
src/pages/kit.astro     kitchen sink: ทุก section พร้อมเนื้อหาตัวอย่าง (desktop + mobile)
src/pages/kit-demo.astro ตัวอย่างหน้าที่เรียง section จาก array
```

### วิธีประกอบหน้า

```astro
---
import { sections } from '../kit/components/registry';
const page = [
  { type: 'hero',       props: { lines: ['One knock.','Every','connection.'], lead: '…', cta: {…}, image: {…} } },
  { type: 'rail',       props: { kicker: 'THE PRODUCT', heading: '…', cards: [...] } },
  { type: 'inbox',      props: {…} },
  { type: 'mediaSplit', props: { tone: 1, reversed: false, video: '…', … } },
  { type: 'steps',      props: {…} },
  { type: 'genre',      props: {…} },
  { type: 'final',      props: {…} },
];
---
{page.map(({type, props}) => { const C = sections[type]; return <C {...props} /> })}
```

เรียงใหม่ = สลับลำดับใน array. เปลี่ยนเนื้อหา = แก้ props. เนื้อหายาวไปอยู่ใน `src/content/` (content collection ที่โปรเจกต์ใช้อยู่แล้ว) ได้ภายหลัง

### Section components (7 ตัว แทน 10 section ของต้นฉบับ)

| component | แทน section ต้นฉบับ | props หลัก | JS ที่ต้องการ |
|---|---|---|---|
| `Hero` | hr-hero | lines[], lead, cta, note, image | parallax (optional) |
| `Rail` | hr-rail-section | kicker, heading, cards[] {tone,image,title,desc,cta} | rail (Draggable) หรือ CSS scroll-snap |
| `Inbox` | hr-inbox-section | kicker, heading, cta, image | ไม่มี |
| `MediaSplit` | hr-demo + hr-feature-stage (รวม 5 instance) | kicker, heading, body, cta, media{video/img}, reversed, tone(1-5), ratio('demo'/'feature'), tilt | reveal, video-visibility |
| `Steps` | hr-steps (ทั้ง desktop card และ mobile list จากข้อมูลชุดเดียว) | kicker, heading, note, steps[] {title,desc,image,bg,rest} | plop-in, blob parallax |
| `Genre` | hr-genre | kicker, items[] {label, images[]} | genre switcher |
| `Final` | hr-final | kicker, heading, cta | ไม่มี |

บวก `Nav`, `Footer`, `Button` (variants: hr-button/hero/final/section-cta/btn-lemon/btn-ink), `SectionHead`

สิ่งที่แก้จากต้นฉบับโดยตั้งใจ
- สีพื้นหลัง demo ที่ผูกกับ `nth-child` → เป็น prop `tone` เพื่อให้ย้ายลำดับแล้วสีไม่เปลี่ยนเอง
- ข้อมูล step ที่เขียนซ้ำ 2 ที่ (การ์ด desktop + list mobile) → render จากข้อมูลชุดเดียว
- เมนูที่เขียนซ้ำ 3 ที่ (dropdown, mobile, footer) → `data/nav.ts` ชุดเดียว
- lime 3 ค่า → `--kn-lime` ค่าเดียว `#dffc63`
- breakpoint 5 ค่า (1024/900/800/720/480) → 3 ค่า (900/720/480) หรือ container query ต่อ section
- `!important` ทั้งหมด → ใช้ `@layer` แทน ตาม css-guide ของ Lh
- `img,svg{width:100%}` ที่บังคับทั้งหน้า → อยู่ใน reset ของ kit เป็น `max-width:100%` และไอคอนกำหนดขนาดเอง

### JS กลาง: `initKit(root, options)`

```ts
import { initKit } from '../kit/motion';
initKit(document, {
  smoothScroll: true,      // Lenis (ปิดอัตโนมัติเมื่อ prefers-reduced-motion)
  cursor: 'fist',          // 'fist' | 'none'  (desktop pointer:fine เท่านั้น)
  rail: 'drag',            // 'drag' (GSAP Draggable) | 'snap' (CSS scroll-snap ไม่ใช้ JS)
  reveal: true,            // reveal ตอน scroll ของ MediaSplit
});
```

กติกาที่ behavior ทุกตัวต้องทำ
- หา DOM ด้วย `data-kn-*` attribute เท่านั้น ไม่ผูกกับ class (section เปลี่ยน class ได้โดย JS ไม่พัง)
- แต่ละ behavior เป็น module `{ match: selector, init(el, ctx) → destroy() }`; `initKit` วนทุก module ใน root, คืน `destroy()` รวม
- ตรวจ `prefers-reduced-motion` ที่เดียวใน `initKit` แล้วส่งผ่าน `ctx.reduced` (ต้นฉบับตรวจกระจัดกระจายและไม่ครบ)
- โหลด GSAP/Lenis แบบ `await import()` เฉพาะเมื่อมี section ที่ต้องใช้ในหน้า (หน้าที่มีแค่ inbox+final ไม่โหลดอะไรเลย)
- ค่า gap ของ rail อ่านจาก `getComputedStyle` ไม่ hardcode 36 (ต้นฉบับ hardcode แล้วเพี้ยนบน mobile)
- element ที่ GSAP ขยับ ต้องไม่ใช้ transform เป็นกลไกจัดวางของตัวเอง (ต้นฉบับชนกันที่ step card จนต้องใช้ `!important` กลบบน mobile)
- `initKit` เรียกซ้ำได้ (idempotent) และมี `destroy()` สำหรับ Astro view transitions

DOM contract ต่อ behavior (ค่าตัวเลขทั้งหมดอยู่ใน 03)

| behavior | attribute บน markup | library |
|---|---|---|
| video-visibility | `video[data-kn-video]` | ไม่มี (IntersectionObserver .38) |
| rail | `[data-kn-rail]` > `[data-kn-rail-viewport]` > `[data-kn-rail-track]`, ปุ่ม `[data-kn-rail-prev/next]` | GSAP Draggable + Inertia (หรือไม่มี ถ้าโหมด snap) |
| plop-in | `[data-kn-plop]` > `[data-kn-plop-item]`, `[data-kn-step-note]`, `[data-kn-blob]` | GSAP + ScrollTrigger |
| genre | `[data-kn-genre]` > `[data-kn-genre-item=i]`, `[data-kn-scene=i]` | GSAP (tween สั้น) หรือ CSS transition |
| parallax | `[data-kn-parallax="hero-art"]` ใน `[data-kn-section="hero"]` | GSAP + ScrollTrigger |
| reveal | `[data-kn-reveal]` (container) ลูกที่ `[data-kn-reveal-item]` | GSAP + ScrollTrigger (สำรอง: CSS `animation-timeline: view()`) |
| smooth-scroll | global | Lenis + gsap.ticker |
| cursor / tilt / marquee / tabs / copy / locale | `[data-kn-cursor]`, `[data-kn-tilt]`, `[data-kn-marquee]`, `[data-kn-tabs]`, `[data-kn-copy]`, `details[data-kn-locale]` | ไม่มี |

Library: `gsap` (3.13+ ฟรีทั้งหมดรวม Draggable/InertiaPlugin ตั้งแต่ 2025), `lenis` ติดตั้งผ่าน npm, โหลดเป็น ES module แยก chunk

### ทางเลือกที่เทียบแล้ว

| | A · Astro + layers + GSAP lazy (แนะนำ) | B · CSS-first ล้วน (scroll-snap, view-timeline, ไม่มี GSAP/Lenis) | C · Web Components เหมือน `design-components.js` เดิม |
|---|---|---|---|
| ความเหมือนต้นฉบับ | เหมือนทั้งหมด รวมลาก rail มี inertia + skew, การ์ดเด้ง `back.out`, smooth scroll | เสีย inertia/skew ของ rail, plop-in กลายเป็น transition ธรรมดา, ไม่มี smooth scroll | เหมือนได้เท่า A แต่ต้องเขียน hydration เอง |
| น้ำหนัก JS | ~70KB gz เฉพาะหน้าที่ใช้ (ต้นฉบับ 181KB ไม่ minify-split) | 0-5KB | เท่า A + runtime ของ custom element |
| เข้ากับ css-guide ของ Lh | ใช้ layers/tokens ได้เต็ม, JS เฉพาะที่ CSS ทำไม่ได้ | เข้าได้ที่สุด | เข้าได้ แต่ Shadow DOM ชนกับ layers/tokens |
| เรียง section ใหม่ / เปลี่ยนเนื้อหา | props + array ใน Astro, build-time | เหมือน A | attribute บน element, runtime |
| ใช้นอก Astro ได้ไหม | ไม่ (HTML ที่ build ออกมาใช้ได้) | ไม่ | ได้ทุกที่ |
| ความเสี่ยง | GSAP ชน CSS transform ถ้าไม่ระวัง (มี rule ใน 03) | `animation-timeline` ยังไม่ Baseline (ต้อง `@supports` + fallback) | ซับซ้อนกว่าโจทย์ |

A มี option `rail:'snap'` และ `reveal:false` ให้ลดลงไปเป็น B ได้ทีละ behavior จึงไม่ต้องเลือกขาด

## แผนการทำ (แต่ละข้อจบด้วยของที่เปิดดูได้ที่ `/kit`)

1. Foundation: `main.css` layers, `tokens.css`, `reset.css`, `typography.css`, `Button`, หน้า `/kit` ว่างที่โหลดฟอนต์ครบ. ตรวจด้วยการเทียบ computed style ของปุ่มและหัวข้อกับต้นฉบับใน browser
2. Nav + Footer (desktop + mobile, CSS ล้วน) + `data/nav.ts`
3. Section ที่ไม่มี JS ก่อน: `Inbox`, `Final`, `MediaSplit` (static), `SectionHead`
4. `Hero`, `Rail` (โหมด snap ก่อน), `Steps` (ทั้งสองแบบ), `Genre` (static, scene แรก active)
5. `motion/`: `initKit` + video-visibility + locale + reveal + parallax + plop-in + genre + rail drag + smooth-scroll + cursor. เปิดทีละตัวบน `/kit` เทียบกับต้นฉบับ
6. `kit-demo.astro` เรียง 10 section ตามต้นฉบับด้วย array แล้วเทียบ screenshot desktop/mobile กับของจริงทั้งหน้า
7. เอกสารใช้งาน: props ของแต่ละ section + วิธีเพิ่ม section ใหม่

ประมาณการ: ข้อ 1-4 ประมาณ 1 วันทำงาน, ข้อ 5 ประมาณ 1 วัน, ข้อ 6-7 ครึ่งวัน (ประมาณจากจำนวนค่าใน 01-03, ยังไม่ได้วัดจริง)

## เรื่องที่ต้องตัดสินใจก่อนเริ่ม

1. ฟอนต์: ใช้ชุดเดียวกับต้นฉบับ (Space Grotesk + Inter + Caveat + JetBrains Mono จาก Google Fonts) หรือใช้ Funnel Display / Inter Tight / Anakotmai ที่โปรเจกต์มีอยู่แล้ว. ค่า clamp ทั้งหมดคำนวณจาก Space Grotesk ถ้าเปลี่ยนฟอนต์ต้องปรับ line-height/letter-spacing ใหม่. ภาษาไทยต้องมีฟอนต์ไทยเพิ่มอยู่แล้ว (Anakotmai ที่มีอยู่เป็นตัวเลือกตรง)
2. kit นี้จะอยู่แยกจาก design system เดิมของโปรเจกต์ (`design-system.css`, `story-cards.css`) ด้วย prefix `kn-` ของตัวเอง หรือจะรวม token เข้ากับ `variables.css` เดิม. ข้อเสนอ: แยกก่อน ค่อย merge token ทีหลังเมื่อเห็นว่าอะไรซ้ำ
3. ภาพ/วิดีโอ: ของต้นฉบับเป็น mockup ของ Knocket ใช้ได้แค่ placeholder ระหว่างทำ ต้องเตรียมของเราเองก่อนขึ้นจริง (ดาวน์โหลดไว้แล้วใน scratchpad 30 รูป + ขนาดวิดีโอ 5 ไฟล์ใน 02)
4. cursor กำปั้น + เสียงเคาะ: จะเอาไหม (เป็น branding ของ Knocket ชัดมาก ถ้าเอาควรวาด SVG ใหม่เป็นของเรา)

## ข้อควรระวังที่พบ (รายละเอียดใน 01-03)

- `.hr-button` มีนิยามซ้อน 4 รอบในต้นฉบับ ค่าที่สรุปไว้คือค่าสุดท้ายตามลำดับไฟล์ ควรยืนยันด้วย computed style ตอนทำข้อ 1
- Space Grotesk โหลดถึงน้ำหนัก 700 แต่ CSS ขอ 800/850 เบราว์เซอร์ faux-bold ให้ ถ้าอยากเหมือนเป๊ะต้องยอมรับ faux-bold หรือโหลดน้ำหนัก 700 แล้วปรับค่า
- Genre scene ไม่มีตัวไหน active ตอนโหลด (เห็นแต่คำ) ต้นฉบับตั้งใจแบบนั้น kit ควรมี option `initial`
- reveal ของ MediaSplit ย้อนกลับเมื่อเลื่อนขึ้น (toggleActions reverse) ต่างจาก section อื่นที่เล่นครั้งเดียว
- Lenis เปิดเฉพาะ wheel (`syncTouch:false`) มือถือยังเป็น native scroll
