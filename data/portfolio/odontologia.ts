import avaliacao from "@/public/imagens/portfolio/odontologia/avaliacao.jpg";
import consultorio from "@/public/imagens/portfolio/odontologia/consultorio.jpg";
import conversa from "@/public/imagens/portfolio/odontologia/conversa.jpg";
import detalhe from "@/public/imagens/portfolio/odontologia/detalhe.jpg";
import dr from "@/public/imagens/portfolio/odontologia/dr.jpg";
import dra from "@/public/imagens/portfolio/odontologia/dra.jpg";
import modelo from "@/public/imagens/portfolio/odontologia/modelo.jpg";
import recepcao from "@/public/imagens/portfolio/odontologia/recepcao.jpg";
import sorriso from "@/public/imagens/portfolio/odontologia/sorriso.jpg";
import type { Expediente } from "@/lib/agenda";
import type { TurnoDeAtendimento } from "@/lib/consultas";
import type { DadosDoRodape, Endereco, Imagem } from "@/data/tipos";

// Clínica fictícia. Sem preços nem promoções: o código de ética da
// odontologia não permite anunciar valores. Fotos do Unsplash (licença
// livre), salvas localmente.

export type Tratamento = {
  id: string;
  nome: string;
  descricao: string;
  /** Duração da consulta, em minutos. */
  duracao: number;
  sessoes: string;
};

