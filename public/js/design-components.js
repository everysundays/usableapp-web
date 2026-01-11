// Design System Web Components

// Design Card Component
class DesignCard extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'background', 'eyebrow', 'title', 'description', 'link-text', 'link-href', 'image-url', 'image-alt'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  getVariant() {
    return this.getAttribute('variant') || 'basic';
  }

  getBackground() {
    return this.getAttribute('background') || '';
  }

  render() {
    const variant = this.getVariant();
    const background = this.getBackground();
    const eyebrow = this.getAttribute('eyebrow') || '';
    const title = this.getAttribute('title') || '';
    const description = this.getAttribute('description') || '';
    const linkText = this.getAttribute('link-text') || '';
    const linkHref = this.getAttribute('link-href') || '';
    const imageUrl = this.getAttribute('image-url') || '';
    const imageAlt = this.getAttribute('image-alt') || '';

    const cardClasses = [
      'card',
      variant !== 'basic' ? `card-${variant}` : '',
      background ? `bg-${background}` : '',
    ].filter(Boolean).join(' ');

    let imageSection = '';
    if (variant === 'image' && imageUrl) {
      imageSection = `<div class="card-image-background" style="background-image: url('${imageUrl}');"></div>`;
    } else if (variant === 'split' && imageUrl) {
      imageSection = `
        <div class="card-image-section">
          <img src="${imageUrl}" alt="${imageAlt}" />
        </div>
      `;
    }

    const contentClass = variant === 'split' ? 'card-content-section' : 'card-content';

    // Load styles from design-system.css
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = '/styles/design-system.css';
    document.head.appendChild(styleLink);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .card {
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          padding: var(--card-padding, var(--space-xl));
          border-radius: var(--card-radius, var(--radius-lg));
          box-shadow: var(--card-shadow, var(--shadow-lg));
          transition: transform var(--card-transition, var(--transition-base)), box-shadow var(--card-transition, var(--transition-base));
          background-color: var(--card-bg, var(--color-white));
          color: var(--card-fg, var(--color-text));
        }
        
        .card-elevated:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-xl);
        }
        
        .card-image {
          background-size: cover;
          background-position: center;
          position: relative;
        }
        
        .card-image::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%);
          z-index: 1;
        }
        
        .card-image > * {
          position: relative;
          z-index: 2;
        }
        
        .card-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          padding: 0;
        }
        
        .card-image-section {
          position: relative;
          overflow: hidden;
        }
        
        .card-image-section img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .card-split:hover .card-image-section img {
          transform: scale(1.05);
        }
        
        .card-content-section,
        .card-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        
        .card-eyebrow {
          font-size: var(--text-content-sm);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          opacity: 0.8;
          color: inherit;
        }
        
        .card-title {
          font-size: var(--text-2xl);
          font-weight: 700;
          line-height: 1.2;
          color: inherit;
          margin-bottom: var(--space-sm);
        }
        
        .card-description {
          font-size: var(--text-content-base);
          line-height: 1.6;
          color: inherit;
          opacity: 0.9;
        }
        
        .card-link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          font-size: var(--text-content-sm);
          font-weight: 700;
          color: inherit;
          margin-top: var(--space-md);
          transition: all var(--transition-base);
          text-decoration: none;
        }
        
        .card-link:hover {
          transform: translateX(4px);
        }
        
        .card-image-background {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          z-index: 0;
        }
        
        .bg-navy {
          background-color: hsl(224, 32%, 26%);
          color: hsl(0, 0%, 100%);
        }
        
        .bg-navy-light {
          background-color: hsl(224, 32%, 95%);
          color: hsl(224, 32%, 26%);
        }
        
        .bg-sunset {
          background-color: hsl(352, 90%, 95%);
          color: hsl(224, 32%, 26%);
        }
        
        .bg-forest {
          background-color: hsl(124, 32%, 95%);
          color: hsl(224, 32%, 26%);
        }
        
        .bg-fire {
          background-color: hsl(14, 100%, 96%);
          color: hsl(224, 32%, 26%);
        }
        
        .bg-night {
          background-color: hsl(224, 25%, 90%);
          color: hsl(224, 32%, 26%);
        }
        
        .bg-sky {
          background-color: hsl(177, 60%, 95%);
          color: hsl(224, 32%, 26%);
        }
        
        .bg-warm {
          background-color: hsl(25, 100%, 96%);
          color: hsl(224, 32%, 26%);
        }
        
        .bg-cool {
          background-color: hsl(270, 70%, 95%);
          color: hsl(224, 32%, 26%);
        }
        
        .bg-white {
          background-color: hsl(0, 0%, 100%);
          color: hsl(224, 32%, 26%);
        }
        
        .bg-block {
          background-color: hsl(43, 19%, 90%);
          color: hsl(224, 32%, 26%);
        }
        
        .bg-navy *,
        .bg-navy-light *,
        .bg-sunset *,
        .bg-forest *,
        .bg-fire *,
        .bg-night *,
        .bg-sky *,
        .bg-warm *,
        .bg-cool *,
        .bg-white *,
        .bg-block * {
          color: inherit;
        }
      </style>
      <div class="${cardClasses}">
        ${imageSection}
        <div class="${contentClass}">
          ${eyebrow ? `<span class="card-eyebrow">${eyebrow}</span>` : ''}
          ${title ? `<h3 class="card-title">${title}</h3>` : ''}
          ${description ? `<p class="card-description">${description}</p>` : ''}
          ${linkText && linkHref ? `<a href="${linkHref}" class="card-link">${linkText}</a>` : ''}
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('design-card', DesignCard);

// Design Button Component
class DesignButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'href'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || 'base';
    const href = this.getAttribute('href');
    const label = this.textContent || this.getAttribute('label') || 'Button';

    const buttonClasses = [
      'design-button',
      `design-button-${variant}`,
      `design-button-${size}`,
    ].filter(Boolean).join(' ');

    const tag = href ? 'a' : 'button';
    const hrefAttr = href ? `href="${href}"` : '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        
        .design-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5em;
          padding: 1em 2em;
          border-radius: 9999px;
          font-size: 1em;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 250ms ease;
          background-color: hsl(40, 66%, 47%);
          color: hsl(0, 0%, 100%);
        }
        
        .design-button:hover {
          background-color: hsl(40, 69%, 42%);
          transform: translateY(-2px);
        }
        
        .design-button-secondary {
          background-color: transparent;
          color: hsl(224, 32%, 26%);
          border: 2px solid hsl(224, 32%, 26%);
        }
        
        .design-button-secondary:hover {
          background-color: hsl(224, 32%, 26%);
          color: hsl(0, 0%, 100%);
        }
        
        .design-button-sm {
          padding: 0.5em 1em;
          font-size: 0.875em;
        }
        
        .design-button-lg {
          padding: 1.5em 3em;
          font-size: 1.125em;
        }
      </style>
      <${tag} class="${buttonClasses}" ${hrefAttr}>
        <slot>${label}</slot>
      </${tag}>
    `;
  }
}

customElements.define('design-button', DesignButton);
