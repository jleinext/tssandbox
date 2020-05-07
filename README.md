# tssandbox

Petit bac à sable pour expérimenter. J'essaie de commenter mon approche, si cela vous intéresse, direction le fichier `src/index.ts` pour commencer le voyage 😁

## Développement

```console
$ npm install # ou yarn
$ npm start
```

Vous pouvez aussi lancer le déboguage dans VS Code en appuyant sur `F5` après avoir ouvert le projet.

## Tests

```console
$ npm test
```

## Tester l'api

Une fois le serveur lancé, direction [http://localhost:4000/graphql](http://localhost:4000/graphql) et renseigner les commandes suivantes dans GraphiQL :

```graphql
query GetAllPersons {
  persons {
    id
    securitySocialNumber
    nickname
  }
}

mutation CreatePerson {
  createPerson(cmd: { ssn: "185057800608436", nickname: "john doe" }) {
    id
    securitySocialNumber
    nickname
  }
}

mutation RenamePerson {
  renamePerson(cmd: { id: "185057800608436", nickname: "bobby" }) {
    id
    nickname
  }
}
```
