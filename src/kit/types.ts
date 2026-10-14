export type Href = string;

export type Cta = {
  label: string;
  href: Href;
  external?: boolean;
};

export type ImageMedia = {
  kind: 'image';
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** eager for above-the-fold images (hero), lazy otherwise */
  loading?: 'eager' | 'lazy';
};

export type VideoMedia = {
  kind: 'video';
  src: string;
  poster?: string;
};

export type Media = ImageMedia | VideoMedia;

/** Section background on the green scale (--kn-section-1 .. --kn-section-5). */
export type Tone = 1 | 2 | 3 | 4 | 5;

export type CardTone = 'lime' | 'mint' | 'forest';

export type Blurb = { title: string; desc: string };

export type HeroProps = {
  /** One span per line, each line animates in separately. */
  lines: string[];
  lead: string;
  cta: Cta;
  note?: { title: string; label: string; href: Href };
  image: ImageMedia;
  /** white rounded frame around the art, for images that are not transparent PNGs */
  frame?: boolean;
};

export type RailCard = {
  /** "01", "02", … shown above the title */
  index: string;
  title: string;
  desc: string;
  /** without one the card is a plain article, not a link */
  cta?: Cta;
  tone: CardTone;
  image: ImageMedia;
};

export type RailProps = {
  id?: string;
  kicker: string;
  /** May contain <br> for a forced line break. */
  heading: string;
  note?: string;
  cards: RailCard[];
};

export type InboxProps = {
  id?: string;
  kicker: string;
  heading: string;
  body?: string[];
  items?: Blurb[];
  cta: Cta;
  image: ImageMedia;
};

export type MediaSplitProps = {
  id?: string;
  kicker: string;
  /** One or two lines; the second line renders in a span. */
  heading: string | [string, string];
  body: string;
  cta?: Cta;
  media: Media;
  /** Copy on the right, media on the left. */
  reversed?: boolean;
  tone?: Tone;
  /** demo = .62fr/1.38fr, feature = .78fr/1.22fr */
  ratio?: 'demo' | 'feature';
  /** rotate the media frame -1deg (feature stages do, demos do not) */
  tilt?: boolean;
};

export type Step = {
  title: string;
  desc: string;
  image?: ImageMedia;
  /** card background; defaults cycle through the five original pastels */
  bg?: string;
  /** resting rotation in degrees; defaults cycle -6, 3, -2, 5, -3 */
  rest?: number;
};

export type StepsProps = {
  id?: string;
  kicker: string;
  heading: string;
  note?: string;
  body?: string[];
  steps: Step[];
};

export type GenreItem = {
  label: string;
  /** one line under the list, shown while this item is active or hovered */
  desc?: string;
  /** 2 images = framed pair, 6 images = gallery; other counts render as a pair */
  images: ImageMedia[];
};

export type GenreProps = {
  id?: string;
  kicker: string;
  heading?: string;
  items: GenreItem[];
  /** index of the scene shown before any hover; omit for none (original behaviour) */
  initial?: number;
};

export type FinalProps = {
  id?: string;
  kicker: string;
  heading: string;
  body?: string;
  items?: Blurb[];
  cta: Cta;
};

export type SectionEntry =
  | { type: 'hero'; props: HeroProps }
  | { type: 'rail'; props: RailProps }
  | { type: 'inbox'; props: InboxProps }
  | { type: 'mediaSplit'; props: MediaSplitProps }
  | { type: 'steps'; props: StepsProps }
  | { type: 'genre'; props: GenreProps }
  | { type: 'final'; props: FinalProps };

export type SectionType = SectionEntry['type'];

export type PageSpec = SectionEntry[];

export type NavLink = {
  label: string;
  href: Href;
  desc?: string;
  badge?: string;
};

export type NavGroup = {
  label: string;
  /** columns of links; one column = simple dropdown, two = wide dropdown */
  columns: { heading?: string; links: NavLink[] }[];
};

export type NavItem = NavLink | NavGroup;

export const isNavGroup = (item: NavItem): item is NavGroup => 'columns' in item;

export type Locale = {
  code: string;
  label: string;
  href: Href;
  current?: boolean;
};

export type NavSpec = {
  brand: { name: string; href: Href; logo?: ImageMedia };
  items: NavItem[];
  cta: Cta;
  locales?: Locale[];
};

export type FooterColumn = {
  title: string;
  groups: { heading?: string; links: NavLink[] }[];
  wide?: boolean;
};

export type FooterSpec = {
  brand: { name: string; href: Href; logo?: ImageMedia };
  tagline: string;
  columns: FooterColumn[];
  copyright: string;
  legal: NavLink[];
  watermark?: string;
};

export type KitOptions = {
  /** Lenis smooth wheel scroll; off under prefers-reduced-motion */
  smoothScroll?: boolean;
  /** cartoon cursor + ripple on fine-pointer desktops */
  cursor?: 'fist' | 'none';
  /** drag = GSAP Draggable with inertia and skew; snap = CSS scroll-snap, no JS */
  rail?: 'drag' | 'snap';
  /** staggered reveal of MediaSplit copy and media on scroll */
  reveal?: boolean;
};

export type KitLib = 'gsap' | 'scrolltrigger' | 'draggable' | 'inertia' | 'lenis';

export type KitContext = {
  options: Required<KitOptions>;
  reduced: boolean;
  finePointer: boolean;
  libs: Partial<Record<KitLib, unknown>>;
};

export type Behavior = {
  name: string;
  /** CSS selector for the elements this behavior owns; always a data-kn-* hook */
  match: string;
  needs?: KitLib[];
  init(el: HTMLElement, ctx: KitContext): (() => void) | void;
};

export type ButtonVariant =
  | 'cta'
  | 'cta-light'
  | 'hero'
  | 'final'
  | 'section'
  | 'section-light'
  | 'pill'
  | 'pill-ink'
  | 'nav';

export type Arrow = '→' | '↗';
