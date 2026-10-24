import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import {
  CabecaDaPagina,
  ProximaPagina,
  VerMais,
} from "@/components/nichos/Interno";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import type { Setor } from "@/data/tipos";
import { varejo as dados } from "@/data/varejo";
import { formatarPreco } from "@/lib/formato";
import { GradeDoSetor } from "./GradeDoSetor";

/**
 * A página de um setor (Feminino, Masculino): o banner do setor abrindo ao
 * lado do título, a grade com os filtros grudados no alto e, no fim, o
 * caminho para o outro setor.
 */
export function PaginaDoSetor({ setor }: { setor: Setor }) {
  const caminho = `/varejo/${setor.id}`;
  const aPartirDe = Math.min(...setor.pecas.map((p) => p.preco));
  const outro = dados.setores.find((s) => s.id !== setor.id);
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <CabecaDaPagina
        raiz={dados.raiz}
        caminho={[{ rotulo: setor.nome }]}
        titulo={setor.banner.titulo}
        texto={`${setor.chamada} A partir de ${formatarPreco(aPartirDe)}, em até ${dados.parcelamento.vezes}x sem juros.`}
        imagem={setor.banner}
        posicaoDaImagem={setor.banner.foco}
        acoes={
          <div data-cta-principal>
            <BotaoWhatsApp
              acao={dados.acaoPrincipal}
              rotuloDoNicho={dados.rotulo}
              tamanho="grande"
              className="w-full sm:w-auto"
            />
          </div>
        }
      />
      <GradeDoSetor
        setor={setor}
        parcelamento={dados.parcelamento}
        rotuloDoNicho={dados.rotulo}
      />
      {outro && (
        <Container largura="larga" className="pb-16">
          <div
            data-revela="texto"
            className="flex flex-col gap-4 rounded-2xl bg-superficie px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10"
          >
            <p className="text-lg font-semibold">
              Procurando para outra pessoa?
            </p>
            <VerMais href={`/varejo/${outro.id}`}>
              Ver o {outro.nome.toLowerCase()}
            </VerMais>
          </div>
        </Container>
      )}
      <ProximaPagina
        raiz={dados.raiz}
        paginas={dados.paginas}
        atual={caminho}
      />
    </>
  );
}
