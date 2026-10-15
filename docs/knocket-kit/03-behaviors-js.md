# 03 · JS behaviors (2 ชั้น) และ DOM contract สำหรับ init() กลาง

ที่มา: `interactions.js` (597 บรรทัด อ่านได้) และส่วนท้ายของ `HomeRefresh.*.js` (bundle 181KB: Lenis 1.3.26, GSAP 3.15.0, ScrollTrigger, Draggable, InertiaPlugin) ของ https://knocket.trtc.io/ อ่านเมื่อ 2026-10-14

## Components Found

Two independent layers.
- Layer A, `interactions.js` ("Interactive Layer v5"). Plain IIFE, no libraries, loaded globally.
- Layer B, the HomeRefresh bundle (181KB), homepage only, ES module. Bundles Lenis 1.3.26, GSAP 3.15.0, ScrollTrigger 3.15.0, Draggable, InertiaPlugin 3.15.0. `gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin)`.

Layer A: `isMobile = matchMedia('(hover:none), (max-width: 900px)').matches` evaluated once at load, no change listener.

| # | Behavior | DOM contract and hooks | Events and details | Library | Desktop/mobile |
|---|---|---|---|---|---|
| A1 | Cartoon fist cursor | JS injects `div.k-cursor` (SVG `.fist-body`, `.fist-burst`) and `div.k-cursor-label` into body. Toggles `.big`, `.knocking`, `.show`. Hover targets: `a, button, .clickable, [role="button"], details summary, .tpl-card, .bento-card, .knock-door, .sticker-drop, .filter, .giant-slice`. Optional `data-cursor="TEXT"` sets label. | `mousemove` (passive, rAF throttled) `translate(mx,my) translate(-50%,-50%)`. Label at mx+38, my+34. Delegated mouseover/mouseout. mousedown adds `.knocking`, mouseup removes after 200ms. Default label `CLICK`. | none | Desktop only (`!isMobile`) |
| A1b | Label text map | `.knock-door` KNOCK!, `.tpl-card` REMIX, `.sticker-drop` TOSS, `.giant-slice` BOOP!, initial KNOCK KNOCK. Home CTA `data-cursor="LET'S GO"`. | | none | Desktop |
| A1c | Native-cursor opt-out | `#contact-widget-auto *`, `.breadcrumbs *`, `.seo-crumbs *` hide the fist on mouseover. | | none | Desktop |
| A2 | Click ripple + knock sound | Appends `div.k-ripple` at click point, removed after 700ms. tokens.css animates it (20px to 220px, border fades). | document click, `playKnock(200,.05)` | Web Audio | Desktop only |
| A3 | Web Audio | `playKnock(freq=200, vol=.05)`: sine, exp ramp to 60Hz over .12s, .15s total. `playNote(freq=440, vol=.06)`: triangle, .35s. `window.knocketPlayKnock`. AudioContext lazy. | | Web Audio | Both |
| A4 | Knock-door CTA | `.knock-door`, `.hp-cta-primary`, `[data-knock-trigger]`: adds `.knocking` 500ms, plays knock 220/.08 then 180/.06 at 100ms | click | Web Audio | Both |
| A5 | Marquee pause | `.marquee-track` inside wrapper; parent mouseenter pauses animationPlayState | | CSS `@keyframes marquee` | Both |
| A6 | Letter notes | `.giant-slice` mouseenter plays note i%7 over C D E F G A B | | Web Audio | Desktop effectively |
| A7 | Card 3D tilt | `.bento-card, .wf-card`: mousemove rx=((y/h)-.5)*-6, ry=((x/w)-.5)*6; inline `perspective(800px) rotateX rotateY translate(-3px,-3px)`; mouseleave clears | | none | Both (hover) |
| A8 | FAQ knock | `details.faq-item` toggle: knock sounds, `.just-opened` 500ms, CSS `faq-shake` .32s | | Web Audio | Both |
| A9 | Mouse parallax | first `[data-parallax]` with `[data-depth]` children, optional `data-rotate`: translate3d(x*d*30px, y*d*30px) | | none | Desktop only |
| A10 | Copy | `[data-copy="text"]` click writes clipboard, shows COPIED 1400ms | | none | Both |
| A11 | Hero chat widget preview | `.hd-web` > `.hd-widget` + `.hd-widget-panel`; toggles `.panel-open`, `.panel-dismissed`; aria-expanded/hidden | mouseenter/leave, click | none | Both |
| A12 | Text scramble | `[data-scramble]` mouseenter, 30ms interval, charset `!@#$%^&*<>?/\|{}[]` | | none | Desktop |
| A13 | Tabs | `.k-tabs[data-tab-nav]`, buttons `[data-tab].k-tab.active`, sibling `[data-tabs]` gets `data-tabs=<val>` | click | none | Both |
| A14 | Dead stubs | stickers, physics field, sweep, Konami: no-ops "per design decision" | | | n/a |
| A15 | Sticker library | `ILLUSTRATIONS` object: ~27 inline SVGs (door, mailbox, medal, phone-retro, floppy, radio, love-letter, tv-old, target, coffee, lightbulb, cassette, planet, boombox-tiny, peace, monster-green, ghost, star-face, lightning, flower, cloud-face, envelope, flag, confetti, rocket, peace-sign). Unused at runtime; asset library only. | | | n/a |

