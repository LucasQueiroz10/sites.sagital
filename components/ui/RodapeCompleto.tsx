import { ArrowUp, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { Rede } from "@/data/tipos";
import { classes } from "@/lib/classes";
import { Container } from "./Container";
import { IconeDeRede, REDES } from "./IconeDeRede";

type Tom = "claro" | "escuro";

/** Cores de cada tom: o claro usa os tokens do mundo; o escuro, branco com transparência. */
const CORES: Record<
  Tom,
  { forte: string; link: string; borda: string; rede: string; foco: string }
> = {
  claro: {
    forte: "text-texto",
    link: "hover:text-texto",
    borda: "border-borda",
    rede: "border border-borda text-texto hover:bg-[color-mix(in_srgb,var(--cor-texto)_6%,transparent)]",
    foco: "focus-visible:outline-destaque",
  },
  escuro: {
    forte: "text-white",
    link: "hover:text-white",
    borda: "border-white/12",
    rede: "border border-white/16 text-white hover:bg-white/10",
    foco: "focus-visible:outline-white",
  },
};

export type PerfilNoRodape = { rede: Rede; usuario: string; href?: string };

type Props = {
  /** A marca do site, já no estilo do mundo. */
  marca: ReactNode;
  /** Uma ou duas frases sobre o negócio. */
  descricao: ReactNode;
  redes?: PerfilNoRodape[];
  /** Colunas à direita (navegação, contato, endereço...), na ordem de leitura. */
  colunas: { titulo: string; conteudo: ReactNode }[];
  /** "© 2026 Nome. Todos os direitos reservados." */
  direitos: ReactNode;
  /** Linhas legais da barra de baixo: CNPJ, registro no conselho... */
  legais?: ReactNode[];
  /** Avisos que precisam de destaque (ex.: maioridade), acima da barra de baixo. */
  avisos?: ReactNode;
  /** Quem fez o site, no canto da barra de baixo. */
  assinatura?: ReactNode;
  tom?: Tom;
  /** Fundo, espaçamento de baixo e fonte do mundo. */
  className?: string;
  /** Estilo dos títulos das colunas, quando o mundo pede outro. */
  classeDoTitulo?: string;
};

/**
 * Rodapé completo, igual em estrutura em todos os sites e vestido por cada
 * mundo: marca, descrição e redes; colunas de navegação e contato; e a barra
 * de direitos, registros e "voltar ao topo". As redes abrem o site da rede,
 * porque os perfis dos negócios fictícios não existem.
 */
export function RodapeCompleto({
  marca,
  descricao,
  redes = [],
  colunas,
  direitos,
  legais = [],
  avisos,
  assinatura,
  tom = "claro",
  className,
  classeDoTitulo,
}: Props) {
  const cor = CORES[tom];

  return (
    <footer
      className={classes(
        // O respiro de baixo fica com quem usa o rodapé: cada página reserva o
        // espaço da sua barra fixa e do botão de volta à Sagital.
        "pt-14 text-[0.9375rem] leading-relaxed",
        tom === "claro" ? "text-texto-suave" : "text-white/70",
        className,
      )}
    >
      <Container largura="larga">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className={cor.forte}>{marca}</div>
            <p className="mt-3 max-w-[38ch]">{descricao}</p>
            {redes.length > 0 && (
              <ul
                aria-label="Redes sociais"
                className="mt-6 flex flex-wrap gap-2"
              >
                {redes.map(({ rede, usuario, href }) => (
                  <li key={rede}>
                    <a
                      href={href ?? REDES[rede].site}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${REDES[rede].nome} · @${usuario}`}
                      className={classes(
                        "grid size-11 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                        cor.rede,
                        cor.foco,
                      )}
                    >
                      <IconeDeRede rede={rede} />
                      <span className="sr-only">
                        {REDES[rede].nome} @{usuario} (abre em nova aba)
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className={classes(
              "grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:gap-8",
              colunas.length === 3 && "lg:grid-cols-3",
              colunas.length >= 4 && "lg:grid-cols-4",
            )}
          >
            {colunas.map((coluna) => (
              <div key={coluna.titulo} className="min-w-0">
                {/* Um <p> com papel de título: os mundos estilizam h2 pelo
                    seletor do elemento, e o rótulo da coluna é outra coisa. */}
                <p
                  role="heading"
                  aria-level={2}
                  className={classes(
                    "text-[0.8125rem] font-semibold tracking-[0.08em] uppercase",
                    cor.forte,
                    classeDoTitulo,
                  )}
                >
                  {coluna.titulo}
                </p>
                <div className="mt-4">{coluna.conteudo}</div>
              </div>
            ))}
          </div>
        </div>

        {avisos && <div className="mt-10">{avisos}</div>}

        <div
          className={classes(
            "mt-12 flex flex-col gap-4 border-t pt-6 text-sm sm:flex-row sm:items-start sm:justify-between",
            cor.borda,
          )}
        >
          <div className="grid gap-1">
            <p>{direitos}</p>
            {legais.map((linha, i) => (
              <p key={i}>{linha}</p>
            ))}
          </div>
          <div className="grid gap-2 sm:justify-items-end sm:text-right">
            {assinatura && <div>{assinatura}</div>}
            <a
              href="#topo"
              className={classes(
                "inline-flex min-h-11 items-center gap-1.5 font-medium transition-colors sm:min-h-0",
                cor.forte,
                cor.link,
              )}
            >
              Voltar ao topo
              <ArrowUp aria-hidden className="size-4" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/** Lista de links de uma coluna (navegação, páginas). */
export function LinksDoRodape({
  links,
  tom = "claro",
}: {
  links: { rotulo: string; href: string }[];
  tom?: Tom;
}) {
  return (
    <ul className="grid gap-1">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className={classes(
              "inline-flex min-h-9 items-center transition-colors",
              CORES[tom].link,
            )}
          >
            {link.rotulo}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Uma linha de contato com ícone: telefone, e-mail, endereço, horário. */
export function ItemDeContato({
  icone: Icone,
  rede,
  children,
}: {
  icone?: LucideIcon;
  /** No lugar do ícone do lucide, a marca de uma rede (ex.: WhatsApp). */
  rede?: "whatsapp";
  children: ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span aria-hidden className="mt-[3px] opacity-75">
        {rede ? (
          <IconeDeRede rede={rede} />
        ) : (
          Icone && <Icone className="size-[18px]" strokeWidth={1.75} />
        )}
      </span>
      <div className="min-w-0 break-words">{children}</div>
    </li>
  );
}

/** Classes de um link dentro de ItemDeContato, para sublinhar só no hover. */
export function classeDoLinkDeContato(tom: Tom = "claro"): string {
  return classes(
    "underline-offset-4 transition-colors hover:underline",
    CORES[tom].link,
  );
}
