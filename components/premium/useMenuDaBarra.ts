"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * O menu do celular das barras das páginas internas dos sites premium: fecha
 * com clique fora, com Esc (o foco volta ao botão) e quando a página muda,
 * porque a barra fica no layout e não remonta na navegação.
 */
export function useMenuDaBarra() {
  const [aberto, setAberto] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);
  const painel = useRef<HTMLDivElement>(null);
  const caminho = usePathname();
  const [caminhoDoMenu, setCaminhoDoMenu] = useState(caminho);

  // Trocou de página com o menu aberto: fecha (ajuste durante a renderização,
  // sem efeito, como a documentação do React recomenda).
  if (caminho !== caminhoDoMenu) {
    setCaminhoDoMenu(caminho);
    setAberto(false);
  }

  useEffect(() => {
    if (!aberto) return;
    const aoClicar = (e: MouseEvent) => {
      const alvo = e.target as Node;
      if (!painel.current?.contains(alvo) && !botao.current?.contains(alvo)) {
        setAberto(false);
      }
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        botao.current?.focus();
      }
    };
    document.addEventListener("click", aoClicar);
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("click", aoClicar);
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto]);

  return {
    aberto,
    alternar: () => setAberto((v) => !v),
    fechar: () => setAberto(false),
    botao,
    painel,
    caminho,
  };
}
