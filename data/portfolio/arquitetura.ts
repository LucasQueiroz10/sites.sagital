import apartamentoGrafite from "@/public/imagens/portfolio/arquitetura/apartamento-grafite.jpg";
import casaEmpena from "@/public/imagens/portfolio/arquitetura/casa-empena.jpg";
import casaEncosta from "@/public/imagens/portfolio/arquitetura/casa-encosta.jpg";
import casaIpe from "@/public/imagens/portfolio/arquitetura/casa-ipe.jpg";
import casaPatio from "@/public/imagens/portfolio/arquitetura/casa-patio.jpg";
import cozinhaCorredor from "@/public/imagens/portfolio/arquitetura/cozinha-corredor.jpg";
import cozinhaFreijo from "@/public/imagens/portfolio/arquitetura/cozinha-freijo.jpg";
import edificioTaipa from "@/public/imagens/portfolio/arquitetura/edificio-taipa.jpg";
import escada from "@/public/imagens/portfolio/arquitetura/escada.jpg";
import escritorioJardim from "@/public/imagens/portfolio/arquitetura/escritorio-jardim.jpg";
import escritorioVidro from "@/public/imagens/portfolio/arquitetura/escritorio-vidro.jpg";
import pranchas from "@/public/imagens/portfolio/arquitetura/pranchas.jpg";
import salaExecutiva from "@/public/imagens/portfolio/arquitetura/sala-executiva.jpg";
import salaLinho from "@/public/imagens/portfolio/arquitetura/sala-linho.jpg";
import type { DadosDoRodape, Imagem } from "@/data/tipos";

// Escritório e projetos fictícios. As fotos são do Unsplash (licença
// livre), salvas localmente, e ilustram projetos que não existem.

export type Categoria = "residencial" | "interiores" | "corporativo";

export type Projeto = {
  id: string;
  nome: string;
  categoria: Categoria;
  local: string;
  ano: number;
  area: string;
  resumo: string;
  ficha: { rotulo: string; valor: string }[];
  imagens: [Imagem, ...Imagem[]];
  /** Formato da capa no mosaico. */
  formato: "retrato" | "paisagem";
};

export const categorias: { valor: Categoria | "todos"; rotulo: string }[] = [
  { valor: "todos", rotulo: "Todos" },
  { valor: "residencial", rotulo: "Residencial" },
  { valor: "interiores", rotulo: "Interiores" },
  { valor: "corporativo", rotulo: "Corporativo" },
];

