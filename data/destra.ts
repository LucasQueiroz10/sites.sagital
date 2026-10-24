/**
 * Destra: empresa fictícia de próteses biônicas de mão, quinto site premium.
 * A abertura vem de um modelo em inglês (uma marca de "neural kinetics" com
 * o vídeo de uma mão robótica sobre fundo branco); o resto do site foi
 * escrito a partir dele. Números, pessoas, prêmios e endereço são de exemplo.
 *
 * Por ser um aparelho de saúde, o site não promete resultado nem mostra
 * preço: o valor sai depois da avaliação, e a equipe ajuda com o pedido ao
 * plano de saúde.
 */

import type { Pose } from "@/lib/mao";
import type { DadosDoRodape } from "./tipos";

export const nome = "Destra";

export const navegacao = [
  { rotulo: "Pegadas", href: "#pegadas" },
  { rotulo: "Como funciona", href: "#como-funciona" },
  { rotulo: "Monte a sua", href: "#monte" },
  { rotulo: "Jornada", href: "#jornada" },
  { rotulo: "Avaliação", href: "#avaliacao" },
] as const;

/** O vídeo da abertura e o quadro que aparece enquanto ele carrega. */
export const video = {
  src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4",
  quadro: "/imagens/premium/destra/quadro.jpg",
  descricao:
    "Mão biônica preta sobre fundo branco abrindo e fechando os dedos, um de cada vez",
} as const;

export type IdDaPegada =
  "aberta" | "cilindrica" | "pinca" | "tripe" | "chave" | "apontar" | "gancho";

export type Pegada = {
  id: IdDaPegada;
  nome: string;
  /** Para que serve, no dia a dia. */
  uso: string;
  /** Exemplos curtos que aparecem em fichas. */
  exemplos: string[];
  /** Força da pegada, em newtons. */
  forca: number;
  /** O gesto que chama a pegada no músculo. */
  gesto: string;
  pose: Pose;
};

/**
 * As sete pegadas da mão. Os ângulos estão em graus: as três articulações de
 * cada dedo (indicador, médio, anelar, mínimo) e o giro e as dobras do
 * polegar (lib/mao.ts).
 */
export const pegadas: Pegada[] = [
  {
    id: "aberta",
    nome: "Aberta",
    uso: "A mão em repouso, pronta para a próxima pegada.",
    exemplos: ["Cumprimentar", "Apoiar a mão", "Receber um objeto"],
    forca: 0,
    gesto: "Abrir o punho",
    pose: {
      dedos: [
        [6, 6, 4],
        [4, 5, 3],
        [6, 6, 4],
        [8, 8, 5],
      ],
      polegar: { giro: -38, dobras: [0, 6, 6] },
    },
  },
  {
    id: "cilindrica",
    nome: "Cilíndrica",
    uso: "Todos os dedos fecham em volta, com o polegar travando por cima.",
    exemplos: ["Copo", "Garrafa", "Cabo de vassoura"],
    forca: 110,
    gesto: "Fechar o punho",
    pose: {
      dedos: [
        [62, 72, 40],
        [62, 74, 40],
        [64, 74, 40],
        [66, 76, 40],
      ],
      polegar: { giro: 58, dobras: [22, 30, 20] },
    },
  },
  {
    id: "pinca",
    nome: "Pinça",
    uso: "Ponta do indicador contra a ponta do polegar, para o que é pequeno.",
    exemplos: ["Moeda", "Comprimido", "Botão da camisa"],
    forca: 32,
    gesto: "Dois toques curtos",
    pose: {
      dedos: [
        [50, 60, 30],
        [14, 14, 8],
        [18, 18, 10],
        [22, 22, 12],
      ],
      polegar: { giro: 9, dobras: [6, 8, 6] },
    },
  },
  {
    id: "tripe",
    nome: "Tripé",
    uso: "Polegar, indicador e médio juntos, firmes e precisos.",
    exemplos: ["Caneta", "Garfo", "Pincel"],
    forca: 45,
    gesto: "Fechar e segurar meio segundo",
    pose: {
      dedos: [
        [50, 60, 30],
        [50, 60, 30],
        [72, 84, 42],
        [74, 86, 42],
      ],
      polegar: { giro: 17, dobras: [2, 4, 2] },
    },
  },
  {
    id: "chave",
    nome: "Chave",
    uso: "Dedos fechados e o polegar apertando a lateral do indicador.",
    exemplos: ["Chave", "Cartão", "Prato pela borda"],
    forca: 60,
    gesto: "Abrir e fechar duas vezes",
    pose: {
      dedos: [
        [74, 84, 34],
        [76, 86, 34],
        [78, 86, 34],
        [80, 88, 34],
      ],
      polegar: { giro: 12, dobras: [10, 12, 8] },
    },
  },
  {
    id: "apontar",
    nome: "Apontar",
    uso: "Só o indicador esticado, os outros recolhidos.",
    exemplos: ["Teclado", "Tela do celular", "Botão do elevador"],
    forca: 0,
    gesto: "Abrir rápido e soltar",
    pose: {
      dedos: [
        [4, 4, 2],
        [76, 86, 42],
        [78, 86, 42],
        [80, 88, 42],
      ],
      polegar: { giro: 46, dobras: [24, 32, 20] },
    },
  },
  {
    id: "gancho",
    nome: "Gancho",
    uso: "Dedos dobrados no meio, travados, para carregar peso sem cansar.",
    exemplos: ["Sacola", "Mala", "Balde"],
    forca: 220,
    gesto: "Fechar e segurar um segundo",
    pose: {
      dedos: [
        [12, 92, 64],
        [12, 92, 64],
        [12, 92, 64],
        [12, 92, 64],
      ],
      polegar: { giro: -30, dobras: [0, 4, 4] },
    },
  },
];

