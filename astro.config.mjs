// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "th",
    locales: ["th", "en"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
