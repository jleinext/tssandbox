import { DomainEvent } from "../building-blocks";
import { PersonId } from "./personId";

/**
 * Il s'agit ici d'un événement du domaine. Il représente un événement métier
 * et désigne une action qui s'est produite au niveau de notre système.
 *
 * Ces événements permettent à plusieurs contextes métier de communiquer entre eux
 * de manière très lâche.
 *
 * Seul les aggrégats sont autorisés à posséder des événements du domaine. Pourquoi ?
 * Et bien tout simplement parce que le système se trouve modifier lors d'un changement
 * d'état, les états sont maintenus par les aggrégats et peu importe la manière par
 * laquelle ce fait ce changement d'état (service A appelle new Person(...), service B
 * appelle aussi new Person(...)) on souhaite que l'événement soit levé pour indiquer
 * justement ce changement d'état peu importe qui a déclenché l'appel.
 */
export class PersonCreated implements DomainEvent {
  /**
   * Ici seul l'identifiant fait partie de l'événement mais on pourrait tout à fait
   * ajouter toute information qui nous semble pertinente.
   */
  constructor(readonly id: PersonId) {}
}
