import { createStore } from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

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
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const url = `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,UAH,EUR`;
      const result = await fetch(url);
      return await result.json();
    }
  },
  getters: {
    error: state => state.error
  },
  modules: {
    auth,
    info,
    category,
    record
  }
})
