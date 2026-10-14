# 06 · หน้า v2: เนื้อหาเดิม → section ของ kit

ที่มา: `04-content-inventory.md` (เนื้อหาเว็บเดิมทั้งหมด) และ `src/kit/types.ts`. หน้า v2 อยู่ที่ `/v2/` (ไทย, `useTranslations('th')`) และ `/en/v2/` (อังกฤษ). เนื้อหาทุกชิ้นดึงจาก `src/utils/i18n.ts` ผ่าน `t()` ไม่คัดลอกข้อความลงหน้า. key ใหม่ที่ต้องเพิ่มใน i18n.ts ขึ้นต้นด้วย `v2.`

## การตัดสินใจ

- ข้อความ hero ใช้ `hero.headline1/2` ("Find good problems." / "Make good apps.") ซึ่งมีทั้ง th/en และเป็น brand line ใน `footer.tagline` แทนข้อความ "Digital Product Design Agency" ที่ hardcode ภาษาอังกฤษไว้ในหน้าเดิม
- รูปทั้งหมดเป็นของเราเอง (`public/illustrations/step1-3.png`, `src/assets/images/blocks/*.png` คัดลอกไป `public/kit/img/`, `public/walk-thailand-market.jpg`) ยกเว้นรูป deliverables/showcase ที่หน้าเดิม hot-link จาก Unsplash/Pexels ให้ใช้ URL เดิมต่อ (เครดิตอยู่ใน alt)
- รูปของเรามีพื้นหลังขาว/เทาอ่อน ไม่ใช่ PNG โปร่งใสแบบ knocket: hero art จึงต้องอยู่ในกรอบขาวมุมมน (`frame: true`), การ์ด rail มี media frame ขาวอยู่แล้ว, step card ใช้ `mix-blend-mode: multiply` อยู่แล้ว
- YouTube video ของ Who We Are ไม่มีใน MediaSplit (รับเฉพาะ mp4) ใช้รูปตลาดแทน และจด video id `CDv3bwUVK7Y` ไว้ใน inventory
- showcase entry เป็นอังกฤษอย่างเดียว หน้าไทยแสดงอังกฤษตามที่เขียนไว้; challenge/solution/results ที่เคยอยู่ใน modal ไม่ได้ขึ้นหน้า v2 (บันทึกเป็นงานค้าง: หน้า `/v2/showcase/<slug>`)
- ลิงก์ CTA ทั้งหมดชี้ `#contact` (section Final) ยกเว้น CTA ใน Final ชี้ `mailto:usableapp.co@gmail.com`; ไม่มีลิงก์ตาย `#` แบบหน้าเดิม

## การเพิ่ม prop (additive เท่านั้น ใน `types.ts` และ component ที่เกี่ยว)

| type | prop ใหม่ | render |
|---|---|---|
| `HeroProps` | `frame?: boolean` | `.kn-hero__art--framed`: กรอบขาว radius var(--kn-r-lg) padding 24px เงา media |
| `RailCard` | `cta?` (เดิมบังคับ) | ไม่มี cta ก็ไม่ render `.kn-card__cta` |
| `InboxProps` | `body?: string[]`, `items?: {title: string; desc: string}[]` | ย่อหน้า `.kn-inbox__body` (lead บนพื้นเข้ม, `--kn-on-dark`) และ `.kn-inbox__items` grid 3 คอลัมน์ (1 คอลัมน์ ≤720) การ์ดโปร่ง `rgba(255,255,255,.08)` radius 20 padding 20 ใต้ heading |
| `GenreProps` | `heading?: string` | `.kn-genre__heading` (`.kn-display-lg`) ระหว่าง kicker กับ list |
| `GenreItem` | `desc?: string` | `.kn-genre__desc` ใต้ list แสดงเฉพาะ item ที่ `is-active` (CSS: ซ่อน/แสดงด้วย `[data-kn-genre-desc="i"]` + `is-active` ที่ motion toggle พร้อมกับ item) |
| `StepsProps` | `body?: string[]` | ย่อหน้า `.kn-steps__body` (lead) ใต้ head ก่อน stage |
| `FinalProps` | `body?: string`, `items?: {title: string; desc: string}[]` | `.kn-final__body` (lead, on-dark) และ `.kn-final__items` 2 การ์ดโปร่งเรียงแนวนอน (แนวตั้ง ≤720) ก่อนปุ่ม |

## Nav (`NavSpec`) ทั้ง 2 ภาษา

