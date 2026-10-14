import { all, on, type MotionBehavior } from '../behavior';

const HOVER_TARGETS = 'a, button, [role="button"], summary';
const DEFAULT_LABEL = 'CLICK';
const KNOCK_RELEASE_MS = 200;
const RIPPLE_MS = 700;

const FIST_SVG = `<svg viewBox="0 0 42 42" width="42" height="42" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g class="kn-cursor__burst" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
    <path d="M5 9l4 4M37 9l-4 4M21 2v6M9 33l-4 3M33 33l4 3"/>
  </g>
  <g class="kn-cursor__fist" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round">
    <path fill="#ffc7a8" d="M11 20.5c0-6.5 4-11 10.5-11S32 14 32 20.5v5c0 5.5-4.5 9.5-10.5 9.5S11 31 11 25.5z"/>
    <path fill="#ffc7a8" d="M11 24.5c-2.5-1-4-3-4-5.5s1.5-4 3.5-4"/>
    <path fill="none" d="M15 16.5v6M20 15v7M25 15v7M30 16.5v6"/>
    <path fill="#ffc7a8" d="M14 24h17c0 3-1 5-3 5H17c-2 0-3-2-3-5z"/>
  </g>
</svg>`;

export const cursor: MotionBehavior = {
  name: 'cursor',
  match: 'body',
  when: (ctx) => ctx.options.cursor === 'fist' && ctx.finePointer && !ctx.reduced,
  init(body) {
    const doc = body.ownerDocument;
    body.classList.add('kn-has-cursor');

    const fist = doc.createElement('div');
    fist.className = 'kn-cursor';
    fist.innerHTML = FIST_SVG;
    const label = doc.createElement('div');
    label.className = 'kn-cursor__label';
    label.textContent = DEFAULT_LABEL;
    body.append(fist, label);

    let x = 0;
    let y = 0;
    let frame = 0;
    const paint = () => {
      frame = 0;
      fist.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      label.style.transform = `translate(${x + 38}px, ${y + 34}px)`;
    };

    let audio: AudioContext | undefined;
    const knock = (freq = 200, vol = 0.05) => {
      audio ??= new AudioContext();
      const t = audio.currentTime;
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(60, t + 0.12);
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
      osc.connect(gain).connect(audio.destination);
      osc.start(t);
      osc.stop(t + 0.15);
    };

    const timers = new Set<number>();
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };

    const off = all([
      on(
        doc,
        'mousemove',
        (e) => {
          x = e.clientX;
          y = e.clientY;
          fist.classList.add('is-show');
          label.classList.add('is-show');
          if (!frame) frame = requestAnimationFrame(paint);
        },
        { passive: true },
      ),
      on(doc, 'mouseover', (e) => {
        const target = e.target instanceof Element ? e.target : null;
        fist.classList.toggle('is-big', !!target?.closest(HOVER_TARGETS));
        label.textContent = target?.closest<HTMLElement>('[data-kn-cursor]')?.dataset.knCursor || DEFAULT_LABEL;
      }),
      on(doc, 'mouseleave', () => {
        fist.classList.remove('is-show');
        label.classList.remove('is-show');
      }),
      on(doc, 'mousedown', () => fist.classList.add('is-knocking')),
      on(doc, 'mouseup', () => later(() => fist.classList.remove('is-knocking'), KNOCK_RELEASE_MS)),
      on(doc, 'click', (e) => {
        const ripple = doc.createElement('div');
        ripple.className = 'kn-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        body.append(ripple);
        later(() => ripple.remove(), RIPPLE_MS);
        knock();
      }),
    ]);

    return () => {
      off();
      cancelAnimationFrame(frame);
      for (const id of timers) clearTimeout(id);
      void audio?.close();
      for (const node of body.querySelectorAll('.kn-ripple')) node.remove();
      fist.remove();
      label.remove();
      body.classList.remove('kn-has-cursor');
    };
  },
};
