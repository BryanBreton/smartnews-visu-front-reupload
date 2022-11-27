import { template, cloneDeep } from "lodash"
import errorMessages from "@/resources/errorMessages.json"
import fieldLabels from "@/resources/fieldLabels.json"
import { DEFAULT } from "@/constants/common"

export default {
  mapAllAsString(errorCodes) {
    const errorMessage = errorCodes
      .map(error => {
        const clonedError = cloneDeep(error)
        const code = clonedError.codeErreur || clonedError.code || DEFAULT
        const field = clonedError.field || clonedError.champErreur
        // Libellé du champ en erreur, utilisé dans le fichier de mapping
        clonedError.fieldLabel = fieldLabels[field] || field
        return this.getMessage(clonedError, code)
      })
      .join("\n")

    return errorMessage ? errorMessage : errorMessages[DEFAULT]
  },

  /**
   * Renvoi le message d'une erreur en fonction de sa structure et de son code
   * @param {*} error objet erreur
   * @param {*} code code erreur
   */
  getMessage(error, code) {
    // Si un message correspondant au code erreur existe dans le fichier de mapping
    if (errorMessages[code]) return this.getInterpolatedMessage(error, code)
    return error.label || error.libelleErreur || errorMessages[DEFAULT]
  },

  /**
   * Interpolation des données dans les messages du fichier de mapping
   * @param {*} error objet erreur
   * @param {*} code code erreur
   */
  getInterpolatedMessage(error, code) {
    const tpl = template(errorMessages[code])
    return tpl(error)
  }
}
