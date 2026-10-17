import { profile, type Locale } from '../data/profile'
import { contents } from '../data/locales'

/**
 * Envoi d'emails via l'API REST d'EmailJS (offre gratuite, sans backend).
 *
 * L'offre gratuite limite à 2 modèles : un seul modèle « notification » (au propriétaire)
 * sert les deux formulaires, et son auto-reply écrit au visiteur. Le contenu de chaque
 * modèle bascule selon le drapeau `is_contact` / `is_newsletter`. Voir `emails/README.md`.
 *
 * Les sujets reçus par le visiteur suivent la langue du site ; `{{locale}}` et `{{#is_fr}}` / `{{#is_en}}`
 * sont transmis aux modèles.
 * Les notifications adressées au propriétaire restent en français.
 */
const API_URL = 'https://api.emailjs.com/api/v1.0/email/send'

const config = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
}

type EmailKind = 'contact' | 'newsletter'

export interface ContactMessage {
  name: string
  email: string
  projectType: string
  message: string
}

async function send(kind: EmailKind, locale: Locale, params: Record<string, string>): Promise<void> {
  const { publicKey, serviceId, templateId } = config

  if (!publicKey || !serviceId || !templateId) {
    throw new Error("EmailJS n'est pas configuré : renseigner les variables de .env.example.")
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        site_name: profile.name,
        site_url: import.meta.env.VITE_SITE_URL || window.location.origin,
        locale,
        // Section Mustache active dans les modèles : {{#is_contact}}…{{/is_contact}}.
        [`is_${kind}`]: 'true',
        [`is_${locale}`]: 'true',
        ...params,
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`EmailJS a répondu ${response.status} : ${await response.text()}`)
  }
}

/** Notifie le propriétaire ; l'auto-reply envoie l'accusé de réception au visiteur. */
export function sendContactMessage({ name, email, projectType, message }: ContactMessage, locale: Locale) {
  const texts = contents[locale].emails
  const type = projectType || texts.unspecified
  return send('contact', locale, {
    // EmailJS refuse les sections conditionnelles dans le champ Subject : les sujets sont calculés ici.
    notification_subject: `Nouveau message de ${name} — ${type}`,
    reply_subject: texts.contactReplySubject(name),
    from_name: name,
    from_email: email,
    reply_to: email,
    project_type: type,
    message,
  })
}

/** Signale l'inscription au propriétaire ; l'auto-reply envoie l'email de bienvenue à l'abonné. */
export function subscribeToNewsletter(email: string, locale: Locale) {
  return send('newsletter', locale, {
    notification_subject: `Nouvel abonné à la newsletter : ${email}`,
    reply_subject: contents[locale].emails.newsletterReplySubject(profile.name),
    email,
    reply_to: email,
  })
}
