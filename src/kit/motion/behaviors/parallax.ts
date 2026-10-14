import type { MotionBehavior } from '../behavior';
import { lib } from '../libs';

export const parallax: MotionBehavior = {
  name: 'parallax',
  match: '[data-kn-parallax="hero-art"]',
  needs: ['gsap', 'scrolltrigger'],
  when: (ctx) => !ctx.reduced,
  init(el, ctx) {
    const gsap = lib(ctx, 'gsap');
    const trigger = el.closest<HTMLElement>('[data-kn-section="hero"]') ?? el;
    const tween = gsap.to(el, {
      yPercent: 9,
      rotation: 0,
      ease: 'none',
      scrollTrigger: { trigger, start: 'top top', end: 'bottom top', scrub: 0.55 },
    });
    return () => tween.revert();
  },
};
