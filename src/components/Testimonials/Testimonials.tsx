import { Quote } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage'
import { SectionHeading } from '../ui/SectionHeading'
import { SmartImage } from '../ui/SmartImage'
import styles from './Testimonials.module.css'

export function Testimonials() {
  const { testimonials } = useLanguage().content

  return (
    <section id="temoignages" className="section" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading id="testimonials-title" eyebrow={testimonials.eyebrow} title={testimonials.title} />
        <ul className={styles.grid}>
          {testimonials.items.map((item) => (
            <li key={item.name}>
              <figure className={styles.card}>
                <Quote size={26} className={styles.quoteIcon} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                <blockquote className={styles.quote}>{item.quote}</blockquote>
                <figcaption className={styles.author}>
                  <SmartImage
                    src={item.avatar}
                    alt=""
                    className={styles.avatar}
                    width={40}
                    height={40}
                    loading="lazy"
                    fallback={<span>{item.name.charAt(0)}</span>}
                  />
                  <span>
                    <strong className={styles.name}>{item.name}</strong>
                    <span className={styles.role}>{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
