import Logo from '../Logo'

const linkStyle: React.CSSProperties = { color: 'inherit', textDecoration: 'none' }

export default function Footer() {
  return (
    <footer
      style={{
        padding: '28px 48px 36px',
        borderTop: '1px solid var(--color-glass-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 12,
        color: 'var(--color-text-dimmed)',
        maxWidth: 1200,
        margin: '0 auto',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <Logo />
      <div className="t-mono" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <a href="https://github.com/NeSyCat" target="_blank" rel="noreferrer" style={linkStyle}>
          github.com/NeSyCat
        </a>
        <a href="https://doi.org/10.48550/arXiv.2604.24612" target="_blank" rel="noreferrer" style={linkStyle}>
          paper
        </a>
        <a href="https://semiotics.nesycat.com/" target="_blank" rel="noreferrer" style={linkStyle}>
          editor
        </a>
      </div>
      <span className="t-mono">Daniel Romero Schellhorn · 2026</span>
    </footer>
  )
}
