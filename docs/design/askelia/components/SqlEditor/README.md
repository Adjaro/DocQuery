# SqlEditor

Éditeur SQL en lecture : coloration, numéros de ligne, et une explication en français avant chaque étape (CTE).

**Fournir** : `sql`, `title` (nom de fichier), `dialect`, `blocks` (`{line, name, explain}`, `line` = ligne du commentaire qui ouvre l'étape), `explain` (explications visibles au départ), `height`.

- Chaque étape commence par un commentaire `-- n. Titre` dans le SQL, pour survivre au copier-coller.
- L'explication décrit l'intention (« garde le premier séjour… »), pas la syntaxe.
