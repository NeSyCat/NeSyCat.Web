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
                {/* Gemini-icon technique: the outline is a MASK (one round-
                    joined polygon stroke, so there are no per-edge caps to
                    overlap at the vertices), and a handful of large, heavily
                    blurred, solid-colour blobs sit behind it — only the
                    slice inside the mask shows. Colour only ever meets
                    colour through blur falloff, never through a drawn seam,
                    so there is nothing that CAN band or overlap. See the
                    --logo-* block in globals.css for the palette. */}
                <mask id="logo-outline-mask" maskUnits="userSpaceOnUse" x={-20} y={-20} width={240} height={240}>
                  <polygon
                    points="100,14 186,100 100,186 14,100"
                    fill="none"
                    stroke="#fff"
                    strokeWidth={13}
                    strokeLinejoin="round"
                  />
                </mask>
                {/* Three blur strengths, shared across all four corners /
                    edge midpoints: a tighter one for the small blob that
                    saturates each vertex, a heavier one for the large blob
                    that carries the colour out across the neighbouring
                    edges, and a mid-weight one for the edge-midpoint blobs
                    below that keep the middle of each edge from ever
                    thinning out to just the two corners' blur tails (see
                    the midpoint blob comment below for why those exist).
                    Generous userSpaceOnUse regions on all three (well
                    beyond the 0–200 viewBox) so the blur is never clipped
                    to a hard rectangular edge. */}
                <filter id="logo-blur-sm" x={-100} y={-100} width={400} height={400} filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation={11} />
                </filter>
                <filter id="logo-blur-lg" x={-100} y={-100} width={400} height={400} filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation={20} />
                </filter>
                <filter id="logo-blur-mid" x={-100} y={-100} width={400} height={400} filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation={12} />
                </filter>
              </defs>
              {/* Fill-only, behind the colour field — a faint neutral
                  wash (foreground, not primary) so it doesn't bias the
                  multicolour border toward any one corner's hue. */}
              <polygon
                points="100,14 186,100 100,186 14,100"
                fill="color-mix(in srgb, var(--color-foreground) 8%, transparent)"
              />
              {/* The masked colour field itself: two blobs per corner (a
                  small saturated one a few units out, a large soft one
                  further out still), pushed just past their vertex rather
                  than centred on it — as in the reference, the colour reads
                  as bleeding in from outside the silhouette rather than
                  sitting inside it. Each corner keeps the mapping the
                  rings/labels already use — green top (Linguistics), red
                  right (Semiotics), magenta bottom (Informatics), blue left
                  (Mathematics). The vertex itself sits well inside each
                  blob's solid core (not out in its blurred falloff), so the
                  corner hue still reads fully saturated there. The
                  edge-midpoint blobs below carry their own saturated
                  intermediate hue into the middle of each edge — see the
                  paint-order comment just below for why they sit between
                  the large and small corner layers rather than underneath
                  both. */}
              <g mask="url(#logo-outline-mask)">
                {/* Paint order, back to front, is corner-LARGE → edge-MID →
                    corner-SMALL — deliberately not the more obvious
                    mid-then-large-then-small. Two corner blurs alone leave
                    the exact middle of each edge as nothing but their
                    overlapping falloff tails, which — with the large blobs
                    painted last — sit on TOP of the midpoint colour and
                    average directly against each other in a region where
                    both still have real alpha there. Green-over-red (and
                    vice versa) averages straight to a muddy olive; that is
                    the wash this whole fix exists to remove. Putting the
                    intermediate (colour-wheel-true — cyan, amber, pink,
                    violet, the same wheel the old gradient stroke used)
                    blob ON TOP of both large corner blobs instead means it
                    fully overwrites them right where its own alpha is
                    highest (the midpoint), so the hand-off there reads as
                    the intermediate hue, not a green/red blend. The small
                    corner blobs go on top of THAT, so right at each vertex
                    the pure corner hue still wins outright — their own
                    alpha there is ~1 and the midpoint blob's has long
                    since decayed to ~0.

                    Every blob below gets `filter` on the CIRCLE itself, not
                    on a shared `<g>` wrapping several of them — a filter
                    applied to a group blurs the group's already-composited
                    raster as one signal, so two DIFFERENT circles whose
                    blur halos later overlap get their raw colours averaged
                    directly in RGB space regardless of paint order, which
                    would defeat the ordering trick above. Filtering each
                    circle independently keeps them compositing normally. */}
                <circle cx={100} cy={-18} r={80} fill="var(--logo-green)" filter="url(#logo-blur-lg)" />
                <circle cx={218} cy={100} r={80} fill="var(--logo-red)" filter="url(#logo-blur-lg)" />
                <circle cx={100} cy={218} r={80} fill="var(--logo-magenta)" filter="url(#logo-blur-lg)" />
                <circle cx={-18} cy={100} r={80} fill="var(--logo-blue)" filter="url(#logo-blur-lg)" />

                <circle cx={57} cy={57} r={42} fill="var(--logo-cyan)" filter="url(#logo-blur-mid)" />
                <circle cx={143} cy={57} r={42} fill="var(--logo-amber)" filter="url(#logo-blur-mid)" />
                <circle cx={143} cy={143} r={42} fill="var(--logo-pink)" filter="url(#logo-blur-mid)" />
                <circle cx={57} cy={143} r={42} fill="var(--logo-violet)" filter="url(#logo-blur-mid)" />

                <circle cx={100} cy={-4} r={55} fill="var(--logo-green)" filter="url(#logo-blur-sm)" />
                <circle cx={204} cy={100} r={55} fill="var(--logo-red)" filter="url(#logo-blur-sm)" />
                <circle cx={100} cy={204} r={55} fill="var(--logo-magenta)" filter="url(#logo-blur-sm)" />
                <circle cx={-4} cy={100} r={55} fill="var(--logo-blue)" filter="url(#logo-blur-sm)" />
              </g>
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
