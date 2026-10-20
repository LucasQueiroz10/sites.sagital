import { create } from "qrcode";
import { classes } from "@/lib/classes";

type Props = {
  texto: string;
  /** Descrição para leitores de tela. */
  rotulo: string;
  className?: string;
};

const MARGEM = 4;

/**
 * QR code desenhado em SVG a partir da matriz de módulos: nítido em qualquer
 * tamanho, sem imagem e sem HTML injetado.
 */
export function CodigoQr({ texto, rotulo, className }: Props) {
  const { modules } = create(texto, { errorCorrectionLevel: "M" });
  const lado = modules.size + MARGEM * 2;
  let caminho = "";
  for (let linha = 0; linha < modules.size; linha++) {
    for (let coluna = 0; coluna < modules.size; coluna++) {
      if (modules.get(linha, coluna)) {
        caminho += `M${coluna + MARGEM} ${linha + MARGEM}h1v1h-1z`;
      }
    }
  }
  return (
    <svg
      role="img"
      aria-label={rotulo}
      viewBox={`0 0 ${lado} ${lado}`}
      shapeRendering="crispEdges"
      className={classes("block bg-white", className)}
    >
      <path d={caminho} fill="#111111" />
    </svg>
  );
}
