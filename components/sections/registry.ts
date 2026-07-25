import type { ComponentType } from 'react'
import Hero from './Hero'
import Abstract from './Abstract'
import Monads from './Monads'
import Layers from './Layers'
import Symbols from './Symbols'
import Example from './Example'
import Benchmarks from './Benchmarks'
import Paper from './Paper'
import Editor from './Editor'
import Repos from './Repos'

export type Section = {
  id: string
  Component: ComponentType
  // Sections without a navLabel render on the page but don't get their own
  // pill — Nav still tracks their scroll position so the highlighted tab
  // stays correct while scrolling through them (see Nav.tsx).
  navLabel?: string
}

// Single source of truth for the page's content, in render order. Both
// page.tsx (composition) and Nav.tsx (pills + scroll-spy) read this array —
// a section can't exist on the page without the nav knowing about it, which
// is what let the Editor section go untracked (stale "Paper" highlight)
// when it was added straight to page.tsx without a matching Nav.tsx entry.
export const SECTIONS: Section[] = [
  { id: 'top', Component: Hero },
  { id: 'abstract', Component: Abstract, navLabel: 'Abstract' },
  { id: 'monads', Component: Monads, navLabel: 'Monads' },
  { id: 'layers', Component: Layers, navLabel: 'Layers' },
  { id: 'symbols', Component: Symbols },
  { id: 'example', Component: Example },
  { id: 'benchmarks', Component: Benchmarks, navLabel: 'Results' },
  { id: 'paper', Component: Paper, navLabel: 'Paper' },
  { id: 'editor', Component: Editor, navLabel: 'Semiotics' },
  { id: 'code', Component: Repos },
]
