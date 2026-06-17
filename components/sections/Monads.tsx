type Monad = {
  symbol: string
  code: string
  effect: string
  blurb: string
}

// The four monads from which NeSyCat Torch builds its three layers.
const MONADS: Monad[] = [
  {
    symbol: '𝒟',
    code: 'Dist',
    effect: 'finite probability',
    blurb:
      'Finitely supported probability distributions; the reference semantics and metric readout.',
  },
  {
    symbol: '𝒯',
    code: 'Tens',
    effect: 'logit weights',
    blurb:
      'Finite-support tensor monad 𝒯 m = ℝᵐ (leaves are weight tensors); bind is the linear pushforward.',
  },
  {
    symbol: '𝒯_log',
    code: 'LogTens',
    effect: 'stable arithmetic',
    blurb:
      'Tens in logarithmic coordinates, over the log-semiring (ℝ, logsumexp, +): numerically stable and differentiable — the monad used in training.',
  },
  {
    symbol: 'ℬ',
    code: 'Batch',
    effect: 'batching',
    blurb:
      'Reader monad on the batch index 𝐵; parallel processing of a mini-batch in training.',
  },
]

type Layer = { name: string; monad: string; note: string }

const LAYERS: Layer[] = [
  {
    name: 'Probability layer',
    monad: '𝒟',
    note: 'the reference semantics.',
  },
  {
    name: 'Tensor layer',
    monad: '𝒯 / LogTens',
    note: 'differentiable; real logits instead of probabilities.',
  },
  {
    name: 'Batching layer',
    monad: 'ℬ',
    note: 'parallel training samples; carries no probability and no geometry.',
  },
]

export default function Monads() {
  return (
    <section
      id="monads"
      style={{
        padding: '48px 48px 64px',
        borderTop: '1px solid var(--color-border)',
        maxWidth: 1120,
        margin: '0 auto',
      }}
    >
      <div className="t-eyebrow">§ Monads for computational effects</div>
      <h2
        style={{
          margin: '12px 0 10px',
          fontSize: 'var(--text-h2)',
          fontWeight: 600,
          color: 'var(--color-foreground)',
          letterSpacing: '-0.015em',
        }}
      >
        Three monad layers.
      </h2>
      <p
        style={{
          margin: '0 0 24px',
          fontSize: 15,
          color: 'var(--color-text-secondary)',
          maxWidth: 640,
          lineHeight: 'var(--lh-body)',
        }}
      >
        A monad is a triple <span className="t-code">(m, return, &gt;&gt;=)</span>:{' '}
        <span className="t-code">return</span> embeds a value into a computation;{' '}
        <span className="t-code">&gt;&gt;=</span> (bind) composes computations. The one choice that
        genuinely varies is the effect — the monad ℳ. NeSyCat Torch uses three layers, built from
        four monads.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}
      >
        {MONADS.map((m) => (
          <div key={m.code} className="surface" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span className="t-code" style={{ fontSize: 26, color: 'var(--color-primary)', lineHeight: 1 }}>
                {m.symbol}
              </span>
              <span className="t-code" style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-foreground)' }}>
                {m.code}
              </span>
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: 'var(--color-muted-foreground)',
              }}
            >
              {m.effect}
            </div>
            <p style={{ marginTop: 10, fontSize: 13.5, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {m.blurb}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}
      >
        {LAYERS.map((l) => (
          <div key={l.name} className="surface" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-foreground)' }}>{l.name}</span>
              <span className="t-code" style={{ fontSize: 13, color: 'var(--color-primary)' }}>{l.monad}</span>
            </div>
            <p style={{ marginTop: 10, fontSize: 13.5, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {l.note}
            </p>
          </div>
        ))}
      </div>

      <p
        style={{
          margin: '0 0 18px',
          fontSize: 13.5,
          color: 'var(--color-text-secondary)',
          maxWidth: 640,
          lineHeight: 'var(--lh-body)',
        }}
      >
        The training monad is the composite{' '}
        <span className="t-code" style={{ color: 'var(--color-primary)' }}>ℬ∘𝒯</span>.
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
          margin: 0,
        }}
      >
        {`Why log space — score now, normalise once at the boundary:
  · products of probabilities become sums; marginalisation becomes log-sum-exp (numerically stable)
  · weights range over all of ℝ instead of being squashed into [0,1]
  · softmax is shift-invariant, so normalising is deferred to the boundary`}
      </pre>
    </section>
  )
}
