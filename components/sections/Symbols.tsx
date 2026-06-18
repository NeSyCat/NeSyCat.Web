type SymbolKind = {
  name: string
  tag: string
  signatures: string
  note: string
}

// Function and relation symbols are each partitioned into three kinds.
// Only the third (Nesy) is neural.
const KINDS: SymbolKind[] = [
  {
    name: 'Tarski',
    tag: 'deterministic',
    signatures: `f : S₁,…,Sₙ → T
R : S₁,…,Sₙ → τ`,
    note: 'A plain (pure) map; its result re-enters the monad through return.',
  },
  {
    name: 'Kleisli',
    tag: 'effectful',
    signatures: `f : S₁,…,Sₙ → ◯T
R : S₁,…,Sₙ → ◯τ`,
    note: 'Already monadic; it stands as the final do-expression, without return.',
  },
  {
    name: 'Nesy',
    tag: 'neural',
    signatures: `f : ◯S₁,…,◯Sₙ → ◯T
R : ◯S₁,…,◯Sₙ → ◯τ`,
    note: 'Takes monadic carriers as input and produces monadic carriers — realised by neural networks; no binds occur.',
  },
]

export default function Symbols() {
  return (
    <section
      id="symbols"
      style={{
        padding: '48px 48px 64px',
        borderTop: '1px solid var(--color-border)',
        maxWidth: 1120,
        margin: '0 auto',
      }}
    >
      <div className="t-eyebrow">§ Symbols</div>
      <h2
        style={{
          margin: '12px 0 10px',
          fontSize: 'var(--text-h2)',
          fontWeight: 600,
          color: 'var(--color-foreground)',
          letterSpacing: '-0.015em',
        }}
      >
        Three kinds of symbol — one is neural.
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
        Function and relation symbols are each partitioned into three kinds. Only the third is
        neural. (To stay close to first-order logic, symbols may not take arguments of truth type.)
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 28,
        }}
      >
        {KINDS.map((k) => (
          <div key={k.name} className="surface" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: 'var(--color-foreground)',
                  letterSpacing: '-0.01em',
                }}
              >
                {k.name}
              </span>
              <span className="t-code" style={{ fontSize: 11.5, color: 'var(--color-primary)' }}>
                {k.tag}
              </span>
            </div>

            <pre
              className="t-code"
              style={{
                margin: '14px 0 0',
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
              {k.signatures}
            </pre>

            <p
              style={{
                marginTop: 12,
                fontSize: 13.5,
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
              }}
            >
              {k.note}
            </p>
          </div>
        ))}
      </div>

      <p
        style={{
          margin: 0,
          fontSize: 13.5,
          color: 'var(--color-muted-foreground)',
          maxWidth: 640,
          lineHeight: 1.6,
        }}
      >
        In the MNIST-addition example,{' '}
        <span className="t-code" style={{ color: 'var(--color-primary)' }}>
          digit : Image → ℳ Digit
        </span>{' '}
        is the only monad-dependent symbol;{' '}
        <span className="t-code">+</span> and <span className="t-code">=</span> are ordinary
        (Tarski) symbols.
      </p>
    </section>
  )
}
