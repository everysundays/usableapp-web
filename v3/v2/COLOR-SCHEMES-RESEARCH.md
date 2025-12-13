# Alternative Color Schemes Research

**Date**: October 13, 2025
**Purpose**: Create switchable color schemes for comparison

---

## Current Scheme (Set A): "Professional Navy"

**Character**: Professional, trustworthy, consultancy-appropriate

```css
Primary: #1A3A52 (Navy Dark)
Accent Warm: #D07855 (Terracotta)
Accent Cool: #64B5F6 (Cyan Blue)
```

**Vibe**: Established consultancy, professional services, trust-building

---

## Alternative Scheme (Set B): "Electric Violet"

**Character**: Modern, tech-forward, innovative, bold

```css
Primary: #2D1B69 (Deep Violet/Indigo)
Accent Warm: #FF6B35 (Vibrant Orange)
Accent Cool: #A855F7 (Bright Purple)
```

**Why This Works**:
- Deep violet = innovation, intelligence, future-thinking
- Vibrant orange = energy, creativity, action
- Bright purple = premium, modern tech, AI/digital

**Perfect For**:
- Tech startups
- Innovation-focused brands
- Digital product companies
- AI/ML consultancies

---

## Color Comparison

### Primary Colors
```
Navy (#1A3A52)        →  Deep Violet (#2D1B69)
Trust, stability      →  Innovation, intelligence
```

### Warm Accents
```
Terracotta (#D07855)  →  Vibrant Orange (#FF6B35)
Earthy, grounded      →  Energetic, creative
```

### Cool Accents
```
Cyan (#64B5F6)        →  Bright Purple (#A855F7)
Tech, clarity         →  Premium, modern
```

---

## Other Strong Alternatives Considered

### Option C: "Forest Premium"
```
Primary: #1B4332 (Deep Forest Green)
Accent Warm: #DDA15E (Amber Gold)
Accent Cool: #06D6A0 (Mint Green)
```
Vibe: Sustainable, premium, growth-focused

### Option D: "Monochrome Bold"
```
Primary: #1C1C1E (Near Black)
Accent Warm: #FF3B30 (Bright Red)
Accent Cool: #007AFF (Electric Blue)
```
Vibe: Minimal, ultra-modern, Apple-esque

### Option E: "Sunset Tech"
```
Primary: #1E3A8A (Royal Blue)
Accent Warm: #F59E0B (Sunset Orange)
Accent Cool: #8B5CF6 (Soft Purple)
```
Vibe: Friendly tech, approachable innovation

---

## Recommended: Set B (Electric Violet)

**Rationale**:
1. Strong contrast with Set A (Navy)
2. Modern 2024-2025 trend (purple = AI/tech)
3. Still professional but more innovative
4. Bold enough to show clear difference
5. Works on both light and dark backgrounds

---

## Implementation Strategy

### CSS Custom Properties with Data Attributes

```html
<!-- Default: Set A -->
<html data-color-scheme="set-a">

<!-- Alternative: Set B -->
<html data-color-scheme="set-b">
```

### Variable Structure
```css
:root[data-color-scheme="set-a"] {
  --color-primary: #1A3A52;
  --color-accent-warm: #D07855;
  --color-accent-cool: #64B5F6;
}

:root[data-color-scheme="set-b"] {
  --color-primary: #2D1B69;
  --color-accent-warm: #FF6B35;
  --color-accent-cool: #A855F7;
}
```

### Toggle Button
Simple button in header/corner to switch between schemes with localStorage persistence.

---

## Visual Impact Predictions

### Hero Section
**Set A (Navy)**: Professional, grounded, trustworthy
**Set B (Violet)**: Futuristic, innovative, bold

### Methodology Cards
**Set A**: Business consultancy feel
**Set B**: Tech product/startup feel

### Overall Brand Perception
**Set A**: Established consultancy, safe choice
**Set B**: Innovation leader, cutting-edge

---

**Recommendation**: Implement Set B (Electric Violet) as alternative
**Next Step**: Create toggle mechanism with localStorage
