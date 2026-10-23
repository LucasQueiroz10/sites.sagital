import demoAcademia from "@/public/imagens/sagital/demo-academia.png";
import demoAcademiaDesktop from "@/public/imagens/sagital/demo-academia-desktop.png";
import demoRestaurante from "@/public/imagens/sagital/demo-restaurante.png";
import demoRestauranteDesktop from "@/public/imagens/sagital/demo-restaurante-desktop.png";
import demoTabacaria from "@/public/imagens/sagital/demo-tabacaria.png";
import demoTabacariaDesktop from "@/public/imagens/sagital/demo-tabacaria-desktop.png";
import demoVarejo from "@/public/imagens/sagital/demo-varejo.png";
import demoVarejoDesktop from "@/public/imagens/sagital/demo-varejo-desktop.png";
import cenarioAcademia from "@/public/imagens/academia/bike.jpg";
import cenarioRestaurante from "@/public/imagens/restaurante/limoes.jpg";
import cenarioTabacaria from "@/public/imagens/tabacaria/poltrona-lareira.jpg";
import cenarioVarejo from "@/public/imagens/varejo/feminino-banner.jpg";
import { formatarPrecoRedondo } from "@/lib/formato";
import type { Nicho } from "@/lib/link";
import type { PadraoDoTema } from "@/lib/tema";
import { academia } from "./academia";
import { restaurante } from "./restaurante";
import { tabacaria } from "./tabacaria";
import type { Imagem, Rede } from "./tipos";
import { varejo } from "./varejo";

// Página da Sagital. As capturas dos demos foram feitas do próprio site.
// Pacotes, valores e prazos são um ponto de partida: edite à vontade.

export type Demo = {
  nicho: Nicho;
  rotulo: string;
  padrao: PadraoDoTema;
  descricao: string;
  /** Primeira tela no celular (390px). */
  captura: Imagem;
  /** Primeira tela no computador (1440px). */
  capturaDesktop: Imagem;
  /** Etiqueta de origem: a paleta e a fonte de cada demo. */
  paleta: `#${string}`[];
  fonte: string;
  /** Vitrine da página inicial: o que o negócio é, em poucas palavras. */
  resumo: string;
  /** Foto do próprio demo atrás do celular, na vitrine; `foco` é o object-position. */
  cenario: Imagem & { foco: string };
};

export const demos: Demo[] = [
  {
    nicho: "academia",
    rotulo: academia.rotulo,
    padrao: academia.padrao,
    descricao:
      "Aula experimental agendada direto da grade, planos com preço e modalidades.",
    captura: {
      src: demoAcademia,
      alt: "Primeira tela do demo de academia no celular",
    },
    capturaDesktop: {
      src: demoAcademiaDesktop,
      alt: "Primeira tela do demo de academia no computador",
    },
    paleta: ["#ffffff", "#d42a16", "#12161c"],
    fonte: "Sofia Sans Condensed",
    resumo: "academia de bairro",
    cenario: {
      src: cenarioAcademia,
      alt: "Turma de bike indoor pedalando lado a lado diante de uma parede de blocos",
      foco: "30% 50%",
    },
  },
  {
    nicho: "varejo",
    rotulo: varejo.rotulo,
    padrao: varejo.padrao,
    descricao:
      "Vitrines Feminino e Masculino, escolha de tamanho e pedido pelo WhatsApp.",
    captura: {
      src: demoVarejo,
      alt: "Primeira tela do demo de varejo no celular",
    },
    capturaDesktop: {
      src: demoVarejoDesktop,
      alt: "Primeira tela do demo de varejo no computador",
    },
    paleta: ["#ffffff", "#f5f5f5", "#121212"],
    fonte: "Hanken Grotesk",
    resumo: "loja de básicos",
    cenario: {
      src: cenarioVarejo,
      alt: "Mulher de camiseta branca e calça jeans num estúdio cinza",
      foco: "50% 22%",
    },
  },
  {
    nicho: "restaurante",
    rotulo: restaurante.rotulo,
    padrao: restaurante.padrao,
    descricao:
      "Cardápio em abas com fotos dos pratos, pedido pelo WhatsApp e reserva de mesa.",
    captura: {
      src: demoRestaurante,
      alt: "Primeira tela do demo de restaurante no celular",
    },
    capturaDesktop: {
      src: demoRestauranteDesktop,
      alt: "Primeira tela do demo de restaurante no computador",
    },
    paleta: ["#fbf6ea", "#8fb0f0", "#15355a"],
    fonte: "Libre Caslon Condensed",
    resumo: "comida natural",
    cenario: {
      src: cenarioRestaurante,
      alt: "Limões cortados sobre um caminho de mesa de linho verde",
      foco: "40% 50%",
    },
  },
  {
    nicho: "tabacaria",
    rotulo: tabacaria.rotulo,
    padrao: tabacaria.padrao,
    descricao:
      "Aviso de maioridade, lounge, acessórios e todos os avisos legais.",
    captura: {
      src: demoTabacaria,
      alt: "Primeira tela do demo de tabacaria no celular",
    },
    capturaDesktop: {
      src: demoTabacariaDesktop,
      alt: "Primeira tela do demo de tabacaria no computador",
    },
    paleta: ["#120e0b", "#a8835a", "#efe6d8"],
    fonte: "Marcellus",
    resumo: "tabacaria e lounge",
    cenario: {
      src: cenarioTabacaria,
      alt: "Poltrona de couro ao lado de uma lareira, na penumbra",
      foco: "60% 50%",
    },
  },
];

