import type { ReactNode } from 'react'
import { Tex } from '../Tex'

type Monad = { sym: string; code: string; effect: string; blurb: ReactNode }

// The four monads NeSyCat Torch builds its three layers from.
const MONADS: Monad[] = [
  {
    sym: '\\mathcal{D}',
    code: 'Dist',
    effect: 'finite probability',
    blurb: 'Finitely supported probability distributions; the reference semantics and metric readout.',
  },
  {
    sym: '\\mathcal{T}',
    code: 'Tens',
    effect: 'logit weights',
    blurb: (
      <>
        Finite-support tensor monad <Tex>{'\\mathcal{T}\\,m = \\mathbb{R}^m'}</Tex> (leaves are weight
        tensors); bind is the linear pushforward.
      </>
    ),
  },
  {
    sym: '\\mathcal{T}_{\\log}',
    code: 'LogTens',
    effect: 'stable arithmetic',
    blurb: (
      <>
        Tens in logarithmic coordinates, over the log-semiring{' '}
        <Tex>{'(\\mathbb{R},\\ \\mathrm{logsumexp},\\ +)'}</Tex>: numerically stable and
        differentiable — the monad used in training.
      </>
    ),
  },
  {
    sym: '\\mathcal{B}',
    code: 'Batch',
    effect: 'batching',
    blurb: (
      <>
        Reader monad on the batch index <Tex>{'\\underline{B}'}</Tex>; parallel processing of a
        mini-batch in training.
      </>
    ),
  },
]

type Layer = { name: string; tex: string; note: string }
const LAYERS: Layer[] = [
  { name: 'Probability layer', tex: '\\mathcal{D}', note: 'the reference semantics.' },
  { name: 'Tensor layer', tex: '\\mathcal{T} / \\mathcal{T}_{\\log}', note: 'differentiable; real logits instead of probabilities.' },
  { name: 'Batching layer', tex: '\\mathcal{B}', note: 'parallel training samples; carries no probability and no geometry.' },
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
          maxWidth: 660,
          lineHeight: 'var(--lh-body)',
        }}
      >
        A monad is a triple <span className="t-code">(m, return, &gt;&gt;=)</span>:{' '}
        <span className="t-code">return</span> embeds a value into a computation;{' '}
        <span className="t-code">&gt;&gt;=</span> (bind) composes computations. The one choice that
        genuinely varies is the effect — the monad <Tex>{'\\mathcal{M}'}</Tex>. NeSyCat Torch uses
        three layers, built from four monads.
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
              <span style={{ fontSize: 22, color: 'var(--color-primary)', lineHeight: 1 }}>
                <Tex>{m.sym}</Tex>
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
              <span style={{ fontSize: 14, color: 'var(--color-primary)' }}>
                <Tex>{l.tex}</Tex>
              </span>
            </div>
            <p style={{ marginTop: 10, fontSize: 13.5, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {l.note}
            </p>
          </div>
        ))}
      </div>

      <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--color-text-secondary)', maxWidth: 720, lineHeight: 'var(--lh-body)' }}>
        The training monad is the composite <Tex>{'\\mathcal{B} \\circ \\mathcal{T}'}</Tex>.
      </p>

      <div className="surface" style={{ padding: '16px 20px', background: 'var(--color-surface)' }}>
        <p style={{ margin: 0, fontSize: 13.5, color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
          <strong style={{ color: 'var(--color-foreground)' }}>Why log space?</strong> Products of
          probabilities become sums and marginalisation becomes log-sum-exp (numerically stable);
          weights range over all of <Tex>{'\\mathbb{R}'}</Tex> instead of being squashed into{' '}
          <Tex>{'[0,1]'}</Tex>; and because softmax is shift-invariant, normalising is deferred —
          score now, normalise once at the boundary.
        </p>
      </div>
    </section>
  )
}
