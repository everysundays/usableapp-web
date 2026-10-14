import type { KitContext, KitOptions } from '../types';
import type { MotionBehavior } from './behavior';
import { blob, plopIn, stepNote } from './behaviors/plop-in';
import { copy } from './behaviors/copy';
import { cursor } from './behaviors/cursor';
import { genre } from './behaviors/genre';
import { locale } from './behaviors/locale';
import { marquee } from './behaviors/marquee';
import { parallax } from './behaviors/parallax';
import { railDrag, railSnap } from './behaviors/rail';
import { reveal } from './behaviors/reveal';
import { smoothScroll } from './behaviors/smooth-scroll';
import { tabs } from './behaviors/tabs';
import { tilt } from './behaviors/tilt';
import { videoVisibility } from './behaviors/video-visibility';
import { loadLibs } from './libs';

export const defaultOptions: Required<KitOptions> = {
  smoothScroll: true,
  cursor: 'fist',
  rail: 'drag',
  reveal: true,
};

export const behaviors: readonly MotionBehavior[] = [
  smoothScroll,
  videoVisibility,
  locale,
  railDrag,
  railSnap,
  plopIn,
  stepNote,
  blob,
  genre,
  parallax,
  reveal,
  cursor,
  tilt,
  marquee,
  tabs,
  copy,
];

type Root = Document | HTMLElement;

const MARK = 'knInit';
const marks = (el: HTMLElement) => (el.dataset[MARK] ?? '').split(' ').filter(Boolean);
const mark = (el: HTMLElement, name: string) => {
  el.dataset[MARK] = [...marks(el), name].join(' ');
};
const unmark = (el: HTMLElement, name: string) => {
  const rest = marks(el).filter((n) => n !== name);
  if (rest.length) el.dataset[MARK] = rest.join(' ');
  else delete el.dataset[MARK];
};

const findAll = (root: Root, selector: string) => {
  const found = Array.from(root.querySelectorAll<HTMLElement>(selector));
  if (root instanceof HTMLElement && root.matches(selector)) found.unshift(root);
  return found;
};

const runs = new WeakMap<Root, () => void>();

export async function initKit(root: Root = document, options: KitOptions = {}): Promise<() => void> {
  runs.get(root)?.();

  const ctx: KitContext = {
    options: { ...defaultOptions, ...options },
    reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
    finePointer: matchMedia('(hover: hover) and (pointer: fine)').matches,
    libs: {},
  };

  const active = behaviors
    .filter((behavior) => behavior.when?.(ctx) ?? true)
    .map((behavior) => ({ behavior, els: findAll(root, behavior.match).filter((el) => !marks(el).includes(behavior.name)) }))
    .filter(({ els }) => els.length > 0);
  for (const { behavior, els } of active) for (const el of els) mark(el, behavior.name);

  const teardowns: (() => void)[] = [];
  let cancelled = false;
  const destroy = () => {
    cancelled = true;
    while (teardowns.length) teardowns.pop()?.();
    for (const { behavior, els } of active) for (const el of els) unmark(el, behavior.name);
    if (runs.get(root) === destroy) runs.delete(root);
  };
  runs.set(root, destroy);

  ctx.libs = await loadLibs(active.flatMap(({ behavior }) => behavior.needs ?? []));
  if (cancelled) return destroy;

  for (const { behavior, els } of active) {
    if (behavior.needs?.some((name) => !ctx.libs[name])) continue;
    for (const el of els) {
      const teardown = behavior.init(el, ctx);
      if (teardown) teardowns.push(teardown);
    }
  }
  return destroy;
}
