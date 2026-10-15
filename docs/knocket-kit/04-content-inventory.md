# 04 · Content inventory of the current usableapp site

Scope: read-only inventory of the Astro project in this worktree, taken 2026-10-15. Source of truth is the code, not the built `dist/`. Thai and English strings below are generated verbatim from `src/utils/i18n.ts` by script, so they can be pasted into the v2 page. Line numbers refer to files in this worktree.

**Read this first (three facts that change the rebuild plan):**

1. The Thai page does not render Thai copy. Both `src/pages/index.astro:20` and `src/pages/en/index.astro:19` call `useTranslations("en")`. The `th` dictionary is complete but is only consumed by `Layout.astro` for the Thai `<meta name="description">`. `dist/index.html` confirms it: `<html lang="th">`, Thai meta description, English body.
2. The root page (`/`) and the English page (`/en/`) are two different hand-copied pages, not one page in two languages. Root has a hardcoded English hero and hardcoded bullets. The en page uses `hero.title` and `whoWeAre.desc1/2`. The showcase modal exists only on the root page.
3. The `src/components/*.astro` files (Header, Hero, WhatWeDo, HowItWorks, Showcase, Pricing, Contact, Card) are imported by no page. They hold a second, newer copy set ("Find good problems. Make good apps.", Foundation Discovery, Two meetings, Project Alpha/Beta placeholders) that never ships. They are inventoried in section 2B because the v2 brief may want that positioning.

---

## 1. Site identity

| Item | Value | Source |
|---|---|---|
| Name | Usable App Co. (also "Usable App company" in root hero, "Usable App Co." in Contact component logo) | `site.title` |
| Tagline (i18n) | Business Requirements Consulting | `site.tagline` |
| Tagline (Contact component back of card) | Digital Product Design Consultants | `Contact.astro:40` |
| Brand line (components) | Find good problems. / Make good apps. | `hero.headline1/2`, `footer.tagline` |
| Root hero line | Digital Product Design Agency (+ "Usable App company. Based in Bangkok, Thailand.") | `index.astro:46-58` |
| `<title>` | `Usable App Co. - Business Requirements Consulting` (both languages; default prop in Layout) | `Layout.astro:12` |
| Meta description / og:description | `hero.subtitle` in the page language of the URL (th at `/`, en at `/en`) | `Layout.astro:13` |
| og:type | website. No og:image, no twitter card, no canonical, no hreflang | `Layout.astro:23-26` |
| Favicon | `/favicon.svg` | `Layout.astro:29` |
| Third-party CSS | Font Awesome 6.4.0 from cdnjs (only used by the unused components; pages use `@lucide/astro`) | `Layout.astro:32` |

### Languages and routing

- `astro.config.mjs`: `i18n.defaultLocale = "th"`, `locales = ["th","en"]`, `prefixDefaultLocale = false`. So Thai at `/`, English at `/en/`.
- `getLangFromUrl` reads the first path segment. `Layout.astro` sets `<html lang>` from it. Page bodies ignore it (see fact 1 above).
- Other routes: `/kitchen-sink` (design-system demo), `/palettes` (colour options page). Neither is marketing content.
- `package.json` also lists `astro-i18next`, `i18next`, `react-i18next`. None are used; the hand-rolled `useTranslations` is the only i18n.

### Navigation links

The shipped pages have **no nav bar and no header component**. The only header is the big hero. The unused `Header.astro` defines the intended nav:

| i18n key | Thai (th) | English (en) |
|---|---|---|
| `site.title` | `Usable App Co.` | `Usable App Co.` |
| `site.tagline` | `Business Requirements Consulting` | `Business Requirements Consulting` |
| `nav.whatWeDo` | `เราทำอะไร` | `What We Do` |
| `nav.howItWorks` | `ขั้นตอนการทำงาน` | `How It Works` |
| `nav.pricing` | `ราคา` | `Pricing` |
| `nav.contact` | `ติดต่อเรา` | `Get in Touch` |


| Position | Label (th) | Label (en) | href |
|---|---|---|---|
| logo | `site.title` | `site.title` | `/` (th) or `/en/` (en) |
| 1 | เราทำอะไร | What We Do | `#what-we-do` |
| 2 | ขั้นตอนการทำงาน | How It Works | `#how-it-works` |
| 3 | ราคา | Pricing | `#pricing` |
| lang toggle | EN (on th) / TH (on en) | same | `/en/` or `/` |
| CTA link | ติดต่อเรา | Get in Touch | `#contact` |
| mobile | hamburger button, `aria-label="Toggle menu"`, Font Awesome `fa-bars` | | |

Those anchors (`#what-we-do`, `#how-it-works`, `#pricing`, `#contact`) do not exist on the shipped pages (only the unused components define them). The mapping to the v2 nav needs a fresh decision.

### Footer

Shipped footer (both pages, `index.astro:438-440`): one line, `{t("site.title")} © {new Date().getFullYear()}` which renders "Usable App Co. © 2026" in English. No links.

Unused `Contact.astro:92-97` footer: `© Usable App Co. {year}` and "Find good problems. Make good apps." i18n has `footer.copyright` = "Usable App Co. © 2025" and `footer.tagline`, both unused by pages.

### Contact info (hardcoded, same on both pages, `index.astro:381-383`)

| Field | Value | Href in markup |
|---|---|---|
| Phone | +66 61 831 7773 | none on pages (plain `<p>`). Unused Contact component uses `tel:+66618317773` |
| Email | usableapp.co@gmail.com | none (plain text, no `mailto:`). Hardcoded, not in i18n |
| Address th | `36 ทวีวัฒนา 47\nทวีวัฒนา กรุงเทพฯ 10170` | `contact.address` (pages use the en value) |
| Address en | `36 Thawiwattana 47\nBangkok 10170` | `contact.address` |
| Company on card | `site.title`, `site.tagline` | |
| Social links | none anywhere | |
| Map link | none | |
| Contact form | none | |

---

## 2. Section-by-section inventory of the current home page

Order below is the render order of `src/pages/index.astro` (root, th route). Where `/en/` differs it is flagged. All section containers are `story-card` blocks inside `<section class="content-sections">`, a flex-wrap grid with width helpers `w-100`, `w-50`, `w-33`. Icons are `@lucide/astro` components (Rocket, Lightbulb, Target, Users, CheckCircle, FileText, Sparkles, Brain, Maximize2); these are UI icons, not content.

Order at a glance:

