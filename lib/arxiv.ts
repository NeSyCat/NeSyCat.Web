// arXiv Atom feed fetcher.
//
// Given any of: a bare arXiv id (`2604.24612`), an `arXiv:` prefix, an
// `https://arxiv.org/abs/...` URL, or an `https://doi.org/10.48550/arXiv...`
// DOI URL, we normalise to the bare id and hit
// `https://export.arxiv.org/api/query?id_list=ID`. The response is a small,
// predictably-structured Atom XML document; we extract fields by regex
// rather than pull in an XML parser.
//
// Caching: Next.js fetch with `revalidate: 86400` (24h). One arXiv request
// per paper per day, regardless of traffic.

export type ArxivPaper = {
  id: string                // bare id, e.g. "2604.24612"
  title: string
  authors: string[]
  abstract: string
  categories: string[]
  primaryCategory?: string
  published: string         // ISO date
  arxivUrl: string          // https://arxiv.org/abs/<id>
  pdfUrl: string            // https://arxiv.org/pdf/<id>
  doiUrl: string            // https://doi.org/10.48550/arXiv.<id>
}

const ID_REGEX = /(\d{4}\.\d{4,5})(?:v\d+)?/

/** Accept many shapes; return the bare arXiv id or null if unrecognised. */
export function normaliseArxivId(input: string): string | null {
  const m = input.match(ID_REGEX)
  return m ? m[1] : null
}

const FEED_URL = 'https://export.arxiv.org/api/query'

export async function fetchArxiv(input: string): Promise<ArxivPaper | null> {
  const id = normaliseArxivId(input)
  if (!id) return null

  let xml: string
  try {
    const res = await fetch(`${FEED_URL}?id_list=${id}`, {
      headers: { 'User-Agent': 'nesycat-web/0.1 (https://nesycat.com)' },
      next: { revalidate: 86_400 },
    })
    if (!res.ok) return null
    xml = await res.text()
  } catch {
    return null
  }

  // The feed always wraps each paper in a single <entry>...</entry>. If the
  // id was invalid arXiv returns an empty feed (no <entry>), which we treat
  // as "not found".
  const entry = xml.match(/<entry>([\s\S]*?)<\/entry>/)?.[1]
  if (!entry) return null

  const title = decode(grab(entry, 'title') ?? '').replace(/\s+/g, ' ').trim()
  const summary = decode(grab(entry, 'summary') ?? '').trim()
  const published = grab(entry, 'published') ?? ''
  const primaryCategory = entry.match(/<arxiv:primary_category[^>]*\bterm="([^"]+)"/)?.[1]
  const categories = Array.from(
    entry.matchAll(/<category[^>]*\bterm="([^"]+)"/g),
    (m) => m[1]
  ).filter((c, i, a) => a.indexOf(c) === i)
  const authors = Array.from(
    entry.matchAll(/<author>\s*<name>([^<]+)<\/name>/g),
    (m) => decode(m[1]).trim()
  )

  return {
    id,
    title,
    authors,
    abstract: summary,
    categories,
    primaryCategory,
    published,
    arxivUrl: `https://arxiv.org/abs/${id}`,
    pdfUrl: `https://arxiv.org/pdf/${id}`,
    doiUrl: `https://doi.org/10.48550/arXiv.${id}`,
  }
}

/** Pull the inner text of the FIRST top-level child tag matching `name`. */
function grab(xml: string, name: string): string | undefined {
  const re = new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`)
  return xml.match(re)?.[1]
}

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
}

function decode(s: string): string {
  return s.replace(/&(#?\w+);/g, (full, key: string) => {
    if (key.startsWith('#')) {
      const code = Number(key.startsWith('#x') ? '0x' + key.slice(2) : key.slice(1))
      return Number.isFinite(code) ? String.fromCodePoint(code) : full
    }
    return ENTITIES[key] ?? full
  })
}

/** Generate a minimal BibTeX entry from a parsed paper. */
export function bibtexFor(p: ArxivPaper): string {
  const year = p.published.slice(0, 4) || ''
  const lastNameSlug =
    p.authors[0]
      ?.split(/\s+/)
      .pop()
      ?.toLowerCase()
      .replace(/[^a-z]/g, '') ?? 'anon'
  const titleSlug = p.title.split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '') ?? 'paper'
  const key = `${lastNameSlug}${year}${titleSlug}`
  const authorField = p.authors
    .map((a) => {
      const parts = a.trim().split(/\s+/)
      const last = parts.pop() ?? a
      return `${last}, ${parts.join(' ')}`
    })
    .join(' and ')
  return `@misc{${key},
  title         = {${p.title}},
  author        = {${authorField}},
  year          = {${year}},
  eprint        = {${p.id}},
  archivePrefix = {arXiv},${p.primaryCategory ? `\n  primaryClass  = {${p.primaryCategory}},` : ''}
  url           = {${p.arxivUrl}},
}`
}
