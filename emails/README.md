# Envoi d'emails (contact + newsletter)

Le site est statique : les emails passent par **[EmailJS](https://www.emailjs.com)**, appelé directement depuis le navigateur (`src/lib/email.ts`). Offre gratuite : **200 emails / mois** et **2 modèles**, sans carte bancaire.

Pour tenir dans 2 modèles, les deux formulaires utilisent le même couple de modèles, dont le contenu bascule grâce aux sections conditionnelles d'EmailJS (`{{#is_contact}}…{{/is_contact}}`, `{{#is_newsletter}}…{{/is_newsletter}}`) :

| Modèle EmailJS | Fichier | Destinataire | Contact | Newsletter |
|---|---|---|---|---|
| **NOTIFICATION** | `notification.html` | vous | détail du message + bouton « Répondre » | « Nouvel abonné : … » |
| **AUTO REPLY** (auto-reply de NOTIFICATION) | `auto-reply.html` | le visiteur | accusé de réception + rappel du message | email de bienvenue |

Chaque envoi de formulaire consomme donc **2 emails** du quota.

> Les sections conditionnelles ne fonctionnent pas dans le champ *Subject* (erreur « dynamic variables are corrupted ») : les sujets sont calculés dans `src/lib/email.ts` et transmis via `{{notification_subject}}` / `{{reply_subject}}`.

## Mise en place

1. **Email Services → Add New Service** → Gmail (ou autre), connecter votre boîte. Noter le **Service ID**.
2. **Modèle NOTIFICATION** (`template_067686m`) → *Edit* :
   - onglet *Content* → *Edit Content* → *Code Editor* : coller `notification.html` ;
   - remplir *Subject*, *To Email*, *From Name*, *Reply To* comme indiqué dans le commentaire en tête du fichier ;
   - onglet *Auto-Reply* : sélectionner **AUTO REPLY** ;
   - onglet *Contacts* (facultatif) : activer l'enregistrement avec Contact Email = `{{reply_to}}` pour garder la liste des abonnés et des prospects (export CSV).
3. **Modèle AUTO REPLY** (`template_jn5za39`) → *Edit* : coller `auto-reply.html` et remplir les champs du commentaire (*To Email* = `{{reply_to}}`).
4. **Account → General** : noter la **Public Key**.
5. Compléter `.env.local` (copie de `.env.example`) :

   ```env
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxx
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_067686m
   VITE_SITE_URL=https://votre-domaine.com   # liens des emails ; vide = adresse courante (localhost en dev)
   ```

   En production, définir les mêmes variables dans l'hébergeur (Vercel, Netlify…) : elles sont injectées au build. Redémarrer `npm run dev` après modification.

6. **Sécurité** (Account → Security) : restreindre les domaines autorisés à celui du site et activer la limite de débit. Un champ piège (*honeypot*) filtre déjà les bots basiques côté formulaire.

## Tester

Envoyer le formulaire de contact puis la newsletter depuis `npm run dev` : vous devez recevoir une notification, et l'adresse saisie l'accusé de réception ou le mail de bienvenue. En cas d'échec, l'erreur détaillée s'affiche dans la console du navigateur et dans **Email History**.

## Variables envoyées aux modèles

| Variable | Contact | Newsletter |
|---|---|---|
| `{{site_name}}`, `{{site_url}}`, `{{reply_to}}` | ✓ | ✓ |
| `{{notification_subject}}`, `{{reply_subject}}` | ✓ | ✓ |
| `{{locale}}` (`fr` / `en`), `{{is_fr}}` ou `{{is_en}}` : langue du site au moment de l'envoi | ✓ | ✓ |
| `{{is_contact}}` | ✓ | |
| `{{from_name}}`, `{{from_email}}`, `{{project_type}}`, `{{message}}` | ✓ | |
| `{{is_newsletter}}`, `{{email}}` | | ✓ |

> `{{reply_subject}}` est déjà traduit selon la langue du visiteur. Le corps de `auto-reply.html` reste en français : pour le traduire, encadrer chaque version par `{{#is_fr}}…{{/is_fr}}` et `{{#is_en}}…{{/is_en}}`.
>
> La clé publique EmailJS est faite pour être exposée côté client : ce n'est pas un secret.
>
> Pour envoyer de vraies newsletters à vos abonnés plus tard, exportez les contacts EmailJS vers un outil d'emailing gratuit (Brevo : 300 emails/jour, ou MailerLite).
