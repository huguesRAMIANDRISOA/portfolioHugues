import { useLanguage } from '../../i18n/useLanguage'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './Services.module.css'

export function Services() {
  const { services } = useLanguage().content

  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <span className={styles.decorLeft} aria-hidden="true" />
      <span className={styles.decorRight} aria-hidden="true" />
      <div className="container">
        <SectionHeading id="services-title" eyebrow={services.eyebrow} title={services.title} />
        <ul className={styles.grid}>
          {services.items.map(({ icon: Icon, title, description }) => (
            <li key={title} className={styles.card}>
              <span className={styles.icon}>
                <Icon size={22} strokeWidth={1.4} />
              </span>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
