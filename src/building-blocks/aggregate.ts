import { Entity } from "./entity";
import { ValueObject } from "./valueobject";
import { DomainEvent } from "./event";

export abstract class AggregateRoot<
  TIdentity extends ValueObject<any, any>
> extends Entity<TIdentity> {
  private _events: DomainEvent[];

  protected constructor(id: TIdentity) {
    super(id);
    this._events = [];
  }

  /**
   * Retourne le premier évenement du domaine pour dispatch. L'élément récupérant
   * cet évènement est alors l'unique responsable du dispatch car l'aggrégat ne le
   * possèdera plus.
   */
  public popEvent(): DomainEvent | undefined {
    return this._events.shift();
  }

  /**
   * Informe qu'un événement s'est produit dans l'aggrégat. Il devra être levé lorsque
   * la transaction (au niveau de la couche infra généralement) a correctement persisté
   * l'aggrégat.
   */
  protected addEvent(event: DomainEvent) {
    this._events.push(event);
  }
}
