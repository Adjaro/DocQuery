Askelia est l'assistant interne de l'entrepôt de données de santé du CHU : il répond sur l'entrepôt OMOP, le PMSI, la documentation ETL et les dictionnaires, et il tourne entièrement sur les serveurs de l'hôpital. Ses utilisateurs sont des data engineers, des data managers et des chercheurs. L'interface doit être calme, simple et digne de confiance : un outil de travail, pas une vitrine.

## Principes

- **Une chose à la fois.** Chaque écran a une seule action principale (`.ak-btn-primary`). Tout le reste est un bouton neutre, un lien ou un menu `…`.
- **Moins de cadres.** On sépare par l'espace et par des filets (`border`), pas par des cartes empilées. Une seule carte par zone au maximum.
- **La couleur porte un sens.** L'interface est en neutres (`ink`, `ink-2`, `ink-3` sur `bg` / `surface`). `accent` sert uniquement à l'action principale, à la sélection et au focus. Les couleurs de statut ne s'utilisent qu'en petit point devant un mot.
- **La transparence est discrète, mais toujours là.** Sous chaque réponse factuelle : appels de note numérotés, liste des sources, raisonnement replié, fiabilité en un mot, et une action « Vérifier » concrète (`AnswerMeta`). Pas de jauges, pas de pourcentages de confiance.
- **Rien qui fasse « généré ».** Pas d'avatar de robot, pas d'étincelles ni d'éclairs, pas de dégradés, pas de bordure gauche colorée sur les cartes, pas de formules enthousiastes. L'assistant parle comme une documentation bien écrite.

Références de ton et de structure : la navigation de Linear et Notion, les tableaux du tableau de bord Stripe, les éditeurs SQL de Snowflake et BigQuery, le graphe de lignage de dbt Explorer.

## Rédaction

- Français, vouvoiement, phrases courtes. Sentence case pour les titres et boutons (« Générer la requête », pas « Générer La Requête »).
- Les boutons disent ce qu'ils font : « Exporter en PDF », « Vérifier dans le code dbt ».
- Les noms techniques (`condition_occurrence`, `I50.0`) vont en `.ak-code` ou en mono ; le texte autour reste en français courant.
- Nombres à la française : espace des milliers, virgule décimale (`1 284`, `3,8 %`). Dates : « 17 oct. 2026 » dans les listes, « 17/10/2026 » dans les journaux techniques.
- Les questions de clarification sont de vraies questions (« Que comptez-vous ? »), suivies d'une ligne qui dit pourquoi elles comptent.

## Couleur

- Fond de page et panneaux : `bg` / `surface` (blanc en clair). Barre latérale et zones secondaires : `surface-2`. Survol et sélection neutre : `surface-3`.
- Texte : `ink` pour le contenu, `ink-2` pour le texte secondaire, `ink-3` pour les métadonnées. Les trois atteignent 4,5:1 sur `surface` et `surface-2` dans les deux thèmes.
- Contours : `border` pour les filets ; `border-strong` pour les contrôles et les flèches de lignage (≥ 3:1).
- `accent` (bleu-vert) : bouton principal, option choisie (`accent-soft` + `accent-ink`), lien. Texte posé sur `accent` : `on-accent`.
- Statuts : `success` (validé, indexé), `warning` (à vérifier), `info` (en cours), `danger` (erreur, rejets). Toujours un mot à côté. `warning-soft` sert aux notes « À savoir », une par écran au plus.
- Lignage : `layer-source`, `layer-bronze`, `layer-silver`, `layer-gold` uniquement pour le petit repère de couche d'un nœud.
- SQL : `sql-keyword`, `sql-function`, `sql-string`, `sql-number`, `sql-comment` sur `sql-bg`.
- Thème sombre : mêmes tokens, valeurs redéfinies ; ne jamais coder une couleur en dur.

## Typographie

- IBM Plex Sans pour l'interface, IBM Plex Mono pour le SQL, les noms de tables et les codes.
- `display` pour le titre d'une page d'accueil ou d'un rapport ; `title` pour le titre d'écran ; `heading` pour une section ; `body` pour le texte ; `body-sm` dans les tableaux ; `caption` pour les métadonnées.
- `mono` dans l'éditeur SQL ; `mono-sm` pour un nom de table dans le texte.
- Chiffres tabulaires (`font-variant-numeric: tabular-nums`) dans les tableaux et les chiffres clés.

## Espacement, formes

- Grille de 4px : `space-4` (8px) entre contrôles, `space-6` (16px) dans un panneau, `space-8` (24px) entre colonnes, `space-9` (32px) entre sections.
- Colonnes de lecture : 720–760px pour une conversation ou un formulaire, 880px pour un rapport, 1120px pour un écran de résultats.
- `radius-md` (6px) pour boutons, champs et nœuds ; `radius-lg` (10px) pour l'éditeur SQL et les panneaux ; `radius-pill` pour les suggestions de l'accueil.
- Ombres : `shadow-1` seulement pour les éléments posés sur un fond (nœuds, barre de saisie) ; `shadow-pop` pour les menus.

## Mise en page

- Coque : barre latérale 220px sur `surface-2` (bouton « Nouvelle demande », sept modules, mention « 100 % local » et utilisateur en bas) ; barre supérieure de 48px avec le contexte actif (base, dictionnaires, modèle) en texte cliquable.
- Indicateur permanent : `.ak-local` en bas de la barre latérale — « 100 % local – aucune donnée ne quitte l'hôpital ».
- Pensé pour 1440px et plus ; en tablette, la barre latérale se replie en icônes et les panneaux latéraux passent en plein écran.

## Iconographie

Icônes au trait de 1,5px sur une grille de 24, dessinées pour Askelia (`Askelia.Icon`, `Askelia.iconSvg`). Taille 16px, couleur `ink-3`, `ink` à l'état actif. Une icône accompagne un libellé ; elle ne le remplace que pour les actions universelles (fermer, copier, envoyer, plus d'actions). Pas d'emoji. Aucun logo n'a été fourni : le nom est composé en texte, précédé d'un carré `ink` portant l'initiale.

## Écrans de référence

Les sept maquettes (groupe « Écrans ») utilisent `Askelia.mountShell` pour la coque et les composants de cette bibliothèque : Accueil, Lecture d'un document, Cohorte – précisions, Cohorte – résultat, Dictionnaires, ETL & Lignage, Synthèse du parcours.
