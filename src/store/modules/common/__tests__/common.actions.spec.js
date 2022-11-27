import actions from "@/store/modules/common/common.actions"
import { TestsUtils } from "@u-iris/iris-common-test-utils"
import { securityManager } from "@/security/security-manager"
import RefUtilisateurAppliHttp from "@/services/http/refUtilisateurAppliHttp"
import { when } from "jest-when"
import { LDAP_APPLICATION } from "@/constants/common"
import { isEmpty } from "lodash"

jest.mock("@/security/security-manager", () => ({
  securityManager: {
    getUser: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn()
  }
}))
jest.mock("@/services/http/refUtilisateurAppliHttp", () => ({
  get: jest.fn()
}))

describe("commonStore Actions", () => {
  const user = { id: 5 }
  const userFonctions = { role: "ADMIN" }
  const ID_TIMER = 5
  const alert = { idTimer: ID_TIMER }
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("launchAuthentif", () => {
    const action = actions.launchAuthentif
    it("Should commit (user already authenticated)", done => {
      securityManager.getUser.mockImplementation(() => user)
      when(RefUtilisateurAppliHttp.get)
        .calledWith("/utilisateurConnecte")
        .mockReturnValue(user)
      when(RefUtilisateurAppliHttp.get)
        .calledWith(`/utilisateurConnecte/fonctions?codeApplication=${LDAP_APPLICATION}`)
        .mockReturnValue(userFonctions)
      TestsUtils.executeAction({
        action,
        expectedMutations: getUserAuthenticatedExpectedMutations(),
        done
      })
    })
  })

  describe("logout", () => {
    it("Logout should call signOut", async () => {
      actions.logout()
      expect(await securityManager.signOut).toHaveBeenCalledTimes(1)
    })
  })

  describe("setAlertDisplay", () => {
    it("setAlertDisplay should call setAlertDisplay and NOT clearTimeOut", () => {
      const payload = true
      TestsUtils.executeAction({
        payload,
        action: actions.setAlertDisplay,
        expectedMutations: [{ type: "setAlertDisplay", payload }]
      })
    })

    it("setAlertDisplay should call setAlertDisplay and  clearTimeOut", () => {
      const payload = false
      TestsUtils.executeAction({
        payload,
        action: actions.setAlertDisplay,
        expectedActions: [{ type: "clearTimeOut", payload }],
        expectedMutations: [{ type: "setAlertDisplay", payload }]
      })
    })
  })

  describe("clearTimeOut", () => {
    it("clearTimeOut should call clearTimeOut and clearIdTimer", () => {
      TestsUtils.executeAction({
        state: { alert },
        action: actions.clearTimeOut,
        expectedMutations: [{ type: "clearIdTimer" }]
      })
    })
  })

  function getUserAuthenticatedExpectedMutations() {
    const expectedMutations = [
      {
        type: "setUtilisateurConnecte",
        payload: user
      }
    ]
    if (!isEmpty(LDAP_APPLICATION)) {
      expectedMutations.push({
        type: "setFonctionsUtilisateurConnecte",
        payload: userFonctions
      })
    }
    expectedMutations.push({ type: "setIsAuth", payload: true })
    return expectedMutations
  }
})
