# CLAUDE.md — Portfolio

Portfolio personnel d'un **développeur senior Node**. Le site présente le profil, les services, les compétences, l'expérience, une sélection de projets, des témoignages et un formulaire de contact.

Le code doit refléter le niveau senior du propriétaire : c'est aussi une vitrine technique. Architecture propre, typage strict, accessibilité, performance et cohérence visuelle ne sont pas optionnels.

## Stack

- **React 19** + **TypeScript** (mode `strict`)
- **Vite** (dev server, build)
- **CSS Modules** + variables CSS (design tokens dans `src/styles/tokens.css`)
- **lucide-react** pour les icônes UI (les logos de marques sont des SVG inline dans `src/components/ui/BrandIcons.tsx`)
- **ESLint** (flat config, `typescript-eslint`, `eslint-plugin-react-hooks`)

Pas de framework CSS (Tailwind, etc.), pas de librairie de composants, pas de state manager global : le site n'en a pas besoin.

## Commandes

```bash
npm install       # installer les dépendances
npm run dev       # serveur de dev (http://localhost:5173)
npm run build     # typecheck (tsc -b) + build de production dans dist/
npm run preview   # servir le build de production
npm run lint      # ESLint
```

Toujours lancer `npm run build` et `npm run lint` avant de considérer une tâche terminée.

## Structure

```
src/
  main.tsx               # point d'entrée
  App.tsx                # assemblage des sections
  data/profile.ts        # données communes (identité, liens, médias des projets) + types `Content`, `Locale`
  data/locales/          # textes traduits : fr.ts, en.ts (un objet `Content` par langue)
  i18n/                  # LanguageProvider + useLanguage (langue courante, contenu traduit)
  hooks/                 # useTheme, useActiveSection
  styles/
    tokens.css           # couleurs, typo, espacements, ombres (light + dark)
    global.css           # reset, base, utilitaires (.container, .section)
  components/
    ui/                  # primitives réutilisables (Button, SectionHeading, BrandIcons)
    Navbar/ Hero/ About/ Services/ Skills/ Projects/ Testimonials/ Contact/ Footer/
public/images/           # photo de profil, visuels de projets
design-reference.jpg     # maquette de référence (voir "Design")
```

Chaque section = un dossier `NomSection/` avec `NomSection.tsx` + `NomSection.module.css`.

## Conventions

- Composants fonctionnels, export nommé (`export function Hero()`), un composant par fichier.
- **Le contenu ne vit jamais dans les composants** : les données communes sont dans `src/data/profile.ts`, les textes dans `src/data/locales/<langue>.ts`, lus via `useLanguage().content`. Modifier un texte = le modifier dans **chaque** fichier de langue (le type `Content` impose la même structure partout).
- **Langues** : anglais (défaut) et français, choisies via le menu à drapeaux de la navbar (`ui/LanguageSelect`, drapeaux SVG dans `ui/Flags`). Langue initiale : `?lang=en|fr` > choix mémorisé (`localStorage`) > anglais. Le provider synchronise `<html lang>`, le titre et la meta description. Les ids de section (`#a-propos`…) ne sont pas traduits.
- Les styles utilisent exclusivement les tokens (`var(--color-accent)`, `var(--space-6)`…). Pas de couleur ou taille en dur dans un `.module.css`.
- HTML sémantique : `<header>`, `<nav>`, `<main>`, `<section id="…" aria-labelledby="…">`, `<footer>`.
- Accessibilité : contraste AA, `alt` pertinent, focus visible, navigation clavier, `prefers-reduced-motion` respecté.
- Responsive mobile-first ; points de rupture : 640px, 900px, 1200px.
- Pas de `any`, pas de `// @ts-ignore`.
- Images : `loading="lazy"` sauf l'image du hero ; dimensions explicites pour éviter le CLS.

## Design

Reproduction de la maquette `design-reference.jpg` (inspiration Pinterest, portfolio « Alex Morgan »), adaptée à un développeur React.

**Ambiance** : élégante, minimaliste, chaleureuse. Fond crème, accents dorés, beaucoup d'espace blanc, titres serif raffinés.

**Palette** (définie dans `tokens.css`) :
| Token | Valeur | Usage |
|---|---|---|
| `--color-bg` | `#FBF8F4` | fond principal |
| `--color-bg-alt` | `#F4EEE6` | sections alternées (About, Skills, Contact) |
| `--color-surface` | `#FFFFFF` | cartes |
| `--color-accent` | `#C29A5B` | or : boutons, labels, barres, icônes |
| `--color-accent-soft` | `#EADBC4` | fonds d'icônes, cercle du hero |
| `--color-text` | `#2B2622` | titres |
| `--color-text-muted` | `#7A716A` | paragraphes |
| `--color-border` | `#ECE3D8` | bordures fines |

Un thème sombre existe (bouton lune dans la navbar) : mêmes tokens, redéfinis sous `[data-theme="dark"]`.

**Typographie** : titres en `Playfair Display` (400/500), texte en `Inter`, signature en `Great Vibes`. Labels de section en majuscules, petits, dorés, espacés (`letter-spacing: .2em`).

**Ordre des sections** (fidèle à la maquette) :
1. **Navbar** — logo monogramme + nom, liens (Accueil, À propos, Services, Projets, Témoignages, Contact) avec soulignement doré sur le lien actif, bouton contour « Parlons-en », toggle thème.
2. **Hero** — « BONJOUR, JE SUIS », nom en grand serif, accroche, bouton plein doré « Voir mes projets » + bouton « Télécharger mon CV » (PDF selon la langue, dans `public/`) ; réseaux sociaux en colonne verticale à gauche ; photo dans un grand cercle doré à droite ; badge flottant « 8+ ans d'expérience ».
3. **About** — image à gauche avec cadre décalé doré, titre + texte + signature manuscrite au centre, 3 stats à droite (projets, clients, années).
4. **Services** — « Ce que je peux faire pour vous », 4 cartes (icône dans cercle, titre, description) avec liseré doré en bas.
5. **Skills & Experience** — deux colonnes : barres de progression dorées avec pourcentage / timeline verticale avec points dorés.
6. **Projects** — « Une sélection de mes réalisations », 3 cartes image + titre + catégorie + flèche.
7. **Testimonials** — 3 cartes avec guillemet doré, citation, avatar, nom, poste.
8. **Contact** — « Un projet en tête ? », formulaire (nom, email, type de projet, message, bouton « Envoyer »), coordonnées avec icônes.
9. **Footer** — logo + baseline + réseaux, colonnes Liens rapides / Services / Contact / Newsletter, copyright.

Éléments décoratifs : formes géométriques dorées discrètes (losanges, lignes diagonales, trames de points) en `position: absolute`, `aria-hidden`, masquées sur mobile si elles gênent.

## Contenu

Le propriétaire est **développeur senior React**. Le contenu met en avant : architecture front-end, React / TypeScript / Next.js, performance web, design systems, tests, mentorat et lead technique. Les textes sont en **français** et en **anglais**.

Les placeholders de `profile.ts` et des fichiers de langue (`Votre Nom`, valeurs entre crochets comme `[Entreprise]`, email, téléphone, liens sociaux) sont à remplacer. Les images manquantes affichent un placeholder stylé — déposer les vraies images dans `public/images/` avec les noms attendus par `profile.ts`.
