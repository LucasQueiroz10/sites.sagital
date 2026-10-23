import { ChevronLeft } from "lucide-react";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { MarcaSagital } from "@/components/sagital/MarcaSagital";
import { RodapeSagital } from "@/components/sagital/RodapeSagital";
import { Container } from "@/components/ui/Container";
import { instrumentSerif, interTight, jakarta } from "../fontes";
import "../sagital.css";

export const metadata: Metadata = {
  // Só a página inicial é indexável (PRODUCT.md).
  robots: { index: false, follow: true },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

/**
 * As páginas dos pacotes (a comparação e a de cada um): fundo branco, como
 * a referência de preços do dono, com o cabeçalho de "Voltar ao site" e o
 * rodapé da Sagital.
 */
export default function LayoutDosPacotes({
  children,
}: LayoutProps<"/pacotes">) {
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
            href="/#pacotes"
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
