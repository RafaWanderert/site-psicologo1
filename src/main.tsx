import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Lora (títulos) e Inter (texto), do Google Fonts, servidas pelo próprio site com font-display: swap
import '@fontsource-variable/lora/wght.css'
import '@fontsource-variable/lora/wght-italic.css'
import '@fontsource-variable/inter/wght.css'
import './index.css'
import App from './App.tsx'

const raiz = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// No build, o HTML já vem pré-renderizado: o React só "acorda" a página.
if (raiz.hasChildNodes()) hydrateRoot(raiz, app)
else createRoot(raiz).render(app)