| # | Section | Root `/` | `/en/` |
|---|---|---|---|
| 1 | Hero | hardcoded English "Digital Product Design Agency" | `hero.title` + `hero.subtitle` |
| 2 | Who We Are (video background card) | title from i18n, 3 hardcoded bullets | title + `desc1` + `desc2` |
| 3 | Our Process (3 steps) | same | same |
| 4 | Deliverable 1 (split card) | same | same |
| 5 | Deliverable 2 (split card, image left) | same | same |
| 6 | Philosophy (4 checks over photo) | same | same |
| 7 | Methodology, AI-accelerated (split + 4 steps) | same | same |
| 8 | Showcase (5 expandable cards + modal) | modal works | cards render, no modal markup or script, click does nothing |
| 9 | Approach / Promise / Focus (3 icon cards) | same | same |
| 10 | Get Started (CTA split card) | same | same |
| 11 | Business card (flip card, contact) | same | same |
| 12 | Footer | same | same |

Note: the HTML comments in the source number the sections 1,2,6,7,8,9,10,11,12 (3-5 were removed), so the labels in the source do not match the table above.

### 2.1 Hero (`index.astro:29-59`)

Root page, hardcoded English, **not in i18n**:

- Decorative: 3 floating gradient circles (gold, cyan/teal, purple), 8% opacity, CSS only.
- Logo: inline SVG mark, viewBox 438x659, same as `src/assets/images/logo.svg` (two shapes, `currentColor`, navy, gold on hover). Pasted inline three times (hero, card front, card back).
- Location line (uppercase, right aligned): `Usable App company. Based in Bangkok, Thailand.`
- H1 in three lines: `Digital Product` / `Design` (script font, gold gradient) / `Agency`
- Tagline: `We are specialised in transforming complex ideas into simple, intuitive products through strategic design consultancy.` (the three phrases "complex ideas", "simple, intuitive products", "strategic design consultancy" are emphasised spans)
- CTA: none in the hero.
- Fonts used here: Playfair Display (headline), Dancing Script (the word "Design"), Inter Tight (location, tagline).

`/en/` hero (`en/index.astro:28-44`): logo SVG, then `<h1 style="white-space: pre-line">{t("hero.title")}</h1>` and `<p class="subtitle">{t("hero.subtitle")}</p>`. No CTA. Keys:

| i18n key | Thai (th) | English (en) |
|---|---|---|
| `hero.title` | `Better make the <span class="accent">App</span>\nthat's actually <span class="accent">Usable</span>.` | `Create the <span class="accent">App</span>\nthat's actually <span class="accent">Usable</span>.` |
| `hero.subtitle` | `ที่ปรึกษาเชิงกลยุทธ์ที่ช่วยคุณค้นหา ตรวจสอบ และออกแบบผลิตภัณฑ์ที่ผู้ใช้รักและธุรกิจต้องการ` | `Strategic consultants helping you discover, validate and design products that users love and businesses need.` |


Other hero keys exist in i18n and in the unused `Hero.astro` component (headline "Find good problems. / Make good apps.", subheadline, CTA button "Book Your Free Brief" linking to `#contact`), but no shipped page renders them:

| i18n key | Thai (th) | English (en) |
|---|---|---|
| `hero.headline1` | `Find good problems.` | `Find good problems.` |
| `hero.headline2` | `Make good apps.` | `Make good apps.` |
| `hero.subheadline` | `เราช่วย startups และ SMEs ค้นหาสิ่งที่ธุรกิจต้องการจริงๆ—ก่อนจะเริ่มเขียนโค้ดแม้แต่บรรทัดเดียว` | `We help startups and SMEs discover what their business really needs—before writing a single line of code.` |
| `hero.cta` | `จองคิวรับคำปรึกษาฟรี` | `Book Your Free Brief` |


### 2.2 Who We Are (`index.astro:58-90`)

- Layout: full width card with a looping muted autoplay YouTube background. No image.
- Video: `https://www.youtube.com/embed/CDv3bwUVK7Y?autoplay=1&mute=1&loop=1&playlist=CDv3bwUVK7Y&controls=0&...&origin=http://localhost:4321&widget_referrer=http://localhost:4321` (YouTube id `CDv3bwUVK7Y`). The `origin` and `widget_referrer` are hardcoded to localhost; fix in the rebuild. `loading="lazy"`, `pointer-events: none`.
- Eyebrow, H2 (inline `font-size: 3rem`) from i18n.
- Root body (hardcoded English bullets, **not in i18n**):
  - `Strategic discussion and planning over several weeks`
  - `Transform concepts into actionable solutions`
  - `UX expertise for usability and effectiveness`
- `/en/` body: two paragraphs `whoWeAre.desc1`, `whoWeAre.desc2` (below). Root does not show them.
- CTA: none.

| i18n key | Thai (th) | English (en) |
|---|---|---|
| `whoWeAre.eyebrow` | `เราคือใคร` | `Who We Are` |
| `whoWeAre.title` | `ออกแบบผลิตภัณฑ์ดิจิทัลด้วยกลยุทธ์` | `Here's to Your Next Product/Platform…` |
| `whoWeAre.desc1` | `เรามองว่าโทรศัพท์มือถือและแท็บเล็ตเป็นเหมือนประตูสู่บริษัทของคุณ—เป็นช่องทางสู่บริการที่คุณต้องการมอบให้ผู้ใช้ เพื่อให้ชีวิตของพวกเขาง่ายขึ้นผ่านผลิตภัณฑ์ของคุณ` | `We see mobile phones and tablets as portals to your company—gateways to the services you want to offer users, making their lives easier through your product.` |
| `whoWeAre.desc2` | `เรารู้วิธีทำ เรามีกระบวนการที่ช่วยคุณเปลี่ยนไอเดียให้เป็นแอปที่บรรลุเป้าหมายการบริการของคุณ ผู้ใช้สามารถใช้งานได้อย่างเป็นธรรมชาติ โดยไม่ต้องมีส่วนช่วยเหลือ` | `We know how to do it. We have a process that helps you transform ideas into apps that achieve your service goals. Users can navigate them intuitively, without needing help sections.` |


### 2.3 Our Process, three steps (`index.astro:93-153`)

Header (eyebrow, H2, subtitle) then 3 vertical cards. Each card: a "chalk" handwritten word (Caveat font, from `process.stepN.chalk`) overlaid on an illustration, a Lucide icon, eyebrow, title, description. Card colours: `bg-navy`, `bg-warm`, `bg-forest`. No CTAs.

| Step | Card bg | Chalk word | Icon | Image | alt text |
|---|---|---|---|---|---|
| 1 | bg-navy | Briefing (blue) | Lightbulb | `/illustrations/step1.png` (1178x768) | Strategic planning illustration |
| 2 | bg-warm | Checking (rose) | Users | `/illustrations/step2.png` (1181x768) | User discovery illustration |
| 3 | bg-forest | Refining (green) | FileText | `/illustrations/step3.png` (1181x768) | Product deliverables illustration |

