// class ContactInformation {
//   private email: string; // L'email est une simple chaîne de caractères
//   private phone: string; // Idem pour le téléphone

//   constructor(email: string, phone: string) {
//     // Vérification que l'email et le téléphone sont OK
//     // et assignation.
//     // La validation est donc la responsabilité des informations de contact ici.
//   }
// }

// function doSomething(email: string, phone: string) {
//   // Ici, il est très facile de se tromper en passant les mauvaises
//   // informations et en inversant l'email et le téléphone et on se base uniquement
//   // sur le nom des paramètres -> implicite
// }

// abstract class ValueObject<TBrand extends string, TClass> {
//   // La propriété ci-après permet de simuler le typage nominal au sein de TS.
//   // Par défaut, 2 objets possédant les mêmes propriétés sont considérés valides
//   // par le compilateur TS alors que dans notre métier, c'est très probablement
//   // faux.
//   private __brand!: TBrand;

//   public abstract Equals(other: TClass): boolean;
// }

// class Email extends ValueObject<"Email", Email> {
//   // La déclaration ici du readonly signifie que l'objet est bien immutable et le
//   // fait de le mettre dans le constructeur revient à déclarer une propriété du
//   // même nom sur la classe Email.
//   constructor(readonly value: string) {
//     super();

//     if (value === "") {
//       // Ici on vérifierai avec une regexp en vérité...
//       throw new Error("invalid email value");
//     }

//     // Si un Email est instancié, on sait alors que la valeur contenue a été
//     // validé et correspond aux règles métier (à savoir, un email est considéré
//     // valide si ...)
//     this.value = value;
//   }

//   public Equals(other: Email): boolean {
//     return other.value === this.value;
//   }
// }

// class PhoneNumber extends ValueObject<"PhoneNumber", PhoneNumber> {
//   // Même genre d'implémentation que pour l'email avec validation qu'il s'agisse
//   // d'un numéro de téléphone sinon on lève une erreur.
// }

// class ContactInformation {
//   private email: Email; // Ici le champ Email est réellement un email, impossible de se tromper
//   private phone: PhoneNumber; // Idem pour le numéro de téléphone

//   constructor(email: Email, phone: PhoneNumber) {
//     // Ici, si on obtient des objets valeurs c'est qu'ils sont forcément valide
//     // car sinon une erreur aurait été levée plus tôt.
//   }
// }

// function doSomething(email: Email, phone: PhoneNumber) {
//   // Ici, impossible de se tromper, le typage nous assure que les bonnes informations
//   // devront être passées en paramètres.
// }
