import { HONEYPOT_FIELD } from '../../hooks/useFormSubmission'

/** Champ anti-spam caché aux utilisateurs (y compris lecteurs d'écran et navigation clavier). */
export function Honeypot() {
  return (
    <div className="visually-hidden" aria-hidden="true">
      <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  )
}
