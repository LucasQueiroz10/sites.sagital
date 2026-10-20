import type { Metadata } from "next";
import Link from "next/link";
import { GeradorDeLink } from "@/components/sagital/GeradorDeLink";
import { MarcaSagital } from "@/components/sagital/MarcaSagital";
import { Container } from "@/components/ui/Container";
import { demos } from "@/data/sagital";
import { lexend } from "../fontes";
import "../sagital.css";

export const metadata: Metadata = {
  title: "Gerar link do demo",
  description: "Ferramenta interna: link personalizado e QR code dos demos.",
  robots: { index: false, follow: false },
};

/** Ferramenta do vendedor: monta o link e o QR antes ou durante a visita. */
export default function PaginaGerar() {
  const opcoes = demos.map(({ nicho, rotulo, padrao }) => ({
    nicho,
    rotulo,
    padrao,
  }));

  return (
    <div
      data-pagina="sagital"
      className={`${lexend.variable} flex flex-1 flex-col bg-fundo font-texto text-texto`}
    >
      <header className="border-b border-borda print:hidden">
        <Container
          largura="larga"
          className="flex min-h-16 items-center justify-between gap-4"
        >
          <MarcaSagital />
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-destaque focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque"
          >
            Voltar ao site
          </Link>
        </Container>
      </header>

      <main className="flex-1 py-10 sm:py-14">
        <Container largura="normal">
          <div className="print:hidden">
            <h1 className="text-[clamp(2rem,7vw,3rem)]">
              Gerar link e QR code
            </h1>
            <p className="mt-3 mb-8 max-w-[60ch] text-lg text-texto-suave">
              Escolha o ramo, digite o nome do estabelecimento e a cor. Abra o
              demo na hora, copie o link ou imprima o QR para deixar no balcão.
              Funciona sem internet depois do primeiro acesso.
            </p>
          </div>
          <GeradorDeLink demos={opcoes} modo="completo" />
        </Container>
      </main>
    </div>
  );
}
