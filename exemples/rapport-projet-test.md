# Conformité légale : Coach IA (`coach-ia`)

Analyse du 23 octobre 2026 · Droit by Studjoow · 17 appels au serveur sur 18
Textes en vigueur au 23 octobre 2026, lus dans Légifrance et EUR-Lex.

## Profil retenu

- **Activité** : site Next.js vendant un abonnement mensuel de 9,90 € à un coach sportif conversationnel propulsé par OpenAI (`package.json:8`, `lib/coach.ts:4`).
- **Public** : B2C, consommateurs français (`app/layout.tsx:5` : `lang="fr"`, prix en euros `app/page.tsx:6`). Mineurs : non ciblés explicitement, mais la date de naissance est collectée sans contrôle d'âge (`app/contact/page.tsx:8`).
- **Pays visés** : France, UE (couverts par cette analyse).
- **Traitements repérés** :
  - formulaire collectant prénom, e-mail, téléphone, date de naissance et un champ libre invitant à décrire santé, blessures et poids (`app/contact/page.tsx:4-9`) ;
  - case de consentement marketing **pré-cochée** (`app/contact/page.tsx:10`) ;
  - Google Analytics et pixel Meta chargés sans condition sur toutes les pages (`app/layout.tsx:7-11`) ;
  - abonnement récurrent Stripe Checkout (`app/abonnement/route.ts:6-8`) ;
  - e-mails promotionnels via Resend (`lib/coach.ts:18-20`) ;
  - IA conversationnelle à qui la consigne système interdit de se déclarer IA (`lib/coach.ts:11`) ;
  - prestataires hors UE : OpenAI, Stripe, Resend, Supabase (`package.json:7-10`).
- **Preuves présentes** : aucune. Pas de mentions légales, ni CGV, ni politique de confidentialité, ni page cookies, ni médiateur, ni rétractation, ni résiliation, ni désinscription. Le pied de page ne contient qu'un lien « Contact » (`app/layout.tsx:15-17`).

## Synthèse

| Statut | Nombre |
|---|---|
| Manquant | 11 |
| À vérifier | 17 |
| En règle en apparence | 0 |

**Les 5 priorités :**

