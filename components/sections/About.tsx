export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '64px 48px',
        borderTop: '1px solid var(--color-glass-border)',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'start' }}>
        <div>
          <div className="t-caption" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
            § 1 What is NeSyCat?
          </div>
          <h2
            style={{
              margin: '14px 0 0',
              fontSize: 32,
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.5px',
              lineHeight: 1.2,
              textWrap: 'balance',
            }}
          >
            A bridge — not a new continent.
          </h2>
        </div>
        <div style={{ color: 'var(--color-text-secondary)', fontSize: 16, lineHeight: 1.7 }}>
          <p style={{ margin: 0 }}>
            <strong style={{ color: 'var(--color-text-primary)' }}>NeSyCat</strong> — <em>Neuro-Symbolic
            Category</em> — applies the results that decades of category-theory research have already
            proven, organising them into a form a programmer can actually pick up. The structural
            spine is the duality between categorical-logic syntax and semantics, mirrored in
            Haskell&apos;s type system.
          </p>
          <p style={{ margin: '18px 0 0' }}>
            The framework is laid out in <strong style={{ color: 'var(--color-text-primary)' }}>six
            layers</strong> — Categorical, Logical, Domain, Grammatical, Inferential, Statistical —
            each with the same six components: theory, vocabulary, category, type system,
            parameters, training. A formula written in the grammatical layer specialises
            simultaneously to a probabilistic universe (measure theory, <span className="t-mono">Dist</span>{' '}
            monad) and a geometric one (smooth maps, <span className="t-mono">Identity</span> monad
            for gradient training).
          </p>
          <p style={{ margin: '18px 0 0' }}>
            The reference implementation lives in <strong style={{ color: 'var(--color-text-primary)' }}>HaskTorch</strong>{' '}
            — a Haskell project mirroring the layers one-for-one — and the visible surface for
            assembling diagrams lives in <strong style={{ color: 'var(--color-text-primary)' }}>Semiotics</strong>,
            the in-browser string-diagram editor.
          </p>
        </div>
      </div>
    </section>
  )
}