Note the Thai eyebrows label the steps "เข้าใจไอเดีย / เข้าใจความต้องการ / ผลลัพธ์" while English labels them "Requirement / Refinement / Deliverables". The Thai step 2 title ("ช่วยคุณลงลึก") and eyebrow are not literal translations; keep both sets as authored.

| i18n key | Thai (th) | English (en) |
|---|---|---|
| `process.eyebrow` | `กระบวนการของเรา` | `Our Process` |
| `process.title` | `เราทำงานอย่างไร` | `How We Work` |
| `process.subtitle` | `ระเบียบวิธีที่ผ่านการพิสูจน์แล้วซึ่งเปลี่ยนไอเดียที่ซับซ้อนให้เป็นผลิตภัณฑ์ที่ใช้งานได้จริง สามขั้นตอนที่ชัดเจนตั้งแต่ความต้องการไปจนถึงผลลัพธ์` | `A proven methodology that transforms complex ideas into usable products. Three clear steps from requirement to deliverables.` |
| `process.step1.eyebrow` | `ขั้นตอนที่ 1: เข้าใจไอเดีย` | `Step 1: Requirement` |
| `process.step1.title` | `เข้าใจคุณ` | `Understanding Intention` |
| `process.step1.description` | `เราจะเริ่มจากทำความเข้าใจความตั้งใจของคุณในการสร้างผลิตภัณฑ์ดิจิทัลนี้—ไม่ว่าจะเป็นสำหรับลูกค้า ผู้คน หรือทีมของคุณ—เพื่อให้แน่ใจว่าวัตถุประสงค์นั้นชัดเจนตั้งแต่เริ่มต้น` | `We understand your intention to make this digital product—whether it's for customers, people, or your team—to ensure the purpose is clear from the start.` |
| `process.step1.chalk` | `Briefing` | `Briefing` |
| `process.step2.eyebrow` | `ขั้นตอนที่ 2: เข้าใจความต้องการ` | `Step 2: Refinement` |
| `process.step2.title` | `ช่วยคุณลงลึก` | `Deep dive to Why` |
| `process.step2.description` | `เราเจาะลึกถึง "ทำไม" เพื่อให้เห็นภาพรวมว่าทุกอย่างเป็นอย่างไร เพื่อให้แน่ใจว่าทุกรายละเอียดสอดคล้องกับกลยุทธ์หลักที่คุณตั้งใจวางไว้อย่างดี` | `We deep dive into the "why" to get the full picture of how everything's going on, ensuring every detail aligns with the core strategy.` |
| `process.step2.chalk` | `Checking` | `Checking` |
| `process.step3.eyebrow` | `ขั้นตอนที่ 3: ผลลัพธ์` | `Step 3: Deliverables` |
| `process.step3.title` | `นำเสนอและส่งมอบงาน` | `Actionable PRD` |
| `process.step3.description` | `เราช่วยคุณเปลี่ยนความต้องการทางเทคนิคให้เป็น PRD ที่นำไปใช้ได้เลยซึ่งคุณสามารถไว้วางใจได้—เพื่อให้มั่นใจว่าไม่เพียงแค่ทำงานได้ แต่ยังเพิ่มประสบการณ์ผู้ใช้และพร้อมใช้งาน` | `We help you shape technical requirements into an actionable PRD you can trust—ensuring it's not only working but user experience enhanced and ready to use.` |
| `process.step3.chalk` | `Refining` | `Refining` |


### 2.4 Deliverable 1 and 2 (`index.astro:150-188`)

Two half-width (`w-50`) split cards side by side. D1: text left, image right, `bg-sunset`, Lightbulb. D2: image left, text right, `bg-cool`, FileText. No CTAs.

| Card | Image URL | alt | Rights note |
|---|---|---|---|
| D1 | `https://images.unsplash.com/photo-1541462608143-67571c6738dd?crop=entropy&cs=srgb&fm=jpg&q=85` | Design prototypes on screens - Photo by UX Store on Unsplash | Unsplash credit in alt |
| D2 | `https://images.pexels.com/photos/7947636/pexels-photo-7947636.jpeg` | Product requirement documents - Photo by RDNE Stock project on Pexels | Pexels credit in alt |

Both are hot-linked remote photos, not local files; dimensions are not recorded in the repo.

| i18n key | Thai (th) | English (en) |
|---|---|---|
| `deliverables.d1.eyebrow` | `ผลลัพธ์ 1` | `Deliverable 1` |
| `deliverables.d1.title` | `แนวคิดการออกแบบผลิตภัณฑ์` | `Product Design Concepts` |
| `deliverables.d1.description` | `ต้นแบบเชิงโต้ตอบที่มีความละเอียดสูงซึ่งแสดงประสบการณ์ผู้ใช้ทั้งหมดและตรวจสอบการตัดสินใจในการออกแบบ` | `High-fidelity interactive prototypes that demonstrate the full user experience and validate design decisions.` |
| `deliverables.d2.eyebrow` | `ผลลัพธ์ 2` | `Deliverable 2` |
| `deliverables.d2.title` | `เอกสารความต้องการผลิตภัณฑ์ (PRD)` | `Product Requirement Document` |
| `deliverables.d2.description` | `เอกสารมาตรฐานที่แนะนำทีมพัฒนาของคุณผ่านการนำไปใช้งานจริงด้วยความชัดเจนและแม่นยำ` | `Standardized documentation that guides your development team through implementation with clarity and precision.` |


### 2.5 Philosophy (`index.astro:190-236`)

Full width card, min-height 500px, background photo, eyebrow + H2, then a 4-item grid. Each item: CheckCircle icon + H4 + one-line paragraph. No CTAs.

- Background image: `https://images.unsplash.com/photo-1663408319620-3551f425c81e?crop=entropy&cs=srgb&fm=jpg&q=85` (CSS background, no alt). Same URL is used as the Healthcare showcase image.

