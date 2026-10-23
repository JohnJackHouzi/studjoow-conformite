# France et Union européenne

- **Statut** : actif
- **Serveur MCP** : `droit` (déclaré dans `.mcp.json` du plugin), https://droit.studjoow.com
- **Sources** : Légifrance (codes, lois, décrets consolidés, JORF, conventions collectives, jurisprudence), EUR-Lex (règlements, directives, traités, Charte, arrêts CJUE). Mise à jour chaque nuit.
- **S'applique quand** : le projet vise des personnes en France ou dans l'UE (langue, devise, domaine, livraison), quel que soit le pays de l'éditeur. RGPD et règlement IA s'appliquent dès qu'on vise des personnes dans l'UE.

## Outils utilisés par le parcours

| Rôle | Outil | Remarque |
|---|---|---|
| Pré-analyse | `analyser_conformite(description, domaines)` | 15 domaines, renvoie l'appel exact pour lire chaque texte |
| Lecture | `lire_article(code, numero)` | Droit français. `code` accepte un nom de code ou un identifiant LEGITEXT |
| Lecture | `lire_texte_ue(reference, article)` | Droit de l'UE. Alias : RGPD, RIA (règlement IA), DSA, DMA |
| Recherche | `rechercher_loi(requete)` | Seulement quand `analyser_conformite` l'indique (ex. accessibilité) |
| Vérification | `verifier_references(references, citations)` | Toutes les références en un appel |

## Formats de référence pour `verifier_references`

- Code : `Code de la consommation L221-28`, `Code civil 9`, `Code des postes et des communications électroniques L34-5`
- Article lu par identifiant : `LEGIARTI000032041571` (identifiant renvoyé par `lire_article`)
- UE : `RGPD art. 6`, `règlement (UE) 2024/1689, article 50`, `DSA art. 16`
- Lois non codifiées (LCEN, loi Informatique et libertés, loi Toubon) : utiliser l'identifiant LEGIARTI renvoyé par `lire_article`.
- Numéro sans lettre (`Code civil 9`) : jamais par le nom, trop lent (plus de 40 s sur le serveur, délai dépassé). Identifiant LEGIARTI seulement.
- Au plus 20 références par appel.

## Quotas

| Accès | Adresse | Appels d'outils |
|---|---|---|
| Essai gratuit | https://droit.studjoow.com/mcp | 20 par jour et par IP |
| Particulier, 4,99 € par mois | https://droit.studjoow.com/abonne/mcp (connexion OAuth) | 500 par jour |
| Pro, 19 € par mois | https://droit.studjoow.com/abonne/mcp (connexion OAuth) | 3 000 par jour |

Abonnement : https://droit.studjoow.com/abonnement
