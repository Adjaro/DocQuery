# LineageNode

Nœud de lignage : une table à une étape du flux, avec sa couche, son nom et son volume.

**Fournir** : `layer` (`source`, `bronze`, `silver`, `gold`), `label` (système ou schéma, sinon le nom de la couche), `name` (nom de table, en mono), `rows` (volume formaté), `warn` (contrôle qualité à surveiller), `selected` + `onClick`.

- La couche se lit au petit carré coloré (`layer-*`) et aux titres de colonnes du schéma.
- Les flèches sont tracées par l'écran hôte en `border-strong` ; le libellé de la transformation, en quelques mots, est posé sur la flèche. Les rejets sont en pointillé `danger`.
