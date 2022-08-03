export const systemModule = {
  namespaced: true,
  state: {
    drawer: false
  },
  mutations: {
    TOGGLE_DRAWER(state) {
      state.drawer = !state.drawer
    },
    SET_DRAWER(state, newDrawer) {
      state.drawer = newDrawer
    }
  }
}
