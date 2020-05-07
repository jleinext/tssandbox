/**
 * En général dans ce genre de fichier, je défini le service ainsi que les types
 * qui entrent et qui sortent du cas d'utilisation mais c'est une histoire de préférence.
 */

import { UseCase } from "../building-blocks";
import {
  PersonRepository,
  Person,
  PersonId,
  SecuritySocialNumber,
} from "../domain";

/**
 * Simple interface permettant de définir la commande attendue par le cas d'utilisation
 * ci-après.
 */
export interface CreatePersonCommand {
  ssn: string;
  nickname: string;
}

/**
 * Crée une nouvelle personne et retourne l'identifiant de la personne ainsi
 * créée.
 */
export class CreatePersonUseCase
  implements UseCase<CreatePersonCommand, string> {
  constructor(private readonly repository: PersonRepository) {}

  execute(command: CreatePersonCommand): string {
    /*
     * Ici, on validerait la commande, le "comment" reste à définir, l'important
     * étant d'informer le client (en général l'IHM) que la commande est mal
     * formulée avant même d'atteindre le domaine.
     *
     * En revanche, si cette validation est oubliée, ce n'est pas grave, notre domaine
     * est tout de même protégé grâce aux règles dans chaque entité et objet-valeur
     * mais si on peut retourner plus tôt pour collecter toutes les erreurs de la commande
     * c'est en général plus agréable pour l'utilisateur :)
     *
     * Pour l'exemple, une simple vérification suffira.
     */
    if (!command.nickname || !command.ssn) {
      throw new Error("Commande invalide !");
    }

    /**
     * Ici, l'identifiant pourrait être issu d'une lib pour générer des GUID si on veut
     * mais dans cette exemple, ce n'est pas très important et on le fixe à la valeur
     * du numéro de sécurité sociale.
     */
    const person = new Person(
      new PersonId(command.ssn),
      new SecuritySocialNumber(command.ssn),
      command.nickname
    );

    /**
     * On ne vérifie pas l'unicité de l'identifiant aussi mais en général, ce sera
     * de la responsabilité de l'infra (via contraintes dans une bdd par exemple).
     */
    this.repository.add(person);

    /**
     * Ici on retourne un type primitif et non un objet-valeur pour limiter la fuite
     * du domaine dans les couches supérieures.
     */
    return person.id.value;
  }
}
