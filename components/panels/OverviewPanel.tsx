const h2: React.CSSProperties = {
  margin: '12px 0 10px',
  fontSize: 'var(--text-h2)',
  fontWeight: 600,
  color: 'var(--color-foreground)',
  letterSpacing: '-0.015em',
}

// § Overview — the default panel before any area is selected. Body copy is
// the Hero.tsx lead paragraph; heading is the site tagline (also used as the
// muted line under the "NeSyCat" brand mark in the left stage).
export default function OverviewPanel() {
  return (
    <section>
      <div className="t-eyebrow">§ NeSyCat</div>
      <h2 style={h2}>A monad-based categorical framework for neurosymbolic AI.</h2>

      <p className="t-lead" style={{ margin: '0 0 18px', textWrap: 'pretty' }}>
        Classical, fuzzy, probabilistic and neural systems each define truth their own way. NeSyCat
        recasts them as one categorical framework: fix a monad and a space of truth values, and
        every one of those logics follows from a <em>single</em> inductive definition of truth.{' '}
        <strong style={{ color: 'var(--color-foreground)' }}>NeSyCat Torch</strong> is its
        differentiable, neural implementation.
      </p>

      <p style={{ margin: 0, fontSize: 13.5, color: 'var(--color-muted-foreground)', lineHeight: 'var(--lh-body)' }}>
        Hover or click a corner of the diamond — or the dot at its center — to explore each area.
      </p>
    </section>
  )
}
