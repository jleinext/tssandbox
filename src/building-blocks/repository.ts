import { AggregateRoot } from "./aggregate";

export interface Repository {
  add(aggregate: AggregateRoot<any>): void;
}
