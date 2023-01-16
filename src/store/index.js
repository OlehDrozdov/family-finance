import { createStore } from 'vuex'
import auth from './auth'

export default createStore({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
  },
  getters: {
    error: state => state.error
  },
  modules: {
    auth
  }
})
