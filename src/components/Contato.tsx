import { useEffect, useRef, useState, type FormEvent } from 'react'
import { emailValido, enviarPedido, LIMITES } from '../lib/contato'
import { IconeSeta } from './Icones'

type Erros = Partial<Record<'nome' | 'email', string>>
type Estado = { tipo: 'editando' } | { tipo: 'enviando' } | { tipo: 'enviado'; link: string | null } | { tipo: 'falhou' }

export function Contato() {
  const [erros, setErros] = useState<Erros>({})
  const [estado, setEstado] = useState<Estado>({ tipo: 'editando' })
  const formulario = useRef<HTMLFormElement>(null)
  const aviso = useRef<HTMLDivElement>(null)

  // Depois do envio, o foco vai para a confirmação (leitores de tela anunciam o resultado)
  useEffect(() => {
    if (estado.tipo === 'enviado') aviso.current?.focus()
  }, [estado.tipo])

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const dados = new FormData(e.currentTarget)
    const nome = String(dados.get('nome') ?? '').trim()
    const email = String(dados.get('email') ?? '').trim()
    const mensagem = String(dados.get('mensagem') ?? '').trim()

    // Campo-isca: pessoas não veem nem preenchem; robôs de spam costumam preencher.
    // Nesse caso, finge que enviou e não manda nada.
    if (String(dados.get('empresa') ?? '')) {
      setEstado({ tipo: 'enviado', link: null })
      return
    }

    const novos: Erros = {}
    if (!nome) novos.nome = 'Escreva como prefere ser chamado(a).'
    if (!email) novos.email = 'Escreva seu e-mail.'
    else if (!emailValido(email)) novos.email = 'Confira o e-mail: parece incompleto.'
    setErros(novos)
    const primeiro = Object.keys(novos)[0]
    if (primeiro) {
      formulario.current?.querySelector<HTMLElement>(`[name="${primeiro}"]`)?.focus()
      return
    }

    setEstado({ tipo: 'enviando' })
    try {
      const link = await enviarPedido({ nome, email, mensagem })
      setEstado({ tipo: 'enviado', link })
    } catch {
      setEstado({ tipo: 'falhou' })
    }
  }

  return (
    <section id="contato" className="secao contato" aria-labelledby="contato-titulo">
      <div className="recipiente contato__grade">
        <div data-revelar>
          <p className="sobretitulo">Contato e agendamento</p>
          <h2 id="contato-titulo" className="contato__titulo">
            Você não precisa ter todas as palavras para começar.
          </h2>
          <p className="contato__apoio">
            Se algo aqui fez sentido para você, podemos conversar. O primeiro contato é um espaço para tirar dúvidas e
            entender os próximos passos.
          </p>
          <p className="contato__nota">Para esse contato inicial, não é necessário compartilhar detalhes da sua história.</p>
        </div>

        <div data-revelar>
          {estado.tipo === 'enviado' ? (
            <div ref={aviso} className="contato__aviso" tabIndex={-1} role="status">
              <p className="contato__aviso-titulo">Obrigada pelo contato.</p>
              <p>
                {estado.link
                  ? 'Sua mensagem abriu no WhatsApp, já escrita. É só enviar por lá: a resposta vem assim que possível.'
                  : 'Sua mensagem foi enviada. A resposta chega no seu e-mail assim que possível.'}
              </p>
              <div className="contato__aviso-acoes">
                {estado.link && (
                  <a className="botao" href={estado.link} target="_blank" rel="noopener noreferrer">
                    Abrir o WhatsApp
                    <IconeSeta />
                  </a>
                )}
                <button type="button" className="link-sublinhado" onClick={() => setEstado({ tipo: 'editando' })}>
                  Enviar outra mensagem
                </button>
              </div>
            </div>
          ) : (
            <form ref={formulario} className="formulario" noValidate onSubmit={enviar}>
              <div className="campo">
                <label htmlFor="campo-nome">Como você gostaria de ser chamado(a)?</label>
                <input
                  id="campo-nome"
                  name="nome"
                  type="text"
                  autoComplete="given-name"
                  maxLength={LIMITES.nome}
                  placeholder="Seu nome"
                  aria-invalid={Boolean(erros.nome)}
                  aria-describedby={erros.nome ? 'erro-nome' : undefined}
                />
                {erros.nome && (
                  <p id="erro-nome" className="campo__erro">
                    {erros.nome}
                  </p>
                )}
              </div>
              <div className="campo">
                <label htmlFor="campo-email">Seu e-mail</label>
                <input
                  id="campo-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={LIMITES.email}
                  placeholder="voce@exemplo.com"
                  aria-invalid={Boolean(erros.email)}
                  aria-describedby={erros.email ? 'erro-email' : undefined}
                />
                {erros.email && (
                  <p id="erro-email" className="campo__erro">
                    {erros.email}
                  </p>
                )}
              </div>
              <div className="campo">
                <label htmlFor="campo-mensagem">O que você gostaria de saber? (opcional)</label>
                <textarea
                  id="campo-mensagem"
                  name="mensagem"
                  rows={3}
                  maxLength={LIMITES.mensagem}
                  placeholder="Deixe sua mensagem"
                />
              </div>

              {/* Campo-isca contra spam: fora da tela, fora do Tab e escondido dos leitores de tela */}
              <div className="isca" aria-hidden="true">
                <label htmlFor="campo-empresa">Empresa</label>
                <input id="campo-empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <button type="submit" className="botao formulario__enviar" disabled={estado.tipo === 'enviando'}>
                {estado.tipo === 'enviando' ? 'Enviando…' : 'Solicitar uma conversa'}
                <IconeSeta />
              </button>
              {estado.tipo === 'falhou' && (
                <p className="campo__erro" role="alert">
                  Não foi possível enviar agora. Tente de novo em instantes.
                </p>
              )}
              <p className="formulario__urgencia">
                Seus dados servem só para responder a este contato e não são compartilhados com terceiros.
              </p>
              <p className="formulario__urgencia">
                Este espaço não é um serviço de urgência. Em uma emergência, procure o serviço de saúde da sua região.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
