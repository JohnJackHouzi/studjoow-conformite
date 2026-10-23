---
name: verifie-mon-projet
description: Vérifie la conformité légale du projet ouvert (site, appli, SaaS, boutique) et produit un rapport où chaque obligation cite l'article de loi en vigueur, vérifié dans la source officielle (Légifrance, EUR-Lex) via le serveur Droit by Studjoow. À utiliser quand on demande « vérifie mon projet », « mon site est-il conforme », « audit RGPD », « cookies », « CGV », « mentions légales », « AI Act », « conformité légale », « GDPR compliance », « legal check ».
argument-hint: "[dossier ou sujet à cibler, ex. src/app ou cookies]"
allowed-tools: Read, Glob, Grep, Bash(git ls-files:*), Bash(git log:*), Bash(git remote -v), mcp__plugin_studjoow-conformite_droit__analyser_conformite, mcp__plugin_studjoow-conformite_droit__verifier_references, mcp__plugin_studjoow-conformite_droit__lire_article, mcp__plugin_studjoow-conformite_droit__lire_texte_ue, mcp__plugin_studjoow-conformite_droit__rechercher_loi, mcp__plugin_studjoow-conformite_droit__etat_base
---

# Vérifie mon projet

Tu produis un rapport de conformité légale du projet ouvert. Ce qui distingue ce rapport d'une liste de contrôle : **chaque obligation est citée depuis le texte officiel en vigueur, lu et vérifié par le serveur Droit by Studjoow** (bases Légifrance et EUR-Lex mises à jour chaque nuit). Rien n'est cité de mémoire.

Cible demandée par l'utilisateur (vide = tout le projet) : $ARGUMENTS

Adresse du serveur configurée : `${user_config.adresse_serveur}`

## Règles absolues

