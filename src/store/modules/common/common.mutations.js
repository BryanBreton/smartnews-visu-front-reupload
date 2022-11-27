export default {
  setIsAuth(state, value) {
    state.isAuth = value
  },
  setUtilisateurConnecte(state, utilisateurConnecte) {
    state.utilisateurConnecte = utilisateurConnecte
  },
  setFonctionsUtilisateurConnecte(state, fonctionsUtilisateurConnecte) {
    state.fonctionsUtilisateurConnecte = fonctionsUtilisateurConnecte
  },
  setAlert(state, userAlert) {
    Object.assign(state.alert, {
      ...state.userDefaultAlert,
      ...userAlert
    })
  },
  setAlertDisplay(state, displayAlert) {
    state.alert.display = displayAlert
  },
  setAlertRecall(state, recall) {
    state.alert.recall = recall
  },
  setIdTimer(state, idTimer) {
    state.alert.idTimer = idTimer
  },
  clearIdTimer(state) {
    state.alert.idTimer = undefined
  },
  setIsLoading(state, value) {
    state.isLoading = value
  }
}
