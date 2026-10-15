import type { Behavior, KitContext } from '../types';

export type MotionBehavior = Behavior & {
  when?: (ctx: KitContext) => boolean;
};

export const on = <K extends keyof HTMLElementEventMap>(
  target: EventTarget,
  type: K,
  handler: (ev: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions,
): (() => void) => {
  target.addEventListener(type, handler as EventListener, options);
  return () => target.removeEventListener(type, handler as EventListener, options);
};

export const all = (fns: (() => void)[]) => () => {
  for (const fn of fns) fn();
};

export const query = <T extends HTMLElement = HTMLElement>(scope: ParentNode, selector: string) =>
  Array.from(scope.querySelectorAll<T>(selector));
