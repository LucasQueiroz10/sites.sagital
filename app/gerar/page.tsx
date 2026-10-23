import { ChevronLeft } from "lucide-react";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ProvedorDaEscolha } from "@/components/sagital/EscolhaDoDemo";
import { GeradorDeLink } from "@/components/sagital/GeradorDeLink";
import { MarcaSagital } from "@/components/sagital/MarcaSagital";
import { PreparadorOffline } from "@/components/sagital/PreparadorOffline";
import { Container } from "@/components/ui/Container";
import { demos } from "@/data/sagital";
import { jakarta } from "../fontes";
import "../sagital.css";

export const metadata: Metadata = {
  title: "Gerar link do demo",
  description: "Ferramenta interna: link personalizado e QR code dos demos.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

/** Ferramenta do vendedor: monta o link e o QR antes ou durante a visita. */
export default function PaginaGerar() {
  const opcoes = demos.map(({ nicho, rotulo, padrao, captura }) => ({
    nicho,
    rotulo,
    padrao,
    captura,
  }));

  return (
    <div
      data-pagina="sagital"
      className={`${jakarta.variable} flex flex-1 flex-col bg-fundo font-texto text-texto`}
    >
      <ProvedorDaEscolha demos={opcoes}>
        <header className="print:hidden">
          <Container
            largura="normal"
            className="grid min-h-16 grid-cols-[1fr_auto_1fr] items-center gap-2"
          >
            <Link
              href="/"
              className="-ml-2 inline-flex min-h-11 items-center gap-1 justify-self-start rounded-[10px] pr-3 pl-1 text-[0.9375rem] font-medium text-texto-suave transition-colors hover:bg-superficie hover:text-texto"
            >
              <ChevronLeft aria-hidden className="size-6" strokeWidth={1.75} />
              Voltar ao site
            </Link>
            <MarcaSagital className="text-lg text-[var(--sg-tinta-forte)]" />
            <span aria-hidden />
          </Container>
        </header>

        <main className="flex-1 pt-4 pb-12 sm:pt-8 sm:pb-16">
          <Container largura="normal">
            <div className="mb-6 print:hidden">
              <h1 className="text-[1.75rem] leading-tight font-bold tracking-[-0.02em] sm:text-[2rem]">
                Gerar link e QR code
              </h1>
              <p className="mt-2 max-w-[60ch] text-base text-texto-suave">
                Escolha o ramo, digite o nome do estabelecimento e a cor. Abra o
                demo na hora, veja ao vivo, copie o link ou imprima o QR para
                deixar no balcão. Funciona sem internet depois do primeiro
                acesso.
              </p>
            </div>
            <GeradorDeLink modo="completo" />
            <PreparadorOffline
              paginas={["/", ...opcoes.map((d) => `/${d.nicho}`)]}
            />
          </Container>
        </main>
      </ProvedorDaEscolha>
    </div>
  );
}