/** Cores prontas do gerador de link. */
export const coresDoGerador: { nome: string; valor: `#${string}` }[] = [
  { nome: "Vermelho", valor: "#e11d48" },
  { nome: "Laranja", valor: "#f97316" },
  { nome: "Verde", valor: "#16a34a" },
  { nome: "Azul", valor: "#2563eb" },
  { nome: "Roxo", valor: "#7c3aed" },
  { nome: "Grafite", valor: "#1f2937" },
];

export const processo = [
  {
    titulo: "Conversa no WhatsApp",
    texto:
      "Você conta sobre o seu negócio e recebe o demo, já com o seu nome e a sua cor.",
  },
  {
    titulo: "Conteúdo e ajustes",
    texto:
      "Fotos, preços, horários e textos. Você aprova cada parte pelo WhatsApp.",
  },
  {
    titulo: "Desenvolvimento",
    texto:
      "Montamos o site com o seu conteúdo e você acompanha tudo por um link, antes de ir ao ar.",
  },
  {
    titulo: "Site no ar",
    texto:
      "Publicado com endereço próprio, rápido no celular e funcionando até sem internet.",
  },
  {
    titulo: "Atualizações",
    texto: "Mudou um preço, um serviço ou o horário? É só mandar uma mensagem.",
  },
];

export type Pacote = {
  nome: string;
  /** Endereço da página do pacote: /pacotes/{slug}. */
  slug: string;
  /** Centavos. */
  preco: number;
  prazo: string;
  recomendado?: boolean;
  /** Ao lado do nome, no título da página do pacote. */
  chamada: string;
  /** Uma frase sob o preço, nos cartões de /pacotes. */
  resumo: string;
  /** O que distingue o pacote, nos cartões de /pacotes. */
  destaques: string[];
  introducao: string;
  /** Para quem é: uma frase e os casos em que encaixa. */
  paraQuem: string;
  idealPara: string[];
  /** Quando outro pacote (ou outra solução) serve melhor. */
  naoIndicado: string[];
  /** Como o prazo corre, do primeiro contato ao site no ar. */
  etapas: { quando: string; titulo: string; texto: string }[];
};

