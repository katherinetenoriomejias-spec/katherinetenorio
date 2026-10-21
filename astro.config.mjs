// https://docs.astro.build/en/reference/configuration-reference/
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://katha-media-kit.vercel.app',
  output: 'server',
  adapter: vercel(),
  server: {
    host: true,
  },
});
