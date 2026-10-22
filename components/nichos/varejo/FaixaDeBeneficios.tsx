import {
  CreditCard,
  RefreshCcw,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { DadosDoVarejo, IconeDoBeneficio } from "@/data/tipos";

const icones: Record<IconeDoBeneficio, LucideIcon> = {
  troca: RefreshCcw,
  parcelas: CreditCard,
  retirada: Store,
  entrega: Truck,
};

type Props = { beneficios: DadosDoVarejo["beneficios"] };

/**
 * As condições da loja logo abaixo do cabeçalho, como nas redes de moda: no
 * celular, pílulas cinza que deslizam; no desktop, uma pílula só com tudo.
 */
export function FaixaDeBeneficios({ beneficios }: Props) {
  return (
    <div className="mx-auto w-full max-w-7xl lg:px-6 lg:pt-4">
      <ul
        aria-label="Vantagens da loja"
        className="flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:scroll-px-6 sm:px-6 lg:min-h-12 lg:justify-around lg:gap-6 lg:overflow-visible lg:rounded-full lg:bg-superficie lg:px-8 lg:py-0"
      >
        {beneficios.map(({ texto, icone }) => {
          const Icone = icones[icone];
          return (
            <li
              key={texto}
              className="flex min-h-10 shrink-0 snap-start items-center gap-2 rounded-full bg-superficie px-4 text-sm font-semibold lg:bg-transparent lg:px-0"
            >
              <Icone aria-hidden className="size-4 shrink-0" strokeWidth={2} />
              {texto}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
