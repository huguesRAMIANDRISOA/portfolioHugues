import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { defaultLocale, locales, type Locale } from '../data/profile'
import { contents } from '../data/locales'
import { LanguageContext } from './LanguageContext'

const STORAGE_KEY = 'portfolio-locale'

function isLocale(value: string | null | undefined): value is Locale {
  return locales.some((locale) => locale === value)
}

/** Priorité : `?lang=` (lien partagé) > choix mémorisé > anglais. */
function getInitialLocale(): Locale {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (isLocale(fromUrl)) return fromUrl

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLocale(stored)) return stored
  } catch {
    // storage indisponible
  }

  return defaultLocale
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale)
  const content = contents[locale]

  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    document.title = content.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', content.meta.description)
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      // ignoré
    }
  }, [locale, content])

  const value = useMemo(() => ({ locale, content, setLocale }), [locale, content])

  return <LanguageContext value={value}>{children}</LanguageContext>
}
