import { LinkButton } from '../Buttons'

// Each entry is a published paper. List-shaped so additional papers can be
// added later without restructuring the section.
const PAPERS = [
  {
    title: 'NeSyCat Theory: Semantics in Kleisli Categories for Neuro-Symbolic AI in HaskTorch',
    author: 'Daniel Romero Schellhorn',
    affiliation: 'Universität Osnabrück',
    abstract:
      'The divide between the scientific communities of AI and Category Theory is deep. Even the new branch of neuro-symbolic AI has not yet acknowledged category theory, nor has category theory been applied directly to neuro-symbolic AI. The NeSyCat project aims at beginning to close this gap. Therefore it is not concerned with proving new results in category theory about AI, which would only widen the gap, but instead with applying the plethora of results that have been already proven in category theory. To do that, however, these results need to be structured in an implementation-compatible way. This structure is constructed as a bridge specifically between the syntax-semantic duality of categorical logic and the Haskell type system, and yet it simultaneously acts as a blueprint for other programming languages and as a platform to easily implement additional results of category theory. In order to connect the working HaskTorch implementation to the theory, the style of alternating between logic/math and (non-pseudo) code directly summons the computational trilogy.',
    href: 'https://doi.org/10.48550/arXiv.2604.24612',
    bibtex: `@article{romeroschellhorn2026nesycat,
  title  = {NeSyCat Theory: Semantics in Kleisli Categories for Neuro-Symbolic AI in HaskTorch},
  author = {Romero Schellhorn, Daniel},
  year   = {2026},
  url    = {https://doi.org/10.48550/arXiv.2604.24612},
}`,
  },
]

export default function Paper() {
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
        {PAPERS.map((p) => (
          <article
            key={p.title}
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
              {p.author} · {p.affiliation}
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
              {p.bibtex}
            </pre>
            <div style={{ marginTop: 18 }}>
              <LinkButton href={p.href} variant="primary" external>
                Read on arXiv <span style={{ opacity: 0.7, fontSize: 12 }}>↗</span>
              </LinkButton>
            </div>
          </article>
        ))}
      </div>

      <p
        style={{
          marginTop: 24,
          fontSize: 12,
          color: 'var(--color-text-dimmed)',
        }}
      >
        More papers will land here as the framework grows. Author affiliations and DOIs are
        canonical; copy-paste BibTeX freely.
      </p>
    </section>
  )
}
