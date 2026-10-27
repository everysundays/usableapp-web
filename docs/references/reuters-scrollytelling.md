# Reference: Reuters "Cambodia scams" scrollytelling hero

Source: https://www.reuters.com/graphics/CAMBODIA-SCAMS/egpbwjyeovq/
(Reuters Graphics, "Casino boss was landlord to Chinese scammers and human traffickers")

## Why this reference

Target concept for the usableapp-web homepage redesign: an above-the-fold hero
where the image **progresses into the next image as you scroll**. Our narrative
mapping: start from a delicate concept (sketch/wireframe) and progress into a
strong, finished app flow — "usable app, not a zombied one."

## How Reuters builds it (inspected from live DOM, 2026-07)

Structure (theirs is Svelte, `svelte-scroller`; the mechanics are framework-free):

```
<scroller-outer>                        ← tall container, height = N steps × ~100vh
  <background-container>                ← pinned: absolute + translateY while in view
    <div class="step-background step-1 visible">   full-viewport image 1
    <div class="step-background step-2 invisible"> full-viewport image 2 (same scene, later state)
    <div class="step-background step-3 invisible"> full-viewport image 3
  <foreground>                          ← scrolls normally over the background
    <step> text card 1 …
    <step> text card 2 …
    <step> text card 3 …
```

Key mechanics:

1. **Pinned background, scrolling foreground.** The image stack fills the
   viewport and stays put while short text cards scroll over it. Scroll
   position (which foreground step is centered) toggles `visible`/`invisible`
   on the stacked backgrounds — a crossfade between full-screen images.
2. **Images are the SAME scene progressing** — illustrated map of O'Smach 2018
   → same view with new construction highlighted → 2025 satellite peak. The
   progression carries the story; text only annotates it. This is the part to
   copy: image N+1 is image N evolved, not a new subject.
3. **Labels are HTML, not baked into the image.** Absolutely-positioned text
   (`%` top/left) over the image per breakpoint (ai2svelte pattern). Crisp,
   translatable, accessible.
4. **Responsive art direction:** 5 image sizes per step (xs/sm/md/lg/xl) with
   different aspect ratios, chosen via CSS custom properties.
5. **Accessibility:** background stack is `aria-hidden="true"`; each step has a
   plain-prose description in the flow ("This is the first image… It shows…").
6. **Pacing:** 3 steps only above the fold. One idea per step, ~2 sentences per
   text card. After the scroller, the page returns to a normal article column.

Step images (for study):
- https://www.reuters.com/graphics/CAMBODIA-SCAMS/egpbwjyeovq/cdn/images/graphics/Intro-1-lg.jpg
- (Intro-2, Intro-3 follow same URL pattern)

## Adaptation sketch for usableapp-web

Hero scroller, 3–4 steps, same-scene progression of ONE app screen:

1. Step 1 — delicate concept: pencil/wireframe sketch of the app screen.
2. Step 2 — structure: wireframe gains layout, real hierarchy (highlight what changed, like Reuters' yellow buildings).
3. Step 3 — strong flow: finished, polished UI; micro-annotations (HTML labels) pointing at usability decisions.
4. Text cards carry the pitch: "usable app, not a zombied one."

Implementation in Astro: no framework needed — CSS `position: sticky` on the
background stack + IntersectionObserver on the foreground steps to toggle the
visible image. ~50 lines of JS.
