export default function Example() {
  return (
    <section
      id="example"
      style={{
        padding: '48px 48px 64px',
        borderTop: '1px solid var(--color-border)',
        maxWidth: 1120,
        margin: '0 auto',
      }}
    >
      <div className="t-eyebrow">§ Running example</div>
      <h2
        style={{
          margin: '12px 0 10px',
          fontSize: 'var(--text-h2)',
          fontWeight: 600,
          color: 'var(--color-foreground)',
          letterSpacing: '-0.015em',
        }}
      >
        MNIST addition, by distant supervision.
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
        Single-digit MNIST addition under <em>distant</em> supervision — only the sum of two
        handwritten digits is observed, never the digits themselves. The axiom is{' '}
        <span className="t-code" style={{ color: 'var(--color-foreground)' }}>
          ∀ (x,y,n):S. ( n = digit(x) + digit(y) )
        </span>
        .
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div className="surface" style={{ padding: 22 }}>
          <div
            style={{
              fontSize: 'var(--text-h5)',
              fontWeight: 600,
              color: 'var(--color-foreground)',
              marginBottom: 4,
            }}
          >
            The derivation
          </div>
          <div
            className="t-code"
            style={{ fontSize: 11.5, color: 'var(--color-primary)', marginBottom: 12 }}
          >
            Haskell · do-notation
          </div>
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
              margin: 0,
            }}
          >
            {`do { d₁ ← dig_θ(x)
   ; d₂ ← dig_θ(y)
   ; return ( n = (d₁ + d₂) ) }`}
          </pre>
          <p
            style={{
              marginTop: 12,
              marginBottom: 0,
              fontSize: 13.5,
              color: 'var(--color-muted-foreground)',
              lineHeight: 1.6,
            }}
          >
            Each ← performs the law of total probability in 𝒟 and the log-space convolution in 𝒯.
            This is not pseudo-code — it <em>is</em> the semantic value, and the identical text
            compiles as Haskell.
          </p>
        </div>

        <div className="surface" style={{ padding: 22 }}>
          <div
            style={{
              fontSize: 'var(--text-h5)',
              fontWeight: 600,
              color: 'var(--color-foreground)',
              marginBottom: 4,
            }}
          >
            The formula
          </div>
          <div
            className="t-code"
            style={{ fontSize: 11.5, color: 'var(--color-primary)', marginBottom: 12 }}
          >
            Python · generator
          </div>
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
              margin: 0,
            }}
          >
            {`class MNistAddition(Example, DistLogTensBridge):
    def formula(self, m, x: Monad[Image], y: Monad[Image], n: Monad[int]) -> Formula[bool]:
        d1 = yield self.digit(m, x)
        d2 = yield self.digit(m, y)
        s = yield n
        return s == d1 + d2`}
          </pre>
          <p
            style={{
              marginTop: 12,
              marginBottom: 0,
              fontSize: 13.5,
              color: 'var(--color-muted-foreground)',
              lineHeight: 1.6,
            }}
          >
            In Python, <span className="t-code">yield</span> replaces Haskell&apos;s ← — the
            generator syntax is the same monadic composition.
          </p>
        </div>
      </div>

      <div className="surface" style={{ padding: 22 }}>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--lh-body)',
          }}
        >
          The two classifiers return a pair, joined by the outer product{' '}
          <span className="t-code" style={{ color: 'var(--color-foreground)' }}>
            a⊗b
          </span>
          , giving exactly the discrete convolution{' '}
          <span className="t-code" style={{ color: 'var(--color-foreground)' }}>
            𝒯(sum)(a⊗b)(s) = Σ_(i+k=s) aᵢ·bₖ = (a∗b)(s)
          </span>
          : the unnormalised distribution of the sum. The network learns to read digits (≈97% digit
          accuracy) from the observed sums alone — never using digit labels.
        </p>
      </div>
    </section>
  )
}
