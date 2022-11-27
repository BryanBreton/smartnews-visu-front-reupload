import state from "@/store/modules/common/common.state.js"
import getters from "@/store/modules/common/common.getters.js"
import actions from "@/store/modules/common/common.actions.js"
import mutations from "@/store/modules/common/common.mutations.js"

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
