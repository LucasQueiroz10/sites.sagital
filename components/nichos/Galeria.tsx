import Image from "next/image";
import type { Imagem } from "@/data/tipos";
import { classes } from "@/lib/classes";

type Props = { imagens: Imagem[]; className?: string };

/** Mosaico de fotos: a primeira ocupa duas linhas no desktop. */
export function Galeria({ imagens, className }: Props) {
  return (
    <ul
      className={classes(
        "grid grid-cols-2 gap-2 sm:gap-3 md:auto-rows-[15rem] md:grid-cols-3",
        className,
      )}
    >
      {imagens.map((imagem, i) => (
        <li
          key={imagem.alt}
          className={classes(
            "relative overflow-hidden rounded-tema",
            i === 0
              ? "col-span-2 aspect-[4/3] md:col-span-1 md:row-span-2 md:aspect-auto"
              : "aspect-square md:aspect-auto",
          )}
        >
          <Image
            src={imagem.src}
            alt={imagem.alt}
            fill
            sizes={
              i === 0
                ? "(min-width: 768px) 33vw, 100vw"
                : "(min-width: 768px) 33vw, 50vw"
            }
            className="object-cover"
            placeholder="blur"
          />
        </li>
      ))}
    </ul>
  );
}
