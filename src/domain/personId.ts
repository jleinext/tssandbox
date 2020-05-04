import { ValueObject } from "../building-blocks";

/**
 * Chaque identité d'entité est représenté sous forme d'un objet-valeur afin
 * de pouvoir exprimer clairement les paramètres dans d'autres parties du domaine.
 *
 * Cela signifie que plutôt que d'avoir un appel comme ceci :
 *
 *    function engagePerson(person: string) {}
 *
 * On puisse avoir quelque chose de plus expressif comme ceci :
 *
 *    function engage(person: PersonId) {}
 *
 * De cette manière, il est impossible qu'un développeur passe autre chose que
 * l'identité d'une personne.
 */
export class PersonId extends ValueObject<"PersonId", PersonId> {
  constructor(readonly value: string) {
    super();
  }

  public equals(other: PersonId): boolean {
    return other.value === this.value;
  }
}
