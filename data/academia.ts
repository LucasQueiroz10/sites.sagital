import bike from "@/public/imagens/academia/bike.jpg";
import cordas from "@/public/imagens/academia/cordas.jpg";
import funcional from "@/public/imagens/academia/funcional.jpg";
import lutas from "@/public/imagens/academia/lutas.jpg";
import musculacao from "@/public/imagens/academia/musculacao.jpg";
import principal from "@/public/imagens/academia/principal.jpg";
import type { Aula, DiaDaSemana } from "@/lib/agenda";
import type { DadosDaAcademia } from "./tipos";

// Conteúdo fictício. Fotos claras do Unsplash (licença livre), salvas
// localmente; a origem de cada uma está gravada no próprio arquivo.

type AulaSemDia = Omit<Aula, "dia">;

const segQuaSex: AulaSemDia[] = [
  {
    inicio: "06:00",
    duracaoMinutos: 45,
    modalidade: "Funcional",
    local: "Sala 2",
  },
  {
    inicio: "07:00",
    duracaoMinutos: 45,
    modalidade: "Bike indoor",
    local: "Sala 1",
  },
  {
    inicio: "12:15",
    duracaoMinutos: 30,
    modalidade: "Funcional express",
    local: "Sala 2",
  },
  {
    inicio: "18:00",
    duracaoMinutos: 60,
    modalidade: "Muay thai",
    local: "Tatame",
  },
  {
    inicio: "19:00",
    duracaoMinutos: 45,
    modalidade: "Bike indoor",
    local: "Sala 1",
  },
  { inicio: "19:30", duracaoMinutos: 50, modalidade: "Cross", local: "Box" },
  {
    inicio: "20:30",
    duracaoMinutos: 40,
    modalidade: "Mobilidade",
    local: "Sala 2",
  },
];

const terQui: AulaSemDia[] = [
  { inicio: "06:30", duracaoMinutos: 50, modalidade: "Cross", local: "Box" },
  {
    inicio: "07:30",
    duracaoMinutos: 40,
    modalidade: "Mobilidade",
    local: "Sala 2",
  },
  {
    inicio: "12:15",
    duracaoMinutos: 30,
    modalidade: "Bike express",
    local: "Sala 1",
  },
  {
    inicio: "18:30",
    duracaoMinutos: 45,
    modalidade: "Funcional",
    local: "Sala 2",
  },
  { inicio: "19:00", duracaoMinutos: 60, modalidade: "Boxe", local: "Tatame" },
  { inicio: "20:00", duracaoMinutos: 50, modalidade: "Cross", local: "Box" },
];

const sabado: AulaSemDia[] = [
  { inicio: "08:30", duracaoMinutos: 60, modalidade: "Cross", local: "Box" },
  {
    inicio: "09:30",
    duracaoMinutos: 45,
    modalidade: "Bike indoor",
    local: "Sala 1",
  },
  {
    inicio: "10:30",
    duracaoMinutos: 60,
    modalidade: "Muay thai",
    local: "Tatame",
  },
];

const domingo: AulaSemDia[] = [
  {
    inicio: "09:00",
    duracaoMinutos: 40,
    modalidade: "Mobilidade",
    local: "Sala 2",
  },
];

const nosDias = (dias: DiaDaSemana[], aulas: AulaSemDia[]): Aula[] =>
  dias.flatMap((dia) => aulas.map((aula) => ({ ...aula, dia })));