export const pacotes: Pacote[] = [
  {
    nome: "Essencial",
    slug: "essencial",
    preco: 89000,
    prazo: "7 dias",
    chamada: "o primeiro site do negócio",
    resumo: "Uma página com o essencial e o seu WhatsApp a um toque.",
    destaques: [
      "Uma página com o que o cliente procura",
      "Botão de WhatsApp com mensagem pronta",
      "Horários, contatos e “aberto agora”",
      "Rápido no celular e acessível",
      "15 dias de ajustes depois de publicar",
    ],
    introducao:
      "Uma página só, bem feita, com o que o cliente procura antes de chamar: o que você faz, onde está, quando atende e um botão que abre o seu WhatsApp com a mensagem pronta.",
    paraQuem:
      "Você ainda não tem site, ou tem um perfil que ninguém acha. Precisa de um endereço próprio para mandar aos clientes e aparecer quando alguém procura o seu nome.",
    idealPara: [
      "Autônomos e profissionais liberais",
      "Quem vende pelo WhatsApp e quer um link para divulgar",
      "Negócios com poucos serviços e preço sob consulta",
    ],
    naoIndicado: [
      "Mostrar catálogo, cardápio ou planos (veja o Completo)",
      "Fotos e textos produzidos com você (veja o Sob medida)",
      "Loja com carrinho e pagamento no próprio site",
    ],
    etapas: [
      {
        quando: "Dia 1",
        titulo: "Conversa e conteúdo",
        texto:
          "Uma conversa pelo WhatsApp: nome, serviços, horários, contatos e as fotos que você já tem.",
      },
      {
        quando: "Dias 2 a 5",
        titulo: "Montagem",
        texto:
          "O site toma forma e você acompanha tudo por um link, no próprio celular.",
      },
      {
        quando: "Dia 6",
        titulo: "Ajustes",
        texto: "Você aponta o que mudar e a gente ajusta numa rodada.",
      },
      {
        quando: "Dia 7",
        titulo: "Site no ar",
        texto:
          "Publicado no endereço do seu negócio, com 15 dias de ajustes depois.",
      },
    ],
  },
  {
    nome: "Completo",
    slug: "completo",
    preco: 149000,
    prazo: "12 dias",
    recomendado: true,
    chamada: "tudo o que você vende",
    resumo:
      "Catálogo, cardápio ou planos, com o pedido de cada item no WhatsApp.",
    destaques: [
      "Tudo o que o Essencial tem",
      "Catálogo, serviços, cardápio ou planos",
      "Funciona sem internet e pode ser instalado",
      "QR code para imprimir e divulgar",
      "30 dias de ajustes depois de publicar",
    ],
    introducao:
      "O site com o seu catálogo, serviços, cardápio ou planos, cada item com preço e pedido direto no WhatsApp. Abre rápido mesmo com sinal fraco, pode ser instalado no celular e vem com um QR code pronto para imprimir.",
    paraQuem:
      "Você já tem clientes e quer que eles vejam tudo o que você oferece antes de chamar, sem precisar mandar foto por foto no WhatsApp.",
    idealPara: [
      "Lojas, restaurantes, academias e clínicas",
      "Quem recebe as mesmas perguntas de preço todo dia",
      "Quem quer um QR code no balcão, na mesa ou na vitrine",
    ],
    naoIndicado: [
      "Só um cartão de visitas on-line (veja o Essencial)",
      "Mais de uma página ou fotos produzidas (veja o Sob medida)",
      "Loja com carrinho e pagamento no próprio site",
    ],
    etapas: [
      {
        quando: "Dias 1 e 2",
        titulo: "Conversa e conteúdo",
        texto:
          "Você manda a lista do que vende, com preços e fotos. A gente organiza por categoria.",
      },
      {
        quando: "Dias 3 a 8",
        titulo: "Montagem",
        texto:
          "Site e catálogo montados com o seu conteúdo, e você acompanha cada passo por um link.",
      },
      {
        quando: "Dias 9 e 10",
        titulo: "Ajustes",
        texto: "Duas rodadas de ajustes no que você pedir.",
      },
      {
        quando: "Dias 11 e 12",
        titulo: "Site no ar",
        texto:
          "Publicado, com o QR code pronto para imprimir e 30 dias de ajustes depois.",
      },
    ],
  },
  {
    nome: "Sob medida",
    slug: "sob-medida",
    preco: 229000,
    prazo: "20 dias",
    chamada: "pensado do zero com você",
    resumo: "Fotos, textos e páginas extras feitos junto com você.",
    destaques: [
      "Tudo o que o Completo tem",
      "Fotos e textos produzidos com você",
      "Até três páginas extras",
      "Duas conversas e um roteiro antes de começar",
      "90 dias de ajustes depois de publicar",
    ],
    introducao:
      "Tudo o que o Completo tem, mais fotos e textos produzidos com você e até três páginas extras. O site conta a história do seu negócio do jeito que você contaria pessoalmente.",
    paraQuem:
      "Você quer se destacar dos concorrentes e não tem tempo, ou jeito, de escrever os textos e escolher as fotos sozinho.",
    idealPara: [
      "Escritórios, consultórios e estúdios",
      "Negócios com mais de um serviço ou unidade",
      "Quem quer textos e fotos próprios, sem banco de imagens",
    ],
    naoIndicado: [
      "Quem precisa do site no ar em uma semana (veja o Essencial)",
      "Um catálogo simples, sem páginas extras (veja o Completo)",
      "Loja com carrinho e pagamento no próprio site",
    ],
    etapas: [
      {
        quando: "Dias 1 a 3",
        titulo: "Conversa e roteiro",
        texto:
          "Duas conversas sobre o negócio e um roteiro com as páginas, os textos e as fotos que faltam.",
      },
      {
        quando: "Dias 4 a 7",
        titulo: "Fotos e textos",
        texto:
          "Combinamos as fotos e escrevemos os textos juntos, no jeito de falar do seu negócio.",
      },
      {
        quando: "Dias 8 a 16",
        titulo: "Montagem",
        texto:
          "O site e as páginas extras tomam forma, e você acompanha tudo por um link.",
      },
      {
        quando: "Dias 17 e 18",
        titulo: "Ajustes",
        texto: "Rodadas de ajustes até ficar do jeito que você quer.",
      },
      {
        quando: "Dias 19 e 20",
        titulo: "Site no ar",
        texto: "Publicado, com o QR code pronto e 90 dias de ajustes depois.",
      },
    ],
  },
];

