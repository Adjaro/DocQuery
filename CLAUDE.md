# CLAUDE.md

Ce fichier guide Claude Code (et tout développeur) qui travaille dans ce dépôt.

## Le projet

**Askelia** (nom provisoire ; dépôt `DocQuery`) est une plateforme web interne : un assistant IA qui tourne **100 % en local** pour l'entrepôt de données de santé d'un CHU français. Ses utilisateurs sont des data engineers, des data managers et des chercheurs.

L'assistant s'appuie sur un LLM local et sur les données de l'hôpital :
- l'entrepôt **OMOP CDM v5.4** (base PostgreSQL) ;
- les données **PMSI** ;
- la **documentation ETL** (specs, modèles dbt, journaux de chargement) ;
- les **dictionnaires** : dictionnaires de données, vocabulaires (CIM-10, CCAM, SNOMED), tables de mapping, glossaire métier, schémas de bases.

Il comporte cinq modules :
1. **Documents** : lecture rapide, résumé structuré, questions avec citations des passages.
2. **Cohortes & SQL** (module central) : description d'une cohorte en langage naturel, questions de clarification, puis SQL commenté, entonnoir de cohorte et bibliothèque versionnée.
3. **Dictionnaires** : la « mémoire » de l'assistant ; gestion, indexation, recherche transversale.
4. **ETL & Lignage** : questions sur la documentation ETL et schéma de lignage source → bronze → silver → gold/OMOP.
5. **Synthèses** : rapport du parcours d'une donnée, lisible par un non-technicien et exportable en PDF.

## État du dépôt

Pour l'instant, le dépôt ne contient que la **documentation de conception** ; aucun code applicatif n'a encore été écrit. La pile technique (front, back, LLM, indexation) reste à choisir : ne pas la supposer, la demander ou la proposer explicitement.

```
docs/
  design/
    README.md          Point d'entrée : principes, composants, 7 écrans avec captures
    askelia/           Design system : guide de style, tokens, composants, maquettes
    captures/          Captures PNG des écrans (1440 px)
```

## Règles non négociables

- **Aucune donnée ne quitte l'hôpital.** Pas d'appel à une API externe (LLM, télémétrie, CDN pour les données, polices incluses en production), pas de dépendance qui envoie des données au dehors. Tout composant doit pouvoir fonctionner sans accès Internet.
- **Données de santé.** Ne jamais mettre de données patient réelles dans le dépôt, les tests, les exemples ou les journaux. Les exemples restent fictifs. Les identifiants patients affichés sont pseudonymisés.
- **Transparence de l'IA.** Toute réponse factuelle cite ses sources (passage, table, fichier) et peut être vérifiée. Le SQL généré est commenté étape par étape.

## Interface

- Toute l'interface est **en français**, au vouvoiement. Nombres à la française : `1 284`, `3,8 %`.
- La référence visuelle est `docs/design/` : lire `docs/design/README.md`, puis `docs/design/askelia/README.md` (guide de style) avant toute modification d'interface.
- Utiliser les tokens de `docs/design/askelia/tokens.json` (thèmes clair et sombre). Ne jamais coder une couleur en dur.
- Style sobre, inspiré des outils professionnels établis : une seule action principale par écran, peu de cadres, la couleur réservée au sens. À proscrire : avatars de robot, icônes étincelle ou éclair, dégradés, jauges de confiance, bordures gauches colorées sur les cartes.
- Cible : écrans de 1440 px et plus, avec une version tablette.

## SQL et données

- Dialecte par défaut : PostgreSQL. Tables OMOP qualifiées par leur schéma (`omop.condition_occurrence`).
- Requêtes de cohorte en CTE nommées, chacune précédée d'un commentaire `-- n. Intention`.
- Codes médicaux : CIM-10 et CCAM en source, concepts standard OMOP via la relation `Maps to`.

## Git

- Les commits et les pushes sont **uniquement au nom de l'auteur du dépôt** (`adjaro <adjaropatoussi@gmail.com>`). Ne pas ajouter de ligne `Co-Authored-By`, de lien de session ni aucune mention de Claude dans les messages de commit, les branches ou les descriptions de PR.
- Messages de commit en français, à l'impératif, courts et descriptifs.
- Ne pas créer de pull request sans demande explicite.
