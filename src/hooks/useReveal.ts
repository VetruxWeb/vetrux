'use client'

// src/hooks/useReveal.ts
// Lightweight scroll-reveal: IntersectionObserver + CSS transitions.
// Fail-safe: if JS fails, IO is unsupported, or the user prefers reduced motion,
// elements are ALWAYS visible by default (no JS = no hidden state).
//
// For custom GSAP timelines (e.g. hero choreography) use `useRevealTimeline`.

import { useEffect, useSyncExternalStore } from 'react'
import type { RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface UseRevealOpts {
  /** Selector (default `.reveal-card`) */
  selector?: string
  /** Y offset in px (default 40) */
  y?: number
  /** Per-item stagger delay in seconds (default 0.1) */
  stagger?: number
  /** Transition duration in seconds (default 0.7) */
  duration?: number
  /** IntersectionObserver threshold 0–1 (default 0.1) */
  threshold?: number
  /** When true, reveal immediately on mount (no observer) */
  immediate?: boolean
  /**
   * Legacy GSAP ScrollTrigger start string (e.g. `'top 80%'`). Accepted for
   * backward compatibility with existing call sites; mapped to a comparable
   * `rootMargin` for the IntersectionObserver implementation.
   */
  start?: string
}

const REVEAL_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

const subscribeToReducedMotion = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

const getReducedMotionSnapshot = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const getServerReducedMotionSnapshot = () => false

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  )
}

export function useReveal<T extends HTMLElement>(
  scope: RefObject<T | null>,
  opts: UseRevealOpts = {},
) {
  const {
    selector = '.reveal-card',
    y = 40,
    stagger = 0.1,
    duration = 0.7,
    threshold = 0.1,
    immediate = false,
    start,
  } = opts

  // Translate legacy GSAP-style "top 80%" into IO rootMargin.
  // Examples: 'top 80%' → reveal when section enters lower 20% of viewport.
  let computedRootMargin = '0px 0px -5% 0px'
  if (start) {
    const match = start.match(/(\d+)\s*%/)
    if (match) {
      const pct = Math.max(0, Math.min(99, parseInt(match[1], 10)))
      // The smaller the trailing percentage, the earlier we want to reveal —
      // mirror that by using a negative bottom margin.
      const offset = Math.max(0, 100 - pct)
      computedRootMargin = `0px 0px -${offset}% 0px`
    }
  }

  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const root = scope.current
    if (!root) return
    const targets = Array.from(root.querySelectorAll<HTMLElement>(selector))
    if (targets.length === 0) return

    // Reduced motion: do nothing — elements stay visible by default.
    if (reduced) return

    // Apply hidden + transition inline to avoid FOUC hiding everything in CSS.
    targets.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = `translate3d(0, ${y}px, 0)`
      el.style.transition = `opacity ${duration}s ${REVEAL_EASE}, transform ${duration}s ${REVEAL_EASE}`
      el.style.willChange = 'opacity, transform'
    })

    let revealed = false
    let cleanupTimer: ReturnType<typeof setTimeout> | null = null

    const reveal = () => {
      if (revealed) return
      revealed = true
      targets.forEach((el, i) => {
        // Cannot use gsap stagger here — pure CSS transition with setTimeout.
        setTimeout(() => {
          el.style.opacity = '1'
          el.style.transform = 'translate3d(0, 0, 0)'
        }, Math.max(0, i * stagger * 1000))
      })
      // Final cleanup so browser can drop the layer.
      const totalMs =
        (targets.length - 1) * stagger * 1000 + duration * 1000 + 200
      cleanupTimer = setTimeout(() => {
        targets.forEach((el) => {
          el.style.willChange = ''
          el.style.transition = ''
        })
      }, totalMs)
    }

    // Immediate mode: play right away after a paint.
    if (immediate) {
      requestAnimationFrame(() => requestAnimationFrame(reveal))
      return () => {
        if (cleanupTimer) clearTimeout(cleanupTimer)
      }
    }

    // If IntersectionObserver is missing, reveal immediately (safest fallback).
    if (typeof IntersectionObserver === 'undefined') {
      requestAnimationFrame(() => requestAnimationFrame(reveal))
      return () => {
        if (cleanupTimer) clearTimeout(cleanupTimer)
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal()
            io.disconnect()
            break
          }
        }
      },
      {
        threshold,
        rootMargin: computedRootMargin,
      },
    )

    io.observe(root)

    // Safety net: if the section is already (partially) in viewport on mount,
    // some browsers fire the IO callback with isIntersecting=false. Reveal
    // after the next frame if the element is actually visible.
    const rafId = requestAnimationFrame(() => {
      const rect = root.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        reveal()
        io.disconnect()
      }
    })

    return () => {
      cancelAnimationFrame(rafId)
      if (cleanupTimer) clearTimeout(cleanupTimer)
      io.disconnect()
      // If the component unmounts before revealing, restore visibility so
      // a re-mount never shows permanently hidden content.
      targets.forEach((el) => {
        el.style.opacity = ''
        el.style.transform = ''
        el.style.transition = ''
        el.style.willChange = ''
      })
    }
  }, [reduced, selector, y, stagger, duration, threshold, immediate, computedRootMargin, scope])
}

/**
 * GSAP timeline-based reveal. Caller fully controls the animation.
 * No-ops when the user prefers reduced motion.
 */
export function useRevealTimeline<T extends HTMLElement>(
  scope: RefObject<T | null>,
  build: (ctx: { reduced: boolean; gsap: typeof gsap }) => void,
  dependencies: ReadonlyArray<unknown> = [],
) {
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      build({ reduced, gsap })
    },
    { scope, dependencies: [reduced, ...dependencies] },
  )
}
