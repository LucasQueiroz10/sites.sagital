"use client";

import { useSearchParams } from "next/navigation";
import {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  montarTitulo,
  resolverTema,
  type PadraoDoTema,
  type Tema,
  type VariaveisDoTema,
} from "@/lib/tema";
import { classes } from "@/lib/classes";

const ContextoDoTema = createContext<Tema | null>(null);

type PropsDoTema = {
  /** Identificador do nicho, usado pelo CSS em [data-nicho="..."]. */
  nicho: string;
  /** Nome do nicho no título da aba, ex.: "Academia". */
  rotulo: string;
  padrao: PadraoDoTema;
  /** Classes extras do wrapper, como a variável da fonte do nicho. */
  className?: string;
  children: ReactNode;
};

/**
 * Envolve um demo e aplica o tema. A página é gerada estática com o padrão
 * do nicho; a personalização da URL é lida no navegador, o que permite abrir
 * qualquer link personalizado a partir do cache offline.
 */
export function TemaDoNicho({
  nicho,
  rotulo,
  padrao,
  className,
  children,
}: PropsDoTema) {
  const [tema, setTema] = useState<Tema>(() => resolverTema({}, padrao));
  const estilo: CSSProperties & VariaveisDoTema = tema.variaveis;

  return (
    <ContextoDoTema.Provider value={tema}>
      {/* useSearchParams exige Suspense numa página estática; só este leitor espera a URL. */}
      <Suspense fallback={null}>
        <LeitorDaUrl padrao={padrao} rotulo={rotulo} aoResolver={setTema} />
      </Suspense>
      <div
        data-nicho={nicho}
        style={estilo}
        className={classes(
          "flex flex-1 flex-col bg-fundo font-texto text-texto",
          className,
        )}
      >
        {children}
      </div>
    </ContextoDoTema.Provider>
  );
}

type PropsDoLeitor = {
  padrao: PadraoDoTema;
  rotulo: string;
  aoResolver: (tema: Tema) => void;
};

function LeitorDaUrl({ padrao, rotulo, aoResolver }: PropsDoLeitor) {
  const parametros = useSearchParams();
  const nome = parametros.get("nome");
  const cor = parametros.get("cor");

  useEffect(() => {
    const tema = resolverTema({ nome, cor }, padrao);
    aoResolver(tema);
    document.title = montarTitulo(tema.nome, rotulo);
  }, [nome, cor, padrao, rotulo, aoResolver]);

  return null;
}

export function useTema(): Tema {
  const tema = useContext(ContextoDoTema);
  if (!tema) throw new Error("useTema precisa estar dentro de <TemaDoNicho>.");
  return tema;
}

/** Nome do estabelecimento (personalizado ou padrão), sempre como texto puro. */
export function NomeDoEstabelecimento() {
  return <>{useTema().nome}</>;
}
