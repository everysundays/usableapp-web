# Technical Requirements

## Project Type
Single-page corporate proposal website

## Timeline
**Launch Deadline**: November 5, 2025
**Current Date**: October 13, 2025
**Available Time**: ~3 weeks

## Core Requirements

### Performance
- Fast load time (target: < 2s on 3G)
- Minimal JavaScript for interactivity
- Optimized images (lazy loading)
- Font loading strategy (font-display: swap)

### Responsiveness
- Mobile-first approach
- Breakpoints: mobile (< 640px), tablet (640-1024px), desktop (> 1024px)
- Touch-friendly interactions
- Readable typography at all sizes

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
- No IE11 requirement (unless specified)
- Progressive enhancement approach

### Content Management
- Static site (no CMS requirement mentioned yet)
- Easy content updates (possibly through markdown/JSON)
- Image optimization pipeline

### Anti-Spam Measures
- Phone number and contact info as text-in-image (not selectable text)
- Form protection (if contact form added)

## Tech Stack Considerations

### What's NOT Required (avoid from v1):
- No-code platform dependency (Lovable)
- Heavy component libraries (shadcn/ui, extensive Radix UI)
- WordPress integration
- Complex state management (React Query)
- Form PDF generation
- Bilingual language switching
- Over-engineered architecture

### Recommended Tech Stack

Given timeline (3 weeks), requirements (single page, flip interaction, tracking), and preference for simplicity:

**Option 1: Astro + Vanilla JS (Recommended)**
- **Why**: Perfect for content-focused single page, fast, modern
- **Framework**: Astro (static generation, zero JS by default)
- **Styling**: Custom CSS with CSS variables for theming
- **Interactivity**: Vanilla JS for flip card, smooth scroll
- **Build**: Built-in Vite, fast HMR
- **Deploy**: Static HTML output, works anywhere
- **Pros**: Fast, modern DX, minimal overhead, SEO-friendly
- **Cons**: None for this use case

**Option 2: Plain HTML/CSS/JS**
- **Why**: Maximum simplicity, no build step needed
- **Stack**: Just HTML5, modern CSS, vanilla JavaScript
- **Styling**: CSS custom properties, CSS Grid/Flexbox
- **Pros**: Zero dependencies, instant deploy, complete control
- **Cons**: Manual asset optimization, no dev server features

**Option 3: Vite + Vanilla JS**
- **Why**: Modern DX without framework overhead
- **Setup**: Vite for dev server and build
- **Code**: Plain HTML/CSS/JS, no framework
- **Pros**: Fast HMR, asset optimization, plugin ecosystem
- **Cons**: Slightly more setup than plain HTML

**Final Recommendation**: **Astro** - Best balance of modern tooling, performance, and simplicity for this project. Single-page site is Astro's sweet spot.

### Tech Stack Details (Astro)

```
astro@latest
├── No UI framework needed (vanilla JS components)
├── @astrojs/sitemap (SEO)
├── CSS: Custom (no Tailwind needed)
└── Analytics: Simple event tracking (vanilla)
```

**File Structure**:
```
/src
  /pages
    index.astro (main page)
  /components
    Hero.astro
    Services.astro
    Methodology.astro
    Showcase.astro
    Pricing.astro
    Contact.astro (flip card)
  /layouts
    Layout.astro (base)
  /styles
    global.css
    variables.css (color palette)
  /scripts
    flip-card.js
    tracking.js
  /assets
    /fonts (Anakotmai)
    /images
/public
  (static assets)
```

## Assets & Resources

### Fonts
- Source: `/Users/Lh/Sites/_UA/fonts/anakotmai.css`
- Copy to project or link relatively
- Formats: woff2 (primary), woff (fallback), eot (legacy)

### Images
- Methodology diagram (from spec/306994_0.jpg)
- 2 project showcases (TBD)
- Contact section graphics (phone/location as image)

## Deployment Considerations
- Static hosting (Netlify, Vercel, Cloudflare Pages)
- Custom domain support
- SSL/HTTPS
- CDN for assets

## Development Approach
- Start with HTML/CSS mockup
- Add interactivity progressively
- Test on real devices
- Optimize before launch

## Contact & Tracking

### Business Card Flip Interaction
- **Frontend**: CSS 3D transform flip animation
- **Trigger**: Click/tap (mobile), hover option (desktop)
- **Tracking**: Event listener logs flip events
- **Data**: Simple analytics (Google Analytics event, or custom)
- **Privacy**: Client-side only, no PII stored

### Contact Method
- **Email**: Direct mailto: link
- **Phone**: +66 61 831 7773 (clickable tel: link on mobile)
- **No form**: Direct contact only
- **Anti-spam**: Info revealed only after flip interaction

### Analytics Implementation
```javascript
// Simple event tracking
function trackCardFlip() {
  // Google Analytics 4
  gtag('event', 'business_card_flip', {
    'event_category': 'engagement',
    'event_label': 'contact_reveal'
  });

  // Or custom endpoint
  fetch('/api/track', {
    method: 'POST',
    body: JSON.stringify({ event: 'card_flip', timestamp: Date.now() })
  });
}
```

## SEO Requirements
- Semantic HTML structure
- Meta tags (title, description, OG tags)
- Schema.org markup (Organization, Service)
- Sitemap (single page, but still good practice)
- Analytics (TBD)

---

**Decision Point**: Choose tech stack before implementation. Recommend starting with plain HTML/CSS/JS or Astro for simplicity and performance.
