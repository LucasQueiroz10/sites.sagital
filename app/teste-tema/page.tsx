// Página temporária para testar o sistema de tema (Fase 2).
// Sai quando o primeiro demo estiver pronto.
import type { Metadata } from "next";
import Link from "next/link";
import { NomeDoEstabelecimento, TemaDoNicho } from "@/components/TemaDoNicho";
import { Botao } from "@/components/ui/Botao";
import { Card } from "@/components/ui/Card";
import { Secao } from "@/components/ui/Secao";
import type { PadraoDoTema } from "@/lib/tema";
import { PainelDoTema } from "./PainelDoTema";

export const metadata: Metadata = {
  title: "Teste do tema",
  robots: { index: false, follow: false },
};

const padrao: PadraoDoTema = {
  nome: "Estabelecimento Exemplo",
  cor: "#c2410c",
  fundo: "#ffffff",
};

const casos = [
  { rotulo: "Iron Gym, laranja", busca: "?nome=Iron+Gym&cor=ff6600" },
  {
    rotulo: "Amarelo (texto vira preto)",
    busca: "?nome=Mercado+Sol&cor=ffff00",
  },
  {
    rotulo: "Azul-marinho",
    busca: "?nome=Cantina+D%E2%80%99%C3%81vila&cor=1e3a8a",
  },
  { rotulo: "Branco (destaque escurece)", busca: "?cor=ffffff" },
  { rotulo: "Cor inválida", busca: "?nome=Zé+%26+Cia.&cor=vermelho" },
  {
    rotulo: "Nome com HTML",
    busca: "?nome=%3Cscript%3Ealert(1)%3C%2Fscript%3E",
  },
  { rotulo: "Nome com 41 caracteres", busca: `?nome=${"A".repeat(41)}` },
  { rotulo: "Sem parâmetros", busca: "" },
];

export default function TesteDoTema() {
  return (
    <TemaDoNicho nicho="teste" rotulo="Teste do tema" padrao={padrao}>
      <main className="flex-1">
        <Secao
          id="tema"
          largura="estreita"
          titulo={
            <>
              Olá, <NomeDoEstabelecimento />
            </>
          }
        >
          <p className="mb-6 max-w-prose text-texto-suave">
            Troque os parâmetros da URL e veja o nome, as cores e o título da
            aba mudarem. Valores inválidos voltam para o padrão sem quebrar a
            página.
          </p>

          <div className="mb-10 flex flex-wrap gap-3">
            <Botao>Primário</Botao>
            <Botao variante="secundario">Secundário</Botao>
            <Botao tamanho="grande">Grande</Botao>
            <Botao disabled>Desabilitado</Botao>
            <Botao href="https://wa.me/" externo>
              Link externo
            </Botao>
          </div>

          <Card como="article" className="mb-10">
            <h3 className="mb-2 font-titulo text-xl font-semibold">
              Contraste calculado
            </h3>
            <PainelDoTema fundo={padrao.fundo} />
          </Card>

          <h3 className="mb-3 font-titulo text-xl font-semibold">
            Casos de teste
          </h3>
          <ul className="grid gap-2">
            {casos.map((caso) => (
              <li key={caso.rotulo}>
                <Link
                  href={`/teste-tema${caso.busca}`}
                  className="inline-flex min-h-11 items-center text-destaque underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque"
                >
                  {caso.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </Secao>
      </main>
    </TemaDoNicho>
  );
}