/** Do músculo ao movimento: as três partes da seção "Como funciona". */
export const etapasDoSinal = [
  {
    titulo: "O músculo fala",
    texto:
      "Dois sensores dentro do encaixe leem a eletricidade que os músculos do braço ainda fazem quando você pensa em mexer a mão. Não precisa de cirurgia.",
  },
  {
    titulo: "A mão entende",
    texto:
      "Um chip na palma separa o sinal do ruído e reconhece o gesto em menos de um décimo de segundo. Com o uso, ele aprende o seu jeito de contrair.",
  },
  {
    titulo: "Os dedos respondem",
    texto:
      "Cinco motores, um em cada dedo, fecham na pegada escolhida e param sozinhos quando sentem o objeto, para não esmagar um copo de plástico.",
  },
] as const;

/** A ficha técnica: quatro números grandes e o resto em lista. */
export const fichaEmDestaque = [
  {
    valor: 460,
    sufixo: " g",
    legenda: "o peso da mão, menos que uma garrafa de água cheia",
  },
  {
    valor: 18,
    sufixo: " h",
    legenda: "de bateria, carregando à noite no suporte magnético",
  },
  {
    valor: 220,
    sufixo: " N",
    legenda: "de força no gancho, o bastante para uma mala de 20 kg",
  },
  {
    valor: 7,
    sufixo: "",
    legenda: "pegadas, trocadas por gesto ou pelo aplicativo",
  },
] as const;

export const fichaCompleta = [
  { item: "Tamanhos", valor: "P, M e G, ou sob medida" },
  { item: "Punho", valor: "Gira 360°, com trava em quatro posições" },
  { item: "Água", valor: "Resiste a respingos e chuva (IP54)" },
  { item: "Carga", valor: "De 0 a 100% em 2 horas e meia" },
  { item: "Aplicativo", valor: "Android e iPhone, ajuste remoto pela equipe" },
  { item: "Garantia", valor: "3 anos na mão, 1 ano no encaixe" },
] as const;

export type IdDoNivel = "parcial" | "punho" | "antebraco";
export type IdDoAcabamento = "grafite" | "nevoa" | "titanio";

/** Até onde vai a amputação: muda o encaixe e o que a mão leva junto. */
export const niveis: { id: IdDoNivel; nome: string; encaixe: string }[] = [
  {
    id: "parcial",
    nome: "Parte da mão",
    encaixe: "Dedos biônicos avulsos, presos numa luva de silicone sob medida.",
  },
  {
    id: "punho",
    nome: "No punho",
    encaixe:
      "Encaixe curto de fibra de carbono, com o punho giratório embutido.",
  },
  {
    id: "antebraco",
    nome: "No antebraço",
    encaixe:
      "Encaixe de carbono até o cotovelo, com os sensores no lugar do músculo mais forte.",
  },
];

/** As cores da mão: preenchimento das falanges, das articulações e da palma. */
export const acabamentos: {
  id: IdDoAcabamento;
  nome: string;
  descricao: string;
  falange: string;
  falangeDeFrente: string;
  articulacao: string;
  palma: string;
}[] = [
  {
    id: "grafite",
    nome: "Grafite",
    descricao: "Preto fosco, a mão do vídeo.",
    falange: "#141414",
    falangeDeFrente: "#3a3a3a",
    articulacao: "#8a8a8a",
    palma: "#0c0c0c",
  },
  {
    id: "nevoa",
    nome: "Névoa",
    descricao: "Branco acetinado, discreto na pele clara.",
    falange: "#e9e9eb",
    falangeDeFrente: "#ffffff",
    articulacao: "#9a9aa0",
    palma: "#dedee2",
  },
  {
    id: "titanio",
    nome: "Titânio",
    descricao: "Cinza metálico, combina com tudo.",
    falange: "#7d7f84",
    falangeDeFrente: "#a4a6ab",
    articulacao: "#3b3c3f",
    palma: "#6c6e73",
  },
];

