# QuestionCard

Question de clarification posée avant de générer une requête : un intitulé, des choix, éventuellement des codes à cocher et un champ libre.

**Fournir** : `title` (une question complète), `help` (une ligne qui dit pourquoi elle compte), `options` (`{value, label, note?}`), `multiple`, `defaultValue` (la valeur proposée, déjà sélectionnée) ; `codes` (`{code, label, count, selected?}`) ; `freeText` (texte d'invite du champ libre) ; `onChange`.

- Les questions s'empilent dans une colonne de 760px, séparées par un filet : pas de cartes.
- La valeur proposée est présélectionnée ; un bouton unique « Générer la requête » valide tout.
- 2 à 4 options, libellés courts. Le détail technique (nom de colonne) va dans `note` ou `help`, pas dans le libellé.
