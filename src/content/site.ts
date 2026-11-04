// Dados da profissional. Para usar o modelo com outra cliente, troque os valores deste arquivo:
// eles aparecem no site, na mensagem do formulário, no <head> (título, descrição, Open Graph)
// e nos dados estruturados para o Google. Os dados abaixo são fictícios.

export const site = {
  nome: 'Helena Mendes',
  primeiroNome: 'Helena',
  /** Letras do selo redondo da marca */
  iniciais: 'hm',
  profissao: 'Psicóloga clínica',
  area: 'Psicologia clínica',
  crp: 'CRP XX/XXXXX',
  abordagem: 'Psicodinâmica',
  publico: 'Adolescentes e adultos',
  /** Só dígitos: 55 + DDD + número. O formulário envia a mensagem para este WhatsApp. */
  whatsapp: '5500000000000',
  /** Domínio do site, sem barra no fim. example.com é um domínio reservado para exemplos. */
  url: 'https://example.com',
}

/** Usado no <head> do index.html (pelo vite.config.ts) e nos dados estruturados. */
export const seo: Record<'nome' | 'titulo' | 'descricao' | 'url', string> = {
  nome: site.nome,
  titulo: `${site.nome} — Psicóloga Clínica | Abordagem Psicodinâmica`,
  descricao: `${site.nome}, psicóloga clínica (${site.crp}). Atendimento psicológico online, de abordagem psicodinâmica, para adolescentes e adultos.`,
  url: site.url,
}