| i18n key | Thai (th) | English (en) |
|---|---|---|
| `philosophy.eyebrow` | `ปรัชญาของเรา` | `Our Philosophy` |
| `philosophy.title` | `อะไรที่ทำให้แอปใช้งานได้จริง?` | `What Makes an App Truly Usable?` |
| `philosophy.hierarchy.title` | `ลำดับความสำคัญที่ชัดเจน` | `Clear Hierarchy` |
| `philosophy.hierarchy.desc` | `จัดลำดับความสำคัญของเนื้อหาเพื่อให้ผู้ใช้รู้ว่าควรเริ่มต้นที่ไหน` | `Content prioritized so users know where to start` |
| `philosophy.flow.title` | `ลำดับขั้นตอนที่เป็นธรรมชาติ` | `Intuitive Flow` |
| `philosophy.flow.desc` | `ทำงานเสร็จได้โดยไม่ต้องอ่านคำแนะนำ` | `Tasks completed without reading instructions` |
| `philosophy.language.title` | `ภาษาที่เข้าใจง่าย` | `Simple Language` |
| `philosophy.language.desc` | `ไม่มีศัพท์เฉพาะ มีเพียงการสื่อสารที่ชัดเจน` | `No jargon, just clear communication` |
| `philosophy.tested.title` | `ผ่านการทดสอบกับผู้ใช้` | `User-Tested` |
| `philosophy.tested.desc` | `ตรวจสอบกับคนจริงๆ ไม่ใช่ข้อสมมติฐาน` | `Validated with real people, not assumptions` |


### 2.6 Methodology, AI-accelerated (`index.astro:238-279`)

Full width split card, `bg-fire`, min-height 500px. Left: Brain icon, eyebrow, H2, two paragraphs, a 4-step list (`strong` title + `span` description). Right: photo. No CTAs.

- Image: `https://images.unsplash.com/photo-1580982330720-bd5e0fed108b?crop=entropy&cs=srgb&fm=jpg&q=85`, alt "Design team reviewing prototypes - Photo by ThisisEngineering on Unsplash".

| i18n key | Thai (th) | English (en) |
|---|---|---|
| `methodology.eyebrow` | `ระเบียบวิธีของเรา` | `Our Methodology` |
| `methodology.title` | `เร่งความเร็วด้วย AI, รังสรรค์โดยมนุษย์` | `AI-Accelerated, Human-Crafted` |
| `methodology.desc1` | `เราใช้ AI อย่างสมเหตุสมผล—หลังจากใช้เวลาหลายชั่วโมงในการทำความเข้าใจแนวคิดผลิตภัณฑ์ของคุณและเปลี่ยนเป็น PRD ที่ครอบคลุม เราใช้ AI เพื่อช่วยเราค้นหาแนวคิดการออกแบบต่างๆ จากไอเดียที่ผ่านการขัดเกลามาอย่างดี` | `We use AI reasonably—after spending hours understanding your product concept and turning it into a comprehensive PRD, we leverage AI to help us discover various design concepts from well-groomed ideas.` |
| `methodology.desc2` | `นี่คือเวลาที่ดีกว่าในการใช้ AI มากกว่าสิ่งอื่นใด เราโปร่งใส: เราใช้ AI แต่เพื่อวัตถุประสงค์ที่สมเหตุสมผล งานยังคงไม่ง่าย—หลังจากการรังสรรค์โดยมนุษย์และการคิดเชิงกลยุทธ์ AI ช่วยเราดราฟท์รูปแบบต่างๆ ให้คุณเห็นและเลือก` | `This is the better time to use AI than anything else. We're transparent: we use AI, but for reasonable purposes. The work is still not easy—after human craft and strategic thinking, AI helps us draft multiple variations for you to see and choose from.` |
| `methodology.step1` | `1. ความเข้าใจของมนุษย์` | `1. Human Understanding` |
| `methodology.step1_desc` | `เจาะลึกถึงแนวคิดผลิตภัณฑ์ของคุณ` | `Deep dive into your product concept` |
| `methodology.step2` | `2. PRD เชิงกลยุทธ์` | `2. Strategic PRD` |
| `methodology.step2_desc` | `สร้างความต้องการที่ละเอียด` | `Craft detailed requirements` |
| `methodology.step3` | `3. การสำรวจด้วย AI` | `3. AI Exploration` |
| `methodology.step3_desc` | `สร้างรูปแบบการออกแบบอย่างรวดเร็ว` | `Generate design variations quickly` |
| `methodology.step4` | `4. การปรับเกลาโดยมนุษย์` | `4. Human Refinement` |
| `methodology.step4_desc` | `ขัดเกลาและทำให้ตัวเลือกที่ดีที่สุดสมบูรณ์แบบ` | `Polish and perfect the best options` |


### 2.7 Showcase (`index.astro:279-308`, data from content collection, see section 3)

- Section header from i18n. Note that the English `showcase.title` is "What Makes an App Usable?", identical to `philosophy.title`; the Thai versions differ ("ตัวอย่างแอปที่ใช้งานได้จริง" vs "อะไรที่ทำให้แอปใช้งานได้จริง?").
- Grid of 5 cards from `getCollection("showcase")` sorted by `order`. Each card: cover image, overlay with `title` (h3), `subtitle`, and a button with a Maximize2 icon labelled `showcase.cta`.
- Root only: clicking a card opens a modal (`#showcaseModal`) built by inline JS with hero image, title, subtitle, "The Challenge", "Our Solution", "Results" (check list), close button "×", Esc and backdrop close. These three modal headings are **hardcoded English in the script** (`index.astro:1509-1519`), not in i18n.
- `/en/`: same cards, but the modal markup and the script are absent, so the CTA does nothing.
- The entries are English only (no Thai versions).

| i18n key | Thai (th) | English (en) |
|---|---|---|
| `showcase.eyebrow` | `ผลงานของเรา` | `Showcase` |
| `showcase.title` | `ตัวอย่างแอปที่ใช้งานได้จริง` | `What Makes an App Usable?` |
| `showcase.subtitle` | `ตัวอย่างจริงของผลิตภัณฑ์ที่เราได้เปลี่ยนโฉม คลิกที่การ์ดเพื่อสำรวจเรื่องราวฉบับเต็ม` | `Real examples of products we've transformed. Click any card to explore the full story.` |
| `showcase.cta` | `ดูตัวอย่างกรณีศึกษา` | `View Case Study` |


### 2.8 Approach, Promise, Focus (`index.astro:310-342`)

Three `w-33` icon cards in one row. Each card renders its title twice (once as the eyebrow, once as the H3), then a description. No CTAs.

| Card | bg | Icon | Title key | Desc key |
|---|---|---|---|---|
| 1 | bg-navy | Rocket | `approach.title` | `approach.desc` |
| 2 | bg-night | Target | `promise.title` | `promise.desc` |
| 3 | bg-sky | Sparkles | `focus.title` | `focus.desc` |

