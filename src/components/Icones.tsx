import type { SVGProps } from 'react'

// Ícones de traço (estilo Lucide): herdam a cor do texto.
type Props = SVGProps<SVGSVGElement>

const traco: Props = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

/** ↗ dos botões (desenhada para ocupar a caixa toda, como no Figma) */
export function IconeSeta(props: Props) {
  return (
    <svg {...traco} viewBox="0 0 12 12" strokeWidth={1.6} {...props}>
      <path d="M2 10 10 2" />
      <path d="M3.5 2H10v6.5" />
    </svg>
  )
}

/** ↑ do "Voltar ao início" */
export function IconeSetaCima(props: Props) {
  return (
    <svg {...traco} viewBox="0 0 12 12" strokeWidth={1.4} {...props}>
      <path d="M6 10.5V1.8" />
      <path d="M2.6 5.2 6 1.8l3.4 3.4" />
    </svg>
  )
}

/** Câmera de vídeo: atendimento online */
export function IconeVideo(props: Props) {
  return (
    <svg {...traco} {...props}>
      <path d="m16 13 5.22 3.48a.5.5 0 0 0 .78-.42V7.87a.5.5 0 0 0-.75-.43L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  )
}

export function IconeMenu(props: Props) {
  return (
    <svg {...traco} {...props}>
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  )
}

export function IconeFechar(props: Props) {
  return (
    <svg {...traco} {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
