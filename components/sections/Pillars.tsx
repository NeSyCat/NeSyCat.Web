const ACC = '59, 130, 246'

type Pillar = {
  letter: string
  name: string
  blurb: string
  href: string
  cta: string
  external: boolean
}

const PILLARS: Pillar[] = [
  {
    letter: 'L',
    name: 'Logic',
    blurb:
      'The formal core. Categorical logic, monads, and the syntax/semantics duality that lets a single formula specialise to classical, fuzzy, and probabilistic readings — published as a paper on arXiv.',
    href: 'https://doi.org/10.48550/arXiv.2604.24612',
    cta: 'Read on arXiv',
    external: true,
  },
  {
    letter: 'A',
    name: 'AI',
    blurb:
      'The neuro-symbolic implementation. HaskTorch ports the categorical framework into Haskell — modules per theoretical layer, runnable benchmarks, a binary-classification example wired through measure-theoretic and geometric universes.',
    href: 'https://github.com/NeSyCat',
    cta: 'View on GitHub',
    external: true,
  },
  {
    letter: 'S',
    name: 'Semiotics',
    blurb:
      'The diagram editor. Compose shapes, wire their points, round-trip diagrams as JSON — the visible surface for authoring the string diagrams that the codegen layer compiles to runnable code.',
    href: 'https://semiotics.nesycat.com/',
    cta: 'Open editor',
    external: true,
  },
]

export default function Pillars() {
  return (
    <section
      id="pillars"
      style={{
        padding: '40px 48px 64px',
        borderTop: '1px solid var(--color-glass-border)',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <div className="t-caption" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
        § 2 Three pillars
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
        Theory, implementation, editor.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {PILLARS.map((p) => (
          <div
            key={p.letter}
            style={{
              padding: 24,
              border: '1px solid var(--color-glass-border)',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              minHeight: 240,
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.2px',
              }}
            >
              {p.name}
            </div>
            <div
              style={{
                fontSize: 14,
                color: 'var(--color-text-muted)',
                lineHeight: 1.6,
                flex: 1,
              }}
            >
              {p.blurb}
            </div>
            <a
              href={p.href}
              target={p.external ? '_blank' : undefined}
              rel={p.external ? 'noreferrer' : undefined}
              style={{
                fontSize: 13,
                color: `rgba(${ACC},0.95)`,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              {p.cta} <span style={{ opacity: 0.7 }}>↗</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
