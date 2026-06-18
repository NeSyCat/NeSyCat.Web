export default function Abstract() {
  return (
    <section
      id="abstract"
      style={{
        padding: '48px 48px 64px',
        borderTop: '1px solid var(--color-border)',
        maxWidth: 1120,
        margin: '0 auto',
      }}
    >
      <div className="split-2">
        {/* Left column — eyebrow + headline */}
        <div>
          <div className="t-eyebrow">§ The idea</div>
          <h2
            style={{
              margin: '12px 0 0',
              fontSize: 'var(--text-h2)',
              fontWeight: 600,
              color: 'var(--color-foreground)',
              letterSpacing: '-0.015em',
              lineHeight: 'var(--lh-h3)',
            }}
          >
            The axioms are the source code.
          </h2>
        </div>

        {/* Right column — prose */}
        <div>
          <p
            className="t-lead"
            style={{ margin: '0 0 18px', textWrap: 'pretty' }}
          >
            NeSyCat extends ULLER and subsumes classical, fuzzy, probabilistic
            and neural systems under a <em>single</em> inductive definition of
            truth — parametric in a strong monad{' '}
            <span className="t-code">ℳ</span> (the effect) and an aggregation
            structure on truth-values <span className="t-code">Ω</span>.
          </p>

          <p
            style={{
              margin: '0 0 18px',
              fontSize: 15,
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--lh-body)',
            }}
          >
            The key observation: an ULLER computation formula{' '}
            <span className="t-code">x := m(T₁,…,Tₙ)(F)</span> — run model{' '}
            <span className="t-code">m</span>, bind its result to{' '}
            <span className="t-code">x</span>, then evaluate{' '}
            <span className="t-code">F</span> — is exactly monadic do-notation.
            Fixing a strong monad <span className="t-code">ℳ</span> and an
            aggregated truth-value space <span className="t-code">Ω</span> with
            connectives and quantifiers yields a NeSy framework; classical,
            fuzzy, probabilistic, LTN and possibilistic semantics all reappear
            as choices of <span className="t-code">ℳ</span> and{' '}
            <span className="t-code">Ω</span>, evaluated by{' '}
            <em>one</em> inductive definition of truth.
          </p>

          <p
            style={{
              margin: '0 0 18px',
              fontSize: 15,
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--lh-body)',
            }}
          >
            NeSyCat had so far lacked an account of predicates and functions
            learned by neural networks. NeSyCat Torch is the missing link: it
            interprets computational symbols via neural networks.
          </p>

          <p
            style={{
              margin: '0 0 24px',
              fontSize: 15,
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--lh-body)',
            }}
          >
            That is why the axioms <em>are</em> the source code: written once in
            monad-based do-notation, monadic bind performs marginalisation,
            lazily pruning unneeded branches. With lazy monads, marginalisation
            is only done where it is actually needed.
          </p>

          {/* Highlighted callout — the central equivalence */}
          <div
            className="surface"
            style={{
              padding: 22,
              background: 'var(--color-surface)',
            }}
          >
            <pre
              className="t-code"
              style={{
                margin: 0,
                padding: 16,
                fontSize: 12.5,
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                overflowX: 'auto',
                color: 'var(--color-foreground)',
                lineHeight: 1.6,
              }}
            >
              {`[x := m(T₁,…,Tₙ)] F   ≡   do { x ← m(T₁,…,Tₙ); F }`}
            </pre>
            <p
              style={{
                margin: '12px 0 0',
                fontSize: 13,
                color: 'var(--color-muted-foreground)',
                lineHeight: 1.6,
              }}
            >
              ULLER/NeSyCat syntax (left) is literally monadic do-notation
              (right).
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
