import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { seo } from './src/content/site.ts'

// Preenche os {{marcadores}} do index.html (título, descrição, domínio...) com os dados de
// src/content/site.ts: para trocar de cliente, basta editar aquele arquivo.
function dadosDoSite(): Plugin {
  const escapar = (texto: string) =>
    texto.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return {
    name: 'dados-do-site',
    transformIndexHtml: (html) =>
      html.replace(/\{\{(\w+)\}\}/g, (marcador, chave: string) =>
        Object.hasOwn(seo, chave) ? escapar(seo[chave as keyof typeof seo]) : marcador,
      ),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), dadosDoSite()],
})
