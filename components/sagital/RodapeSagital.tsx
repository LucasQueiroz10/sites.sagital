import { Globe, Mail, Phone } from "lucide-react";
import { AnoAtual } from "@/components/ui/AnoAtual";
import {
  classeDoLinkDeContato,
  ItemDeContato,
  LinksDoRodape,
  RodapeCompleto,
} from "@/components/ui/RodapeCompleto";
import { sitesDoPortfolio } from "@/data/portfolio";
import { contatoDaSagital, demos, mensagemDeContato } from "@/data/sagital";
import { formatarTelefone } from "@/lib/formato";
import { montarLinkWhatsApp, NUMERO_WHATSAPP } from "@/lib/whatsapp";
import { MarcaSagital } from "./MarcaSagital";

const link = classeDoLinkDeContato();

const navegacao = [
  { rotulo: "Demos", href: "#demos" },
  { rotulo: "Portfólio", href: "#portfolio" },
  { rotulo: "Como funciona", href: "#como-funciona" },
  { rotulo: "Pacotes", href: "#pacotes" },
];

/**
 * Rodapé da página da Sagital. É um negócio real: nada aqui é inventado. O
 * que não estiver preenchido em contatoDaSagital (e-mail, redes, CNPJ)
 * simplesmente não aparece.
 */
export function RodapeSagital() {
  const { email, redes, cnpj } = contatoDaSagital;

  return (
    <RodapeCompleto
      className="border-t border-[var(--sg-borda-sutil)] pb-28 md:pb-10"
      marca={<MarcaSagital className="text-[var(--sg-tinta-forte)]" />}
      descricao="Sites para qualquer negócio, rápidos no celular e com o cliente a um toque do seu WhatsApp."
      redes={redes.map(({ rede, usuario, url }) => ({
        rede,
        usuario,
        href: url,
      }))}
      colunas={[
        { titulo: "Navegação", conteudo: <LinksDoRodape links={navegacao} /> },
        {
          titulo: "Exemplos",
          conteudo: (
            <div className="grid grid-cols-2 gap-x-6">
              <LinksDoRodape
                links={demos.map((demo) => ({
                  rotulo: demo.rotulo,
                  href: `/${demo.nicho}`,
                }))}
              />
              <LinksDoRodape
                links={sitesDoPortfolio.map((site) => ({
                  rotulo: site.id.charAt(0).toUpperCase() + site.id.slice(1),
                  href: site.href,
                }))}
              />
            </div>
          ),
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
                  href={montarLinkWhatsApp(mensagemDeContato)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  Pedir orçamento no WhatsApp
                  <span className="sr-only"> (abre o WhatsApp)</span>
                </a>
              </ItemDeContato>
              {email && (
                <ItemDeContato icone={Mail}>
                  <a href={`mailto:${email}`} className={link}>
                    {email}
                  </a>
                </ItemDeContato>
              )}
              <ItemDeContato icone={Globe}>
                Atendimento online, onde você estiver
              </ItemDeContato>
            </ul>
          ),
        },
      ]}
      direitos={
        <>
          © <AnoAtual /> Sagital. Todos os direitos reservados.
        </>
      }
      legais={[
        ...(cnpj ? [`CNPJ ${cnpj}`] : []),
        "Os demos e o portfólio usam nomes, preços e depoimentos fictícios.",
      ]}
    />
  );
}
