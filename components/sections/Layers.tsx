import type { ReactNode } from 'react'
import { Tex, TexBlock } from '../Tex'

type Layer = { index: string; name: string; blurb: ReactNode }

// The four syntax/semantics layers of NeSyCat Torch (NOT six) — each a pair of
// a signature (symbols) and an interpretation (meaning); the fourth assigns the
// monadic semantics by one induction.
const LAYERS: Layer[] = [
  {
    index: '01',
    name: 'Categorical',
    blurb: (
      <>
        Work in <Tex>{'\\mathbf{Set}'}</Tex> (computationally: Haskell types and maps). Parameters
        are drawn from <Tex>{'\\mathbf{Tens}'}</Tex> — Euclidean spaces <Tex>{'\\mathbb{R}^n'}</Tex>{' '}
        with differentiable maps, where the neural networks live and backpropagation happens. The one
        choice that varies is the effect: a single monad symbol <Tex>{'\\bigcirc'}</Tex>, with{' '}
        <Tex>{'\\mathcal{M} := \\mathcal{I}(\\bigcirc)'}</Tex>.
      </>
    ),
  },
  {
    index: '02',
    name: 'Logical',
    blurb: (
      <>
        Basic truth values are Booleans, <Tex>{'\\Omega = \\mathbb{B}'}</Tex>. The connectives{' '}
        <Tex>{'\\wedge,\\ \\vee,\\ \\neg,\\ \\rightarrow'}</Tex> are the ordinary Boolean operations,
        lifted to act on monadic truth values <Tex>{'\\mathcal{M}\\,\\Omega'}</Tex>. The only
        genuinely monadic logical symbols are the quantifiers:{' '}
        <Tex>{'\\mathcal{I}(Q)_D : (D \\to \\mathcal{M}\\,\\Omega) \\to \\mathcal{M}\\,\\Omega'}</Tex>.
      </>
    ),
  },
  {
    index: '03',
    name: 'Domain',
    blurb: (
      <>
        Declares domain symbols, variables, and function/relation symbols — the actual objects of the
        theory (e.g.&nbsp;Image, Digit, Nat). Each function or relation symbol is one of three kinds:
        Tarski, Kleisli or Nesy.
      </>
    ),
  },
  {
    index: '04',
    name: 'Grammatical',
    blurb: (
      <>
        Generates terms in the do-notation the implementation uses; formulas are terms of the truth
        type <Tex>{'\\tau'}</Tex>. It recovers the ULLER/NeSyCat syntax and fixes the semantics
        pointwise at a valuation <Tex>{'\\nu'}</Tex> by a single induction.
      </>
    ),
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
          maxWidth: 660,
          lineHeight: 'var(--lh-body)',
        }}
      >
        NeSyCat Torch organises syntax and semantics into four layers, each a pair of a{' '}
        <strong style={{ color: 'var(--color-foreground)', fontWeight: 600 }}>signature</strong>{' '}
        (the symbols) and an{' '}
        <strong style={{ color: 'var(--color-foreground)', fontWeight: 600 }}>interpretation</strong>{' '}
        (their meaning). The first three declare and interpret symbols; the fourth generates the terms
        and assigns their monadic semantics by one induction.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
        }}
      >
        {LAYERS.map((l) => (
          <div key={l.index} className="surface" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span className="t-code" style={{ fontSize: 13, color: 'var(--color-primary)' }}>{l.index}</span>
              <span style={{ fontSize: 17, fontWeight: 600, color: 'var(--color-foreground)', letterSpacing: '-0.01em' }}>
                {l.name}
              </span>
            </div>
            <p style={{ marginTop: 10, fontSize: 13.5, color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
              {l.blurb}
            </p>
          </div>
        ))}
      </div>

      <p style={{ margin: '24px 0 10px', fontSize: 13.5, color: 'var(--color-muted-foreground)', lineHeight: 1.6 }}>
        The grammatical layer&apos;s binder desugars directly into monadic do-notation:
      </p>
      <div
        className="surface"
        style={{ padding: '16px 20px', background: 'var(--color-surface)', overflowX: 'auto' }}
      >
        <TexBlock>
          {'[\\,x := m(T_1,\\dots,T_n)\\,]\\,F \\quad\\equiv\\quad \\mathbf{do}\\;\\{\\; x \\leftarrow m(T_1,\\dots,T_n);\\; F \\;\\}'}
        </TexBlock>
      </div>
    </section>
  )
}
