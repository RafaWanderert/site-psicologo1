import { useEffect } from 'react'

/**
 * Revelação ao rolar: cada elemento com data-revelar sobe e aparece uma única vez,
 * quando 15% dele entra na tela. O estado inicial escondido só vale com a classe "js"
 * no <html> (posta por um script no index.html) e sem "reduzir movimento".
 */
export function useRevelar() {
  useEffect(() => {
    // Avisa o script do index.html que o app carregou (senão ele mostra tudo depois de 4 s)
    window.__revelar = true
    const alvos = document.querySelectorAll<HTMLElement>('[data-revelar]')

    if (!('IntersectionObserver' in window)) {
      alvos.forEach((alvo) => alvo.classList.add('revelado'))
      return
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue
          entrada.target.classList.add('revelado')
          observador.unobserve(entrada.target)
        }
      },
      { threshold: 0.15 },
    )
    alvos.forEach((alvo) => observador.observe(alvo))
    return () => observador.disconnect()
  }, [])
}
