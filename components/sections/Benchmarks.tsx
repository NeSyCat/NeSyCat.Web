type Stat = { value: string; label: string; sub: string }

const STATS: Stat[] = [
  { value: '94.6%', label: 'single-digit sum accuracy (LTN-style)', sub: "vs LTN's 93.5%" },
  { value: '94.2%', label: 'single-digit sum accuracy (DPL-style)', sub: "vs DeepProbLog's 92.2%" },
  { value: '≈97%', label: 'digit accuracy from sums alone', sub: 'no digit labels, ever' },
]

type Row = {
  method: string
  n1: string
  n2a: string
  n2b: string
  n4: string
  emphasis?: boolean
}

// Test sum accuracy (%), mean ± std, on MNISTAdd by N digits.
const COLUMNS = ['Method', 'N=1 (3k)', 'N=2 (1.5k)', 'N=2 (15k)', 'N=4 (7.5k)']

const ROWS: Row[] = [
  { method: 'NeSyCat Torch (LTN-style)', n1: '94.6 ± 0.6', n2a: '89.7 ± 0.7', n2b: '95.7 ± 0.5', n4: '92.0 ± 0.6', emphasis: true },
  { method: 'NeSyCat Torch (DPL-style)', n1: '94.2 ± 0.7', n2a: '89.2 ± 0.7', n2b: '95.8 ± 0.6', n4: '91.8 ± 0.8', emphasis: true },
  { method: 'LTN', n1: '93.5 ± 0.3', n2a: '88.4 ± 1.0', n2b: '95.4 ± 0.3', n4: 'T/O' },
  { method: 'logLTN', n1: '–', n2a: '88.3 ± 0.8', n2b: '95.6 ± 0.5', n4: '–' },
  { method: 'DeepProbLog', n1: '92.2 ± 1.6', n2a: '87.2 ± 1.9', n2b: '95.2 ± 1.7', n4: 'T/O' },
  { method: 'DeepStochLog', n1: '–', n2a: '–', n2b: '96.4 ± 0.1', n4: '92.7 ± 0.6' },
  { method: 'A-NeSI', n1: '–', n2a: '–', n2b: '96.0 ± 0.4', n4: '92.6 ± 0.8' },
]

export default function Benchmarks() {
  const cellStyle: React.CSSProperties = {
    padding: '10px 14px',
    borderBottom: '1px solid var(--color-border)',
    textAlign: 'right',
    fontSize: 13.5,
    color: 'var(--color-text-secondary)',
    whiteSpace: 'nowrap',
  }
  const headStyle: React.CSSProperties = {
    padding: '10px 14px',
    borderBottom: '1px solid var(--color-border)',
    fontSize: 12.5,
    fontWeight: 600,
    color: 'var(--color-foreground)',
    background: 'var(--color-surface)',
    whiteSpace: 'nowrap',
  }

  return (
    <section
      id="benchmarks"
      style={{
        padding: '48px 48px 64px',
        borderTop: '1px solid var(--color-border)',
        maxWidth: 1120,
        margin: '0 auto',
      }}
    >
      <div className="t-eyebrow">§ Results</div>
      <h2
        style={{
          margin: '12px 0 10px',
          fontSize: 'var(--text-h2)',
          fontWeight: 600,
          color: 'var(--color-foreground)',
          letterSpacing: '-0.015em',
        }}
      >
        Competitive — in one uniform framework.
      </h2>
      <p
        style={{
          margin: '0 0 32px',
          fontSize: 15,
          color: 'var(--color-text-secondary)',
          maxWidth: 640,
          lineHeight: 'var(--lh-body)',
        }}
      >
        All numbers come from the JAX backend on a single A100 GPU, averaged over 15 seeds. NeSyCat
        Torch never uses digit labels; the network learns to read digits (≈97% accuracy) from
        observed sums alone.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}
      >
        {STATS.map((s) => (
          <div key={s.label} className="surface" style={{ padding: 22 }}>
            <div
              className="t-num"
              style={{
                fontSize: 34,
                fontWeight: 600,
                color: 'var(--color-foreground)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              {s.value}
            </div>
            <div style={{ marginTop: 10, fontSize: 13.5, color: 'var(--color-muted-foreground)', lineHeight: 1.5 }}>
              {s.label}
            </div>
            <div style={{ marginTop: 6, fontSize: 12.5, color: 'var(--color-primary)', fontWeight: 600 }}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: 'var(--color-foreground)',
          margin: '0 0 12px',
        }}
      >
        Test sum accuracy (%), mean ± std, on MNISTAdd by N digits.
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table
          className="t-num"
          style={{
            width: '100%',
            minWidth: 560,
            borderCollapse: 'collapse',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <thead>
            <tr>
              {COLUMNS.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  style={{ ...headStyle, textAlign: i === 0 ? 'left' : 'right' }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.method} style={r.emphasis ? { background: 'var(--blue-100)' } : undefined}>
                <th
                  scope="row"
                  style={{
                    padding: '10px 14px',
                    borderBottom: '1px solid var(--color-border)',
                    textAlign: 'left',
                    fontSize: 13.5,
                    fontWeight: r.emphasis ? 600 : 500,
                    color: 'var(--color-foreground)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {r.method}
                </th>
                <td style={{ ...cellStyle, fontWeight: r.emphasis ? 600 : 400, color: r.emphasis ? 'var(--color-foreground)' : 'var(--color-text-secondary)' }}>
                  {r.n1}
                </td>
                <td style={{ ...cellStyle, fontWeight: r.emphasis ? 600 : 400, color: r.emphasis ? 'var(--color-foreground)' : 'var(--color-text-secondary)' }}>
                  {r.n2a}
                </td>
                <td style={{ ...cellStyle, fontWeight: r.emphasis ? 600 : 400, color: r.emphasis ? 'var(--color-foreground)' : 'var(--color-text-secondary)' }}>
                  {r.n2b}
                </td>
                <td style={{ ...cellStyle, fontWeight: r.emphasis ? 600 : 400, color: r.emphasis ? 'var(--color-foreground)' : 'var(--color-text-secondary)' }}>
                  {r.n4}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ margin: '12px 0 0', fontSize: 12.5, color: 'var(--color-muted-foreground)', lineHeight: 1.6 }}>
        NeSyCat Torch averages all 15 seeds; LTN averages its 10 best of 15. &apos;T/O&apos; =
        timeout. &apos;–&apos; = not reported.
      </p>

      <p
        style={{
          margin: '24px 0 0',
          fontSize: 14,
          color: 'var(--color-text-secondary)',
          maxWidth: 720,
          lineHeight: 'var(--lh-body)',
        }}
      >
        At batch 32, step times (train/test) are 0.52/0.20 ms (LTN-style) and 0.44/0.20 ms
        (DPL-style); a 15-seed sweep runs in ≈1.5 min. Where DeepProbLog and LTN time out at N=4 (two
        four-digit numbers, sums up to 19,998), NeSyCat Torch still runs at 92.0%.
      </p>
    </section>
  )
}
