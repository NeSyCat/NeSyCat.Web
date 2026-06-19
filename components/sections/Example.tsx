import { codeToHtml } from 'shiki'
import { Tex, TexBlock } from '../Tex'

const PY = `class MNistAddition(Example, DistLogTensBridge):
    def formula(self, m, x: Monad[Image], y: Monad[Image], n: Monad[int]) -> Formula[bool]:
        d1 = yield self.digit(m, x)
        d2 = yield self.digit(m, y)
        s = yield n
        return s == d1 + d2`

const h2: React.CSSProperties = {
  margin: '12px 0 10px',
  fontSize: 'var(--text-h2)',
  fontWeight: 600,
  color: 'var(--color-foreground)',
  letterSpacing: '-0.015em',
}
const intro: React.CSSProperties = {
  margin: '0 0 32px',
  fontSize: 15,
  color: 'var(--color-text-secondary)',
  maxWidth: 680,
  lineHeight: 'var(--lh-body)',
}
const cardTitle: React.CSSProperties = {
  fontSize: 'var(--text-h5)',
  fontWeight: 600,
  color: 'var(--color-foreground)',
  marginBottom: 2,
}
const cardKicker: React.CSSProperties = {
  fontSize: 11.5,
  color: 'var(--color-primary)',
  marginBottom: 14,
}
const note: React.CSSProperties = {
  marginTop: 12,
  marginBottom: 0,
  fontSize: 13.5,
  color: 'var(--color-muted-foreground)',
  lineHeight: 1.6,
}

export default async function Example() {
  const pyHtml = await codeToHtml(PY, { lang: 'python', theme: 'github-light' })

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
      <div className="t-eyebrow">§ NeSyCat Torch · Running example</div>
      <h2 style={h2}>MNIST addition, by distant supervision.</h2>
      <p style={intro}>
        NeSyCat Torch&apos;s running example: single-digit MNIST addition under <em>distant</em>{' '}
        supervision — only the sum of two handwritten digits is observed, never the digits
        themselves. The axiom is{' '}
        <Tex>{'\\forall\\,(x,y,n){:}S\\;\\bigl(n = \\mathsf{digit}(x) + \\mathsf{digit}(y)\\bigr)'}</Tex>.
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
          <div style={cardTitle}>The derivation</div>
          <div className="t-code" style={cardKicker}>Monadic do-notation</div>
          <TexBlock>
            {'\\mathbf{do}\\;\\{\\; d_1 \\leftarrow \\mathrm{dig}_\\theta(x);\\;\\; d_2 \\leftarrow \\mathrm{dig}_\\theta(y);\\;\\; \\mathbf{return}\\,(n = d_1 + d_2)\\;\\}'}
          </TexBlock>
          <p style={note}>
            Each <Tex>{'\\leftarrow'}</Tex> performs the law of total probability in{' '}
            <Tex>{'\\mathcal{D}'}</Tex> and the log-space convolution in <Tex>{'\\mathcal{T}'}</Tex>.
            This is not pseudo-code — it <em>is</em> the semantic value, and the identical text
            compiles as Haskell.
          </p>
        </div>

        <div className="surface" style={{ padding: 22 }}>
          <div style={cardTitle}>The formula</div>
          <div className="t-code" style={cardKicker}>Python</div>
          <div className="code-block" dangerouslySetInnerHTML={{ __html: pyHtml }} />
          <p style={note}>
            In Python, <span className="t-code">yield</span> replaces Haskell&apos;s{' '}
            <Tex>{'\\leftarrow'}</Tex> — the same monadic composition.
          </p>
        </div>
      </div>

      <div className="surface" style={{ padding: 22 }}>
        <p style={{ margin: '0 0 8px', fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 'var(--lh-body)' }}>
          The two classifiers return a pair, joined by the outer product <Tex>{'a \\otimes b'}</Tex>,
          giving exactly the discrete convolution
        </p>
        <TexBlock>
          {'\\mathcal{T}(\\mathsf{sum})(a \\otimes b)(s)\\;=\\;\\sum_{i+k=s} a_i\\,b_k\\;=\\;(a * b)(s)'}
        </TexBlock>
        <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 'var(--lh-body)' }}>
          — the unnormalised distribution of the sum. The network learns to read digits
          (about 97% digit accuracy) from the observed sums alone, never using digit labels.
        </p>
      </div>
    </section>
  )
}
