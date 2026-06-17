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
        padding: '16px 40px',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'rgba(250, 250, 249, 0.8)',
        backdropFilter: 'saturate(180%) blur(8px)',
        WebkitBackdropFilter: 'saturate(180%) blur(8px)',
      }}
    >
      <Logo />
      <div
        style={{
          display: 'flex',
          gap: 26,
          fontSize: 13.5,
          color: 'var(--color-text-secondary)',
          fontWeight: 500,
        }}
      >
        <a href="#abstract" style={linkStyle}>Abstract</a>
        <a href="#monads" style={linkStyle}>Monads</a>
        <a href="#layers" style={linkStyle}>Layers</a>
        <a href="#benchmarks" style={linkStyle}>Results</a>
        <a href="#paper" style={linkStyle}>Paper</a>
        <a href="https://github.com/NeSyCat" style={linkStyle} target="_blank" rel="noreferrer">GitHub</a>
      </div>
      <OpenEditorButton />
    </nav>
  )
}
