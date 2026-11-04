import { site } from '../content/site'

/** Selo redondo com as iniciais e o nome. Leva ao início da página. */
export function Marca() {
  return (
    <a href="#topo" className="marca">
      <span className="marca__selo" aria-hidden="true">
        {site.iniciais}
      </span>
      <span className="marca__nome">{site.nome}</span>
    </a>
  )
}
