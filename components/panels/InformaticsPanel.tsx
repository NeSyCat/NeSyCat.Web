import { codeToHtml } from 'shiki'
import { GitHubIcon, LinkButton } from '../Buttons'

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

// The MNIST-addition axiom, verbatim, from
// NeSyCat.AI.JAX/examples/mnist_addition/d_grammatical.py lines 12-26 —
// read-only source, harvested not modified.
const PYTHON_SNIPPET = `from nesycat.b_logical.signature.a2_mon_blat import big_wedge

from .c_domain import digit


def formula(m, theta, x, y, n):
    """n = digit(x) + digit(y)."""
    d1 = yield digit(m, theta, x)
    d2 = yield digit(m, theta, y)
    s = yield n
    return s == d1 + d2


def sentence(m, theta, guard):
    """bigWedge (x, y, n) in guard.  formula."""
    return big_wedge(m, guard, lambda element: formula(m, theta, *element))`

// § Informatics. Points at NeSyCat.Informatics, the JAX/Python port: a
// generator-based do-notation, with the free-monad AST built by prefix-replay
// at trace time. Server component: the Python is syntax-highlighted
// server-side via shiki, same pattern as MathematicsPanel's Lean excerpt and
// TypeTheoryPanel's Haskell excerpt.
export default async function InformaticsPanel() {
  let codeHtml: string | null = null
  try {
    codeHtml = await codeToHtml(PYTHON_SNIPPET, { lang: 'python', theme: 'github-light' })
  } catch {
    codeHtml = null // fall back to a plain <pre> below
  }

  return (
    <section>
      <div className="t-eyebrow">§ Informatics · JAX</div>
      <h2 style={h2}>The axiom, compiled.</h2>

      <p style={para}>
        NeSyCat.Informatics is the JAX port: the same axiom, written once as a Python generator.
        Each yield is the monadic bind — s = yield n binds the observation, and return s == d1 +
        d2 is the predicate. The monad stays an explicit argument, LogTens for differentiable
        training and Dist for the probability readout, and digit and big_wedge are Method
        instances, so nothing matches on the monad. Ordinary Python composes: mnist_multidigit
        puts yield inside nested for-loops.
      </p>

      <p style={para}>
        interpret (a_categorical/do_notation.py) builds the free-monad AST by prefix-replay:
        Python generators are one-shot, so each Bind&apos;s continuation re-creates the generator
        and re-sends the recorded prefix. collect_leaves flattens that AST into ordered log-weight
        tensors plus a host-side reconstructor, and log_num_den probes the reconstructor rather
        than the source: additive predicates fold through log_convolve — variable elimination in
        the log semiring — otherwise tve_contract schedules an opt_einsum contraction, otherwise
        the full-joint marginalize runs as fallback and oracle.
      </p>

      <p style={para}>
        Replay, probing and contraction planning are host work at trace time; the only jax.jit on
        the training path is the step inside train_batched, value_and_grad plus optax Adam. A
        batch compiles into a log-space tensor contraction that JAX runs on CPU or GPU alike, with
        an sbatch script targeting an A100 or H100 node on the HPC3 cluster, and
        g_benchmark/timing.py reports train- and test-step times in milliseconds over 1000 steps
        behind jax.block_until_ready. Three MNIST examples run via python -m nesycat &lt;ExampleName&gt; [n].
      </p>

      <p style={{ ...para, margin: '0 0 6px', color: 'var(--color-muted-foreground)' }}>
        The whole grammatical layer of the MNIST-addition example — the formula as a generator,
        and the sentence that quantifies it.
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
          {PYTHON_SNIPPET}
        </pre>
      )}

      <div style={{ marginTop: 18 }}>
        <LinkButton href="https://github.com/NeSyCat/NeSyCat.Informatics" variant="primary" big external>
          <GitHubIcon size={16} /> github.com/NeSyCat/NeSyCat.Informatics{' '}
          <span style={{ opacity: 0.7, fontSize: 12 }}>↗</span>
        </LinkButton>
      </div>
    </section>
  )
}
