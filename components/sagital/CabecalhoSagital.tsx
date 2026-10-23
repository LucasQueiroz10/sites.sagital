"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { mensagemDeContato } from "@/data/sagital";
import { classes } from "@/lib/classes";
import { usePassouDoTopo } from "@/lib/usePassouDoTopo";
import { montarLinkWhatsApp } from "@/lib/whatsapp";
import { BotaoContato } from "./BotaoContato";
import { MarcaSagital } from "./MarcaSagital";

// "Demos" e "Trabalhos" abrem as páginas com todos; o resto são seções da página
// inicial (na própria página, a viagem até a âncora continua animada).
const navegacao = [
  { rotulo: "Demos", href: "/demos" },
  { rotulo: "Trabalhos", href: "/trabalhos" },
  { rotulo: "Como funciona", href: "/#como-funciona" },
  { rotulo: "Pacotes", href: "/#pacotes" },
];

/**
 * Cabeçalho fixo da página da Sagital, em três tempos: transparente sobre a
 * abertura no topo da página; no fundo do degradê enquanto a abertura passa por baixo
 * (o título não se mistura com o nome); barra branca depois dela.
 */
export function CabecalhoSagital({
  tema = "claro",
}: {
  /** "azul": a página toda é azul, e a barra fica escura depois da abertura. */
  tema?: "claro" | "azul";
}) {
  const rolou = usePassouDoTopo("[data-topo-da-abertura]");
  const passouDaAbertura = usePassouDoTopo("[data-fim-da-abertura]");
  const claro = passouDaAbertura && tema === "claro";
  // No celular, a barra fixa de baixo já leva ao WhatsApp: o botão redondo
  // some enquanto ela aparece, para não haver dois iguais à vista.
  const barraVisivel = usePassouDoTopo("[data-cta-principal]");

  return (
    <header
      className={classes(
        "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-200 ease-[cubic-bezier(.2,.8,.2,1)]",
        claro
          ? "border-[var(--sg-borda-sutil)] bg-white"
          : passouDaAbertura
            ? "sg-foco-claro border-white/10 bg-[rgb(4_26_39/0.82)] backdrop-blur-md"
            : rolou
              ? "sg-foco-claro border-white/10 bg-[var(--sg-soffit-fundo)]"
              : "sg-foco-claro border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* À esquerda, a marca e as seções; o nome é sempre o mais forte da
            barra (extranegrito, cor cheia), e um fio fino o separa das
            âncoras, que ficam menores e mais suaves. */}
        <div className="flex min-w-0 items-center gap-5 lg:gap-6">
          <MarcaSagital
            className={claro ? "text-[var(--sg-tinta-forte)]" : "text-white"}
          />
          <span
            aria-hidden
            className={classes(
              "hidden h-5 w-px md:block",
              claro ? "bg-[var(--cor-borda)]" : "bg-white/20",
            )}
          />
          <nav
            aria-label="Seções"
            className="-ml-3 hidden items-center md:flex"
          >
            {navegacao.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={classes(
                  "inline-flex min-h-11 items-center rounded-[10px] px-3 text-[0.9375rem] font-medium transition-colors",
                  claro
                    ? "text-texto-suave hover:bg-superficie hover:text-texto"
                    : "text-white/75 hover:bg-white/10 hover:text-white",
                )}
              >
                {link.rotulo}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden md:block">
          <BotaoContato
            rotulo="WhatsApp"
            complementoAcessivel="da Sagital"
            variante={claro ? "escuro" : "vidro"}
            tamanho="medio"
          />
        </div>
        <a
          href={montarLinkWhatsApp(mensagemDeContato)}
          target="_blank"
          rel="noopener noreferrer"
          className={classes(
            "sg-pressiona grid size-11 place-items-center rounded-full md:hidden",
            claro
              ? "bg-superficie text-texto hover:bg-[var(--sg-pressionado)]"
              : "sg-vidro",
            barraVisivel && "invisible",
          )}
        >
          <MessageCircle
            aria-hidden
            className="size-[22px]"
            strokeWidth={1.75}
          />
          <span className="sr-only">WhatsApp da Sagital (abre o WhatsApp)</span>
        </a>
      </div>
    </header>
  );
}