| i18n key | Thai (th) | English (en) |
|---|---|---|
| `approach.title` | `ทุกขั้นตอน ไปด้วยกัน` | `Every Step, Together` |
| `approach.desc` | `ตั้งแต่ไอเดียเริ่มต้นไปจนถึงระบบการออกแบบขั้นสุดท้าย เราอยู่กับคุณในทุกขั้นตอนของการวางแผนผลิตภัณฑ์` | `From initial idea to final design system, we're with you at every stage of product planning.` |
| `promise.title` | `ผลลัพธ์ที่เป็นมาตรฐาน` | `Standardized Deliverables` |
| `promise.desc` | `เอกสารที่ชัดเจนและสม่ำเสมอซึ่งทีมพัฒนาของคุณสามารถนำไปใช้งานได้จริง` | `Clear, consistent documentation that your development team can actually use.` |
| `focus.title` | `เน้นความเรียบง่าย` | `Simplicity First` |
| `focus.desc` | `เราทำให้เรื่องซับซ้อนเป็นเรื่องง่าย ไม่ใช่ทำเรื่องง่ายให้ซับซ้อน` | `We make complex simple, not simple complex.` |


### 2.9 Get Started, final CTA (`index.astro:344-380`)

Full width split card, `bg-sunset`, min-height 500px. Left: eyebrow (gold), H2, paragraph, two "meeting" blocks (bold title + description), CTA link. Right: photo.

- CTA: `getStarted.cta`, `href="#"` (a dead link; no booking URL, calendar, form, or `mailto:`).
- Image: `https://images.pexels.com/photos/8000652/pexels-photo-8000652.jpeg`, alt "Designer presenting concept - Photo by Pavel Danilyuk on Pexels".

| i18n key | Thai (th) | English (en) |
|---|---|---|
| `getStarted.eyebrow` | `เริ่มต้นกันเลย` | `Get Started` |
| `getStarted.title` | `มาทำให้แอปของคุณใช้งานได้จริงกันเถอะ` | `Let's Make Your App Usable` |
| `getStarted.desc` | `พร้อมที่จะเปลี่ยนไอเดียที่ซับซ้อนของคุณให้เป็นผลิตภัณฑ์ที่ใช้งานง่ายหรือยัง? เราเสนอเซสชันการค้นหาฟรีสองครั้งเพื่อให้แน่ใจว่าเราเหมาะสมกัน` | `Ready to transform your complex idea into an intuitive product? We offer two complimentary discovery sessions to ensure we're the right fit.` |
| `getStarted.session1` | `เซสชัน 1: การค้นหา (2 ชั่วโมง)` | `Session 1: Discovery (2 hours)` |
| `getStarted.session1_desc` | `เรารับฟังความท้าทายของคุณและสำรวจวิสัยทัศน์ผลิตภัณฑ์ของคุณร่วมกัน` | `We listen to your challenges and explore your product vision together.` |
| `getStarted.session2` | `เซสชัน 2: กลยุทธ์ (2 ชั่วโมง)` | `Session 2: Strategy (2 hours)` |
| `getStarted.session2_desc` | `เรานำเสนอแนวทาง ระยะเวลา และวิธีที่เราจะทำให้ผลิตภัณฑ์ของคุณใช้งานได้จริง` | `We present our approach, timeline, and how we'll make your product usable.` |
| `getStarted.cta` | `นัดหมายเซสชันการค้นหาฟรี` | `Schedule Free Discovery Sessions` |


### 2.10 Business card contact (`index.astro:382-436`)

A flip card (`.business-card`, front and back faces) outside the flex grid. The flip is a pure CSS hover (`.business-card:hover { transform: rotateY(180deg) }`, `index.astro:1191`), so on touch devices it has no click toggle; the click-toggle script lives only in the unused Contact component.

- Front: `site.title` (h3), `site.tagline`, then `+66 61 831 7773`, `usableapp.co@gmail.com`, `contact.address` (pre-line), a divider line, and the small logo SVG.
- Back: large logo SVG and `site.title`.
- None of the `contact.*` copy except `contact.address` is rendered by the shipped pages. The rest is in i18n for the unused Contact component:

| i18n key | Thai (th) | English (en) |
|---|---|---|
| `contact.eyebrow` | `พร้อมจะค้นหาปัญหาที่ใช่หรือยัง?` | `Ready to find the right problem?` |
| `contact.desc` | `มาค้นหาสิ่งที่ธุรกิจของคุณต้องการกันเถอะ คลิกที่นามบัตรเพื่อดูข้อมูลติดต่อของเรา` | `Let's discover what your business needs. Click the card to reveal our contact information.` |
| `contact.prompt` | `คลิกเพื่อดูข้อมูลติดต่อ` | `Click to reveal contact` |
| `contact.address` | `36 ทวีวัฒนา 47\nทวีวัฒนา กรุงเทพฯ 10170` | `36 Thawiwattana 47\nBangkok 10170` |
| `contact.cta` | `เริ่มวันแรกของแอปคุณกับเรา` | `Start your app's day-1 with us.` |
| `contact.call` | `โทรเลย` | `Call Now` |
| `contact.book` | `จองวันประชุม` | `Book a Meeting` |


### 2.11 Footer (`index.astro:438-440`)

`<footer class="footer"><p>Usable App Co. © {year}</p></footer>`. See section 1.

### 2.12 Scripts and overlays at the bottom of the root page (`index.astro:1448-1548`)

- `#blockOverlay` and `#blockExpanded` empty containers (leftover from an earlier "expanded block" design, unused).
- `#showcaseModal` and `<script id="showcaseData" type="application/json">` with title, subtitle, challenge, solution, results, image per entry.
- Inline script that wires the modal. Nothing else (no analytics, no tracking, no form submission).

---

## 2B. Unused component copy (never rendered by a page)

These live in `src/components/`. They show a newer positioning ("Find good problems. Make good apps.", free brief, then proposal, then BRS) that differs from the shipped "How we work" in three steps. If v2 is meant to represent current messaging, confirm which set is canonical. All English only, hardcoded (no i18n keys except those marked).

### Hero.astro
- H1: `Find good problems.` / `Make good apps.` (`hero.headline1/2`)
- Sub: `We help startups and SMEs discover what their business really needs—before writing a single line of code.`
- CTA: `Book Your Free Brief` -> `#contact`
- Visual: 3 CSS circles.

### WhatWeDo.astro (`#what-we-do`)
- H2: `Start with the right question.`
- Intro: `We don't just build what you ask for. We discover what your business actually needs.`
- Steps (number, title, body, deliverable line):
  1. `01` **Foundation Discovery**. `We dig into your business patterns to refine your problem statement. Together, we define your product's goals and expectations—the foundation everything else is built on.` Deliverable: `Clear problem definition, validated business goals, documented expectations`
  2. `02` **Proof of Concept & Research**. `We plan and conduct research with your real end-users. Through structured interviews and testing, we validate assumptions and uncover requirements you didn't know you had.` Deliverable: `User insights from actual interviews, validated requirements, research documentation`
  3. `03` **Deliverables**. `You receive your first prototype sketch and a comprehensive Business Requirements Specification (BRS)—complete with KPIs. This becomes your roadmap for development.` Deliverable: `Initial prototype, firm BRS with documented KPIs, development-ready specifications`
