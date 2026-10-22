import { ImageResponse } from "next/og";

// Prévia do link no WhatsApp e nas redes. Gerada no build, como imagem estática,
// nas cores do Sagital Design System.
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
        background: "#ffffff",
        color: "#0b0f1e",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 48,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        Sagital
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 92,
          fontWeight: 800,
          lineHeight: 1.02,
          letterSpacing: -3.5,
          maxWidth: 1000,
        }}
      >
        <span>Veja o site do seu negócio</span>
        <span style={{ color: "#1f48c2" }}>antes de pagar.</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 32,
          color: "#5b6478",
        }}
      >
        <span>Sites para academias, lojas, restaurantes e tabacarias</span>
        <span
          style={{
            display: "flex",
            width: 160,
            height: 12,
            borderRadius: 999,
            background: "linear-gradient(90deg, #1381c0 0%, #1f48c2 100%)",
          }}
        />
      </div>
    </div>,
    size,
  );
}
