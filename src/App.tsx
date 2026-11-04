import { Abordagem } from './components/Abordagem'
import { Cabecalho } from './components/Cabecalho'
import { Contato } from './components/Contato'
import { DadosEstruturados } from './components/DadosEstruturados'
import { Depoimentos } from './components/Depoimentos'
import { Faixa } from './components/Faixa'
import { Inicio } from './components/Inicio'
import { Processo } from './components/Processo'
import { Rodape } from './components/Rodape'
import { Sobre } from './components/Sobre'
import { Temas } from './components/Temas'
import { useRevelar } from './hooks/useRevelar'

export default function App() {
  useRevelar()

  return (
    <>
      <a className="pular" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo">
        <Inicio />
        <Faixa />
        <Temas />
        <Sobre />
        <Abordagem />
        <Processo />
        <Depoimentos />
        <Contato />
      </main>
      <Rodape />
      <DadosEstruturados />
    </>
  )
}
