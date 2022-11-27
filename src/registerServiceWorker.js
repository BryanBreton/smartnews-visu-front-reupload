/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
    },
    registered () {
    },
    cached () {
    },
    updatefound () {
    },
    updated(registration) {
      // on laisse le temps au bouton de rechargement d'être créé pour lui demander de s'afficher
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent("swUpdated", { detail: registration }))
      }, 5000)
    },
    offline () {
    },
    error (error) {
    }
  })
}