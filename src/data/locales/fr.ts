import { Award, Bot, Briefcase, Layers, Server, Smartphone, Smile } from 'lucide-react'
import { profile, projectAssets, type Content } from '../profile'

const years = profile.yearsOfExperience.replace('+', '')

export const fr: Content = {
  meta: {
    title: `${profile.name} — Développeur FullStack`,
    description:
      'Portfolio de Hugues, développeur Full Stack : Node.js, React, Python, Flutter, IA et automatisation.',
  },

  profile: {
    title: 'Développeur FullStack',
    tagline: 'Je transforme des besoins métier en applications fiables, modernes et maintenables.',
  },

  nav: {
    label: 'Navigation principale',
    links: {
      accueil: 'Accueil',
      'a-propos': 'À propos',
      services: 'Services',
      competences: 'Compétences',
      projets: 'Projets',
      contact: 'Contact',
    },
    cta: 'Parlons-en',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    darkTheme: 'Activer le thème sombre',
    lightTheme: 'Activer le thème clair',
    language: (current) => `Langue : ${current}`,
  },

  logo: {
    homeLabel: (name) => `${name}, retour à l’accueil`,
  },

  hero: {
    eyebrow: 'Bonjour, je suis',
    projectsCta: 'Voir mes projets',
    cv: {
      label: 'Télécharger mon CV',
      href: '/Cv  Hugues RAMIANDRISOA Developpeur.pdf',
      fileName: 'Hugues_RAMIANDRISOA_CV.pdf',
    },
    portraitAlt: (name) => `Portrait de ${name}`,
    experienceValue: (value) => `${value} ans`,
    experienceLabel: 'd’expérience',
  },

  about: {
    eyebrow: 'À propos',
    imageAlt: 'Mon espace de travail',
    heading: 'Des idées complexes\nen produits simples et fiables.',
    paragraphs: [
      `Développeur Full Stack avec plus de ${years} ans. je construis des applications web et mobiles avec une forte expertise en Node.js, React, Python et APIs REST. Mon approche ne se limite pas à écrire du code : j’analyse les besoins, conçois des solutions maintenables, automatise les tâches répétitives et utilise l’IA pour améliorer les tests, le debugging et la qualité logicielle.`,
      'J’aime prendre en charge un problème de bout en bout, comprendre son impact métier et construire des solutions robustes, évolutives et agréables à utiliser.',
    ],
    stats: [
      { icon: Briefcase, value: profile.stats.projects, label: 'Projets livrés' },
      { icon: Smile, value: profile.stats.clients, label: 'Clients satisfaits' },
      { icon: Award, value: profile.yearsOfExperience, label: 'Années d’expérience' },
    ],
  },

  services: {
    eyebrow: 'Services',
    title: 'Ce que je peux faire pour vous',
    items: [
      {
        icon: Server,
        title: 'Backend & API',
        description:
          'Conception d’API REST et de services backend robustes avec Node.js et Python, connectés à des bases SQL et NoSQL.',
      },
      {
        icon: Layers,
        title: 'Développement Full Stack',
        description:
          'Création et évolution d’applications web avec React, Angular, Node.js et Python, du backend jusqu’à l’interface utilisateur.',
      },
      {
        icon: Smartphone,
        title: 'Applications Mobiles',
        description:
          'Développement d’applications mobiles Flutter, intégration d’API et optimisation de l’expérience utilisateur.',
      },
      {
        icon: Bot,
        title: 'IA & Automatisation',
        description:
          'Intégration d’outils IA et d’automatisation pour accélérer le développement, renforcer les tests, le debugging et la qualité du code.',
      },
    ],
  },

  skills: {
    sectionLabel: 'Compétences et expérience',
    eyebrow: 'Compétences',
    title: 'Compétences & Expertise',
    items: [
      { name: 'Node.js', level: 95 },
      { name: 'React / Angular', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'Flutter', level: 85 },
      { name: 'Bases de données SQL / NoSQL', level: 88 },
      { name: 'Développement assisté par IA', level: 82 },
    ],
  },

  experience: {
    eyebrow: 'Expérience',
    title: 'Mon parcours',
    items: [
      {
        period: 'Juil. 2026 — Sept. 2026',
        role: 'Développeur React / Python',
        company: 'APPS TECHNOLOGIES',
        description:
          'Développement et évolution d’une application de gestion de patrimoine avec Python côté backend et React côté frontend. Utilisation de Claude Code pour accélérer le développement, renforcer les tests, faciliter le debugging et fiabiliser les validations.',
      },
      {
        period: 'Sept. 2023 — Sept. 2025',
        role: 'Développeur Flutter',
        company: 'Honest Coders',
        description:
          'Développement d’applications mobiles Flutter répondant aux besoins clients, intégration d’API et optimisation de l’expérience utilisateur.',
      },
      {
        period: 'Août 2020 — 2025',
        role: 'Développeur Node.js & Responsable Technique',
        company: 'APPS TECHNOLOGIES',
        description:
          'Développement d’applications backend, d’algorithmes et de fonctionnalités avec Node.js. Mise en place de tests, documentation, gestion Git et suivi des exigences fonctionnelles et techniques.',
      },
    ],
  },

  projects: {
    eyebrow: 'Projets',
    title: 'Une sélection de mes réalisations',
    previewAlt: (title) => `Aperçu du projet ${title}`,
    items: [
      {
        ...projectAssets.simulabox,
        summary: 'Logiciel pour un conseil patrimonial et fiscal',
        description: [
          'Simulabox est le nouveau logiciel de référence spécialisé en ingénierie patrimoniale. Avec son ergonomie et sa fluidité d’utilisation, l’ingénierie patrimoniale est facile, rapide et fiable à un niveau Expert ! https://simulabox.fr/',
        ],
      },
      {
        ...projectAssets.youmoov,
        summary: 'Application mobile de covoiturage',
        description: [
          'Parcours complet côté passager et conducteur : recherche de trajets, réservation, suivi des réservations et profil utilisateur.',
        ],
      },
      {
        ...projectAssets.myfa,
        summary: 'Application mobile de recrutement sportif',
        description: [
          'Outil de mise en relation entre clubs et joueurs : recherche ciblée ou exploration de tous les profils disponibles, messagerie intégrée et suivi des candidatures.',
        ],
      },
      // {
      //   ...projectAssets.etrust,
      //   summary: 'Application trust e-commerce',
      //   description: ['Outil relationnel entre Marchand et client a madagascar dans le domaine de l\'e-commerce'],
      // },
      {
        ...projectAssets.simulaboxAi,
        summary: 'Logiciel pour un conseil patrimonial et fiscal version AI',
        description: [
          'Simulabox est le nouveau logiciel de référence spécialisé en ingénierie patrimoniale. Avec son ergonomie et sa fluidité d’utilisation, l’ingénierie patrimoniale est facile, rapide et fiable à un niveau Expert ! https://simulabox.fr/',
        ],
      },
      {
        ...projectAssets.ocrMarine,
        summary: 'Système OCR de factures',
        description: [
          'Extraction automatique et intelligente des données issues des factures reçues et émises, afin de réduire les saisies manuelles, minimiser les erreurs et accélérer le traitement comptable.',
        ],
      },
    ],
    dialog: {
      close: 'Fermer la fiche projet',
      previous: 'Capture précédente',
      next: 'Capture suivante',
      captureAlt: (title, index, total) => `${title} — capture ${index} sur ${total}`,
      showCapture: (index) => `Afficher la capture ${index}`,
      stack: 'Stack technique',
      visit: 'Voir le projet',
    },
  },

  testimonials: {
    eyebrow: 'Témoignages',
    title: 'Ce que disent mes clients',
    items: [
      {
        quote:
          'Un développeur React d’un niveau rare. Il a restructuré notre front-end et toute l’équipe a gagné en vélocité.',
        name: 'Sarah Martin',
        role: 'CTO, Studio Nova',
        avatar: '/images/avatar-1.jpg',
      },
      {
        quote: 'Livraison impeccable, code propre et documenté. Notre application est deux fois plus rapide qu’avant.',
        name: 'David Leroy',
        role: 'Fondateur, TechFlow',
        avatar: '/images/avatar-2.jpg',
      },
      {
        quote: 'Pédagogue et rigoureux : un vrai lead technique qui fait progresser les gens autour de lui.',
        name: 'Émilie Bernard',
        role: 'Product Manager',
        avatar: '/images/avatar-3.jpg',
      },
    ],
  },

  contact: {
    eyebrow: 'Travaillons ensemble',
    title: ['Un projet', 'en tête ?'],
    intro: 'Parlez-moi de votre idée : je vous réponds sous 48 h pour en discuter et vous aider à lui donner vie.',
    fields: {
      name: 'Votre nom',
      email: 'Votre email',
      projectType: 'Type de projet',
      message: 'Votre message',
    },
    projectTypes: [
      'Développement Full Stack',
      'Backend Node.js / Python & API',
      'Application mobile Flutter',
      'Intégration IA & automatisation',
      'Optimisation & maintenance applicative',
    ],
    submit: 'Envoyer',
    submitting: 'Envoi…',
    messages: {
      sending: 'Envoi en cours…',
      sent: 'Merci ! Votre message a bien été envoyé, un email de confirmation vous attend.',
      error: 'L’envoi a échoué. Réessayez dans un instant ou écrivez-moi directement par email.',
    },
  },

  footer: {
    baseline: 'Je transforme des besoins complexes en solutions simples, fiables et évolutives.',
    quickLinks: 'Liens rapides',
    servicesTitle: 'Services',
    services: ['Full Stack', 'Node.js & APIs', 'Flutter', 'IA & Automatisation'],
    contactTitle: 'Contact',
    newsletterTitle: 'Newsletter',
    newsletter: 'Notes, retours d’expérience et idées autour du développement, de l’IA et de l’automatisation.',
    emailLabel: 'Votre email',
    subscribe: 'S’inscrire à la newsletter',
    messages: {
      sending: 'Inscription…',
      sent: 'Merci, à très vite ! Un email de bienvenue vient de partir.',
      error: 'L’inscription a échoué, merci de réessayer.',
    },
    copyright: (year, name) => `© ${year} ${name}. Tous droits réservés.`,
  },

  emails: {
    unspecified: 'Non précisé',
    contactReplySubject: (name) => `J'ai bien reçu votre message, ${name}`,
    newsletterReplySubject: (siteName) => `Bienvenue dans la newsletter de ${siteName}`,
  },
}
