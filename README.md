# NeSyCat.Web

The umbrella site for the **NeSyCat** project — *Neuro-Symbolic Category*: a bridge between
category theory and neuro-symbolic AI.

Lives at **[nesycat.com](https://nesycat.com)**.

NeSyCat is built around three pillars, each with its own home:

- **Theory** — the formal account, on arXiv: <https://doi.org/10.48550/arXiv.2604.24612>
- **HaskTorch** — the Haskell reference implementation: <https://github.com/NeSyCat>
- **Semiotics** — the in-browser string-diagram editor: <https://semiotics.nesycat.com>

This repo is just the marketing/info site. The editor and the Haskell code live in their own
repos under [github.com/NeSyCat](https://github.com/NeSyCat).

## Local dev

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Stack

- Next.js 16 (App Router, Turbopack)
- Tailwind v4
- Geist + Geist Mono via `next/font/google`
- Vercel Analytics + Speed Insights

## Branch + PR strategy

- `staging` is the integration branch. PRs go to `staging`, then promoted to `main`.
- Don't push directly to `main` or `staging`.
