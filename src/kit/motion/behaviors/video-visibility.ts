import type { MotionBehavior } from '../behavior';

export const videoVisibility: MotionBehavior = {
  name: 'video-visibility',
  match: 'video[data-kn-video]',
  init(el) {
    const video = el as HTMLVideoElement;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.38 },
    );
    io.observe(el);
    return () => io.disconnect();
  },
};
