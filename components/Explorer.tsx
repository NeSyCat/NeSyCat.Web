'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

type AreaId = 'linguistics' | 'mathematics' | 'semiotics' | 'informatics' | 'logic'
type PanelId = AreaId | 'overview'
type Phase = 'intro' | 'center' | 'settling' | 'done'

type Area = { id: AreaId; label: string; cx: number; cy: number }

// Corner order matches the label fade-in stagger below.
const AREAS: Area[] = [
  { id: 'linguistics', label: 'Linguistics', cx: 100, cy: 14 },
  { id: 'mathematics', label: 'Mathematics', cx: 14, cy: 100 },
  { id: 'semiotics', label: 'Semiotics', cx: 186, cy: 100 },
  { id: 'informatics', label: 'Informatics', cx: 100, cy: 186 },
  { id: 'logic', label: 'Logic', cx: 100, cy: 100 },
]

const HOLD_MS = 600
const SETTLE_MS = 820
const SETTLE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const STAGGER_MS = 60

// SSR renders nothing (Next pre-renders client components on the server, and
// useLayoutEffect warns there); on the client it's the real, synchronous,
// pre-paint layout effect the FLIP sequence depends on.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

type Props = Record<PanelId, ReactNode>

// Holds the diamond hotspot state (hover preview / pinned selection) and the
// four-phase load animation ('intro' → 'center' → 'settling' → 'done'). The
// five area panels + the Overview panel are all mounted at all times and
// toggled with the `hidden` attribute so e.g. the Semiotics iframe never
// reloads when switching tabs.
export default function Explorer({ overview, logic, mathematics, semiotics, informatics, linguistics }: Props) {
  const [selected, setSelected] = useState<AreaId | null>(null)
  const [hovered, setHovered] = useState<AreaId | null>(null)
  const [phase, setPhase] = useState<Phase>('intro')
  const wrapRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const active: PanelId = hovered ?? selected ?? 'overview'
  const interactive = phase === 'done'

  // The FLIP intro: measure the diamond's natural (final) position, jump it
  // to viewport-center with an untransitioned transform (so the very first
  // paint already shows it centered), hold, then transition the transform
  // back to none — the diamond glides from viewport-center to its stage spot.
  useIsomorphicLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = wrapRef.current
    if (reduceMotion || !el) {
      setPhase('done')
      return
    }

    // A CSS-only approximate transform is already applied for the very
    // first (pre-hydration) paint — see globals.css `[data-phase="intro"]`.
    // getBoundingClientRect() would measure THAT already-shifted position,
    // not the element's true resting position, making dx/dy collapse to
    // ~0 and — once the CSS stops matching on the next line's phase
    // change — snapping the diamond back to its natural spot instead of
    // holding it centered. Neutralize the transform first so the natural
    // rect is what gets measured; getBoundingClientRect() below forces the
    // synchronous layout that makes that neutralization take effect.
    el.style.transition = 'none'
    el.style.transform = 'none'
    const rect = el.getBoundingClientRect()
    const dx = window.innerWidth / 2 - (rect.left + rect.width / 2)
    // I1: on desktop the brand is out of the stage's flex flow (see
    // globals.css), so .diamond-wrap is vertically centered on its own —
    // the glide should be purely horizontal there. Belt-and-braces clamp on
    // top of that CSS change, in case layout ever drifts the two out of sync.
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    const dy = isDesktop ? 0 : window.innerHeight / 2 - (rect.top + rect.height / 2)
    el.style.transform = `translate(${dx}px, ${dy}px)`
    setPhase('center')

    const holdTimer = window.setTimeout(() => {
      requestAnimationFrame(() => {
        const node = wrapRef.current
        if (!node) return
        node.style.transition = `transform ${SETTLE_MS}ms ${SETTLE_EASE}`
        node.style.transform = ''
        setPhase('settling')
      })
    }, HOLD_MS)

    // Reset the inline styles this effect applied, not just the timer — under
    // StrictMode's dev double-invoke the effect reruns immediately, and
    // without this the second run would measure an already-transformed
    // element (dx/dy ≈ 0, no visible intro). Resetting here also makes the
    // effect safe to rerun in general.
    return () => {
      window.clearTimeout(holdTimer)
      el.style.transform = ''
      el.style.transition = ''
    }
    // Runs once on mount — the intro sequence never re-triggers.
  }, [])

  // Advance 'settling' → 'done' when the transform transition finishes
  // (with a timeout fallback in case transitionend never fires).
  useEffect(() => {
    if (phase !== 'settling') return
    const el = wrapRef.current
    if (!el) {
      setPhase('done')
      return
    }
    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      setPhase('done')
    }
    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName === 'transform') finish()
    }
    el.addEventListener('transitionend', onTransitionEnd)
    const fallback = window.setTimeout(finish, SETTLE_MS + 150)
    return () => {
      el.removeEventListener('transitionend', onTransitionEnd)
      window.clearTimeout(fallback)
    }
  }, [phase])

  // The six panels share one scrolling container — without this, scrolling
  // deep into one panel then switching tabs shows the next panel at the same
  // stale scroll offset. Reset instantly (not smooth) and skip during the
  // intro phases, since the panel isn't visible/interactive yet anyway.
  useEffect(() => {
    if (phase !== 'done') return
    panelRef.current?.scrollTo({ top: 0 })
  }, [active, phase])

  function selectArea(id: AreaId) {
    if (!interactive) return
    setSelected((prev) => (prev === id ? null : id))
    setHovered(null)
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const panels: Record<PanelId, ReactNode> = { overview, logic, mathematics, semiotics, informatics, linguistics }

  return (
    <main className="explorer" data-phase={phase}>
      <div className="explorer-stage">
        <div className="explorer-brand">
          <h1
            onMouseEnter={() => {
              if (!interactive) return
              setSelected(null)
              setHovered(null)
            }}
          >
            NeSyCat
          </h1>
        </div>

        <div className="diamond-wrap" ref={wrapRef}>
          <div className="diamond-figure">
            <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
              <polygon
                points="100,14 186,100 100,186 14,100"
                fill="color-mix(in srgb, var(--color-primary) 6%, transparent)"
                stroke="var(--color-primary)"
                strokeWidth={13}
                strokeLinejoin="round"
              />
              {AREAS.map((a) => {
                const isHovered = hovered === a.id
                const isSelected = selected === a.id
                const isCenter = a.id === 'logic'
                return (
                  <g key={a.id}>
                    {isCenter ? (
                      <>
                        {/* Center dot keeps its existing ring-on-selected treatment. */}
                        {isSelected && (
                          <circle
                            cx={a.cx}
                            cy={a.cy}
                            r={20}
                            className="diamond-halo"
                            fill="none"
                            stroke="var(--color-primary)"
                            strokeOpacity={0.25}
                            strokeWidth={2}
                          />
                        )}
                        <circle
                          cx={a.cx}
                          cy={a.cy}
                          r={15}
                          className="diamond-dot"
                          fill="var(--color-primary)"
                          data-hovered={isHovered}
                        />
                      </>
                    ) : (
                      // J1: corners carry NO filled circle in any state — only an
                      // outline ring on hover/selected, never a solid dot.
                      <circle
                        cx={a.cx}
                        cy={a.cy}
                        r={13}
                        className="diamond-ring"
                        fill="none"
                        data-hovered={isHovered}
                        data-selected={isSelected}
                      />
                    )}
                  </g>
                )
              })}
            </svg>

            <div className="diamond-hotspots" role="tablist" aria-label="NeSyCat areas">
              {AREAS.map((a, i) => {
                const state = selected === a.id ? 'selected' : hovered === a.id ? 'hover' : 'idle'
                return (
                  <button
                    key={a.id}
                    type="button"
                    role="tab"
                    aria-selected={selected === a.id}
                    tabIndex={interactive ? 0 : -1}
                    className={`hotspot hotspot--${a.id}`}
                    data-state={state}
                    style={{ left: `${(a.cx / 200) * 100}%`, top: `${(a.cy / 200) * 100}%` }}
                    onMouseEnter={() => interactive && setHovered(a.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => selectArea(a.id)}
                  >
                    <span className="hotspot-label" style={{ transitionDelay: `0ms, ${i * STAGGER_MS}ms` }}>
                      {a.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="explorer-panel" ref={panelRef} role="tabpanel" aria-label="NeSyCat area details">
        {(Object.keys(panels) as PanelId[]).map((id) => (
          <div key={id} hidden={id !== active}>
            {panels[id]}
          </div>
        ))}
      </div>
    </main>
  )
}
