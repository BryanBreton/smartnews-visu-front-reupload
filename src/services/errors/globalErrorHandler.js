import Vue from "vue"
import store from "@/store"
import mapper from "@/utils/errors/errorCodeToLabelMapper"
import { BusinessException } from "iris-common"
import { DEFAULT } from "@/constants/common"

/**
 * Gère l'affichage des erreurs interceptées via une alerte.
 * Si l'erreur n'est pas passée en argument ou n'est pas une BusinessException,
 * affiche le message d'erreur par défaut
 * @param {Error} error L'exception / erreur interceptée.
 */
function displayErrors(error) {
  let errorCodes = [{ codeErreur: DEFAULT }]

  if (error instanceof BusinessException) {
    errorCodes = error.errors
    console.error("Erreurs :", errorCodes) // eslint-disable-line no-console
  } else {
    console.error(error) // eslint-disable-line no-console
  }
  // Désactivation des loaders en cas d'erreur
  store.dispatch("commonStore/setIsLoading", false)
  // Affichage des erreurs dans l'alerte
  store.dispatch("commonStore/displayAlert", {
    type: "error",
    text: mapper.mapAllAsString(errorCodes)
  })
}

export default {
  addGlobalErrorHandling() {
    /**
     * Intercepteur global de toutes les erreurs et rejets de promesses survenues dans des composants Vue
     */
    Vue.config.errorHandler = err => displayErrors(err)

    /**
     * Intercepteur global de toutes les erreurs survenues hors composant Vue (ex: dans le store).
     * N'intercepte pas les rejets de promesses.
     */
    window.onerror = () => {
      displayErrors()
    }

    /**
     * Intercepteur global de tous les rejets de promesses survenus hors composant Vue (ex: dans le store).
     */
    window.addEventListener("unhandledrejection", event => {
      displayErrors(event.reason)
      event.preventDefault()
    })
  }
}
