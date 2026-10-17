import { profile, type SocialKey } from '../../data/profile'
import type { JSX } from 'react'
import { GitHub, LinkedIn, WhatsApp, type IconProps } from './BrandIcons'
import styles from './SocialLinks.module.css'

const socialIcons: Record<SocialKey, { label: string; Icon: (props: IconProps) => JSX.Element }> = {
  github: { label: 'GitHub', Icon: GitHub },
  linkedin: { label: 'LinkedIn', Icon: LinkedIn },
  whatsapp: { label: 'WhatsApp', Icon: WhatsApp },
}

interface SocialLinksProps {
  direction?: 'row' | 'column'
  className?: string
}

export function SocialLinks({ direction = 'row', className = '' }: SocialLinksProps) {
  const entries = Object.entries(profile.socials) as [SocialKey, string][]

  return (
    <ul className={`${styles.list} ${styles[direction]} ${className}`}>
      {entries.map(([key, href]) => {
        const { label, Icon } = socialIcons[key]
        return (
          <li key={key}>
            <a href={href} target="_blank" rel="noreferrer" aria-label={label} className={styles.link}>
              <Icon width={15} height={15} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
