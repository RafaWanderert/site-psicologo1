import { site } from '../content/site'
import { IconeSetaCima } from './Icones'
import { Marca } from './Marca'

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="recipiente rodape__linha">
        <Marca />
        <p className="rodape__centro">
          {site.area} · Abordagem psicodinâmica · {site.crp}
        </p>
        <a href="#topo" className="rodape__topo">
          Voltar ao início
          <IconeSetaCima />
        </a>
        <p className="rodape__portfolio">
          Projeto de portfólio. A profissional, os dados e os depoimentos são fictícios.
        </p>
      </div>
    </footer>
  )
}
