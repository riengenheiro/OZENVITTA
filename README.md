# OzenVitta - Site Oficial

Site desenvolvido com Astro, convertido do template Elementor do WordPress.

## Sobre o Projeto

Este é um site de vendas para o suplemento OzenVitta, desenvolvido com tecnologia moderna e otimizado para performance.

### Tecnologias Utilizadas

- **Astro** - Framework para construção de sites estáticos rápidos
- **CSS Moderno** - Variables, Grid, Flexbox, animações
- **Design Responsivo** - Mobile-first approach

### Estrutura do Site

O site possui 17 seções principais:

1. **Hero** - Banner principal com CTA
2. **Features Bar** - Segurança, entrega rápida, garantia
3. **Como Funciona** - Explicação do produto
4. **Ticker Bar** - "100% Natural"
5. **Benefícios** - Vantagens do produto
6. **Depoimentos** - Antes/depois
7. **Ingredientes** - Composição 100% natural
8. **Aplicativo** - App exclusivo
9. **Gradient Divider** - Divisor visual
10. **Por que o App** - Benefícios do aplicativo
11. **Depoimentos Vídeo** - Carrossel de vídeos
12. **Ticker Bar** - "100% Natural"
13. **Preços** - Kits e ofertas
14. **Garantia** - 30 dias
15. **FAQ** - Dúvidas frequentes
16. **Footer** - Rodapé

### Cores do Tema

- **Primária:** #246EB2 (Azul)
- **Primária Escura:** #24356F (Azul escuro)
- **Secundária:** #20DFB1 (Turquesa)
- **Accent:** #6FFFDD (Turquesa claro)
- **Escuro:** #111934 (Fundo escuro)

### Git e deploy

- **Branch única:** `main` (produção no Cloudflare Pages).
- Push apenas para `main`:

```bash
git push origin main
```

- Não usar a branch `master` (foi descontinuada).

### Comandos

```bash
# Instalar dependências
npm install

# Desenvolvimento local
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

### Imagens e mídia

Todas as URLs vêm do `Template 2025.json` e ficam centralizadas em `src/data/media.ts`.

Para atualizar após mudar o template Elementor:

```bash
npm run generate:media
```

As imagens são servidas de `promo.ozenvitta.com` (e alguns fundos mobile de `guilhermeocarvalho.com.br`, conforme o JSON original).

Os depoimentos em vídeo do template usam **thumbnails** (carrossel de imagens); não há URLs `.mp4` no JSON exportado.

---

Desenvolvido com Astro em 2025.
