import { GitHubIcon, LinkButton, OpenEditorButton } from '../Buttons'

export default function Hero() {
  return (
    <section id="top" style={{ padding: '72px 48px 36px', textAlign: 'center', maxWidth: 1040, margin: '0 auto' }}>
      <div className="t-eyebrow">NeSy 2026 · Neurosymbolic learning &amp; reasoning</div>

      <h1 className="t-display" style={{ margin: '20px 0 0' }}>
        NeSyCat Torch
      </h1>

      <p
        style={{
          margin: '16px auto 0',
          maxWidth: 760,
          fontSize: 22,
          fontWeight: 500,
          lineHeight: 1.3,
          letterSpacing: '-0.01em',
          color: 'var(--color-foreground)',
          textWrap: 'balance',
        }}
      >
        A differentiable tensor implementation of categorical semantics for neurosymbolic learning.
      </p>

      <p className="t-lead" style={{ margin: '22px auto 0', maxWidth: 700, textWrap: 'pretty' }}>
        Classical, fuzzy, probabilistic and neural systems each define truth their own way. NeSyCat
        unifies them under <em>one</em> inductive definition of truth, parametric in a strong monad.
        NeSyCat Torch makes it neural and differentiable — and the axioms <em>are</em> the source code.
      </p>

      <div style={{ marginTop: 34, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <LinkButton href="#paper" variant="primary" big>
          Read the paper <span style={{ opacity: 0.7 }}>↓</span>
        </LinkButton>
        <LinkButton href="https://github.com/NeSyCat" variant="secondary" big external>
          <GitHubIcon size={16} /> GitHub
        </LinkButton>
        <OpenEditorButton big variant="secondary" />
      </div>

      <div className="t-code" style={{ marginTop: 20, fontSize: 13, color: 'var(--color-muted-foreground)' }}>
        Haskell · JAX · PyTorch
      </div>
    </section>
  )
}
