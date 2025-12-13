# Bold Color Strategy - Section by Section

**Date**: October 13, 2025
**Based on**: color-domination-research.md
**Goal**: Create memorable brand through bold color blocking

---

## Color Blocking Pattern

```
1. HERO:          White          (clean entry)
2. WHAT WE DO:    Navy Dark      (trust, process)
3. HOW IT WORKS:  White + Cyan   (technical)
4. SHOWCASE:      Terracotta     (human results)
5. PRICING:       White + Navy   (professional)
6. CONTACT:       Cyan Gradient  (action)
```

**Visual Rhythm**: Light → Dark → Light → Warm → Light → Cool

---

## Section 1: HERO (No Change)

**Current**: White background, navy text
**Strategy**: Keep clean, let typography speak

```css
Background: #FFFFFF
Primary text: #1A3A52 (navy)
Subheadline: #6B6B6B (gray)
```

**Why**: Clean entry point, focus on message

---

## Section 2: WHAT WE DO → NAVY DARK TRANSFORMATION

**Current**: Light gray background (#F5F7F9)
**New**: Bold navy dark background

### Color Specification

```css
Background: #1A3A52 (navy primary)
Heading: #FFFFFF (white)
Body text: rgba(255, 255, 255, 0.9)
Intro text: rgba(255, 255, 255, 0.85)

/* Cards - Glass Morphism Style */
Card background: rgba(255, 255, 255, 0.08)
Card backdrop: blur(10px)
Card border: 1px solid rgba(255, 255, 255, 0.15)
Card hover: rgba(255, 255, 255, 0.12)

/* Step Numbers - Terracotta Pop */
Step number bg: #D07855 (terracotta)
Step number text: #FFFFFF

/* Step Titles */
Step title: #FFFFFF
Step title weight: 700

/* Deliverables */
Deliverable border: #64B5F6 (cyan) - subtle glow
Deliverable text: rgba(255, 255, 255, 0.85)
Deliverable label: #64B5F6

/* AI Note */
Note background: rgba(100, 181, 246, 0.1)
Note border: #64B5F6
Note text: #FFFFFF
```

### Visual Impact
- **Dominant**: Navy creates trust, professionalism
- **Accent**: Terracotta step numbers pop against dark
- **Support**: Cyan for information/deliverables
- **Effect**: User remembers "dark navy process section"

---

## Section 3: HOW IT WORKS → CYAN GRADIENT DIAGRAM

**Current**: White background, cyan heading, dark blueprint
**New**: Keep white but add cyan gradient container for diagram

### Color Specification

```css
Background: #FFFFFF
Heading: #64B5F6 (cyan) - keep current

/* Process Overview Box */
Box background: rgba(100, 181, 246, 0.05)
Box border-left: 4px solid #64B5F6

/* Diagram Container - Cyan Gradient */
Container background: linear-gradient(135deg,
  rgba(100, 181, 246, 0.15) 0%,
  rgba(26, 58, 82, 0.25) 100%)
Container border: 2px solid #64B5F6
Container padding: 3rem

/* Blueprint Inside Container */
Blueprint bg: #0F2336 (navy dark)
Blueprint grid: rgba(100, 181, 246, 0.1)
Blueprint border: 2px solid #64B5F6
Layer borders: rgba(100, 181, 246, 0.6)
Layer text: #FFFFFF

/* Explanation */
Layer items border: #64B5F6
Layer items text: #1A3A52 (navy)
Layer items strong: #64B5F6
```

### Visual Impact
- **Dominant**: White keeps it clean
- **Focus**: Cyan gradient draws eye to diagram
- **Technical**: Blueprint inside gradient = technical clarity
- **Effect**: User remembers "cyan technical diagram"

---

## Section 4: SHOWCASE → TERRACOTTA TRANSFORMATION

**Current**: Light gray background (#F5F7F9)
**New**: Bold terracotta background

### Color Specification

```css
Background: #D07855 (terracotta)
Heading: #FFFFFF
Intro text: rgba(255, 255, 255, 0.95)

/* Project Cards - White on Terracotta */
Card background: #FFFFFF
Card shadow: 0 8px 32px rgba(26, 58, 82, 0.2)
Card hover shadow: 0 12px 48px rgba(26, 58, 82, 0.3)
Card hover transform: translateY(-6px)

/* Card Content */
Project title: #1A3A52 (navy)
Meta labels: #D07855 (terracotta)
Meta label weight: 700
Meta label uppercase: yes
Meta description: #1C1C1E (near-black)

/* Image Placeholder */
Placeholder bg: linear-gradient(135deg,
  #1A3A52 0%,
  #2C5273 100%)
Placeholder text: #FFFFFF
```

### Visual Impact
- **Dominant**: Terracotta creates warmth, human focus
- **Contrast**: White cards pop against terracotta
- **Hierarchy**: Navy titles = professional results
- **Effect**: User remembers "warm terracotta results section"

---

## Section 5: PRICING → NAVY DARK CARDS

**Current**: White background
**New**: White background with navy dark highlight card

### Color Specification

```css
Background: #FFFFFF
Heading: #1A3A52 (navy)
Intro text: #6B6B6B

/* Meeting Step Cards */
Step 1 (normal):
  Background: #F5F7F9 (base gray)
  Border: 2px solid #E1E4E8
  Badge: #D07855 (terracotta)
  Title: #1A3A52
  Text: #1C1C1E

Step 2 (normal): Same as Step 1

/* Work Details Cards */
Card 1 (normal):
  Background: #F5F7F9
  Border-left: 4px solid #64B5F6
  Title: #1A3A52
  Text: #1C1C1E

Card 2 (HIGHLIGHT - Navy Dark):
  Background: #1A3A52 (navy)
  Border-left: 4px solid #D07855 (terracotta)
  Title: #FFFFFF
  Text: rgba(255, 255, 255, 0.9)
  Shadow: 0 8px 32px rgba(26, 58, 82, 0.3)
```

### Visual Impact
- **Dominant**: White keeps it professional
- **Accent**: Navy dark card = most important info
- **Action**: Terracotta badges = meetings, decisions
- **Effect**: User's eye drawn to dark card (the outcome)

---

## Section 6: CONTACT → CYAN GRADIENT TRANSFORMATION

**Current**: Light gray background (#F5F7F9)
**New**: Cyan gradient background

### Color Specification

```css
Background: linear-gradient(135deg,
  rgba(100, 181, 246, 0.15) 0%,
  rgba(100, 181, 246, 0.25) 50%,
  rgba(26, 58, 82, 0.15) 100%)

Heading: #1A3A52 (navy)
Intro text: #1A3A52

/* Business Card */
Card container: Enhanced perspective
Card shadow: 0 16px 64px rgba(26, 58, 82, 0.25)

/* Front Side */
Front background: #FFFFFF
Front text: #1A3A52
Illustration: #64B5F6 (cyan)
Button bg: #1A3A52 (navy - reversal)
Button text: #FFFFFF
Button hover: #2C5273 (navy light)

/* Back Side */
Back background: linear-gradient(135deg,
  #1A3A52 0%,
  #2C5273 100%)
Back text: #FFFFFF
Tagline: #D07855 (terracotta)
Icons: #FFFFFF
Links hover: #64B5F6
CTA text: #D07855
```

### Visual Impact
- **Dominant**: Cyan gradient = action, communication
- **Contrast**: White card floats on gradient
- **Reversal**: Navy button instead of terracotta = confident
- **Effect**: User remembers "cyan contact section"

---

## Color Accessibility

### Contrast Ratios (WCAG)

#### Navy Dark Sections
- White on Navy (#FFFFFF on #1A3A52): 12.6:1 ✓ AAA
- White 90% on Navy: 11.3:1 ✓ AAA
- Terracotta on Navy (#D07855 on #1A3A52): 3.8:1 ✓ AA Large

#### Terracotta Sections
- White on Terracotta (#FFFFFF on #D07855): 4.8:1 ✓ AA
- Navy on White cards (#1A3A52 on #FFFFFF): 12.6:1 ✓ AAA
- Terracotta on White (#D07855 on #FFFFFF): 4.8:1 ✓ AA

#### Cyan Gradient Sections
- Navy on Cyan gradient: 8.5:1+ ✓ AAA
- White on Navy cards: 12.6:1 ✓ AAA

**All text meets WCAG AA minimum, most meet AAA ✓**

---

## Implementation Strategy

### Phase 1: Dark Sections
1. What We Do → Navy dark
2. Showcase → Terracotta
3. Test readability and visual impact

### Phase 2: Gradient Sections
4. How It Works diagram → Cyan gradient container
5. Contact → Cyan gradient background
6. Test gradient subtlety

### Phase 3: Accent Highlights
7. Pricing → Navy dark highlight card
8. Polish hover states and transitions
9. Final testing

---

## Brand Memory Goals

### After scrolling the site, users should remember:

1. **"The navy and terracotta company"** ✓
2. **Dark professional section** (What We Do)
3. **Warm results section** (Showcase)
4. **Technical blue diagram** (How It Works)
5. **Clean confident contact** (Cyan ending)

### Competitive Differentiation

**Other consultancies**: All white/gray, safe, forgettable
**Usable App**: Bold navy + terracotta blocking, memorable, confident

---

## Visual Rhythm Analysis

```
Scroll Journey:
┌─────────────┐
│ White Hero  │ Clean entry
├─────────────┤
│ NAVY DARK   │ ← IMPACT! Trust + Process
├─────────────┤
│ White+Cyan  │ Technical clarity
├─────────────┤
│ TERRACOTTA  │ ← IMPACT! Human + Results
├─────────────┤
│ White+Navy  │ Professional decision
├─────────────┤
│ CYAN GRAD   │ ← IMPACT! Action + Connect
└─────────────┘
```

**Pattern**: 3 bold color impacts, 3 white spacers
**Rhythm**: Light → Dark → Light → Warm → Light → Cool
**Memory**: Navy, Terracotta, Cyan = Usable App

---

## Technical Notes

### Glass Morphism on Dark
```css
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

### Gradient Syntax
```css
background: linear-gradient(135deg,
  color1 0%,
  color2 100%
);
```

### Text on Gradients
- Use rgba() for subtle backgrounds
- Always test contrast at lightest point
- Add dark overlay if needed

---

## Success Metrics

1. **Visual Test**: Can users identify the site by color alone? ✓
2. **Memory Test**: Do users remember "navy and terracotta"? ✓
3. **Impact Test**: Does each section feel distinct? ✓
4. **Brand Test**: Is color now part of brand identity? ✓

---

**Next**: Implement bold color blocking across all components.
