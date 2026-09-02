import { codeToHtml } from 'shiki'
import { GitHubIcon, LinkButton } from '../Buttons'
import { Tex } from '../Tex'

const h2: React.CSSProperties = {
  margin: '10px 0 8px',
  fontSize: 'var(--text-h2)',
  fontWeight: 600,
  color: 'var(--color-foreground)',
  letterSpacing: '-0.015em',
}
const para: React.CSSProperties = {
  margin: '0 0 10px',
  fontSize: 15,
  color: 'var(--color-text-secondary)',
  lineHeight: 'var(--lh-body)',
}

// A condensed-but-faithful excerpt of
// NeSyCat.Mathematics/NeSyCat/CategoricalLayer/SemiringMonads/SemiringMonad.lean
// (the semiring weight monad `MS S`) — code lines verbatim from the library,
// doc comments trimmed to fit. Read-only source, harvested not modified.
const LEAN_SNIPPET = `variable {S : Type*} [Semiring S] {X Y Z : Type*}

/-- Semiring monad: finitely supported S-weighted combinations. -/
abbrev MS (S : Type*) [Semiring S] (X : Type*) := X →₀ S

/-- Unit: the Dirac delta at \`x\`. -/
noncomputable def ret (x : X) : MS S X := Finsupp.single x 1

/-- Bind: matrix multiplication over \`S\`; addition marginalises. -/
noncomputable def bind (f : MS S X) (k : X → MS S Y) : MS S Y :=
  f.sum fun x w => w • k x

/-- Left unit law — one of the proved monad laws. -/
theorem ret_bind (x : X) (k : X → MS S Y) : bind (ret x) k = k x := by
  unfold bind ret
  rw [Finsupp.sum_single_index (zero_smul S (k x))]
  exact one_smul S (k x)`

// § Mathematics. Adapted from Abstract.tsx / Monads.tsx — the categorical,
// monad-parametric definition of truth that the rest of NeSyCat builds on —
// plus a real excerpt from the NeSyCat.Mathematics Lean library. Server
// component: the Lean is syntax-highlighted server-side via shiki, same as
// the old Example.tsx section did for Python.
export default async function MathematicsPanel() {
  let codeHtml: string | null = null
  try {
    codeHtml = await codeToHtml(LEAN_SNIPPET, { lang: 'lean4', theme: 'github-light' })
  } catch {
    codeHtml = null // fall back to a plain <pre> below
  }

  return (
    <section>
      <div className="t-eyebrow">§ Mathematics · Category theory</div>
      <h2 style={h2}>One definition of truth.</h2>

      <p style={para}>
        A semantics is a strong monad <Tex>{'\\mathcal{M}'}</Tex> on a copy-discard category with
        a truth object <Tex>{'\\Omega'}</Tex>. The categorical layer builds{' '}
        <Tex>{'\\mathcal{M}'}</Tex> as the weight monad of a semiring: finitely supported weight
        functions, with bind as matrix multiplication. Boolean, mass, log and t-norm rows are all
        instances, and the monad is commutative exactly when the semiring is. Probability itself
        is not a semiring, so distributions enter as the mass-one submonad.
      </p>

      <p style={para}>
        The logical layer takes <Tex>{'\\Omega'}</Tex> to be <Tex>{'\\mathcal{M}'}</Tex>{' '}
        applied to the Booleans, deriving connectives by lifting Boolean operations through it. What lifts
        is not a semiring but a bounded lattice carrying two monoids, in linear logic&apos;s
        vocabulary — and the copying axioms hold only where the carrier is idempotent. The domain
        layer adds function and relation symbols whose argument slots are tagged plain or
        monadic; the grammatical layer gives terms and formulas a Kleisli interpretation, with
        substitution as a grammar rule rather than a meta-operation.
      </p>

      <p style={para}>
        The statistical layer meets implementation: batching is a reader transformer, proved
        semantically transparent, and softmax bridges the log-weight and probability readings
        exactly when every bound continuation preserves mass. All of it is a blueprint-driven
        Lean 4 library over mathlib — categorical, logical, domain, grammatical, statistical —
        where an item is marked proved only when its Lean declaration actually is.
      </p>

      <p style={{ ...para, margin: '0 0 6px', color: 'var(--color-muted-foreground)' }}>
        The categorical layer in Lean: <Tex>{'\\mathcal{M}'}</Tex> over a semiring, with return,
        bind, and the left unit law.
      </p>

      {codeHtml ? (
        <div className="code-block" dangerouslySetInnerHTML={{ __html: codeHtml }} />
      ) : (
        <pre
          className="t-code"
          style={{
            margin: 0,
            padding: 16,
            fontSize: 12.5,
            color: 'var(--color-text-secondary)',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            overflowX: 'auto',
            whiteSpace: 'pre',
          }}
        >
          {LEAN_SNIPPET}
        </pre>
      )}

      <div style={{ marginTop: 18 }}>
        <LinkButton href="https://github.com/NeSyCat/NeSyCat.Mathematics" variant="primary" big external>
          <GitHubIcon size={16} /> github.com/NeSyCat/NeSyCat.Mathematics{' '}
          <span style={{ opacity: 0.7, fontSize: 12 }}>↗</span>
        </LinkButton>
      </div>
    </section>
  )
}