export const academia: DadosDaAcademia = {
  nicho: "academia",
  rotulo: "Academia",
  padrao: {
    nome: "Academia Pulso",
    cor: "#d42a16",
    fundo: "#ffffff",
  },
  descricao:
    "Musculação, funcional, cross, bike e lutas. Faça uma aula experimental grátis.",
  slogan: "Sua primeira aula é por nossa conta.",
  destaqueDoSlogan: "por nossa conta.",
  chamada:
    "Escolha um horário da grade, chame a gente no WhatsApp e treine sem pagar nada. Sem matrícula e sem compromisso.",
  navegacao: [
    { rotulo: "Planos", href: "#planos" },
    { rotulo: "Aulas", href: "#aulas" },
    { rotulo: "Estrutura", href: "#estrutura" },
    { rotulo: "Contato", href: "#contato" },
  ],
  raiz: "/academia",
  paginas: [
    { rotulo: "Planos", href: "/academia/planos" },
    { rotulo: "Aulas", href: "/academia/aulas" },
    { rotulo: "Estrutura", href: "/academia/estrutura" },
    { rotulo: "Alunos", href: "/academia/alunos" },
    { rotulo: "Contato", href: "/academia/contato" },
  ],
  acaoPrincipal: {
    rotulo: "Agendar aula experimental",
    pedido: "Quero agendar uma aula experimental.",
  },
  diferencial: { titulo: "Estacionamento", detalhe: "próprio, na porta" },
  imagemPrincipal: {
    src: principal,
    alt: "Aluna começando um levantamento terra com o professor ao lado, num salão claro com janelões",
  },
  imagemFinal: {
    src: cordas,
    alt: "Aluno e aluna treinando com cordas navais num salão com janelões",
  },
  // O mais escolhido primeiro: no celular é o card que aparece inteiro.
  planos: [
    {
      nome: "Anual",
      precoMensal: 8990,
      cobranca: "12x no cartão",
      inclui: [
        "Musculação e todas as aulas",
        "Avaliação física a cada 3 meses",
        "1 treino com personal por mês",
        "2 convites por mês para treinar com um amigo",
      ],
      destaque: "Mais escolhido",
    },
    {
      nome: "Trimestral",
      precoMensal: 10990,
      cobranca: "R$ 329,70 a cada 3 meses",
      inclui: [
        "Musculação e todas as aulas",
        "Avaliação física na matrícula",
        "1 treino com personal por mês",
      ],
    },
    {
      nome: "Mensal",
      precoMensal: 12990,
      cobranca: "Sem fidelidade",
      inclui: ["Musculação e todas as aulas", "Avaliação física na matrícula"],
    },
  ],
  grade: [
    ...nosDias([1, 3, 5], segQuaSex),
    ...nosDias([2, 4], terQui),
    ...nosDias([6], sabado),
    ...nosDias([0], domingo),
  ],
  modalidades: [
    {
      nome: "Musculação",
      descricao:
        "Área de pesos livres com halteres até 50 kg, racks e máquinas de cabo. Ficha montada na avaliação.",
      imagem: {
        src: musculacao,
        alt: "Aluna fazendo agachamento com a barra apoiada nos ombros",
      },
      rodape: "Livre, em todo o horário de funcionamento",
    },
    {
      nome: "Funcional",
      descricao:
        "Kettlebell, peso do corpo e circuitos curtos. Turmas pequenas, com professor do começo ao fim.",
      imagem: {
        src: funcional,
        alt: "Aluna agachada segurando um kettlebell com as duas mãos",
      },
      naGrade: ["Funcional", "Funcional express"],
    },
    {
      nome: "Lutas",
      descricao:
        "Muay thai e boxe no tatame, do básico à luva. Equipamento de treino emprestado nas primeiras aulas.",
      imagem: {
        src: lutas,
        alt: "Aluno de luvas treinando socos na manopla do professor",
      },
      naGrade: ["Muay thai", "Boxe"],
    },
    {
      nome: "Cross e bike",
      descricao:
        "Condicionamento em grupo: cordas, anilhas e sprints no box, e bike indoor com música alta.",
      imagem: {
        src: bike,
        alt: "Turma pedalando numa aula de bike indoor",
      },
      naGrade: ["Cross", "Bike indoor", "Bike express"],
    },
  ],
  depoimentos: [
    {
      texto:
        "Entrei para emagrecer e fiquei pelo pessoal das 6h. Em três meses, não faltei em nenhuma segunda.",
      autoria: "Aluna do funcional das 6h",
    },
    {
      texto:
        "Tem equipamento de sobra. Nunca precisei esperar aparelho, nem no horário de pico.",
      autoria: "Aluno de musculação há 2 anos",
    },
    {
      texto:
        "Fiz a aula experimental de muay thai achando que ia desistir. Já são oito meses de treino.",
      autoria: "Aluna de muay thai",
    },
  ],
  expediente: [
    { dias: [1, 2, 3, 4, 5], abre: "05:30", fecha: "23:00" },
    { dias: [6], abre: "08:00", fecha: "14:00" },
    { dias: [0], abre: "08:00", fecha: "12:00" },
  ],
  endereco: {
    logradouro: "Av. das Palmeiras, 1480",
    bairro: "Centro",
    referencia: "Em frente à praça, com estacionamento próprio",
  },
  redes: ["instagram", "tiktok", "youtube", "facebook"],
};

// ---------- páginas internas ----------

/** Os planos lado a lado, linha por linha (página /academia/planos). */
export const comparacaoDosPlanos: { linha: string; valores: string[] }[] = [
  {
    linha: "Musculação e aulas coletivas",
    valores: ["Todas", "Todas", "Todas"],
  },
  {
    linha: "Avaliação física",
    valores: ["A cada 3 meses", "Na matrícula", "Na matrícula"],
  },
  {
    linha: "Treino com personal",
    valores: ["1 por mês", "1 por mês", "Avulso, R$ 70"],
  },
  { linha: "Convites para um amigo", valores: ["2 por mês", "Não", "Não"] },
  { linha: "Fidelidade", valores: ["12 meses", "3 meses", "Nenhuma"] },
  {
    linha: "Congelar o plano",
    valores: ["Até 60 dias", "Até 15 dias", "Não"],
  },
];

/** Da experimental ao primeiro treino com ficha (página /academia/planos). */
export const passosDaMatricula = [
  {
    titulo: "Aula experimental",
    texto:
      "Escolha um horário da grade e treine sem pagar. O professor acompanha do aquecimento ao fim.",
  },
  {
    titulo: "Avaliação física",
    texto:
      "Peso, medidas, mobilidade e o seu objetivo, numa conversa de 30 minutos com o professor.",
  },
  {
    titulo: "Ficha no celular",
    texto:
      "O treino montado para você chega pelo WhatsApp e é revisto a cada avaliação.",
  },
];

