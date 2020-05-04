/**
 * Dans ce domaine d'exemple, il n'existe pas d'autres répertoires dans `domain/`
 * mais il est tout à fait possible que ce soit le cas dans un vrai projet. Il
 * s'agit de séparer selon les contextes bornés identifiés dans le domaine, les
 * différents éléments qui les composent.
 */

import { AggregateRoot } from "../building-blocks";
import { PersonId } from "./personId";
import { SecuritySocialNumber } from "./securitySocialNumber";

/**
 * Ici, l'entité Person est aussi un aggrégat racine car il représente une cohérence
 * transactionnelle qui doit être garantie.
 *
 * Cela signifie que cette entité possèdera un Repository associé permettant de
 * sauvegarder et de sortir cette entité métier de la couche de persistance.
 *
 * Ici, je pourrais tout à fait exposer toutes les propriétés en lecture seule si
 * le besoin s'en fait sentir. La lecture ne permet pas à l'appelant de venir corrompre
 * l'intégrité de l'entité donc il n'y a pas de soucis à le faire.
 */
export class Person extends AggregateRoot<PersonId> {
  /**
   * De la même manière que pour les objets valeurs, une entité doit toujours
   * garantir son intégrité.
   *
   * Ici, je demande un numéro de sécurité sociale valide et un pseudonyme. Comme le
   * pseudonyme ne posède aucune règle particulière, je peux ici garder un simple
   * string.
   *
   * Toutes les propriétés sont privées et ne doivent être exposées qu'en lecture
   * seulement, ceci de manière à éviter qu'un client ou un autre développeur puisse
   * bypasser la cohérence de l'entité.
   *
   * Garder ces propriétés privées et n'exposer que le nécessaire à un autre avantage :
   * celui de véhiculer de l'information. Ici, je ne donne aucun moyen de modifier
   * le numéro de sécurité sociale d'une personne, j'informe donc clairement les
   * autres développeurs que cette opération n'existe pas dans mon métier.
   */
  constructor(
    id: PersonId,
    private ssn: SecuritySocialNumber,
    private nickname: string
  ) {
    super(id);
  }

  /**
   * Chaque propriété étant privée, on passe par des méthodes pour les modifier.
   * Ces méthodes sont importantes parce qu'elles doivent respectées le langage
   * omniprésent défini par le métier.
   *
   * Ici, une personne peut être renommée en fournissant un nouveau pseudonyme.
   */
  rename(nickname: string) {
    this.nickname = nickname;
  }
}
