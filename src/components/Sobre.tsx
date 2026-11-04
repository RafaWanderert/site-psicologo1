import leitura480 from '../assets/img/helena-leitura-480.webp'
import leitura736 from '../assets/img/helena-leitura-736.webp'
import { trajetoria } from '../content/conteudo'
import { site } from '../content/site'

export function Sobre() {
  return (
    <section id="sobre" className="secao sobre" aria-labelledby="sobre-titulo">
      <div className="recipiente duas-colunas">
        <div data-revelar>
          <p className="sobretitulo">Sobre mim</p>
          <h2 id="sobre-titulo" className="sobre__nome">
            {site.nome}
          </h2>
          <p className="sobre__funcao">
            {site.profissao} · Abordagem psicodinâmica · {site.crp}
          </p>

          <figure className="sobre__foto">
            <div className="sobre__foto-quadro">
              <span className="sobre__foto-anel" aria-hidden="true" />
              <img
                src={leitura736}
                srcSet={`${leitura480} 480w, ${leitura736} 736w`}
                sizes="(max-width: 900px) 100vw, 482px"
                width={736}
                height={981}
                loading="lazy"
                decoding="async"
                alt={`${site.nome} lendo no sofá, com uma xícara de café na mão e um manual de psicologia ao lado`}
              />
            </div>
          </figure>
        </div>

        <div className="sobre__texto" data-revelar>
          <p className="sobre__chamada">Uma escuta atenta à sua história, não apenas ao que dói agora.</p>
          <p>
            Sou {site.nome}, psicóloga clínica de abordagem psicodinâmica. Atendo adolescentes e adultos online, em um
            espaço de escuta para falar sobre sentimentos, escolhas e relações.
          </p>
          <p>
            Escolhi a psicologia porque sempre me interessou o que fica entre as palavras: aquilo que a gente sente, mas
            ainda não sabe dizer. Na clínica, acompanho pessoas que chegam com uma dor do presente e, com o tempo,
            descobrem como ela se liga à própria história.
          </p>
          <p>
            Fora das sessões, sigo estudando. Leio, participo de grupos de estudo e faço supervisão, porque acredito que
            uma boa escuta também precisa ser cuidada. A proposta é olhar com calma para o que você vive e construir, no
            seu tempo, outras formas de compreender a si e a sua história.
          </p>

          <div className="trajetoria">
            <h3 className="trajetoria__titulo">Formação</h3>
            <ol className="trajetoria__lista">
              {trajetoria.map((item) => (
                <li key={item.ano} className="trajetoria__item">
                  <span className="trajetoria__ano">{item.ano}</span>
                  <span>{item.texto}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
