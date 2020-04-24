import { ValueObject } from "./valueobject";

describe("the ValueObject base class", function () {
  it("should be", function () {
    class A extends ValueObject<"A", A> {
      public equals(other: A): boolean {
        return other.value === this.value;
      }

      constructor(readonly value: string) {
        super();
      }
    }

    class B extends ValueObject<"B", B> {
      public equals(other: B): boolean {
        return other.value === this.value;
      }

      constructor(readonly value: string) {
        super();
      }
    }
  });
});
