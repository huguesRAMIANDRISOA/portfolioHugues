import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { profile } from '../../data/profile'
import { getField, useFormSubmission } from '../../hooks/useFormSubmission'
import { useLanguage } from '../../i18n/useLanguage'
import { sendContactMessage } from '../../lib/email'
import { Button } from '../ui/Button'
import { Honeypot } from '../ui/Honeypot'
import styles from './Contact.module.css'

const contactItems = [
  { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, '')}` },
  { icon: MapPin, label: profile.location }
]

export function Contact() {
  const { locale, content } = useLanguage()
  const { contact } = content
  const { status, handleSubmit } = useFormSubmission((data) =>
    sendContactMessage(
      {
        name: getField(data, 'name'),
        email: getField(data, 'email'),
        projectType: getField(data, 'projectType'),
        message: getField(data, 'message'),
      },
      locale,
    ),
  )
  const isSending = status === 'sending'

  return (
    <section id="contact" className="section section--alt" aria-labelledby="contact-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.eyebrow}>{contact.eyebrow}</p>
          <h2 id="contact-title" className={styles.title}>
            {contact.title[0]}
            <br />
            {contact.title[1]}
          </h2>
          <p className={styles.intro}>{contact.intro}</p>
        </div>

        <form id="contact-form" className={styles.form} onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="contact-name">
            {contact.fields.name}
          </label>
          <input id="contact-name" name="name" placeholder={contact.fields.name} autoComplete="name" required />

          <label className="visually-hidden" htmlFor="contact-email">
            {contact.fields.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder={contact.fields.email}
            autoComplete="email"
            required
          />

          <label className="visually-hidden" htmlFor="contact-type">
            {contact.fields.projectType}
          </label>
          <select id="contact-type" name="projectType" className={styles.full} defaultValue="">
            <option value="" disabled>
              {contact.fields.projectType}
            </option>
            {contact.projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          <label className="visually-hidden" htmlFor="contact-message">
            {contact.fields.message}
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder={contact.fields.message}
            rows={5}
            className={styles.full}
            required
          />

          <Honeypot />

          <p
            className={`${styles.full} ${styles.status} ${status === 'error' ? styles.error : ''}`}
            role="status"
          >
            {status !== 'idle' && contact.messages[status]}
          </p>
        </form>

        <div className={styles.aside}>
          {/* Bouton placé dans la colonne de droite (comme la maquette), relié au formulaire via `form`. */}
          <Button
            type="submit"
            form="contact-form"
            icon={<Send size={14} />}
            disabled={isSending}
            aria-busy={isSending}
          >
            {isSending ? contact.submitting : contact.submit}
          </Button>
          <ul className={styles.details}>
            {contactItems.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Icon size={15} strokeWidth={1.6} className={styles.detailIcon} aria-hidden="true" />
                {href ? <a href={href}>{label}</a> : <span>{label}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
