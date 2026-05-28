import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.resolve(__dirname, '../../Template 2025.json');
const outPath = path.resolve(__dirname, '../src/data/media.ts');

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

function sectionBg(index) {
  const s = data.content[index]?.settings || {};
  return {
    desktop: s.background_image?.url || '',
    mobile: s.background_image_mobile?.url || '',
  };
}

function sectionImages(index) {
  const imgs = [];
  function walk(el) {
    if (el.widgetType === 'image' && el.settings?.image?.url) {
      imgs.push(el.settings.image.url);
    }
    el.elements?.forEach(walk);
  }
  walk(data.content[index]);
  return imgs;
}

function findCarousel(index) {
  let carousel = [];
  function walk(el) {
    if (el.widgetType === 'image-carousel' && el.settings?.carousel) {
      carousel = el.settings.carousel.map((c) => c.url);
    }
    el.elements?.forEach(walk);
  }
  walk(data.content[index]);
  return carousel;
}

function ingredients() {
  const sec = data.content[6];
  const items = [];
  function walk(el) {
    if (el.widgetType === 'heading' && el.settings?.title) {
      items.push({ h: el.settings.title.replace(/<[^>]+>/g, '').trim() });
    }
    if (el.widgetType === 'text-editor' && el.settings?.editor && !el.settings.editor.includes('Combinamos')) {
      const t = el.settings.editor.replace(/<[^>]+>/g, '').trim();
      if (t.length < 200) items.push({ p: t });
    }
    if (el.widgetType === 'image' && el.settings?.image?.url) items.push({ img: el.settings.image.url });
    el.elements?.forEach(walk);
  }
  walk(sec);
  const result = [];
  for (const x of items) {
    if (x.img) result.push({ image: x.img });
    if (x.h && x.h !== 'Suplemento 100% Natural' && !x.h.includes('Conheça')) {
      result[result.length - 1].name = x.h;
    }
    if (x.p && result.length) result[result.length - 1].description = x.p;
  }
  return result;
}

const heroImgs = sectionImages(0);
const howImgs = sectionImages(2);
const benefitsImgs = sectionImages(4);
const testimonialImgs = sectionImages(5);
const pricingImgs = sectionImages(13);

const media = {
  base: 'https://promo.ozenvitta.com/wp-content/uploads',
  backgrounds: {
    hero: sectionBg(0),
    howItWorks: sectionBg(2),
    benefits: sectionBg(4),
    testimonials: sectionBg(5),
    ingredients: sectionBg(6),
    app: sectionBg(8),
    pricing: sectionBg(13),
  },
  hero: {
    logo: heroImgs[0],
    floating: heroImgs.slice(1, 4),
    product: heroImgs[4],
    productAlt: heroImgs[5],
    features: [
      { icon: 'https://promo.ozenvitta.com/wp-content/uploads/2025/01/1.svg', title: 'ENVIO EM 24H' },
      { icon: 'https://promo.ozenvitta.com/wp-content/uploads/2025/01/3.svg', title: 'PAGAMENTO SEGURO' },
      { icon: 'https://promo.ozenvitta.com/wp-content/uploads/2025/01/4.svg', title: 'FRETE GRÁTIS' },
    ],
  },
  featuresBar: [
    { icon: 'https://promo.ozenvitta.com/wp-content/uploads/2025/01/ENVIO-EM-24H.svg', title: 'ENVIO EM 24H', description: 'Para todos os estados' },
    { icon: 'https://promo.ozenvitta.com/wp-content/uploads/2025/01/PAGAMENTO-SEGURO.svg', title: 'PAGAMENTO SEGURO', description: 'Seguro é confiável' },
    { icon: 'https://promo.ozenvitta.com/wp-content/uploads/2025/01/ENTREGA-EXPRESS.svg', title: 'FRETE GRÁTIS', description: 'para todo Brasil' },
  ],
  howItWorks: {
    floating: howImgs.slice(0, 2),
    steps: [
      { image: howImgs[2], title: 'Reduz a fome e o desejo por doces:' },
      { image: howImgs[3], title: 'Acelera o metabolismo e queima gordura:' },
      { image: howImgs[4], title: 'Combate o inchaço e retenção de líquidos:' },
      { image: howImgs[5], title: 'Auxilia no aumento da energia:' },
    ],
  },
  benefits: {
    leaf: benefitsImgs[0],
    items: [
      { icon: benefitsImgs[1], divider: benefitsImgs[2] },
      { icon: benefitsImgs[3], divider: benefitsImgs[4] },
      { icon: benefitsImgs[5], divider: benefitsImgs[6] },
      { icon: benefitsImgs[7], divider: benefitsImgs[8] },
    ],
    floating: benefitsImgs[9],
  },
  testimonials: testimonialImgs,
  ingredients: ingredients(),
  ingredientsCarousel: findCarousel(7),
  app: {
    bullets: 'https://promo.ozenvitta.com/wp-content/uploads/2025/01/Rectangle-11.png',
    mockup: sectionImages(8).find((u) => u.includes('APLICATIVO')) || sectionImages(8)[4],
    floating: sectionImages(8).filter((u) => u.includes('FLUT-LOGO')),
  },
  whyApp: {
    image: sectionImages(10)[0],
    bullets: 'https://promo.ozenvitta.com/wp-content/uploads/2025/01/Rectangle-11.png',
  },
  testimonialVideos: findCarousel(11),
  pricing: {
    pots: pricingImgs,
  },
  guarantee: sectionImages(14)[0],
  footer: {
    logo: sectionImages(16)[0],
    payment: sectionImages(16)[1],
    security: sectionImages(16)[2],
  },
};

const ts = `// Gerado automaticamente a partir de Template 2025.json
// Execute: node scripts/generate-media.mjs

export const media = ${JSON.stringify(media, null, 2)} as const;

export type Media = typeof media;
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, ts);
console.log('Written:', outPath);
