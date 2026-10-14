import { on, query, type MotionBehavior } from '../behavior';

export const tabs: MotionBehavior = {
  name: 'tabs',
  match: '[data-kn-tabs]',
  init(el) {
    const select = (value: string) => {
      el.dataset.knTabs = value;
      for (const tab of query(el, '[data-kn-tab]')) {
        const active = tab.dataset.knTab === value;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
      }
    };
    if (el.dataset.knTabs) select(el.dataset.knTabs);
    return on(el, 'click', (e) => {
      const tab = (e.target as Element).closest<HTMLElement>('[data-kn-tab]');
      if (tab && el.contains(tab)) select(tab.dataset.knTab!);
    });
  },
};
