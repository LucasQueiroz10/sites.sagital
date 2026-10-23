import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { AnoAtual } from "@/components/ui/AnoAtual";
import {
  classeDoLinkDeContato,
  ItemDeContato,
  LinksDoRodape,
  RodapeCompleto,
} from "@/components/ui/RodapeCompleto";
import type { DadosDoRodape } from "@/data/tipos";
import { apelidoDoNome, formatarTelefone } from "@/lib/formato";
import { linkDoPortfolio, NUMERO_WHATSAPP } from "@/lib/whatsapp";
import { AssinaturaDoPortfolio } from "./AssinaturaDoPortfolio";

type Props = {
  nome: string;
  marca: ReactNode;
  navegacao: { rotulo: string; href: string }[];
  rodape: DadosDoRodape;
  tom?: "claro" | "escuro";
  className?: string;
  classeDoTitulo?: string;
};

/** Rodapé completo dos sites do portfólio, sobre o RodapeCompleto. */
export function RodapeDoPortfolio({
  nome,
  marca,
  navegacao,
  rodape,
  tom = "claro",
  className,
  classeDoTitulo,
}: Props) {
  const link = classeDoLinkDeContato(tom);
  const apelido = apelidoDoNome(nome);

  return (
    <RodapeCompleto
      tom={tom}
      className={className}
      classeDoTitulo={classeDoTitulo}
      marca={marca}
      descricao={rodape.descricao}
      redes={rodape.redes.map((rede) => ({ rede, usuario: apelido }))}
      colunas={[
        {
          titulo: "Navegação",
          conteudo: <LinksDoRodape links={navegacao} tom={tom} />,
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
                  href={linkDoPortfolio(
                    "Vim pelo site e gostaria de mais informações.",
                    nome,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  Conversar no WhatsApp
                  <span className="sr-only"> (abre o WhatsApp)</span>
                </a>
              </ItemDeContato>
              <ItemDeContato icone={Mail}>
                <a href={`mailto:${rodape.email}`} className={link}>
                  {rodape.email}
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
                  {rodape.endereco}
                  <br />
                  {rodape.bairro}
                </address>
              </ItemDeContato>
              <ItemDeContato icone={Clock}>
                {rodape.horarios.map((linha) => (
                  <p key={linha}>{linha}</p>
                ))}
              </ItemDeContato>
            </ul>
          ),
        },
      ]}
      direitos={
        <>
          © <AnoAtual /> {nome}. Todos os direitos reservados.
        </>
      }
      legais={rodape.legais}
      assinatura={<AssinaturaDoPortfolio />}
    />
  );
}
