import { DB } from '@/plugins/Firebase'

export const profilesModule = {
  namespaced: true,
  state: {
    listado: [],
    loading: false
  },
  getters: {
    heart(state) {
      state.contador = state.contador + 1
    }
  },
  mutations: {
    SET_LISTADO(state, newListado) {
      state.listado = newListado
    },
    SET_LOADING(state, newLoading) {
      state.loading = newLoading
    },
    SET_CONTADOR(state, newContador) {
      state.contador = newContador
    }
  },
  actions: {
    async getAllProfiles({ commit }) {
      commit('SET_LOADING', true)
      try {
        const profile = []
        const profile$ = await DB.collection('profile').get()

        profile$.forEach((document) => {
          profile.push({ ...document.data(), id: document.id })
        })
        commit('SET_LISTADO', profile)
      } catch (e) {
        console.error(e)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async createAccount({ commit }, newListado) {
      commit('SET_LOADING', true)
      try {
        await DB.collection('profile').add(newListado)
      } catch (error) {
        console.error('error en agregar mascota')
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async update({ commit }, { id, ...newMascota }) {
      commit('SET_LOADING', true)
      try {
        await DB.collection('profile').doc(id).update(newMascota)
      } catch (e) {
        console.error('Error al editar documento: ', id)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}
