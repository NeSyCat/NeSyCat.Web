'use client'

import { useEffect, useState } from 'react'
import { GitHubIcon } from '../Buttons'

const TABS = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'monads', label: 'Monads' },
  { id: 'layers', label: 'Layers' },
  { id: 'benchmarks', label: 'Results' },
  { id: 'paper', label: 'Paper' },
]

// No top bar — floating pills. The centered section pill is a scroll-spy tab
// bar: the section currently in view gets `.is-active` (solid blue), the same
// single-selection styling the Admination app uses for its pills.
export default function Nav() {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const sections = TABS.map((t) => document.getElementById(t.id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b,
        )
        setActive(top.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="nav-floating">
      {/* left — brand */}
      <div className="pill-cluster" style={{ justifySelf: 'start' }}>
        <div className="pill">
          <a href="#top" className="btn" style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>
            <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: 'var(--color-primary)', width: 24, height: 24, strokeWidth: 2.4 }}>
              <polygon points="12,1.6 22.4,12 12,22.4 1.6,12" />
              <circle cx="12" cy="12" r="2.8" fill="currentColor" stroke="none" />
            </svg>
            NeSyCat
          </a>
        </div>
      </div>

      {/* center — section tabs with scroll-spy selection */}
      <div className="pill nav-links" style={{ justifySelf: 'center' }}>
        {TABS.map((t) => (
          <a key={t.id} className={active === t.id ? 'btn is-active' : 'btn'} href={`#${t.id}`}>
            {t.label}
          </a>
        ))}
      </div>

      {/* right — GitHub */}
      <div className="pill-cluster" style={{ justifySelf: 'end' }}>
        <div className="pill">
          <a className="btn" href="https://github.com/NeSyCat" target="_blank" rel="noreferrer">
            <GitHubIcon size={16} /> GitHub
          </a>
        </div>
      </div>
    </header>
  )
}
