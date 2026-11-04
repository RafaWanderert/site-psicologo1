/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Opcional: endereço que recebe o formulário em JSON (Formspree, Web3Forms...). */
  readonly VITE_FORM_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  /** Camada de dados do Google Tag Manager (evento contato_enviado). */
  dataLayer?: Record<string, unknown>[]
  /** Marca que o app carregou e a revelação ao rolar está ativa. */
  __revelar?: boolean
}
