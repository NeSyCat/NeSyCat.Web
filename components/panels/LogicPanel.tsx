import { GitHubIcon, LinkButton } from '../Buttons'
import { bibtexFor, type ArxivPaper } from '@/lib/arxiv'
import { PAPERS, PAPER_META } from '@/lib/papers'

type Meta = { code?: string; featured?: boolean }

const h2: React.CSSProperties = {
  margin: '12px 0 8px',
  fontSize: 'var(--text-h2)',
  fontWeight: 600,
  color: 'var(--color-foreground)',
  letterSpacing: '-0.015em',
}
const intro: React.CSSProperties = {
  margin: '0 0 32px',
  fontSize: 15,
  color: 'var(--color-text-secondary)',
  maxWidth: 640,
  lineHeight: 'var(--lh-body)',
}

// § Logic. Every entry is fetched live from arXiv (lib/papers.ts) — title,
// authors, abstract, date, all categories and a BibTeX entry. NeSyCat Torch is
// featured (more elevated + a Code link); the theory paper is the foundation.
// The fetch happens once in app/page.tsx (server); this panel only renders it.
export default function LogicPanel({ papers }: { papers: (ArxivPaper | null)[] }) {
  const failedIds = PAPERS.filter((_, i) => papers[i] === null)

  return (
    <section>
      <div className="t-eyebrow">§ Logic · Papers</div>
      <h2 style={h2}>Read the work.</h2>
      <p style={intro}>
        NeSyCat Torch is the neural implementation; the categorical theory paper is the foundation
        it builds on.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {PAPERS.map((id, i) =>
          papers[i] ? <PaperCard key={id} paper={papers[i] as ArxivPaper} meta={PAPER_META[id]} /> : null,
        )}
        {failedIds.map((id) => (
          <FallbackCard key={id} input={id} />
        ))}
      </div>
    </section>
  )
}

function PaperCard({ paper: p, meta }: { paper: ArxivPaper; meta?: Meta }) {
  const bibtex = bibtexFor(p)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: p.title,
    author: p.authors.map((name) => ({ '@type': 'Person', name })),
    datePublished: p.published,
    abstract: p.abstract,
    url: p.arxivUrl,
    sameAs: [p.arxivUrl, p.doiUrl],
    ...(p.primaryCategory && { about: p.primaryCategory }),
  }
  return (
    <article className="surface" style={{ padding: 28, boxShadow: meta?.featured ? 'var(--shadow-md)' : undefined }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <h3
        style={{
          margin: 0,
          fontSize: 'var(--text-h4)',
          fontWeight: 600,
          color: 'var(--color-foreground)',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
        }}
      >
        {p.title}
      </h3>
      <div className="t-code" style={{ marginTop: 8, fontSize: 12.5, color: 'var(--color-muted-foreground)' }}>
        {p.authors.join(' · ')}
        {p.published && <> · {p.published.slice(0, 10)}</>}
        {p.categories.length > 0 && <> · {p.categories.join(' / ')}</>}
      </div>
      <p style={{ marginTop: 16, fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
        {p.abstract}
      </p>
      <pre
        className="t-code"
        style={{
          marginTop: 18,
          padding: 16,
          fontSize: 12,
          color: 'var(--color-text-secondary)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          overflowX: 'auto',
          whiteSpace: 'pre',
        }}
      >
        {bibtex}
      </pre>
      <div style={{ marginTop: 18, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <LinkButton href={p.arxivUrl} variant="primary" external>
          Read on arXiv <span style={{ opacity: 0.7, fontSize: 12 }}>↗</span>
        </LinkButton>
        <LinkButton href={p.pdfUrl} variant="secondary" external>
          PDF <span style={{ opacity: 0.7, fontSize: 12 }}>↗</span>
        </LinkButton>
        {meta?.code && (
          <LinkButton href={meta.code} variant="secondary" external>
            <GitHubIcon size={14} /> Code <span style={{ opacity: 0.7, fontSize: 12 }}>↗</span>
          </LinkButton>
        )}
      </div>
    </article>
  )
}

function FallbackCard({ input }: { input: string }) {
  return (
    <article className="surface" style={{ padding: 24 }}>
      <div className="t-eyebrow" style={{ color: 'var(--color-muted-foreground)' }}>
        Couldn&apos;t fetch from arXiv
      </div>
      <p style={{ marginTop: 8, fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
        <span className="t-code">{input}</span> — the arXiv API may be rate-limiting or the id may
        not be live yet. The page retries on the next revalidation tick.
      </p>
    </article>
  )
}
