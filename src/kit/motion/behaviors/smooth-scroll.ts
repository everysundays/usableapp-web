import type { MotionBehavior } from '../behavior';
import { lib } from '../libs';

export const smoothScroll: MotionBehavior = {
  name: 'smooth-scroll',
  match: 'html',
  needs: ['gsap', 'scrolltrigger', 'lenis'],
  when: (ctx) => ctx.options.smoothScroll && !ctx.reduced,
  init(_el, ctx) {
    const gsap = lib(ctx, 'gsap');
    const ScrollTrigger = lib(ctx, 'scrolltrigger');
    const Lenis = lib(ctx, 'lenis');

    const lenis = new Lenis({ duration: 1.08, smoothWheel: true, wheelMultiplier: 0.9 });
    const offScroll = lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      offScroll();
      lenis.destroy();
    };
  },
};
