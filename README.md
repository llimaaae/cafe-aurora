# Café Aurora ☕

Site de portfólio para uma cafeteria de cafés especiais fictícia em Curitiba — *"Onde todo amanhecer tem gosto de café"*.

## Stack

- **Next.js 16** (App Router, Turbopack, Cache Components)
- **TypeScript**
- **Tailwind CSS v4** (`@theme` no CSS global)
- **Framer Motion**
- **sharp** (otimização de imagens WebP)
- **@playwright/test** (testes E2E + screenshots)

## Como rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção (Turbopack)
```

Testes + screenshots (precisa `npm run dev` rodando):

```bash
node scripts/screenshots.mjs   # salva em /screenshots (360px e 1280px)
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. Na Vercel, configure em **Settings > Environment Variables** e faça **redeploy** depois de adicionar:

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_GA_ID` | ID do Google Analytics 4 (ex.: `G-XXXXXXXXXX`). Analytics só carrega se existir. |
| `CHAT_PROVIDER` | Provedor do chatbot IA: `anthropic` \| `openai` \| `gemini` |
| `CHAT_API_KEY` | Chave da IA. **Vazia = modo fallback** (FAQ por palavras-chave). Nunca vai para o cliente. |
| `CHAT_MODEL` | Modelo (opcional). Padrões: `claude-3-5-sonnet-20241022`, `gpt-4-turbo-preview`, `gemini-1.5-flash` |

## Funcionalidades

- Home completa (hero, queridinhos, sobre, depoimentos, galeria, localização, CTA)
- Menu com 24 itens em 5 categorias (Cafés, Brunch, Confeitaria, Bebidas, Grãos & Presentes), filtros por categoria + 12 tags e busca
- Busca global no header (menu + páginas, destaque do termo, atalho `/`)
- Reservas com validação e tela de confirmação (demonstrativo)
- Chatbot `/api/chat` com 3 provedores de IA + fallback FAQ + rate limit (10/min por IP)
- Botão flutuante de WhatsApp
- Breadcrumbs em todas as páginas internas
- SEO: metadata, Open Graph, sitemap, robots, JSON-LD (CafeOrCoffeeShop + Menu)
- GA4 com eventos (CTAs, reserva enviada, uso do chatbot)
- Acessibilidade: HTML semântico, foco visível, aria-labels, `prefers-reduced-motion`
- 404 personalizada

## Identidade visual

Ver **[BRAND.md](./BRAND.md)**: espresso `#2E1F1A`, alva `#FBF6EE`, caramelo `#B4761F`, sage `#7C8A6E`, rosé `#E7C8A0`; Fraunces + Nunito Sans; cantos arredondados e layout arejado.

## Créditos de imagem

Ver **[CREDITS.md](./CREDITS.md)** — todas as fotos são do Pexels (uso comercial livre).
