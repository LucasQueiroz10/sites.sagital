"use client";

import type { StaticImageData } from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { montarLinkDoDemo, type Nicho } from "@/lib/link";
import { validarCor, validarNome, type PadraoDoTema } from "@/lib/tema";
import { EscolhasDaPrevia } from "./EscolhasDaPrevia";
import { PreviaAoVivo, type Aparelho } from "./PreviaAoVivo";
import { QrDoDemo } from "./QrDoDemo";
import { SeletorDeCor } from "./SeletorDeCor";

type Captura = { src: StaticImageData; alt: string };

export type OpcaoDeDemo = {
  nicho: Nicho;
  rotulo: string;
  padrao: PadraoDoTema;
  captura?: Captura;
  capturaDesktop?: Captura;
};

type Contexto = {
  demos: OpcaoDeDemo[];
  demo: OpcaoDeDemo;
  nicho: Nicho;
  nome: string;
  /** Cor escolhida em #rrggbb, ou null para a cor padrão do ramo. */
  cor: string | null;
  /** O nome que o demo vai mostrar: o digitado, se válido, ou o padrão. */
  nomeExibido: string;
  /** Cor que o demo vai usar de fato. */
  corEfetiva: string;
  /** Link do demo personalizado; null até o navegador saber a própria origem. */
  link: string | null;
  escolherNicho: (nicho: Nicho) => void;
  escolherNome: (nome: string) => void;
  escolherCor: (cor: string | null) => void;
  /** Abre a prévia ao vivo, opcionalmente já num outro ramo. */
  abrirPrevia: (nicho?: Nicho) => void;
  /** Abre a prévia de um site do portfólio, sem personalização. */
  abrirSite: (site: SiteNaPrevia) => void;
};

/** Um site do portfólio na prévia: só o endereço e o nome. */
export type SiteNaPrevia = { nome: string; ramo: string; href: string };

const ContextoDaEscolha = createContext<Contexto | null>(null);

const assinarNada = () => () => {};

/**
 * A escolha do visitante (ramo, nome e cor) vale para a página toda: o
 * gerador, o palco do topo, os cartões dos demos e a prévia ao vivo.
 */
export function ProvedorDaEscolha({
  demos,
  children,
}: {
  demos: OpcaoDeDemo[];
  children: ReactNode;
}) {
  const origem = useSyncExternalStore(
    assinarNada,
    () => window.location.origin,
    () => null,
  );
  const [nicho, setNicho] = useState<Nicho>(demos[0]?.nicho ?? "academia");
  const [nome, setNome] = useState("");
  const [cor, setCor] = useState<string | null>(null);
  const [previaAberta, setPreviaAberta] = useState(false);
  // Com um site do portfólio escolhido, a prévia mostra ele no lugar do demo.
  const [site, setSite] = useState<SiteNaPrevia | null>(null);
  const [aparelho, setAparelho] = useState<Aparelho>("celular");

  const demo = demos.find((d) => d.nicho === nicho) ?? demos[0];
  if (!demo) throw new Error("ProvedorDaEscolha precisa de ao menos um demo.");

  const nomeExibido = validarNome(nome) ?? demo.padrao.nome;
  const corEfetiva =
    validarCor((cor ?? "").replace("#", "")) ?? demo.padrao.cor;
  const link = origem
    ? montarLinkDoDemo(origem, demo.nicho, nome, cor ?? "")
    : null;

  // No computador a prévia abre na tela grande; no celular, na tela dele.
  const abrirNoAparelhoCerto = useCallback(() => {
    setAparelho(
      window.matchMedia("(min-width: 1024px)").matches
        ? "computador"
        : "celular",
    );
    setPreviaAberta(true);
  }, []);

  const abrirPrevia = useCallback(
    (outro?: Nicho) => {
      if (outro) setNicho(outro);
      setSite(null);
      abrirNoAparelhoCerto();
    },
    [abrirNoAparelhoCerto],
  );

  const abrirSite = useCallback(
    (escolhido: SiteNaPrevia) => {
      setSite(escolhido);
      abrirNoAparelhoCerto();
    },
    [abrirNoAparelhoCerto],
  );

  const valor = useMemo<Contexto>(
    () => ({
      demos,
      demo,
      nicho,
      nome,
      cor,
      nomeExibido,
      corEfetiva,
      link,
      escolherNicho: setNicho,
      escolherNome: setNome,
      escolherCor: setCor,
      abrirPrevia,
      abrirSite,
    }),
    [
      demos,
      demo,
      nicho,
      nome,
      cor,
      nomeExibido,
      corEfetiva,
      link,
      abrirPrevia,
      abrirSite,
    ],
  );

  const linkDoSite =
    site && origem ? new URL(site.href, origem).toString() : null;

  return (
    <ContextoDaEscolha.Provider value={valor}>
      {children}
      {site ? (
        <PreviaAoVivo
          aberta={previaAberta}
          aoFechar={() => setPreviaAberta(false)}
          aparelho={aparelho}
          escolherAparelho={setAparelho}
          titulo={site.nome}
          subtitulo={`Portfólio · ${site.ramo}`}
          tituloDoSite={`Site conceitual de ${site.nome}`}
          link={linkDoSite}
        />
      ) : (
        <PreviaAoVivo
          aberta={previaAberta}
          aoFechar={() => setPreviaAberta(false)}
          aparelho={aparelho}
          escolherAparelho={setAparelho}
          titulo={demo.rotulo}
          subtitulo={`Prévia ao vivo · ${nomeExibido}`}
          tituloDoSite={`Demo de ${demo.rotulo.toLowerCase()} para ${nomeExibido}`}
          link={link}
          rotuloDoBotao="Abrir o demo"
          escolhas={
            <EscolhasDaPrevia
              demos={demos}
              nicho={nicho}
              aoEscolherNicho={setNicho}
              nome={nome}
              aoMudarNome={setNome}
              nomePadrao={demo.padrao.nome}
            />
          }
          acoes={
            <QrDoDemo
              link={link}
              rotulo={demo.rotulo}
              nomeExibido={nomeExibido}
              className="shrink-0 px-3.5"
            />
          }
          controles={
            <SeletorDeCor
              nome="cor-da-previa"
              valor={cor}
              aoEscolher={setCor}
              padrao={demo.padrao}
              fundo="escuro"
            />
          }
        />
      )}
    </ContextoDaEscolha.Provider>
  );
}

export function useEscolha(): Contexto {
  const contexto = useContext(ContextoDaEscolha);
  if (!contexto)
    throw new Error("useEscolha precisa estar dentro de <ProvedorDaEscolha>.");
  return contexto;
}
