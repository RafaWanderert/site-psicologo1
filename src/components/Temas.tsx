import { temas } from '../content/conteudo'

export function Temas() {
  return (
    <section id="temas" className="secao temas" aria-labelledby="temas-titulo">
      <div className="recipiente">
        <div className="cabeca" data-revelar>
          <div>
            <p className="sobretitulo">Temas que acompanho</p>
            <h2 id="temas-titulo" className="titulo-secao">
              Motivos comuns para procurar ajuda
            </h2>
          </div>
          <p className="cabeca__apoio temas__apoio">
            Cada caso é de um jeito. Estes são alguns motivos frequentes — e você não precisa ter tudo definido para
            começar.
          </p>
        </div>

        <ul className="temas__lista" data-revelar>
          {temas.map((tema) => (
            <li key={tema.nome} className="tema">
              <h3 className="tema__nome">{tema.nome}</h3>
              <p className="tema__texto">{tema.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
