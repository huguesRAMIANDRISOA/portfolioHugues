import { useEffect, useRef, type RefObject } from 'react'
import {
  initSandTrail,
  type SandTrailColors,
  type SandTrailHandle,
  type SandTrailOptions,
} from '../lib/sand-trail.js'
import { useDocumentTheme } from './useDocumentTheme'

export interface UseSandTrailOptions extends SandTrailOptions {
  /**
   * Durée (ms) du fondu de `color` et `grainColor` lors d'un changement de thème.
   * `blendTo` est appliqué immédiatement : il suit le fond de la section suivante,
   * qui change sans transition.
   */
  transition?: number
}

type Rgb = [number, number, number]

/** `var(--token)` est résolu sur le conteneur, donc avec les valeurs du thème courant. */
function resolveColor(element: HTMLElement, color: string | undefined) {
  const match = color && /^var\((--[\w-]+)\)$/.exec(color.trim())
  if (!match?.[1]) return color
  return getComputedStyle(element).getPropertyValue(match[1]).trim() || undefined
}

function parseHex(color: string | undefined): Rgb | null {
  const match = color && /^#([\da-f]{6})$/i.exec(color)
  if (!match?.[1]) return null
  const n = parseInt(match[1], 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function mixColor(from: string | undefined, to: string | undefined, t: number) {
  const a = parseHex(from)
  const b = parseHex(to)
  if (!a || !b) return to
  const rgb = [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
  return `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`
}

/** Le module fusionne par spread : une clé `undefined` écraserait sa valeur par défaut. */
function withoutUndefined<T extends object>(value: T): Partial<T> {
  return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined)) as Partial<T>
}

/**
 * Fond « sable » interactif derrière le contenu de `ref`.
 * Les options de simulation recréent l'effet ; les couleurs (et le thème) sont appliquées
 * via `setColors`, sans effacer les traces en cours.
 * Le module se désactive de lui-même sur écran tactile et avec prefers-reduced-motion.
 */
export function useSandTrail(ref: RefObject<HTMLElement | null>, options: UseSandTrailOptions = {}) {
  const theme = useDocumentTheme()
  const {
    color,
    grainColor,
    blendTo,
    width,
    hold,
    fade,
    threshold,
    spacing,
    opacity,
    fadeTop,
    fadeBottom,
    transition = 0,
  } = options
  const handle = useRef<SandTrailHandle | null>(null)
  const applied = useRef<SandTrailColors | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const trail = initSandTrail(
      element,
      withoutUndefined({ width, hold, fade, threshold, spacing, opacity, fadeTop, fadeBottom }),
    )
    if (applied.current) trail.setColors?.(applied.current)
    handle.current = trail
    return () => {
      trail()
      handle.current = null
    }
  }, [ref, width, hold, fade, threshold, spacing, opacity, fadeTop, fadeBottom])

  useEffect(() => {
    const element = ref.current
    const setColors = handle.current?.setColors
    if (!element || !setColors) return

    const target: SandTrailColors = {
      color: resolveColor(element, color),
      grainColor: resolveColor(element, grainColor),
      blendTo: resolveColor(element, blendTo),
    }
    const from = applied.current
    const apply = (colors: SandTrailColors) => {
      setColors(colors)
      applied.current = colors
    }

    if (!from || transition <= 0) {
      apply(target)
      return
    }

    const start = performance.now()
    let raf = 0
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / transition)
      apply({
        color: mixColor(from.color, target.color, t),
        grainColor: mixColor(from.grainColor, target.grainColor, t),
        blendTo: target.blendTo,
      })
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [ref, theme, color, grainColor, blendTo, transition])
}
