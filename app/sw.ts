/// <reference lib="webworker" />
import { defaultCache } from "@serwist/turbopack/worker";
import type {
  PrecacheEntry,
  RuntimeCaching,
  SerwistGlobalConfig,
} from "serwist";
import { CacheFirst, ExpirationPlugin, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

/**
 * Só o que é do próprio site passa pelo service worker. Arquivos de outros
 * domínios (o vídeo do globo da Paralelo, por exemplo) vão direto do
 * navegador: buscados de dentro do worker, eles esbarram no connect-src
 * 'self' do CSP e falham, e o vídeo nem precisa de cache offline.
 */
function soDoSite(entrada: RuntimeCaching): RuntimeCaching {
  const { matcher } = entrada;
  return {
    ...entrada,
    matcher: (opcoes) =>
      opcoes.sameOrigin &&
      (typeof matcher === "function"
        ? matcher(opcoes)
        : matcher instanceof RegExp
          ? matcher.test(opcoes.url.href)
          : typeof matcher === "string"
            ? opcoes.url.href === new URL(matcher, self.location.href).href
            : false),
  };
}

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  // Ignora qualquer parâmetro (?nome=, ?cor=) ao procurar a página no cache:
  // um link personalizado novo abre offline com a página já guardada.
  precacheOptions: { ignoreURLParametersMatching: [/.*/] },
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    // Fotos otimizadas pelo next/image: guardadas na primeira vez que aparecem
    // (ou no "preparar modo offline" do /gerar) e servidas do cache depois.
    {
      matcher: /\/_next\/image\?url=.+$/i,
      handler: new CacheFirst({
        cacheName: "imagens-dos-demos",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 400,
            maxAgeSeconds: 60 * 60 * 24 * 60,
          }),
        ],
      }),
    },
    ...defaultCache.map(soDoSite),
  ],
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher: ({ request }) => request.destination === "document",
      },
    ],
  },
});

serwist.addEventListeners();
