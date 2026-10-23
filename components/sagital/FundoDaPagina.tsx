import { RETICULA_DA_PAGINA } from "@/lib/reticula";
import { FundoReticulado } from "./FundoReticulado";

/**
 * O fundo da página inicial: a retícula do feixe diagonal, presa à tela e
 * um quarto mais alta que ela, e o grão de papel por cima. Ao rolar, a
 * retícula sobe devagar (só CSS, ligado à rolagem da página) e o feixe vai
 * saindo pelo alto, deixando o meio da página mais calmo para a leitura.
 */
export function FundoDaPagina() {
  return (
    <>
      <div aria-hidden className="sg-fundo-fixo">
        <FundoReticulado opcoes={RETICULA_DA_PAGINA} />
      </div>
      <div aria-hidden className="sg-grao" />
    </>
  );
}
