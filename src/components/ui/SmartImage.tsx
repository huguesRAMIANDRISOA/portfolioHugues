import { useState, type ImgHTMLAttributes, type ReactNode } from 'react'
import styles from './SmartImage.module.css'

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  /** Contenu affiché si l'image est absente ou ne charge pas. */
  fallback?: ReactNode
  tone?: 'light' | 'dark' | 'warm'
}

export function SmartImage({ fallback, tone = 'warm', className = '', ...img }: SmartImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={`${styles.placeholder} ${styles[tone]} ${className}`} role="img" aria-label={img.alt}>
        {fallback}
      </div>
    )
  }

  return <img {...img} className={className} onError={() => setFailed(true)} />
}
