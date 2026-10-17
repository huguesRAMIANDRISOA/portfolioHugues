import { ArrowRight } from 'lucide-react'
import { navSections, profile } from '../../data/profile'
import { getField, useFormSubmission } from '../../hooks/useFormSubmission'
import { useLanguage } from '../../i18n/useLanguage'
import { subscribeToNewsletter } from '../../lib/email'
import { Honeypot } from '../ui/Honeypot'
import { Logo } from '../ui/Logo'
import { SocialLinks } from '../ui/SocialLinks'
import styles from './Footer.module.css'

export function Footer() {
  const { locale, content } = useLanguage()
  const { footer, nav } = content
  const { status, handleSubmit } = useFormSubmission((data) =>
    subscribeToNewsletter(getField(data, 'email'), locale),
  )
  const isSending = status === 'sending'

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.baseline}>{footer.baseline}</p>
          <SocialLinks />
        </div>

        <nav aria-label={footer.quickLinks}>
          <h3 className={styles.heading}>{footer.quickLinks}</h3>
          <ul className={styles.list}>
            {navSections.map((id) => (
              <li key={id}>
                <a href={`#${id}`}>{nav.links[id]}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className={styles.heading}>{footer.servicesTitle}</h3>
          <ul className={styles.list}>
            {footer.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={styles.heading}>{footer.contactTitle}</h3>
          <ul className={styles.list}>
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>{profile.phone}</li>
            <li>{profile.location}</li>
          </ul>
        </div>

        <div>
          <h3 className={styles.heading}>{footer.newsletterTitle}</h3>
          <p className={styles.newsletterText}>{footer.newsletter}</p>
          <form className={styles.newsletter} onSubmit={handleSubmit}>
            <label htmlFor="newsletter-email" className="visually-hidden">
              {footer.emailLabel}
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder={footer.emailLabel}
              autoComplete="email"
              required
            />
            <Honeypot />
            <button type="submit" aria-label={footer.subscribe} disabled={isSending} aria-busy={isSending}>
              <ArrowRight size={14} />
            </button>
          </form>
          <p className={`${styles.subscribed} ${status === 'error' ? styles.error : ''}`} role="status">
            {status !== 'idle' && footer.messages[status]}
          </p>
        </div>
      </div>

      <p className={styles.copyright}>{footer.copyright(new Date().getFullYear(), profile.name)}</p>
    </footer>
  )
}
