import { UseCase } from "../building-blocks";
import { PersonRepository, PersonId } from "../domain";

export interface RenamePersonCommand {
  id: string;
  nickname: string;
}

/**
 * Implémente le cas d'utilisation permettant de renommer une personne.
 * Pour les explications, vous référer au cas d'utilisation createPerson.
 */
export class RenamePersonUseCase implements UseCase<RenamePersonCommand, void> {
  constructor(private readonly repository: PersonRepository) {}

  execute(command: RenamePersonCommand): void {
    if (!command.id || !command.nickname) {
      throw new Error("Commande invalide !");
    }

    // On sort notre aggrégat du repo
    const person = this.repository.getById(new PersonId(command.id));

    // On appelle des méthodes métier
    person.rename(command.nickname);

    // Et enfin on persiste notre aggrégat ainsi modifié.
    this.repository.save(person);
  }
}
