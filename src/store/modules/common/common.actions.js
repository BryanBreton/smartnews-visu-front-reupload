import { isEmpty } from "lodash"
import { securityManager } from "@/security/security-manager"
import RefUtilisateurAppliHttp from "@/services/http/refUtilisateurAppliHttp"
import { LDAP_APPLICATION } from "@/constants/common"

export default {
  setIsAuth({ commit }, isAuth) {
    commit("setIsAuth", isAuth)
  },
  /**
   * Lancement de la négociation d'authentification
   * @param {Object} param0 paramètres du contexte
   */
  async launchAuthentif({ commit }) {
    await securityManager.signIn({})
    // Récupération des informations de l'utilisateur connecté
    commit("setUtilisateurConnecte", await RefUtilisateurAppliHttp.get("/utilisateurConnecte"))
    // Récupération des fonctions de l'utilisateur connecté
    if (!isEmpty(LDAP_APPLICATION))
      commit("setFonctionsUtilisateurConnecte", await RefUtilisateurAppliHttp.get(`/utilisateurConnecte/fonctions?codeApplication=${LDAP_APPLICATION}`))
    // Un utilisateur est authentifié
    commit("setIsAuth", true)
  },
  /**
   * Déconnexion de l'application
   */
  logout() {
    securityManager.signOut()
  },
  /**
   * Affiche l'alerte par défaut (les paramètres peuvent être surchargés)
   * @param {*} param0 contexte
   * @param {*} alert description de l'alerte
   */
  displayAlert({ commit, dispatch }, alert) {
    commit("setAlert", alert)
    if (alert.timeOut === true) dispatch("handleDisplayAlertTimeOut")
  },
  /**
   * Gestion du timeOut d'affichage des alertes
   * @param {*} param0 contexte
   */
  handleDisplayAlertTimeOut({ state, commit, dispatch }) {
    dispatch("clearTimeOut")
    const idTimer = setTimeout(function() {
      commit("setAlertDisplay", false)
      dispatch("clearTimeOut")
    }, state.alert.timer)
    commit("setIdTimer", idTimer)
  },
  /**
   * Affiche ou masque l'alerte
   * Clear le timeOut de l'alerte si celle-ci est masquée
   * @param {*} param0  contexte
   * @param {*} display true pour afficher, false pour masquer
   */
  setAlertDisplay({ commit, dispatch }, display) {
    commit("setAlertDisplay", display)
    if (display === false) dispatch("clearTimeOut")
  },
  closeAlert({ dispatch }) {
    dispatch("setAlertDisplay", false)
    dispatch("setAlertRecall", false)
  },
  dismissAlert({ dispatch }) {
    dispatch("setAlertDisplay", false)
    dispatch("setAlertRecall", true)
  },
  /**
   * Affiche ou masque le bouton permettant de réafficher l'alerte
   * @param {*} param0 contexte
   * @param {*} recall true : peut réafficher, false sinon
   */
  setAlertRecall({ commit }, recall) {
    commit("setAlertRecall", recall)
  },
  clearTimeOut({ state, commit }) {
    clearTimeout(state.alert.idTimer)
    commit("clearIdTimer")
  },
  setIsLoading({ commit }, isLoading) {
    commit("setIsLoading", isLoading)
  }
}
