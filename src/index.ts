/**
 * Bienvenue dans ce petit bac à sable !
 *
 * On commence par un peu de graphql avec un petit serveur pour expliquer rapidement
 * le fonctionnement.
 *
 * En graphql, l'élément le plus important est le schéma. Il définit les types
 * disponibles ainsi que les opérations. Ce schéma peut servir de base pour générer
 * du code, on le verra ici.
 *
 * La syntaxe pour définir le schéma est relativement simple et peut être trouvée
 * ici: https://graphql.org/learn/schema/
 *
 * Pour cet exemple, le schéma se trouve dans `src/schema.graphql`. Une fois le schéma
 * définit, il faut définir des résolveurs qui permettront de faire le lien entre une
 * requête cliente et l'exécution de votre code sur le serveur.
 *
 * Dans ce bac à sable, j'utilise `graphql-codegen` pour générer du code à partir du
 * schéma graphql en lançant la commande `npm run generate`. Cet outil va me générer
 * les types correspondants au schéma ainsi définit ce qui permet de se baser sur
 * des types stricts lors de l'écriture des résolveurs et donc ainsi de lever le plus
 * d'erreurs pendant la phase de compilation si les types de retours ou les arguments ne
 * matchent pas entre autre.
 *
 * Continuez de scroller, pour la suite ;)
 */

import express from "express";
import graphqlHTTP from "express-graphql";
import { makeExecutableSchema } from "graphql-tools";
import { importSchema } from "graphql-import";
import { InMemoryPersonRepository, SimpleEventDispatcher } from "./infra";
import {
  CreatePersonUseCase,
  GetPersonsUseCase,
  RenamePersonUseCase,
} from "./useCases";

/**
 * Tout ce qui se trouve dans `generated/` et généré par la commande `npm run generate`,
 * il s'agit des types qui nous permettent du code type safe et d'éviter des erreurs
 * à l'exécution.
 */
import { MutationResolvers, QueryResolvers } from "./generated/graphql";

/**
 * On ne s'embête pas ici, pas d'inversify ou quoi que ce soit, on se contente
 * d'instantier nos différents services.
 */

const dispatcher = new SimpleEventDispatcher();
const personRepository = new InMemoryPersonRepository(dispatcher);
const createPersonUseCase = new CreatePersonUseCase(personRepository);
const renamePersonUseCase = new RenamePersonUseCase(personRepository);
const getPersonsUseCase: GetPersonsUseCase = personRepository; // Ici le repository implèmente le cas d'utilisation de lecture.

/**
 * En utilisant notre dispatcher, on peut recevoir tous les événements levés par notre
 * domaine ce qui nous permet d'apporter de l'observabilité et d'être informé de toute
 * modification de notre domaine.
 */

dispatcher.subscribe((evt) => {
  /**
   * Ici je ne fais que de l'affichage mais on pourrait tout à fait imaginer déclencher
   * un cas d'utilisation issu d'un autre domaine ce qui nous permet de communiquer
   * de manière très découplé entre nos différents contextes bornés.
   */
  console.info(evt);
});

/**
 * C'est ici que les choses deviennent intéressantes. En graphql, il existe trois
 * "noeuds" racines : Query (lecture), Mutation (écriture), Subscription (abonnement).
 *
 * Ici, je défini une variables Query que je type en utilisant le type Query généré
 * par graphql-codegen et qui match ma définition de schéma.
 *
 * J'en profite pour définir tous les champs en requis grâce au type `Required`, ce qui
 * m'évite d'avoir des résolveurs non définis et de voir très tôt que j'ai oublié
 * d'implémenter des opérations.
 */
const Query: Required<QueryResolvers> = {
  persons(root, args, ctx) {
    return getPersonsUseCase.getAll();
  },
};

/**
 * Pour les mutations, c'est exactement la même chose.
 */
const Mutation: Required<MutationResolvers> = {
  createPerson(root, args, ctx) {
    /**
     * Ce qui est intéressant avec cette approche, c'est qu'on évite les types `any`,
     * vous pouvez observer ici que l'argument args est typé et que le type de retour
     * aussi ce qui éliminera beaucoup d'erreur lors du dev.
     */
    const id = createPersonUseCase.execute(args.cmd);

    /**
     * Dans cet exemple on triche un peu parce qu'on sait que l'id d'une personne
     * est égale à son numéro de sécurité sociale.
     */
    return getPersonsUseCase.getBySSN(id);
  },
  renamePerson(root, args, ctx) {
    renamePersonUseCase.execute(args.cmd);
    return getPersonsUseCase.getBySSN(args.cmd.id);
  },
};

/**
 * Une fois que nos résolveurs sont définis, il ne nous reste plus qu'à brancher
 * le tout avec ce qui suit. Cette variable sera donné au handler express qui récupérera
 * toutes les requêtes pointant sur `/graphql` et d'exécuter les resolveurs appropriés.
 */
const schema = makeExecutableSchema({
  typeDefs: importSchema("./src/schema.graphql"),
  resolvers: {
    Query,
    Mutation,
  },
});

/**
 * On instantie le serveur express.
 */
const app = express();

/**
 * Et on utilise le handler graphqlHTTP pour express en le configurant avec notre
 * schéma. Et on voit ici le fameux `/graphql`. Graphiql est très sympa en dev
 * pour tester des requêtes sur l'api graphql ainsi exposée.
 */
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

/**
 * Et on lance le serveur !
 *
 * Il ne vous reste plus qu'à lancer le serveur avec un `npm start` et à vous rendre
 * sur http://localhost:4000/graphql pour voir le résultat.
 */
app.listen(4000, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.info("Listening!");
});
