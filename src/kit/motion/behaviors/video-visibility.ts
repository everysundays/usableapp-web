import type { MotionBehavior } from '../behavior';

export const videoVisibility: MotionBehavior = {
  name: 'video-visibility',
  match: 'video[data-kn-video]',
  init(el) {
    if (!(el instanceof HTMLVideoElement)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void el.play().catch(() => undefined);
        else el.pause();
      },
      { threshold: 0.38 },
    );
    io.observe(el);
    return () => io.disconnect();
  },
};
