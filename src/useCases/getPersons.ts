/**
 * Ici, c'est un modèle de lecture donc je retourne ce qui me rend service
 * dans la couche IHM.
 *
 * L'important étant de le définir dans la couche applicative pour définir un contrat
 * de données. Au final, d'où il provient, on s'en fiche un peu, ici ce n'est pas un
 * objet métier, simplement une association de propriétés pour l'affichage.
 */
export interface PersonDTO {
  id: string;
  securitySocialNumber: string;
  nickname: string;
}

/**
 * Et comme ce cas d'utilisation sera entièrement géré par la couche de persistence,
 * je ne me soucie même pas de comment ce sera fait ici.
 *
 * Si il y'avait des accès à vérifier ou quoi que ce soit, on pourrait implémenter
 * un cas d'utilisation particulier et demander à se faire injecter un service capable
 * d'aller récupérer les données  mais dans cet exemple, c'est la couche d'infrastructure
 * qui va l'implémenter (voir `InMemoryPersonRepository`).
 */
export interface GetPersonsUseCase {
  getAll(): PersonDTO[];
  getBySSN(ssn: string): PersonDTO;
}
