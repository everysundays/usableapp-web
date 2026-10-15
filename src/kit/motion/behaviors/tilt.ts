import { all, on, type MotionBehavior } from '../behavior';

export const tilt: MotionBehavior = {
  name: 'tilt',
  match: '[data-kn-tilt]',
  init(el, ctx) {
    if (!ctx.finePointer) return;
    return all([
      on(el, 'pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
        el.style.transform = `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translate(-3px, -3px)`;
      }),
      on(el, 'pointerleave', () => {
        el.style.transform = '';
      }),
    ]);
  },
};
