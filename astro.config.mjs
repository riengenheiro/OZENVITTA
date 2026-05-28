import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://promo.ozenvitta.com',
  output: 'static',
  // 'file' gera dist/index.html na raiz (melhor compatibilidade com Cloudflare Pages)
  build: {
    format: 'file'
  }
});
