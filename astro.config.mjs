import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kathatenorio.com',
  base: '/',
  output: 'static',
  image: {
    remotePatterns: [],
  },
  server: {
    host: true,
  },
});
