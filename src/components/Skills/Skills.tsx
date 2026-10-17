import { useLanguage } from '../../i18n/useLanguage'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './Skills.module.css'

export function Skills() {
  const { skills, experience } = useLanguage().content

  return (
    <section id="competences" className="section section--alt" aria-label={skills.sectionLabel}>
      <div className={`container ${styles.grid}`}>
        <div>
          <SectionHeading id="skills-title" eyebrow={skills.eyebrow} title={skills.title} align="left" />
          <ul className={styles.skills}>
            {skills.items.map((skill) => (
              <li key={skill.name}>
                <div className={styles.skillHead}>
                  <span>{skill.name}</span>
                  <span className={styles.percent}>{skill.level}%</span>
                </div>
                <div
                  className={styles.track}
                  role="progressbar"
                  aria-label={skill.name}
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <span className={styles.bar} style={{ width: `${skill.level}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <span className={styles.divider} aria-hidden="true" />

        <div>
          <SectionHeading id="experience-title" eyebrow={experience.eyebrow} title={experience.title} align="left" />
          <ol className={styles.timeline}>
            {experience.items.map((item) => (
              <li key={item.period} className={styles.item}>
                <span className={styles.period}>{item.period}</span>
                <div>
                  <h3 className={styles.role}>{item.role}</h3>
                  <p className={styles.company}>{item.company}</p>
                  <p className={styles.description}>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
