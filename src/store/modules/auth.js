import Firebase from 'firebase/app'
import 'firebase/auth'

const $Auth = Firebase.auth()

export const authModule = {
  namespaced: true,
  state: {
    user: null,
    loading: false
  },
  getters: {
    activeLogin(state) {
      return !!state.user
    }
  },
  mutations: {
    SET_USER(state, newUser) {
      state.user = newUser
    },
    SET_LOADING(state, newLoading) {
      state.loading = newLoading
    }
  },
  actions: {
    async subscribeToAuthStateChange({ commit }) {
      return new Promise((resolve) => {
        $Auth.onAuthStateChanged((user) => {
          commit('SET_USER', user)
          resolve()
        })
      })
    },

    async signInWithEmailAndPassword({ commit }, credentials) {
      commit('SET_LOADING', true)
      try {
        const { user } = await $Auth.signInWithEmailAndPassword(
          credentials.email,
          credentials.password
        )
        commit('SET_USER', user)
      } catch (error) {
        console.error('no funca', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async createUserWithEmailAndPassword({ commit }, credentials) {
      commit('SET_LOADING', true)
      try {
        const { user: newUser } = await $Auth.createUserWithEmailAndPassword(
          credentials.email,
          credentials.password
        )
        commit('SET_USER', newUser)
      } catch (error) {
        console.error(error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async signOut({ commit }) {
      commit('SET_LOADING', true)
      try {
        $Auth.signOut()
        commit('SET_USER', null)
      } catch (error) {
        console.error(error)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}
