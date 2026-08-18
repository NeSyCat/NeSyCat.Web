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

// The MNIST-addition axiom, verbatim (code tokens unchanged; doc comments
// shortened to fit) from
// NeSyCat.AI.HaskTorch/Examples/MnistAddition/D_Grammatical/Signature.hs
// lines 29-60 — read-only source, harvested not modified.
const HASKELL_SNIPPET = `-- | The per-pair FORMULA  n = digit(x) + digit(y), monad-polymorphic over m.
mnistFormula ::
  forall m.
  (MnistKlFun m) =>
  Weights ->
  (m Image, m Image, m Natural) ->
  m Omega
mnistFormula theta (x, y, n) =
    do d1 <- digit theta x   -- x, y, n all arrive encoded (eta) from the data
       d2 <- digit theta y
       s <- n
       return (s == (d1 + d2))

-- | The SENTENCE  forall (x,y,n) in data. n = digit(x) + digit(y)
mnistSentence ::
  forall m.
  (MnistKlFun m, TwoMonBLat Omega, A2MonBLat m Omega, Monad m) =>
  ParamsLogic Omega ->
  Guard m (m Image, m Image, m Natural) ->
  Weights ->
  m Omega
mnistSentence lp guard theta = bigWedge lp guard (mnistFormula @m theta)`

// § Type theory. Not a corner — the diamond's INTERIOR (see the
// .hotspot--typetheory hit area in Explorer.tsx / globals.css). Points at
// NeSyCat.AI.HaskTorch, the Haskell/HaskTorch reference implementation: a
// real do-block, monad-polymorphic over the semantics, is the axiom itself.
// Server component: the Haskell is syntax-highlighted server-side via
// shiki, same pattern as MathematicsPanel's Lean excerpt.
export default async function TypeTheoryPanel() {
  let codeHtml: string | null = null
  try {
    codeHtml = await codeToHtml(HASKELL_SNIPPET, { lang: 'haskell', theme: 'github-light' })
  } catch {
    codeHtml = null // fall back to a plain <pre> below
  }

  return (
    <section>
      <div className="t-eyebrow">§ Type theory · HaskTorch</div>
      <h2 style={h2}>The axiom is the program.</h2>

      <p style={para}>
        NeSyCat.TypeTheory is the Haskell implementation, built on HaskTorch&apos;s libtorch
        bindings. A shared Library keeps the layer names — A_Categorical (the monads), B_Logical
        (connectives and quantifiers), C_Domain (sorts and neural Kleisli symbols), D_Grammatical
        (the axiom), E_Data, F_Inferential (training), G_Statistical (metrics) — and each example
        is a C–G stack plus a Definition.hs manifest.
      </p>

      <p style={para}>
        A monad is a return and a bind, and here bind is exactly the marginalising composition of
        the semantics. Dist and LogTens are free monads, so a do-block computes nothing: it builds
        the formula&apos;s tree, and every arrow is a summation sign the interpreter discharges.
        The law of total probability is literally the interpreter&apos;s bind case. The axiom in
        do-notation is the evaluator.
      </p>

      <p style={para}>
        Choosing <Tex>{'\\mathcal{M}'}</Tex>{' '}chooses the logic. At Dist that nested sum gives
        probabilities; at LogTens the leaves carry batched log-weight tensors and the bind becomes
        a log-space convolution — variable elimination, so the full joint need not form — and
        training minimises the axiom&apos;s own negative log satisfaction.
      </p>

      <p style={para}>
        Types enforce the discipline. The formula names no monad: it is quantified over{' '}
        <Tex>{'\\mathcal{M}'}</Tex>{' '}under one signature class, and the data a quantifier ranges
        over is a type family, so the same universal is a list fold under Dist and one vectorised
        op under LogTens. An ill-sorted or unbound term does not compile.
      </p>

      <p style={{ ...para, margin: '0 0 6px', color: 'var(--color-muted-foreground)' }}>
        The MNIST-addition axiom in full: one do-block, polymorphic in the monad, with its
        quantifier.
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
          {HASKELL_SNIPPET}
        </pre>
      )}

      <div style={{ marginTop: 18 }}>
        <LinkButton href="https://github.com/NeSyCat/NeSyCat.TypeTheory" variant="primary" big external>
          <GitHubIcon size={16} /> github.com/NeSyCat/NeSyCat.TypeTheory{' '}
          <span style={{ opacity: 0.7, fontSize: 12 }}>↗</span>
        </LinkButton>
      </div>
    </section>
  )
}
