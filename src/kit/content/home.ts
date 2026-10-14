import type { CollectionEntry } from 'astro:content';
import { useTranslations } from '../../utils/i18n';
import type {
  Blurb,
  CardTone,
  FooterSpec,
  GenreItem,
  ImageMedia,
  NavSpec,
  PageSpec,
  RailCard,
  Step,
} from '../types';

export type Lang = 'th' | 'en';
export type ShowcaseEntry = CollectionEntry<'showcase'>;

export type HomeContent = {
  meta: { title: string; description: string; lang: Lang };
  nav: NavSpec;
  footer: FooterSpec;
  page: PageSpec;
};

const HOME: Record<Lang, string> = { th: '/v2/', en: '/en/v2/' };
const LOCALE_LABEL: Record<Lang, string> = { th: 'ไทย', en: 'English' };
const EMAIL = 'usableapp.co@gmail.com';
const PHONE = { label: '+66 61 831 7773', href: 'tel:+66618317773' };

const image = (src: string, alt: string, width: number, height: number, loading?: ImageMedia['loading']): ImageMedia => ({
  kind: 'image',
  src,
  alt,
  width,
  height,
  loading,
});

const STEP_ART: ImageMedia[] = [
  image('/illustrations/step1.png', 'Strategic planning illustration', 1178, 768),
  image('/illustrations/step2.png', 'User discovery illustration', 1181, 768),
  image('/illustrations/step3.png', 'Product deliverables illustration', 1181, 768),
];

const block = (name: string): ImageMedia => image(`/kit/img/${name}.png`, '', 1024, 1024);

const MARKET = { src: '/walk-thailand-market.jpg', width: 2000, height: 1500 };

/**
 * Hot-linked stock photos (04 §2.4, §3) and their intrinsic size. The CDNs serve
 * the 8k original without a width parameter, so the page asks for a 1600px
 * rendition and records that size.
 */
const STOCK_WIDTH = 1600;
const STOCK: Record<string, { width: number; height: number }> = {
  'https://images.unsplash.com/photo-1541462608143-67571c6738dd?crop=entropy&cs=srgb&fm=jpg&q=85': { width: 7952, height: 5304 },
  'https://images.pexels.com/photos/7947636/pexels-photo-7947636.jpeg': { width: 6274, height: 4183 },
  'https://images.unsplash.com/photo-1663408319620-3551f425c81e?crop=entropy&cs=srgb&fm=jpg&q=85': { width: 2878, height: 3597 },
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=srgb&fm=jpg&q=85': { width: 4288, height: 2848 },
  'https://images.unsplash.com/photo-1618544976420-1f213fcf2052?crop=entropy&cs=srgb&fm=jpg&q=85': { width: 4896, height: 3264 },
  'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg': { width: 4000, height: 2667 },
};

const stock = (url: string, alt: string): ImageMedia => {
  const size = STOCK[url];
  if (!size) return { kind: 'image', src: url, alt };
  const sized = url.includes('unsplash.com') ? `${url}&w=${STOCK_WIDTH}` : `${url}?auto=compress&cs=tinysrgb&w=${STOCK_WIDTH}`;
  return image(sized, alt, STOCK_WIDTH, Math.round((size.height / size.width) * STOCK_WIDTH));
};

const D1_PHOTO = 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?crop=entropy&cs=srgb&fm=jpg&q=85';
const D2_PHOTO = 'https://images.pexels.com/photos/7947636/pexels-photo-7947636.jpeg';

const RAIL_TONES: CardTone[] = ['lime', 'forest', 'mint'];
const SHOWCASE_TONES: CardTone[] = ['lime', 'mint', 'forest'];

const MARKET_ALT: Record<Lang, string> = { th: 'เดินตลาดในประเทศไทย', en: 'Walking through a market in Thailand' };