export const perguntasDosPlanos = [
  {
    pergunta: "A aula experimental é grátis mesmo?",
    resposta:
      "Sim. Uma aula de qualquer modalidade, sem cadastro de cartão e sem compromisso. É só escolher o horário e mandar uma mensagem.",
  },
  {
    pergunta: "Tem taxa de matrícula?",
    resposta:
      "Não. Você paga só o plano escolhido, a partir do dia em que começar a treinar.",
  },
  {
    pergunta: "Posso trocar de plano depois?",
    resposta:
      "Pode subir de plano a qualquer momento, e a diferença é calculada pelos dias que faltam. Para descer, a troca vale no fim do período contratado.",
  },
  {
    pergunta: "E se eu precisar parar por um tempo?",
    resposta:
      "Os planos Anual e Trimestral podem ser congelados por viagem ou motivo de saúde, sem custo, pelo prazo de cada plano.",
  },
  {
    pergunta: "Quais formas de pagamento vocês aceitam?",
    resposta:
      "Cartão de crédito parcelado, débito automático e Pix. O plano Mensal também pode ser pago na recepção.",
  },
];

/** O que levar na primeira aula (página /academia/aulas). */
export const paraAPrimeiraAula = [
  "Roupa leve e tênis fechado",
  "Uma garrafa de água",
  "Toalha de rosto",
  "Chegar 10 minutos antes",
];

/** A estrutura em números (página /academia/estrutura). */
export const estruturaEmNumeros = [
  { valor: 1200, sufixo: " m²", rotulo: "de salão, com janelões" },
  { valor: 68, sufixo: "", rotulo: "aparelhos e estações" },
  { valor: 4, sufixo: "", rotulo: "salas de aula coletiva" },
  { valor: 40, sufixo: " vagas", rotulo: "de estacionamento" },
];

export const comodidades = [
  "Vestiários com armário e chuveiro quente",
  "Estacionamento próprio, na porta",
  "Ar-condicionado no salão e nas salas",
  "Bebedouros com água gelada",
  "Wi-fi aberto para os alunos",
  "Bicicletário coberto",
];

/** Mais vozes da página /academia/alunos. */
export const maisDepoimentos = [
  {
    texto:
      "Comecei com 58 anos e medo de me machucar. A avaliação mudou tudo: hoje subo escada sem dor no joelho.",
    autoria: "Aluno de musculação, 61 anos",
  },
  {
    texto:
      "A bike das 19h é o melhor horário do meu dia. A música, a turma e o professor que lembra o nome de todo mundo.",
    autoria: "Aluna de bike indoor",
  },
  {
    texto:
      "Treino no almoço. A aula express de 30 minutos cabe certinho e eu volto para o trabalho a tempo.",
    autoria: "Aluno do funcional express",
  },
];

/** A frase de destaque da página de alunos, que acende ao rolar. */
export const fraseDosAlunos =
  "Aqui ninguém treina sozinho: o professor sabe o seu nome, a turma sente a sua falta e a ficha muda junto com você.";

/**
 * Movimento típico do salão por hora (0 a 100), das 5h às 22h, para a
 * página de contato mostrar os horários mais tranquilos.
 */
export const movimentoPorHora: { hora: number; nivel: number }[] = [
  { hora: 5, nivel: 18 },
  { hora: 6, nivel: 62 },
  { hora: 7, nivel: 74 },
  { hora: 8, nivel: 48 },
  { hora: 9, nivel: 30 },
  { hora: 10, nivel: 22 },
  { hora: 11, nivel: 28 },
  { hora: 12, nivel: 56 },
  { hora: 13, nivel: 44 },
  { hora: 14, nivel: 20 },
  { hora: 15, nivel: 18 },
  { hora: 16, nivel: 26 },
  { hora: 17, nivel: 58 },
  { hora: 18, nivel: 88 },
  { hora: 19, nivel: 96 },
  { hora: 20, nivel: 78 },
  { hora: 21, nivel: 46 },
  { hora: 22, nivel: 20 },
];

export const comoChegarNaAcademia = [
  {
    titulo: "De carro",
    texto:
      "Estacionamento próprio com 40 vagas, entrada pela Av. das Palmeiras.",
  },
  {
    titulo: "De ônibus",
    texto: "Ponto em frente à praça, linhas 210 e 312, a 50 metros da porta.",
  },
  {
    titulo: "De bicicleta",
    texto: "Bicicletário coberto ao lado da recepção, com cadeado emprestado.",
  },
];

export const perguntasDoContato = [
  {
    pergunta: "Abre em feriado?",
    resposta:
      "Na maioria dos feriados, sim, no horário de sábado. Os horários de cada feriado saem no Instagram com uma semana de antecedência.",
  },
  {
    pergunta: "Preciso marcar para treinar musculação?",
    resposta:
      "Não. A musculação é livre em todo o horário de funcionamento. Só as aulas coletivas têm vagas por turma.",
  },
  {
    pergunta: "Posso visitar antes de decidir?",
    resposta:
      "Claro. Passe na recepção em qualquer horário para conhecer o espaço, ou agende a aula experimental para treinar de verdade.",
  },
];
