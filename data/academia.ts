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
};
