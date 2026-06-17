type Layer = { index: string; name: string; blurb: string }

// The four syntax/semantics layers of NeSyCat Torch. Each is a pair of a
// signature (symbols only) and an interpretation (their meaning); the first
// three declare and interpret symbols, the fourth generates terms and formulas
// over them and assigns their monadic semantics by one induction.
const LAYERS: Layer[] = [
  {
    index: '01',
    name: 'Categorical',
    blurb:
      'Work in Set (computationally: Haskell types and maps). Parameters are drawn from Tens — Euclidean spaces ℝⁿ with differentiable maps — where the neural networks live and backpropagation happens. The one choice that varies is the effect: a single monad symbol ◯, with ℳ := ℐ(◯).',
  },
  {
    index: '02',
    name: 'Logical',
    blurb:
      'Basic truth values are Booleans, Ω = 𝔹. Connectives (∧, ∨, ¬, →) are the ordinary Boolean operations, lifted to act on monadic truth values ℳΩ. The only genuinely monadic logical symbols are the quantifiers: ℐ(Q)_D : (D → ℳΩ) → ℳΩ.',
  },
  {
    index: '03',
    name: 'Domain',
    blurb:
      'Declares domain symbols, variables, and function/relation symbols — the actual objects of the theory (e.g. Image, Digit, Nat). Each function/relation symbol is one of three kinds: Tarski, Kleisli, or Nesy.',
  },
  {
    index: '04',
    name: 'Grammatical',
    blurb:
      'Generates terms in the do-notation the implementation uses; formulas are terms of truth type τ. It recovers the ULLER/NeSyCat syntax and fixes the semantics pointwise at a valuation ν by a single induction.',
  },
]

export default function Layers() {
  return (
    <section
      id="layers"
      style={{
        padding: '48px 48px 64px',
        borderTop: '1px solid var(--color-border)',
        maxWidth: 1120,
        margin: '0 auto',
      }}
    >
      <div className="t-eyebrow">§ Syntax &amp; semantics</div>
      <h2
        style={{
          margin: '12px 0 10px',
          fontSize: 'var(--text-h2)',
          fontWeight: 600,
          color: 'var(--color-foreground)',
          letterSpacing: '-0.015em',
        }}
      >
        Four layers, one induction.
      </h2>
      <p
        style={{
          margin: '0 0 32px',
          fontSize: 15,
          color: 'var(--color-text-secondary)',
          maxWidth: 640,
          lineHeight: 'var(--lh-body)',
        }}
      >
        NeSyCat Torch organises syntax and semantics into four layers, each a pair of a{' '}
        <strong style={{ color: 'var(--color-foreground)', fontWeight: 600 }}>signature</strong> (only
        symbols) and an{' '}
        <strong style={{ color: 'var(--color-foreground)', fontWeight: 600 }}>interpretation</strong>{' '}
        (their meaning). The first three declare and interpret symbols; the fourth generates terms and
        formulas over them and assigns their monadic semantics by one induction. It extends the
        categorical semantics of Johnstone&apos;s <em>Elephant</em> by adding monad symbols and monadic
        interpretations.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        {LAYERS.map((l) => (
          <div key={l.index} className="surface" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span className="t-code" style={{ fontSize: 13, color: 'var(--color-primary)' }}>
                {l.index}
              </span>
              <span style={{ fontSize: 17, fontWeight: 600, color: 'var(--color-foreground)', letterSpacing: '-0.01em' }}>
                {l.name}
              </span>
            </div>
            <p style={{ marginTop: 10, fontSize: 13.5, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {l.blurb}
            </p>
          </div>
        ))}
      </div>

      <p style={{ margin: '24px 0 10px', fontSize: 13.5, color: 'var(--color-muted-foreground)', lineHeight: 1.6 }}>
        The grammatical layer&apos;s binder desugars directly into monadic do-notation:
      </p>
      <pre
        className="t-code"
        style={{
          padding: 16,
          fontSize: 12.5,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          overflowX: 'auto',
          color: 'var(--color-foreground)',
          lineHeight: 1.6,
        }}
      >
        {`[x := m(T₁,…,Tₙ)] F   ≡   do { x ← m(T₁,…,Tₙ); F }`}
      </pre>
    </section>
  )
}
