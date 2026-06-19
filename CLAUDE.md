# NeSyCat.Web — Claude Code instructions

## What this repo is

The marketing/info site for the **NeSyCat** project, deployed at **[nesycat.org](https://nesycat.org)**.
It is *not* the diagram editor; that lives in the sibling repo `NeSyCat.Semiotics` and is deployed
at **[semiotics.nesycat.org](https://semiotics.nesycat.org)**. This site links out to:

- **Theory paper**: <https://doi.org/10.48550/arXiv.2604.24612>
- **HaskTorch** (Haskell implementation): <https://github.com/NeSyCat>
- **Semiotics** (diagram editor): <https://semiotics.nesycat.org>

## This is NOT the Next.js you know

Next.js 16 has breaking changes — APIs, conventions, and file structure may differ from your
training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code.
Heed deprecation notices.

## Folder structure

- `app/page.tsx` — single-page landing, composes the section components.
- `app/layout.tsx` — fonts, metadata, Analytics + SpeedInsights, and the live design-system import.
- `app/globals.css` — imports Tailwind and defines NeSyCat-only helpers on top of the design system
  (`.t-display`, `.t-eyebrow`, `.t-lead`, `.t-num`, `.t-code`, `.surface`, `.split-2`). It does NOT
  define color/spacing/shadow tokens — those come from the Admination DS (see "Design system").
- `components/Logo.tsx` — inline brand mark.
- `components/Buttons.tsx` — `LinkButton`, `OpenEditorButton`, `GitHubIcon`, `EditorIcon` (DS pill `.btn`).
- `components/sections/*` — one file per section: `Nav`, `Hero`, `Abstract`, `Monads`, `Layers`,
  `Symbols`, `Example`, `Benchmarks`, `Paper`, `Repos`, `Footer`.
- `vendor/Admination.02-Design` — git submodule holding the Admination design system (see "Design system").

## Design system — the Admination DS, consumed live (don't copy it)

The visual language is the **Admination design system**, referenced (never copied) as the single
source of truth:

- It's a git **submodule** at `vendor/Admination.02-Design` (repo `Admination-de/design.admination`),
  exposed as the `admination-design-system` package via a `file:` dependency, and pulled in by
  `app/layout.tsx` (`import "admination-design-system/components/index.css"`) so Turbopack inlines the
  real DS CSS. (Tailwind's own `@import` drops the DS's nested `url(...)` chain — don't route it there.)
- All colors, spacing, radii, shadows, motion and the `.btn`/`.card`/`.pill`/`.section`/… classes
  live in the DS. Use its tokens via `var(--…)`; **never hardcode hex, never re-add the old
  dark-glass tokens.** To change the look, edit the DS (submodule or its repo) — not this site.
- After cloning, run `git submodule update --init`. Locally the DS resolves through the in-repo
  symlink `node_modules/admination-design-system → vendor/…`; on Vercel the deploying team needs
  GitHub access to the (private) submodule repo. Mirrors how `Admination.01-Tech.V2` consumes it.

## Source of truth for site copy

The site is built around the **NeSy 2026 conference paper "NeSyCat Torch"** at
`/Users/cherryfunk/Repos/NeSyCat/NeSyCat.Logic/5. NeSyCat Torch/Conference Paper (NeSy26)/nesy2026-paper.tex`
— Hero, Abstract, Monads, Layers (four), Symbols, Example and Benchmarks all quote or paraphrase it.
The foundational categorical **theory paper** (`3. NeSyCat Theory/nesycat-theory copy.tex`,
arXiv 2604.24612) is the secondary source, featured as the "foundation" paper. When adding or
revising content, quote or lightly paraphrase from these papers rather than fabricating claims.

## Branch + PR strategy

- `main` is the production branch — merging to it deploys to production (nesycat.org) on Vercel.
- Work on feature branches and open a PR into `main`. Every PR/branch gets an automatic Vercel
  preview deploy.
- Don't push directly to `main`.
- The repo lives at `NeSyCat/NeSyCat.Web` on GitHub.

## Deployment

- Production: `https://nesycat.org` (and `https://www.nesycat.org`)
- Hosted on Vercel; DNS authoritative there.
- Local dev: `npm run dev` on the default port 3000.
