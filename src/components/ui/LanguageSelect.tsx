import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { localeLabels, locales, type Locale } from '../../data/profile'
import { useLanguage } from '../../i18n/useLanguage'
import { Flag } from './Flags'
import styles from './LanguageSelect.module.css'

/**
 * Menu déroulant de langue (motif « disclosure ») : le bouton affiche la langue active,
 * le panneau liste toutes les langues, chacune libellée dans sa propre langue.
 */
export function LanguageSelect() {
  const { locale, setLocale, content } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef(new Map<Locale, HTMLButtonElement>())
  const panelId = useId()

  // Clic ou focus en dehors du composant : on referme.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  // À l'ouverture, le focus va sur la langue active.
  useEffect(() => {
    if (open) optionRefs.current.get(locale)?.focus()
  }, [open, locale])

  const close = (restoreFocus = true) => {
    setOpen(false)
    if (restoreFocus) triggerRef.current?.focus()
  }

  const choose = (next: Locale) => {
    setLocale(next)
    close()
  }

  const onPanelKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const current = locales.findIndex((item) => optionRefs.current.get(item) === document.activeElement)
    const moves: Partial<Record<string, number>> = {
      ArrowDown: current + 1,
      ArrowUp: current - 1,
      Home: 0,
      End: locales.length - 1,
    }
    const target = moves[event.key]

    if (event.key === 'Escape') {
      event.preventDefault()
      close()
    } else if (target !== undefined) {
      event.preventDefault()
      const next = locales[(target + locales.length) % locales.length]
      if (next) optionRefs.current.get(next)?.focus()
    }
  }

  return (
    <div
      ref={rootRef}
      className={styles.root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            setOpen(true)
          }
        }}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={content.nav.language(localeLabels[locale].name)}
      >
        <Flag locale={locale} className={styles.flag} />
        <span>{localeLabels[locale].short}</span>
        <ChevronDown size={14} className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} aria-hidden="true" />
      </button>

      <ul id={panelId} className={styles.panel} hidden={!open} onKeyDown={onPanelKeyDown}>
        {locales.map((item) => (
          <li key={item}>
            <button
              ref={(node) => {
                if (node) optionRefs.current.set(item, node)
                else optionRefs.current.delete(item)
              }}
              type="button"
              lang={item}
              className={`${styles.option} ${item === locale ? styles.selected : ''}`}
              aria-current={item === locale ? 'true' : undefined}
              onClick={() => choose(item)}
            >
              <Flag locale={item} className={styles.flag} />
              <span>{localeLabels[item].name}</span>
              {item === locale && <Check size={14} className={styles.check} aria-hidden="true" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
