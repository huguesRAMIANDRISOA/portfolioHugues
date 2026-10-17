import { useState, type FormEvent } from 'react'

export type SubmissionStatus = 'idle' | 'sending' | 'sent' | 'error'

/** Nom du champ piège : invisible pour les humains, rempli par les bots. */
export const HONEYPOT_FIELD = 'website'

/**
 * Gère le cycle de vie d'un formulaire non contrôlé envoyé de façon asynchrone.
 * Le formulaire n'est vidé qu'en cas de succès, pour ne pas perdre la saisie sur une erreur.
 */
export function useFormSubmission(submit: (data: FormData) => Promise<void>) {
  const [status, setStatus] = useState<SubmissionStatus>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    if (status === 'sending') return

    // Bot détecté : on simule un succès sans rien envoyer.
    if (data.get(HONEYPOT_FIELD)) {
      form.reset()
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      await submit(data)
      form.reset()
      setStatus('sent')
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return { status, handleSubmit }
}

export function getField(data: FormData, name: string): string {
  const value = data.get(name)
  return typeof value === 'string' ? value.trim() : ''
}
