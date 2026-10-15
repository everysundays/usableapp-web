import { query, type MotionBehavior } from '../behavior';
import { lib } from '../libs';

export const reveal: MotionBehavior = {
  name: 'reveal',
  match: '[data-kn-reveal]',
  needs: ['gsap', 'scrolltrigger'],
  when: (ctx) => ctx.options.reveal && !ctx.reduced,
  init(el, ctx) {
    const gsap = lib(ctx, 'gsap');
    const items = query(el, '[data-kn-reveal-item]');
    if (!items.length) return;
    const tween = gsap.from(items, {
      y: 65,
      autoAlpha: 0,
      stagger: 0.075,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 74%', toggleActions: 'play none none reverse' },
    });
    return () => tween.revert();
  },
};