- AI note: `We use Generative AI to draft documents and prototypes—but never for thinking. Every insight comes from human analysis of your unique business.`

### HowItWorks.astro (`#how-it-works`)
- H2: `Refine the problem. Define the solution.`
- Intro: `Every product is different. Every business has unique patterns. We don't rush discovery—we do it right.`
- Facts (icons flask, users, clock): `5-7 Proof of Concepts`, `Real User Validation`, `Time-Based Contract`
- H3: `Product Surface Foundation`
- Desc: `Everything starts here. Your business patterns, user needs, and technical constraints form the base every layer builds upon. Through communication, we discover each layer:`
- Layers (8 chips): `Problem Statement`, `Goal & Expectation`, `User Requirement`, `Workflow`, `Data Foundation`, `Operation & System`, `Technology & Tool`, `Control & Safety`
- Note: `Each layer builds on validated insights, not assumptions. We continue layering discovery until we have a complete picture of what you need.`

### Showcase.astro (`#showcase`)
- H2: `Problems solved. Apps that work.`
- Intro: `Real discoveries. Real results. Here's how our methodology transforms business challenges into working solutions.`
- Placeholder projects (fake content, hardcoded):
  - **Project Alpha**. Challenge `Complex inventory system causing operational delays`. Discovery `Real bottleneck was in communication workflow, not the system itself`. Result `50% reduction in processing time after addressing the actual problem`.
  - **Project Beta**. Challenge `Low user adoption of new platform`. Discovery `Users needed mobile-first experience for field operations`. Result `3x increase in daily active users within 2 months`.

### Pricing.astro (`#pricing`)
- H2: `Two meetings. One clear path forward.`
- Intro: `Start your app's day-1 with us. Our engagement process is simple and transparent.`
- Meeting 1: **Free Brief** `— Your Story`. `Tell us about your business, your challenge, your vision. We listen, we ask questions, we start understanding your patterns.` Bullets: `No cost, no commitment`, `NDA available if needed`, `60-90 minutes of focused discussion`
- Meeting 2: **The Proposal** `— Our Plan`. `We present a complete working plan—from foundation discovery through your final BRS. You'll see exactly how we'll uncover what you need.` Bullets: `Detailed discovery roadmap`, `Timeline and process breakdown`, `PoC plan customized for your project`
- Outcome H3: `The Outcome`. `Time-based contract. Typically 5-7 PoCs to reach solid requirements. You receive a Business Requirements Specification that doesn't just describe features—it explains why they matter and how they serve your strategy.` Highlight: `This BRS becomes your development team's north star.`
- There is no price anywhere. "Pricing" is a "two meetings" explainer; the contract is "time-based".

### Contact.astro (`#contact`)
- H2: `Ready to find the right problem?` (= `contact.eyebrow`)
- Intro: `Let's discover what your business needs. Click the card to reveal our contact information.` (= `contact.desc`)
- Card front: `Find good problems.` / `Make good apps.`, prompt `Click to reveal contact`
- Card back: `Usable App Co.`, `Digital Product Design Consultants`, address `36 Thawiwattana 47` / `Thawiwattana, Bangkok 10170`, phone link `tel:+66618317773` label `+66 61 831 7773`, line `Start your app's day-1 with us.`
- Buttons: `Call Now` -> `tel:+66618317773`; `Book a Meeting` -> `#` (dead)
- Script: flips the card on click, `console.log` only, comment "can be connected to analytics". No analytics wired.

### Card.astro
A layout primitive (props: `variant` basic|elevated|image|split, `background` navy|navy-light|sunset|forest|fire|night|sky|warm|cool|white|block, `eyebrow`, `title`, `description`, `linkText`, `linkHref`, `imageUrl`, `imageAlt`, `class`). No copy.

---

## 3. Showcase collection

Schema (`src/content/config.ts`, collection `showcase`, `type: 'content'`):

| Field | Type | Notes |
|---|---|---|
| `title` | string | card h3 and modal title |
| `subtitle` | string | card overlay text and modal subtitle |
| `image` | string | URL or `/public` path (not an Astro `image()`) |
| `order` | number | ascending sort; duplicates exist |
| `challenge` | string | modal "The Challenge" |
| `solution` | string | modal "Our Solution" |
| `results` | string[] | modal "Results" check list |
| (md body) | markdown | one-line description; **not rendered anywhere** |

There is no `tags`, `lang`, `slug`, `client`, `url`, `year` or `summary` field. All entries are English only; there is no Thai or per-language variant.

| slug | order | title | subtitle | image | results (count) |
|---|---|---|---|---|---|
| `walk-thailand` | 1 | Cultural Heritage Personalized Tour. And Town History Database | GPS-guided walking tours through Bangkok's Chinatown and heritage sites | `/walk-thailand-market.jpg` (local, 2000x1500) | 4 |
| `healthcare-portal` | 2 | Healthcare Patient Portal | Simplified appointment booking for 10,000+ users | `https://images.unsplash.com/photo-1663408319620-3551f425c81e?crop=entropy&cs=srgb&fm=jpg&q=85` | 3 |
| `thai-timebank` | 2 | Thai Time Bank | Community-driven time exchange platform connecting neighbors for mutual support | `https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=srgb&fm=jpg&q=85` | 5 |
| `ecommerce-platform` | 3 | E-Commerce Platform | Streamlined checkout reduced cart abandonment by 40% | `https://images.unsplash.com/photo-1618544976420-1f213fcf2052?crop=entropy&cs=srgb&fm=jpg&q=85` | 3 |
| `edtech-platform` | 4 | EdTech Learning Platform | Intuitive course navigation for diverse learners | `https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg` | 3 |

`healthcare-portal` and `thai-timebank` both have `order: 2`, so their relative order is whatever `getCollection` returns (likely file-name order, healthcare first). Fix when mapping.

The first two entries (Walk Thailand, Thai Time Bank) look like real work. The other three (Healthcare, E-Commerce, EdTech) read as generic placeholder case studies with stock photos and specific metrics (40%, 70%, 10,000+ users); confirm they are real before reusing them in v2.

### Entry copy, verbatim

