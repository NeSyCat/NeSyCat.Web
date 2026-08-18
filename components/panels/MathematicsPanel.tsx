import { Tex } from '../Tex'

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

// § Mathematics. Adapted from Abstract.tsx / Monads.tsx — the categorical,
// monad-parametric definition of truth that the rest of NeSyCat builds on.
export default function MathematicsPanel() {
  return (
    <section>
      <div className="t-eyebrow">§ Mathematics · Category theory</div>
      <h2 style={h2}>One definition of truth.</h2>

      <p className="t-lead" style={{ margin: '0 0 18px', textWrap: 'pretty' }}>
        Neurosymbolic AI is fragmented: classical, fuzzy and probabilistic systems each carry their
        own logic and semantics. NeSyCat recasts all three as instances of a single categorical
        framework built on <em>monads</em> — Moggi&apos;s construct for computational effects.
      </p>

      <p style={para}>
        A semantics is fixed by just two choices: a strong monad <Tex>{'\\mathcal{M}'}</Tex> — the
        computational effect — and a space of truth-values <Tex>{'\\Omega'}</Tex> carrying the
        connectives and quantifiers. Fix those two, and{' '}
        <strong style={{ color: 'var(--color-foreground)' }}>
          classical, fuzzy, probabilistic, LTN and possibilistic
        </strong>{' '}
        logics all fall out as special cases of <em>one</em> inductive definition of truth,
        evaluated by monadic bind. The axioms are the source code.
      </p>

      <p style={{ ...para, margin: 0 }}>
        This mathematics is being formalized in Lean 4 / mathlib as a blueprint-driven library.
      </p>
    </section>
  )
}
