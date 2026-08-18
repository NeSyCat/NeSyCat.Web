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

// K2 (rev 10 correction): the round join's OUTER cap is a circle of radius
// strokeWidth/2 = 6.5 centered AT the vertex, so it only bulges 6.5 units
// outward — but the polygon's own INNER corner sits ~6.5/sin(45°) ≈ 9.2
// units further back along the same axis, and the two arms add substantial
// extra mass further inward still. Net effect: the visible corner mass's
// center of gravity sits INWARD of the vertex, not outward (rev 8's +6.5
// outward offset had the sign backwards and doubled the error). Confirmed
// by measurement: a fixed-point centroid of solid-blue pixels within a
// 13-unit-radius disc (iterated from the vertex, 5 iterations to
// convergence) landed ~4.95 viewBox units inward with negligible
// cross-axis component — rounded to 5.0. Same offset for all four corners,
// applied toward the figure's center (100,100).
const RING_OFFSET = 5.0

function ringCenter(a: Area): { cx: number; cy: number } {
  switch (a.id) {
    case 'linguistics':
      return { cx: a.cx, cy: a.cy + RING_OFFSET }
    case 'mathematics':
      return { cx: a.cx + RING_OFFSET, cy: a.cy }
    case 'semiotics':
      return { cx: a.cx - RING_OFFSET, cy: a.cy }
    case 'informatics':
      return { cx: a.cx, cy: a.cy - RING_OFFSET }
    default:
      return { cx: a.cx, cy: a.cy }
  }
}

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
              <defs>
                {/* One gradient per edge, colour-wheel-true (not an RGB
                    lerp) between its two corner anchors — see the --logo-*
                    block in globals.css for why the stops are what they
                    are. Adjacent gradients share the identical colour at
                    each vertex, so the round-capped segments below meet
                    there seamlessly. */}
                <linearGradient id="logo-edge-lt" gradientUnits="userSpaceOnUse" x1={14} y1={100} x2={100} y2={14}>
                  <stop offset="0%" stopColor="var(--logo-blue)" />
                  <stop offset="25%" stopColor="var(--logo-lt-1)" />
                  <stop offset="50%" stopColor="var(--logo-lt-2)" />
                  <stop offset="75%" stopColor="var(--logo-lt-3)" />
                  <stop offset="100%" stopColor="var(--logo-green)" />
                </linearGradient>
                <linearGradient id="logo-edge-tr" gradientUnits="userSpaceOnUse" x1={100} y1={14} x2={186} y2={100}>
                  <stop offset="0%" stopColor="var(--logo-green)" />
                  <stop offset="25%" stopColor="var(--logo-tr-1)" />
                  <stop offset="50%" stopColor="var(--logo-tr-2)" />
                  <stop offset="75%" stopColor="var(--logo-tr-3)" />
                  <stop offset="100%" stopColor="var(--logo-red)" />
                </linearGradient>
                <linearGradient id="logo-edge-rb" gradientUnits="userSpaceOnUse" x1={186} y1={100} x2={100} y2={186}>
                  <stop offset="0%" stopColor="var(--logo-red)" />
                  <stop offset="25%" stopColor="var(--logo-rb-1)" />
                  <stop offset="50%" stopColor="var(--logo-rb-2)" />
                  <stop offset="75%" stopColor="var(--logo-rb-3)" />
                  <stop offset="100%" stopColor="var(--logo-magenta)" />
                </linearGradient>
                <linearGradient id="logo-edge-bl" gradientUnits="userSpaceOnUse" x1={100} y1={186} x2={14} y2={100}>
                  <stop offset="0%" stopColor="var(--logo-magenta)" />
                  <stop offset="25%" stopColor="var(--logo-bl-1)" />
                  <stop offset="50%" stopColor="var(--logo-bl-2)" />
                  <stop offset="75%" stopColor="var(--logo-bl-3)" />
                  <stop offset="100%" stopColor="var(--logo-blue)" />
                </linearGradient>
              </defs>
              {/* Fill-only, behind the stroke segments — a faint neutral
                  wash (foreground, not primary) so it doesn't bias the
                  multicolour border toward any one corner's hue. */}
              <polygon
                points="100,14 186,100 100,186 14,100"
                fill="color-mix(in srgb, var(--color-foreground) 8%, transparent)"
              />
              {/* Four edges, each its own gradient. strokeLinecap="round"
                  reproduces the old single-polygon round-join corners
                  exactly: the cap radius (strokeWidth/2 = 6.5) is the same
                  bulge the round join produced. */}
              <line x1={14} y1={100} x2={100} y2={14} stroke="url(#logo-edge-lt)" strokeWidth={13} strokeLinecap="round" />
              <line x1={100} y1={14} x2={186} y2={100} stroke="url(#logo-edge-tr)" strokeWidth={13} strokeLinecap="round" />
              <line x1={186} y1={100} x2={100} y2={186} stroke="url(#logo-edge-rb)" strokeWidth={13} strokeLinecap="round" />
              <line x1={100} y1={186} x2={14} y2={100} stroke="url(#logo-edge-bl)" strokeWidth={13} strokeLinecap="round" />
              {AREAS.map((a) => {
                const isHovered = hovered === a.id
                const isSelected = selected === a.id
                const isCenter = a.id === 'logic'
                return (
                  <g key={a.id}>
                    {isCenter ? (
                      <>
                        {/* Center dot keeps its existing ring-on-selected treatment,
                            now in foreground (not primary blue) — the dot's own
                            white-with-dark-ring look already carries its identity,
                            so the halo just needs a neutral state cue. M1: r shrunk
                            20→18 (still a full ring around the r=15 dot) so its outer
                            edge no longer coincides with the "Logic" label's hotspot
                            button edge — see the .hotspot--logic rule in globals.css. */}
                        {isSelected && (
                          <circle
                            cx={a.cx}
                            cy={a.cy}
                            r={18}
                            className="diamond-halo"
                            fill="none"
                            stroke="var(--color-foreground)"
                            strokeOpacity={0.25}
                            strokeWidth={2}
                          />
                        )}
                        {/* Plain white disc, no stroke — the user asked for the
                            dark ring hugging the dot to go. It reads clean
                            against the interior wash because that wash was
                            deepened (5%→8%) precisely so an unstroked white
                            circle still has enough contrast to read on its
                            own. */}
                        <circle
                          cx={a.cx}
                          cy={a.cy}
                          r={15}
                          className="diamond-dot"
                          fill="var(--logo-dot-fill)"
                          data-hovered={isHovered}
                        />
                      </>
                    ) : (
                      // J1: corners carry NO filled circle in any state — only an
                      // outline ring on hover/selected, never a solid dot. K2: its
                      // center is nudged outward (ringCenter) so the round-joined
                      // stroke bulge reads concentric inside it, not inset. Each
                      // corner's ring takes its own wheel colour via the
                      // diamond-ring--<id> class (see globals.css).
                      <circle
                        cx={ringCenter(a).cx}
                        cy={ringCenter(a).cy}
                        r={18}
                        className={`diamond-ring diamond-ring--${a.id}`}
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
