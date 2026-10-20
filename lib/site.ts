/**
 * Endereço público do site. Na Vercel, vem da variável de sistema com o
 * domínio de produção; no computador, cai no localhost.
 */
export const URL_DO_SITE = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";
