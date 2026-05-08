const ACC = '59, 130, 246'

type Layer = {
  greek: string
  num: string
  name: string
  blurb: string
}

// Layer descriptions distilled from the introduction of nesycat-theory.tex
// (sec. 0): each one names the categorical universe and what the layer adds.
const LAYERS: Layer[] = [
  {
    greek: 'α',
    num: '01',
    name: 'Categorical',
    blurb:
      'Picks the ambient category (Cat or Hask) and the paradigm-specific monads. Sets the stage for everything above it.',
  },
  {
    greek: 'β',
    num: '02',
    name: 'Logical',
    blurb:
      'Equips a truth sort with a 2Mon-BLat of connectives and quantifiers. Cartesian-closed: Set, QBS for measure, Dflg for geometry.',
  },
  {
    greek: 'γ',
    num: '03',
    name: 'Domain',
    blurb:
      'Declares non-logical sorts and function symbols — the actual objects of the theory: tensors, reals, measurable sets.',
  },
  {
    greek: 'δ',
    num: '04',
    name: 'Grammatical',
    blurb:
      'Generates formulas via a context-free grammar combining domain and logical symbols. The CCC into which both Logical and Domain embed.',
  },
  {
    greek: 'ε',
    num: '05',
    name: 'Inferential',
    blurb:
      'Turns formulas into a combined loss J(θ) = (1−λ)·J_data + λ·J_know. Where data and knowledge meet.',
  },
  {
    greek: 'ζ',
    num: '06',
    name: 'Statistical',
    blurb:
      'Provides evaluation metrics — accuracy, F1, precision. The thin top layer that connects back to ML practice.',
  },
]

export default function Layers() {
  return (
    <section
      id="layers"
      style={{
        padding: '40px 48px 64px',
        borderTop: '1px solid var(--color-glass-border)',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <div className="t-caption" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
        § 3 The six layers
      </div>
      <h2
        style={{
          margin: '14px 0 8px',
          fontSize: 28,
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.4px',
        }}
      >
        From category to metric, in six steps.
      </h2>
      <p
        style={{
          margin: '0 0 32px',
          fontSize: 14,
          color: 'var(--color-text-muted)',
          maxWidth: 720,
          lineHeight: 1.6,
        }}
      >
        Each layer specifies six interrelated components: a theory, vocabulary, category, type
        system, parameters, and training. Each HaskTorch module mirrors one layer.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {LAYERS.map((l) => (
          <div
            key={l.num}
            style={{
              padding: 20,
              border: '1px solid var(--color-glass-border)',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.02)',
              minHeight: 160,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: `rgba(${ACC},0.95)`,
                  letterSpacing: '-0.5px',
                }}
              >
                {l.greek}
              </span>
              <span
                className="t-mono"
                style={{ fontSize: 11, color: 'var(--color-text-dimmed)', fontWeight: 600 }}
              >
                {l.num}
              </span>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.2px',
                }}
              >
                {l.name}
              </span>
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 13,
                color: 'var(--color-text-muted)',
                lineHeight: 1.6,
              }}
            >
              {l.blurb}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
