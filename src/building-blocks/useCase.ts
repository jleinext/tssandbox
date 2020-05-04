/**
 * Interface simple permettant de représenter un cas d'utilisation.
 *
 * On peut aussi passer par des services applicatifs en les séparant :
 *
 *  CommandApplicationService : permet d'effectuer des modifications dans notre domaine
 *  QueryApplicationService : permet d'effectuer les tâches de lecture
 *
 * Ici, un cas d'utilisation peut tout à fait être l'un ou l'autre et représente
 * simplement une exigence applicative.
 *
 * Dans tous les cas, la couche applicative à la responsabilité de prendre les entrées
 * du système, de les valider et d'orchestrer les différents aggrégats, y compris
 * d'appeler les repository pour persister les changements.
 *
 * On pourrait aussi améliorer les choses avec une classe de résultat. La couche
 * applicative doit dans tous les cas s'adapter aux contraintes de l'équipe mais
 * sa responsabilité reste néanmoins identique.
 */
export interface UseCase<TIn, TOut> {
  /**
   * Exécute le cas d'utilisation.
   */
  execute(command: TIn): TOut;
}
