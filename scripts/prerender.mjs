// Pré-renderização: depois do build, gera o HTML completo da página
// (bom para o Google e para a página aparecer antes do JavaScript carregar).
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { loadEnv } from 'vite'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const raiz = resolve(import.meta.dirname, '..')
const dist = resolve(raiz, 'dist')
const ssr = resolve(raiz, 'dist-ssr')

const { render } = await import(pathToFileURL(resolve(ssr, 'entry-server.js')).href)

const arquivo = resolve(dist, 'index.html')
let html = readFileSync(arquivo, 'utf8')
const marcador = '<div id="root"></div>'
if (!html.includes(marcador)) throw new Error('dist/index.html sem <div id="root"></div>')
html = html.replace(marcador, `<div id="root">${render()}</div>`)

// Pré-carrega as fontes da primeira tela (Lora nos títulos, Inter no texto),
// para a página já aparecer na letra certa
const assets = readdirSync(resolve(dist, 'assets'))
const fontes = [/^lora-latin-wght-normal-.+\.woff2$/, /^inter-latin-wght-normal-.+\.woff2$/]
  .map((padrao) => assets.find((f) => padrao.test(f)))
  .filter(Boolean)
if (fontes.length !== 2) throw new Error('Fontes da primeira tela não encontradas em dist/assets')
const preloads = fontes
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ')
html = html.replace('</head>', `  ${preloads}\n  </head>`)

writeFileSync(arquivo, html)
rmSync(ssr, { recursive: true, force: true })

// Cabeçalhos de segurança (arquivo _headers: Cloudflare Pages e Netlify leem direto).
// A CSP libera só o que o site usa: arquivos do próprio domínio e o script inline do <head>,
// identificado pelo hash. Se o conteúdo desse script mudar, o hash é recalculado aqui.
const inline = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(
  (m) => `'sha256-${createHash('sha256').update(m[1]).digest('base64')}'`,
)
// O formulário pode enviar para um serviço externo (VITE_FORM_ENDPOINT): libera só a origem dele
const endpoint = loadEnv('production', raiz, 'VITE_').VITE_FORM_ENDPOINT
const conexoes = ["'self'", endpoint ? new URL(endpoint).origin : null].filter(Boolean).join(' ')
// Para usar o Google Tag Manager, acrescente https://www.googletagmanager.com em script-src,
// img-src e connect-src (e os domínios do Google Analytics, se usar).
const csp = [
  "default-src 'self'",
  `script-src 'self' ${inline.join(' ')}`,
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  `connect-src ${conexoes}`,
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

// No Render, os cabeçalhos ficam no render.yaml (o Render lê esse arquivo antes do build).
// Aqui só conferimos se a CSP de lá é a mesma calculada agora; se não for, o build para
// e mostra a linha certa para colar no render.yaml.
const blueprint = readFileSync(resolve(raiz, 'render.yaml'), 'utf8')
if (!blueprint.includes(`value: "${csp}"`)) {
  throw new Error(
    `A CSP do render.yaml está desatualizada. Troque o value do Content-Security-Policy por:\n  value: "${csp}"`,
  )
}
console.log('CSP do render.yaml confere com a página')
console.log(`Pré-renderizado: dist/index.html (${Math.round(html.length / 1024)} KB)`)
