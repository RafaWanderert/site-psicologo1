import { seo, site } from '../content/site'

// Dados estruturados (schema.org) para o Google entender quem é a profissional e onde atende.
const dados = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${site.nome} — Psicóloga Clínica`,
  description: seo.descricao,
  url: `${site.url}/`,
  image: `${site.url}/og-image.jpg`,
  // Atendimento online: a área atendida é o país todo
  areaServed: { '@type': 'Country', name: 'Brasil' },
}

export function DadosEstruturados() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, '\\u003c') }}
    />
  )
}
