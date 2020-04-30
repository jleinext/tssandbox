import { Entity } from "./entity";
import { ValueObject } from "./valueobject";

export abstract class AggregateRoot<
  TIdentity extends ValueObject<any, any>
> extends Entity<TIdentity> {}
