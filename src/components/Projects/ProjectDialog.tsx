import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Project } from '../../data/profile'
import { useLanguage } from '../../i18n/useLanguage'
import { SmartImage } from '../ui/SmartImage'
import styles from './ProjectDialog.module.css'

/** Garde la vignette courante visible dans la bande défilante. */
function scrollActiveThumbIntoView(node: HTMLButtonElement | null) {
  node?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
}

interface ProjectDialogProps {
  /** Projet affiché ; `null` ferme la fiche. */
  project: Project | null
  onClose: () => void
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const { dialog: labels } = useLanguage().content.projects
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)

  // `showModal()` apporte le piège à focus, la touche Échap et l'inertie de l'arrière-plan.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (project && !dialog.open) {
      setIndex(0)
      dialog.showModal()
    } else if (!project && dialog.open) {
      dialog.close()
    }
  }, [project])

  // Le fond ne défile pas pendant la lecture de la fiche.
  useEffect(() => {
    if (!project) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [project])

  const total = project?.gallery.length ?? 0

  const step = useCallback(
    (delta: number) => {
      if (total < 2) return
      setIndex((current) => (current + delta + total) % total)
    },
    [total],
  )

  if (!project) return null

  // Un clic en dehors du panneau (sur le ::backdrop) ferme la fiche.
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) onClose()
  }

  // `gallery` peut être vide : on retombe alors sur le visuel de la carte.
  const current = project.gallery[index] ?? project.image

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={handleBackdropClick}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') step(1)
        if (event.key === 'ArrowLeft') step(-1)
      }}
    >
      <button type="button" className={styles.close} onClick={onClose} aria-label={labels.close}>
        <X size={18} />
      </button>

      <article className={styles.panel}>
        <div className={`${styles.stage} ${styles[project.format]}`}>
          <SmartImage
            key={current}
            src={current}
            alt={labels.captureAlt(project.title, index + 1, total)}
            className={styles.shot}
            tone={project.tone}
            fallback={<span>{project.title}</span>}
          />

          {total > 1 && (
            <>
              <button
                type="button"
                className={`${styles.nav} ${styles.prev}`}
                onClick={() => step(-1)}
                aria-label={labels.previous}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className={`${styles.nav} ${styles.next}`}
                onClick={() => step(1)}
                aria-label={labels.next}
              >
                <ChevronRight size={20} />
              </button>
              <p className={styles.counter} aria-hidden="true">
                {index + 1} / {total}
              </p>
            </>
          )}
        </div>

        {total > 1 && (
          <ul className={styles.thumbs}>
            {project.gallery.map((shot, position) => (
              <li key={shot}>
                <button
                  type="button"
                  ref={position === index ? scrollActiveThumbIntoView : null}
                  className={styles.thumb}
                  onClick={() => setIndex(position)}
                  aria-label={labels.showCapture(position + 1)}
                  aria-current={position === index}
                >
                  <img src={shot} alt="" loading="lazy" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.details}>
          <p className={styles.category}>{project.category}</p>
          <h2 id="project-dialog-title" className={styles.title}>
            {project.title}
          </h2>
          <p className={styles.summary}>{project.summary}</p>

          {project.description.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}

          <h3 className={styles.stackTitle}>{labels.stack}</h3>
          <ul className={styles.stack}>
            {project.stack.map((item) => (
              <li key={item} className={styles.chip}>
                {item}
              </li>
            ))}
          </ul>

          {project.href !== '#' && (
            <a className={styles.visit} href={project.href} target="_blank" rel="noreferrer">
              {labels.visit}
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </article>
    </dialog>
  )
}