/** Linhas da tabela de pacotes: o que cada um inclui, na ordem dos pacotes. */
export const recursos: { nome: string; inclui: (boolean | string)[] }[] = [
  { nome: "Site com a cara do seu negócio", inclui: [true, true, true] },
  { nome: "Botão de WhatsApp com mensagem pronta", inclui: [true, true, true] },
  {
    nome: "Horários, contatos e status “aberto agora”",
    inclui: [true, true, true],
  },
  { nome: "Rápido no celular e acessível", inclui: [true, true, true] },
  {
    nome: "Catálogo, serviços, cardápio ou planos",
    inclui: [false, true, true],
  },
  {
    nome: "Funciona sem internet e pode ser instalado",
    inclui: [false, true, true],
  },
  { nome: "QR code para imprimir e divulgar", inclui: [false, true, true] },
  { nome: "Fotos e textos produzidos com você", inclui: [false, false, true] },
  { nome: "Páginas extras", inclui: [false, false, "até 3"] },
  {
    nome: "Ajustes depois de publicar",
    inclui: ["15 dias", "30 dias", "90 dias"],
  },
];

export const observacoesDosPacotes =
  "Domínio .com.br: cerca de R$ 40 por ano, pago direto ao Registro.br. Manutenção mensal opcional: R$ 79.";

/**
 * A tabela "lado a lado" de /pacotes, em grupos. O que cada pacote inclui
 * vem de `recursos`; prazos e preços, de `pacotes`.
 */
