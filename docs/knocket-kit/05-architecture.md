# 05 · Architecture sketch และแผนแบ่งงาน

ใช้ร่วมกับ `src/kit/types.ts` (contract ของข้อมูล) และ `00-proposal.md` (เหตุผล). ค่าทาง CSS/animation ทุกตัวดูใน `01`, `02`, `03`.

## การใช้งานจากฝั่งหน้า (เขียนก่อน แล้วค่อย derive ชนิดข้อมูล)

```astro
---
// src/pages/v2/index.astro
import KitLayout from '../../kit/KitLayout.astro';
import { sections } from '../../kit/components/registry';
import { homeTh } from '../../kit/content/home';   // PageSpec + NavSpec + FooterSpec จาก i18n
const { page, nav, footer, meta } = homeTh;
---
<KitLayout {meta} {nav} {footer}>
  {page.map(({ type, props }) => { const Section = sections[type]; return <Section {...props} />; })}
</KitLayout>
```

`KitLayout` ใส่ `<Nav>` ก่อน slot และ `<Footer>` หลัง slot, โหลด `kit/styles/main.css`, ฟอนต์, และ `<script>` ที่เรียก `initKit(document, options)`. ไม่ import `global.css` หรือ design system เดิม (kit แยกขาด)

## โครงไฟล์และเจ้าของ

```
src/kit/
  types.ts                     (เขียนแล้ว, contract)
  KitLayout.astro              W0
  styles/
    main.css                   W0  ประกาศ @layer reset, tokens, semantic, components, utilities
                                   และ @import ทุกไฟล์ด้านล่างไว้ล่วงหน้า (worker สร้างไฟล์เฉย ๆ ไม่แก้ main.css)
    reset.css                  W0
    tokens.css                 W0  --kn-* ทั้งหมดจาก 01
    typography.css             W0  .kn-kicker .kn-lead .kn-display-* + :lang(th) overrides
    fonts.css                  W0  Google Fonts link อยู่ใน KitLayout, @font-face Anakotmai ที่นี่
    components/
      button.css section-head.css                      W0
      nav.css nav-mobile.css locale.css footer.css     W1
      hero.css rail.css inbox.css final.css            W2
      media-split.css steps.css genre.css              W3
      cursor.css                                       W4
    utilities.css              W0 (.kn-visually-hidden เท่านั้น)
  components/
    Button.astro SectionHead.astro Media.astro         W0
    Nav.astro Footer.astro                             W1
    sections/Hero.astro Rail.astro Inbox.astro Final.astro      W2
    sections/MediaSplit.astro Steps.astro Genre.astro           W3
    registry.ts                W0 (map type → component; import ทั้ง 7 ตั้งแต่แรก, W2/W3 สร้างไฟล์ให้ตรงชื่อ)
  motion/
    index.ts behaviors/*.ts    W4
  demo/
    buttons.astro typography.astro                     W0
    nav.astro footer.astro                             W1
    hero.astro rail.astro inbox.astro final.astro      W2
    media-split.astro steps.astro genre.astro          W3
    motion.astro                                       W4
  content/
    home.ts                    W5  (PageSpec/NavSpec/FooterSpec th+en จาก i18n.ts)
src/pages/kit.astro            W0 สร้าง (import demo ทุกไฟล์ไว้ล่วงหน้า), W0 สร้าง stub ว่างของ demo ทุกไฟล์
src/pages/v2/index.astro       W5
src/pages/en/v2/index.astro    W5
src/utils/i18n.ts              W5 เท่านั้น (เพิ่ม key v2.*)
public/kit/                    W5 (ภาพ placeholder และภาพของเรา)
```

กติกา: worker สร้างไฟล์ที่ตนเป็นเจ้าของเท่านั้น ไม่แตะ `main.css`, `registry.ts`, `kit.astro` (W0 ประกาศชื่อไฟล์ทั้งหมดไว้แล้ว). ถ้า token ขาด ให้เพิ่มใน `tokens.css` ได้ (เป็นไฟล์เดียวที่ W1-W4 แก้ร่วมกัน ใช้ `git add -p`-style surgical edit และ commit ทันที)

## DOM contract (data-kn-*) ที่ markup (W2/W3) และ motion (W4) ต้องตรงกัน

