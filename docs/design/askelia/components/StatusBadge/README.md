# StatusBadge

Statut : un point coloré suivi d'un mot. Jamais une couleur seule, jamais une pastille remplie.

**Fournir** : `status` (`valide`, `verifier`, `encours`, `erreur`, `neutre`) ; `children` pour un libellé précis (« Indexé », « 14 lignes invalides »).

- `valide` : indexé, contrôle passé. `verifier` : à relire par un humain. `encours` : traitement en cours. `erreur` : échec ; seul ce statut colore aussi le texte.
- Dans un tableau, préférer un libellé factuel (« Indexation 62 % ») au libellé générique.
