import { GitHubIcon, LinkButton } from '../Buttons'

export default function Repos() {
  return (
    <section
      style={{
        padding: '40px 48px 80px',
        borderTop: '1px solid var(--color-glass-border)',
        maxWidth: 1200,
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <div className="t-caption" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
        § 5 Source
      </div>
      <h2
        style={{
          margin: '14px 0 12px',
          fontSize: 28,
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.4px',
        }}
      >
        All on GitHub.
      </h2>
      <p
        style={{
          margin: '0 auto 28px',
          fontSize: 15,
          color: 'var(--color-text-muted)',
          maxWidth: 560,
          lineHeight: 1.6,
        }}
      >
        Theory paper sources, the Haskell implementation, the Semiotics editor, and this site —
        all under the NeSyCat organisation.
      </p>
      <LinkButton href="https://github.com/NeSyCat" variant="primary" big external>
        <GitHubIcon size={16} />
        github.com/NeSyCat
        <span style={{ opacity: 0.7, fontSize: 12 }}>↗</span>
      </LinkButton>
    </section>
  )
}
