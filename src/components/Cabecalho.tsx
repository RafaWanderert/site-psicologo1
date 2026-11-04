import { useEffect, useRef, useState } from 'react'
import { IconeFechar, IconeMenu, IconeSeta } from './Icones'
import { Marca } from './Marca'

const links = [
  { href: '#sobre', rotulo: 'Sobre' },
  { href: '#temas', rotulo: 'Temas' },
  { href: '#abordagem', rotulo: 'Abordagem' },
  { href: '#processo', rotulo: 'Processo' },
  { href: '#contato', rotulo: 'Contato' },
]

export function Cabecalho() {
  const [aberto, setAberto] = useState(false)
  const cabecalho = useRef<HTMLElement>(null)
  const botao = useRef<HTMLButtonElement>(null)
  const fechar = () => setAberto(false)

  // Com o painel aberto: Esc fecha (e devolve o foco ao botão), tocar fora fecha,
  // e alargar a tela até o menu completo também fecha.
  useEffect(() => {
    if (!aberto) return
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setAberto(false)
      botao.current?.focus()
    }
    const aoTocarFora = (e: PointerEvent) => {
      if (!cabecalho.current?.contains(e.target as Node)) setAberto(false)
    }
    const largo = window.matchMedia('(width > 1080px)')
    const aoAlargar = () => {
      if (largo.matches) setAberto(false)
    }
    document.addEventListener('keydown', aoTeclar)
    document.addEventListener('pointerdown', aoTocarFora)
    largo.addEventListener('change', aoAlargar)
    return () => {
      document.removeEventListener('keydown', aoTeclar)
      document.removeEventListener('pointerdown', aoTocarFora)
      largo.removeEventListener('change', aoAlargar)
    }
  }, [aberto])

  return (
    <header ref={cabecalho} className="cabecalho">
      <div className="recipiente cabecalho__linha">
        <Marca />

        <nav aria-label="Principal" className="menu">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.rotulo}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="cabecalho__acoes">
          <a href="#contato" className="botao botao--claro cabecalho__agendar">
            Agendar uma conversa
            <IconeSeta />
          </a>
          <button
            ref={botao}
            type="button"
            className="hamburguer"
            aria-label="Menu"
            aria-expanded={aberto}
            aria-controls="menu-movel"
            onClick={() => setAberto((a) => !a)}
          >
            {aberto ? <IconeFechar /> : <IconeMenu />}
          </button>
        </div>
      </div>

      {/* Até 1080px: os mesmos links num painel aberto pelo botão acima */}
      <nav id="menu-movel" aria-label="Principal" className="menu-movel" data-aberto={aberto}>
        <ul className="recipiente">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={fechar}>
                {l.rotulo}
              </a>
            </li>
          ))}
          <li className="menu-movel__agendar">
            <a href="#contato" className="botao" onClick={fechar}>
              Agendar uma conversa
              <IconeSeta />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
