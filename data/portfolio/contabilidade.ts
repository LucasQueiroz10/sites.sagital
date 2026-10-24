import ana from "@/public/imagens/portfolio/contabilidade/ana.jpg";
import atelie from "@/public/imagens/portfolio/contabilidade/atelie.jpg";
import bia from "@/public/imagens/portfolio/contabilidade/bia.jpg";
import cozinha from "@/public/imagens/portfolio/contabilidade/cozinha.jpg";
import loja from "@/public/imagens/portfolio/contabilidade/loja.jpg";
import reuniao from "@/public/imagens/portfolio/contabilidade/reuniao.jpg";
import salao from "@/public/imagens/portfolio/contabilidade/salao.jpg";
import socia from "@/public/imagens/portfolio/contabilidade/socia.jpg";
import type { DadosDoRodape, Imagem } from "@/data/tipos";
import { enquadrar, type Atividade } from "@/lib/regimes";

// Escritório fictício. Planos e valores são ilustrativos. Fotos do Unsplash
// (licença livre), salvas localmente.

export type RelatorioDeExemplo = {
  mes: string;
  empresa: string;
  linhas: { rotulo: string; centavos: number; total?: boolean }[];
  avisos: { texto: string; emDia: boolean }[];
};

export type Plano = {
  nome: string;
  paraQuem: string;
  /** Mensalidade em centavos. */
  mensal: number;
  inclui: string[];
  destaque?: boolean;
};

// Relatório de exemplo: o imposto sai da mesma conta do simulador da página,
// para os dois nunca discordarem. Centavos.
const faturamentoDoExemplo = 4820000;
const despesasDoExemplo = 2975000;
const impostoDoExemplo = Math.round(
  (enquadrar((faturamentoDoExemplo / 100) * 12, "comercio", 0).impostoMensal ??
    0) * 100,
);