1. **Transparence IA** : retirer la consigne « Ne dis jamais que tu es une IA » et afficher que l'interlocuteur est un système d'IA dès la première interaction, `lib/coach.ts:11`.
2. **Traceurs** : conditionner le chargement de Google Analytics et du pixel Meta à un consentement préalable (bannière avec refus aussi simple que l'acceptation), `app/layout.tsx:7-11`.
3. **Données de santé** : retirer l'invitation à décrire santé, blessures et poids du champ libre, ou recueillir un consentement explicite distinct, `app/contact/page.tsx:9`.
4. **Pages légales** : créer mentions légales, politique de confidentialité, CGV avec rétractation et médiateur, et les lier au pied de page, `app/layout.tsx:15-17`.
5. **Abonnement** : décocher la case marketing par défaut (`app/contact/page.tsx:10`) et ouvrir une fonctionnalité de résiliation en ligne gratuite.

## Manquant

### Mentions légales d'identification de l'éditeur

- **Constat** : aucune page de mentions légales dans le projet ; le pied de page ne porte qu'un lien « Contact », `app/layout.tsx:15-17`. Ni identité de l'éditeur, ni directeur de la publication, ni hébergeur.
- **Texte** : LOI n° 2004-575 du 21 juin 2004 (LCEN), art. 1-1 ([lien officiel](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049568614)), version du 23 mai 2024 à ce jour.
- **Extrait** : « Les personnes dont l'activité est d'éditer un service de communication au public en ligne mettent à la disposition du public, dans un standard ouvert » (citation vérifiée)
- **À faire** : créer `app/mentions-legales/page.tsx` avec dénomination, siège, téléphone, numéro RCS, capital, directeur de la publication et coordonnées de l'hébergeur, et la lier au pied de page.

### Traceurs déposés sans consentement

- **Constat** : la balise Google Analytics (`G-TEST123456`) et le pixel Meta sont injectés dans le `<head>` de toutes les pages, sans aucune condition ni outil de recueil du consentement, `app/layout.tsx:7-11`. Aucune occurrence d'un gestionnaire de consentement dans le projet.
- **Texte** : LOI n° 78-17 du 6 janvier 1978, art. 82 ([lien officiel](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037813978)), version du 1er juin 2019 à ce jour.
- **Extrait** : « Ces accès ou inscriptions ne peuvent avoir lieu qu'à condition que l'abonné ou la personne utilisatrice ait exprimé, après avoir reçu cette information, son consentement » (citation vérifiée)
- **À faire** : ne monter les deux `<Script>` qu'après un consentement positif, et prévoir une page cookies décrivant chaque traceur et sa finalité. Ni la mesure d'audience Google ni le pixel publicitaire ne relèvent des exemptions des 1° et 2° du dernier alinéa.

### Dissimulation du caractère artificiel de l'interlocuteur

- **Constat** : la consigne système ordonne au modèle de se faire passer pour un humain : `lib/coach.ts:11` demande de ne jamais révéler qu'il s'agit d'une IA. Le site présente « Max, ton coach » sans aucune mention d'IA, `app/page.tsx:5`.
- **Texte** : Règlement (UE) 2024/1689 (règlement IA), art. 50 ([lien officiel](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R1689)), version consolidée au 27 juillet 2026.
- **Extrait** : « les personnes physiques concernées soient informées qu'elles interagissent avec un système d'IA » (citation vérifiée)
- **À faire** : supprimer l'instruction de dissimulation, afficher une mention claire au plus tard à la première interaction (art. 50, paragraphe 5), et vérifier le marquage lisible par machine des sorties générées (paragraphe 2).

### Prospection par e-mail sans consentement valable

- **Constat** : la case « Recevoir nos offres » est pré-cochée (`defaultChecked`), `app/contact/page.tsx:10`, ce qui n'est pas une manifestation de volonté libre et spécifique. La fonction d'envoi promotionnel ne contient aucun lien de désinscription ni coordonnées de contact, `lib/coach.ts:18-20`.
- **Texte** : Code des postes et des communications électroniques, art. L34-5 ([lien officiel](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042155961)), version du 26 juillet 2020 à ce jour.
- **Extrait** : « qui n'a pas exprimé préalablement son consentement à recevoir des prospections directes par ce moyen » (citation vérifiée)
- **À faire** : retirer `defaultChecked`, journaliser la preuve du consentement, ajouter un lien de désinscription et des coordonnées valables dans chaque e-mail marketing. À noter : une décision du Conseil constitutionnel n° 2026-1210 QPC du 25 juin 2026, mentionnée au Nota de l'article, a déclaré contraires à la Constitution trois alinéas relatifs au cumul de poursuites, avec abrogation reportée au 31 octobre 2027 ; l'interdiction de principe citée ici n'est pas concernée.

### Absence d'information des personnes concernées

- **Constat** : aucune politique de confidentialité, aucune mention d'information près du formulaire, `app/contact/page.tsx:4-12`. Ni finalités, ni base légale, ni destinataires, ni durée, ni droits, ni transferts hors UE.
- **Texte** : RGPD, art. 13 ([lien officiel](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679)), version consolidée au 4 mai 2016.
- **Extrait** : « le responsable du traitement lui fournit, au moment où les données en question sont obtenues, toutes les informations suivantes » (citation vérifiée)
- **À faire** : rédiger une politique de confidentialité couvrant les points a) à f) du paragraphe 1 et a) à f) du paragraphe 2, la lier depuis le formulaire et le pied de page.

### Données de santé collectées sans condition de licéité

- **Constat** : le champ libre invite explicitement la personne à parler de sa santé, de ses blessures et de son poids, `app/contact/page.tsx:9`. Ce sont des données concernant la santé, dont le traitement est interdit par principe hors des cas du paragraphe 2. Aucun consentement explicite distinct n'est recueilli.
- **Texte** : RGPD, art. 9 ([lien officiel](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679)), version consolidée au 4 mai 2016.
- **Extrait** : « la personne concernée a donné son consentement explicite au traitement de ces données à caractère personnel pour une ou plusieurs finalités spécifiques » (citation vérifiée)
- **À faire** : soit retirer l'invitation à décrire la santé, soit recueillir un consentement explicite dédié, distinct de l'acceptation des conditions, et documenter la finalité. Ces données partent aussi vers OpenAI, ce qui renforce l'enjeu.

### Minimisation et durée de conservation

