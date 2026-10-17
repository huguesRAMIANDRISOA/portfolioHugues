import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { navSections } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useTheme } from '../../hooks/useTheme'
import { useLanguage } from '../../i18n/useLanguage'
import { LinkButton } from '../ui/Button'
import { LanguageSelect } from '../ui/LanguageSelect'
import { Logo } from '../ui/Logo'
import styles from './Navbar.module.css'

export function Navbar() {
  const active = useActiveSection(navSections)
  const { theme, toggleTheme } = useTheme()
  const { nav } = useLanguage().content
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Logo />

        <nav aria-label={nav.label} className={`${styles.nav} ${open ? styles.open : ''}`} id="main-nav">
          <ul className={styles.links}>
            {navSections.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`${styles.link} ${active === id ? styles.active : ''}`}
                  aria-current={active === id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {nav.links[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <LinkButton href="#contact" variant="outline" className={styles.cta}>
            {nav.cta}
          </LinkButton>
          <LanguageSelect />
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label={theme === 'light' ? nav.darkTheme : nav.lightTheme}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button
            type="button"
            className={`${styles.iconButton} ${styles.burger}`}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? nav.closeMenu : nav.openMenu}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
