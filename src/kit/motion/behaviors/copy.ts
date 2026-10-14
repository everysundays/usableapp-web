import { on, type MotionBehavior } from '../behavior';

const FEEDBACK_MS = 1400;

export const copy: MotionBehavior = {
  name: 'copy',
  match: '[data-kn-copy]',
  init(el) {
    let timer = 0;
    const idle = el.textContent;
    const off = on(el, 'click', async () => {
      const text = el.dataset.knCopy || idle || '';
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        return;
      }
      el.textContent = 'COPIED';
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        el.textContent = idle;
      }, FEEDBACK_MS);
    });
    return () => {
      off();
      clearTimeout(timer);
      el.textContent = idle;
    };
  },
};
