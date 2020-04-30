import { ValueObject } from "./valueobject";

export abstract class Entity<TIdentity extends ValueObject<any, any>> {
  get id() {
    return this.identity;
  }

  constructor(private identity: TIdentity) {}

  equals(other: Entity<TIdentity>): boolean {
    return other.id.equals(this.id);
  }
}
