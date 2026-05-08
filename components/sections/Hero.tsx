import { GitHubIcon, LinkButton, OpenEditorButton } from '../Buttons'

const ACC = '59, 130, 246'

export default function Hero() {
  return (
    <section style={{ padding: '88px 48px 28px', textAlign: 'center', maxWidth: 1100, margin: '0 auto' }}>
      <div className="t-caption" style={{ color: `rgba(${ACC},0.95)`, letterSpacing: '0.12em' }}>
        NeSyCat · v0.x · 2026
      </div>
      <h1
        style={{
          margin: '22px 0 0',
          fontSize: 64,
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          lineHeight: 1.03,
          letterSpacing: '-1.6px',
          textWrap: 'balance',
        }}
      >
        Category theory,{' '}
        <span style={{ color: `rgba(${ACC},0.95)` }}>structured for neuro-symbolic AI.</span>
      </h1>
      <p
        style={{
          margin: '26px auto 0',
          maxWidth: 720,
          color: 'var(--color-text-muted)',
          fontSize: 17,
          lineHeight: 1.55,
          textWrap: 'pretty',
        }}
      >
        The divide between AI and category theory is deep. NeSyCat begins to close it — not by
        proving new categorical results <em>about</em> AI, but by structuring the plethora of
        existing ones into a bridge between categorical-logic syntax/semantics and the Haskell type
        system.
      </p>
      <div style={{ marginTop: 36, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <LinkButton href="https://doi.org/10.48550/arXiv.2604.24612" variant="primary" big external>
          Read the paper <span style={{ opacity: 0.7 }}>↗</span>
        </LinkButton>
        <LinkButton href="https://github.com/NeSyCat" variant="secondary" big external>
          <GitHubIcon size={14} /> GitHub
        </LinkButton>
        <OpenEditorButton variant="secondary" big />
      </div>
      <div
        className="t-mono"
        style={{ marginTop: 18, fontSize: 13, color: 'var(--color-text-dimmed)' }}
      >
        Logic · AI · Semiotics
      </div>
    </section>
  )
}
