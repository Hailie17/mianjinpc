export default {
  namespaced: true,
  state: {
    token: ''
  },
  getters: {},
  mutations: {
    updateToken(state, val) {
      console.log(val, 'val')
      state.token = val
    }
  },
  actions: {}
}
