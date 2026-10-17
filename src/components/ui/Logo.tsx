import { profile } from '../../data/profile'
import { useLanguage } from '../../i18n/useLanguage'
import styles from './Logo.module.css'

export function Logo() {
  const { content } = useLanguage()

  return (
    <a href="#accueil" className={styles.logo} aria-label={content.logo.homeLabel(profile.name)}>
      <svg viewBox="0 0 32 32" className={styles.mark} aria-hidden="true">
        <path d="M16 2.5 29.5 16 16 29.5 2.5 16Z" />
        <path d="M9.25 9.25 22.75 22.75M22.75 9.25 9.25 22.75" />
      </svg>
      <span className={styles.text}>
        <span className={styles.name}>{profile.name}</span>
        <span className={styles.role}>{content.profile.title}</span>
      </span>
    </a>
  )
}
