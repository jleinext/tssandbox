export abstract class ValueObject<TBrand extends string, TClass> {
  // La propriété ci-après permet de simuler le typage nominal au sein de TS.
  // Par défaut, 2 objets possédant les mêmes propriétés sont considérés valides
  // par le compilateur TS alors que dans notre métier, c'est très probablement
  // faux.
  private __brand!: TBrand;

  public abstract equals(other: TClass): boolean;
}
