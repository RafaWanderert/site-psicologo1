import { site } from '../content/site'

export type Pedido = { nome: string; email: string; mensagem: string }

/** Tamanho máximo de cada campo (o formulário limita, e o envio corta de novo por garantia). */
export const LIMITES = { nome: 80, email: 120, mensagem: 1000 } as const

function limitar({ nome, email, mensagem }: Pedido): Pedido {
  return {
    nome: nome.slice(0, LIMITES.nome),
    email: email.slice(0, LIMITES.email),
    mensagem: mensagem.slice(0, LIMITES.mensagem),
  }
}

/** Endereço opcional (Formspree, Web3Forms...) que recebe o formulário em JSON. Veja o README. */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`
}

export function montarMensagem({ nome, email, mensagem }: Pedido): string {
  const linhas = [`Olá, ${site.primeiroNome}! Vim pelo site e gostaria de conversar.`, '', `Nome: ${nome}`, `E-mail: ${email}`]
  if (mensagem) linhas.push('', mensagem)
  return linhas.join('\n')
}

export function emailValido(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

/** Registra o envio no dataLayer, que o Google Tag Manager lê. */
function registrar(canal: 'email' | 'whatsapp') {
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event: 'contato_enviado', canal })
}

/**
 * Com VITE_FORM_ENDPOINT configurado, envia o pedido em JSON para esse endereço.
 * Sem ele, abre o WhatsApp da psicóloga com a mensagem já escrita.
 * Devolve o link do WhatsApp (para mostrar de novo na confirmação) ou null.
 */
export async function enviarPedido(entrada: Pedido): Promise<string | null> {
  const pedido = limitar(entrada)
  if (ENDPOINT) {
    const resposta = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(pedido),
    })
    if (!resposta.ok) throw new Error(`Falha no envio (${resposta.status})`)
    registrar('email')
    return null
  }
  const link = linkWhatsApp(montarMensagem(pedido))
  window.open(link, '_blank', 'noopener,noreferrer')
  registrar('whatsapp')
  return link
}
