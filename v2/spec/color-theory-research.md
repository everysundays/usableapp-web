# UI Color Theory & Design Principles

## Current Problem
- Good color palette selected
- BUT: No design theory applied
- Colors used inconsistently
- No systematic approach to color application

---

## Fundamental Color Theory for UI

### 1. Color Roles (Not Just Names)

Every color in UI must have a **functional role**:

#### Semantic Roles:
- **Dominant**: Sets the mood (60% rule)
- **Accent**: Draws attention (10% rule)
- **Neutral**: Provides rest (30% rule)
- **Functional**: Actions, states, feedback

#### Perceptual Roles:
- **Background**: Recedes, provides context
- **Foreground**: Advances, demands attention
- **Border/Separator**: Defines boundaries
- **Interactive**: Signals affordance

---

## 2. The 60-30-10 Rule (PROPERLY APPLIED)

### 60% - Dominant/Base
**Purpose**: Creates the environment
**Psychological**: Should be neutral, restful
**Application**:
- Backgrounds
- Large containers
- Breathing room

**For Usable App**:
- Base Gray (#F5F7F9): Section backgrounds
- White (#FFFFFF): Alternating sections
- **Total coverage**: 60% of visual space

### 30% - Secondary/Supporting
**Purpose**: Provides structure and hierarchy
**Psychological**: Should be trustworthy, readable
**Application**:
- Typography (body text)
- Borders and dividers
- Card backgrounds
- Navigation elements

**For Usable App**:
- Navy (#1A3A52): Text, headings, structure
- **Total coverage**: 30% of visual space

### 10% - Accent/Action
**Purpose**: Guides eye, prompts action
**Psychological**: Should create interest, urgency
**Application**:
- CTAs (Call to Action)
- Important highlights
- Interactive elements
- Visual punctuation

**For Usable App**:
- Terracotta (#D07855): Warm actions
- Cyan (#64B5F6): Cool highlights
- **Total coverage**: 10% MAXIMUM

---

## 3. Color Hierarchy Principles

### Visual Weight Order (Lightest to Heaviest):
1. **Lightest**: Backgrounds (base gray, white)
2. **Light**: Containers, cards (white on gray)
3. **Medium**: Text, borders (navy)
4. **Heavy**: Headings (navy, colored)
5. **Heaviest**: CTAs, accents (terracotta, cyan)

### Attention Hierarchy:
1. **Primary**: Hero CTA (terracotta button)
2. **Secondary**: Section accents (cyan highlights)
3. **Tertiary**: Hover states (color shifts)
4. **Background**: Everything else (neutral)

---

## 4. Contrast Theory

### WCAG Standards:
- **AAA**: 7:1 ratio (ideal)
- **AA**: 4.5:1 ratio (minimum body)
- **AA Large**: 3:1 ratio (minimum headings)

### Functional Contrast:
- **Reading Text**: Navy on White = 12.6:1 ✓
- **Accents**: Should contrast with both background AND text
- **Interactive**: Must be distinguishable from non-interactive

---

## 5. Color Temperature Balance

### Warm vs Cool:
- **Warm** (Terracotta): Human, approachable, action
- **Cool** (Navy, Cyan): Trust, calm, information
- **Neutral** (Gray, White): Rest, structure

### Balance Rules:
- If background is cool (white/gray) → accents can be warm
- If background is warm → accents should be cool
- Never compete warm vs warm in same small space

---

## 6. Systematic Color Application

### Per Section Strategy:

#### Hero (Entry Point):
- **Background**: White (60%) - fresh start
- **Text**: Navy (30%) - trustworthy
- **Accent**: None - let typography speak

#### What We Do (Information):
- **Background**: Base Gray (60%) - restful
- **Cards**: White (structural)
- **Text**: Navy (30%) - readable
- **Accent**: Terracotta (10%) - step numbers

#### How It Works (Technical):
- **Background**: White (60%) - clarity
- **Heading**: Cyan (10%) - technical feel
- **Diagram**: Navy dark + Cyan - blueprint
- **Text**: Navy (30%) - readable

#### Showcase (Results):
- **Background**: Base Gray (60%) - gallery
- **Heading**: Terracotta (10%) - human results
- **Cards**: White (structural)
- **Text**: Navy (30%) - readable

#### Pricing (Action):
- **Background**: White (60%) - clarity
- **Text**: Navy (30%) - structure
- **Badges**: Terracotta (10%) - calls to action

#### Contact (Conversion):
- **Background**: Base Gray (60%) - calm close
- **Card**: White (structural)
- **CTA Button**: Terracotta (10%) - action

---

## 7. Color Distribution Formula

### Per Section:
```
Background: 60% area
├─ Section background (1 color)
└─ Card/container backgrounds (white/gray)

Structure: 30% area
├─ Body text (navy)
├─ Borders (navy/gray)
└─ Headings (navy + 1 accent color)

Accent: 10% area
├─ Section heading accent (1 color)
├─ Interactive elements (1-2 colors)
└─ CTAs (1 color)
```

### Accent Color Rules:
- Maximum 2 accent colors per section
- Only 1 dominant accent per section
- Accents should not compete for attention

---

## 8. Functional Color Mapping

### Navy (#1A3A52) - Trust & Structure
**Use for**:
- All body text
- Primary headings
- Borders
- Non-interactive elements
- Footer background

**Do NOT use for**:
- Small accents
- Action buttons
- Highlights

### Terracotta (#D07855) - Human & Action
**Use for**:
- Human-focused elements (step numbers)
- Primary CTAs
- Showcase heading (results = human)
- Card hover states
- Action buttons

**Do NOT use for**:
- Body text
- Large backgrounds
- Structural elements

### Cyan (#64B5F6) - Technical & Information
**Use for**:
- Technical section heading (How It Works)
- Process highlights
- Informational borders
- Link hover states
- Blueprint diagram elements

**Do NOT use for**:
- Primary CTAs
- Body text
- Warm/human elements

### Base Gray (#F5F7F9) - Rest & Breathing
**Use for**:
- Alternating section backgrounds
- Card container backgrounds
- Subtle dividers

**Do NOT use for**:
- Text
- Interactive elements
- Primary surfaces

---

## 9. Color Mistakes to Avoid

### ❌ WRONG:
1. Using accent colors for structure (terracotta borders)
2. Using structural colors for accents (navy button)
3. Competing accents (terracotta + cyan in same small element)
4. Accent overload (>10% accent coverage)
5. No color hierarchy (everything same weight)
6. Warm on warm, cool on cool (low contrast)

### ✓ CORRECT:
1. Accent colors ONLY for 10% emphasis
2. Structural colors for 30% framework
3. One dominant accent per section
4. Maximum 10% total accent coverage
5. Clear visual weight hierarchy
6. Temperature contrast (warm accent on cool base)

---

## 10. Testing Color System

### Visual Weight Test:
- Squint at page
- What catches your eye first? (Should be CTAs)
- What do you see second? (Should be headings)
- What fills the rest? (Should be neutral structure)

### 60-30-10 Test:
- Take screenshot
- Use color picker to measure pixel coverage
- Base colors: ~60%
- Navy text/structure: ~30%
- Accents: ~10%

### Hierarchy Test:
- Remove all color
- Does hierarchy still work? (size, weight, spacing)
- Add color back
- Does color reinforce (not create) hierarchy?

---

## Implementation Checklist

### For Each Component:
- [ ] Background is neutral (60%)
- [ ] Text/structure is navy (30%)
- [ ] Accents are limited (10%)
- [ ] Only 1-2 accent colors per section
- [ ] Accents have functional purpose
- [ ] Color reinforces (not creates) hierarchy
- [ ] Contrast meets WCAG standards
- [ ] Temperature balance maintained

---

## References
- **Refactoring UI**: Color chapter
- **Material Design**: Color system
- **Apple HIG**: Color and contrast
- **Laws of UX**: Von Restorff Effect (isolation principle)
- **The Non-Designer's Design Book**: Robin Williams

---

**Next**: Apply this theory systematically to all components
