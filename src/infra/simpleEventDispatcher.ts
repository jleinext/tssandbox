import {
  EventDispatcher,
  DomainEvent,
  AggregateRoot,
} from "../building-blocks";

type EventHandler = (evt: DomainEvent) => void;

/**
 * Dispatcher d'événements ultra simples permettant d'abonner des handlers qui
 * écouteront tous les événements du domaine levés par les aggrégats.
 */
export class SimpleEventDispatcher implements EventDispatcher {
  constructor(private handlers: EventHandler[] = []) {}

  /**
   * Abonne un callback listener qui recevra les événements du domaine.
   */
  subscribe(hdl: EventHandler) {
    this.handlers.push(hdl);
  }

  dispatch(aggregate: AggregateRoot<any>): void {
    let evt: DomainEvent | undefined;

    // TODO: pourrait être améliorer ici je pense...
    while ((evt = aggregate.popEvent())) {
      this.handlers.forEach((h) => h(evt!));
    }
  }
}
