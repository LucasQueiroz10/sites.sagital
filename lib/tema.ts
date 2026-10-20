/**
 * Tema personalizável dos demos: valida os parâmetros da URL (`nome` e `cor`),
 * garante contraste WCAG AA e gera as variáveis CSS. Funções puras, sem DOM.
 */

/** Limite de caracteres do nome do estabelecimento. */
export const NOME_MAXIMO = 40;

/** Contraste mínimo do WCAG AA para texto normal. */
export const CONTRASTE_MINIMO = 4.5;

const PADRAO_COR = /^[0-9a-fA-F]{6}$/;

// Letras (com acentos), números, espaço e a pontuação simples aceita.
// O apóstrofo tipográfico (’) entra porque o teclado do iPhone o insere
// no lugar de ' quando o vendedor digita o nome no gerador.
const PADRAO_NOME = /^[\p{L}\p{M}0-9 &'’\-.]+$/u;
const TEM_LETRA_OU_NUMERO = /[\p{L}0-9]/u;

const PRETO = "#000000";
const BRANCO = "#ffffff";

/** Cor em hex no formato `#rrggbb`, minúsculo. */
export type CorHex = `#${string}`;

export type ParametrosDoTema = {
  nome?: string | null;
  cor?: string | null;
};

export type PadraoDoTema = {
  /** Nome fictício usado quando `nome` não vem na URL ou é inválido. */
  nome: string;
  /** Cor primária padrão do nicho. */
  cor: CorHex;
  /** Fundo da página do nicho; referência para o contraste dos destaques. */
  fundo: CorHex;
};

export type VariaveisDoTema = {
  "--cor-fundo": CorHex;
  "--cor-primaria": CorHex;
  "--cor-primaria-hover": CorHex;
  "--cor-primaria-texto": CorHex;
  "--cor-destaque": CorHex;
};

export type Tema = {
  nome: string;
  cor: CorHex;
  variaveis: VariaveisDoTema;
};

/** Aceita apenas 6 dígitos hexadecimais, sem `#`. Retorna `null` se inválida. */
export function validarCor(valor: string | null | undefined): CorHex | null {
  if (!valor || !PADRAO_COR.test(valor)) return null;
  return `#${valor.toLowerCase()}`;
}

/**
 * Remove espaços extras e aceita até 40 caracteres de letras, números,
 * espaços e `& ' - .`. Retorna `null` se inválido.
 */
export function validarNome(valor: string | null | undefined): string | null {
  if (!valor) return null;
  const nome = valor.trim().replace(/\s+/g, " ");
  if (nome.length === 0 || nome.length > NOME_MAXIMO) return null;
  if (!PADRAO_NOME.test(nome) || !TEM_LETRA_OU_NUMERO.test(nome)) return null;
  return nome;
}

type Rgb = { r: number; g: number; b: number };

function hexParaRgb(cor: CorHex): Rgb {
  const valor = Number.parseInt(cor.slice(1), 16);
  return { r: (valor >> 16) & 255, g: (valor >> 8) & 255, b: valor & 255 };
}

function rgbParaHex({ r, g, b }: Rgb): CorHex {
  const canal = (n: number) => Math.round(n).toString(16).padStart(2, "0");
  return `#${canal(r)}${canal(g)}${canal(b)}`;
}

/** Luminância relativa (WCAG 2.x), de 0 (preto) a 1 (branco). */
export function luminancia(cor: CorHex): number {
  const { r, g, b } = hexParaRgb(cor);
  const linear = (canal: number) => {
    const c = canal / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

/** Razão de contraste entre duas cores, de 1 a 21. */
export function contraste(a: CorHex, b: CorHex): number {
  const [clara, escura] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (clara + 0.05) / (escura + 0.05);
}

/** Mistura `base` com `alvo`; `peso` vai de 0 (só base) a 1 (só alvo). */
export function misturar(base: CorHex, alvo: CorHex, peso: number): CorHex {
  const a = hexParaRgb(base);
  const b = hexParaRgb(alvo);
  const p = Math.min(Math.max(peso, 0), 1);
  return rgbParaHex({
    r: a.r + (b.r - a.r) * p,
    g: a.g + (b.g - a.g) * p,
    b: a.b + (b.b - a.b) * p,
  });
}

/**
 * Preto ou branco, o que contrastar mais com `fundo`. Para qualquer cor,
 * um dos dois passa de 4.58:1, então o texto de um botão nunca fica ilegível.
 */
export function textoSobre(fundo: CorHex): CorHex {
  return contraste(fundo, PRETO) >= contraste(fundo, BRANCO) ? PRETO : BRANCO;
}

/**
 * Escurece ou clareia `cor` até atingir `minimo` de contraste com `fundo`,
 * mantendo o tom o mais próximo possível do original.
 */
export function garantirContraste(
  cor: CorHex,
  fundo: CorHex,
  minimo: number = CONTRASTE_MINIMO,
): CorHex {
  if (contraste(cor, fundo) >= minimo) return cor;
  const alvo = textoSobre(fundo);
  for (let passo = 1; passo <= 20; passo++) {
    const ajustada = misturar(cor, alvo, passo / 20);
    if (contraste(ajustada, fundo) >= minimo) return ajustada;
  }
  return alvo;
}

/** Variáveis CSS derivadas da cor primária e do fundo do nicho. */
export function variaveisDoTema(cor: CorHex, fundo: CorHex): VariaveisDoTema {
  const texto = textoSobre(cor);
  // O hover se afasta da cor do texto, então o contraste só aumenta.
  const hover = misturar(cor, texto === BRANCO ? PRETO : BRANCO, 0.14);
  return {
    "--cor-fundo": fundo,
    "--cor-primaria": cor,
    "--cor-primaria-hover": hover,
    "--cor-primaria-texto": texto,
    "--cor-destaque": garantirContraste(cor, fundo),
  };
}

/** Combina os parâmetros da URL com o padrão do nicho. Valor inválido cai no padrão. */
export function resolverTema(
  parametros: ParametrosDoTema,
  padrao: PadraoDoTema,
): Tema {
  const nome = validarNome(parametros.nome) ?? padrao.nome;
  const cor = validarCor(parametros.cor) ?? padrao.cor;
  return { nome, cor, variaveis: variaveisDoTema(cor, padrao.fundo) };
}

/** Título da aba, ex.: "Iron Gym — Academia". */
export function montarTitulo(nome: string, rotuloDoNicho: string): string {
  return `${nome} — ${rotuloDoNicho}`;
}
