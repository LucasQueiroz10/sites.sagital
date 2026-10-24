"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { buscaDoDemo } from "@/lib/link";
import {
  montarTitulo,
  resolverTema,
  type PadraoDoTema,
  type Tema,
  type VariaveisDoTema,
} from "@/lib/tema";
import { classes } from "@/lib/classes";
import { VoltarParaSagital } from "./VoltarParaSagital";

/** O tema e a busca (`?nome=&cor=`) que os links entre as páginas levam. */
export type TemaDoDemo = Tema & { busca: string };

const ContextoDoTema = createContext<TemaDoDemo | null>(null);

/**
 * O último tema lido em cada nicho. A troca de página remonta o demo
 * inteiro (a viagem entre páginas é por caminho); sem isto, cada página
 * nova nasceria com o nome e a cor padrão e trocaria um quadro depois.
 * Na primeira abertura está vazio, então a hidratação bate com o servidor.
 */
const ultimoTema = new Map<string, TemaDoDemo>();

type PropsDoTema = {
  /** Identificador do nicho, usado pelo CSS em [data-nicho="..."]. */
  nicho: string;
  /** Nome do nicho no título da aba, ex.: "Academia". */
  rotulo: string;
  padrao: PadraoDoTema;
  /** As páginas internas, para o título da aba dizer em qual se está. */
  paginas?: { rotulo: string; href: string }[];
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
  paginas = [],
  className,
  children,
}: PropsDoTema) {
  const [tema, setTema] = useState<TemaDoDemo>(
    () => ultimoTema.get(nicho) ?? { ...resolverTema({}, padrao), busca: "" },
  );
  const estilo: CSSProperties & VariaveisDoTema = tema.variaveis;

  return (
    <ContextoDoTema.Provider value={tema}>
      {/* useSearchParams exige Suspense numa página estática; só este leitor espera a URL. */}
      <Suspense fallback={null}>
        <LeitorDaUrl
          nicho={nicho}
          padrao={padrao}
          rotulo={rotulo}
          paginas={paginas}
          aoResolver={setTema}
        />
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
        <VoltarParaSagital acimaDaBarra />
      </div>
    </ContextoDoTema.Provider>
  );
}

type PropsDoLeitor = {
  nicho: string;
  padrao: PadraoDoTema;
  rotulo: string;
  paginas: { rotulo: string; href: string }[];
  aoResolver: (tema: TemaDoDemo) => void;
};

function LeitorDaUrl({
  nicho,
  padrao,
  rotulo,
  paginas,
  aoResolver,
}: PropsDoLeitor) {
  const parametros = useSearchParams();
  const caminho = usePathname();
  const nome = parametros.get("nome");
  const cor = parametros.get("cor");
  const pagina = paginas.find((p) => p.href === caminho)?.rotulo;

  useEffect(() => {
    const tema = {
      ...resolverTema({ nome, cor }, padrao),
      busca: buscaDoDemo(nome, cor),
    };
    ultimoTema.set(nicho, tema);
    aoResolver(tema);
    const base = montarTitulo(tema.nome, rotulo);
    const titulo = pagina ? `${pagina} | ${base}` : base;
    document.title = titulo;
    // Na troca de página, o Next escreve o título da página (com o nome
    // padrão) depois deste efeito: o título volta para o personalizado.
    const observador = new MutationObserver(() => {
      if (document.title !== titulo) document.title = titulo;
    });
    observador.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    return () => observador.disconnect();
  }, [nicho, nome, cor, padrao, rotulo, pagina, aoResolver]);

  return null;
}

export function useTema(): TemaDoDemo {
  const tema = useContext(ContextoDoTema);
  if (!tema) throw new Error("useTema precisa estar dentro de <TemaDoNicho>.");
  return tema;
}

/** Nome do estabelecimento (personalizado ou padrão), sempre como texto puro. */
export function NomeDoEstabelecimento() {
  return <>{useTema().nome}</>;
}
