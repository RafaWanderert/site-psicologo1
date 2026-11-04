import retrato480 from '../assets/img/helena-retrato-480.webp'
import retrato736 from '../assets/img/helena-retrato-736.webp'
import { site } from '../content/site'
import { IconeSeta, IconeVideo } from './Icones'

export function Inicio() {
  return (
    <section id="topo" className="inicio" aria-labelledby="inicio-titulo">
      <div className="recipiente inicio__grade">
        <div className="inicio__texto">
          <p className="sobretitulo">
            {site.profissao} · {site.abordagem}
          </p>
          <h1 id="inicio-titulo" className="inicio__titulo">
            Um espaço para olhar <em>com calma</em> para o que você vive.
          </h1>
          <p className="inicio__apoio">
            Atendimento psicológico online para adolescentes e adultos que querem olhar com calma para seus
            sentimentos, suas escolhas e suas relações.
          </p>
          <div className="inicio__acoes">
            <a href="#contato" className="botao">
              Marcar uma conversa
              <IconeSeta />
            </a>
            <a href="#abordagem" className="link-sublinhado">
              Como trabalho
            </a>
          </div>
          <p className="inicio__meta">
            <IconeVideo />
            Online · {site.publico}
          </p>
        </div>

        <figure className="retrato">
          <div className="retrato__quadro">
            {/* Linha curva no canto e a foto recortada em arco */}
            <span className="retrato__anel" aria-hidden="true" />
            <div className="retrato__arco">
              <img
                src={retrato736}
                srcSet={`${retrato480} 480w, ${retrato736} 736w`}
                sizes="(max-width: 560px) 100vw, 521px"
                width={736}
                height={1104}
                alt={`${site.nome}, psicóloga clínica, sorrindo num sofá claro`}
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
          <figcaption className="retrato__legenda">
            <span className="retrato__nome">{site.nome}</span>
            <span>{site.area}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
