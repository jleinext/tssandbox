import { ValueObject } from "../building-blocks";

/**
 * Représente un numéro de sécurité sociale. Comme il s'agit d'un objet valeur,
 * il est immutable (modificateur `readonly`) et égal à un autre si la valeur qu'il
 * contient est égal à la valeur d'un autre numéro de sécurité sociale.
 *
 * Deuxièmement, cette classe permet de s'assurer qu'un numéro de sécurité sociale
 * est toujours conforme et donc d'être sûr que dans le reste du code où il est
 * utilisé il sera inutile de le valider à nouveau. En effet, un objet valeur, si
 * il existe, est toujours valide et comme il est immutable, il est impossible de
 * le modifier pour le rendre invalide.
 */
export class SecuritySocialNumber extends ValueObject<
  "SecuritySocialNumber",
  SecuritySocialNumber
> {
  constructor(readonly value: string) {
    super();

    /**
     * Ici on validerait la valeur du numéro de sécurité sociale et que les
     * règles sont validées et dans le cas contraire, une erreur serait tout simplement
     * levée. Ici, on s'assure juste qu'une valeur est donnée.
     *
     * Autre chose, ici il s'agit de forcer des règles métiers, la validation des
     * entrées utilisateur pour informer l'UI que quelque chose ne va pas se fera
     * plutôt dans la couche applicative mais si jamais une donnée erronnée arrive
     * à se faufiler, on s'assure que l'intégrité de notre domaine n'est pas compromise
     * en ajoutant la validation ici.
     */

    if (!value || value.length !== 15) {
      throw new Error("ssn_invalid_value");
    }
  }

  public equals(other: SecuritySocialNumber): boolean {
    return other.value === this.value;
  }
}
