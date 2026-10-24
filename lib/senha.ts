/**
 * Medidor de senha da Redoma (site premium fictício). Estima quantas
 * tentativas um ataque precisaria para descobrir a senha e quanto tempo isso
 * levaria. Roda só no navegador: a senha nunca sai da página.
 *
 * A conta é uma aproximação, no espírito do zxcvbn: cada caractere solto vale
 * log2(alfabeto) bits, mas trechos previsíveis (palavras conhecidas, mesmo com
 * 0 no lugar de o, sequências, repetições e anos) valem só o que custa
 * adivinhar o trecho inteiro.
 */

/** Um computador com placa de vídeo testando senhas vazadas (hash rápido). */
export const TENTATIVAS_POR_SEGUNDO = 1e10;

/** Palavras que todo ataque testa primeiro. Sem acento e em minúsculas. */
const CONHECIDAS = [
  "senha",
  "password",
  "pass",
  "admin",
  "root",
  "qwerty",
  "asdf",
  "zxcv",
  "abc",
  "brasil",
  "amor",
  "teamo",
  "deus",
  "jesus",
  "familia",
  "flamengo",
  "corinthians",
  "palmeiras",
  "saopaulo",
  "vasco",
  "gremio",
  "cruzeiro",
  "santos",
  "iloveyou",
  "welcome",
  "bemvindo",
  "login",
  "acesso",
  "usuario",
  "empresa",
  "segredo",
  "futebol",
  "princesa",
  "mudar",
  "trocar",
  "teste",
  "maria",
  "joao",
  "pedro",
  "lucas",
  "gabriel",
  "ana",
  "dragon",
  "monkey",
  "master",
  "redoma",
];

/** Tamanho do dicionário que o ataque percorre antes de tentar o resto. */
const BITS_DA_PALAVRA = Math.log2(20_000);

const LEET: Record<string, string> = {
  "0": "o",
  "1": "i",
  "3": "e",
  "4": "a",
  "5": "s",
  "7": "t",
  "@": "a",
  $: "s",
};

export type Aviso =
  "curta" | "um-tipo" | "palavra" | "sequencia" | "repeticao" | "ano";

export type Avaliacao = {
  bits: number;
  /** 0 (muito fraca) a 4 (muito forte). */
  nivel: 0 | 1 | 2 | 3 | 4;
  /** Tempo médio para descobrir, em segundos. */
  segundos: number;
  avisos: Aviso[];
};

