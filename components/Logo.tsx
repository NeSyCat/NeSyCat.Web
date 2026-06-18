export default function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ color: 'var(--color-primary)' }}
      >
        <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" fillOpacity={0.12} stroke="currentColor" strokeWidth="1.4" />
        <polygon points="12,4 20,12 12,20 4,12" fill="currentColor" fillOpacity={0.28} stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="12" r="2.1" fill="currentColor" />
      </svg>
      <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-foreground)', letterSpacing: '-0.02em' }}>
        NeSyCat
      </span>
    </div>
  )
}
