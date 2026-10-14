import { all, on, query, type MotionBehavior } from '../behavior';
import { lib } from '../libs';

const ENTER_ROTATION = [-12, 10, -8, 13, -9];

const restRotation = (item: HTMLElement) => parseFloat(getComputedStyle(item).getPropertyValue('--kn-rest-r')) || 0;

export const plopIn: MotionBehavior = {
  name: 'plop-in',
  match: '[data-kn-plop]',
  needs: ['gsap', 'scrolltrigger'],
  when: (ctx) => !ctx.reduced,
  init(el, ctx) {
    const gsap = lib(ctx, 'gsap');
    // the stage is display:none on narrow viewports and GSAP would animate nothing
    if (!el.offsetParent) return;
    const items = query(el, '[data-kn-plop-item]');
    if (!items.length) return;
    const rest = items.map(restRotation);

    const enter = gsap.fromTo(
      items,
      { scale: 0.06, y: 150, rotation: (i: number) => ENTER_ROTATION[i % ENTER_ROTATION.length] ?? 0, transformOrigin: '50% 90%' },
      {
        scale: 1,
        y: 0,
        rotation: (i: number) => rest[i] ?? 0,
        duration: 0.72,
        stagger: 0.12,
        ease: 'back.out(2.4)',
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      },
    );

    const hover = ctx.finePointer
      ? items.flatMap((item, i) => {
          const lift = () =>
            gsap.to(item, { y: -64, scale: 1.045, rotation: 0, zIndex: 30, duration: 0.48, ease: 'back.out(1.9)', overwrite: true });
          const drop = () => gsap.to(item, { y: 0, scale: 1, rotation: rest[i] ?? 0, zIndex: i + 1, duration: 0.62, ease: 'power3.out' });
          return [on(item, 'pointerenter', lift), on(item, 'focusin', lift), on(item, 'pointerleave', drop), on(item, 'focusout', drop)];
        })
      : [];

    return () => {
      all(hover)();
      gsap.killTweensOf(items);
      enter.revert();
    };
  },
};

export const stepNote: MotionBehavior = {
  name: 'step-note',
  match: '[data-kn-step-note]',
  needs: ['gsap', 'scrolltrigger'],
  when: (ctx) => !ctx.reduced,
  init(el, ctx) {
    const gsap = lib(ctx, 'gsap');
    const tween = gsap.from(el, {
      y: 22,
      autoAlpha: 0,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
    return () => tween.revert();
  },
};

export const blob: MotionBehavior = {
  name: 'blob',
  match: '[data-kn-blob]',
  needs: ['gsap', 'scrolltrigger'],
  when: (ctx) => !ctx.reduced,
  init(el, ctx) {
    const gsap = lib(ctx, 'gsap');
    const trigger = el.closest<HTMLElement>('[data-kn-section="steps"]') ?? el;
    const tween = gsap.to(el, {
      yPercent: -14,
      ease: 'none',
      scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: 0.45 },
    });
    return () => tween.revert();
  },
};