**walk-thailand**: body `A GPS-guided cultural walking tour application for exploring Bangkok's heritage sites, community areas, and local festivals.`
- challenge: `Tourists visiting Bangkok's cultural sites struggled with navigation, missed important landmarks, and lacked context about the historical significance of locations. Traditional tour guides were expensive and inflexible.`
- solution: `We designed Walk Thailand as a GPS-guided walking tour app that acts as a personal guide. The app provides turn-by-turn navigation, tells stories about history and culture at each location, and allows users to explore at their own pace. Features include route planning, points of interest, and multilingual content.`
- results: `Featured in Thai Health Promotion Foundation partnership` / `Covers multiple heritage areas including Samphanthawong and Na Kluea` / `Integrated with local festivals and community events` / `Easy planning with rest stops and restaurant recommendations`

**healthcare-portal**: body `A streamlined patient portal that simplified appointment booking and reduced abandonment rates significantly.`
- challenge: `The existing patient portal had a 60% abandonment rate during appointment booking. Users found the process confusing with too many steps and unclear navigation.`
- solution: `We redesigned the entire booking flow with clear visual hierarchy, reduced steps from 7 to 3, and added progress indicators. User testing validated every decision.`
- results: `40% reduction in booking time` / `85% decrease in support calls` / `95% user satisfaction score`

**thai-timebank**: body `A time-banking platform that rebuilds community connections by enabling neighbors to exchange help using time as currency, creating sustainable mutual support networks in urban Thailand.`
- challenge: `Modern urban communities face isolation despite physical proximity. People need help with daily tasks but hesitate to ask neighbors due to social barriers. Traditional volunteer systems lack reciprocity, making sustainable community support difficult. Elderly residents who can't contribute physically feel excluded from community networks.`
- solution: `We designed Thai Time Bank as a mobile platform that transforms time into currency for community exchange. The system uses 'time credits' (1 hour = 60 credits) to facilitate neighbor-to-neighbor help. Key innovations include family credit pooling for elderly care, progressive radius matching (5km → 10km → 15km) for urgent requests, and a 'neighbor endorsement chain' where members can amplify requests they can't fulfill themselves. The platform mimics real-world neighbor interactions with staged information disclosure and grace periods for commitment.`
- results: `Launched with 1,000+ quality members focused on mutual aid mindset` / `Family credit system enables elderly participation without physical contribution` / `Priority escalation ensures no request goes unanswered` / `Community manager oversight for high-priority and disputed cases` / `Built-in trust system through verified identities and review ratings`

**ecommerce-platform**: body `An optimized e-commerce checkout experience that significantly improved conversion rates and customer satisfaction.`
- challenge: `High cart abandonment rates and complex checkout process were costing the business significant revenue. Users reported confusion about shipping options and payment methods.`
- solution: `We simplified the checkout to a single-page flow, added guest checkout, and made shipping costs transparent upfront. Every element was tested with real users.`
- results: `40% reduction in cart abandonment` / `25% increase in conversion rate` / `50% faster checkout completion`

**edtech-platform**: body `An accessible learning platform with intuitive navigation and personalized course recommendations for diverse learners.`
- challenge: `Students struggled to find relevant courses and track their progress. The platform had poor accessibility and didn't accommodate different learning styles.`
- solution: `We created a personalized dashboard with clear course categorization, progress tracking, and accessibility features. The design system ensured consistency across all learning modules.`
- results: `70% improvement in course completion` / `90% positive feedback on navigation` / `WCAG 2.1 AA compliance achieved`

Mapping note for the kit: the "Rail of 3 product cards" has 5 candidates here, and "MediaSplit" can take any of them (image + kicker/heading/body/cta). There is no per-entry URL for a CTA target.

---

## 4. Assets

Dimensions from `sips` (SVG sizes are the viewBox/intrinsic size). "Used" is checked by grep against `src/`.

| Path | Type | Size (px) | Bytes | Used where |
|---|---|---|---|---|
| `public/favicon.svg` | svg | 128x128 | 749 | `Layout.astro:29` |
| `public/illustrations/step1.png` | png | 1178x768 | 582,171 | Process step 1 (both pages) |
| `public/illustrations/step2.png` | png | 1181x768 | 1,221,797 | Process step 2 (both pages). Heaviest file in use |
| `public/illustrations/step3.png` | png | 1181x768 | 561,432 | Process step 3 (both pages) |
| `public/illustrations/requirement.svg` | svg | 100x100 | 27,798 | Not referenced (earlier design) |
| `public/illustrations/refinement.svg` | svg | 200x200 | 24,065 | Not referenced |
| `public/illustrations/deliverables.svg` | svg | 100x100 | 5,297 | Not referenced |
| `public/illustrations/who.svg` | svg | 200x200 | 13,219 | Not referenced (identical size to `who_whimsical.svg`) |
| `public/illustrations/who_whimsical.svg` | svg | 200x200 | 13,219 | Not referenced |
| `public/illustrations/why.svg` | svg | 100x100 | 4,322 | Not referenced |
| `public/illustrations/why_whimsical.svg` | svg | 100x100 | 5,334 | Not referenced |
| `public/illustrations/ready.svg` | svg | 200x200 | 48,621 | Not referenced |
| `public/illustrations/ready_whimsical.svg` | svg | 100x100 | 3,545 | Not referenced |
| `public/walk-thailand-market.jpg` | jpg | 2000x1500 | 702,807 | Showcase `walk-thailand` image; `/kitchen-sink` demo |
| `public/js/design-components.js` | js | n/a | n/a | `/kitchen-sink` only (web components for the design kit demo) |
| `src/assets/images/logo.svg` | svg | 438x659 | 819 | Not imported. The same paths are pasted inline into both pages (hero, card front, card back). Fill is `black` in the file |
| `src/assets/images/blocks/vision.png` | png | 1024x1024 | 615,419 | Not referenced |
| `src/assets/images/blocks/process.png` | png | 1024x1024 | 746,169 | Not referenced |
| `src/assets/images/blocks/validation.png` | png | 1024x1024 | 798,731 | Not referenced |
| `src/assets/images/blocks/community.png` | png | 1024x1024 | 766,650 | Not referenced |
| `src/assets/images/blocks/deliverables.png` | png | 1024x1024 | 527,809 | Not referenced |
| `src/assets/fonts/anakotmai-{light,medium,bold}.{eot,woff,woff2}` | font | n/a | n/a | Not referenced anywhere (no `@font-face` in `src/`) |
| `.kombai/resources/image-*.{png,jpg}` (9 files) | png/jpg | 600x600 up to 3448x3736 | 52 KB to 2 MB | Tooling scratch, not part of the site. Sizes: 1604x566, 1960x1584, 3448x3736, 716x1114, 850x500, 2456x1590, 824x836, 600x600, 2498x1456 |

