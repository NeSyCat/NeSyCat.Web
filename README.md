# NeSyCat.Web

Source for the NeSyCat umbrella site, deployed at **[nesycat.com](https://nesycat.com)**.

NeSyCat ("Neuro-Symbolic Category") applies category-theoretic results — already proven — to
neuro-symbolic AI, structured as a bridge between categorical-logic syntax/semantics and the
Haskell type system. The site is a single-page entry point for the three pillars:

- **Logic** — the formal core. Paper: *NeSyCat: A Monad-Based Categorical Semantics of the Neurosymbolic ULLER Framework* (Romero Schellhorn & Mossakowski, 2026), [arXiv:2604.24612][paper].
- **AI** — the Haskell reference implementation, [github.com/NeSyCat][gh].
- **Semiotics** — the in-browser string-diagram editor, [semiotics.nesycat.com][editor]. Source in the sibling [NeSyCat.Semiotics][semiotics] repo.

[paper]: https://doi.org/10.48550/arXiv.2604.24612
[gh]: https://github.com/NeSyCat
[editor]: https://semiotics.nesycat.com
[semiotics]: https://github.com/NeSyCat/NeSyCat.Semiotics

## Adding a new paper

Append an arXiv id (or full DOI / abs URL) to `lib/papers.ts`:

```ts
export const PAPERS = [
  '2604.24612',
  // 'YYMM.NNNNN',
] as const
```

The Papers section is an async server component. At deploy time and every 24 hours thereafter,
each entry is fetched from `https://export.arxiv.org/api/query`, parsed for title, authors,
abstract, and categories, and rendered as a card with a generated BibTeX entry. Failed fetches
degrade to a small fallback card so one rate-limited id doesn't break the page.

## Local dev

```bash
npm install
npm run dev    # http://localhost:3000
```

## Stack

- Next.js 16 (App Router, Turbopack) + Tailwind v4
- Geist + Geist Mono via `next/font/google`
- Vercel Analytics + Speed Insights

## Branch + PR strategy

`staging` is the integration branch. Feature branch → PR into `staging` → promote `staging` →
`main`. Don't push directly to `main` or `staging`. The Vercel project auto-deploys from `main`.
