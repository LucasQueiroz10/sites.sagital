import Image from "next/image";
import type { ReactNode } from "react";
import { Carrossel } from "@/components/ui/Carrossel";
import type { Imagem } from "@/data/tipos";
import { classes } from "@/lib/classes";

type Props = {
  imagens: Imagem[];
  cabecalho: ReactNode;
  classeDasSetas?: string;
};

/**
 * As fotos numa faixa horizontal, em formatos alternados (a primeira mais
 * larga), para a galeria ter ritmo de álbum e não de grade.
 */
export function Galeria({ imagens, cabecalho, classeDasSetas }: Props) {
  return (
    <Carrossel
      rotulo="Fotos"
      cabecalho={cabecalho}
      classeDasSetas={classeDasSetas}
      className="items-end gap-2 sm:gap-3"
    >
      {imagens.map((imagem, i) => (
        <li
          key={imagem.alt}
          className={classes(
            "relative shrink-0 snap-start overflow-hidden rounded-tema",
            i % 3 === 0
              ? "aspect-[4/3] w-[86%] sm:w-[32rem]"
              : "aspect-[4/5] w-[62%] sm:w-[20rem]",
          )}
        >
          <Image
            src={imagem.src}
            alt={imagem.alt}
            fill
            sizes={
              i % 3 === 0
                ? "(min-width: 640px) 32rem, 86vw"
                : "(min-width: 640px) 20rem, 62vw"
            }
            className="object-cover"
            placeholder="blur"
          />
        </li>
      ))}
    </Carrossel>
  );
}