Remote images (hot-linked, not in the repo): Unsplash `photo-1541462608143-67571c6738dd` (D1), `photo-1663408319620-3551f425c81e` (Philosophy bg + Healthcare), `photo-1580982330720-bd5e0fed108b` (Methodology), `photo-1559027615-cd4628902d4a` (Thai Time Bank), `photo-1618544976420-1f213fcf2052` (E-Commerce); Pexels `7947636` (D2), `8000652` (Get Started), `196644` (EdTech). Remote video: YouTube `CDv3bwUVK7Y`.

Of the 5 `blocks/*.png` 1024x1024 images (vision, process, validation, community, deliverables) none are used on the shipped pages. They are the only local, square, brand-style art that could feed a Genre-style or card-style section if they fit the new look; their content was not opened here.

---

## 5. Fonts and brand colours (from `variables.css`, `fonts.css`, `global.css`)

Fonts (loaded by one Google Fonts `@import` in `src/styles/fonts.css`):

| Role | Family | Where |
|---|---|---|
| Body | Inter Tight (100-900) | `global.css:16` |
| Headings h1-h4 | Funnel Display (300-800) | `global.css:54`, `story-cards.css:924,950` |
| Hero H1 (root only) | Playfair Display (400-900, italic) | `index.astro` hero styles |
| Hero script word "Design" | Dancing Script (400-700) | `index.astro` hero styles |
| Chalk words on step cards | Caveat 700 | `story-cards.css:569,608` |

Thai glyph coverage: none of these families contain Thai glyphs, and the self-hosted Anakotmai files (`src/assets/fonts/anakotmai-*`) are never declared with `@font-face`. Thai text therefore falls back to the OS default Thai font. This matters for the font decision: v2 needs an explicit Thai-capable family, and Anakotmai (light/medium/bold, woff2) is already in the repo if the owner wants it.

Brand colours (`variables.css`):

| Token | Value | Role |
|---|---|---|
| `--color-base` | hsl(43, 19%, 93%) | page background (Pantone Cloud Dancer, warm off-white) |
| `--color-block` | hsl(43, 19%, 90%) | block surface |
| `--color-white` | hsl(0, 0%, 100%) | white |
| `--color-navy` | hsl(224, 32%, 26%) | primary, text, headings |
| `--color-navy-light` | hsl(220, 23%, 37%) | primary light |
| `--color-accent` | hsl(40, 66%, 47%) | gold accent |
| `--color-accent-gold` | hsl(46, 65%, 52%) | metallic gold used in hero |
| `--color-vibrant-gold` | hsl(43, 100%, 51%) | hero gradient end |
| `--color-cyan` | hsl(199, 30%, 51%) | secondary accent |
| `--color-green` | hsl(125, 21%, 45%) | secondary accent |
| `--color-text-light` / `--color-text-muted` | hsl(216, 4%, 37%) / hsl(216, 3%, 56%) | secondary text |
| Card gradients | ocean `#667eea→#764ba2`, sunset `#f093fb→#f5576c`, forest `#4facfe→#00f2fe`, fire `#fa709a→#fee140`, sky `#a8edea→#fed6e3`, night `#2e3a59→#1a1f2c`, warm `#ffecd2→#fcb69f`, cool `#e0c3fc→#8ec5fc` | the `.bg-*` classes on cards |

Radii are large (12 to 36px; card radius 24px). The brand mark is a two-shape navy logo (viewBox 438x659). Overall current look: warm off-white, navy type, gold accent, colourful pastel gradient cards.

---

## 6. Open questions and content that would be lost

1. **No Thai page exists in practice.** The `th` dictionary is complete, but pages call `useTranslations("en")`. Is the v2 Thai page meant to ship Thai copy? If yes, the v2 build must read `lang` from the route, not hardcode `"en"`. The Thai copy is partly non-literal (see step labels in 2.3) and has not been shipped or reviewed in context.
2. **Root-only inline copy not in i18n** (would be lost): hero "Digital Product Design Agency", location line "Usable App company. Based in Bangkok, Thailand.", the tagline "We are specialised in transforming complex ideas into simple, intuitive products through strategic design consultancy.", the three Who We Are bullets, and the modal headings "The Challenge" / "Our Solution" / "Results". None of these have Thai text.
3. **Phone and email hardcoded** in both pages (`+66 61 831 7773`, `usableapp.co@gmail.com`), without `tel:` or `mailto:` links on the shipped pages. Footer has no links.
4. **Dead CTAs**: Get Started `href="#"`; Contact component "Book a Meeting" `href="#"`. There is no booking endpoint, no form, no calendar link, no form handler anywhere in the repo (grep for `<form`, `fetch(`, `formspree`, `action=` found nothing). The primary conversion path for v2 (free discovery sessions / free brief) has no destination yet.
5. **No analytics.** No GA, GTM, Plausible, Meta pixel, or similar. Only a `console.log` comment in `Contact.astro`.
6. **Two competing message sets.** Shipped: "Business Requirements Consulting", 3 steps (Requirement, Refinement, Deliverables = concepts + PRD), "AI-accelerated, human-crafted", 2 x 2h free sessions ("Discovery", "Strategy"). Unused components: "Find good problems. Make good apps.", free brief (60-90 min) then proposal, then BRS with KPIs, 5-7 PoCs, time-based contract, 8-layer "Product Surface Foundation". Session length and offer names differ between the two (2 hours x 2 sessions vs 60-90 min brief + proposal; PRD vs BRS). Pick the canonical offer before mapping.
7. **Stock photos and attribution.** 8 hot-linked Unsplash/Pexels URLs; attribution is only in `alt` text. Hot-linking can break; consider downloading and crediting. The `origin=http://localhost:4321` in the YouTube embed must change.
8. **Showcase data quality.** Three of five entries read as generic placeholders; two entries share `order: 2`; the markdown bodies are not rendered; entries are English only; there is no link target per entry.
9. **Nav anchors.** `#what-we-do`, `#how-it-works`, `#pricing`, `#contact` exist only in unused components. The shipped page has no nav at all, so a v2 nav needs new anchors mapped to the kit sections.
10. **English `showcase.title`** duplicates `philosophy.title` ("What Makes an App Usable?"). Likely a copy slip.
11. **`/en/` page** has no showcase modal (markup and script absent), so any v2 behaviour must be built once for both languages.
12. **Footer year** is rendered at build time (`new Date().getFullYear()`); i18n `footer.copyright` is hardcoded to 2025 and unused.
13. **Unused weight in repo**: 8 unreferenced illustration SVGs, 5 unreferenced 1024px block PNGs (about 3.5 MB), unreferenced Anakotmai font files, and `dist/` tracked in git. Not content, but relevant to what to carry over.
