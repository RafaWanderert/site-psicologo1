import { depoimentos } from '../content/conteudo'

// Depoimentos FICTÍCIOS, só de exemplo. Veja o aviso em src/content/conteudo.ts antes de publicar.
export function Depoimentos() {
  return (
    <section id="depoimentos" className="secao depoimentos" aria-labelledby="depoimentos-titulo">
      <div className="recipiente">
        <div data-revelar>
          <p className="sobretitulo">Depoimentos</p>
          <h2 id="depoimentos-titulo" className="titulo-secao">
            O que fica depois de algumas conversas.
          </h2>
        </div>

        <ul className="depoimentos__lista" data-revelar>
          {depoimentos.map((d) => (
            <li key={d.autor} className="depoimento">
              <figure>
                <span className="depoimento__aspas" aria-hidden="true">
                  “
                </span>
                <blockquote className="depoimento__texto">
                  <p>{d.texto}</p>
                </blockquote>
                <figcaption className="depoimento__autor">{d.autor}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