Konami and stickers are dead. Homepage uses almost none of Layer A (only cursor + ripple + one `data-cursor`).

Layer B: runs `_d(); md(); gd(); vd(); yd(); xd();` then `html[data-home-motion=ready]` (no CSS reads it). `Ha = matchMedia("(prefers-reduced-motion: reduce)")` read once.

| # | Behavior | DOM contract | Exact motion | Library | Reduced-motion | Where |
|---|---|---|---|---|---|---|
| B1 `_d` | Video autoplay by visibility | `.home-refresh video` (muted loop playsinline preload=metadata) | IntersectionObserver threshold .38: play()/pause() | none | not gated | Both |
| B2 `md` | Mobile nav toggle | `[data-nav-toggle]`, `[data-nav-menu].is-open`; closes on link click and resize>800 | | none | | Dormant: homepage nav is `details.k-mobile-nav` |
| B3 `gd` | Horizontal rail | `[data-motion="rail"]` > `.hr-rail-viewport` > `[data-rail-track]` (cards); `[data-rail-prev]`, `[data-rail-next]`. Gap constant 36 must equal CSS `.hr-rail{gap:36px}` | see Rail details | GSAP, Draggable, Inertia | buttons work; Draggable skipped | Both, no width gate |
| B4 `vd` | Step cards plop-in | `[data-plop-in]` with 5 `[data-plop-in-item]`; `--rest-r` per card from CSS | `fromTo(items,{scale:.06,y:150,rotation:i=>[-12,10,-8,13,-9][i],transformOrigin:"50% 90%"},{scale:1,y:0,rotation:i=>[-6,3,-2,5,-3][i],duration:.72,stagger:.12,ease:"back.out(2.4)",scrollTrigger:{trigger:"[data-plop-in]",start:"top 82%",once:true}})` | GSAP, ScrollTrigger | whole vd returns early | Both; mobile CSS `.hr-step-card{transform:rotate(var(--rest-r))!important}` overrides |
| B4b | Step card hover lift | same items | pointerenter/focusin: `{y:-64,scale:1.045,rotation:0,zIndex:30,duration:.48,ease:"back.out(1.9)",overwrite:true}`; leave: `{y:0,scale:1,rotation:restRot[i],zIndex:i+1,duration:.62,ease:"power3.out"}` | GSAP | same | Desktop effectively |
| B4c | Step note reveal | `[data-step-note]` | `from(el,{y:22,autoAlpha:0,duration:.65,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 92%",once:true}})` | GSAP, ST | same | Both |
| B4d | Flow blob parallax | `.hr-flow-blob` in `[data-motion="steps"]` | `to(".hr-flow-blob",{yPercent:-14,ease:"none",scrollTrigger:{trigger:'[data-motion="steps"]',start:"top bottom",end:"bottom top",scrub:.45}})` | GSAP, ST | same | Both |
| B5 `yd` | Genre/capability switcher | `[data-motion="genre"]` > `[data-genre-item]` buttons, `[data-capability-scene]` panels (index matched, 6) with img children. CSS `.hr-capability-scene{opacity:0;visibility:hidden;position:absolute;inset:0}` `.is-active{opacity:1;visibility:visible}` | see Genre details | GSAP | not gated | Both; mobile CSS display:none/.is-active display:block |
| B6 `xd` | Lenis smooth scroll | global | see Lenis | Lenis, GSAP | whole xd returns early (no Lenis, no hero parallax, no reveals) | Both |
| B6b | Hero art parallax | trigger `[data-motion="hero"]`, target `[data-parallax="hero-art"]` | `to(target,{yPercent:9,rotation:0,ease:"none",scrollTrigger:{trigger:'[data-motion="hero"]',start:"top top",end:"bottom top",scrub:.55}})` (replaces CSS `--hero-r:-2deg`) | GSAP, ST | gated | Both |
| B6c | Demo/feature reveals | containers `.hr-demo`, `.hr-feature-stage`; children `.hr-demo-copy > *`, `.hr-demo-video`, `.hr-feature-copy > *`, `.hr-feature-video` | `from(children,{y:65,autoAlpha:0,stagger:.075,duration:.85,ease:"power3.out",scrollTrigger:{trigger:container,start:"top 74%",toggleActions:"play none none reverse"}})` | GSAP, ST | gated | Both |

