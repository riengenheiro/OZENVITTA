import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://promo.ozenvitta.com',
  output: 'static',
  build: {
    format: 'directory'
  }
});
