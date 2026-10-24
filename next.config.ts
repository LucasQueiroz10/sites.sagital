import { withSerwist } from "@serwist/turbopack";
import type { NextConfig } from "next";

const desenvolvimento = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy. Tudo vem do próprio site ('self'); as exceções:
 *
 * - script-src 'unsafe-inline': o Next.js coloca scripts inline no HTML
 *   (hidratação e dados das rotas). A alternativa (nonce) obrigaria a gerar
 *   cada página a cada visita, o que acaba com as páginas estáticas e com o
 *   modo offline. O risco fica coberto pela validação estrita dos parâmetros
 *   da URL e por nunca usar dangerouslySetInnerHTML.
 * - script-src 'unsafe-eval': só em desenvolvimento, para o React mostrar
 *   erros detalhados. Não vai para produção.
 * - style-src 'unsafe-inline': o next/image e o tema personalizável usam o
 *   atributo style (cor do cliente em variável CSS, já validada).
 * - img-src data: blob:: miniaturas desfocadas do next/image e o PNG do QR
 *   code gerado no navegador para download.
 * - upgrade-insecure-requests: só na Vercel (HTTPS); no localhost quebraria
 *   o servidor de teste em HTTP.
 * - frame-ancestors 'self': a prévia ao vivo da página inicial mostra o demo
 *   num iframe do próprio site. Nenhum outro site pode emoldurar as páginas
 *   (proteção contra clickjacking mantida); o X-Frame-Options acompanha.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${desenvolvimento ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "worker-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-src 'self'",
  "frame-ancestors 'self'",
  ...(process.env.VERCEL ? ["upgrade-insecure-requests"] : []),
].join("; ");

/**
 * Paralelo (premium): o globo da abertura é um vídeo servido pela CDN do
 * modelo, com o quadro de espera ao lado. Só essa página libera esses dois
 * domínios; o resto do site segue na política acima.
 */
const cspDaParalelo = csp
  .replace(
    "img-src 'self'",
    "img-src 'self' https://d2ol7oe51mr4n9.cloudfront.net",
  )
  .replace(
    "default-src 'self'",
    "default-src 'self'; media-src 'self' https://d8j0ntlcm91z4.cloudfront.net",
  );

const cabecalhosDeSeguranca = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    // Só imagens locais: as importadas no código (servidas em
    // /_next/static/media) e a pasta public/imagens. Nenhum domínio externo.
    localPatterns: [
      { pathname: "/_next/static/media/**", search: "" },
      { pathname: "/imagens/**", search: "" },
    ],
    qualities: [75],
  },
  async headers() {
    return [
      { source: "/:path*", headers: cabecalhosDeSeguranca },
      // Vem depois para substituir a política geral nessa página.
      {
        source: "/premium/paralelo",
        headers: [{ key: "Content-Security-Policy", value: cspDaParalelo }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withSerwist(nextConfig);
