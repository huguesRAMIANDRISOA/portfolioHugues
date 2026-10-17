import { useRef } from 'react'
import { ArrowRight, Award, Download } from 'lucide-react'
import { profile } from '../../data/profile'
import { useLanguage } from '../../i18n/useLanguage'
import { useSandTrail, type UseSandTrailOptions } from '../../hooks/useSandTrail'
import { LinkButton } from '../ui/Button'
import { SmartImage } from '../ui/SmartImage'
import { SocialLinks } from '../ui/SocialLinks'
import styles from './Hero.module.css'

// Les couleurs sont des tokens, résolus selon le thème courant (clair / sombre).
const SAND_TRAIL: UseSandTrailOptions = {
  // Le hero n'a pas de fond propre : il laisse voir celui du body (global.css).
  color: 'var(--color-bg)',
  // Fond de la section « À propos » (.section--alt) : le bas du hero s'y fond sans coupure.
  blendTo: 'var(--color-bg-alt)',
  grainColor: 'var(--color-sand-grain)',
  width: 20,
  hold: 12,
  fade: 4,
  threshold: 8,
  fadeTop: 140,
  fadeBottom: 220,
  // Suit la transition background-color 0.3s du body lors d'un changement de thème.
  transition: 300,
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  useSandTrail(heroRef, SAND_TRAIL)
  const { profile: identity, hero } = useLanguage().content

  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <section ref={heroRef} id="accueil" className={styles.hero} aria-labelledby="hero-title">
      <span className={styles.blob} aria-hidden="true" />
      <span className={styles.diagonal} aria-hidden="true" />
      <span className={styles.shape} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.side}>
          <span className={styles.sideLine} aria-hidden="true" />
          <SocialLinks direction="column" />
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 id="hero-title" className={styles.title}>
            {profile.name}
          </h1>
          <p className={styles.subtitle}>{identity.title}</p>
          <p className={styles.tagline}>{identity.tagline}</p>

          <div className={styles.ctas}>
            <LinkButton href="#projets" icon={<ArrowRight size={14} />}>
              {hero.projectsCta}
            </LinkButton>
            {/* `encodeURI` : le nom du CV français contient des espaces. */}
            <a href={encodeURI(hero.cv.href)} download={hero.cv.fileName} type="application/pdf" className={styles.download}>
              <span className={styles.downloadIcon}>
                <Download size={14} />
              </span>
              {hero.cv.label}
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          {/* Le cercle, le portrait et le badge sont regroupés : ils restent alignés
              entre eux quelle que soit la largeur d'écran. */}
          <div className={styles.figure}>
            <span className={styles.circle} aria-hidden="true" />
            <SmartImage
              src={profile.heroImage}
              alt={hero.portraitAlt(profile.name)}
              className={styles.portrait}
              width={620}
              height={540}
              fetchPriority="high"
              fallback={<span className={styles.initials}>{initials}</span>}
            />
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>
                <Award size={24} strokeWidth={1.4} />
              </span>
              <span>
                <strong className={styles.badgeValue}>{hero.experienceValue(profile.yearsOfExperience)}</strong>
                <span className={styles.badgeLabel}>{hero.experienceLabel}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
