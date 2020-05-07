import { Repository } from "../building-blocks";
import { Person } from "./person";
import { PersonId } from "./personId";

/**
 * Ici, libre à nous d'ajouter les méthodes nécessaires à la couche applicative
 * pour la partie commande. Pour la lecture, direction le UseCase de lecture
 * d'exemple.
 */
export interface PersonRepository extends Repository<Person> {
  /**
   * Ici on utilise les objets valeurs pour être clair sur ce qui est attendu
   * par le service.
   */
  getById(id: PersonId): Person;
}
