import { DomainEvent } from "../building-blocks";
import { PersonId } from "./personId";

/**
 * Evénement levé lors du renommage d'une personne.
 */
export class PersonRenamed implements DomainEvent {
  /**
   * Ici on retrouve plus d'informations.
   * Les propriétés sont en lecture seule car on ne peut pas modifier le passé.
   */
  constructor(readonly id: PersonId, readonly nickname: string) {}
}
