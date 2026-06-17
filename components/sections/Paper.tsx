import { GitHubIcon, LinkButton } from '../Buttons'
import { fetchArxiv, bibtexFor, type ArxivPaper } from '@/lib/arxiv'
import { PAPERS } from '@/lib/papers'

// § Papers. The headline is NeSyCat Torch (the NeSy 2026 conference paper);
// it has no public arXiv id yet, so it is rendered from static metadata and
// links to the code + paper sources on GitHub. The foundational categorical
// theory paper is still pulled live from arXiv via lib/papers.ts.
export default async function Paper() {
  const results = await Promise.all(PAPERS.map((id) => fetchArxiv(id)))
  const papers = results.filter((p): p is ArxivPaper => p !== null)
  const failedIds = PAPERS.filter((_, i) => results[i] === null)

  return (
    <section
      id="paper"
      style={{
        padding: '48px 48px 72px',
        borderTop: '1px solid var(--color-border)',
        maxWidth: 1120,
        margin: '0 auto',
      }}
    >
      <div className="t-eyebrow">§ Papers</div>
      <h2
        style={{
          margin: '12px 0 8px',
          fontSize: 'var(--text-h2)',
          fontWeight: 600,
          color: 'var(--color-foreground)',
          letterSpacing: '-0.015em',
        }}
      >
        Read the work.
      </h2>
      <p
        style={{
          margin: '0 0 32px',
          fontSize: 15,
          color: 'var(--color-text-secondary)',
          maxWidth: 640,
          lineHeight: 'var(--lh-body)',
        }}
      >
        NeSyCat Torch is the neural implementation; the categorical theory paper is the
        foundation it builds on.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <TorchCard />
        {papers.map((p) => (
          <PaperCard key={p.id} paper={p} />
        ))}
        {failedIds.map((id) => (
          <FallbackCard key={id} input={id} />
        ))}
      </div>
    </section>
  )
}

// Featured: the NeSyCat Torch conference paper (static metadata from the
// source .tex — no public arXiv id yet).
function TorchCard() {
  return (
    <article className="surface" style={{ padding: 28, boxShadow: 'var(--shadow-md)' }}>
      <div className="t-eyebrow" style={{ color: 'var(--color-primary)' }}>
        Conference paper · NeSy 2026
      </div>
      <h3
        style={{
          margin: '10px 0 0',
          fontSize: 'var(--text-h4)',
          fontWeight: 600,
          color: 'var(--color-foreground)',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
        }}
      >
        NeSyCat Torch: A Differentiable Tensor Implementation of Categorical Semantics for
        Neurosymbolic Learning
      </h3>
      <div className="t-code" style={{ marginTop: 8, fontSize: 12.5, color: 'var(--color-muted-foreground)' }}>
        Daniel Romero Schellhorn · Till Mossakowski · Björn Gehrke — University of Osnabrück
      </div>
      <p style={{ marginTop: 16, fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
        Neurosymbolic semantics is fragmented: classical, fuzzy, probabilistic and neural systems
        each define truth by their own rules. NeSyCat subsumes them under a single inductive
        definition of truth, parametric in a strong monad and an aggregation structure on
        truth-values. NeSyCat Torch supplies the missing link — interpreting computational symbols
        via neural networks — using the distribution monad for reference semantics and a lazy
        log-tensor monad over the log-semiring for numerically stable, differentiable training. On
        MNIST addition, the HaskTorch, JAX and PyTorch implementations outperform LTN and
        DeepProbLog in speed and accuracy, nearing DeepStochLog, while staying in one uniform
        framework.
      </p>
      <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <LinkButton href="https://github.com/NeSyCat" variant="primary" external>
          <GitHubIcon size={16} /> Code &amp; paper sources <span style={{ opacity: 0.7, fontSize: 12 }}>↗</span>
        </LinkButton>
      </div>
    </article>
  )
}

function PaperCard({ paper: p }: { paper: ArxivPaper }) {
  const bibtex = bibtexFor(p)
  return (
    <article className="surface" style={{ padding: 28 }}>
      <div className="t-eyebrow" style={{ color: 'var(--color-muted-foreground)' }}>
        Foundation · arXiv
      </div>
      <h3
        style={{
          margin: '10px 0 0',
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
        {p.categories.length > 0 && <> · {p.categories.slice(0, 4).join(' / ')}</>}
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
        not be live yet. The page will retry on the next revalidation tick.
      </p>
    </article>
  )
}
