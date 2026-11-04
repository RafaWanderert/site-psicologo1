import { passos } from '../content/conteudo'

export function Processo() {
  return (
    <section id="processo" className="secao processo" aria-labelledby="processo-titulo">
      <div className="recipiente">
        <div className="cabeca processo__cabeca" data-revelar>
          <div>
            <p className="sobretitulo">Como funciona</p>
            <h2 id="processo-titulo" className="titulo-secao">
              Um começo, passo a passo.
            </h2>
          </div>
          <p className="cabeca__apoio processo__apoio">Atendimento online para adolescentes e adultos.</p>
        </div>

        <ol className="passos" data-revelar>
          {passos.map((passo, i) => (
            <li key={passo.titulo} className="passo">
              <span className="passo__numero" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="passo__titulo">{passo.titulo}</h3>
              <p className="passo__texto">{passo.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
