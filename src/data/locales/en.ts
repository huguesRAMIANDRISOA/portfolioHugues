import { Award, Bot, Briefcase, Layers, Server, Smartphone, Smile } from 'lucide-react'
import { profile, projectAssets, type Content } from '../profile'

const years = profile.yearsOfExperience.replace('+', '')

export const en: Content = {
  meta: {
    title: `${profile.name} — Full Stack Developer`,
    description:
      'Portfolio of Hugues, Full Stack developer: Node.js, React, Python, Flutter, AI and automation.',
  },

  profile: {
    title: 'Full Stack Developer',
    tagline: 'I turn business needs into reliable, modern and maintainable applications.',
  },

  nav: {
    label: 'Main navigation',
    links: {
      accueil: 'Home',
      'a-propos': 'About',
      services: 'Services',
      competences: 'Skills',
      projets: 'Projects',
      contact: 'Contact',
    },
    cta: 'Let’s talk',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    darkTheme: 'Switch to dark theme',
    lightTheme: 'Switch to light theme',
    language: (current) => `Language: ${current}`,
  },

  logo: {
    homeLabel: (name) => `${name}, back to home`,
  },

  hero: {
    eyebrow: 'Hello, I’m',
    projectsCta: 'See my projects',
    cv: {
      label: 'Download my resume',
      href: '/Hugues_RAMIANDRISOA_resume_en.pdf',
      fileName: 'Hugues_RAMIANDRISOA_resume.pdf',
    },
    portraitAlt: (name) => `Portrait of ${name}`,
    experienceValue: (value) => `${value} years`,
    experienceLabel: 'of experience',
  },

  about: {
    eyebrow: 'About',
    imageAlt: 'My workspace',
    heading: 'Complex ideas\ninto simple, reliable products.',
    paragraphs: [
      `Full Stack developer with over ${years} years of experience, I build web and mobile applications with strong expertise in Node.js, React, Python and REST APIs. My approach goes beyond writing code: I analyse needs, design maintainable solutions, automate repetitive tasks and use AI to improve testing, debugging and software quality.`,
      'I enjoy owning a problem end to end, understanding its business impact and building solutions that are robust, scalable and pleasant to use.',
    ],
    stats: [
      { icon: Briefcase, value: profile.stats.projects, label: 'Projects delivered' },
      { icon: Smile, value: profile.stats.clients, label: 'Happy clients' },
      { icon: Award, value: profile.yearsOfExperience, label: 'Years of experience' },
    ],
  },

  services: {
    eyebrow: 'Services',
    title: 'What I can do for you',
    items: [
      {
        icon: Server,
        title: 'Backend & APIs',
        description:
          'Design of robust REST APIs and backend services with Node.js and Python, connected to SQL and NoSQL databases.',
      },
      {
        icon: Layers,
        title: 'Full Stack Development',
        description:
          'Building and evolving web applications with React, Angular, Node.js and Python, from the backend to the user interface.',
      },
      {
        icon: Smartphone,
        title: 'Mobile Apps',
        description: 'Flutter mobile app development, API integration and user experience optimisation.',
      },
      {
        icon: Bot,
        title: 'AI & Automation',
        description:
          'Integrating AI and automation tools to speed up development and strengthen testing, debugging and code quality.',
      },
    ],
  },

  skills: {
    sectionLabel: 'Skills and experience',
    eyebrow: 'Skills',
    title: 'Skills & Expertise',
    items: [
      { name: 'Node.js', level: 95 },
      { name: 'React / Angular', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'Flutter', level: 85 },
      { name: 'SQL / NoSQL Databases', level: 88 },
      { name: 'AI-assisted Development', level: 82 },
    ],
  },

  experience: {
    eyebrow: 'Experience',
    title: 'My journey',
    items: [
      {
        period: 'Jul 2026 — Sep 2026',
        role: 'React / Python Developer',
        company: 'APPS TECHNOLOGIES',
        description:
          'Development and evolution of a wealth management application with a Python backend and a React frontend. Used Claude Code to speed up development, strengthen tests, ease debugging and make validations more reliable.',
      },
      {
        period: 'Sep 2023 — Sep 2025',
        role: 'Flutter Developer',
        company: 'Honest Coders',
        description:
          'Development of Flutter mobile apps tailored to client needs, API integration and user experience optimisation.',
      },
      {
        period: 'Aug 2020 — 2025',
        role: 'Node.js Developer & Technical Lead',
        company: 'APPS TECHNOLOGIES',
        description:
          'Development of backend applications, algorithms and features with Node.js. Set up testing, documentation and Git workflows, and tracked functional and technical requirements.',
      },
    ],
  },

  projects: {
    eyebrow: 'Projects',
    title: 'A selection of my work',
    previewAlt: (title) => `Preview of the ${title} project`,
    items: [
      {
        ...projectAssets.simulabox,
        summary: 'Wealth and tax advisory software',
        description: [
          'Simulabox is the new reference software for wealth engineering. Thanks to its ergonomics and smooth experience, wealth engineering becomes easy, fast and reliable at an expert level! https://simulabox.fr/',
        ],
      },
      {
        ...projectAssets.youmoov,
        summary: 'Carpooling mobile app',
        description: [
          'Complete passenger and driver journeys: trip search, booking, booking tracking and user profile.',
        ],
      },
      {
        ...projectAssets.myfa,
        summary: 'Sports recruitment mobile app',
        description: [
          'Matchmaking tool between clubs and players: targeted search or browsing of every available profile, built-in messaging and application tracking.',
        ],
      },
      {
        ...projectAssets.simulaboxAi,
        summary: 'Wealth and tax advisory software, AI edition',
        description: [
          'Simulabox is the new reference software for wealth engineering. Thanks to its ergonomics and smooth experience, wealth engineering becomes easy, fast and reliable at an expert level! https://simulabox.fr/',
        ],
      },
      {
        ...projectAssets.ocrMarine,
        summary: 'Invoice OCR system',
        description: [
          'Automatic, intelligent extraction of data from incoming and outgoing invoices, to reduce manual entry, minimise errors and speed up accounting.',
        ],
      },
    ],
    dialog: {
      close: 'Close project details',
      previous: 'Previous screenshot',
      next: 'Next screenshot',
      captureAlt: (title, index, total) => `${title} — screenshot ${index} of ${total}`,
      showCapture: (index) => `Show screenshot ${index}`,
      stack: 'Tech stack',
      visit: 'View the project',
    },
  },

  testimonials: {
    eyebrow: 'Testimonials',
    title: 'What my clients say',
    items: [
      {
        quote:
          'A React developer of rare calibre. He restructured our front end and the whole team gained velocity.',
        name: 'Sarah Martin',
        role: 'CTO, Studio Nova',
        avatar: '/images/avatar-1.jpg',
      },
      {
        quote: 'Flawless delivery, clean and documented code. Our application is twice as fast as before.',
        name: 'David Leroy',
        role: 'Founder, TechFlow',
        avatar: '/images/avatar-2.jpg',
      },
      {
        quote: 'A patient teacher and rigorous engineer: a true tech lead who helps the people around him grow.',
        name: 'Émilie Bernard',
        role: 'Product Manager',
        avatar: '/images/avatar-3.jpg',
      },
    ],
  },

  contact: {
    eyebrow: 'Let’s work together',
    title: ['Have a project', 'in mind?'],
    intro: 'Tell me about your idea: I’ll get back to you within 48 hours to discuss it and help bring it to life.',
    fields: {
      name: 'Your name',
      email: 'Your email',
      projectType: 'Project type',
      message: 'Your message',
    },
    projectTypes: [
      'Full Stack development',
      'Node.js / Python backend & APIs',
      'Flutter mobile app',
      'AI integration & automation',
      'Application optimisation & maintenance',
    ],
    submit: 'Send',
    submitting: 'Sending…',
    messages: {
      sending: 'Sending…',
      sent: 'Thank you! Your message has been sent, a confirmation email is on its way.',
      error: 'Sending failed. Please try again in a moment or email me directly.',
    },
  },

  footer: {
    baseline: 'I turn complex needs into simple, reliable and scalable solutions.',
    quickLinks: 'Quick links',
    servicesTitle: 'Services',
    services: ['Full Stack', 'Node.js & APIs', 'Flutter', 'AI & Automation'],
    contactTitle: 'Contact',
    newsletterTitle: 'Newsletter',
    newsletter: 'Notes, lessons learned and ideas about software development, AI and automation.',
    emailLabel: 'Your email',
    subscribe: 'Subscribe to the newsletter',
    messages: {
      sending: 'Subscribing…',
      sent: 'Thanks, talk soon! A welcome email is on its way.',
      error: 'Subscription failed, please try again.',
    },
    copyright: (year, name) => `© ${year} ${name}. All rights reserved.`,
  },

  emails: {
    unspecified: 'Not specified',
    contactReplySubject: (name) => `I’ve received your message, ${name}`,
    newsletterReplySubject: (siteName) => `Welcome to ${siteName}’s newsletter`,
  },
}
