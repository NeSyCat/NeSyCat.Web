'use client'

import { useEffect, useState } from 'react'
import { EditorIcon } from '../Buttons'
import { SECTIONS } from './registry'

const TABS = SECTIONS.filter(
  (s): s is typeof s & { navLabel: string } => Boolean(s.navLabel),
)

// No top bar — floating pills. The centered section pill is a scroll-spy tab
// bar: the section currently in view gets `.is-active` (solid blue), the same
// single-selection styling the Admination app uses for its pills.
//
// Every section in SECTIONS is observed, not just the ones with a pill — so
// scrolling through an unlabelled section (Hero, Symbols, Example, Repos)
// still resolves to the nearest *preceding* labelled tab instead of freezing
// on whatever was last active. That freeze is what happened when the Editor
// section was added without a matching tab: nothing was left observing it,
// so the observer's `visible` set went empty and `active` never updated.
export default function Nav() {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(
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
        const index = SECTIONS.findIndex((s) => s.id === top.target.id)
        for (let i = index; i >= 0; i--) {
          if (SECTIONS[i].navLabel) {
            setActive(SECTIONS[i].id)
            break
          }
        }
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
          <a href="#top" className="btn" style={{ fontWeight: 600, letterSpacing: '-0.01em', gap: 9 }}>
            <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: 'var(--color-primary)', width: 20, height: 20, strokeWidth: 2.4 }}>
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
            {t.navLabel}
          </a>
        ))}
      </div>

      {/* right — Semiotics editor */}
      <div className="pill-cluster" style={{ justifySelf: 'end' }}>
        <div className="pill">
          <a className="btn" href="https://semiotics.nesycat.org/" target="_blank" rel="noreferrer">
            <EditorIcon /> Editor
          </a>
        </div>
      </div>
    </header>
  )
}
