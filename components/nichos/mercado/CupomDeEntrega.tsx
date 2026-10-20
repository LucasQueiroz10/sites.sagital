import { NomeDoEstabelecimento } from "@/components/TemaDoNicho";
import type { DadosDoMercado } from "@/data/tipos";

/** As regras de entrega impressas como um cupom de caixa. */
export function CupomDeEntrega({
  entrega,
}: {
  entrega: DadosDoMercado["entrega"];
}) {
  return (
    <div className="cupom relative mx-auto w-full max-w-sm bg-white px-6 pt-7 pb-9 font-mono text-[0.95rem] text-tinta shadow-[0_10px_24px_-14px_rgb(20_20_20/0.5)]">
      <p className="text-center font-bold uppercase">
        <NomeDoEstabelecimento />
      </p>
      <p className="mt-1 text-center text-sm">Como funciona a entrega</p>
      <hr className="my-4 border-t-2 border-dashed border-tinta/50" />
      <dl className="grid gap-2">
        {entrega.linhas.map((linha) => (
          <div key={linha.item} className="flex items-baseline gap-2">
            <dt className="min-w-0">{linha.item}</dt>
            <span
              aria-hidden
              className="min-w-4 flex-1 translate-y-[-0.25em] border-b-2 border-dotted border-current opacity-40"
            />
            <dd className="shrink-0 text-right font-bold">{linha.valor}</dd>
          </div>
        ))}
      </dl>
      <hr className="my-4 border-t-2 border-dashed border-tinta/50" />
      <p>
        <span className="font-bold">Pagamento:</span> {entrega.pagamento}
      </p>
      <p className="mt-5 text-center text-sm">Obrigado pela preferência!</p>
    </div>
  );
}
