import { shallowMount } from "@vue/test-utils"
import TopBar from "@/components/top-bar/TopBar"
import Vue from "vue"
Vue.config.ignoredElements = ["v-app-bar", "v-spacer", "iris-logout-dropdown", "iris-avatar"]

describe("TopBar.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(TopBar, {
      computed: {
        utilisateurConnecte() {
          return { prenom: "Homer", nom: "Simpson" }
        }
      }
    })
  })

  describe("Component", () => {
    it("components are Vue instances", () => {
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
    it("is a TopBar component", () => {
      expect(wrapper.is(TopBar)).toBe(true)
    })
  })
})
