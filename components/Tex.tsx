import katex from 'katex'

// Server-rendered LaTeX. `katex.renderToString` runs at build time, so the
// client receives static HTML + the KaTeX stylesheet (imported in layout.tsx)
// — no client-side math JS. Use <Tex> for inline math, <TexBlock> for display.
export function Tex({ children }: { children: string }) {
  const __html = katex.renderToString(children, { throwOnError: false, displayMode: false })
  return <span dangerouslySetInnerHTML={{ __html }} />
}

export function TexBlock({ children }: { children: string }) {
  const __html = katex.renderToString(children, { throwOnError: false, displayMode: true })
  return <div style={{ margin: 0, overflowX: 'auto' }} dangerouslySetInnerHTML={{ __html }} />
}
