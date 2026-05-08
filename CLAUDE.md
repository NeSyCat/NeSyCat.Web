# NeSyCat.Web — Claude Code instructions

## What this repo is

The marketing/info site for the **NeSyCat** project, deployed at **[nesycat.com](https://nesycat.com)**.
It is *not* the diagram editor; that lives in the sibling repo `NeSyCat.Semiotics` and is deployed
at **[semiotics.nesycat.com](https://semiotics.nesycat.com)**. This site links out to:

- **Theory paper**: <https://doi.org/10.48550/arXiv.2604.24612>
- **HaskTorch** (Haskell implementation): <https://github.com/NeSyCat>
- **Semiotics** (diagram editor): <https://semiotics.nesycat.com>

## This is NOT the Next.js you know

Next.js 16 has breaking changes — APIs, conventions, and file structure may differ from your
training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code.
Heed deprecation notices.

## Folder structure

- `app/page.tsx` — single-page landing, composes the section components.
- `app/layout.tsx` — fonts, metadata, Analytics + SpeedInsights mount.
- `app/globals.css` — design tokens (`--color-*`) and `.t-*` typography utilities.
- `components/Logo.tsx` — inline brand mark.
- `components/Buttons.tsx` — `LinkButton`, `OpenEditorButton`, `GitHubIcon`.
- `components/sections/*` — one file per section: `Nav`, `Hero`, `About`, `Pillars`, `Layers`,
  `Paper`, `Repos`, `Footer`.

## Source of truth for site copy

All technical content (abstract excerpts, layer descriptions, framework positioning) is sourced
from the NeSyCat theory paper at `/Users/cherryfunk/Repos/NeSyCat/NeSyCat.Logic/3. NeSyCat
Theory/nesycat-theory copy.tex`. When adding or revising content, quote or lightly paraphrase
from the paper rather than fabricating new claims.

## Branch + PR strategy

- `staging` is the integration branch. PRs go to `staging`, then promoted to `main`.
- Don't push directly to `main` or `staging`.
- The repo lives at `NeSyCat/NeSyCat.Web` on GitHub.

## Deployment

- Production: `https://nesycat.com` (and `https://www.nesycat.com`)
- Hosted on Vercel; DNS authoritative there.
- Local dev: `npm run dev` on the default port 3000.
