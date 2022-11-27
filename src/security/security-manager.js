import { SecurityManager } from "@u-iris/u-iris-front-security"
import MobileDetect from "mobile-detect"

const hostPath = window.location.protocol + "//" + window.location.host
const mobileDetect = new MobileDetect(window.navigator.userAgent)

const serverUri =
  mobileDetect.mobile() || mobileDetect.phone() || mobileDetect.tablet() ? process.env.VUE_APP_AUTHORIZATION_SERVER_URI_PWA : process.env.VUE_APP_AUTHORIZATION_SERVER_URI

export const securityManager = new SecurityManager({
  authorizationServer: serverUri,
  clientId: process.env.VUE_APP_AUTHORIZATION_SERVER_CLIENT_ID,
  redirectUri: hostPath + "/security/callback.html",
  silentRedirectUri: hostPath + "/security/silent-callback.html",
  postLogoutRedirectUri: hostPath
})