export function comparacaoDosPacotes(): {
  grupo: string;
  linhas: { nome: string; valores: (boolean | string)[] }[];
}[] {
  const ajustes = recursos.find((r) => r.nome.startsWith("Ajustes"));
  return [
    {
      grupo: "Escopo",
      linhas: [
        {
          nome: "Páginas",
          valores: ["Uma", "Uma, com catálogo", "Até quatro"],
        },
        { nome: "Prazo", valores: pacotes.map((p) => p.prazo) },
        {
          nome: "Rodadas de ajuste antes de publicar",
          valores: ["Uma", "Duas", "Até ficar certo"],
        },
        {
          nome: "Ajustes depois de publicar",
          valores: ajustes?.inclui ?? [],
        },
      ],
    },
    {
      grupo: "Inclui",
      linhas: recursos
        .filter((r) => r !== ajustes && !r.nome.startsWith("Páginas"))
        .map((r) => ({ nome: r.nome, valores: r.inclui })),
    },
    {
      grupo: "Valores",
      linhas: [
        {
          nome: "Preço",
          valores: pacotes.map((p) => formatarPrecoRedondo(p.preco)),
        },
        { nome: "Pagamento", valores: pacotes.map(() => "Único") },
        {
          nome: "Domínio .com.br",
          valores: pacotes.map(() => "Cerca de R$ 40 por ano"),
        },
        {
          nome: "Manutenção mensal",
          valores: pacotes.map(() => "Opcional, R$ 79"),
        },
      ],
    },
  ];
}

/** Perguntas de /pacotes: só o que já está combinado em outras partes do site. */
export const perguntasDosPacotes: { pergunta: string; resposta: string }[] = [
  {
    pergunta: "Por que o preço é fechado?",
    resposta:
      "Para você saber quanto vai pagar antes de começar. O que entra no site e o prazo de entrega ficam combinados na primeira conversa, e o valor não muda no meio do caminho.",
  },
  {
    pergunta: "Posso ver como fica antes de pagar?",
    resposta:
      "Pode. Nos demos você vê um site do seu ramo com o nome do seu negócio, no celular, no tablet e no computador, antes de fechar qualquer pacote.",
  },
  {
    pergunta: "E se eu precisar mudar algo depois que o site estiver no ar?",
    resposta:
      "Cada pacote tem um período de ajustes inclusos depois de publicar: 15, 30 ou 90 dias. Depois disso, existe a manutenção mensal opcional de R$ 79: mudou um preço, um serviço ou o horário, é só mandar uma mensagem.",
  },
  {
    pergunta: "Preciso pagar pelo endereço do site?",
    resposta:
      "O domínio .com.br custa cerca de R$ 40 por ano e é pago direto ao Registro.br, então o endereço fica no nome do seu negócio.",
  },
  {
    pergunta: "Dá para começar pelo Essencial e crescer depois?",
    resposta:
      "Dá. O site cresce a partir do que já existe: o catálogo, o QR code ou as páginas extras entram quando você quiser, com o valor combinado antes.",
  },
  {
    pergunta: "O cliente consegue pagar pelo site?",
    resposta:
      "Não: o pedido chega no seu WhatsApp com a mensagem pronta, e o pagamento você combina com o cliente do jeito que já faz hoje.",
  },
];

export const mensagemDeContato =
  "Olá! Vi o site da Sagital e quero um site para o meu negócio.";

/** Mensagem do botão de cada pacote: o vendedor já sabe qual interessou. */
export function mensagemDoPacote(nome: string): string {
  return `Olá! Vi o site da Sagital e quero saber mais sobre o pacote ${nome}.`;
}

/**
 * Contatos da Sagital no rodapé. Só aparece o que estiver preenchido: o
 * telefone e o WhatsApp vêm de NEXT_PUBLIC_WHATSAPP_NUMERO; e-mail, redes e
 * CNPJ, daqui. Ex.: email: "contato@seudominio.com.br" e, nas redes,
 * { rede: "instagram", usuario: "sagital", url: "https://www.instagram.com/sagital/" }.
 */
export const contatoDaSagital: {
  email: string | null;
  redes: { rede: Rede; usuario: string; url: string }[];
  cnpj: string | null;
} = {
  email: null,
  redes: [],
  cnpj: null,
};
