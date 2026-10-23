# Sagital — sites para negócios locais

Portfólio de vendas da Sagital: uma página de apresentação, um site demonstrativo completo para cada nicho (academia, varejo, restaurante e tabacaria) e quatro sites conceituais de serviços profissionais (advocacia, odontologia, arquitetura e contabilidade). Os demos aceitam o nome e a cor do cliente pela URL e funcionam sem internet.

> Todo o conteúdo dos demos e dos sites do portfólio é fictício (nomes, preços e depoimentos).

## Rotas

| Rota                       | O que é                                                                                                    |
| -------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `/`                        | Página da Sagital: monta o demo personalizado, mostra a prévia ao vivo, os demos, o portfólio e os pacotes |
| `/academia`                | Demo de academia: visual claro e comercial, planos com preço, grade com agendar em cada aula               |
| `/varejo`                  | Demo de varejo: loja de básicos com vitrines Feminino e Masculino e pedido por tamanho                     |
| `/restaurante`             | Demo de restaurante: reserva de mesa com dia e horário, cardápio, delivery                                 |
| `/tabacaria`               | Demo de tabacaria: aviso de maioridade, lounge e avisos legais                                             |
| `/gerar`                   | Ferramenta do vendedor: link personalizado, QR code (PNG e impressão) e preparo do modo offline            |
| `/portfolio/advocacia`     | Duarte Moreira Advogados: áreas de atuação e triagem do caso em três passos                                |
| `/portfolio/odontologia`   | Lumi Odontologia: agenda com horários livres e próximo horário no topo                                     |
| `/portfolio/arquitetura`   | Atelier Vão Arquitetura: projetos filtráveis com ficha e briefing com régua de área                        |
| `/portfolio/contabilidade` | Prumo Contabilidade: simulador de MEI e Simples Nacional com a alíquota efetiva                            |

Personalização: `/academia?nome=Iron+Gym&cor=ff6600`. Nome com até 40 caracteres (letras, números, espaços e `& ' - .`); cor em hex sem `#`. Valores inválidos são ignorados e o demo usa o padrão do nicho.

## Destaques técnicos

- **Design system próprio**: a página da Sagital segue o Sagital Design System (Plus Jakarta Sans, azul-marinho e azul royal, superfícies em cinza azulado, carrosséis horizontais). Os demos mantêm a identidade de cada ramo e usam o mesmo componente de carrossel ([components/ui/Carrossel.tsx](components/ui/Carrossel.tsx)).
- **Prévia ao vivo**: o demo personalizado (ou um site do portfólio) roda num iframe do próprio site, e o visitante troca entre celular, tablet e computador sem recarregar a página.
- **Portfólio interativo**: quatro sites de serviços profissionais, cada um com identidade própria e uma peça que funciona de verdade: triagem do caso, agenda calculada do expediente ([lib/consultas.ts](lib/consultas.ts)), galeria filtrável com ficha e simulador de impostos pelas tabelas do Simples Nacional ([lib/regimes.ts](lib/regimes.ts)).
- **Personalização segura** ([lib/tema.ts](lib/tema.ts)): validação estrita, nome renderizado só como texto, cor aplicada como variável CSS e contraste WCAG AA calculado automaticamente (o texto do botão nunca fica ilegível).
- **Offline de verdade** (Serwist): as páginas ficam em cache e os parâmetros da URL são ignorados na busca, então qualquer link personalizado novo abre sem internet.
- **Páginas estáticas**: a personalização é lida no navegador, o que mantém o site rápido e compatível com o cache.
- **Segurança**: CSP com cada exceção documentada em [next.config.ts](next.config.ts), HSTS, `nosniff`, `X-Frame-Options: SAMEORIGIN` e `frame-ancestors 'self'` (só o próprio site pode emoldurar as páginas, para a prévia ao vivo), `Referrer-Policy` e `Permissions-Policy`; imagens só locais; nenhum segredo no código.
- **Acessibilidade**: HTML semântico, navegação por teclado com foco visível, áreas de toque de 44px, `prefers-reduced-motion` e o aviso de maioridade em `<dialog>` modal.
- **Qualidade**: TypeScript strict, ESLint, Prettier, testes com Vitest e CI no GitHub Actions.
- **Reaproveitamento**: componentes compartilhados em `components/` e conteúdo em `data/`. Cada nicho tem uma identidade visual própria, definida por tokens.

## Como rodar

Requer Node.js 22.12 ou superior.

```bash
npm install
cp .env.example .env.local   # no PowerShell: copy .env.example .env.local
npm run dev
```

Preencha em `.env.local` o número de WhatsApp que recebe os contatos (só dígitos, com país e DDD). Depois, abra http://localhost:3000.

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

## Como testar o modo offline no Chrome

O service worker só funciona no build de produção.

1. Rode `npm run build` e depois `npm run start`, e abra http://localhost:3000/gerar.
2. Abra o DevTools (F12), vá na aba **Application** e clique em **Service workers**. O worker de `/serwist/sw.js` deve aparecer como _activated and is running_.
3. Ainda no `/gerar`, clique em **Preparar modo offline** e espere a mensagem "Pronto".
4. Em **Application > Cache storage**, confira os caches `serwist-precache…` (páginas, JS, CSS e fontes) e `imagens-dos-demos` (fotos).
5. Na aba **Network**, troque _No throttling_ por **Offline**.
6. Abra um link personalizado novo, por exemplo `http://localhost:3000/varejo?nome=Teste&cor=0a7d3b`. A página abre com o nome e a cor, sem internet.
7. Uma rota que não existe (por exemplo `/barbearia`) mostra a página "Sem internet por aqui".

No celular, o fluxo é o mesmo: abra o site uma vez com internet, use **Preparar modo offline** no `/gerar` e, se quiser, instale o app pelo menu do navegador (**Adicionar à tela inicial**).

## Deploy na Vercel

1. Entre em https://vercel.com com a sua conta do GitHub.
2. Clique em **Add New… > Project** e importe o repositório `sites.sagital`. A Vercel detecta o Next.js sozinha.
3. Em **Environment Variables**, adicione `NEXT_PUBLIC_WHATSAPP_NUMERO` com o seu número (só dígitos, por exemplo `5511999999999`).
4. Clique em **Deploy**. A cada push na branch `main`, a Vercel publica uma versão nova.
5. Para um domínio próprio (`.com.br`), registre em https://registro.br e adicione em **Settings > Domains** no projeto da Vercel.

## Estrutura

```
app/                 rotas, layout, manifesto do PWA e service worker (sw.ts)
components/ui/       componentes base (botão, card, seção, container, carrossel)
components/nichos/   blocos compartilhados dos demos e pastas por nicho
components/sagital/  gerador de link e QR, prévia ao vivo, pacotes, marca e contato
components/portfolio/ cabeçalho compartilhado e as peças interativas de cada site do portfólio
data/                conteúdo fictício de cada nicho, do portfólio e da Sagital
lib/                 tema, agenda, consultas, regimes tributários, links, WhatsApp e formatação (com testes)
public/imagens/      fotos locais (Unsplash) e capturas dos demos
public/icons/        ícones do PWA
```

## Créditos

Fotos do [Unsplash](https://unsplash.com), salvas localmente sob a licença Unsplash. A origem de cada foto está gravada no próprio arquivo.
