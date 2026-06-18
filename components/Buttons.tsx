import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary'

// Compose the live DS pill button: `.btn` (default = secondary/hairline),
// `.btn--primary` (solid blue), `.btn--lg` (NeSyCat hero size). All styling
// — radius, height, hover, focus — comes from the Admination DS.
function btnClass(variant: Variant, big?: boolean): string {
  return ['btn', variant === 'primary' && 'btn--primary', big && 'btn--lg']
    .filter(Boolean)
    .join(' ')
}

// GitHub mark is a FILLED glyph; the DS sets `.btn svg { fill:none; stroke }`
// for its line icons, so we override to fill via inline style (wins over CSS).
export function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={{ fill: 'currentColor', stroke: 'none', flexShrink: 0 }}
    >
      <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

// Diagram/editor mark — line icon, inherits the DS `.btn svg` stroke styling.
export function EditorIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="3.4" cy="3.4" r="1.7" />
      <circle cx="12.6" cy="12.6" r="1.7" />
      <path d="M4.7 4.7 L11.3 11.3" />
    </svg>
  )
}

interface LinkButtonProps {
  href: string
  variant?: Variant
  big?: boolean
  external?: boolean
  children: ReactNode
}

export function LinkButton({ href, variant = 'secondary', big, external, children }: LinkButtonProps) {
  const extra = external ? { target: '_blank', rel: 'noreferrer' } : {}
  return (
    <a href={href} className={btnClass(variant, big)} {...extra}>
      {children}
    </a>
  )
}

const EDITOR_HREF = 'https://semiotics.nesycat.com/'

export function OpenEditorButton({ big, variant = 'primary' }: { big?: boolean; variant?: Variant }) {
  return (
    <LinkButton href={EDITOR_HREF} variant={variant} big={big} external>
      <EditorIcon />
      Open editor
      <span style={{ opacity: 0.7, fontSize: big ? 14 : 12 }}>↗</span>
    </LinkButton>
  )
}
