import { all, on, type MotionBehavior } from '../behavior';

type Shared = { count: number; off: () => void };
const shared = new WeakMap<Document, Shared>();

const bind = (doc: Document): Shared => {
  const open = () => doc.querySelectorAll<HTMLDetailsElement>('details[data-kn-locale][open]');
  const off = all([
    on(doc, 'click', (e) => {
      for (const d of open()) if (!d.contains(e.target as Node)) d.open = false;
    }),
    on(doc, 'keydown', (e) => {
      if (e.key !== 'Escape') return;
      for (const d of open()) {
        d.open = false;
        d.querySelector('summary')?.focus();
      }
    }),
  ]);
  return { count: 0, off };
};

export const locale: MotionBehavior = {
  name: 'locale',
  match: 'details[data-kn-locale]',
  init(el) {
    const doc = el.ownerDocument;
    const entry = shared.get(doc) ?? bind(doc);
    shared.set(doc, entry);
    entry.count++;
    return () => {
      if (--entry.count > 0) return;
      entry.off();
      shared.delete(doc);
    };
  },
};