/** Quantos símbolos um ataque precisa considerar, pelos tipos presentes. */
export function tamanhoDoAlfabeto(senha: string): number {
  let total = 0;
  if (/[a-z]/.test(senha)) total += 26;
  if (/[A-Z]/.test(senha)) total += 26;
  if (/[0-9]/.test(senha)) total += 10;
  if (/[!-/:-@[-`{-~ ]/.test(senha)) total += 33;
  // Acentos, emoji e outras escritas.
  if (/[^\x20-\x7e]/.test(senha)) total += 100;
  return Math.max(total, 10);
}

type Trecho = { inicio: number; fim: number; bits: number; aviso: Aviso };

/** Marca os trechos previsíveis, sem sobreposição, do mais longo ao mais curto. */
function trechosPrevisiveis(senha: string, porCaractere: number): Trecho[] {
  const minusculas = senha.toLowerCase();
  const normal = [...minusculas].map((c) => LEET[c] ?? c).join("");
  const candidatos: Trecho[] = [];

  for (const palavra of CONHECIDAS) {
    let de = normal.indexOf(palavra);
    while (de >= 0) {
      const fim = de + palavra.length;
      const original = senha.slice(de, fim);
      // Maiúsculas e trocas por número dobram, cada uma, o trabalho.
      const variacoes =
        (/[A-Z]/.test(original) ? 1 : 0) +
        (minusculas.slice(de, fim) !== palavra ? 1 : 0);
      candidatos.push({
        inicio: de,
        fim,
        bits: BITS_DA_PALAVRA + variacoes,
        aviso: "palavra",
      });
      de = normal.indexOf(palavra, de + 1);
    }
  }

  for (const ano of minusculas.matchAll(/(?:19|20)\d\d/g)) {
    candidatos.push({
      inicio: ano.index,
      fim: ano.index + 4,
      bits: Math.log2(130),
      aviso: "ano",
    });
  }

  // Sequências (abcd, 4321) e repetições (aaaa), de três ou mais.
  let i = 0;
  while (i < minusculas.length - 2) {
    const passo = minusculas.charCodeAt(i + 1) - minusculas.charCodeAt(i);
    if (Math.abs(passo) > 1) {
      i++;
      continue;
    }
    let fim = i + 2;
    while (
      fim < minusculas.length &&
      minusculas.charCodeAt(fim) - minusculas.charCodeAt(fim - 1) === passo
    ) {
      fim++;
    }
    if (fim - i >= 3) {
      candidatos.push({
        inicio: i,
        fim,
        bits: porCaractere + Math.log2(fim - i) + (passo === 0 ? 0 : 1),
        aviso: passo === 0 ? "repeticao" : "sequencia",
      });
      i = fim;
    } else {
      i++;
    }
  }

  const ocupado = new Array<boolean>(senha.length).fill(false);
  const escolhidos: Trecho[] = [];
  for (const t of candidatos.sort(
    (a, b) => b.fim - b.inicio - (a.fim - a.inicio),
  )) {
    // Só vale se o trecho previsível for mais barato que os caracteres soltos.
    if (t.bits >= (t.fim - t.inicio) * porCaractere) continue;
    if (ocupado.slice(t.inicio, t.fim).some(Boolean)) continue;
    ocupado.fill(true, t.inicio, t.fim);
    escolhidos.push(t);
  }
  return escolhidos;
}

export function avaliarSenha(senha: string): Avaliacao | null {
  if (!senha) return null;
  const caracteres = [...senha];
  const porCaractere = Math.log2(tamanhoDoAlfabeto(senha));
  // Os índices dos trechos são de UTF-16; para senhas com emoji a conta fica
  // um pouco generosa, o que não muda a escala do resultado.
  const trechos = trechosPrevisiveis(senha, porCaractere);
  const presos = trechos.reduce((soma, t) => soma + (t.fim - t.inicio), 0);
  const soltos = Math.max(caracteres.length - presos, 0);
  const bits =
    soltos * porCaractere + trechos.reduce((soma, t) => soma + t.bits, 0);

  const avisos = new Set<Aviso>();
  if (caracteres.length < 12) avisos.add("curta");
  const tipos = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter((r) =>
    r.test(senha),
  ).length;
  if (tipos === 1) avisos.add("um-tipo");
  for (const t of trechos) avisos.add(t.aviso);

  const nivel =
    bits < 30 ? 0 : bits < 45 ? 1 : bits < 60 ? 2 : bits < 80 ? 3 : 4;
  return {
    bits,
    nivel,
    // Em média, o ataque acerta na metade das tentativas.
    segundos: 2 ** bits / 2 / TENTATIVAS_POR_SEGUNDO,
    avisos: [...avisos],
  };
}

const MINUTO = 60;
const HORA = 60 * MINUTO;
const DIA = 24 * HORA;
const MES = 30 * DIA;
const ANO = 365 * DIA;

function contar(n: number, singular: string, plural: string): string {
  const inteiro = Math.max(1, Math.round(n));
  return `${inteiro.toLocaleString("pt-BR")} ${inteiro === 1 ? singular : plural}`;
}

/** "3 horas", "12 anos", "2 milhões de anos". */
export function formatarTempo(segundos: number): string {
  if (segundos < 1) return "menos de um segundo";
  if (segundos < MINUTO) return contar(segundos, "segundo", "segundos");
  if (segundos < HORA) return contar(segundos / MINUTO, "minuto", "minutos");
  if (segundos < DIA) return contar(segundos / HORA, "hora", "horas");
  if (segundos < MES) return contar(segundos / DIA, "dia", "dias");
  if (segundos < ANO) return contar(segundos / MES, "mês", "meses");
  const anos = segundos / ANO;
  if (anos < 1000) return contar(anos, "ano", "anos");
  if (anos < 1e6) {
    const mil = Math.round(anos / 1000);
    return mil >= 1000
      ? "1 milhão de anos"
      : `${mil === 1 ? "" : `${mil} `}mil anos`;
  }
  if (anos < 1e9) return `${contar(anos / 1e6, "milhão", "milhões")} de anos`;
  return "bilhões de anos";
}

const MINUSCULAS = "abcdefghijkmnpqrstuvwxyz";
const MAIUSCULAS = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const DIGITOS = "23456789";
const SIMBOLOS = "!@#$%&*?-_+=";
const GRUPOS = [MINUSCULAS, MAIUSCULAS, DIGITOS, SIMBOLOS];
const TODOS = GRUPOS.join("");

/** Um inteiro uniforme em [0, limite), sem o viés do resto da divisão. */
function sortear(limite: number, aleatorio: (n: Uint32Array) => void): number {
  const teto = Math.floor(0x1_0000_0000 / limite) * limite;
  const caixa = new Uint32Array(1);
  for (;;) {
    aleatorio(caixa);
    if (caixa[0]! < teto) return caixa[0]! % limite;
  }
}

/**
 * Senha aleatória com pelo menos uma letra minúscula, uma maiúscula, um
 * número e um símbolo, sem os caracteres que se confundem (0/O, 1/l/I).
 */
export function gerarSenha(
  tamanho = 18,
  aleatorio: (n: Uint32Array) => void = (n) => crypto.getRandomValues(n),
): string {
  const letras = GRUPOS.map((g) => g[sortear(g.length, aleatorio)]!);
  while (letras.length < tamanho) {
    letras.push(TODOS[sortear(TODOS.length, aleatorio)]!);
  }
  // Embaralha (Fisher-Yates) para os quatro garantidos não ficarem no começo.
  for (let i = letras.length - 1; i > 0; i--) {
    const j = sortear(i + 1, aleatorio);
    [letras[i], letras[j]] = [letras[j]!, letras[i]!];
  }
  return letras.join("");
}
