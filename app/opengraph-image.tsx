import { ImageResponse } from "next/og";

// Prévia do link no WhatsApp e nas redes. Gerada no build, como imagem estática.
export const alt = "Sagital — Veja o site do seu negócio antes de pagar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ImagemDeCompartilhamento() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 72,
        background: "#ecebe7",
        color: "#121212",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 44,
          fontWeight: 700,
          color: "#3b2bd9",
        }}
      >
        <svg width="56" height="56" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="13"
            r="8"
            fill="none"
            stroke="#3b2bd9"
            strokeWidth="2.5"
          />
          <path
            d="M12 23V3M7.5 7.5 12 3l4.5 4.5"
            fill="none"
            stroke="#3b2bd9"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Sagital
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 86,
          fontWeight: 700,
          lineHeight: 1.04,
          letterSpacing: -2,
          maxWidth: 960,
        }}
      >
        Veja o site do seu negócio antes de pagar.
      </div>
      <div style={{ display: "flex", fontSize: 34, color: "#4a4946" }}>
        Sites para academias, mercados, restaurantes e tabacarias
      </div>
    </div>,
    size,
  );
}
