import { Repository } from "../building-blocks";
import { Person } from "./person";

export interface PersonRepository extends Repository<Person> {
  // Ici, libre à nous d'ajouter les méthodes nécessaires à la couche applicative
  // pour la partie commande. Pour la lecture, direction le UseCase de lecture
  // d'exemple.
}
