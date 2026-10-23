"use client";

import { useState, type ReactNode } from "react";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import {
  DIAS,
  diaMes,
  horarioCurto,
  horariosDeReserva,
  type DiaDaSemana,
  type Expediente,
} from "@/lib/agenda";
import { classes } from "@/lib/classes";
import { useAgora } from "@/lib/useAgora";

type Props = {
  expediente: Expediente[];
  pessoas: number[];
  rotuloDoNicho: string;
};

type DiaDeReserva = {
  data: Date;
  dia: DiaDaSemana;
  rotulo: string;
  /** Como o dia aparece na frase: "hoje", "amanhã", "sábado". */
  falado: string;
  horarios: string[];
};

/** Próximos 8 dias com algum horário livre para reservar. */
function proximosDias(expediente: Expediente[], agora: Date): DiaDeReserva[] {
  const dias: DiaDeReserva[] = [];
  for (let i = 0; i < 8; i++) {
    const data = new Date(agora);
    data.setDate(agora.getDate() + i);
    const dia = data.getDay() as DiaDaSemana;
    const horarios = horariosDeReserva(expediente, dia, agora, i === 0);
    if (horarios.length === 0) continue;
    const rotulo =
      i === 0 ? "Hoje" : i === 1 ? "Amanhã" : (DIAS[dia]?.curto ?? "");
    const falado =
      i === 0
        ? "hoje"
        : i === 1
          ? "amanhã"
          : (DIAS[dia]?.nome.toLowerCase() ?? "");
    dias.push({ data, dia, rotulo, falado, horarios });
  }
  return dias;
}

function Opcao({
  nome,
  valor,
  marcado,
  aoEscolher,
  children,
}: {
  nome: string;
  valor: string;
  marcado: boolean;
  aoEscolher: () => void;
  children: ReactNode;
}) {
  return (
    <label className="relative shrink-0 cursor-pointer">
      <input
        type="radio"
        name={nome}
        value={valor}
        checked={marcado}
        onChange={aoEscolher}
        className="peer sr-only"
      />
      <span
        className={classes(
          "flex min-h-11 min-w-11 flex-col items-center justify-center rounded-tema border px-3 py-1.5 text-center leading-tight transition-colors",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-destaque",
          marcado
            ? "border-primaria bg-primaria text-primaria-texto"
            : "border-borda bg-fundo hover:border-texto-suave",
        )}
      >
        {children}
      </span>
    </label>
  );
}

/**
 * Reserva de mesa: pessoas, dia e horário. Os horários vêm do expediente;
 * o pedido vai pronto para o WhatsApp do restaurante.
 */
export function ReservaDeMesa({ expediente, pessoas, rotuloDoNicho }: Props) {
  const agora = useAgora("minuto");
  const [quantidade, setQuantidade] = useState(2);
  const [diaEscolhido, setDiaEscolhido] = useState<string | null>(null);
  const [horarioEscolhido, setHorarioEscolhido] = useState<string | null>(null);

  const dias = agora ? proximosDias(expediente, agora) : [];
  const dia =
    dias.find((d) => d.data.toDateString() === diaEscolhido) ?? dias[0];
  const horario =
    dia && horarioEscolhido && dia.horarios.includes(horarioEscolhido)
      ? horarioEscolhido
      : dia?.horarios[0];
  const maximo = pessoas[pessoas.length - 1];
  const textoPessoas =
    quantidade === maximo
      ? `${quantidade} ou mais pessoas`
      : `${quantidade} ${quantidade === 1 ? "pessoa" : "pessoas"}`;

  const pedido =
    dia && horario
      ? `Quero reservar uma mesa para ${textoPessoas}, ${dia.falado} (${diaMes(dia.data)}), às ${horarioCurto(horario)}.`
      : `Quero reservar uma mesa para ${textoPessoas}.`;

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      aria-label="Reservar mesa"
      className="grid gap-5"
    >
      <fieldset className="min-w-0">
        <legend className="mb-2 text-sm font-semibold">Pessoas</legend>
        <div className="flex flex-wrap gap-2">
          {pessoas.map((n) => (
            <Opcao
              key={n}
              nome="pessoas"
              valor={String(n)}
              marcado={quantidade === n}
              aoEscolher={() => setQuantidade(n)}
            >
              <span className="font-semibold tabular-nums">
                {n === maximo ? `${n}+` : n}
              </span>
            </Opcao>
          ))}
        </div>
      </fieldset>

      <fieldset className="min-w-0">
        <legend className="mb-2 text-sm font-semibold">Dia</legend>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6">
          {dias.length === 0 && (
            <p className="min-h-11 text-sm text-texto-suave">
              Carregando datas…
            </p>
          )}
          {dias.map((d) => (
            <Opcao
              key={d.data.toDateString()}
              nome="dia"
              valor={d.data.toDateString()}
              marcado={d === dia}
              aoEscolher={() => setDiaEscolhido(d.data.toDateString())}
            >
              <span className="text-sm font-semibold">{d.rotulo}</span>
              <span className="text-xs tabular-nums opacity-80">
                {diaMes(d.data)}
              </span>
            </Opcao>
          ))}
        </div>
      </fieldset>

      <fieldset className="min-w-0">
        <legend className="mb-2 text-sm font-semibold">Horário</legend>
        {/* Do café ao fim da tarde são muitos horários: no celular, uma
            fileira que desliza; no computador, todos à vista. */}
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-wrap lg:px-0">
          {dia?.horarios.map((h) => (
            <Opcao
              key={h}
              nome="horario"
              valor={h}
              marcado={h === horario}
              aoEscolher={() => setHorarioEscolhido(h)}
            >
              <span className="text-sm font-semibold tabular-nums">
                {horarioCurto(h)}
              </span>
            </Opcao>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-2">
        <BotaoWhatsApp
          acao={{ rotulo: "Reservar pelo WhatsApp", pedido }}
          rotuloDoNicho={rotuloDoNicho}
          tamanho="grande"
          className="w-full"
        />
        <p className="text-sm text-texto-suave" aria-live="polite">
          {dia && horario
            ? `Mesa para ${textoPessoas}, ${dia.falado} às ${horarioCurto(horario)}.`
            : " "}
        </p>
      </div>
    </form>
  );
}
