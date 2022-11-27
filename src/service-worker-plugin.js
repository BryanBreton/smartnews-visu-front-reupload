importScripts("./sw-env-vars.js") // envoyé via DumpVueEnvVarsWebpackPlugin

let access_token = ""
const maxRetentionTimeApi = 24 * 60 // Réessaye maximum 24h d'envoyer les requêtes émises en déconnecté
const maxAgeImages = 7 * 24 * 60 * 60 // images mise en cache 1 semaine

// paramétrage du cache
workbox.setConfig({
  debug: process.env.VUE_APP_WORKBOX_DEBUG,
})
workbox.core.setCacheNameDetails({ prefix: "smartnews-visu-front" })
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// gestion des appels d'API en déconnecté
// modification du token avec le dernier access token connu
// possibilité de réessayer n fois un appel avant l'appel au call back d'erreur
const buildBgSyncPlugin = ({ maxRetries = 0, timeBeforeRetryInSec = 0, queueName = "queueName" }, callbackResponse, callbackError) => {
  return new workbox.backgroundSync.Plugin(queueName, {
    maxRetentionTimeApi,
    onSync: async ({ queue }) => {
      let entry
      let retry = maxRetries
      // rejoue les appels d'APIs mis dans la queue
      while ((entry = await queue.shiftRequest())) {
        try {
          const request = entry.request
          let response
          if (access_token != "") {
            response = await fetch(request, {
              method: request.method,
              headers: {
                ...request.headers,
                Authorization: "Bearer " + access_token,
              },
            })
          } else {
            response = await fetch(request)
          }
          callbackResponse(response)
        } catch (error) {
          retry--
          if (retry > 0) {
            await queue.unshiftRequest(entry)
            await new Promise((r) => setTimeout(r, timeBeforeRetryInSec * 1000))
          } else {
            // throw error
            callbackError(entry)
            retry = maxRetries
          }
        }
      }
    },
  })
}

// exemple d'enregistrement de ROUTE en cache
/*
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
      })
    ]
  }),
  "POST"
)
*/

// Gestion de cache communes aux ressources
// JS & HTML -> prendre d'abord sur le réseau
workbox.routing.registerRoute(/\.(?:js|html)$/, workbox.strategies.networkFirst())
// CSS -> prend le cache puis le réseau s'il est actif
workbox.routing.registerRoute(
  /.*\.css/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "css-cache",
  })
)
// Images -> le cache en priorité
workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  workbox.strategies.cacheFirst({
    cacheName: "image-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: maxAgeImages,
      }),
    ],
  })
)
// google -> le cache en priorité
workbox.routing.registerRoute(
  new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
  workbox.strategies.cacheFirst({
    cacheName: "googleapis",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
    ],
  })
)

self.addEventListener("message", (event) => {
  // Nécessaire au bouton de rechargement, force le nouveau service worker à s'activer
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  } else if (event.data && event.data.type == "token_refresh") {
    // gestion du rafraichissement du token du mode hors ligne au connecté
    access_token = event.data.message
  }
})
