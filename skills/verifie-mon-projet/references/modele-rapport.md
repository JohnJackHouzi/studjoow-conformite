# Modèle de rapport

Respecte cette structure. Pas de tiret long dans le texte. Chaque constat donne le fichier et la ligne quand il en existe.

```markdown
# Conformité légale : <nom du projet>

Analyse du <date du jour> · Droit by Studjoow · <N> appels au serveur sur <budget>
Textes en vigueur au <date du dernier incrémental si connue, sinon date du jour>, lus dans Légifrance et EUR-Lex.

## Profil retenu

- Activité : ...
- Public : B2C / B2B, mineurs oui/non
- Pays visés : France, UE (couverts) ; <autres pays> (non couverts pour l'instant)
- Traitements repérés : formulaires (`chemin:ligne`), paiement (...), traceurs (...), e-mails (...), IA (...)

## Synthèse

| Statut | Nombre |
|---|---|
| Manquant | n |
| À vérifier | n |
| En règle en apparence | n |

Les 5 priorités :
1. <obligation> : <action concrète dans le code>, `chemin:ligne`
...

## Manquant

### <Intitulé de l'obligation>
- **Constat** : ce que fait le projet, `chemin:ligne`.
- **Texte** : <référence canonique renvoyée par verifier_references> ([lien officiel](...)), version du ... à ce jour.
- **Extrait** : « <extrait copié mot pour mot> » (citation vérifiée)
- **À faire** : action précise et vérifiable.

## À vérifier

### <Intitulé>
- **Pourquoi** : question à trancher, et ce que le code ne montre pas.
- **Texte** : référence ([lien](...)). Extrait si lu, sinon « texte non relu dans cette analyse ».

## En règle en apparence

| Obligation | Preuve dans le projet | Texte |
|---|---|---|
| ... | `chemin:ligne` | [référence](lien) |

## Hors périmètre

- Pays non couverts : ...
- Domaines écartés (détectés à tort) : ...
- Ce que le code ne permet pas de voir : contrats de sous-traitance, registre des traitements, réglages des outils tiers, pratiques réelles.

## Non vérifié faute de quota

(Section présente seulement si le quota a été atteint. Références listées sans lien ni extrait, à ne pas utiliser avant vérification.)

## Sources

Tableau de toutes les références passées par `verifier_references` : référence, statut (OK / INTROUVABLE / ATTENTION), période de version, lien officiel.

---
**Avertissement.** Ce rapport est une information juridique générée à partir du code et des textes officiels en vigueur. Ce n'est pas un conseil d'avocat ni une certification de conformité : il ne voit que le code, pas les contrats ni les pratiques réelles. Pour toute décision, consultez un avocat. Textes lus via Droit by Studjoow (droit.studjoow.com), édité par Studjoow.
```
