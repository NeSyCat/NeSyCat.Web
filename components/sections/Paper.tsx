import { LinkButton } from '../Buttons'
import { fetchArxiv, bibtexFor, type ArxivPaper } from '@/lib/arxiv'
import { PAPERS } from '@/lib/papers'

// Async Server Component — fetches each paper from the arXiv API at build /
// revalidation time. Adding a new arXiv id (or DOI / abs URL) to lib/papers.ts
// makes it appear here automatically on the next deploy or daily revalidation.
export default async function Paper() {
  const results = await Promise.all(PAPERS.map((id) => fetchArxiv(id)))
  const papers = results.filter((p): p is ArxivPaper => p !== null)
  const failedIds = PAPERS.filter((_, i) => results[i] === null)

  return (
    <section
      id="paper"
      style={{
        padding: '40px 48px 64px',
        borderTop: '1px solid var(--color-glass-border)',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <div className="t-caption" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
        § 4 Papers
      </div>
      <h2
        style={{
          margin: '14px 0 32px',
          fontSize: 28,
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.4px',
        }}
      >
        Read the foundations.
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {papers.map((p) => (
          <PaperCard key={p.id} paper={p} />
        ))}
        {failedIds.map((id) => (
          <FallbackCard key={id} input={id} />
        ))}
      </div>

      <p
        style={{
          marginTop: 24,
          fontSize: 12,
          color: 'var(--color-text-dimmed)',
        }}
      >
        New papers land here automatically — add an arXiv id (or full DOI /
        abs URL) to <span className="t-mono">lib/papers.ts</span>. Metadata is
        pulled live from arXiv and cached for 24 hours.
      </p>
    </section>
  )
}

function PaperCard({ paper: p }: { paper: ArxivPaper }) {
  const bibtex = bibtexFor(p)
  return (
    <article
      style={{
        padding: 28,
        border: '1px solid var(--color-glass-border)',
        borderRadius: 12,
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: 20,
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.3px',
          lineHeight: 1.3,
        }}
      >
        {p.title}
      </h3>
      <div
        className="t-mono"
        style={{ marginTop: 8, fontSize: 12, color: 'var(--color-text-dimmed)' }}
      >
        {p.authors.join(' · ')}
        {p.published && (
          <>
            {' · '}
            {p.published.slice(0, 10)}
          </>
        )}
        {p.categories.length > 0 && (
          <>
            {' · '}
            {p.categories.slice(0, 4).join(' / ')}
          </>
        )}
      </div>
      <p
        style={{
          marginTop: 18,
          fontSize: 14,
          color: 'var(--color-text-muted)',
          lineHeight: 1.7,
        }}
      >
        {p.abstract}
      </p>
      <pre
        style={{
          marginTop: 20,
          padding: 16,
          fontSize: 12,
          fontFamily: 'var(--font-mono), SF Mono, Menlo, ui-monospace, monospace',
          color: 'var(--color-text-dimmed)',
          background: 'rgba(0,0,0,0.25)',
          border: '1px solid var(--color-glass-border)',
          borderRadius: 8,
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
      </div>
    </article>
  )
}

function FallbackCard({ input }: { input: string }) {
  return (
    <article
      style={{
        padding: 24,
        border: '1px solid var(--color-glass-border)',
        borderRadius: 12,
        background: 'rgba(255,255,255,0.02)',
        color: 'var(--color-text-muted)',
        fontSize: 13,
        lineHeight: 1.6,
      }}
    >
      <div className="t-caption" style={{ color: 'var(--color-text-dimmed)' }}>
        Couldn&apos;t fetch from arXiv
      </div>
      <p style={{ marginTop: 8 }}>
        <span className="t-mono">{input}</span> — the arXiv API may be rate-limiting or the id
        may not be live yet. The page will retry on the next revalidation tick.
      </p>
    </article>
  )
}