export const arquitetura = {
  nome: "Atelier Vão Arquitetura",
  marca: "atelier vão",
  titulo: "Arquitetura que começa pelo jeito como você vive.",
  apoio:
    "Casas, interiores e escritórios projetados do primeiro croqui à última luminária, com obra acompanhada de perto.",
  capa: {
    src: casaIpe,
    alt: "Casa de dois pavimentos com fachada de concreto e painéis de madeira, entre árvores de outono",
  } satisfies Imagem,
  navegacao: [
    { rotulo: "Projetos", href: "#projetos" },
    { rotulo: "Processo", href: "#processo" },
    { rotulo: "Estúdio", href: "#estudio" },
    { rotulo: "Contato", href: "#contato" },
  ],
  numeros: [
    { valor: "62", rotulo: "projetos entregues" },
    { valor: "14", rotulo: "anos de estúdio" },
    { valor: "9", rotulo: "pessoas na equipe" },
  ],
  projetos: [
    {
      id: "casa-ipe",
      nome: "Casa Ipê",
      categoria: "residencial",
      local: "Alto da Serra",
      ano: 2024,
      area: "320 m²",
      resumo:
        "Dois volumes de concreto aparente unidos por painéis de madeira que abrem a casa para o jardim e filtram o sol da tarde.",
      ficha: [
        { rotulo: "Tipo", valor: "Casa unifamiliar" },
        { rotulo: "Área", valor: "320 m²" },
        { rotulo: "Obra", valor: "14 meses" },
        { rotulo: "Materiais", valor: "Concreto, cumaru, vidro" },
      ],
      imagens: [
        {
          src: casaIpe,
          alt: "Fachada da Casa Ipê com painéis de madeira e árvores floridas",
        },
        {
          src: escada,
          alt: "Escada de concreto aparente com sombra de galhos",
        },
      ],
      formato: "paisagem",
    },
    {
      id: "sala-linho",
      nome: "Apartamento Linho",
      categoria: "interiores",
      local: "Centro",
      ano: 2025,
      area: "140 m²",
      resumo:
        "Reforma de um apartamento dos anos 70 em tons de areia, com luz natural levada até o fundo da sala.",
      ficha: [
        { rotulo: "Tipo", valor: "Reforma de interiores" },
        { rotulo: "Área", valor: "140 m²" },
        { rotulo: "Obra", valor: "5 meses" },
        { rotulo: "Materiais", valor: "Linho, carvalho, cal" },
      ],
      imagens: [
        {
          src: salaLinho,
          alt: "Sala em tons de areia com sofá curvo, mesas baixas e uma grande janela",
        },
      ],
      formato: "retrato",
    },
    {
      id: "casa-patio",
      nome: "Casa Pátio",
      categoria: "residencial",
      local: "Jardim Europa",
      ano: 2023,
      area: "410 m²",
      resumo:
        "Uma casa térrea organizada em volta da piscina, com a fachada fechada para a rua e aberta por inteiro para dentro.",
      ficha: [
        { rotulo: "Tipo", valor: "Casa unifamiliar" },
        { rotulo: "Área", valor: "410 m²" },
        { rotulo: "Obra", valor: "16 meses" },
        { rotulo: "Materiais", valor: "Reboco branco, vidro, pedra" },
      ],
      imagens: [
        {
          src: casaPatio,
          alt: "Casa térrea branca com piscina e jardim de arbustos podados",
        },
      ],
      formato: "retrato",
    },
    {
      id: "escritorio-vidro",
      nome: "Sede Prisma",
      categoria: "corporativo",
      local: "Distrito empresarial",
      ano: 2025,
      area: "860 m²",
      resumo:
        "Salas de reunião em vidro no centro da planta, para a luz atravessar o andar e a equipe trabalhar à vista.",
      ficha: [
        { rotulo: "Tipo", valor: "Escritório corporativo" },
        { rotulo: "Área", valor: "860 m²" },
        { rotulo: "Obra", valor: "7 meses" },
        { rotulo: "Materiais", valor: "Vidro, aço, cimento queimado" },
      ],
      imagens: [
        {
          src: escritorioVidro,
          alt: "Andar de escritório com salas de reunião em vidro e piso de cimento",
        },
        {
          src: salaExecutiva,
          alt: "Sala executiva com mesa branca e poltronas cinza",
        },
      ],
      formato: "paisagem",
    },
    {
      id: "cozinha-freijo",
      nome: "Cozinha Freijó",
      categoria: "interiores",
      local: "Vila Mariana",
      ano: 2024,
      area: "36 m²",
      resumo:
        "Ilha em freijó e marcenaria escura do piso ao teto, com a despensa escondida atrás dos painéis.",
      ficha: [
        { rotulo: "Tipo", valor: "Cozinha e área social" },
        { rotulo: "Área", valor: "36 m²" },
        { rotulo: "Obra", valor: "3 meses" },
        { rotulo: "Materiais", valor: "Freijó, laca preta, quartzo" },
      ],
      imagens: [
        {
          src: cozinhaFreijo,
          alt: "Cozinha com ilha de madeira, banquetas e armários escuros",
        },
        {
          src: cozinhaCorredor,
          alt: "Cozinha em corredor com marcenaria clara e porta para o jardim",
        },
      ],
      formato: "paisagem",
    },
    {
      id: "edificio-taipa",
      nome: "Edifício Taipa",
      categoria: "residencial",
      local: "Pinheiros",
      ano: 2022,
      area: "1.900 m²",
      resumo:
        "Doze apartamentos com venezianas de madeira que dão ritmo à fachada e privacidade a cada varanda.",
      ficha: [
        { rotulo: "Tipo", valor: "Edifício residencial" },
        { rotulo: "Área", valor: "1.900 m²" },
        { rotulo: "Obra", valor: "26 meses" },
        { rotulo: "Materiais", valor: "Concreto, ipê, alumínio" },
      ],
      imagens: [
        {
          src: edificioTaipa,
          alt: "Fachada de concreto com janelas de venezianas de madeira contra o céu",
        },
      ],
      formato: "retrato",
    },
    {
      id: "apartamento-grafite",
      nome: "Apartamento Grafite",
      categoria: "interiores",
      local: "Moema",
      ano: 2025,
      area: "98 m²",
      resumo:
        "Sala em cinza profundo e tecidos macios, com a cortina de piso a teto como a única moldura da janela.",
      ficha: [
        { rotulo: "Tipo", valor: "Interiores" },
        { rotulo: "Área", valor: "98 m²" },
        { rotulo: "Obra", valor: "4 meses" },
        { rotulo: "Materiais", valor: "Bouclé, nogueira, pedra" },
      ],
      imagens: [
        {
          src: apartamentoGrafite,
          alt: "Sala com sofá cinza, mesa de centro escura e cortinas até o chão",
        },
      ],
      formato: "retrato",
    },
    {
      id: "escritorio-jardim",
      nome: "Estúdio Jardim",
      categoria: "corporativo",
      local: "Vila Madalena",
      ano: 2023,
      area: "220 m²",
      resumo:
        "Escritório para uma agência pequena, com bancada contínua junto à janela e teto de madeira que aquece o espaço.",
      ficha: [
        { rotulo: "Tipo", valor: "Escritório" },
        { rotulo: "Área", valor: "220 m²" },
        { rotulo: "Obra", valor: "4 meses" },
        { rotulo: "Materiais", valor: "Pinus, laminado, plantas" },
      ],
      imagens: [
        {
          src: escritorioJardim,
          alt: "Escritório com bancada branca junto à janela e teto de madeira",
        },
      ],
      formato: "retrato",
    },
    {
      id: "casa-empena",
      nome: "Casa Empena",
      categoria: "residencial",
      local: "Granja Viana",
      ano: 2021,
      area: "260 m²",
      resumo:
        "Um telhado de duas águas reinterpretado em placas escuras, com uma fachada de tijolos vazados que acende à noite.",
      ficha: [
        { rotulo: "Tipo", valor: "Casa unifamiliar" },
        { rotulo: "Área", valor: "260 m²" },
        { rotulo: "Obra", valor: "12 meses" },
        { rotulo: "Materiais", valor: "Tijolo, placa cimentícia, vidro" },
      ],
      imagens: [
        {
          src: casaEmpena,
          alt: "Casa de telhado em duas águas com fachada de tijolos vazados e jardim",
        },
      ],
      formato: "retrato",
    },
    {
      id: "casa-encosta",
      nome: "Casa Encosta",
      categoria: "residencial",
      local: "Serra do Mar",
      ano: 2022,
      area: "290 m²",
      resumo:
        "Volumes escalonados que acompanham a pedra do terreno, com o jardim de cactos entrando pela sala.",
      ficha: [
        { rotulo: "Tipo", valor: "Casa de campo" },
        { rotulo: "Área", valor: "290 m²" },
        { rotulo: "Obra", valor: "18 meses" },
        { rotulo: "Materiais", valor: "Madeira, pedra local, vidro" },
      ],
      imagens: [
        {
          src: casaEncosta,
          alt: "Casa de madeira em volumes escalonados sobre uma encosta de pedras",
        },
      ],
      formato: "retrato",
    },
  ] satisfies Projeto[],
  processo: [
    {
      etapa: "Escuta",
      prazo: "1 a 2 semanas",
      texto:
        "Visita ao terreno ou ao imóvel e conversas sobre rotina, gostos, orçamento e prazo.",
    },
    {
      etapa: "Estudo",
      prazo: "3 a 5 semanas",
      texto:
        "Croquis, maquete eletrônica e duas alternativas para você escolher o caminho.",
    },
    {
      etapa: "Projeto",
      prazo: "6 a 10 semanas",
      texto:
        "Plantas, detalhamento, aprovação na prefeitura e orçamento com fornecedores.",
    },
    {
      etapa: "Obra",
      prazo: "Do início à entrega",
      texto:
        "Visitas semanais, relatório com fotos e a mesma equipe até a entrega das chaves.",
    },
  ],
  estudio: {
    imagem: {
      src: pranchas,
      alt: "Pranchas de projeto com plantas e lapiseiras sobre a mesa",
    } satisfies Imagem,
    paragrafos: [
      "O Atelier Vão nasceu em 2011 de uma ideia simples: o melhor espaço de uma casa é o vão, o lugar entre as coisas onde a vida acontece.",
      "Somos nove pessoas entre arquitetos, designers de interiores e uma engenheira que acompanha cada obra. Atendemos poucos projetos por vez, para dar a cada um a atenção que ele pede.",
    ],
  },
  orcamento: {
    tipos: [
      { valor: "residencial", rotulo: "Casa" },
      { valor: "interiores", rotulo: "Interiores" },
      { valor: "corporativo", rotulo: "Escritório" },
    ] satisfies { valor: Categoria; rotulo: string }[],
    /** Área mínima, máxima e inicial do controle, em m². */
    area: { minima: 30, maxima: 600, inicial: 120, passo: 10 },
    etapas: [
      { valor: "só do projeto", rotulo: "Só o projeto" },
      {
        valor: "do projeto e do acompanhamento da obra",
        rotulo: "Projeto e acompanhamento da obra",
      },
    ],
  },
  contato: {
    endereco: "Rua dos Ipês, 410",
    bairro: "Vila Madalena",
    email: "contato@ateliervao.exemplo",
  },
  rodape: {
    descricao:
      "Casas, interiores e escritórios, do primeiro croqui à última luminária, com obra acompanhada de perto.",
    endereco: "Rua dos Ipês, 410",
    bairro: "Vila Madalena",
    horarios: ["Segunda a sexta: 9h às 18h", "Visitas à obra com hora marcada"],
    email: "contato@ateliervao.exemplo",
    redes: ["instagram", "pinterest", "linkedin"],
    legais: [
      "CAU A000000-0 (registro fictício)",
      "CNPJ 00.000.000/0001-00 (fictício)",
    ],
  } satisfies DadosDoRodape,
};
