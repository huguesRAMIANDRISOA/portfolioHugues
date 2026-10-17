import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage'
import { SectionHeading } from '../ui/SectionHeading'
import { SmartImage } from '../ui/SmartImage'
import { ProjectDialog } from './ProjectDialog'
import styles from './Projects.module.css'

export function Projects() {
  const { projects } = useLanguage().content
  // L'index (et non l'objet) garde la fiche ouverte synchronisée avec la langue courante.
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section id="projets" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading id="projects-title" eyebrow={projects.eyebrow} title={projects.title} />
        <ul className={styles.grid}>
          {projects.items.map((project, index) => (
            <li key={project.title}>
              <button
                type="button"
                className={styles.card}
                onClick={() => setSelected(index)}
                aria-haspopup="dialog"
              >
                <div className={styles.media}>
                  <SmartImage
                    src={project.image}
                    alt={projects.previewAlt(project.title)}
                    className={styles.image}
                    width={400}
                    height={240}
                    loading="lazy"
                    tone={project.tone}
                    fallback={<span className={styles.placeholderTitle}>{project.title}</span>}
                  />
                </div>
                <div className={styles.meta}>
                  <span className={styles.dash} aria-hidden="true" />
                  <div className={styles.info}>
                    <h3 className={styles.title}>{project.title}</h3>
                    <p className={styles.category}>{project.category}</p>
                  </div>
                  <ArrowRight size={16} className={styles.arrow} aria-hidden="true" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ProjectDialog
        project={selected === null ? null : (projects.items[selected] ?? null)}
        onClose={() => setSelected(null)}
      />
    </section>
  )
}