export const contabilidade = {
  nome: "Prumo Contabilidade",
  marca: "prumo",
  titulo: "Contabilidade que fala a língua do seu negócio.",
  apoio:
    "Abertura de empresa, impostos em dia e um relatório que você entende, todo mês. Para MEI, comércio e prestadores de serviço.",
  socia: {
    nome: "Renata Prado",
    funcao: "Contadora e sócia",
    imagem: {
      src: socia,
      alt: "Renata Prado, de óculos e blazer xadrez, sorrindo",
    } satisfies Imagem,
  },
  navegacao: [
    { rotulo: "Simulador", href: "#simulador" },
    { rotulo: "Serviços", href: "#servicos" },
    { rotulo: "Planos", href: "#planos" },
    { rotulo: "Contato", href: "#contato" },
  ],
  /**
   * DAS mensal do MEI no simulador, em reais: 5% do salário mínimo de INSS
   * mais R$ 1 de ICMS (comércio e indústria) ou R$ 5 de ISS (serviços).
   */
  dasMei: {
    comercio: 82.05,
    industria: 82.05,
    servicos: 86.05,
  } satisfies Record<Atividade, number>,
  atividades: [
    { valor: "comercio", rotulo: "Comércio" },
    { valor: "servicos", rotulo: "Serviços" },
    { valor: "industria", rotulo: "Indústria" },
  ] satisfies { valor: Atividade; rotulo: string }[],
  faturamento: { minimo: 2_000, maximo: 400_000, inicial: 25_000 },
  servicos: [
    {
      titulo: "Abertura de empresa",
      texto:
        "CNPJ, alvará, inscrições e o enquadramento certo desde o primeiro dia.",
    },
    {
      titulo: "Impostos e obrigações",
      texto:
        "Guias calculadas e enviadas antes do vencimento, com lembrete pelo WhatsApp.",
    },
    {
      titulo: "Folha de pagamento",
      texto:
        "Admissão, férias, 13º e rescisão de funcionários, com o eSocial em dia.",
    },
    {
      titulo: "Relatório do mês",
      texto:
        "Faturamento, despesas e lucro numa página só, explicados numa conversa rápida.",
    },
    {
      titulo: "Troca de contador",
      texto:
        "Cuidamos da transição com o escritório anterior. Você não para nada.",
    },
    {
      titulo: "Imposto de renda",
      texto:
        "Declaração dos sócios e da família, com o pró-labore e os dividendos bem planejados.",
    },
  ],
  clientes: [
    {
      tipo: "Comércio",
      imagem: {
        src: loja,
        alt: "Senhora sorrindo em sua loja de roupas, entre araras coloridas",
      },
    },
    {
      tipo: "Alimentação",
      imagem: {
        src: cozinha,
        alt: "Homem de avental consultando o celular na cozinha do seu restaurante",
      },
    },
    {
      tipo: "Beleza",
      imagem: {
        src: salao,
        alt: "Cabeleireira sorrindo no salão, fazendo um sinal de paz",
      },
    },
    {
      tipo: "Artesanato",
      imagem: {
        src: atelie,
        alt: "Artesã trabalhando numa mesa cheia de materiais no ateliê",
      },
    },
  ],
  /**
   * O mês de um cliente, dia a dia: os marcos acendem conforme a linha do
   * mês passa por eles na rolagem. O DAS do Simples vence no dia 20.
   */
  mes: [
    {
      dia: 1,
      titulo: "Notas e extratos",
      texto:
        "Você manda pelo aplicativo, ou a gente busca no banco e na prefeitura.",
    },
    {
      dia: 5,
      titulo: "Folha pronta",
      texto: "Holerites, pró-labore e as guias da folha, conferidos.",
    },
    {
      dia: 10,
      titulo: "Relatório do mês",
      texto: "Faturamento, despesas e lucro numa página só.",
    },
    {
      dia: 15,
      titulo: "Guias no WhatsApp",
      texto: "Cinco dias antes de vencer, com o valor e o código de barras.",
    },
    {
      dia: 20,
      titulo: "Impostos pagos",
      texto: "DAS e demais guias em dia. A gente confere o pagamento.",
    },
    {
      dia: 28,
      titulo: "Conversa do mês",
      texto: "Quinze minutos para dúvidas e planos, se você quiser.",
    },
  ],
  planos: [
    {
      nome: "MEI",
      paraQuem: "Para quem fatura até R$ 81 mil por ano",
      mensal: 9900,
      inclui: [
        "DAS mensal e declaração anual",
        "Emissão de notas orientada",
        "Atendimento pelo WhatsApp",
      ],
    },
    {
      nome: "Simples",
      paraQuem: "Comércio e serviços no Simples Nacional",
      mensal: 39000,
      inclui: [
        "Impostos e obrigações do mês",
        "Folha para até 3 funcionários",
        "Relatório mensal com conversa",
        "Atendimento pelo WhatsApp",
      ],
      destaque: true,
    },
    {
      nome: "Completo",
      paraQuem: "Empresas em crescimento",
      mensal: 89000,
      inclui: [
        "Tudo do Simples",
        "Folha para até 15 funcionários",
        "Planejamento tributário anual",
        "Reunião trimestral de resultados",
      ],
    },
  ] satisfies Plano[],
  equipe: [
    {
      nome: "Ana Ribeiro",
      area: "Fiscal e impostos",
      imagem: {
        src: ana,
        alt: "Ana Ribeiro, de óculos e blusa listrada, sorrindo",
      } satisfies Imagem,
    },
    {
      nome: "Beatriz Lima",
      area: "Departamento pessoal",
      imagem: {
        src: bia,
        alt: "Beatriz Lima, de cabelo cacheado e óculos, sorrindo",
      } satisfies Imagem,
    },
  ],
  imagens: {
    reuniao: {
      src: reuniao,
      alt: "Equipe reunida em volta de uma mesa clara, conversando sobre documentos",
    } satisfies Imagem,
  },
  relatorio: {
    mes: "setembro",
    empresa: "Ateliê Fio de Ouro",
    linhas: [
      { rotulo: "Faturamento", centavos: faturamentoDoExemplo },
      { rotulo: "Despesas", centavos: despesasDoExemplo },
      { rotulo: "Impostos (Simples, comércio)", centavos: impostoDoExemplo },
      {
        rotulo: "Lucro do mês",
        centavos: faturamentoDoExemplo - despesasDoExemplo - impostoDoExemplo,
        total: true,
      },
    ],
    avisos: [
      { texto: "DAS de setembro pago em 18/09", emDia: true },
      { texto: "Folha e FGTS enviados", emDia: true },
      { texto: "Férias de uma funcionária em novembro", emDia: false },
    ],
  } satisfies RelatorioDeExemplo,
  contato: {
    endereco: "Rua XV de Novembro, 640, sala 32",
    bairro: "Centro",
    horario: "Segunda a sexta, das 8h30 às 17h30",
    /** Registro no conselho: número fictício, só para mostrar onde ele entra. */
    crc: "CRC UF-000000/O-0 (registro fictício)",
  },
  rodape: {
    descricao:
      "Abertura de empresa, impostos em dia e um relatório que você entende, todo mês. Para MEI, comércio e serviços.",
    endereco: "Rua XV de Novembro, 640, sala 32",
    bairro: "Centro",
    horarios: ["Segunda a sexta: 8h30 às 17h30"],
    email: "contato@prumocontabilidade.exemplo",
    redes: ["instagram", "linkedin", "youtube"],
    legais: [
      "CRC UF-000000/O-0 (registro fictício)",
      "CNPJ 00.000.000/0001-00 (fictício)",
    ],
  } satisfies DadosDoRodape,
};
