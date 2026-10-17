import { useSyncExternalStore } from 'react'
import type { Theme } from './useTheme'

// `useTheme` détient l'état (dans la Navbar) et le reflète sur <html data-theme>.
// Ce hook en est le miroir en lecture seule, pour les composants qui doivent réagir au thème.

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function getServerSnapshot(): Theme {
  return 'light'
}

export function useDocumentTheme(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
