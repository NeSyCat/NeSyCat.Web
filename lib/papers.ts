// Source-of-truth list of NeSyCat papers, in display order (featured first).
//
// Each entry is anything `normaliseArxivId` accepts: a bare id, an arXiv URL,
// or a doi.org URL. Add an entry, redeploy — the Papers section auto-pulls
// title / authors / abstract / categories from arXiv. Cache TTL is 24h.
export const PAPERS = [
  '2606.19279', // NeSyCat Torch — the NeSy 2026 conference paper (featured)
  '2604.24612', // NeSyCat — the categorical theory paper (foundation)
] as const

// Per-paper presentation: an optional "Code" link and whether to render it as
// the featured (more elevated) card. No eyebrow label — the cards are clean.
export const PAPER_META: Record<string, { code?: string; featured?: boolean }> = {
  '2606.19279': { code: 'https://github.com/NeSyCat', featured: true },
  '2604.24612': {},
}
