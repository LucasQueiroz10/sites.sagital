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
import { PreviaAoVivo, type Aparelho } from "./PreviaAoVivo";

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
};

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
  const [aparelho, setAparelho] = useState<Aparelho>("celular");

  const demo = demos.find((d) => d.nicho === nicho) ?? demos[0];
  if (!demo) throw new Error("ProvedorDaEscolha precisa de ao menos um demo.");

  const nomeExibido = validarNome(nome) ?? demo.padrao.nome;
  const corEfetiva =
    validarCor((cor ?? "").replace("#", "")) ?? demo.padrao.cor;
  const link = origem
    ? montarLinkDoDemo(origem, demo.nicho, nome, cor ?? "")
    : null;

  const abrirPrevia = useCallback((outro?: Nicho) => {
    if (outro) setNicho(outro);
    // No computador a prévia abre na tela grande; no celular, na tela dele.
    setAparelho(
      window.matchMedia("(min-width: 1024px)").matches
        ? "computador"
        : "celular",
    );
    setPreviaAberta(true);
  }, []);

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
    }),
    [demos, demo, nicho, nome, cor, nomeExibido, corEfetiva, link, abrirPrevia],
  );

  return (
    <ContextoDaEscolha.Provider value={valor}>
      {children}
      <PreviaAoVivo
        aberta={previaAberta}
        aoFechar={() => setPreviaAberta(false)}
        aparelho={aparelho}
        escolherAparelho={setAparelho}
        demo={demo}
        nomeExibido={nomeExibido}
        cor={cor}
        link={link}
        escolherCor={setCor}
      />
    </ContextoDaEscolha.Provider>
  );
}

export function useEscolha(): Contexto {
  const contexto = useContext(ContextoDaEscolha);
  if (!contexto)
    throw new Error("useEscolha precisa estar dentro de <ProvedorDaEscolha>.");
  return contexto;
}
