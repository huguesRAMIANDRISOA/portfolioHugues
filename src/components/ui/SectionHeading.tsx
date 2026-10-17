import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
  align?: 'center' | 'left'
}

export function SectionHeading({ id, eyebrow, title, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={`${styles.heading} ${styles[align]}`}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
    </div>
  )
}
