/** Couleurs modifiables à chaud via `setColors`, sans perdre les traces. */
export interface SandTrailColors {
  /** Couleur de fond du conteneur (hex). */
  color?: string
  /** Teinte moyenne des grains (hex). */
  grainColor?: string
  /** Couleur de la section suivante (hex) : le bas du fond s'y fond. */
  blendTo?: string
}

export interface SandTrailOptions extends SandTrailColors {
  /** Rayon du sillon (px). */
  width?: number
  /** Durée pendant laquelle la trace reste (s). */
  hold?: number
  /** Durée du retour des grains (s). */
  fade?: number
  /** Vitesse minimale (px/frame) pour démarrer un tracé. */
  threshold?: number
  /** Espacement des grains (px). */
  spacing?: number
  /** Multiplicateur d'opacité des grains (fixé à l'initialisation). */
  opacity?: number
  /** Hauteur (px) du fondu des grains en haut. */
  fadeTop?: number
  /** Hauteur (px) du fondu des grains en bas. */
  fadeBottom?: number
}

/** Fonction de nettoyage ; `setColors` est absent quand l'effet est désactivé (tactile, reduced motion). */
export interface SandTrailHandle {
  (): void
  setColors?: (colors: SandTrailColors) => void
}

/** Monte l'effet dans `container` et retourne la fonction de nettoyage. */
export function initSandTrail(container: HTMLElement, options?: SandTrailOptions): SandTrailHandle
