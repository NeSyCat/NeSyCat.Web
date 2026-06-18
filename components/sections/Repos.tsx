import { GitHubIcon, LinkButton } from '../Buttons'

type Backend = { name: string; lang: string; blurb: string }

// The paper runs the same specification in three backends (Haskell + two
// Python), all monad-polymorphic over the same per-sample formula.
const BACKENDS: Backend[] = [
  {
    name: 'HaskTorch',
    lang: 'Haskell',
    blurb:
      'The reference backend. The monad-polymorphic do-notation is literal Haskell — written once, the axioms compile and run as the semantic value.',
  },
  {
    name: 'JAX',
    lang: 'Python',
    blurb:
      'The benchmark backend. The log-space convolution is JIT-compiled and differentiated; all reported numbers come from JAX on a single A100.',
  },
  {
    name: 'PyTorch',
    lang: 'Python',
    blurb:
      'The third backend. Python uses yield in place of Haskell’s ← — the generator syntax is the same monadic composition as do-notation.',
  },
]

export default function Repos() {
  return (
    <section
      id="code"
      style={{
        padding: '48px 48px 80px',
        borderTop: '1px solid var(--color-border)',
        maxWidth: 1120,
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <div className="t-eyebrow">§ Implementations</div>
      <h2
        style={{
          margin: '12px 0 10px',
          fontSize: 'var(--text-h2)',
          fontWeight: 600,
          color: 'var(--color-foreground)',
          letterSpacing: '-0.015em',
        }}
      >
        One spec, three backends.
      </h2>
      <p
        style={{
          margin: '0 auto 32px',
          fontSize: 15,
          color: 'var(--color-text-secondary)',
          maxWidth: 600,
          lineHeight: 'var(--lh-body)',
        }}
      >
        The same monad-polymorphic specification runs in Haskell and Python — all under the NeSyCat
        organisation on GitHub.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          textAlign: 'left',
          marginBottom: 32,
        }}
      >
        {BACKENDS.map((b) => (
          <div key={b.name} className="surface" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 17, fontWeight: 600, color: 'var(--color-foreground)', letterSpacing: '-0.01em' }}>
                {b.name}
              </span>
              <span className="t-code" style={{ fontSize: 11.5, color: 'var(--color-primary)' }}>
                {b.lang}
              </span>
            </div>
            <p style={{ marginTop: 10, fontSize: 13.5, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {b.blurb}
            </p>
          </div>
        ))}
      </div>

      <LinkButton href="https://github.com/NeSyCat" variant="primary" big external>
        <GitHubIcon size={16} /> github.com/NeSyCat <span style={{ opacity: 0.7, fontSize: 12 }}>↗</span>
      </LinkButton>
    </section>
  )
}
