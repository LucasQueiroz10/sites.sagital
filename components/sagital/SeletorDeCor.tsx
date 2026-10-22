"use client";

import { Pipette } from "lucide-react";
import { coresDoGerador } from "@/data/sagital";
import { classes } from "@/lib/classes";
import { validarCor, type PadraoDoTema } from "@/lib/tema";

type Props = {
  /** Nome do grupo de rádios (precisa ser único na página). */
  nome: string;
  /** Cor escolhida em #rrggbb, ou null para o padrão do ramo. */
  valor: string | null;
  aoEscolher: (cor: string | null) => void;
  padrao: PadraoDoTema;
  /** Fundo onde o seletor aparece: muda a cor do anel de seleção. */
  fundo?: "claro" | "escuro";
  /** Mostra o seletor livre de cor ("Outra"), só no /gerar. */
  livre?: boolean;
};

const PADRAO = "padrao";

/**
 * Os círculos de cor do kit. O primeiro é o padrão do ramo, em duas metades
 * (a cor e o fundo do demo), como as paletas do SwatchPicker.
 */
export function SeletorDeCor({
  nome,
  valor,
  aoEscolher,
  padrao,
  fundo = "claro",
  livre = false,
}: Props) {
  const escuro = fundo === "escuro";
  const corLivre = valor && !coresDoGerador.some((c) => c.valor === valor);
  const anel = (marcado: boolean) =>
    classes(
      "grid size-11 place-items-center rounded-full transition-shadow duration-150",
      "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1",
      escuro
        ? "peer-focus-visible:outline-white"
        : "peer-focus-visible:outline-destaque",
      marcado
        ? escuro
          ? "shadow-[inset_0_0_0_2px_#ffffff]"
          : "shadow-[inset_0_0_0_2px_var(--cor-texto)]"
        : escuro
          ? "shadow-[inset_0_0_0_1px_rgb(255_255_255/0.28)]"
          : "shadow-[inset_0_0_0_1px_var(--cor-borda)]",
    );

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <div role="radiogroup" aria-label="Cor da marca" className="flex">
        <label className="relative cursor-pointer" title="Padrão do ramo">
          <input
            type="radio"
            name={nome}
            value={PADRAO}
            checked={valor === null}
            onChange={() => aoEscolher(null)}
            className="peer sr-only"
          />
          <span aria-hidden className={anel(valor === null)}>
            <span
              className="block size-[34px] rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]"
              style={{
                background: `linear-gradient(135deg, ${padrao.cor} 0 50%, ${padrao.fundo} 50% 100%)`,
              }}
            />
          </span>
          <span className="sr-only">Padrão do ramo</span>
        </label>

        {coresDoGerador.map((opcao) => (
          <label
            key={opcao.valor}
            className="relative cursor-pointer"
            title={opcao.nome}
          >
            <input
              type="radio"
              name={nome}
              value={opcao.valor}
              checked={valor === opcao.valor}
              onChange={() => aoEscolher(opcao.valor)}
              className="peer sr-only"
            />
            <span aria-hidden className={anel(valor === opcao.valor)}>
              <span
                className="block size-[34px] rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]"
                style={{ backgroundColor: opcao.valor }}
              />
            </span>
            <span className="sr-only">{opcao.nome}</span>
          </label>
        ))}
      </div>

      {livre && (
        <label
          className={classes(
            "sg-pressiona relative inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-white pr-4 pl-2 text-sm font-semibold text-texto",
            "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-destaque",
            corLivre && "shadow-[inset_0_0_0_2px_var(--cor-texto)]",
          )}
        >
          <input
            type="color"
            value={validarCor((valor ?? "").replace("#", "")) ?? padrao.cor}
            onChange={(e) => aoEscolher(e.target.value)}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-full text-white shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]"
            style={{
              background: corLivre
                ? (validarCor((valor ?? "").replace("#", "")) ?? undefined)
                : "conic-gradient(#e11d48, #f97316, #facc15, #16a34a, #2563eb, #7c3aed, #e11d48)",
            }}
          >
            <Pipette className="size-3.5 drop-shadow-[0_1px_1px_rgb(0_0_0/0.4)]" />
          </span>
          Outra cor
        </label>
      )}
    </div>
  );
}

/** Nome da cor escolhida, para a legenda do seletor. */
export function nomeDaCor(valor: string | null): string {
  if (valor === null) return "Padrão do ramo";
  return coresDoGerador.find((c) => c.valor === valor)?.nome ?? valor;
}
