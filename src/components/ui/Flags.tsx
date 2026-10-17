import { useId, type JSX, type SVGProps } from 'react'
import type { Locale } from '../../data/profile'

// Drapeaux en SVG inline : les emojis drapeaux ne s'affichent pas sous Windows.
// Les couleurs sont celles des drapeaux officiels, indépendantes du thème.

type FlagProps = SVGProps<SVGSVGElement>

function FrenchFlag(props: FlagProps) {
  return (
    <svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...props}>
      <rect width="1" height="2" fill="#002654" />
      <rect x="1" width="1" height="2" fill="#FFFFFF" />
      <rect x="2" width="1" height="2" fill="#CE1126" />
    </svg>
  )
}

function BritishFlag(props: FlagProps) {
  // Ids uniques : plusieurs drapeaux peuvent coexister dans la page.
  // `useId` produit des caractères (`:`, `«`) peu fiables dans `url(#…)` : on ne garde que l'alphanumérique.
  const clipId = `flag-uk-${useId().replace(/[^\w-]/g, '')}`

  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...props}>
      <clipPath id={clipId}>
        <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" clipPath={`url(#${clipId})`} stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}

const flags: Record<Locale, (props: FlagProps) => JSX.Element> = {
  en: BritishFlag,
  fr: FrenchFlag,
}

export function Flag({ locale, ...props }: FlagProps & { locale: Locale }) {
  const Component = flags[locale]
  return <Component {...props} />
}
