import Logo from '../Logo'
import { OpenEditorButton } from '../Buttons'

const linkStyle: React.CSSProperties = { color: 'inherit', textDecoration: 'none' }

export default function Nav() {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        borderBottom: '1px solid var(--color-glass-border)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'rgba(15,15,20,0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <Logo />
      <div
        style={{
          display: 'flex',
          gap: 28,
          fontSize: 13,
          color: 'var(--color-text-muted)',
          fontWeight: 500,
        }}
      >
        <a href="#about" style={linkStyle}>About</a>
        <a href="#pillars" style={linkStyle}>Pillars</a>
        <a href="#layers" style={linkStyle}>Layers</a>
        <a href="#paper" style={linkStyle}>Paper</a>
        <a href="https://github.com/NeSyCat" style={linkStyle} target="_blank" rel="noreferrer">GitHub</a>
      </div>
      <OpenEditorButton />
    </nav>
  )
}
