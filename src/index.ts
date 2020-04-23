/**
 * Test de quelques objets valeurs très simple.
 */

abstract class ValueObject<TBrand extends string> {
    private __brand!: TBrand; // Brand type to enable sort of nominal typing.

    // public abstract Equals(other: any): boolean;
}

class DisplayName extends ValueObject<'DisplayName'> {
    constructor(readonly value: string) {
        super();
        if (!value) {
            throw Error("value is mandatory");
        }
    }

    public Equals(other: any): boolean {
        if (!(other instanceof DisplayName)) {
            return false;
        }

        return other.value === this.value;
    }
}

class AccessToken extends ValueObject<'Access'> {
    constructor(readonly value: string) {
        super();
    }
}

class RefreshToken extends ValueObject<'Refresh'> {
    constructor(readonly value: string) {
        super();
    }
}

type Toto = string;

const john = new AccessToken('john doe');
const doe = new DisplayName("john doe");

// undefined ?? throw new Error('errar');

Test(new RefreshToken('refresh_token'));

// console.log(WhatsMyName(john), john.Equals(doe));

function Test(token: AccessToken) {

}

function WhatsMyName(name: DisplayName): string {
    return name.value;
}

abstract class Aggregate<TProps> {
    protected constructor(protected props: TProps) {

    }

    public createMemento(): Readonly<TProps> {
        return this.props;
    }

    public static fromMemento<T extends Aggregate<TProps>, TProps>(memento: Readonly<TProps>): T {
        return new Aggregate<TProps>(memento) as T;
    }
}

interface TestProps {
    name: string;
}

class TestEntity extends Aggregate<TestProps> {
    get name() { return this.props.name; }

    constructor(name: string) {
        super({
            name,
        });
    }

    public static fromMemento(memento: Readonly<TestProps>): TestEntity {
        return null;
    }
}

const t = new TestEntity('john doe');

const state = t.createMemento();
TestEntity.fromMemento(state);