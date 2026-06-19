import { Tex } from '../Tex'

const para: React.CSSProperties = {
  margin: '0 0 18px',
  fontSize: 15,
  color: 'var(--color-text-secondary)',
  lineHeight: 'var(--lh-body)',
}

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

        <div>
          <p className="t-lead" style={{ margin: '0 0 18px', textWrap: 'pretty' }}>
            Neurosymbolic AI joins neural perception with symbolic reasoning, but the field is
            fragmented: classical, fuzzy and probabilistic systems each carry their own logic and
            semantics, so knowledge bases and learning objectives rarely transfer. ULLER unifies the{' '}
            <em>syntax</em> — one first-order language — yet still ships three separate, hand-written
            definitions of truth.
          </p>

          <p style={para}>
            NeSyCat collapses them into one. It recasts classical, fuzzy and probabilistic semantics
            as instances of a single categorical framework built on <em>monads</em>, Moggi&apos;s
            construct for computational effects. A semantics is then fixed by just two choices: a
            strong monad <Tex>{'\\mathcal{M}'}</Tex> — the computational effect — and a space of
            truth-values <Tex>{'\\Omega'}</Tex> carrying the connectives and quantifiers.
          </p>

          <p style={para}>
            What NeSyCat lacked was neural learning. <strong style={{ color: 'var(--color-foreground)' }}>NeSyCat Torch</strong>{' '}
            supplies it: predicates and functions become neural networks, interpreted as{' '}
            <em>computational symbols</em> — a function symbol <Tex>{'f : X \\to \\mathcal{M}\\,Y'}</Tex>{' '}
            and a predicate symbol <Tex>{'R : X \\to \\mathcal{M}\\,\\Omega'}</Tex>, with two-sided
            tensor forms <Tex>{'\\mathcal{M}X \\to \\mathcal{M}Y'}</Tex> at the deep-learning level.
          </p>

          <p style={para}>
            And because the semantics is a single induction over monadic do-notation, the axiom you
            write <em>is</em> the program that runs: monadic bind performs the marginalisation, and
            the monads are <em>lazy</em>, so it only marginalises the branches it actually needs.
          </p>

          {/* highlight — the central, parametric idea (not the do-notation syntax) */}
          <div
            className="surface"
            style={{
              padding: '18px 20px',
              background: 'var(--color-surface)',
              marginTop: 4,
            }}
          >
            <p style={{ margin: 0, fontSize: 14.5, color: 'var(--color-foreground)', lineHeight: 1.65 }}>
              Fix the effect <Tex>{'\\mathcal{M}'}</Tex> and the truth-values <Tex>{'\\Omega'}</Tex>, and{' '}
              <strong>classical, fuzzy, probabilistic, LTN and possibilistic</strong> logics all fall
              out as special cases — evaluated by <em>one</em> inductive definition of truth.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
