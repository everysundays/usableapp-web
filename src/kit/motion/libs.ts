import type { KitContext, KitLib } from '../types';

export type LibTypes = {
  gsap: typeof import('gsap').gsap;
  scrolltrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
  draggable: typeof import('gsap/Draggable').Draggable;
  inertia: typeof import('gsap/InertiaPlugin').InertiaPlugin;
  lenis: typeof import('lenis').default;
};

type Loaders = { [K in KitLib]: () => Promise<LibTypes[K]> };

const loaders: Loaders = {
  gsap: async () => (await import('gsap')).gsap,
  scrolltrigger: async () => {
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
    gsap.registerPlugin(ScrollTrigger);
    return ScrollTrigger;
  },
  draggable: async () => {
    const [{ gsap }, { Draggable }] = await Promise.all([import('gsap'), import('gsap/Draggable')]);
    gsap.registerPlugin(Draggable);
    return Draggable;
  },
  inertia: async () => {
    const [{ gsap }, { InertiaPlugin }] = await Promise.all([import('gsap'), import('gsap/InertiaPlugin')]);
    gsap.registerPlugin(InertiaPlugin);
    return InertiaPlugin;
  },
  lenis: async () => (await import('lenis')).default,
};

/** A chunk that fails to arrive leaves its slot empty; initKit skips the behaviors that need it. */
export async function loadLibs(needs: Iterable<KitLib>): Promise<KitContext['libs']> {
  const libs: KitContext['libs'] = {};
  await Promise.all(
    [...new Set(needs)].map(async (name) => {
      try {
        libs[name] = await loaders[name]();
      } catch (err) {
        console.warn(`[kit] could not load ${name}`, err);
      }
    }),
  );
  return libs;
}

/** Sound because initKit never runs a behavior whose `needs` did not all load. */
export const lib = <K extends KitLib>(ctx: KitContext, name: K): LibTypes[K] => ctx.libs[name] as LibTypes[K];
