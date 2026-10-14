import type { KitOptions } from '../types';

export const defaultOptions: Required<KitOptions> = {
  smoothScroll: true,
  cursor: 'fist',
  rail: 'drag',
  reveal: true,
};

/**
 * W4 replaces this stub with the behavior loop (docs/knocket-kit/03-behaviors-js.md).
 * Resolves to a teardown so KitLayout's call site is already final.
 */
export async function initKit(_root: Document | HTMLElement = document, _options: KitOptions = {}): Promise<() => void> {
  return () => {};
}
