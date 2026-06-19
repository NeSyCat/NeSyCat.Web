import { GitHubIcon, EditorIcon } from '../Buttons'

const EDITOR_HREF = 'https://semiotics.nesycat.com/'

// No top bar — just floating pills in the corners, like the Admination app.
// The DS `.pill` is a frosted capsule of `.btn` segments; `.is-active` fills
// a segment solid blue. Left cluster = brand + section links; right = actions.
export default function Nav() {
  return (
    <header className="nav-floating">
      {/* left — brand pill (active/blue) + a segmented pill of section links */}
      <div className="pill-cluster">
        <div className="pill">
          <a href="#top" className="btn is-active" style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polygon points="12,4 20,12 12,20 4,12" />
              <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
            </svg>
            NeSyCat
          </a>
        </div>
        <div className="pill nav-links">
          <a className="btn" href="#abstract">Abstract</a>
          <a className="btn" href="#monads">Monads</a>
          <a className="btn" href="#layers">Layers</a>
          <a className="btn" href="#benchmarks">Results</a>
          <a className="btn" href="#paper">Paper</a>
        </div>
      </div>

      {/* center spacer */}
      <div />

      {/* right — action pills */}
      <div className="pill-cluster" style={{ justifySelf: 'end' }}>
        <div className="pill">
          <a className="btn" href="https://github.com/NeSyCat" target="_blank" rel="noreferrer">
            <GitHubIcon size={16} /> GitHub
          </a>
        </div>
        <div className="pill">
          <a className="btn" href={EDITOR_HREF} target="_blank" rel="noreferrer">
            <EditorIcon /> Open editor
          </a>
        </div>
      </div>
    </header>
  )
}