export function homeContent(lang: Lang, showcase: ShowcaseEntry[]): HomeContent {
  const t = useTranslations(lang);
  const home = HOME[lang];
  const brand = { name: t('site.title'), href: home, logo: image('/kit/logo.svg', '', 54, 54) };

  const processSteps = ([1, 2, 3] as const).map((n, i) => ({
    index: t(`process.step${n}.eyebrow`),
    title: t(`process.step${n}.title`),
    desc: t(`process.step${n}.description`),
    tone: RAIL_TONES[i],
    image: STEP_ART[i],
  })) satisfies RailCard[];

  const philosophy: GenreItem[] = (
    [
      ['hierarchy', [block('vision'), STEP_ART[0]]],
      ['flow', [block('process'), STEP_ART[1]]],
      ['language', [block('validation'), STEP_ART[2]]],
      ['tested', [block('community'), block('deliverables')]],
    ] as const
  ).map(([key, images]) => ({
    label: t(`philosophy.${key}.title`),
    desc: t(`philosophy.${key}.desc`),
    images: [...images],
  }));

  const methodology: Step[] = (
    [
      [1, 'vision'],
      [2, 'process'],
      [3, 'validation'],
      [4, 'deliverables'],
    ] as const
  ).map(([n, art]) => ({
    title: t(`methodology.step${n}`),
    desc: t(`methodology.step${n}_desc`),
    image: block(art),
  }));

  const showcaseCards: RailCard[] = [...showcase]
    .sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id))
    .map((entry, i) => ({
      index: String(i + 1).padStart(2, '0'),
      title: entry.data.title,
      desc: entry.data.subtitle,
      tone: SHOWCASE_TONES[i % SHOWCASE_TONES.length],
      image:
        entry.data.image === MARKET.src
          ? image(MARKET.src, entry.data.title, MARKET.width, MARKET.height)
          : stock(entry.data.image, entry.data.title),
    }));

  const values: Blurb[] = [
    { title: t('approach.title'), desc: t('approach.desc') },
    { title: t('promise.title'), desc: t('promise.desc') },
    { title: t('focus.title'), desc: t('focus.desc') },
  ];

  const sessions: Blurb[] = [
    { title: t('getStarted.session1'), desc: t('getStarted.session1_desc') },
    { title: t('getStarted.session2'), desc: t('getStarted.session2_desc') },
  ];

  const anchors = [
    { label: t('whoWeAre.title'), href: '#what-we-do' },
    { label: t('process.title'), href: '#how-it-works' },
    { label: t('deliverables.d1.title'), href: '#deliverables' },
    { label: t('deliverables.d2.title'), href: '#deliverables' },
    { label: t('philosophy.title'), href: '#philosophy' },
    { label: t('methodology.title'), href: '#methodology' },
    { label: t('showcase.title'), href: '#showcase' },
  ];

  const locales = (['th', 'en'] as Lang[]).map((code) => ({
    code,
    label: LOCALE_LABEL[code],
    href: HOME[code],
    current: code === lang,
  }));

  const nav: NavSpec = {
    brand,
    items: [
      {
        label: t('nav.whatWeDo'),
        columns: [
          {
            links: [
              { label: t('whoWeAre.title'), href: '#what-we-do', desc: t('whoWeAre.eyebrow') },
              { label: t('process.title'), href: '#how-it-works', desc: t('process.eyebrow') },
              { label: t('deliverables.d1.title'), href: '#deliverables', desc: t('deliverables.d1.eyebrow') },
              { label: t('deliverables.d2.title'), href: '#deliverables', desc: t('deliverables.d2.eyebrow') },
            ],
          },
        ],
      },
      {
        label: t('v2.nav.insights'),
        columns: [
          {
            heading: t('philosophy.eyebrow'),
            links: [
              { label: t('philosophy.title'), href: '#philosophy' },
              ...philosophy.map((item) => ({ label: item.label, href: '#philosophy' })),
            ],
          },
          {
            heading: t('methodology.eyebrow'),
            links: [
              { label: t('methodology.title'), href: '#methodology' },
              ...methodology.map((step) => ({ label: step.title, href: '#methodology' })),
            ],
          },
        ],
      },
      { label: t('showcase.eyebrow'), href: '#showcase' },
      { label: t('nav.howItWorks'), href: '#how-it-works' },
    ],
    cta: { label: t('nav.contact'), href: '#contact' },
    locales,
  };

  const footer: FooterSpec = {
    brand,
    tagline: t('footer.tagline'),
    columns: [
      { title: t('v2.footer.sections'), groups: [{ links: anchors }] },
      {
        title: t('nav.contact'),
        groups: [
          {
            links: [
              PHONE,
              { label: EMAIL, href: `mailto:${EMAIL}` },
              { label: t('contact.address'), href: '#contact' },
            ],
          },
        ],
      },
      {
        title: t('v2.footer.process'),
        groups: [{ links: processSteps.map((step) => ({ label: step.title, href: '#how-it-works' })) }],
      },
      {
        title: t('v2.footer.language'),
        groups: [{ links: locales.map((l) => ({ label: l.label, href: l.href })) }],
      },
    ],
    copyright: `${t('site.title')} © ${new Date().getFullYear()}`,
    legal: [],
    watermark: 'USABLE',
  };

  const page: PageSpec = [
    {
      type: 'hero',
      props: {
        lines: [t('hero.headline1'), t('hero.headline2')],
        lead: t('hero.subheadline'),
        cta: { label: t('hero.cta'), href: '#contact' },
        note: { title: t('site.title'), label: t('v2.hero.note'), href: '#contact' },
        image: { ...STEP_ART[1], loading: 'eager' },
        frame: true,
      },
    },
    {
      type: 'inbox',
      props: {
        id: 'what-we-do',
        kicker: t('whoWeAre.eyebrow'),
        heading: t('whoWeAre.title'),
        body: [t('whoWeAre.desc1'), t('whoWeAre.desc2')],
        items: values,
        cta: { label: t('contact.cta'), href: '#contact' },
        image: image(MARKET.src, MARKET_ALT[lang], MARKET.width, MARKET.height),
      },
    },
    {
      type: 'rail',
      props: {
        id: 'how-it-works',
        kicker: t('process.eyebrow'),
        heading: t('process.title'),
        note: t('process.subtitle'),
        cards: processSteps,
      },
    },
    {
      type: 'mediaSplit',
      props: {
        id: 'deliverables',
        kicker: t('deliverables.d1.eyebrow'),
        heading: t('deliverables.d1.title'),
        body: t('deliverables.d1.description'),
        media: stock(D1_PHOTO, 'Design prototypes on screens - Photo by UX Store on Unsplash'),
        tone: 1,
        ratio: 'demo',
      },
    },
    {
      type: 'mediaSplit',
      props: {
        kicker: t('deliverables.d2.eyebrow'),
        heading: t('deliverables.d2.title'),
        body: t('deliverables.d2.description'),
        media: stock(D2_PHOTO, 'Product requirement documents - Photo by RDNE Stock project on Pexels'),
        reversed: true,
        tone: 2,
        ratio: 'feature',
        tilt: true,
      },
    },
    {
      type: 'genre',
      props: {
        id: 'philosophy',
        kicker: t('philosophy.eyebrow'),
        heading: t('philosophy.title'),
        items: philosophy,
        initial: 0,
      },
    },
    {
      type: 'steps',
      props: {
        id: 'methodology',
        kicker: t('methodology.eyebrow'),
        heading: t('methodology.title'),
        body: [t('methodology.desc1'), t('methodology.desc2')],
        steps: methodology,
      },
    },
    {
      type: 'rail',
      props: {
        id: 'showcase',
        kicker: t('showcase.eyebrow'),
        heading: t('showcase.title'),
        note: t('showcase.subtitle'),
        cards: showcaseCards,
      },
    },
    {
      type: 'final',
      props: {
        id: 'contact',
        kicker: t('getStarted.eyebrow'),
        heading: t('getStarted.title'),
        body: t('getStarted.desc'),
        items: sessions,
        cta: { label: t('getStarted.cta'), href: `mailto:${EMAIL}` },
      },
    },
  ];

  return {
    meta: { title: `${t('site.title')} - ${t('site.tagline')}`, description: t('hero.subtitle'), lang },
    nav,
    footer,
    page,
  };
}
