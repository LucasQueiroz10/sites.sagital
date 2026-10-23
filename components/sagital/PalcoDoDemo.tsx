"use client";

import { Eye } from "lucide-react";
import Image from "next/image";
import { classes } from "@/lib/classes";
import { useEscolha } from "./EscolhaDoDemo";
import { FundoSoffit } from "./FundoSoffit";

/**
 * O palco do topo no desktop: a captura real do demo escolhido no navegador
 * e no celular, trocando junto com o ramo em dois tempos (o navegador chega,
 * o celular vem logo atrás). Abre a prévia ao vivo.
 */
export function PalcoDoDemo() {
  const { demos, nicho, demo, abrirPrevia } = useEscolha();

  return (
    <div
      data-revela
      className="sg-noite relative hidden aspect-[6/5] overflow-hidden rounded-[32px] lg:sticky lg:top-24 lg:block"
    >
      <FundoSoffit />
      {demos.map((d) => {
        const atual = d.nicho === nicho;
        return (
          <div
            key={d.nicho}
            aria-hidden={!atual}
            className={classes(
              "absolute inset-0 transition-opacity duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
              atual ? "opacity-100" : "opacity-0",
            )}
          >
            {d.capturaDesktop && (
              <div
                className={classes(
                  "absolute top-[11%] left-[7%] w-[74%] overflow-hidden rounded-xl bg-[#e9eef4] shadow-[0_24px_60px_rgb(5_10_30/0.45)]",
                  "transition-transform duration-[520ms] ease-[cubic-bezier(.16,1,.3,1)]",
                  !atual && "translate-y-3",
                )}
              >
                <div className="flex h-7 items-center gap-1.5 px-3">
                  <span className="size-2 rounded-full bg-[#ff5f57]" />
                  <span className="size-2 rounded-full bg-[#febc2e]" />
                  <span className="size-2 rounded-full bg-[#28c840]" />
                </div>
                <div className="relative aspect-[1440/900]">
                  <Image
                    src={d.capturaDesktop.src}
                    alt={atual ? d.capturaDesktop.alt : ""}
                    fill
                    sizes="(min-width: 1280px) 520px, 40vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            )}
            {d.captura && (
              <div
                className={classes(
                  "sg-celular absolute top-[27%] right-[6%] w-[25%] rounded-[1.75rem] p-1.5",
                  "transition-transform delay-[70ms] duration-[520ms] ease-[cubic-bezier(.16,1,.3,1)]",
                  !atual && "translate-y-8",
                )}
              >
                <div className="relative aspect-[390/844] overflow-hidden rounded-[1.4rem]">
                  <Image
                    src={d.captura.src}
                    alt={atual ? d.captura.alt : ""}
                    fill
                    sizes="(min-width: 1280px) 180px, 14vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => abrirPrevia()}
        className="sg-pressiona absolute bottom-6 left-6 inline-flex min-h-11 items-center gap-2 rounded-full sg-vidro px-4 text-sm font-semibold focus-visible:outline-white"
      >
        <Eye aria-hidden className="size-[18px]" strokeWidth={1.75} />
        Ver {demo.rotulo.toLowerCase()} ao vivo
      </button>
    </div>
  );
}
