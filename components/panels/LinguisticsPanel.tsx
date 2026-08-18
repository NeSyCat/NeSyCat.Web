const h2: React.CSSProperties = {
  margin: '12px 0 10px',
  fontSize: 'var(--text-h2)',
  fontWeight: 600,
  color: 'var(--color-foreground)',
  letterSpacing: '-0.015em',
}
const para: React.CSSProperties = {
  margin: '0 0 18px',
  fontSize: 15,
  color: 'var(--color-text-secondary)',
  lineHeight: 'var(--lh-body)',
}

// § Linguistics. Early-stage — no invented results or links, just the shape
// of the pipeline and an honest status line.
export default function LinguisticsPanel() {
  return (
    <section>
      <div className="t-eyebrow">§ Linguistics · Language to logic</div>
      <h2 style={h2}>From sentence to symbol.</h2>

      <p style={para}>
        Natural language is the third leg of NeSyCat: a pipeline that parses a sentence into a
        syntax tree, translates the tree into a many-sorted first-order formula, and hands that
        formula to NeSyCat as a runnable program and a string diagram.
      </p>

      <p style={para}>
        One shared knowledge base of natural-language / formal-logic pairs will benchmark the
        translation.
      </p>

      <p style={{ ...para, margin: 0, fontSize: 13.5, color: 'var(--color-muted-foreground)' }}>
        This layer is in active development alongside the NeSyCat NLP paper.
      </p>
    </section>
  )
}
