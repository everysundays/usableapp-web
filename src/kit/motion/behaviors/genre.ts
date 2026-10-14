import { all, on, query, type MotionBehavior } from '../behavior';
import { lib } from '../libs';

const PRELOAD_FALLBACK_MS = 600;

export const genre: MotionBehavior = {
  name: 'genre',
  match: '[data-kn-genre]',
  needs: ['gsap'],
  init(el, ctx) {
    const gsap = lib(ctx, 'gsap');
    const items = query(el, '[data-kn-genre-item]');
    const scenes = query(el, '[data-kn-scene]');
    const imagesOf = (scene: HTMLElement) => query<HTMLImageElement>(scene, 'img');
    const dur = (seconds: number) => (ctx.reduced ? 0 : seconds);

    let current = items.find((item) => item.classList.contains('is-active'))?.dataset.knGenreItem ?? null;
    const decoded = new WeakSet<HTMLElement>();

    const show = async (scene: HTMLElement) => {
      const imgs = imagesOf(scene);
      if (!decoded.has(scene)) {
        decoded.add(scene);
        await Promise.allSettled(imgs.map((img) => img.decode()));
      }
      if (!gsap || scene.dataset.knScene !== current) return;
      gsap.to(scene, { autoAlpha: 1, duration: dur(0.5), ease: 'power3.out', overwrite: true });
      gsap.fromTo(
        imgs,
        { scale: 0.9, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: dur(0.58), stagger: dur(0.045), ease: 'power3.out', overwrite: true },
      );
    };

    const activate = (key: string) => {
      if (key === current) return;
      current = key;
      for (const item of items) item.classList.toggle('is-active', item.dataset.knGenreItem === key);
      for (const scene of scenes) {
        const active = scene.dataset.knScene === key;
        scene.classList.toggle('is-active', active);
        if (active) void show(scene);
        else gsap?.to(scene, { autoAlpha: 0, duration: dur(0.28), ease: 'power3.out', overwrite: true });
      }
    };

    const preload = () => {
      for (const img of query<HTMLImageElement>(el, '[data-kn-scene] img')) {
        img.loading = 'eager';
        void img.decode().catch(() => undefined);
      }
    };
    const idle = typeof requestIdleCallback === 'function';
    const handle = idle ? requestIdleCallback(preload) : window.setTimeout(preload, PRELOAD_FALLBACK_MS);

    const off = all(
      items.flatMap((item) => {
        const go = () => {
          if (item.dataset.knGenreItem !== undefined) activate(item.dataset.knGenreItem);
        };
        return [on(item, 'pointerenter', go), on(item, 'focus', go), on(item, 'click', go)];
      }),
    );

    return () => {
      off();
      if (idle) cancelIdleCallback(handle);
      else clearTimeout(handle);
      if (gsap) {
        const targets = [...scenes, ...scenes.flatMap(imagesOf)];
        gsap.killTweensOf(targets);
        gsap.set(targets, { clearProps: 'opacity,visibility,transform' });
      }
    };
  },
};
