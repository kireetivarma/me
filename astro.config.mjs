// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kireetivarma.me',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  redirects: {
    '/work/zomato-blinkit-shelf': '/work/live-alerts-shelf-food-transit-music',
  },
});
