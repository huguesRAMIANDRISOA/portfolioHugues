import { createContext } from 'react'
import type { Content, Locale } from '../data/profile'

export interface LanguageContextValue {
  locale: Locale
  content: Content
  setLocale: (locale: Locale) => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
