import { etapasDoSinal } from "@/data/destra";

const LARGURA = 1200;
const ALTURA = 220;
const BASE = 170;

/** Gerador pseudoaleatório com semente: o mesmo traço no servidor e no navegador. */
function sorteio(semente: number) {
  let s = semente;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const suave = (t: number) => {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
};

/**
 * O traço da seção, em três trechos que contam a mesma contração: o sinal
 * cru do músculo (ruído e um surto), o mesmo sinal limpo pelo chip (o
 * envelope) e o ângulo dos dedos fechando até a pegada.
 */
function caminho(): string {
  const aleatorio = sorteio(7);
  const pontos: string[] = [];
  const terco = LARGURA / 3;

  // Sinal cru: ruído fino e um surto no meio do trecho.
  for (let x = 0; x <= terco; x += 3) {
    const surto = suave((x - 90) / 60) * (1 - suave((x - 290) / 60));
    const amplitude = 4 + surto * 72;
    const y = BASE - 40 + (aleatorio() * 2 - 1) * amplitude;
    pontos.push(`${x.toFixed(0)},${y.toFixed(1)}`);
  }
  // Envelope: sobe, segura e desce, sem ruído.
  for (let x = terco; x <= terco * 2; x += 6) {
    const t = (x - terco) / terco;
    const corpo = suave((t - 0.12) / 0.25) * (1 - suave((t - 0.68) / 0.22));
    const y = BASE - 40 - corpo * 78;
    pontos.push(`${x.toFixed(0)},${y.toFixed(1)}`);
  }
  // Ângulo dos dedos: parte do zero e fecha até a pegada.
  for (let x = terco * 2; x <= LARGURA; x += 6) {
    const t = (x - terco * 2) / terco;
    const y = BASE - 40 + 40 - suave((t - 0.15) / 0.5) * 150;
    pontos.push(`${x.toFixed(0)},${y.toFixed(1)}`);
  }
  return `M ${pontos.join(" L ")}`;
}

const tracado = caminho();

/**
 * Do músculo ao movimento: o traço se desenha conforme a seção entra na tela
 * (CSS com animation-timeline: view(); onde não houver, aparece inteiro), e
 * cada trecho tem embaixo a sua explicação.
 */
export function Sinal() {
  return (
    <div className="dt-sinal">
      <svg
        viewBox={`0 0 ${LARGURA} ${ALTURA}`}
        className="dt-sinal-grafico"
        aria-hidden
        preserveAspectRatio="none"
      >
        {[1, 2].map((i) => (
          <line
            key={i}
            x1={(LARGURA / 3) * i}
            x2={(LARGURA / 3) * i}
            y1={0}
            y2={ALTURA}
            className="dt-sinal-divisa"
          />
        ))}
        <line
          x1={0}
          x2={LARGURA}
          y1={BASE}
          y2={BASE}
          className="dt-sinal-base"
        />
        <path d={tracado} pathLength={1} className="dt-sinal-traco" />
      </svg>
      <ol className="dt-sinal-etapas">
        {etapasDoSinal.map((e) => (
          <li key={e.titulo}>
            <h3 className="dt-h3">{e.titulo}</h3>
            <p className="mt-3 max-w-[38ch] leading-relaxed text-black/65">
              {e.texto}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
