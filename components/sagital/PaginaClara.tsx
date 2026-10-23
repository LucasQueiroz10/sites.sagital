import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { instrumentSerif, interTight, jakarta } from "@/app/fontes";
import { Container } from "@/components/ui/Container";
import { MarcaSagital } from "./MarcaSagital";
import { RodapeSagital } from "./RodapeSagital";

/**
 * A casca das páginas internas da Sagital (pacotes, demos, trabalhos), no
 * design da página de pacotes: fundo branco, "Voltar ao site" e a marca no
 * cabeçalho, as fontes dos títulos (Inter Tight e Instrument Serif) e o
 * rodapé preto. Quem usa importa o sagital.css.
 */
export function PaginaClara({
  voltarPara,
  children,
}: {
  /** Onde o "Voltar ao site" leva: a seção da inicial de onde a pessoa veio. */
  voltarPara: string;
  children: ReactNode;
}) {
  return (
    <div
      data-pagina="sagital"
      className={`${jakarta.variable} ${interTight.variable} ${instrumentSerif.variable} flex flex-1 flex-col bg-fundo font-texto text-texto`}
    >
      <header>
        <Container
          largura="normal"
          className="grid min-h-16 grid-cols-[1fr_auto_1fr] items-center gap-2"
        >
          <Link
            href={voltarPara}
            className="-ml-2 inline-flex min-h-11 items-center gap-1 justify-self-start rounded-[10px] pr-3 pl-1 text-[0.9375rem] font-medium text-texto-suave transition-colors hover:bg-superficie hover:text-texto"
          >
            <ChevronLeft aria-hidden className="size-6" strokeWidth={1.75} />
            Voltar ao site
          </Link>
          <MarcaSagital className="text-lg text-[var(--sg-tinta-forte)]" />
          <span aria-hidden />
        </Container>
      </header>

      {children}

      <RodapeSagital comBarraFixa={false} />
    </div>
  );
}
