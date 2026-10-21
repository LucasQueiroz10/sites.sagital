import type { CategoriaDoCardapio } from "@/data/tipos";
import { formatarPreco } from "@/lib/formato";

const foco =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque";

/** O cardápio impresso: categorias, pontilhado até o preço e marcação vegetariana. */
export function Cardapio({
  categorias,
}: {
  categorias: CategoriaDoCardapio[];
}) {
  return (
    <div className="mx-auto max-w-3xl rounded-tema bg-white px-5 py-8 ring-1 ring-cobalto/25 ring-offset-4 ring-offset-white outline outline-cobalto/70 -outline-offset-8 sm:px-12 sm:py-12">
      <nav aria-label="Categorias do cardápio" className="mb-10">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {categorias.map((categoria) => (
            <li key={categoria.id}>
              <a
                href={`#cardapio-${categoria.id}`}
                className={`inline-flex min-h-11 items-center text-sm font-semibold tracking-wide text-cobalto uppercase underline-offset-4 hover:underline ${foco}`}
              >
                {categoria.nome}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid gap-12">
        {categorias.map((categoria) => (
          <section
            key={categoria.id}
            id={`cardapio-${categoria.id}`}
            aria-labelledby={`titulo-${categoria.id}`}
            className="scroll-mt-24"
          >
            <h3
              id={`titulo-${categoria.id}`}
              className="mb-6 flex items-center gap-4 text-3xl text-cobalto"
            >
              {categoria.nome}
              <span aria-hidden className="h-px flex-1 bg-cobalto/30" />
            </h3>
            <ul className="grid gap-5">
              {categoria.itens.map((item) => (
                <li key={item.nome}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-semibold">
                      {item.vegetariano ? (
                        <>
                          {item.nome.split(" ").slice(0, -1).join(" ")}{" "}
                          {/* A última palavra e o selo ficam juntos: o "V" nunca quebra sozinho. */}
                          <span className="whitespace-nowrap">
                            {item.nome.split(" ").at(-1)}
                            <abbr
                              title="Vegetariano"
                              className="ml-2 inline-grid size-5 translate-y-[-0.1em] place-items-center rounded-full border border-cobalto text-[0.65rem] font-bold text-cobalto no-underline"
                            >
                              V
                            </abbr>
                          </span>
                        </>
                      ) : (
                        item.nome
                      )}
                    </span>
                    <span
                      aria-hidden
                      className="min-w-6 flex-1 translate-y-[-0.3em] border-b border-dotted border-texto-suave/60"
                    />
                    <span className="font-semibold tabular-nums">
                      {formatarPreco(item.preco)}
                    </span>
                  </div>
                  {item.descricao && (
                    <p className="mt-1 max-w-[52ch] text-texto-suave">
                      {item.descricao}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-12 text-center text-sm text-texto-suave">
        <abbr title="Vegetariano" className="no-underline">
          V
        </abbr>{" "}
        = vegetariano. Preços em reais, serviço não incluso.
      </p>
    </div>
  );
}