/** Da primeira conversa ao dia a dia: a jornada com a Destra. */
export const jornada = [
  {
    prazo: "1 hora",
    titulo: "Avaliação",
    texto:
      "Uma terapeuta ocupacional mede o braço, testa os sinais dos músculos e entende o que você quer voltar a fazer. É gratuita e sem compromisso.",
  },
  {
    prazo: "3 semanas",
    titulo: "Encaixe sob medida",
    texto:
      "Moldamos o encaixe no seu braço, testamos uma versão transparente e só então fazemos a definitiva em carbono.",
  },
  {
    prazo: "6 sessões",
    titulo: "Treino",
    texto:
      "Você aprende os gestos de cada pegada com a terapeuta, primeiro na clínica e depois em casa, com exercícios no aplicativo.",
  },
  {
    prazo: "Sempre",
    titulo: "Acompanhamento",
    texto:
      "A equipe ajusta a mão pelo aplicativo, sem você sair de casa, e revisa tudo pessoalmente uma vez por ano.",
  },
] as const;

/** Relatos de quem usa (pessoas fictícias). */
export const relatos: {
  texto: string;
  nome: string;
  quem: string;
  pegada: IdDaPegada;
}[] = [
  {
    texto:
      "Voltei a confeitar. A pinça segura o bico de confeiteiro com a força certa, e eu nem penso mais no gesto.",
    nome: "Marta Quintela",
    quem: "Confeiteira, usa a mão no punho desde 2024",
    pegada: "pinca",
  },
  {
    texto:
      "O gancho aguenta as sacolas da feira inteira. O que eu mais gosto é que ele trava e o braço descansa.",
    nome: "Osvaldo Brites",
    quem: "Marceneiro aposentado, mão no antebraço",
    pegada: "gancho",
  },
  {
    texto:
      "Digito com o indicador e seguro a caneta no tripé. Na faculdade, a maioria nem percebe.",
    nome: "Iara Mendonça",
    quem: "Estudante de direito, nasceu sem a mão esquerda",
    pegada: "tripe",
  },
];

export const perguntas = [
  {
    pergunta: "Preciso fazer cirurgia?",
    resposta:
      "Não. Os sensores ficam dentro do encaixe, encostados na pele, e leem os músculos por fora. A mão se coloca e se tira como uma luva firme.",
  },
  {
    pergunta: "Quanto custa?",
    resposta:
      "O valor depende do nível da amputação e do encaixe, por isso sai depois da avaliação, que é gratuita. Ajudamos a montar o pedido ao plano de saúde e o processo pelo SUS quando for o caso.",
  },
  {
    pergunta: "Serve para quem nasceu sem a mão?",
    resposta:
      "Na maioria dos casos, sim. Os músculos do antebraço costumam estar lá e respondem bem ao treino. A avaliação confirma.",
  },
  {
    pergunta: "Posso molhar?",
    resposta:
      "Respingos, chuva e lavar a louça, sim. Mergulhar, não: para piscina e mar existe uma capa de silicone vedada.",
  },
  {
    pergunta: "E se quebrar?",
    resposta:
      "A garantia cobre três anos. Enquanto a sua vai para a oficina, você recebe uma mão reserva pelos Correios em até dois dias úteis.",
  },
] as const;

/** Como a pessoa ficou sabendo da avaliação: vai na mensagem. */
export const situacoes = [
  "Tenho pedido médico",
  "Já uso outra prótese",
  "Vou pelo plano de saúde",
  "Quero só conhecer",
] as const;

export const rodape: DadosDoRodape = {
  descricao:
    "Mãos biônicas sob medida, com sete pegadas, sensores musculares e acompanhamento por toda a vida.",
  endereco: "Rua Episcopal, 1480",
  bairro: "Centro, São Carlos",
  horarios: [
    "Avaliações de segunda a sexta, das 8h às 18h",
    "Suporte pelo aplicativo todos os dias",
  ],
  email: "ola@destra.exemplo",
  redes: ["instagram", "youtube", "linkedin"],
  legais: [
    "CNPJ 00.000.000/0001-00 (fictício)",
    "Registro Anvisa 00000000000 (fictício)",
  ],
};
