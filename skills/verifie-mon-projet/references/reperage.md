# Repérage local

Objectif : savoir ce que fait le projet et ce qui existe déjà, avec `chemin:ligne`, sans aucun appel au serveur. Les motifs sont des expressions régulières pour Grep (insensibles à la casse). Adapte-les à la stack trouvée.

## 0. Carte du projet

- `package.json`, `composer.json`, `requirements.txt`, `pyproject.toml`, `Gemfile`, `go.mod` : dépendances, qui révèlent la plupart des prestataires.
- Dossiers de pages : `app/`, `pages/`, `src/routes/`, `templates/`, `wp-content/themes/`, fichiers `.html`.
- Traductions : `messages/`, `locales/`, `i18n/`, `lang/`. Les langues présentes disent quels pays sont visés.
- Fichiers d'exemple d'environnement (`.env.example`, `.env.sample`) : noms des services. Ne lis jamais un vrai `.env` et ne recopie aucune valeur.

## 1. Profil

| Indice | Motifs |
|---|---|
| Langue et pays | `lang="fr"`, `locale`, `fr-FR`, `en-US`, `he-IL`, `hreflang`, `currency`, `EUR`, `€`, `USD`, `ILS` |
| B2C | `panier`, `cart`, `checkout`, `particulier`, `customer` |
| B2B | `siret`, `siren`, `tva_intra`, `vat_number`, `B2B`, `devis`, `quote`, `invoice`, `facture` |
| Mineurs | `enfant`, `child`, `kid`, `mineur`, `parent`, `école`, `school`, `age` |

## 2. Données personnelles

| Indice | Motifs |
|---|---|
| Formulaires | `<form`, `onSubmit`, `useForm`, `type="email"`, `type="tel"`, `name="(email|phone|telephone|address|adresse|birth|naissance)"` |
| Comptes | `signUp`, `signup`, `register`, `inscription`, `auth`, `supabase.auth`, `next-auth`, `clerk`, `firebase/auth` |
| Photos et fichiers | `type="file"`, `upload`, `storage`, `multer`, `S3`, `bucket` |
| Validation | `zod`, `yup`, `required` (ce qui est obligatoire dit ce qui est collecté) |
| Durée de conservation, effacement | `retention`, `conservation`, `purge`, `delete.*account`, `supprimer.*compte`, `anonymi` |
| Prestataires hors UE | `vercel`, `aws`, `amazonaws`, `cloudflare`, `stripe`, `resend`, `sendgrid`, `mailgun`, `postmark`, `hubspot`, `openai`, `anthropic`, `google`, `firebase`, `intercom`, `crisp` |

## 3. Cookies et traceurs

| Indice | Motifs |
|---|---|
| Mesure d'audience, publicité | `gtag`, `googletagmanager`, `GA_MEASUREMENT_ID`, `G-[A-Z0-9]{6,}`, `fbq\(`, `connect.facebook.net`, `tiktok`, `linkedin.*insight`, `hotjar`, `clarity.ms`, `posthog`, `mixpanel`, `segment`, `amplitude`, `matomo`, `plausible`, `umami` |
| Outil de consentement | `tarteaucitron`, `axeptio`, `didomi`, `cookiebot`, `onetrust`, `klaro`, `orejime`, `consent`, `consentement`, `cookie-banner`, `gtag\('consent'` |
| Cookies posés par le code | `document.cookie`, `cookies\(\)`, `setCookie`, `Set-Cookie`, `localStorage` |

Point clé : un traceur chargé **sans condition** de consentement (balise dans le layout, script en dur) est un MANQUANT probable. Matomo ou Plausible configurés sans cookie peuvent être exemptés : À VÉRIFIER.

## 4. Vente, paiement, abonnement

| Indice | Motifs |
|---|---|
| Paiement | `stripe`, `checkout`, `paypal`, `mollie`, `lemonsqueezy`, `paddle`, `payplug`, `sumup`, `woocommerce` |
| Abonnement | `subscription`, `mode: 'subscription'`, `recurring`, `abonnement`, `mensuel`, `annuel`, `billing_portal`, `customer_portal`, `résili`, `cancel` |
| Bouton final | `Commander`, `Payer`, `commande avec obligation de paiement`, `Place order`, `Pay` |
| Rétractation | `rétractation`, `retractation`, `withdrawal`, `14 jours`, `L221-28`, `personnalisé` |
| Médiation | `médiateur`, `mediateur`, `mediation`, `médiation`, `cm2c`, `medicys` |
| Prix | `formatPrice`, `TTC`, `HT`, `frais de port`, `livraison`, `shipping` |

## 5. Pages légales

Cherche les routes et fichiers : `mentions-legales`, `legal`, `imprint`, `impressum`, `cgv`, `cgu`, `terms`, `conditions`, `confidentialite`, `privacy`, `politique-de-confidentialite`, `cookies`. Ouvre-les et note ce qu'elles contiennent : identité de l'éditeur, hébergeur, directeur de la publication, médiateur, durées de conservation, droits des personnes, prestataires listés. Vérifie qu'elles sont liées depuis le pied de page (`footer`).

## 6. E-mails

| Indice | Motifs |
|---|---|
| Transactionnels | `resend`, `sendgrid`, `mailgun`, `postmark`, `nodemailer`, `ses`, `brevo`, `sendinblue` |
| Marketing | `newsletter`, `mailchimp`, `brevo`, `klaviyo`, `campaign`, `relance`, `abandoned`, `panier abandonné` |
| Consentement et désinscription | `opt-in`, `optin`, `consent`, `unsubscribe`, `désinscri`, `desinscri`, `List-Unsubscribe` |

## 7. Intelligence artificielle

| Indice | Motifs |
|---|---|
| Fournisseurs | `openai`, `@anthropic-ai`, `anthropic`, `@ai-sdk`, `mistral`, `gemini`, `@google/genai`, `replicate`, `fal.ai`, `stability`, `elevenlabs`, `heygen`, `deepl`, `huggingface` |
| Usage | `chat`, `assistant`, `completion`, `generate`, `image`, `tts`, `embedding`, `moderation` |
| Transparence | `généré par`, `genere par`, `intelligence artificielle`, `IA`, `AI-generated`, `assistant virtuel`, `c2pa`, `watermark` |

Note pour chaque usage : l'utilisateur dialogue-t-il avec l'IA ? L'IA produit-elle des images, sons, vidéos ou textes publiés ? Décide-t-elle de quelque chose d'important sur une personne (emploi, crédit, éducation) ?

## 8. Contenus des utilisateurs

`comment`, `review`, `avis`, `post`, `forum`, `message`, `report`, `signaler`, `moderation`. Si des utilisateurs publient des contenus visibles par d'autres, note s'il existe un bouton de signalement et des règles de modération.

## 9. Accessibilité et langue

Langue des pages (`lang=`), textes en dur en anglais sur un site français, présence d'une page ou mention « accessibilité ». Indices seulement.
