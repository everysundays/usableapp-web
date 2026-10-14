import type { KitContext } from '../../types';
import { all, on, type MotionBehavior } from '../behavior';
import { lib } from '../libs';

const DRAG_CLASS = 'kn-rail--drag';

const dragMode = (ctx: KitContext) => ctx.options.rail === 'drag' && !ctx.reduced;

const parts = (el: HTMLElement) => ({
  viewport: el.querySelector<HTMLElement>('[data-kn-rail-viewport]'),
  track: el.querySelector<HTMLElement>('[data-kn-rail-track]'),
  prev: el.querySelector<HTMLElement>('[data-kn-rail-prev]'),
  next: el.querySelector<HTMLElement>('[data-kn-rail-next]'),
});

/** card width plus the track's gap, read live so the mobile gap stays in sync */
const stepWidth = (track: HTMLElement) => {
  const first = track.firstElementChild;
  if (!first) return 0;
  return first.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0);
};

export const railDrag: MotionBehavior = {
  name: 'rail-drag',
  match: '[data-kn-rail]',
  needs: ['gsap', 'draggable', 'inertia'],
  when: dragMode,
  init(el, ctx) {
    const gsap = lib(ctx, 'gsap');
    const Draggable = lib(ctx, 'draggable');
    const { viewport, track, prev, next } = parts(el);
    if (!viewport || !track) return;

    el.classList.add(DRAG_CLASS);
    const cards = () => Array.from(track.children);
    const limit = () => Math.min(0, viewport.clientWidth - track.scrollWidth - innerWidth * 0.04);
    const snap = (x: number) => {
      const step = stepWidth(track);
      return step ? gsap.utils.clamp(limit(), 0, Math.round(x / step) * step) : 0;
    };
    const skew = (deltaX: number) =>
      gsap.to(cards(), { skewX: gsap.utils.clamp(-5, 5, deltaX / 7), duration: 0.18, overwrite: true });
    const unskew = (duration: number) => gsap.to(cards(), { skewX: 0, duration, ease: 'power3.out', overwrite: true });
    const indexAt = (x: number) => Math.round(Math.abs(x / (stepWidth(track) || 1)));

    let index = 0;
    const goTo = (i: number) => {
      index = gsap.utils.clamp(0, Math.max(0, cards().length - 1), i);
      gsap.to(track, { x: snap(-index * stepWidth(track)), skewX: 0, duration: 0.9, ease: 'power4.out', overwrite: true });
    };

    const [drag] = Draggable.create(track, {
      type: 'x',
      trigger: viewport,
      inertia: true,
      dragResistance: 0.08,
      edgeResistance: 0.82,
      allowNativeTouchScrolling: false,
      dragClickables: true,
      bounds: { minX: limit(), maxX: 0 },
      snap: { x: snap },
      onDrag: () => skew(drag.deltaX),
      onThrowUpdate: () => skew(drag.deltaX),
      onDragEnd: () => {
        unskew(0.55);
        index = indexAt(drag.endX);
      },
      onThrowComplete: () => {
        unskew(0.45);
        index = indexAt(drag.endX);
      },
    });

    const off = all([
      prev ? on(prev, 'click', () => goTo(index - 1)) : () => undefined,
      next ? on(next, 'click', () => goTo(index + 1)) : () => undefined,
      on(window, 'resize', () => {
        drag.applyBounds({ minX: limit(), maxX: 0 });
        goTo(index);
      }),
    ]);

    return () => {
      off();
      drag.kill();
      gsap.killTweensOf([track, ...cards()]);
      gsap.set([track, ...cards()], { clearProps: 'transform' });
      el.classList.remove(DRAG_CLASS);
    };
  },
};

export const railSnap: MotionBehavior = {
  name: 'rail-snap',
  match: '[data-kn-rail]',
  when: (ctx) => !dragMode(ctx),
  init(el, ctx) {
    const { viewport, track, prev, next } = parts(el);
    if (!viewport || !track) return;
    const scroll = (dir: -1 | 1) =>
      viewport.scrollBy({ left: dir * stepWidth(track), behavior: ctx.reduced ? 'auto' : 'smooth' });
    return all([
      prev ? on(prev, 'click', () => scroll(-1)) : () => undefined,
      next ? on(next, 'click', () => scroll(1)) : () => undefined,
    ]);
  },
};
