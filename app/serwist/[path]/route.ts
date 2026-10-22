import { spawnSync } from "node:child_process";
import { createSerwistRoute } from "@serwist/turbopack";

// Versão do cache: o commit do deploy na Vercel ou o commit local. Muda a
// cada publicação, então o aparelho baixa as páginas novas.
const commitLocal = spawnSync("git", ["rev-parse", "HEAD"], {
  encoding: "utf-8",
}).stdout?.trim();
const revisao =
  process.env.VERCEL_GIT_COMMIT_SHA || commitLocal || crypto.randomUUID();

// Páginas guardadas na instalação do service worker.
const paginas = [
  "/",
  "/academia",
  "/varejo",
  "/restaurante",
  "/tabacaria",
  "/gerar",
  "/~offline",
];

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } =
  createSerwistRoute({
    swSrc: "app/sw.ts",
    additionalPrecacheEntries: paginas.map((url) => ({
      url,
      revision: revisao,
    })),
    // JS, CSS e fontes do build, mais os ícones. As fotos ficam de fora da
    // instalação (são pesadas) e entram no cache em tempo de execução.
    globPatterns: [
      ".next/static/**/*.{js,css,woff,woff2}",
      "public/icons/**/*",
    ],
    useNativeEsbuild: true,
  });
