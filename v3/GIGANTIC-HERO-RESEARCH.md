# Gigantic Typography Hero Section - Research & Design

**Date**: October 13, 2025
**Trend**: 2024-2025 Modern Web Design

---

## Key Trends

### 1. **Viewport-Filling Typography**
- Text takes up entire screen height
- Typography AS the hero image
- No background images needed
- Bold, immediate impact

### 2. **Oversized Bold Fonts**
- 150px - 300px+ font sizes
- Fill screen width
- Create visual anchors
- Grab attention instantly

### 3. **Creative Placement**
- Unconventional arrangements
- Stacked words
- Overlapping text
- Breaking the grid
- Layered content

### 4. **Kinetic Typography** (optional)
- Animated text on scroll
- Moving elements
- Parallax effects
- Fade/slide animations

### 5. **Minimal Supporting Content**
- Large headline = primary focus
- Small subtext (18-24px)
- Maximum contrast
- Negative space emphasis

---

## Award-Winning Examples Style

### Style A: Stacked Vertical Fill
```
FIND
GOOD
PROBLEMS.

MAKE
GOOD
APPS.
```
- Each word stacked vertically
- Fills viewport height
- Maximum impact
- Clean alignment

### Style B: Overlapping Giant Text
```
  FIND GOOD
PROBLEMS.
  MAKE GOOD
    APPS.
```
- Words overlap edges
- Text bleeds off screen
- Dynamic, modern
- Creates movement

### Style C: Split Screen Typography
```
FIND          MAKE
GOOD          GOOD
PROBLEMS.     APPS.
```
- Two columns
- Symmetrical layout
- Balanced composition

### Style D: Mixed Size Hierarchy
```
FIND GOOD
P R O B L E M S .
MAKE GOOD
A P P S .
```
- Emphasis words large
- Supporting words expanded tracking
- Dynamic rhythm

---

## Design Specifications for Usable App

### Recommended: Style A (Stacked Vertical Fill)
**Why**: Matches brand's bold, direct communication style

**Layout**:
```
[Full Viewport Height Hero]

        FIND
        GOOD
     PROBLEMS.

        MAKE
        GOOD
        APPS.

    [Small subtext below]
```

**Specs**:
- Font size: 120px - 180px (responsive)
- Font weight: 700 (Bold)
- Letter spacing: -0.03em (tight, modern)
- Line height: 0.9 - 1.0 (tight stacking)
- Color: Navy (#1A3A52)
- Background: White (clean canvas)
- Alignment: Center
- Viewport: 100vh minimum

**Animation** (optional):
- Each word fades in sequentially
- Slight slide up on load
- Subtle parallax on scroll

**Subtext**:
- Font size: 20px
- Font weight: 400 (Medium)
- Color: Text light (rgba)
- Max width: 600px
- Position: Below hero text, centered

---

## Alternative Layouts to Try

### Option 1: Ultra Gigantic (Screen Bleed)
- Font size: 200px - 280px
- Text bleeds off edges
- Very aggressive, editorial
- Best for: Portfolio, agency sites

### Option 2: Mixed Case Emphasis
- "FIND good PROBLEMS"
- "MAKE good APPS"
- Lowercase = 60% size of uppercase
- Creates rhythm and hierarchy

### Option 3: Color Accent Words
- "FIND **GOOD** PROBLEMS"
- "MAKE **GOOD** APPS"
- Middle word in Terracotta (#D07855)
- Draws eye to key concept

### Option 4: Vertical Offset
```
    FIND
      GOOD
        PROBLEMS.

    MAKE
      GOOD
        APPS.
```
- Each line offset right
- Creates diagonal flow
- Dynamic, modern

---

## Technical Implementation

### HTML Structure (Simplified)
```html
<section class="hero-gigantic">
  <div class="container">
    <h1 class="giant-text">
      <span class="line">FIND</span>
      <span class="line">GOOD</span>
      <span class="line">PROBLEMS.</span>
      <span class="line-break"></span>
      <span class="line">MAKE</span>
      <span class="line">GOOD</span>
      <span class="line">APPS.</span>
    </h1>
    <p class="subtext">
      We help startups discover what their business really needs.
    </p>
  </div>
</section>
```

### CSS Key Properties
```css
.hero-gigantic {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.giant-text {
  font-size: clamp(80px, 15vw, 180px); /* Responsive */
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.03em;
  text-align: center;
}

.giant-text .line {
  display: block;
}

.line-break {
  height: 0.5em; /* Space between sentences */
}
```

### Responsive Breakpoints
```css
/* Desktop: 1280px+ */
font-size: 180px;
line-height: 0.9;

/* Tablet: 768px - 1279px */
font-size: 120px;
line-height: 0.95;

/* Mobile: 320px - 767px */
font-size: 48px;
line-height: 1.0;
```

---

## Pros & Cons

### Pros:
✅ Maximum impact - impossible to miss
✅ Modern, trendy aesthetic
✅ Typography replaces need for hero image
✅ Matches bold brand strategy
✅ Fast loading (no images)
✅ Memorable and distinctive

### Cons:
❌ Very bold - not for conservative brands
❌ Less room for supporting content
❌ Requires perfect typography execution
❌ Mobile scaling more challenging
❌ May overwhelm some users

---

## Recommendation

**Try Style A (Stacked Vertical Fill)** with these settings:

```css
Font: Anakotmai Bold
Size: 160px (desktop), 80px (mobile)
Weight: 700
Letter-spacing: -0.03em
Line-height: 0.9
Color: #1A3A52 (Navy)
Background: #FFFFFF (White)
Animation: Fade slide up, sequential
```

This creates maximum impact while maintaining professionalism for a consultancy.

---

**Status**: Ready to implement
**Files to modify**: `src/components/Hero.astro`
