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
export function Corredores({ corredores }: { corredores: Corredor[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {corredores.map((corredor) => {
        const Icone = icones[corredor.icone];
        const cor = corredor.cor as CorHex;
        return (
          <li
            key={corredor.numero}
            className="overflow-hidden rounded-tema border border-borda bg-white"
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
    </ul>
  );
}