- brand: `site.title`, href `/v2/` (th) หรือ `/en/v2/` (en), logo `/kit/logo.svg` (คัดลอกจาก `src/assets/images/logo.svg` แล้วเปลี่ยน fill เป็น `#06150e`)
- items:
  1. group `nav.whatWeDo` → 1 คอลัมน์: `whoWeAre.title` (#what-we-do, desc `whoWeAre.eyebrow`), `process.title` (#how-it-works, desc `process.eyebrow`), `deliverables.d1.title` (#deliverables, desc `deliverables.d1.eyebrow`), `deliverables.d2.title` (#deliverables, desc `deliverables.d2.eyebrow`)
  2. group `v2.nav.insights` (th "แนวคิด", en "Insights") → 2 คอลัมน์: หัว `philosophy.eyebrow` → `philosophy.title` (#philosophy) + 4 ข้อ philosophy.*.title (#philosophy); หัว `methodology.eyebrow` → `methodology.title` (#methodology) + 4 ข้อ methodology.step1-4 (#methodology)
  3. link `showcase.eyebrow` → #showcase
  4. link `nav.howItWorks` → #how-it-works
- cta: `nav.contact` → #contact
- locales: `ไทย` → `/v2/`, `English` → `/en/v2/` (current ตามหน้า)

## Page (`PageSpec`) เรียงตามนี้

| # | type | id | props จาก i18n |
|---|---|---|---|
| 1 | hero | | lines `[hero.headline1, hero.headline2]`; lead `hero.subheadline`; cta `{hero.cta, '#contact'}`; note `{title: site.title, label: v2.hero.note (th "ตั้งอยู่ที่กรุงเทพฯ →", en "Based in Bangkok, Thailand →"), href '#contact'}`; image `/illustrations/step2.png` (alt "User discovery illustration") `loading: 'eager'`; `frame: true` |
| 2 | inbox | what-we-do | kicker `whoWeAre.eyebrow`; heading `whoWeAre.title`; body `[whoWeAre.desc1, whoWeAre.desc2]`; items `[{approach.title, approach.desc}, {promise.title, promise.desc}, {focus.title, focus.desc}]`; cta `{contact.cta, '#contact'}`; image `/walk-thailand-market.jpg` |
| 3 | rail | how-it-works | kicker `process.eyebrow`; heading `process.title`; (SectionHead note `process.subtitle` → เพิ่ม `note?` ใน RailProps ถ้ายังไม่มี); cards: index `process.stepN.eyebrow`, title `process.stepN.title`, desc `process.stepN.description`, tone lime/forest/mint, image `/illustrations/stepN.png` (alt จาก inventory 2.3), ไม่มี cta |
| 4 | mediaSplit | deliverables | kicker `deliverables.d1.eyebrow`; heading `deliverables.d1.title`; body `deliverables.d1.description`; media image Unsplash `photo-1541462608143-67571c6738dd` (alt ตาม inventory); tone 1; ratio demo |
| 5 | mediaSplit | | d2: reversed; tone 2; ratio feature; tilt; media Pexels `7947636` |
| 6 | genre | philosophy | kicker `philosophy.eyebrow`; heading `philosophy.title`; items 4: label `philosophy.{hierarchy,flow,language,tested}.title`, desc `.desc`, images 2 ต่อ scene จาก `/kit/img/{vision,process,validation,community,deliverables}.png` และ `/illustrations/step{1,2,3}.png` (สลับให้ไม่ซ้ำ) |
| 7 | steps | methodology | kicker `methodology.eyebrow`; heading `methodology.title`; body `[methodology.desc1, methodology.desc2]`; steps 4: title `methodology.stepN`, desc `methodology.stepN_desc`, image `/kit/img/{vision,process,validation,deliverables}.png` |
| 8 | rail | showcase | kicker `showcase.eyebrow`; heading `showcase.title`; note `showcase.subtitle`; cards จาก `getCollection('showcase')` เรียง `order`: index `0N`, title, desc = subtitle, image = entry.image (ถ้าเป็น `/walk-thailand-market.jpg` ใช้ local), tone วน lime/mint/forest, ไม่มี cta |
| 9 | final | contact | kicker `getStarted.eyebrow`; heading `getStarted.title`; body `getStarted.desc`; items `[{getStarted.session1, session1_desc}, {getStarted.session2, session2_desc}]`; cta `{getStarted.cta, 'mailto:usableapp.co@gmail.com'}` |

## Footer (`FooterSpec`)

- brand `site.title` + tagline `footer.tagline`
- columns: (1) `v2.footer.sections` (th "ส่วนต่าง ๆ", en "Sections") → ลิงก์ 7 anchor ตามตาราง; (2) `nav.contact` → `+66 61 831 7773` (`tel:+66618317773`), `usableapp.co@gmail.com` (`mailto:`), `contact.address` (แสดงเป็นข้อความ 2 บรรทัด ไม่ใช่ลิงก์: เพิ่ม `text?` ใน NavLink หรือใส่ href `#contact`); (3) `v2.footer.language` (th "ภาษา", en "Language") → ไทย `/v2/`, English `/en/v2/`
- copyright: `${site.title} © ${ปีปัจจุบัน}`; legal: ว่าง; watermark "USABLE"

## meta

title `${site.title} - ${site.tagline}`, description `hero.subtitle`, lang ตามหน้า. KitLayout options: `{ cursor: 'none' }` (ตัดสินไว้ใน 00-proposal), ที่เหลือ default
