import RequestService from "@/services/http/requestService"

const baseUrl = process.env.VUE_APP_URL_API_REF_UTILISATEUR_APPLI

export default {
  get(url) {
    return RequestService.get(`${baseUrl}${url}`)
  }
}
