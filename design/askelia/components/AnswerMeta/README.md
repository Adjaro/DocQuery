# AnswerMeta

Pied de réponse : ce qui rend une réponse de l'assistant vérifiable, en une ligne discrète.

**Fournir** : `sources` (nombre), `steps` (étapes du raisonnement, repliées par défaut), `reliability` (« élevée », « moyenne — raison »), `verifyLabel` (action de vérification concrète : « Vérifier dans le code dbt »).

- Toujours sous une réponse factuelle. Le raisonnement reste replié ; on ne l'ouvre pas par défaut.
- La fiabilité est un mot, pas une jauge. Si elle est moyenne ou faible, dire pourquoi en quelques mots.