Rail details (B3):
- step width `a() = firstChild.getBoundingClientRect().width + 36`
- limit `o() = Math.min(0, viewport.clientWidth - track.scrollWidth - innerWidth*.04)`
- snap `u(c) = clamp(o(), 0, round(c/a())*a())`
- `f(i)`: clamp index, `gsap.to(track,{x:u(-i*a()),skewX:0,duration:.9,ease:"power4.out",overwrite:true})`
- `Draggable.create(track,{type:"x",trigger:viewport,inertia:true,dragResistance:.08,edgeResistance:.82,allowNativeTouchScrolling:false,dragClickables:true,bounds:{minX:o(),maxX:0},snap:{x:u}})`
- onDrag/onThrowUpdate: `to(cards,{skewX:clamp(-5,5,deltaX/7),duration:.18,overwrite:true})`; onDragEnd skewX:0 .55s power3.out, index=round(|endX/a()|); onThrowComplete skewX:0 .45s
- resize: applyBounds then f(r)
- CSS: `.hr-rail-viewport{overflow:hidden;cursor:grab}`, `.hr-rail{display:flex;width:max-content;gap:36px;touch-action:pan-y;user-select:none;will-change:transform}`; CSS `translate3d(var(--rail-x))` + .75s transition is a leftover fallback.

Genre details (B5):
- `current=-1`; `o(idx)` toggles `.is-active` on matching item and scene; scene tween `{autoAlpha:active?1:0,duration:active?.5:.28,ease:"power3.out",overwrite:true}`
- active scene imgs `fromTo(imgs,{scale:.9,autoAlpha:0},{scale:1,autoAlpha:1,duration:.58,stagger:.045,ease:"power3.out",overwrite:true})`; first activation awaits img.decode()
- preload all scene imgs via requestIdleCallback (fallback setTimeout 600): loading=eager, await decode
- triggers: pointerenter, focus, click on each item. Not scroll driven.
- CSS: `.is-active`/`:hover` italic, weight 500, scale(1.035); `.hr-genre-list:hover button:not(:hover){opacity:.28}`

Lenis (B6):
- `new Lenis({duration:1.08,smoothWheel:true,wheelMultiplier:.9,prevent:node=>node.id==="contact-widget-auto"})`; syncTouch false (native touch), autoRaf false, respectReducedMotion default true. Easing default `1.001-2**(-10*t)` (inferred).
- `lenis.on("scroll",ScrollTrigger.update)`; `gsap.ticker.add(t=>lenis.raf(t*1000))`; `gsap.ticker.lagSmoothing(0)`.

Inline scripts in index.html:
- Cookie login class: `saas_token` cookie adds `k-logged` to html; CSS swaps `.k-cta-guest`/`.k-cta-logged`. Product specific.
- `window.knocketAuthTarget(consoleUrl)`: product specific.
- Locale dropdown (module, ~400 bytes): document click closes `details.k-locale[open]` not containing target and not `.k-locale--mobile`; Escape closes and refocuses summary. Reusable.
- Astro artifacts: `self.Astro.load`, astro-island hydration (`LoginAwareCta`, `Providers`), BaseLayout js imports trtc chat SDK, `/js/shence814.min.js` analytics, JSON-LD.
- No JS for nav dropdowns (CSS :hover/:focus-within) or mobile nav (native `details.k-mobile-nav`).

Sections with no JS: inbox `.hr-inbox-section`, final `.hr-final`. Hero H1/kicker: CSS-only `hr-rise` .9s cubic-bezier(.16,1,.3,1) forwards, translateY(60px), nth-child(2) delay .1s. `.hr-product-card[data-surface-link]` is a plain `<a>`.

## Flow
Load: inline head script -> module bundle + BaseLayout -> interactions.js classic -> chat SDK + analytics async.
Bundle: register plugins, run six inits in order, set data-home-motion.
Gating: B3 Draggable, B4, B6 gated on reduced motion; B5, B1, B2, rail buttons not gated; Layer A has no reduced-motion handling.
Per section: hero CSS entrance + B6b; rail B3; inbox none; demos/feature-stage B6c + B1; steps B4 a-d; genre B5; final none.

