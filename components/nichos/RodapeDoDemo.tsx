"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useTema } from "@/components/TemaDoNicho";
import { AnoAtual } from "@/components/ui/AnoAtual";
import {
  classeDoLinkDeContato,
  ItemDeContato,
  LinksDoRodape,
  RodapeCompleto,
} from "@/components/ui/RodapeCompleto";
import type { DadosDoNicho } from "@/data/tipos";
import { horarioCurto, rotuloDosDias } from "@/lib/agenda";
import { classes } from "@/lib/classes";
import { apelidoDoNome, formatarTelefone } from "@/lib/formato";
import {
  mensagemDoDemo,
  montarLinkWhatsApp,
  NUMERO_WHATSAPP,
} from "@/lib/whatsapp";

type Props = {
  dados: DadosDoNicho;
  classeDaMarca?: string;
  /** Avisos legais do nicho, mostrados acima da barra de baixo. */
  avisos?: ReactNode;
  className?: string;
};

const link = classeDoLinkDeContato();

/**
 * Rodapé dos demos. O nome personalizado pela URL vale também aqui: no @ das
 * redes, no e-mail e nos direitos. Telefone e WhatsApp são o número que
 * recebe os contatos dos demos; e-mail e CNPJ são fictícios (o domínio
 * .exemplo não existe).
 */
export function RodapeDoDemo({
  dados,
  classeDaMarca,
  avisos,
  className,
}: Props) {
  const { nome } = useTema();
  const apelido = apelidoDoNome(nome);
  const email = `contato@${apelido}.exemplo`;
  const whatsapp = montarLinkWhatsApp(
    mensagemDoDemo(
      "Vim pelo site e gostaria de mais informações.",
      nome,
      dados.rotulo,
    ),
  );

  return (
    <RodapeCompleto
      className={classes("border-t border-borda pb-28 lg:pb-10", className)}
      marca={<p className={classeDaMarca}>{nome}</p>}
      descricao={dados.descricao}
      redes={dados.redes.map((rede) => ({ rede, usuario: apelido }))}
      colunas={[
        {
          titulo: "Navegação",
          conteudo: <LinksDoRodape links={dados.navegacao} />,
        },
        {
          titulo: "Contato",
          conteudo: (
            <ul className="grid gap-3">
              {NUMERO_WHATSAPP && (
                <ItemDeContato icone={Phone}>
                  <a href={`tel:+${NUMERO_WHATSAPP}`} className={link}>
                    {formatarTelefone(NUMERO_WHATSAPP)}
                  </a>
                </ItemDeContato>
              )}
              <ItemDeContato rede="whatsapp">
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  Conversar no WhatsApp
                  <span className="sr-only"> (abre o WhatsApp)</span>
                </a>
              </ItemDeContato>
              <ItemDeContato icone={Mail}>
                <a href={`mailto:${email}`} className={link}>
                  {email}
                </a>
              </ItemDeContato>
            </ul>
          ),
        },
        {
          titulo: "Endereço e horários",
          conteudo: (
            <ul className="grid gap-3">
              <ItemDeContato icone={MapPin}>
                <address className="not-italic">
                  {dados.endereco.logradouro}
                  <br />
                  {dados.endereco.bairro}
                </address>
              </ItemDeContato>
              <ItemDeContato icone={Clock}>
                {dados.expediente.map((periodo) => (
                  <p key={periodo.dias.join("-") + periodo.abre}>
                    {rotuloDosDias(periodo.dias)}
                    {periodo.turno && ` (${periodo.turno.toLowerCase()})`}:{" "}
                    <span className="tabular-nums">
                      {horarioCurto(periodo.abre)} às{" "}
                      {horarioCurto(periodo.fecha)}
                    </span>
                  </p>
                ))}
              </ItemDeContato>
            </ul>
          ),
        },
      ]}
      avisos={avisos}
      direitos={
        <>
          © <AnoAtual /> {nome}. Todos os direitos reservados.
        </>
      }
      legais={["CNPJ 00.000.000/0001-00 (fictício)"]}
      assinatura={
        <p>
          Site demonstrativo com conteúdo fictício, feito pela{" "}
          <Link
            href="/"
            className="text-texto underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque"
          >
            Sagital
          </Link>
          .
        </p>
      }
    />
  );
}
