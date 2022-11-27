<h1 align="center">Bienvenue dans le projet smartnews-visu-front 👋</h1>
<p>
  <a href="https://github.com/ugieiris/smartnews-visu-front#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/ugieiris/smartnews-visu-front/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

> Application Vue-JS, affichage des pages SmartNews<br />

### 🏠 [Page d'accueil](https://github.com/ugieiris/smartnews-visu-front#readme)

### 💻 [Application en intégration](http://smartnews-visu-front.devint.groupement.systeme-u.fr/)

## Installation des dépendances

```sh
npm i
```

## Compilation et rechargement à chaud pour le développement

```sh
npm run serve
```

## Compilation et minification pour la production

```sh
npm run build
```

## Lancer les tests unitaires

Tests avec couverture

```sh
npm test
```

Tests sans couverture

```sh
npm test:no-coverage
```

## Lancer le linting

Lint sans correction automatique

```sh
npm lint
```

Lint avec correction automatique

```sh
npm lint:fix
```

## PWA
### Icones

Pour régénérer les icones de la PWA, vous devez :
- modifier le fichier ``src/assets/logo.png``
- lancer la commande ``npm run pwa:icons``

### Bouton de rechargement
Ce projet intègre un bouton de rechargement qui est proposé à l'utilisateur lorsque le cache du navigateur n'est plus à jour avec l'application déployée sur le serveur apache.

Le composant qui propose le rechargement peut être modifié : ``src/components/ReloadButton.vue``

### Information mode hors ligne
Pour savoir si la connexion au réseau a été coupée, le projet s'appuie sur la librairie [vue-offline](https://github.com/filrak/vue-offline).

Par défaut, l'information ``Mode hors ligne`` est affichée dans la top bar. Vous pouvez bien sûr customiser ce comportement.
````html
<v-chip class="ma-2" color="red" v-show="!isOnline">Mode hors ligne</v-chip>
````
### Mise en cache des appels d'API
Grâce au plugin workbox backgroundSync, il est possible de mettre dans une file d'attente les appels à certaines API lorsque le réseau est déconnecté.
Lorsque le réseau revient, il dépile les requêtes, le dernier access token connu est remplacé dans le header de chaque requête et l'appel à l'API est effectué.

Pour configurer un tel comportement, il faut prendre exemple sur le code commenté dans le fichier ``service-worker-plugin.js``.

Dans cet exemple, tous les appels POST à l'api nutflix sont mis en cache en cas de déconnexion.
````js
const apiNutflix = process.env.VUE_APP_URL_API
workbox.routing.registerRoute(
  new RegExp(`${apiNutflix}/.*`),
  workbox.strategies.networkFirst({
    cacheName: "api",
    plugins: [
      buildBgSyncPlugin({ maxRetries: 4, queueName: "apiQueue", timeBeforeRetryInSec: 1 },
        response => {
          console.log("response from server", response)
        },
         entry => {
          console.error("unable to launch request", entry.request)
        }
      )
    ]
  }),
  "POST"
)
````

Pour tester en local cette mise en cache, vous devez démarrer votre serveur localhost en https compilé en mode production. La librairie ``http-server`` permet d'exposer votre serveur. 
Il vous faudra :
- alimenter le fichier ``.env.pwa`` avec vos variables environnements d'intégration
- lancer la commande : ``npm run serve:pwa``

Les différentes stratégies de cache disponibles sont décrites [ici](https://developers.google.com/web/tools/workbox/modules/workbox-strategies).

### Mire d'authentification
Les applications PWA sont destinées à être utilisées sur différents devices : desktop, mobile, tablette.

En fonction du device utilisé, la mire d'authentification sera différente. Sur mobile et tablette, c'est authentifcation par schéma qui est utilisée.
Le choix de la mire d'authentification est effectuée dans le fichier ``securityManager.js``.

### Installation sur les mobiles
L'application PWA est déployée sur les mobiles via une APK afin de faciliter sa diffusion. Cette APK est une activité TWA (Trustred Web Application), elle redirige l'utilisateur vers l'application web déployée dans un onglet chrome de manière transparente. Elle paramètre également de paramétrer des profils Zebra pour le flasheur au cas où vous utiliseriez un téléphone de cette marque.

La génération de l'apk est expliquée dans [l'article wiki suivant](https://confluence.systeme-u.com/pages/viewpage.action?pageId=6396177).

 ### Piloter le flasheur du téléphone
Si votre application nécéssite l'utilisateur du flasheur sur les téléphones Zebra, vous pouvez vous appuer sur [l'article wiki suivant](https://confluence.systeme-u.com/pages/viewpage.action?pageId=6396215).

De plus vous pouvez changer le profil datawedge depuis la TWA. Ce profil permet de choisir si le flasher doit scanner des codes barres ou des QRcode ou les deux en même temps. Changer de profil datawedge depuis une TWA est expliqué [ici](https://confluence.systeme-u.com/display/DTDD/Appeler+un+intent+depuis+une+PWA)

## Tests d'intégration
Se référer au wiki : 
- [Rédiger des tests d'intégration avec Cypress](https://confluence.systeme-u.com/pages/viewpage.action?pageId=6399195)
- [Exécution des tests d'intégration Front avec Cypress](https://confluence.systeme-u.com/pages/viewpage.action?pageId=6399199)

## Smoke tests
Se référer au [wiki](https://confluence.systeme-u.com/display/DTDD/Les+smoke+tests).

## Création automatique du client oauth2 et abonnement aux APIs
Se référer au [wiki](https://confluence.systeme-u.com/pages/viewpage.action?pageId=14523100).

## Auteur

👤 Section auteur à compléter

## Développeurs ayant contribués

Ce projet existe grâce aux contributeurs. [[Contribuer](CONTRIBUTING.md)].<br />
👷 Section contributeurs à compléter

## 🤝 Contribuer

Les contributions, issues et feature requests sont les bienvenues!<br />N'hésitez pas à consulter la page des issues [issues page](https://github.com/ugieiris/smartnews-visu-front/issues).<br />Vous pouvez également consulter le [Guide de contribution](CONTRIBUTING.md).

## Supportez nous

Donnez une ⭐️ si ce projet vous a aidé!

---
