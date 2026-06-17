import Logo from '../Logo'

const linkStyle: React.CSSProperties = { color: 'inherit', textDecoration: 'none' }

export default function Footer() {
  return (
    <footer
      style={{
        padding: '28px 48px 40px',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 12.5,
        color: 'var(--color-muted-foreground)',
        maxWidth: 1120,
        margin: '0 auto',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <Logo />
      <div className="t-code" style={{ display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'center' }}>
        <a href="#paper" style={linkStyle}>paper</a>
        <a href="https://github.com/NeSyCat" target="_blank" rel="noreferrer" style={linkStyle}>
          github.com/NeSyCat
        </a>
        <a href="https://semiotics.nesycat.com/" target="_blank" rel="noreferrer" style={linkStyle}>
          editor
        </a>
        <span>University of Osnabrück</span>
      </div>
    </footer>
  )
}
