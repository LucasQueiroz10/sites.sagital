import {
  Beef,
  Carrot,
  CupSoda,
  Croissant,
  Milk,
  ShoppingBasket,
  Snowflake,
  SprayCan,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { Carrossel } from "@/components/ui/Carrossel";
import type { Corredor, IconeDoCorredor } from "@/data/tipos";
import { textoSobre, type CorHex } from "@/lib/tema";

const icones: Record<IconeDoCorredor, LucideIcon> = {
  hortifruti: Carrot,
  acougue: Beef,
  padaria: Croissant,
  mercearia: ShoppingBasket,
  laticinios: Milk,
  bebidas: CupSoda,
  limpeza: SprayCan,
  congelados: Snowflake,
};

/** Os departamentos como as placas penduradas sobre os corredores da loja. */
export function Corredores({
  corredores,
  cabecalho,
}: {
  corredores: Corredor[];
  cabecalho: ReactNode;
}) {
  return (
    <Carrossel
      rotulo="Corredores da loja"
      cabecalho={cabecalho}
      classeDasSetas="rounded-full border border-borda bg-white text-texto"
    >
      {corredores.map((corredor) => {
        const Icone = icones[corredor.icone];
        const cor = corredor.cor as CorHex;
        return (
          <li
            key={corredor.numero}
            className="w-[78%] max-w-[20rem] shrink-0 snap-start overflow-hidden rounded-tema border border-borda bg-white sm:w-[20rem] lg:w-[calc((100%-3rem)/4)] lg:max-w-none"
          >
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ backgroundColor: cor, color: textoSobre(cor) }}
            >
              <span className="titulo-encarte grid size-11 shrink-0 place-items-center rounded-full border-2 border-current text-2xl font-black italic">
                <span className="sr-only">Corredor </span>
                {corredor.numero}
              </span>
              <h3 className="titulo-encarte text-2xl leading-none font-extrabold uppercase italic">
                {corredor.nome}
              </h3>
              <Icone aria-hidden className="ml-auto size-6 shrink-0" />
            </div>
            <p className="px-4 py-3 text-texto-suave">{corredor.exemplos}</p>
          </li>
        );
      })}
    </Carrossel>
  );
}
