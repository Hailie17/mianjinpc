export default {
  namespace: true,
  state: {
    token: ''
  },
  getters: {},
  mutations: {
    updateToken(state, val) {
      state.token = val
    }
  },
  actions: {}
}
