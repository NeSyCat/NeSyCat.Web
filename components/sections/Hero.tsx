import { GitHubIcon, LinkButton } from '../Buttons'

export default function Hero() {
  return (
    <section id="top" style={{ padding: '72px 48px 36px', textAlign: 'center', maxWidth: 1040, margin: '0 auto' }}>
      <div className="t-eyebrow">Neurosymbolic AI · Categorical semantics</div>

      <h1 className="t-display" style={{ margin: '20px 0 0' }}>
        NeSyCat
      </h1>

      <p
        style={{
          margin: '16px auto 0',
          maxWidth: 780,
          fontSize: 22,
          fontWeight: 500,
          lineHeight: 1.3,
          letterSpacing: '-0.01em',
          color: 'var(--color-foreground)',
          textWrap: 'balance',
        }}
      >
        A monad-based categorical framework that unifies neurosymbolic reasoning.
      </p>

      <p className="t-lead" style={{ margin: '22px auto 0', maxWidth: 720, textWrap: 'pretty' }}>
        Classical, fuzzy, probabilistic and neural systems each define truth their own way. NeSyCat
        recasts them as one categorical framework: fix a monad and a space of truth values, and every
        one of those logics follows from a <em>single</em> inductive definition of truth.{' '}
        <strong style={{ color: 'var(--color-foreground)' }}>NeSyCat Torch</strong> is its
        differentiable, neural implementation.
      </p>

      <div style={{ marginTop: 34, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <LinkButton href="#paper" variant="primary" big>
          Read the paper <span style={{ opacity: 0.7 }}>↓</span>
        </LinkButton>
        <LinkButton href="https://github.com/NeSyCat" variant="secondary" big external>
          <GitHubIcon size={16} /> GitHub
        </LinkButton>
      </div>

      <div className="t-code" style={{ marginTop: 20, fontSize: 13, color: 'var(--color-muted-foreground)' }}>
        classical · fuzzy · probabilistic · neural
      </div>
    </section>
  )
}
