# Portal de Notícias — Frontend (Next.js 14)

## Como rodar localmente

```bash
# 1. Instale as dependências
npm install

# 2. Copie o arquivo de variáveis de ambiente
cp .env.local.example .env.local

# 3. Edite o .env.local com a URL do seu backend Java
# API_URL=http://localhost:8080

# 4. Inicie o servidor de desenvolvimento
npm run dev

# Acesse: http://localhost:3000
```

---

## Estrutura de arquivos explicada

```
app/
  layout.tsx              ← Envolve TUDO: HTML, body, Navbar, Footer
  globals.css             ← Fontes, cores (CSS variables), estilos globais
  page.tsx                ← / (Página inicial com destaques e listas)
  not-found.tsx           ← 404 personalizado

  noticias/[slug]/
    page.tsx              ← /noticias/titulo-da-noticia (dinâmico)

  sobre/page.tsx          ← /sobre
  pessoas/page.tsx        ← /pessoas
  direitos/page.tsx       ← /direitos

components/
  Navbar.tsx              ← Barra de navegação (client component — tem estado)
  Footer.tsx              ← Rodapé (server component — sem estado)
  CardNoticia.tsx         ← 3 variantes: Destaque, Normal, Grid
  CardPessoa.tsx          ← Card da equipe

lib/
  api.ts                  ← TODAS as chamadas ao backend Java

types/
  index.ts                ← Tipos TypeScript (Noticia, Pessoa, etc.)
```

---

## Conceitos importantes do Next.js 14

### Server Components vs Client Components

- **Server Component** (padrão): Executa no servidor. Pode usar async/await diretamente.
  Bom para buscar dados. Não pode usar hooks como useState.
  
- **Client Component** (`"use client"` no topo): Executa no navegador.
  Pode usar useState, useEffect, eventos onClick. Necessário para interatividade.

### Cache e revalidação (ISR)

```typescript
// Atualiza a cada 60 segundos automaticamente
fetch(url, { next: { revalidate: 60 } })

// Nunca usa cache (sempre busca ao vivo)
fetch(url, { cache: "no-store" })

// Cache permanente (não muda)
fetch(url, { cache: "force-cache" })
```

### generateStaticParams

Pré-renderiza as páginas mais acessadas no momento do build.
As demais são geradas sob demanda na primeira visita.

### generateMetadata

Gera `<title>` e `<meta>` únicos por página — essencial para SEO em portais de notícias.

---

## Para fazer o deploy na Vercel

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Faça o deploy (na primeira vez, cria o projeto)
vercel

# Em produção
vercel --prod
```

Na Vercel, adicione a variável de ambiente:
- `API_URL` = URL do seu backend no Railway/Render

---

## Adicionando novas páginas

Crie um arquivo em `app/nova-pagina/page.tsx` — pronto, a rota `/nova-pagina` existe.

```typescript
// app/nova-pagina/page.tsx
export default function NovaPagina() {
  return <div>Conteúdo aqui</div>
}
```

---

## Customizando o visual

Edite as CSS variables em `app/globals.css`:

```css
:root {
  --cor-fundo: #F7F4EF;      /* cor de fundo */
  --cor-acento: #C0392B;     /* cor principal (vermelho jornal) */
  --fonte-titulo: 'Playfair Display', serif;
}
```
