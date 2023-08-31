import { getDatabase, ref, child, get } from "firebase/database";

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    }
  },
  actions: {
    async fetchInfo({dispatch, commit}) {
      const uid = await dispatch('getUserUid');
      const dbRef = ref(getDatabase());

      try {
        const info = await get(child(dbRef, `users/${uid}/info`));
        commit('setInfo', info.val());
      } catch (error) {
        commit('setError', error);
      }
    }
  },
  getters: {
    info: state => state.info
  }
}
