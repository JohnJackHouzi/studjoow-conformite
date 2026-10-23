<p align="center">
  <img src="https://img.shields.io/badge/Droit%20by%20Studjoow-conformit%C3%A9%20sourc%C3%A9e-b1338a?style=for-the-badge" alt="Droit by Studjoow">
  <img src="https://img.shields.io/badge/L%C3%A9gifrance%20%2B%20EUR--Lex-textes%20en%20vigueur-040e30?style=for-the-badge" alt="Légifrance et EUR-Lex">
  <img src="https://img.shields.io/badge/licence-MIT-e0539f?style=for-the-badge" alt="MIT">
</p>

# Vérifie mon projet

**Un rapport de conformité légale de votre code, où chaque obligation cite l'article de loi en vigueur, lu et vérifié dans la source officielle.**

Une commande dans votre projet. Le plugin lit le code (formulaires, cookies et traceurs, analytics, paiement, abonnements, e-mails, IA, pages légales), en déduit votre profil, interroge le serveur [Droit by Studjoow](https://droit.studjoow.com) qui lit les textes dans Légifrance et EUR-Lex, et vous rend :

- ce qui **manque**, avec le fichier et la ligne concernés ;
- ce qui est **à vérifier** hors du code (contrats, registre, réglages d'outils tiers) ;
- ce qui est **en règle en apparence**, avec la preuve dans le code ;
- pour chaque point : l'article, un extrait copié mot pour mot du texte officiel, et le lien Légifrance ou EUR-Lex.

## Pourquoi c'est différent

Les scanners de conformité existants s'appuient sur des listes de contrôle et sur la mémoire d'un modèle de langage. Un article abrogé, renuméroté ou inventé passe inaperçu.

Ici, **rien n'est cité de mémoire** :

| | Scanners à listes de contrôle | Vérifie mon projet |
|---|---|---|
| Source des obligations | Liste figée, mémoire du modèle | Texte officiel en vigueur, mis à jour chaque nuit |
| Citation | Résumé ou paraphrase | Extrait mot pour mot, contrôlé dans la base officielle |
| Article abrogé ou inexistant | Non détecté | Signalé (« INTROUVABLE », « non en vigueur ») |
| Lien vers la source | Rare | Légifrance ou EUR-Lex pour chaque référence |
| Preuve dans le code | Variable | `fichier:ligne` pour chaque constat |

## Installation (une commande)

```bash
claude plugin marketplace add JohnJackHouzi/<depot> && claude plugin install studjoow-conformite@studjoow
```

Ou depuis Claude Code :

```
/plugin marketplace add JohnJackHouzi/<depot>
/plugin install studjoow-conformite@studjoow
```

## Utilisation

Dans votre projet, lancez Claude Code puis :

```
/studjoow-conformite:verifie-mon-projet
```

Vous pouvez cibler une partie : `/studjoow-conformite:verifie-mon-projet cookies` ou `/studjoow-conformite:verifie-mon-projet src/app/checkout`. Le plugin se déclenche aussi quand vous demandez « mon site est-il conforme ? ».

Le plugin **ne modifie rien** : il lit, cherche et rapporte. Il propose ensuite d'enregistrer le rapport dans un fichier.

Exemples de rapports : [exemples/](exemples/).

## Essai gratuit et abonnement

| Accès | Adresse du serveur | Appels par jour |
|---|---|---|
| Essai gratuit (par défaut) | `https://droit.studjoow.com/mcp` | 20 |
| Particulier, 4,99 € par mois | `https://droit.studjoow.com/abonne/mcp` | 500 |
| Pro, 19 € par mois | `https://droit.studjoow.com/abonne/mcp` | 3 000 |

Avec l'essai, une analyse tient dans le quota : un appel de pré-analyse, une quinzaine de lectures d'articles choisies par priorité (ce qui manque d'abord), deux appels pour vérifier toutes les références. Si le quota du jour est atteint, le rapport le dit, ne présente aucune référence non vérifiée comme vérifiée, et indique comment continuer.

**Passer à l'abonnement** ([s'abonner](https://droit.studjoow.com/abonnement)) :

```bash
claude plugin install studjoow-conformite@studjoow --config adresse_serveur=https://droit.studjoow.com/abonne/mcp
```

(ou `/plugin`, onglet du plugin, « Configure »), puis dans Claude Code tapez `/mcp`, choisissez `plugin:studjoow-conformite:droit` et connectez-vous avec l'e-mail de votre abonnement (code à 6 chiffres). Préférez cette connexion à l'adresse personnelle `/mcp/<clé>`, qui serait enregistrée en clair dans vos réglages.

## Pays couverts

| Pays | Statut | Source |
|---|---|---|
| France et Union européenne | disponible | droit.studjoow.com (Légifrance, EUR-Lex) |
| Israël | à venir | mishpat.studjoow.com |
| États-Unis | à venir | droit fédéral et lois des États sur la vie privée et l'IA |

Un pays = un serveur qui lit ses textes officiels + une fiche dans [`skills/verifie-mon-projet/pays/`](skills/verifie-mon-projet/pays/). Pour un pays non couvert, le rapport le signale et n'affirme rien.

## Domaines contrôlés (France et UE)

Mentions légales (LCEN), emploi du français, accessibilité, RGPD (principes, base légale, information, sous-traitants, registre, sécurité, violations, mineurs, transferts hors UE), cookies et traceurs, vente à distance (information, prix, bouton de commande, rétractation, médiation), produits personnalisés, abonnements et résiliation en ligne, livraison et garantie de conformité, prix unique du livre, prospection par e-mail, règlement européen sur l'IA (pratiques interdites, transparence, maîtrise de l'IA, haut risque), contenus des utilisateurs (DSA), droit à l'image et droit d'auteur, factures et délais de paiement entre professionnels.

## Avertissement

Ce plugin produit une **information juridique**, pas un conseil d'avocat ni une certification de conformité. Il ne voit que le code : pas vos contrats, votre registre des traitements ni vos pratiques réelles. Pour toute décision, consultez un avocat.

## Éditeur

[Studjoow](https://studjoow.com). Serveur : [droit.studjoow.com](https://droit.studjoow.com). Licence MIT.
