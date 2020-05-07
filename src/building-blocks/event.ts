import { AggregateRoot } from "./aggregate";

/**
 * Interface permettant de représenter un événement du domaine.
 */
export interface DomainEvent {}

/**
 * Représente un service capable de dispatcher des événements contenus
 * dans un aggrégat.
 */
export interface EventDispatcher {
  dispatch(aggregate: AggregateRoot<any>): void;
}
