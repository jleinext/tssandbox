import { AggregateRoot } from "./aggregate";

/**
 * Le repository, issu du pattern du même nom permet de définir un service permettant
 * de persister nos entités.
 *
 * Les méthodes définies ici ne doivent servir que le modèle d'écriture et non pas
 * la lecture, qui possèdera sans doute des représentations différentes de notre métier
 * pour convenir à l'IHM.
 *
 * Cette interface définie les méthodes les plus communes et chaque aggrégat pourra
 * hériter de cette interface pour ajouter les siennes selon les besoins.
 */
export interface Repository<T extends AggregateRoot<any>> {
  /**
   * Ajoute un aggrégat à la couche de données.
   * @param aggregate
   */
  add(aggregate: T): void;
  /**
   * Modifie un aggrégat dans notre couche de données.
   * @param aggregate
   */
  save(aggregate: T): void;

  // On pourrait avoir le remove, etc...
}
