import Vue from "vue"
import Vuex from "vuex"
import commonStore from "@/store/modules/common/common.module"
import webServiceStore from "@/store/modules/web_service/ws.module"
import smartNewsStore from '@/store/modules/smart_news/smart_news.module'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === "development",
  modules: {
    commonStore,
    webServiceStore,
    smartNewsStore
  }
})
