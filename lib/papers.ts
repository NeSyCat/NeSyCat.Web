// Source-of-truth list of NeSyCat papers, in display order.
//
// Each entry is anything `normaliseArxivId` accepts: a bare id, an arXiv URL,
// or a doi.org URL. Add a new entry, redeploy — the Papers section auto-pulls
// title / authors / abstract / categories from arXiv and renders the new
// entry. Cache TTL on the fetch is 24h.
export const PAPERS = [
  '2604.24612',
] as const
