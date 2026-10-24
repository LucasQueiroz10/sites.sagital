import type { CSSProperties } from "react";

type Marco = { dia: number; titulo: string; texto: string };

const DIAS = 30;
/** Onde a linha do mês começa e termina de encher (% da passagem da seção). */
const COMECO = 18;
const FIM = 58;

/**
 * O mês de um cliente, do dia 1 ao 30. A linha enche conforme a seção passa
 * pela tela e cada marco acende quando ela chega ao dia dele (CSS
 * `.mes-*` em contabilidade.css, com animation-timeline). Sem suporte à
 * linha do tempo de rolagem, ou com movimento reduzido, tudo aparece
 * aceso.
 */
export function MesComAPrumo({ marcos }: { marcos: Marco[] }) {
  const ponto = (dia: number) =>
    COMECO + ((dia - 1) / (DIAS - 1)) * (FIM - COMECO);
  return (
    <div className="mes">
      {/* A régua dos dias: só no desktop, onde cabe o mês inteiro. */}
      <div aria-hidden className="relative hidden h-10 lg:block">
        <div className="absolute inset-x-0 top-1/2 h-px bg-borda" />
        <div className="mes-linha absolute inset-x-0 top-1/2 h-[2px] -translate-y-px bg-destaque" />
        {Array.from({ length: DIAS }, (_, i) => (
          <span
            key={i}
            className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-borda"
            style={{ left: `${(i / (DIAS - 1)) * 100}%` }}
          />
        ))}
      </div>

      <ol className="relative grid gap-0 lg:block lg:h-56">
        {/* No celular, a mesma linha corre na vertical. */}
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[5px] w-px bg-borda lg:hidden"
        />
        <span
          aria-hidden
          className="mes-linha-vertical absolute top-2 bottom-2 left-[4.5px] w-[2px] bg-destaque lg:hidden"
        />
        {marcos.map((m, i) => {
          const inicio = ponto(m.dia);
          const posicao = ((m.dia - 1) / (DIAS - 1)) * 100;
          return (
            <li
              key={m.dia}
              className="mes-marco relative pb-8 pl-8 lg:pb-0 lg:pl-0"
              data-direita={posicao > 60 || undefined}
              style={
                {
                  "--inicio": `${inicio.toFixed(1)}%`,
                  "--fim": `${(inicio + 3).toFixed(1)}%`,
                  "--esquerda": `${posicao}%`,
                  // No desktop, os marcos alternam entre duas alturas
                  // abaixo da régua, para os textos não se encostarem.
                  "--recuo": i % 2 ? "7.5rem" : "0rem",
                } as CSSProperties
              }
            >
              <span
                aria-hidden
                className="mes-ponto absolute top-1.5 left-0 size-[11px] rounded-full border-2 border-destaque bg-fundo"
              />
              <p className="numero text-sm font-semibold text-destaque">
                Dia {m.dia}
              </p>
              <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em]">
                {m.titulo}
              </h3>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-texto-suave">
                {m.texto}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
