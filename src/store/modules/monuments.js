import Axios from 'axios'

export const monumentsModule = {
  namespaced: true,
  state: {
    list: [],
    loading: false
  },

  mutations: {
    SET_LIST(state, newList) {
      state.list = newList
    },
    SET_LOADING(state, newLoading) {
      state.loading = newLoading
    }
  },

  actions: {
    async getAll({ commit }) {
      commit('SET_LOADING', true)
      try {
        const { data } = await Axios.get('/monuments.json')
        console.log('getAllMonuments', data)
        commit('SET_LIST', data)
      } catch (error) {
        console.error(error)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}
