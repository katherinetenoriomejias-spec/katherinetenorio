import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://katherinetenoriomejias-spec.github.io',
  base: '/portafolio/',
  output: 'static',
  image: {
    remotePatterns: [],
  },
  server: {
    host: true,
  },
});