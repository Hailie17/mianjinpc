export default {
  namespace: true,
  state: {
    list: []
  },
  getters: {
  },
  mutations: {
    updateList(state, newList) {
      state.list = newList
    }
  },
  actions: {
  }
}