- **Constat** : la date de naissance est collectée sans finalité apparente, `app/contact/page.tsx:8`, le téléphone aussi, `app/contact/page.tsx:7`. Aucune durée de conservation, aucune purge, aucun mécanisme de suppression dans le projet (aucune occurrence de rétention ou d'effacement).
- **Texte** : RGPD, art. 5 ([lien officiel](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679)), version consolidée au 4 mai 2016.
- **Extrait** : « adéquates, pertinentes et limitées à ce qui est nécessaire au regard des finalités pour lesquelles elles sont traitées (minimisation des données) » (citation vérifiée)
- **À faire** : supprimer les champs non nécessaires, fixer une durée par finalité, implémenter la purge et une suppression de compte.

### Information précontractuelle générale

- **Constat** : la page d'offre affiche un titre, une phrase et un prix, `app/page.tsx:4-6`. Aucune caractéristique essentielle détaillée, aucune identité du professionnel, aucune coordonnée, aucune garantie, aucun médiateur avant l'engagement.
- **Texte** : Code de la consommation, art. L111-1 ([lien officiel](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044142438)), version du 1er octobre 2021 à ce jour.
- **Extrait** : « Avant que le consommateur ne soit lié par un contrat à titre onéreux, le professionnel communique au consommateur, de manière lisible et compréhensible, les informations suivantes » (citation vérifiée)
- **À faire** : compléter la page d'offre et créer des CGV couvrant les 1° à 6°.

### Information sur le droit de rétractation et formulaire type

- **Constat** : aucune occurrence de rétractation dans le projet. Le parcours mène directement de `app/page.tsx:6` à la création de session Stripe, `app/abonnement/route.ts:6`.
- **Texte** : Code de la consommation, art. L221-5 ([lien officiel](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053310511)), version du 19 juin 2026 à ce jour.
- **Extrait** : « Lorsque le droit de rétractation existe, les conditions, le délai et les modalités d'exercice de ce droit ainsi que le formulaire type de rétractation » (citation vérifiée)
- **À faire** : fournir avant commande les onze informations du I, dont le formulaire type de rétractation et les modalités de résiliation (4°).

### Coordonnées du médiateur de la consommation

- **Constat** : aucune occurrence de médiateur ou de médiation dans le projet.
- **Texte** : Code de la consommation, art. L616-1 ([lien officiel](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032224762)), version du 1er juillet 2016 à ce jour.
- **Extrait** : « Tout professionnel communique au consommateur, selon des modalités fixées par décret en Conseil d'Etat, les coordonnées du ou des médiateurs compétents dont il relève » (citation vérifiée)
- **À faire** : adhérer à un médiateur de la consommation et publier ses coordonnées sur le site et dans les CGV.

### Résiliation en ligne de l'abonnement

- **Constat** : l'abonnement est souscrit par voie électronique (`mode: "subscription"`, `app/abonnement/route.ts:7`) mais aucune route ni fonctionnalité de résiliation n'existe. Le portail client Stripe n'est pas exposé.
- **Texte** : Code de la consommation, art. L215-1-1 ([lien officiel](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046190107)), version du 1er juin 2023 à ce jour.
- **Extrait** : « le professionnel met à la disposition du consommateur une fonctionnalité gratuite permettant d'accomplir, par voie électronique, la notification et les démarches nécessaires à la résiliation du contrat » (citation vérifiée)
- **À faire** : exposer un parcours de résiliation gratuit, d'accès facile, direct et permanent, et confirmer la réception sur support durable avec la date de fin.

## À vérifier

### Pratique d'IA potentiellement interdite

- **Pourquoi** : la consigne de `lib/coach.ts:11` est une tromperie délibérée sur la nature de l'interlocuteur, dans un contexte où la personne confie sa santé et son poids (`app/contact/page.tsx:9`) et paie un abonnement. Reste à trancher si cela « altère substantiellement le comportement » et cause un « préjudice important » au sens du a) du paragraphe 1, ce que le code seul ne permet pas d'établir. Point à soumettre à un avocat en priorité : la qualification fait passer du manquement à la transparence à l'interdiction pure.
- **Texte** : Règlement (UE) 2024/1689, art. 5 ([lien](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R1689)), version consolidée au 27 juillet 2026.
- **Extrait** : « à des techniques délibérément manipulatrices ou trompeuses, avec pour objectif ou effet d'altérer substantiellement le comportement d'une personne » (citation vérifiée)

### Transferts hors UE

- **Pourquoi** : OpenAI, Stripe, Resend et Supabase apparaissent en dépendances (`package.json:7-10`). Le code ne dit rien du mécanisme de transfert retenu (adéquation, clauses types) ni de la région d'hébergement configurée chez chaque fournisseur.
- **Texte** : RGPD, art. 44 ([lien](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679)).
- **Extrait** : « ne peut avoir lieu que si, sous réserve des autres dispositions du présent règlement, les conditions définies dans le présent chapitre sont respectées » (citation vérifiée)

### Contrats de sous-traitance

- **Pourquoi** : quatre sous-traitants au moins traitent des données pour le compte du projet. Les contrats sont hors du code.
- **Texte** : RGPD, art. 28 ([lien](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679)).
- **Extrait** : « Le traitement par un sous-traitant est régi par un contrat ou un autre acte juridique au titre du droit de l'Union ou du droit d'un État membre » (citation vérifiée)

### Perte du droit de rétractation pour un contenu numérique

- **Pourquoi** : le service est fourni immédiatement après paiement. L'exclusion du 13° suppose un consentement exprès préalable, la reconnaissance de la perte du droit et une confirmation. Rien de tel dans le parcours, `app/abonnement/route.ts:6-12`. À trancher avec le modèle contractuel retenu.
- **Texte** : Code de la consommation, art. L221-28 ([lien](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044563170)).
- **Extrait** : « De fourniture d'un contenu numérique sans support matériel dont l'exécution a commencé avant la fin du délai de rétractation » (citation vérifiée)

### Points dont le texte n'a pas été relu dans cette analyse

Budget de lectures épuisé. Références vérifiées, sans extrait.

| Obligation | Question à trancher | Texte |
|---|---|---|
| Base légale de chaque traitement | Contrat, consentement ou intérêt légitime pour le formulaire, le chat, les e-mails | [RGPD art. 6](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679) |
| Consentement des mineurs | La date de naissance est collectée (`app/contact/page.tsx:8`) sans contrôle d'âge ; le service est-il ouvert aux moins de 15 ans ? | [RGPD art. 8](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679) |
| Registre des traitements | Hors du code | [RGPD art. 30](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679) |
| Sécurité du traitement | Clés en variables d'environnement (`app/abonnement/route.ts:3`, `lib/coach.ts:5`), mais aucune mesure visible sur les accès ou le chiffrement | [RGPD art. 32](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679) |
| Notification de violation | Aucune procédure visible | [RGPD art. 33](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679) |
| Affichage des prix | « 9,90 € par mois » sans mention TTC ni frais, `app/page.tsx:6` | [C. conso. L112-1](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032227331) |
| Bouton de commande | Le bouton final est celui de Stripe Checkout, hors du dépôt : libellé à vérifier en réel | [C. conso. L221-14](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226854) |
| Délai de rétractation de 14 jours | Dépend de l'articulation avec L221-28 ci-dessus | [C. conso. L221-18](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226842) |
| Reconduction tacite | L'abonnement mensuel Stripe se renouvelle ; information annuelle à prévoir | [C. conso. L215-1](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046194176) |
| Exécution avant fin du délai | Demande expresse non recueillie dans le code | [C. conso. L221-25](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044563179) |
| Désignation d'un médiateur | Hors du code | [C. conso. L612-1](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032224805) |
| Maîtrise de l'IA | Niveau de connaissance des personnes qui supervisent le système | [RIA art. 4](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R1689) |
| Classement haut risque | Un coach sportif ne figure pas a priori à l'annexe III, mais la dimension santé mérite l'examen | [RIA art. 6](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R1689) |

## En règle en apparence

Aucune obligation ne présente de preuve suffisante dans le code. Le site est bien rédigé en français avec un prix en euros (`app/layout.tsx:5`, `app/page.tsx:6`), ce qui va dans le sens de l'obligation d'emploi du français, mais je n'ai pas lu ce texte dans cette analyse et ne l'affirme donc pas.

## Hors périmètre

- **Pays non couverts** : aucun. Le projet ne vise que la France et l'UE au vu des indices relevés.
- **Domaines détectés à tort** : « produits personnalisés » a été déclenché par le mot « prénom » ; l'exception de rétractation du 3° de L221-28 (biens nettement personnalisés) ne concerne pas un service numérique. L'accessibilité numérique (décret n° 2019-768) dépend de la taille et du chiffre d'affaires de l'entreprise, que le code ne révèle pas : texte non lu, rien n'est affirmé.
- **Ce que le code ne permet pas de voir** : contrats de sous-traitance, registre des traitements, réglages réels de Stripe, Supabase, Google et Meta, contenu effectif des e-mails envoyés, libellé du bouton de paiement sur Stripe Checkout, pratiques réelles de l'équipe.

## Sources

| Référence | Statut | Version | Lien |
|---|---|---|---|
| LCEN, art. 1-1 (LEGIARTI000049568614) | OK, citation trouvée | du 23/05/2024 à ce jour, VIGUEUR | [Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049568614) |
| Loi n° 78-17, art. 82 (LEGIARTI000037813978) | OK, citation trouvée | du 01/06/2019 à ce jour, VIGUEUR | [Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037813978) |
| CPCE, art. L34-5 (LEGIARTI000042155961) | OK, citation trouvée | du 26/07/2020 à ce jour, VIGUEUR | [Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042155961) |
| C. conso., art. L111-1 (LEGIARTI000044142438) | OK, citation trouvée | du 01/10/2021 à ce jour, VIGUEUR | [Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044142438) |
| C. conso., art. L221-5 (LEGIARTI000053310511) | OK, citation trouvée | du 19/06/2026 à ce jour, VIGUEUR | [Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053310511) |
| C. conso., art. L221-28 (LEGIARTI000044563170) | OK, citation trouvée | du 28/05/2022 à ce jour, VIGUEUR | [Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044563170) |
| C. conso., art. L215-1-1 (LEGIARTI000046190107) | OK, citation trouvée | du 01/06/2023 à ce jour, VIGUEUR | [Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046190107) |
| C. conso., art. L616-1 (LEGIARTI000032224762) | OK, citation trouvée | du 01/07/2016 à ce jour, VIGUEUR | [Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032224762) |
| C. conso., art. L112-1 (LEGIARTI000032227331) | OK, sans citation | du 01/07/2016 à ce jour, VIGUEUR | [Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032227331) |
| C. conso., art. L221-14 (LEGIARTI000032226854) | OK, sans citation | du 01/07/2016 à ce jour, VIGUEUR | [Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226854) |
| C. conso., art. L221-18 (LEGIARTI000032226842) | OK, sans citation | du 01/07/2016 à ce jour, VIGUEUR | [Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226842) |
| C. conso., art. L215-1 (LEGIARTI000046194176) | OK, sans citation | du 18/08/2022 à ce jour, VIGUEUR | [Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046194176) |
| C. conso., art. L221-25 (LEGIARTI000044563179) | OK, sans citation | du 28/05/2022 à ce jour, VIGUEUR | [Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044563179) |
| C. conso., art. L612-1 (LEGIARTI000032224805) | OK, sans citation | du 01/07/2016 à ce jour, VIGUEUR | [Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032224805) |
| RGPD, art. 5 (CELEX 32016R0679) | OK, citation trouvée | consolidée au 04/05/2016 | [EUR-Lex](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679) |
| RGPD, art. 6 | OK, sans citation | consolidée au 04/05/2016 | [EUR-Lex](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679) |
| RGPD, art. 8 | OK, sans citation | consolidée au 04/05/2016 | [EUR-Lex](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679) |
| RGPD, art. 9 | OK, citation trouvée | consolidée au 04/05/2016 | [EUR-Lex](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679) |
| RGPD, art. 13 | OK, citation trouvée | consolidée au 04/05/2016 | [EUR-Lex](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679) |
| RGPD, art. 28 | OK, citation trouvée | consolidée au 04/05/2016 | [EUR-Lex](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679) |
| RGPD, art. 30 | OK, sans citation | consolidée au 04/05/2016 | [EUR-Lex](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679) |
| RGPD, art. 32 | OK, sans citation | consolidée au 04/05/2016 | [EUR-Lex](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679) |
| RGPD, art. 33 | OK, sans citation | consolidée au 04/05/2016 | [EUR-Lex](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679) |
| RGPD, art. 44 | OK, citation trouvée | consolidée au 04/05/2016 | [EUR-Lex](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679) |
| Règlement (UE) 2024/1689, art. 4 (CELEX 32024R1689) | OK, sans citation | consolidée au 27/07/2026 | [EUR-Lex](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R1689) |
| Règlement (UE) 2024/1689, art. 5 | OK, citation trouvée | consolidée au 27/07/2026 | [EUR-Lex](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R1689) |
| Règlement (UE) 2024/1689, art. 6 | OK, sans citation | consolidée au 27/07/2026 | [EUR-Lex](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R1689) |
| Règlement (UE) 2024/1689, art. 50 | OK, citation trouvée | consolidée au 27/07/2026 | [EUR-Lex](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R1689) |

---

**Avertissement.** Ce rapport est une information juridique générée à partir du code et des textes officiels en vigueur. Ce n'est pas un conseil d'avocat ni une certification de conformité : il ne voit que le code, pas les contrats ni les pratiques réelles. Pour toute décision, consultez un avocat. Textes lus via Droit by Studjoow (droit.studjoow.com), édité par Studjoow.
