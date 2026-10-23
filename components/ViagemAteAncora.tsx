"use client";

import { useEffect } from "react";
import { rolarAte } from "@/lib/movimento";

/**
 * Troca o salto seco dos links de âncora (#como-funciona, #cardapio, #topo…)
 * pela viagem animada de rolarAte, em todas as páginas. Vale só para links
 * da própria página, num clique simples: com Ctrl/Shift/Cmd, botão do meio
 * ou target, o navegador faz o de sempre. Na chegada, o foco vai para a
 * seção, para quem navega pelo teclado ou leitor de tela continuar dali.
 *
 * O clique é ouvido na captura, antes do <Link> do Next: ao ver o
 * preventDefault, o Link desiste do salto dele e a viagem assume. Os onClick
 * dos próprios links (fechar o menu do celular, por exemplo) rodam igual.
 */
export function ViagemAteAncora() {
  useEffect(() => {
    function aoClicar(evento: MouseEvent) {
      if (
        evento.defaultPrevented ||
        evento.button !== 0 ||
        evento.metaKey ||
        evento.ctrlKey ||
        evento.shiftKey ||
        evento.altKey ||
        !(evento.target instanceof Element)
      )
        return;
      const link = evento.target.closest<HTMLAnchorElement>("a[href*='#']");
      if (!link || (link.target && link.target !== "_self")) return;

      const url = new URL(link.href);
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search ||
        !url.hash
      )
        return;
      const alvo = document.getElementById(
        decodeURIComponent(url.hash.slice(1)),
      );
      if (!alvo) return;

      evento.preventDefault();
      if (url.hash === location.hash) history.replaceState(null, "", url.hash);
      else history.pushState(null, "", url.hash);

      void rolarAte(alvo).then(() => {
        if (!alvo.hasAttribute("tabindex")) {
          alvo.setAttribute("tabindex", "-1");
          alvo.addEventListener(
            "blur",
            () => alvo.removeAttribute("tabindex"),
            { once: true },
          );
        }
        alvo.focus({ preventScroll: true });
      });
    }

    document.addEventListener("click", aoClicar, true);
    return () => document.removeEventListener("click", aoClicar, true);
  }, []);

  return null;
}
