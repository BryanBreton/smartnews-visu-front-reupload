import RequestService from "@/services/http/requestService"

const baseUrl = process.env.VUE_APP_URL_WEB_SERVER

export default {
  get(url) {
    return RequestService.get(`${baseUrl}${url}`)
  },
  getOne(url, idResource) {
    return RequestService.get(`${baseUrl}${url}/${idResource}`)
  },
  post(url, body) {
    return RequestService.post(`${baseUrl}${url}`, body)
  },
  put(url, idResource, body) {
    return RequestService.put(`${baseUrl}${url}/${idResource}`, body)      
  },
  delete(url, idResource) {
    return RequestService.delete(`${baseUrl}${url}/${idResource}`)
  }
}