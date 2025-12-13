# Typography Research - Modern Scale Systems

## Current Problem
- Text is approximately 40% of what it should be
- Hero subheadline too small compared to main statement
- No clear visual hierarchy
- Gaps between text elements not well-grouped

---

## Modern Typography Scale Systems

### 1. Major Third Scale (1.250 ratio)
**Used by**: Medium, Stripe, Linear
- Base: 16px
- Scale: 16, 20, 25, 31, 39, 49, 61, 76, 95

### 2. Perfect Fourth Scale (1.333 ratio)
**Used by**: GitHub, Notion, Figma
- Base: 16px
- Scale: 16, 21, 28, 37, 49, 66, 88, 117

### 3. Golden Ratio Scale (1.618 ratio)
**Used by**: Apple (historically), high-impact sites
- Base: 16px
- Scale: 16, 26, 42, 68, 110, 178

### 4. Modern Scale (1.200 - 1.250 hybrid)
**Recommended for corporate sites**
- More moderate growth
- Better for reading
- Professional feel

---

## Recommended Scale for Usable App

### Base Size: 18px (not 16px)
**Why**: Better readability, modern standard for body text

### Display Scale (Hero/Headings)
- **Hero Statement**: 80-96px (5xl-6xl)
- **Section Headings**: 48-56px (3xl-4xl)
- **Subheadings**: 32-36px (2xl)
- **Card Titles**: 24-28px (xl)

### Body Scale
- **Large Body**: 20-22px (hero subheadline)
- **Regular Body**: 18px (base)
- **Small Body**: 16px (captions)
- **Tiny**: 14px (labels only)

---

## Proper Text Grouping

### Visual Hierarchy Rules:
1. **Major Gap** (hero to subheadline): 40-56px
2. **Section Gap** (heading to content): 32-40px
3. **Paragraph Gap**: 24-32px
4. **Line Gap**: 16-20px

### Reading Width:
- **Body Text**: 600-650px (66 characters)
- **Headlines**: 800-900px
- **Captions**: 500-550px

---

## Line Height System

### Display Text (Headings):
- 1.1 - 1.2 (tight, for impact)

### Body Text:
- 1.6 - 1.7 (relaxed, for reading)

### Small Text:
- 1.5 (balanced)

---

## Font Weight Usage

### Headings:
- 700 (Bold) - Main headings
- 600 (Semi-bold) - Subheadings

### Body:
- 400 (Regular) - Body text
- 500 (Medium) - Emphasis
- 300 (Light) - Captions (if needed)

---

## Modern Typography Principles

### 1. Contrast
- Minimum 2:1 ratio between heading and body
- Hero should be 4-5x body size

### 2. Rhythm
- Use 8px base grid
- All spacing in multiples of 8

### 3. Proximity
- Related text grouped tightly
- Unrelated text separated clearly

### 4. Scale Jumps
- Minimum 1.25x between adjacent sizes
- Larger jumps for emphasis

---

## Comparison: Current vs Recommended

### Current (WRONG):
```
Hero: 72px (4.5rem)
Subheadline: 20px (1.25rem) ❌ Too small!
Gap: 48px
Body: 16px
```

### Recommended (CORRECT):
```
Hero: 88px (5.5rem) ✓
Subheadline: 22px (1.375rem) ✓
Gap: 56px ✓
Body: 18px ✓
```

**Ratio**: 88/22 = 4:1 (good contrast)
**Current**: 72/20 = 3.6:1 (weak contrast)

---

## Implementation Plan

### New Typography Variables:
```css
--text-base: 18px (not 16px)
--text-lg: 20px
--text-xl: 24px
--text-2xl: 32px
--text-3xl: 48px
--text-4xl: 56px
--text-5xl: 80px
--text-6xl: 88px
```

### Hero Specific:
```css
--hero-statement: 88px (desktop), 56px (tablet), 48px (mobile)
--hero-subheadline: 22px (desktop), 20px (mobile)
--hero-gap: 56px (desktop), 40px (mobile)
```

---

## References
- **Material Design 3**: Type scale system
- **Tailwind v4**: Updated typography
- **Refactoring UI**: Typography chapter
- **Practical Typography**: Matthew Butterick
- **Type Scale**: https://typescale.com/

---

**Next**: Apply this scale to all components
