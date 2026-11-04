# Site_Psicólogo1

Landing page de página única para uma psicóloga clínica. O atendimento é online, com abordagem
psicodinâmica. O visual segue o layout que o Rafa montou no Figma (prints de 04/11/2026): azul-claro e
branco, títulos em **Lora** e texto em **Inter**.
É um **modelo de demonstração**: a psicóloga Helena Mendes, o CRP e o WhatsApp são **fictícios**.

Feito com **React 19 + TypeScript + Tailwind CSS 4**, empacotado com **Vite 8**. O build pré-renderiza
a página: o HTML já sai completo (bom para o Google e para abrir rápido) e o React só "acorda" a página.

## Como rodar

```bash
npm install
npm run dev       # desenvolvimento: http://localhost:5173
npm run build     # gera dist/ (checa os tipos, compila e pré-renderiza)
npm run preview   # serve o dist/ em http://localhost:4173
npm run lint      # oxlint
```

## Onde mudar as coisas

| O quê | Onde |
| --- | --- |
| Nome, CRP, iniciais do selo, WhatsApp, domínio | `src/content/site.ts` |
| Temas e etapas do "Como funciona" | `src/content/conteudo.ts` |
| Textos de cada seção | `src/components/*.tsx` |
| Cores, fontes, tamanhos e espaçamentos | `src/index.css` |
| Foto | `src/assets/img/` |
| Imagem de compartilhamento (1200×630) | `public/og-image.jpg` |

O título, a descrição, o Open Graph e o canonical do `<head>` também saem de `src/content/site.ts`:
o `vite.config.ts` preenche os `{{marcadores}}` do `index.html` com esses dados.

## Seções (na ordem do Figma)

1. Cabeçalho com o selo "hm", o menu e o botão "Agendar uma conversa".
2. Abertura com a foto recortada em arco.
3. Faixa "Um espaço seguro para falar e se escutar."
4. Temas, em duas colunas.
5. Sobre.
6. A abordagem, na faixa azul, com as linhas onduladas.
7. Como funciona, em 3 passos.
8. Contato, com o formulário.
9. Rodapé.

## Formulário

O formulário valida nome e e-mail e mostra uma confirmação. Sem servidor, o envio abre o WhatsApp da
psicóloga com a mensagem pronta (nome, e-mail e mensagem); o número fica em `site.ts`.
Para receber por e-mail, crie um formulário no [Formspree](https://formspree.io) ou no
[Web3Forms](https://web3forms.com) e um arquivo `.env` com:

```
VITE_FORM_ENDPOINT=https://formspree.io/f/SEU_ID
```

Cada envio registra o evento `contato_enviado` no `window.dataLayer`, para o Google Tag Manager.
O lugar do snippet do GTM está comentado no `index.html`.

## Diferenças em relação ao Figma

Na largura de 1440px o site foi comparado pixel a pixel com os prints. A página tem a mesma altura
(3589px), e cada seção começa no mesmo pixel. As linhas de texto ficam a até 2px da posição no Figma.

O que muda, de propósito:

- **CRP:** entrou na linha "Psicóloga clínica · Abordagem psicodinâmica" do Sobre e no centro do rodapé.
  O Código de Ética do psicólogo (art. 20) pede nome completo e CRP em toda divulgação.
- **Contraste AA:** três textos pequenos ficaram um pouco mais escuros:
  - o centro do rodapé (no Figma, 3,5:1);
  - a legenda da foto (4,4:1);
  - as notas do contato (no limite).
- **Telas menores** (o Figma só tem a versão de 1440px):
  - até 1080px, o menu vira um botão que abre um painel;
  - até 900px, as colunas se empilham;
  - até 560px, o "Agendar uma conversa" vai para dentro do painel, e os campos do formulário usam
    16px, para o iPhone não dar zoom ao tocar.
- **Cabeçalho:** fica fixo no topo ao rolar.
- **Aparecimento:** as seções aparecem com um leve movimento ao rolar, que desliga com
  "reduzir movimento".

## Cuidados éticos (CFP)

O site mostra nome, a palavra "psicóloga" e o CRP. Não promete resultado, não usa preço nem
"gratuito", não tem depoimentos e avisa que não é um serviço de urgência. As regras de divulgação estão
no Código de Ética Profissional do Psicólogo, art. 20. O atendimento online segue a Resolução CFP
nº 9/2024.

## Foto

`helena-retrato-*.webp` é a foto fornecida (de `OneDrive\Imagens`), convertida para WebP, com o mesmo
enquadramento do Figma. Para publicar, use fotos da cliente ou com autorização da pessoa retratada.

## Publicar

`npm run build` e envie a pasta `dist/` para Vercel, Netlify ou qualquer hospedagem estática.
O site espera ficar na raiz do domínio. Para uma subpasta (como no GitHub Pages), defina `base` em
`vite.config.ts` e ajuste o caminho das fontes em `scripts/prerender.mjs`.

## Versões anteriores

Ficam guardadas em `.taste-skill/`:
- `versao-anterior-clara-lins.zip`: a primeira versão (TCC, azul e branco);
- `versao-anterior-helena-linho.zip`: a versão em linho e verde-petróleo, feita a partir do roteiro.

## Verificação (04/11/2026)

- **Lighthouse 12.8:**
  - celular: desempenho 97, acessibilidade 100, boas práticas 100 e SEO 100;
  - desktop: 100 nos quatro.
- **Testes de interação:** 52 conferências em 1440, 1024, 768, 390 e 360px, sem erro no console.
  Cobrem:
  - âncoras e cabeçalho fixo;
  - menu do celular (abre, fecha com Esc e tocando fora);
  - validação e envio do formulário;
  - navegação por teclado;
  - "reduzir movimento";
  - página sem JavaScript;
  - nenhuma largura com rolagem horizontal.
