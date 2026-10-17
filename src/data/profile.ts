import type { LucideIcon } from 'lucide-react'
import type { SubmissionStatus } from '../hooks/useFormSubmission'

/*
 * Données partagées par toutes les langues (identité, liens, médias) et types du contenu.
 * Les textes traduits vivent dans `src/data/locales/<langue>.ts`, typés par `Content`.
 */

/** Langues proposées, dans l'ordre du sélecteur. */
export const locales = ['en', 'fr'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

/** Libellés du sélecteur de langue, rédigés dans la langue qu'ils désignent. */
export const localeLabels: Record<Locale, { short: string; name: string }> = {
  en: { short: 'EN', name: 'English' },
  fr: { short: 'FR', name: 'Français' },
}

export type SocialKey = 'github' | 'linkedin' | 'whatsapp'

/** Sections reprises dans la navigation, dans l'ordre d'affichage. Les ids restent fixes quelle que soit la langue. */
export const navSections = [
  'accueil',
  'a-propos',
  'services',
  'competences',
  'projets',
  // 'temoignages',
  'contact',
] as const
export type NavSection = (typeof navSections)[number]

export interface Stat {
  icon: LucideIcon
  value: string
  label: string
}

export interface Service {
  icon: LucideIcon
  title: string
  description: string
}

export interface Skill {
  name: string
  level: number
}

export interface Experience {
  period: string
  role: string
  company: string
  description: string
}

export interface Project {
  title: string
  category: string
  /** Visuel de la carte dans la grille. */
  image: string
  href: string
  /** Variante du placeholder affiché si l'image est absente. */
  tone: 'light' | 'dark' | 'warm'
  /** Phrase d'accroche affichée en tête de la fiche détaillée. */
  summary: string
  /** Paragraphes de la fiche détaillée. */
  description: readonly string[]
  /** Technologies affichées sous forme de puces. */
  stack: readonly string[]
  /** Captures présentées dans la galerie de la fiche détaillée. */
  gallery: readonly string[]
  /** Format dominant des captures : cadre la galerie en conséquence. */
  format: 'mobile' | 'desktop'
}

/** Partie d'un projet indépendante de la langue. */
export type ProjectAsset = Omit<Project, 'summary' | 'description'>

export interface Testimonial {
  quote: string
  name: string
  role: string
  avatar: string
}

export type FormMessages = Record<Exclude<SubmissionStatus, 'idle'>, string>

/** Tout le texte du site pour une langue donnée. */
export interface Content {
  meta: { title: string; description: string }
  profile: { title: string; tagline: string }
  nav: {
    label: string
    links: Record<NavSection, string>
    cta: string
    openMenu: string
    closeMenu: string
    darkTheme: string
    lightTheme: string
    /** Nom accessible du sélecteur de langue, à partir du nom de la langue active. */
    language: (current: string) => string
  }
  logo: { homeLabel: (name: string) => string }
  hero: {
    eyebrow: string
    projectsCta: string
    /** CV propre à la langue, servi depuis `public/`. */
    cv: { label: string; href: string; fileName: string }
    portraitAlt: (name: string) => string
    experienceValue: (years: string) => string
    experienceLabel: string
  }
  about: {
    eyebrow: string
    imageAlt: string
    heading: string
    paragraphs: readonly string[]
    stats: readonly Stat[]
  }
  services: { eyebrow: string; title: string; items: readonly Service[] }
  skills: { sectionLabel: string; eyebrow: string; title: string; items: readonly Skill[] }
  experience: { eyebrow: string; title: string; items: readonly Experience[] }
  projects: {
    eyebrow: string
    title: string
    previewAlt: (title: string) => string
    items: readonly Project[]
    dialog: {
      close: string
      previous: string
      next: string
      captureAlt: (title: string, index: number, total: number) => string
      showCapture: (index: number) => string
      stack: string
      visit: string
    }
  }
  testimonials: { eyebrow: string; title: string; items: readonly Testimonial[] }
  contact: {
    eyebrow: string
    title: readonly [string, string]
    intro: string
    fields: { name: string; email: string; projectType: string; message: string }
    projectTypes: readonly string[]
    submit: string
    submitting: string
    messages: FormMessages
  }
  footer: {
    baseline: string
    quickLinks: string
    servicesTitle: string
    services: readonly string[]
    contactTitle: string
    newsletterTitle: string
    newsletter: string
    emailLabel: string
    subscribe: string
    messages: FormMessages
    copyright: (year: number, name: string) => string
  }
  /** Textes des emails reçus par le visiteur. */
  emails: {
    unspecified: string
    contactReplySubject: (name: string) => string
    newsletterReplySubject: (siteName: string) => string
  }
}

const phone = '[+261 34 28 275 38]'

export const profile = {
  name: 'Hugues',
  // Portrait détouré (fond transparent) : la tête dépasse du cercle doré du hero.
  heroImage: '/images/portrait.webp',
  aboutImage: '/images/workspace.png',
  yearsOfExperience: '5+',
  email: '[huguesramiandrisoaandrianirina@gmail.com]',
  phone,
  location: '[Madagascar, Antsirabe]',
  stats: { projects: '7+', clients: '7+' },
  socials: {
    github: 'https://github.com/huguesRAMIANDRISOA',
    linkedin: 'https://www.linkedin.com/in/ramiandrisoa-andrianirina-hugues-72907b1b2',
    // wa.me attend le numéro international sans « + » ni espaces.
    whatsapp: `https://wa.me/${phone.replace(/\D/g, '')}`,
  } satisfies Record<SocialKey, string>,
}

/** Médias et stack des projets ; résumé et description sont traduits dans chaque langue. */
export const projectAssets = {
  simulabox: {
    title: 'SIMULABOX',
    category: 'ReactJs · NodeJS',
    image: '/images/simulabox/simu1.png',
    href: '#',
    tone: 'light',
    format: 'desktop',
    stack: ['React', 'Node.js', 'Postgres', 'Git'],
    gallery: ['/images/simulabox/simu1.png', '/images/simulabox/simu2.png'],
  },
  youmoov: {
    title: 'Youmoov',
    category: 'Flutter · NodeJS',
    image: '/images/youmoov/portrait.png',
    href: '#',
    tone: 'dark',
    format: 'mobile',
    stack: ['Flutter', 'Node.js', 'Firebase', 'Git', 'Mongodb'],
    gallery: [
      '/images/youmoov/youmoov-01.png',
      '/images/youmoov/youmoov-02.png',
      '/images/youmoov/youmoov-03.png',
      '/images/youmoov/youmoov-04.png',
      '/images/youmoov/youmoov-05.png',
      '/images/youmoov/youmoov-06.png',
      '/images/youmoov/youmoov-07.png',
      '/images/youmoov/youmoov-08.png',
      '/images/youmoov/youmoov-09.png',
      '/images/youmoov/youmoov-10.png',
      '/images/youmoov/youmoov-11.png',
      '/images/youmoov/youmoov-12.png',
      '/images/youmoov/youmoov-13.png',
    ],
  },
  myfa: {
    title: 'MyFa',
    category: 'Flutter · NodeJS',
    image: '/images/myfa/portrait.png',
    href: '#',
    tone: 'warm',
    format: 'mobile',
    stack: ['Flutter', 'Node.js', 'mongodb', 'Git'],
    gallery: [
      '/images/myfa/myfa-01.png',
      '/images/myfa/myfa-02.png',
      '/images/myfa/myfa-03.png',
      '/images/myfa/myfa-04.png',
      '/images/myfa/myfa-05.png',
      '/images/myfa/myfa-06.png',
      '/images/myfa/myfa-07.png',
      '/images/myfa/myfa-08.png',
      '/images/myfa/myfa-09.png',
      '/images/myfa/myfa-10.png',
      '/images/myfa/myfa-11.png',
    ],
  },
  // etrust: {
  //   title: 'E-trust',
  //   category: 'Flutter · NodeJS',
  //   image: '/images/myfa/portrait.png',
  //   href: '#',
  //   tone: 'warm',
  //   format: 'mobile',
  //   stack: ['Flutter', 'Node.js', 'supabase', 'Git', 'Firebase'],
  //   gallery: ['/images/myfa/myfa-01.png'],
  // },
  simulaboxAi: {
    title: 'Simulabox AI',
    category: 'ReactJs · Python',
    image: '/images/simulaboxAI/simu1.png',
    href: '#',
    tone: 'warm',
    format: 'mobile',
    stack: ['ReactJs', 'Python', 'postgres', 'Git'],
    gallery: [
      '/images/simulaboxAI/simu1.png',
      '/images/simulaboxAI/simu2.png',
      '/images/simulaboxAI/simu3.png',
    ],
  },
  ocrMarine: {
    title: 'OCR Groupe Marine',
    category: 'ReactJs · Python',
    image: '/images/ocrGroupeMarie/marine1.png',
    href: '#',
    tone: 'warm',
    format: 'mobile',
    stack: ['ReactJs', 'Python', 'supabase', 'Git'],
    gallery: [
      '/images/ocrGroupeMarie/marine1.png',
      '/images/ocrGroupeMarie/marine2.png',
      '/images/ocrGroupeMarie/marine3.png',
      '/images/ocrGroupeMarie/marine4.png',
    ],
  },
} as const satisfies Record<string, ProjectAsset>