export const odontologia = {
  nome: "Lumi Odontologia",
  marca: { principal: "lumi", apoio: "odontologia" },
  titulo: "Cuidar do sorriso, sem pressa e sem dor.",
  /** Final do título que vai na cor da clínica; precisa estar no título. */
  destaqueDoTitulo: "sem pressa e sem dor.",
  apoio:
    "Consultas de uma hora, explicação antes de cada passo e a agenda aberta aqui no site. Escolha o horário e confirme pelo WhatsApp.",
  imagemPrincipal: {
    src: sorriso,
    alt: "Mulher sorrindo de blusa branca, em fundo cinza-claro",
  } satisfies Imagem,
  navegacao: [
    { rotulo: "Tratamentos", href: "#tratamentos" },
    { rotulo: "Agenda", href: "#agenda" },
    { rotulo: "Clínica", href: "#clinica" },
    { rotulo: "Dúvidas", href: "#duvidas" },
  ],
  tratamentos: [
    {
      id: "avaliacao",
      nome: "Avaliação completa",
      descricao:
        "Exame, raio-x digital e um plano por escrito, com o porquê de cada etapa.",
      duracao: 60,
      sessoes: "1 consulta",
    },
    {
      id: "limpeza",
      nome: "Limpeza e prevenção",
      descricao:
        "Remoção de tártaro, polimento e orientação para manter tudo em dia em casa.",
      duracao: 45,
      sessoes: "A cada 6 meses",
    },
    {
      id: "clareamento",
      nome: "Clareamento",
      descricao:
        "No consultório ou com moldeira em casa, com acompanhamento da sensibilidade.",
      duracao: 60,
      sessoes: "2 a 3 consultas",
    },
    {
      id: "alinhadores",
      nome: "Alinhadores transparentes",
      descricao:
        "Planejamento digital do movimento dos dentes e trocas a cada duas semanas.",
      duracao: 60,
      sessoes: "Revisões mensais",
    },
    {
      id: "implantes",
      nome: "Implantes",
      descricao:
        "Da tomografia à coroa final, com cada fase explicada e agendada com você.",
      duracao: 90,
      sessoes: "Conforme o plano",
    },
    {
      id: "criancas",
      nome: "Odontopediatria",
      descricao:
        "Primeira consulta para conhecer a clínica, sem pressa e sem jaleco assustador.",
      duracao: 45,
      sessoes: "A partir de 1 ano",
    },
  ] satisfies Tratamento[],
  turnos: [
    {
      dias: [1, 2, 3, 4, 5],
      abre: "08:00",
      fecha: "18:00",
      pausa: ["12:00", "13:30"],
    },
    { dias: [6], abre: "08:00", fecha: "12:00" },
  ] satisfies TurnoDeAtendimento[],
  expediente: [
    { dias: [1, 2, 3, 4, 5], abre: "08:00", fecha: "18:00" },
    { dias: [6], abre: "08:00", fecha: "12:00" },
  ] satisfies Expediente[],
  avaliacao: {
    titulo: "O que acontece na avaliação",
    itens: [
      "Conversa sobre o que incomoda e o que você espera",
      "Exame clínico e raio-x digital na própria clínica",
      "Plano de tratamento por escrito, com etapas e prazos",
    ],
  },
  /**
   * A primeira consulta minuto a minuto: o relógio da seção anda até o
   * minuto de cada etapa conforme a rolagem. Somam a hora da avaliação.
   */
  primeiraConsulta: [
    {
      minuto: 0,
      titulo: "Café e conversa",
      texto:
        "Você conta o que incomoda e o que espera do tratamento. Ninguém encosta em nada antes disso.",
    },
    {
      minuto: 15,
      titulo: "Exame clínico",
      texto:
        "A dentista examina dentes e gengiva mostrando tudo numa câmera intraoral, na tela à sua frente.",
    },
    {
      minuto: 30,
      titulo: "Raio-x digital",
      texto:
        "Feito ali mesmo, na cadeira, com um décimo da radiação do filme. A imagem aparece na hora.",
    },
    {
      minuto: 45,
      titulo: "O plano, explicado",
      texto:
        "Cada etapa com o porquê, o prazo e as alternativas. Você pergunta o quanto quiser.",
    },
    {
      minuto: 60,
      titulo: "Tudo por escrito",
      texto:
        "Você sai com o plano no WhatsApp e decide com calma. Sem pressão para marcar na hora.",
    },
  ],
  clinica: {
    paragrafo:
      "Três consultórios, recepção sem fila e um intervalo entre pacientes para nenhuma consulta atrasar a outra.",
    itens: [
      "Raio-x digital e escaneamento intraoral",
      "Esterilização com registro por paciente",
      "Acesso sem degraus e banheiro adaptado",
      "Estacionamento conveniado em frente",
    ],
    imagens: [
      {
        src: consultorio,
        alt: "Consultório claro com cadeira odontológica e piso de madeira",
      },
      {
        src: recepcao,
        alt: "Recepção branca com cadeiras pretas e uma oliveira no vaso",
      },
      {
        src: conversa,
        alt: "Dentista conversa com uma paciente sentada na cadeira, os dois sorrindo",
      },
    ] satisfies [Imagem, Imagem, Imagem],
  },
  equipe: [
    {
      nome: "Dra. Marina Lopes",
      area: "Ortodontia e estética",
      imagem: {
        src: dra,
        alt: "Dra. Marina Lopes, de óculos e uniforme azul, de braços cruzados",
      },
    },
    {
      nome: "Dr. Caio Ribeiro",
      area: "Implantes e prótese",
      imagem: {
        src: dr,
        alt: "Dr. Caio Ribeiro, de uniforme preto e luvas, no consultório",
      },
    },
  ],
  destaques: [
    {
      src: avaliacao,
      alt: "Dentista examina um paciente que sorri na cadeira",
    },
    { src: modelo, alt: "Modelo de dente mostrando a raiz e o canal" },
    { src: detalhe, alt: "Close de um sorriso" },
  ] satisfies Imagem[],
  depoimentos: [
    {
      texto:
        "Tinha pavor de dentista. Aqui me explicaram cada passo antes de começar e eu nem vi o tempo passar.",
      autoria: "Paciente de tratamento de canal",
    },
    {
      texto:
        "Marquei pelo site num domingo à noite e na terça já estava sendo atendida, no horário certinho.",
      autoria: "Paciente de avaliação",
    },
    {
      texto:
        "Meu filho saiu da primeira consulta pedindo para voltar. Isso diz tudo.",
      autoria: "Mãe de paciente de 6 anos",
    },
  ],
  duvidas: [
    {
      pergunta: "Vocês atendem convênio?",
      resposta:
        "Atendemos alguns convênios odontológicos e emitimos recibo para reembolso nos demais. Confirme o seu pelo WhatsApp antes da consulta.",
    },
    {
      pergunta: "Quanto custa a avaliação?",
      resposta:
        "Os valores são informados pelo WhatsApp ou na recepção. O plano de tratamento sai por escrito, com cada etapa, antes de qualquer procedimento.",
    },
    {
      pergunta: "E se eu precisar remarcar?",
      resposta:
        "É só avisar pelo WhatsApp com 24 horas de antecedência. Remarcamos sem custo.",
    },
    {
      pergunta: "Atendem urgência?",
      resposta:
        "Sim, em horário comercial. Mande uma mensagem contando o que está sentindo e encaixamos você no primeiro horário possível.",
    },
  ],
  endereco: {
    logradouro: "Rua Jasmim, 85, 2º andar",
    bairro: "Jardim Botânico",
    referencia: "Estacionamento conveniado em frente",
  } satisfies Endereco,
  rodape: {
    descricao:
      "Clínica odontológica com consultas sem pressa, explicação antes de cada passo e agenda aberta no site.",
    endereco: "Rua Jasmim, 85, 2º andar",
    bairro: "Jardim Botânico",
    horarios: ["Segunda a sexta: 8h às 18h", "Sábado: 8h às 12h"],
    email: "contato@lumiodontologia.exemplo",
    redes: ["instagram", "facebook", "youtube"],
    legais: [
      "Responsável técnica: Dra. Marina Lopes · CRO-UF 00000 (registro fictício)",
      "CNPJ 00.000.000/0001-00 (fictício)",
    ],
  } satisfies DadosDoRodape,
};
