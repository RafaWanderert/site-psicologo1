/** Duas linhas onduladas paralelas, abaixo do título da abordagem. */
function Onda() {
  const curva = 'M1 39C9 28 18 17.7 30 17.7C51 17.7 66 40 88 40C113 40 125 1 153 1C173 1 192 12 210 22'
  return (
    <svg className="onda" viewBox="0 0 212 56" aria-hidden="true" focusable="false">
      {/* a linha nasce forte e se dissolve para a direita */}
      <defs>
        <linearGradient id="onda-degrade" x1="0" y1="0" x2="212" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#be775a" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#6f9bb3" stopOpacity="0.6" />
          <stop offset="1" stopColor="#96b3c4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={curva} />
      <path d={curva} transform="translate(0 13)" />
    </svg>
  )
}

export function Abordagem() {
  return (
    <section id="abordagem" className="secao abordagem" aria-labelledby="abordagem-titulo">
      <div className="recipiente duas-colunas">
        <div data-revelar>
          <p className="sobretitulo">A abordagem</p>
          <h2 id="abordagem-titulo" className="titulo-secao abordagem__titulo">
            Além do sintoma, a sua história.
          </h2>
          <Onda />
        </div>

        <div className="abordagem__texto" data-revelar>
          <p className="abordagem__chamada">
            A psicoterapia psicodinâmica busca compreender como experiências e sentimentos, nem sempre conscientes, se
            relacionam com o que vivemos hoje.
          </p>
          <p>
            Ao escutar o que se repete nas relações, nas escolhas e nos sofrimentos, podemos abrir espaço para novos
            sentidos. Não se trata de respostas prontas, mas de um processo construído em conjunto.
          </p>
          <p className="abordagem__frase">Compreender também é uma forma de cuidar.</p>
        </div>
      </div>
    </section>
  )
}
