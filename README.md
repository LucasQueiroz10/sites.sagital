# Sagital — sites para negócios locais

Portfólio de vendas da Sagital: uma página de apresentação e um site demonstrativo completo para cada nicho (academia, mercado, restaurante e tabacaria). Os demos são usados em visitas presenciais e aceitam o nome e a cor do cliente pela URL.

> Em desenvolvimento. Todo o conteúdo dos demos é fictício.

## Stack

- [Next.js](https://nextjs.org) (App Router) com React e TypeScript em modo `strict`
- Tailwind CSS e variáveis CSS para o tema personalizável
- Serwist para funcionamento offline (PWA)
- ESLint e Prettier
- Deploy na Vercel

Não há backend nem banco de dados: o conteúdo de cada nicho fica em arquivos TypeScript em `data/`.

## Como rodar

Copie `.env.example` para `.env.local` e preencha o número de WhatsApp que recebe os contatos.

Requer Node.js 22.12 ou superior.

```bash
npm install
npm run dev
```

Depois abra http://localhost:3000.

## Scripts

| Comando                | O que faz                                       |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento                     |
| `npm run build`        | Build de produção                               |
| `npm run start`        | Serve o build de produção                       |
| `npm run lint`         | ESLint                                          |
| `npm run typecheck`    | Gera os tipos das rotas e verifica o TypeScript |
| `npm test`             | Testes automáticos (Vitest)                     |
| `npm run format`       | Formata o código com o Prettier                 |
| `npm run format:check` | Confere a formatação sem alterar arquivos       |
| `npm run check`        | Lint, tipos, formatação e testes de uma vez     |

## Estrutura

```
app/                 rotas (uma pasta por nicho)
components/ui/       componentes base (botão, card, seção...)
components/nichos/   blocos de cada nicho (planos, cardápio, ofertas...)
data/                conteúdo fictício de cada nicho e tipos compartilhados
lib/                 tema personalizável e links de WhatsApp
public/imagens/      fotos locais de cada nicho
public/icons/        ícones do PWA
```