## Boundaries: central init() proposal

| Behavior | Contract | Lib | Where |
|---|---|---|---|
| Cursor fist + label + ripple | injected `.k-cursor`, `.k-cursor-label`, `.k-ripple`; `[data-cursor]` | none | desktop fine pointer |
| Knock sound | `.knock-door`, `[data-knock-trigger]` | WebAudio | both |
| Marquee pause | `.marquee-track` in wrapper | none | both |
| Card tilt | `.bento-card`, `.wf-card`, or `[data-tilt]` | none | desktop |
| Accordion knock | `details.faq-item` | none | both |
| Mouse parallax | `[data-parallax]` + `[data-depth]`, `[data-rotate]` | none | desktop |
| Copy | `[data-copy]` | none | both |
| Hover widget preview | `.hd-web > .hd-widget + .hd-widget-panel` | none | both |
| Scramble | `[data-scramble]` | none | desktop |
| Tabs | `.k-tabs[data-tab-nav]`, `[data-tab]`, sibling `[data-tabs]` | none | both |
| Locale close | `details.k-locale`, `.k-locale--mobile` | none | both |
| Video visibility | any `video` in a section | none | both |
| Rail | `[data-motion="rail"]`, `.hr-rail-viewport`, `[data-rail-track]`, `[data-rail-prev]`, `[data-rail-next]` | GSAP, Draggable, Inertia | both |
| Plop-in | `[data-plop-in]`, `[data-plop-in-item]`, `[data-step-note]`, `.hr-flow-blob`, `[data-motion="steps"]` | GSAP, ScrollTrigger | both |
| Genre switcher | `[data-motion="genre"]`, `[data-genre-item]`, `[data-capability-scene]` | GSAP | both |
| Hero parallax | `[data-motion="hero"]`, `[data-parallax="hero-art"]` | GSAP, ScrollTrigger | both |
| Demo/feature reveal | `.hr-demo`, `.hr-feature-stage` + children | GSAP, ScrollTrigger | both |
| Smooth scroll | global | Lenis, GSAP | both (touch native) |

Not to port: `k-logged`, `knocketAuthTarget`, chat SDK, analytics, Astro islands.

## Non-Obvious Things
1. Most of interactions.js is dormant on the homepage; the homepage's visual language is driven by Layer B.
2. Two mobile gates disagree: JS `(hover:none),(max-width:900px)`; CSS `(hover:hover) and (pointer:fine)` enables cursor:none, `(max-width:900px)` restores. Evaluated once at load.
3. Reduced-motion split uneven. CSS blanket kill: `.home-refresh *{animation:none!important;transition:none!important}` plus `transform:none!important` on `.hr-rail,.hr-step-card,.hr-words,.hr-word-corners img,.hr-hero-art`. Kit should apply one shared check.
4. Rail gap hardcoded 36 in JS; mobile CSS sets gap 16px, desyncing snap. Kit should read computed gap.
5. GSAP and CSS fight over transforms on `.hr-step-card` (CSS translate(-50%,-50%) + --step-x/y + rotate(--rest-r)); mobile `!important` masks it. Animate x/y/scale/rotation only on elements whose transform is not their positioning.
6. `--hero-y`/`--hero-r` CSS vars and `.hr-rail` translate3d(var(--rail-x)) are leftovers.
7. Lenis has no mobile gate but syncTouch false so only wheel is smoothed.
8. Only one `[data-parallax]` initialized by A9.
9. B6c uses toggleActions "play none none reverse" (re-animates on scroll up); the rest use once:true.
10. Genre images aria-hidden; the accessible control is the button list.
11. Preload: first scene eager + fetchpriority high; others lazy then forced eager on idle.
12. Init timing: module is deferred. Kit should expose `init(root)` and `kill()`.
13. `details.k-locale` outside-click skips `.k-locale--mobile`, which is rendered open by default.

## Open Questions
- CSS for A11, A13, A7 (`.hd-web`, `.k-tabs`, `[data-tabs]`) in pages.css not read.
- `[data-motion]` has exactly four values: hero, rail, steps, genre. Whether it should be a general registry is a kit design choice.
- Rail on real touch not verified (Draggable allowNativeTouchScrolling:false with CSS touch-action:pan-y; inferred that vertical scroll works).
- Motion values read from source, not observed live.
