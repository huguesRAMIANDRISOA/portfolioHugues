import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type Variant = 'solid' | 'outline' | 'ghost'

interface StyleProps {
  variant?: Variant
  icon?: ReactNode
}

function buttonClass(variant: Variant, className = '') {
  return `${styles.button} ${styles[variant]} ${className}`
}

function ButtonContent({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <>
      <span>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </>
  )
}

export function Button({
  variant = 'solid',
  icon,
  className,
  children,
  ...props
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClass(variant, className)} {...props}>
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </button>
  )
}

export function LinkButton({
  variant = 'solid',
  icon,
  className,
  children,
  ...props
}: StyleProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a className={buttonClass(variant, className)} {...props}>
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </a>
  )
}
