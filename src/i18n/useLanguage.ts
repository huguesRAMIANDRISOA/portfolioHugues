import { useContext } from 'react'
import { LanguageContext, type LanguageContextValue } from './LanguageContext'

/** Langue courante et contenu traduit du site. */
export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage doit être utilisé sous <LanguageProvider>.')
  return context
}
