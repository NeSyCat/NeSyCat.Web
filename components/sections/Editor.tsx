import { OpenEditorButton } from '../Buttons'

const h2: React.CSSProperties = {
  margin: '12px 0 10px',
  fontSize: 'var(--text-h2)',
  fontWeight: 600,
  color: 'var(--color-foreground)',
  letterSpacing: '-0.015em',
}
const intro: React.CSSProperties = {
  margin: '0 0 32px',
  fontSize: 15,
  color: 'var(--color-text-secondary)',
  maxWidth: 680,
  lineHeight: 'var(--lh-body)',
}

// § Semiotics. The diagram editor lives at semiotics.nesycat.org (sibling
// repo NeSyCat.Semiotics) — embedded live here as a preview. GitHub's own
// login page refuses to be framed (X-Frame-Options: deny), so sign-in can't
// complete inside the iframe; OpenEditorButton is the reliable full-tab path.
export default function Editor() {
  return (
    <section
      id="editor"
      style={{
        padding: '48px 48px 64px',
        borderTop: '1px solid var(--color-border)',
        maxWidth: 1120,
        margin: '0 auto',
      }}
    >
      <div className="t-eyebrow">§ Semiotics</div>
      <h2 style={h2}>Sketch it, don&apos;t just read it.</h2>
      <p style={intro}>
        Semiotics is NeSyCat&apos;s web editor for category-theoretic string diagrams — compose
        shapes, wire their points, and round-trip the whole diagram as JSON. Sign in with GitHub
        to save your own.
      </p>

      <div className="surface" style={{ padding: 8 }}>
        <iframe
          src="https://semiotics.nesycat.org/"
          title="NeSyCat Semiotics editor"
          loading="lazy"
          style={{
            display: 'block',
            width: '100%',
            height: 640,
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
          }}
        />
      </div>
      <p style={{ margin: '10px 2px 0', fontSize: 12.5, color: 'var(--color-muted-foreground)', lineHeight: 1.6 }}>
        GitHub sign-in can&apos;t complete inside the embed above — open the editor in its own tab
        to sign in and save.
      </p>

      <div style={{ marginTop: 24 }}>
        <OpenEditorButton big />
      </div>
    </section>
  )
}
