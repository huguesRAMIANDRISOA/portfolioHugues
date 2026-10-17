import { Code2 } from 'lucide-react'
import { profile } from '../../data/profile'
import { useLanguage } from '../../i18n/useLanguage'
import { SmartImage } from '../ui/SmartImage'
import styles from './About.module.css'

export function About() {
  const { about } = useLanguage().content

  return (
    <section id="a-propos" className="section section--alt" aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.media}>
          <span className={styles.frame} aria-hidden="true" />
          <SmartImage
            src={profile.aboutImage}
            alt={about.imageAlt}
            className={styles.image}
            width={420}
            height={320}
            loading="lazy"
            fallback={<Code2 size={56} strokeWidth={1} />}
          />
        </div>

        <div className={styles.text}>
          <p className={styles.eyebrow}>{about.eyebrow}</p>
          <h2 id="about-title" className={styles.title}>
            {about.heading}
          </h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
          <p className={styles.signature} aria-hidden="true">
            {profile.name}
          </p>
        </div>

        <ul className={styles.stats}>
          {about.stats.map(({ icon: Icon, value, label }) => (
            <li key={label} className={styles.stat}>
              <span className={styles.statIcon}>
                <Icon size={16} strokeWidth={1.5} />
              </span>
              <span>
                <strong className={styles.statValue}>{value}</strong>
                <span className={styles.statLabel}>{label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
