"use client";

import { Eye } from "lucide-react";
import Image from "next/image";
import { classes } from "@/lib/classes";
import { useEscolha } from "./EscolhaDoDemo";
import { FundoSoffit } from "./FundoSoffit";

/**
 * O palco da seção "Veja o site do seu negócio": a captura real do demo
 * escolhido no navegador e no celular, trocando junto com o ramo em dois
 * tempos (o navegador chega, o celular vem logo atrás). Abre a prévia ao
 * vivo, onde o visitante escolhe o ramo, o nome e a cor.
 */
export function PalcoDoDemo() {
  const { demos, nicho, demo, abrirPrevia } = useEscolha();

  return (
    <div className="sg-noite relative aspect-square overflow-hidden rounded-3xl text-left ring-1 ring-white/15 sm:aspect-[16/10] sm:rounded-[32px]">
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
                  "absolute top-[11%] left-[7%] w-[74%] overflow-hidden rounded-xl bg-[#e9eef4] shadow-[0_24px_60px_rgb(5_10_30/0.45)] sm:top-[8%] sm:left-[8%] sm:w-[70%]",
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
                    sizes="(min-width: 768px) 540px, 74vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            )}
            {d.captura && (
              <div
                className={classes(
                  "sg-celular absolute top-[27%] right-[6%] w-[25%] rounded-[1.75rem] p-1.5 sm:top-[18%] sm:right-[7%] sm:w-[19%]",
                  "transition-transform delay-[70ms] duration-[520ms] ease-[cubic-bezier(.16,1,.3,1)]",
                  !atual && "translate-y-8",
                )}
              >
                <div className="relative aspect-[390/844] overflow-hidden rounded-[1.4rem]">
                  <Image
                    src={d.captura.src}
                    alt={atual ? d.captura.alt : ""}
                    fill
                    sizes="(min-width: 768px) 150px, 25vw"
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
