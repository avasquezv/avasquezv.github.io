import Vue from 'vue'
import Vuex from 'vuex'
import { profilesModule } from './modules/profiles'
import { authModule } from './modules/auth'
import { systemModule } from './modules/system'
import { monumentsModule } from './modules/monuments'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    profiles: profilesModule,
    auth: authModule,
    system: systemModule,
    monuments: monumentsModule
  }
})