| section | attribute |
|---|---|
| ทุก section | `<section data-kn-section="hero|rail|inbox|mediaSplit|steps|genre|final" id?>` |
| Hero | `[data-kn-parallax="hero-art"]` บน figure ของภาพ |
| Rail | `[data-kn-rail]` บน section, `[data-kn-rail-viewport]`, `[data-kn-rail-track]` (ลูกคือการ์ด), ปุ่ม `[data-kn-rail-prev]` `[data-kn-rail-next]`. CSS ของ rail ต้องทำงานเป็น scroll-snap ได้เองเมื่อไม่มี JS (`overflow-x:auto; scroll-snap-type:x mandatory` บน viewport) และเมื่อ JS โหมด drag จะใส่ class `kn-rail--drag` บน section เพื่อสลับเป็น `overflow:hidden` |
| MediaSplit | `[data-kn-reveal]` บน article, `[data-kn-reveal-item]` บนลูกของ copy ทุกตัวและบนกรอบ media; `video[data-kn-video]` |
| Steps | `[data-kn-plop]` บน stage, `[data-kn-plop-item]` บนการ์ด (style `--i`, `--rest-r`, `--step-bg`), `[data-kn-step-note]`, `[data-kn-blob]` |
| Genre | `[data-kn-genre]` บน section, `[data-kn-genre-item="i"]` บน button, `[data-kn-scene="i"]` บน scene; class state `is-active` |
| Nav | `details[data-kn-locale]`, `details[data-kn-mobile-nav]` |
| cursor | ไม่มี markup, JS สร้าง `.kn-cursor` เอง; `[data-kn-cursor="TEXT"]` บน element ที่อยากเปลี่ยน label |

reduced motion: CSS ของทุก section ต้องให้ผลลัพธ์สุดท้ายที่ถูกต้องเมื่อไม่มี JS เลย (ไม่มี element ซ่อนรอ JS มาเปิด ยกเว้น genre scene ที่ตั้งใจให้ว่าง) และ `@media (prefers-reduced-motion: reduce)` ปิด animation/transition ใน layer components ของตัวเอง

## ฟอนต์และภาษาไทย

- `--kn-font-display: 'Space Grotesk', 'Anakotmai', sans-serif` และ `--kn-font-sans: 'Inter', 'Anakotmai', sans-serif`. Space Grotesk/Inter ไม่มีอักษรไทย เบราว์เซอร์จะ fallback ไป Anakotmai ให้เองตามตัวอักษร
- หัวข้อภาษาไทยมีสระบน-ล่าง line-height .78-.85 ของต้นฉบับจะตัดสระ: `typography.css` ใส่ `:lang(th)` override ให้ display heading ใช้ `line-height:1.08; letter-spacing:-.02em` และ `.kn-lead:lang(th){line-height:1.6}`. ตรวจบน `/kit` ด้วยข้อความไทยจริง
- Google Fonts ขอ Space Grotesk 500;700, Inter 400;500;700;800, Caveat 700 (ขอเฉพาะน้ำหนักที่ CSS ใช้ ตาม css-guide)

## แผน throughput

1. Blocking: W0 foundation (ฐาน CSS, Button, SectionHead, Media, KitLayout, registry, kit.astro + stub ทุกไฟล์, npm i gsap lenis) → build ผ่าน + screenshot `/kit`
2. ขนาน (ไฟล์ไม่ซ้อนกัน): W1 nav/footer, W2 hero/rail/inbox/final, W3 media-split/steps/genre, W4 motion. แต่ละตัว build ผ่าน + screenshot demo ของตัวเองบน `/kit` ที่ 1440 และ 390 + commit
3. Shared state: `main.css`/`registry.ts`/`kit.astro` ประกาศล่วงหน้าโดย W0 จึงไม่มีการเขียนซ้อน. `tokens.css` เป็นไฟล์ร่วมเดียว แก้แบบเพิ่มบรรทัดเท่านั้น
4. W5 content: อ่าน `04-content-inventory.md` แล้วเขียน `content/home.ts` + หน้า `/v2` และ `/en/v2` + เติม `/kit` ด้วยเนื้อหาจริง → เทียบ screenshot ทั้งหน้ากับ knocket

การตรวจ: `npm run build` ต้องผ่าน, `npm run preview` แล้ว screenshot ด้วย headless Chrome (`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --screenshot=out.png --window-size=1440,900 http://localhost:4321/kit#<demo>`) ทั้ง desktop 1440 และ mobile 390 (`--window-size=390,844`)
