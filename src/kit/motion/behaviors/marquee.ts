import { all, on, type MotionBehavior } from '../behavior';

export const marquee: MotionBehavior = {
  name: 'marquee',
  match: '[data-kn-marquee]',
  init(el) {
    const tracks = () => [el, ...Array.from(el.children)].filter((n): n is HTMLElement => n instanceof HTMLElement);
    const setState = (state: string) => {
      for (const t of tracks()) t.style.animationPlayState = state;
    };
    return all([
      on(el, 'pointerenter', () => setState('paused')),
      on(el, 'pointerleave', () => setState('')),
    ]);
  },
};
