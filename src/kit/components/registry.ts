import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { SectionType } from '../types';
import Hero from './sections/Hero.astro';
import Rail from './sections/Rail.astro';
import Inbox from './sections/Inbox.astro';
import MediaSplit from './sections/MediaSplit.astro';
import Steps from './sections/Steps.astro';
import Genre from './sections/Genre.astro';
import Final from './sections/Final.astro';

export type AstroComponent = AstroComponentFactory;

export const sections: Record<SectionType, AstroComponent> = {
  hero: Hero,
  rail: Rail,
  inbox: Inbox,
  mediaSplit: MediaSplit,
  steps: Steps,
  genre: Genre,
  final: Final,
};