1. **Lecture seule.** Tu ne modifies, ne crées et ne supprimes aucun fichier du projet, tu ne lances ni build, ni installation, ni commit. Tu lis, tu cherches, tu rapportes. Le rapport s'affiche dans la conversation ; tu proposes ensuite de l'enregistrer, sans le faire sans accord.
2. **Aucune citation de mémoire.** Un article, un numéro, une date ou un extrait de loi n'apparaît dans le rapport que s'il vient d'un outil du serveur `droit` dans cette session. Un extrait entre guillemets doit avoir été copié mot pour mot du texte renvoyé par un outil de lecture.
3. **Toute référence citée passe par `verifier_references`.** Une référence INTROUVABLE, une citation ABSENTE ou une ligne « ATTENTION non en vigueur » ne se cite pas comme vérifiée : signale-la telle quelle.
4. **Indice, pas verdict.** Ce que tu vois dans le code est un indice. Sans preuve dans le projet, un point est À VÉRIFIER, jamais CONFORME. Tu ne vois que le code : pas les contrats, pas le registre, pas la configuration des outils tiers.
5. **Pays couverts seulement.** Tu ne traites que les pays dont la fiche dans `${CLAUDE_PLUGIN_ROOT}/skills/verifie-mon-projet/pays/` a le statut « actif ». Pour un pays visé mais non couvert, tu l'écris dans le rapport et tu n'affirmes rien sur son droit.
6. **Information juridique, pas conseil d'avocat.** L'avertissement de la fin du modèle de rapport est obligatoire.
7. Ne recopie jamais dans le rapport une clé, un jeton, un mot de passe, une adresse e-mail, une donnée personnelle ou le chemin d'une console d'administration cachée trouvés dans le code : le rapport peut être partagé. Désigne ces fichiers sans leur chemin secret (ex. « la console d'administration, page satisfaction »).

## Étape 1 : budget d'appels (avant tout appel au serveur)

Chaque appel d'outil du serveur compte. Lis `${CLAUDE_PLUGIN_ROOT}/skills/verifie-mon-projet/pays/fr-ue.md` pour les quotas.

- Adresse se terminant par `/mcp` (essai gratuit) : **budget 18 appels** : 1 pour `analyser_conformite`, au plus 15 lectures, 2 réservés à `verifier_references`. L'utilisateur a peut-être déjà consommé une partie de son quota du jour : c'est pour ça qu'on garde de la marge.
- Adresse `/abonne/mcp` ou adresse personnelle `/mcp/...` : budget 60 appels.
- N'appelle jamais `etat_base`, `lister_codes` ni les outils de jurisprudence dans ce parcours : ils ne servent pas le rapport.
- Annonce le budget à l'utilisateur en une ligne avant de commencer.

**Quota atteint.** Si un outil répond « Quota de l'essai gratuit atteint » ou « Plafond quotidien », tu arrêtes tout appel au serveur. Tu rédiges le rapport avec ce que tu as déjà, tu ranges chaque référence non vérifiée dans la section « Non vérifié faute de quota » sans la présenter comme vérifiée, et tu donnes le lien d'abonnement renvoyé par le message (https://droit.studjoow.com/abonnement).

**Serveur absent.** Si aucun outil `droit` n'est disponible, tu t'arrêtes avant l'étape 3 et tu expliques : `/mcp` pour voir l'état du serveur `plugin:studjoow-conformite:droit`, puis relancer. Tu ne produis aucun rapport de mémoire.

## Étape 2 : repérage local (gratuit, aucun appel serveur)

Suis `${CLAUDE_PLUGIN_ROOT}/skills/verifie-mon-projet/references/reperage.md`. Utilise Grep et Glob, qui ignorent déjà `node_modules`, `.git` et le contenu de `.gitignore`. Sur un gros dépôt, commence par `files_with_matches`, puis lis seulement les lignes utiles.

Note chaque constat sous la forme `chemin:ligne : ce que tu vois`. Tu en tires :

- **Le profil** : activité, B2C ou B2B (ou les deux), pays et langues visés (langue des pages, devise, domaine, adresses), public mineur ou non, secteurs particuliers.
- **Les traitements** : formulaires et données collectées, comptes, cookies et traceurs (et l'outil de consentement s'il existe), paiement et abonnements, e-mails (transactionnels, marketing), IA (fournisseur, ce qu'elle produit, si l'utilisateur dialogue avec elle), contenus publiés par les utilisateurs, téléversement de photos, prestataires hors UE.
- **Les preuves présentes** : pages de mentions légales, CGV/CGU, confidentialité, cookies, médiateur, rétractation, désinscription, mentions IA, résiliation en ligne.

Si le projet ne vise manifestement que des pays non couverts, arrête-toi après ce repérage et dis-le.

## Étape 3 : pré-analyse par le serveur (1 appel)

Rédige une description factuelle du projet (moins de 3 000 caractères) : activité, public, pays, données collectées, paiement, prestataires nommés, usage de l'IA, contenus d'utilisateurs. Utilise des mots simples et précis : le serveur détecte les domaines par mots-clés, un mot hors sujet ajoute des obligations inutiles. N'y mets aucune donnée personnelle ni secret.

Appelle `analyser_conformite(description, domaines)`. Dans `domaines`, force les clés que le repérage justifie et que la description risquerait de rater (clés possibles : site, donnees, transferts, cookies, mineurs, vente, personnalise, abonnement, biens, livre, prospection, ia, contenus, images, b2b).

Le résultat liste des obligations numérotées, chacune avec une question et l'appel exact pour lire le texte (`lire_article(...)` ou `lire_texte_ue(...)`). Ignore un domaine détecté à tort (dis-le en une ligne dans le rapport).

## Étape 4 : classer chaque obligation (gratuit)

Pour chaque obligation retenue, confronte la question au repérage et classe :

- **MANQUANT** : le projet fait la chose qui déclenche l'obligation et rien dans le code n'y répond (ex. Google Analytics chargé sans outil de consentement).
- **À VÉRIFIER** : l'obligation s'applique peut-être, ou la preuve est hors du code (contrat, registre, réglage d'un outil tiers).
- **EN RÈGLE EN APPARENCE** : une preuve précise est dans le code (`chemin:ligne`).

## Étape 5 : lire les textes (selon le budget)

Lance les lectures par lots de 3 au plus, et regarde chaque résultat avant le lot suivant : après un message de quota, plus aucun appel.

Ordre de lecture : MANQUANT d'abord, puis À VÉRIFIER les plus lourds de conséquences, puis EN RÈGLE. Utilise exactement l'appel indiqué par `analyser_conformite`. Arrête de lire quand le budget de lectures est épuisé : les obligations non lues restent dans le rapport avec leur référence (vérifiée à l'étape 6) mais sans extrait, avec la mention « texte non relu dans cette analyse ».

Pour chaque texte lu, copie mot pour mot un extrait court (une phrase, moins de 300 caractères) qui fonde le constat, et note la référence au format que `verifier_references` comprend (voir la fiche pays). **Pour tout article français lu, note son identifiant `LEGIARTI...` renvoyé par `lire_article` : c'est lui que tu vérifieras**, la recherche par identifiant est instantanée.

Un article de loi non codifiée (LCEN, loi Informatique et libertés, loi sur le prix du livre) ne se retrouve pas par le nom de la loi : lis-le pour obtenir son identifiant ; s'il reste non lu, range-le dans « Non vérifié » sans le présenter comme vérifié.

## Étape 6 : vérifier toutes les références (2 appels au plus)

Appelle `verifier_references` avec les références du rapport (au plus 20 par appel) et, au même rang dans `citations`, l'extrait copié (chaîne vide `""` quand il n'y a pas d'extrait). Formats : `LEGIARTI...` pour les articles français lus, `Code de la consommation L221-14` pour un article codifié non lu, `RGPD art. 13` ou `règlement (UE) 2024/1689, article 50` pour l'UE. Reprends dans le rapport le lien officiel et la période de version renvoyés par l'outil.

- Réponse « Délai dépassé » : ne renvoie jamais la même liste. Coupe-la en deux et, si le budget le permet, refais un appel avec la moitié qui porte les extraits. Ce qui n'a pas pu être vérifié va dans « Non vérifié ».
- Référence INTROUVABLE à cause de son format : corrige-la (identifiant LEGIARTI ou CELEX) dans l'appel suivant s'il en reste un, sinon retire la citation et dis-le.

## Étape 7 : le rapport

Suis exactement `${CLAUDE_PLUGIN_ROOT}/skills/verifie-mon-projet/references/modele-rapport.md`. Écris dans la langue de l'utilisateur (français par défaut). Les extraits de loi restent dans leur langue officielle (français).

Ensuite, en une ou deux phrases hors rapport : propose d'enregistrer le rapport dans un fichier (ex. `conformite-AAAA-MM-JJ.md`) et, si l'essai a limité l'analyse, rappelle que l'abonnement permet de lire tous les textes.
