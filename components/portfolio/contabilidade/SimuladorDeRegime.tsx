"use client";

import { ArrowRight, Info } from "lucide-react";
import { useId, useState, type CSSProperties } from "react";
import { classes } from "@/lib/classes";
import { enquadrar, LIMITE_MEI, type Atividade } from "@/lib/regimes";
import { linkDoPortfolio } from "@/lib/whatsapp";

type Props = {
  nomeDoSite: string;
  atividades: { valor: Atividade; rotulo: string }[];
  faturamento: { minimo: number; maximo: number; inicial: number };
  dasMei: number;
};

const reais = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});
const reaisComCentavos = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
const porcento = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});

// O controle anda em escala logarítmica: passos finos nos valores pequenos,
// onde estão o MEI e o pequeno comércio, e largos nos grandes.
function paraValor(posicao: number, minimo: number, maximo: number): number {
  const valor = minimo * (maximo / minimo) ** (posicao / 1000);
  const passo = valor < 20_000 ? 500 : valor < 100_000 ? 1_000 : 5_000;
  return Math.round(valor / passo) * passo;
}

function paraPosicao(valor: number, minimo: number, maximo: number): number {
  return Math.round(
    (Math.log(valor / minimo) / Math.log(maximo / minimo)) * 1000,
  );
}

/**
 * Faturamento por mês e atividade: o simulador indica o regime mais provável
 * e estima o imposto do mês. A conta é ilustrativa e diz isso na tela.
 */
export function SimuladorDeRegime({
  nomeDoSite,
  atividades,
  faturamento,
  dasMei,
}: Props) {
  const id = useId();
  const [atividade, setAtividade] = useState<Atividade>(
    atividades[0]?.valor ?? "comercio",
  );
  const [posicao, setPosicao] = useState(() =>
    paraPosicao(faturamento.inicial, faturamento.minimo, faturamento.maximo),
  );

  const mensal = paraValor(posicao, faturamento.minimo, faturamento.maximo);
  const anual = mensal * 12;
  const resultado = enquadrar(anual, atividade, dasMei);
  const nomeDaAtividade =
    atividades.find((a) => a.valor === atividade)?.rotulo.toLowerCase() ?? "";
  const progresso = `${posicao / 10}%`;
  // Onde fica o limite do MEI (por mês) na mesma escala do controle.
  const limiteDoMei = `${paraPosicao(LIMITE_MEI / 12, faturamento.minimo, faturamento.maximo) / 10}%`;

  const mensagem = `Fiz a simulação no site: faturamento de ${reais.format(mensal)} por mês em ${nomeDaAtividade}. O resultado foi ${resultado.regime}. Quero conversar com um contador.`;

  return (
    <div className="grid overflow-hidden rounded-tema border border-borda bg-fundo lg:grid-cols-2">
      <div className="p-6 sm:p-8 lg:p-10">
        <fieldset className="min-w-0">
          <legend className="mb-3 text-sm font-semibold">Atividade</legend>
          <div className="grid grid-cols-3 gap-1 rounded-tema bg-superficie p-1">
            {atividades.map((item) => (
              <label key={item.valor} className="cursor-pointer">
                <input
                  type="radio"
                  name={`${id}-atividade`}
                  value={item.valor}
                  checked={atividade === item.valor}
                  onChange={() => setAtividade(item.valor)}
                  className="peer sr-only"
                />
                <span className="flex min-h-11 items-center justify-center rounded-[6px] text-[0.9375rem] text-texto-suave transition-colors peer-checked:bg-fundo peer-checked:font-semibold peer-checked:text-texto peer-checked:shadow-[0_1px_3px_rgb(16_42_67/0.18)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-destaque">
                  {item.rotulo}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-9">
          <div className="flex items-baseline justify-between gap-4">
            <label
              htmlFor={`${id}-faturamento`}
              className="text-sm font-semibold"
            >
              Faturamento por mês
            </label>
            <span className="numero text-sm text-texto-suave">
              {reais.format(anual)} por ano
            </span>
          </div>
          <output
            htmlFor={`${id}-faturamento`}
            className="numero mt-2 block text-[clamp(2.5rem,9vw,3.5rem)] leading-none font-semibold tracking-[-0.03em]"
          >
            {reais.format(mensal)}
          </output>
          <input
            id={`${id}-faturamento`}
            type="range"
            min={0}
            max={1000}
            value={posicao}
            aria-valuetext={`${reais.format(mensal)} por mês`}
            onChange={(evento) => setPosicao(Number(evento.target.value))}
            style={{ "--progresso": progresso } as CSSProperties}
            className="controle mt-6 w-full"
          />
          <div className="numero mt-2 flex justify-between text-xs text-texto-suave">
            <span>{reais.format(faturamento.minimo)}</span>
            <span>{reais.format(faturamento.maximo)}</span>
          </div>
        </div>
      </div>

      <div className="escuro flex flex-col bg-[var(--cor-tinta)] p-6 text-white sm:p-8 lg:p-10">
        <p className="text-sm text-white/65">Regime mais provável</p>
        <p
          aria-live="polite"
          className="mt-2 text-[2rem] leading-tight font-semibold tracking-[-0.025em]"
        >
          {resultado.regime}
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-white/15 pt-6">
          <div>
            <dt className="text-sm text-white/65">Imposto estimado</dt>
            <dd className="numero mt-1 text-2xl font-semibold">
              {resultado.impostoMensal === null
                ? "Sob análise"
                : `${reaisComCentavos.format(resultado.impostoMensal)}`}
              {resultado.impostoMensal !== null && (
                <span className="text-sm font-normal text-white/65">/mês</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-white/65">Alíquota efetiva</dt>
            <dd className="numero mt-1 text-2xl font-semibold">
              {resultado.aliquota === null
                ? resultado.regime === "MEI"
                  ? "Valor fixo"
                  : "—"
                : porcento.format(resultado.aliquota)}
            </dd>
          </div>
        </dl>

        {/* Onde o faturamento está em relação ao limite do MEI. */}
        <div className="mt-8">
          <div className="relative h-4 text-xs text-white/65">
            <span className="absolute left-0">MEI</span>
            <span
              className="absolute -translate-x-1/2"
              style={{ left: limiteDoMei }}
            >
              {reais.format(LIMITE_MEI / 12)}/mês
            </span>
            <span className="absolute right-0">Simples</span>
          </div>
          <div
            aria-hidden
            className="relative mt-2 h-2 overflow-hidden rounded-full bg-white/15"
          >
            <span
              className={classes(
                "absolute inset-y-0 left-0 rounded-full transition-[width,background-color] duration-300",
                anual <= LIMITE_MEI
                  ? "bg-[var(--cor-menta)]"
                  : "bg-[var(--cor-ambar)]",
              )}
              style={{ width: progresso }}
            />
            <span
              className="absolute inset-y-0 w-0.5 bg-white"
              style={{ left: limiteDoMei }}
            />
          </div>
        </div>

        <p className="mt-6 flex gap-2 text-sm leading-relaxed text-white/75">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
          {resultado.observacao} Simulação ilustrativa, sem valor fiscal.
        </p>

        <div className="mt-auto pt-8">
          <a
            href={linkDoPortfolio(mensagem, nomeDoSite)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-tema bg-white px-6 font-semibold text-[var(--cor-tinta)] transition-colors hover:bg-[var(--cor-menta)]"
          >
            Conversar sobre o resultado
            <ArrowRight aria-hidden className="size-4" />
            <span className="sr-only"> (abre o WhatsApp)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
