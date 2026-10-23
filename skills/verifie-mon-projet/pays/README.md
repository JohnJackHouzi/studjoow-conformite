# Pays

Un pays = un serveur MCP qui lit les textes officiels de ce pays + une fiche ici.

| Fiche | Statut | Serveur |
|---|---|---|
| `fr-ue.md` | actif | droit.studjoow.com |
| `il.md` | à venir | mishpat.studjoow.com |
| `us.md` | à venir | à définir |

## Ajouter un pays

1. Le serveur doit fournir au minimum : une pré-analyse (équivalent de `analyser_conformite`), la lecture d'un article, et `verifier_references` (référence + extrait mot pour mot).
2. Déclarer le serveur dans `.mcp.json` à la racine du plugin, sous un nom court (ex. `mishpat`).
3. Ajouter ses outils dans `allowed-tools` du skill (`mcp__plugin_studjoow-conformite_<nom>__<outil>`).
4. Remplir la fiche sur le modèle de `fr-ue.md` et passer son statut à « actif ».
5. Tester sur un projet qui vise ce pays avant de publier.
