import { PersonRepository, Person, SecuritySocialNumber } from "../domain";
import { GetPersonsUseCase, PersonDTO } from "../useCases";

/**
 * Petit dépôt en mémoire. Ici il implèmente à la fois le repo et le cas d'utilisation
 * de lecture mais on pourrait tout à fait le découper plus pour éviter de se mélanger
 * les pinceaux.
 */
export class InMemoryPersonRepository
  implements PersonRepository, GetPersonsUseCase {
  constructor(private data: Person[] = []) {}

  add(aggregate: Person): void {
    this.data.push(aggregate);
  }

  save(aggregate: Person): void {
    // Ici, pas besoin puisque quand sorti de l'aggrégat, on manipulera la même
    // instance.
  }

  getBySecuritySocialNumber(ssn: SecuritySocialNumber): Person {
    const person = this.data.find((d) => d["ssn"].equals(ssn));

    if (!person) {
      throw new Error("not_found");
    }

    return person;
  }

  getAll(): PersonDTO[] {
    // Ici, on pourrait utiliser une classe de mapping pour convertir
    // vers le domaine et le DTO. Dans cet exemple simple, je passe directement
    // par la syntax entity["prop"] qui me permet d'ignorer les modificateurs d'accès
    // mais je pourrais aussi exposer en lecture seule les propriétés de l'entité.
    return this.data.map((d) => ({
      id: d.id.value,
      securitySocialNumber: d["ssn"].value,
      nickname: d["nickname"],
    }));
  }

  getBySSN(ssn: string): PersonDTO {
    const data = this.data.find((d) => d["ssn"].value === ssn);

    if (!data) {
      throw new Error("not_found");
    }

    return {
      id: data.id.value,
      securitySocialNumber: data["ssn"].value,
      nickname: data["nickname"],
    };
  }
}
