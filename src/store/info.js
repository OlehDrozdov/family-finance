import { getDatabase, ref, get, set } from "firebase/database";

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
      const userInfoRef = ref(getDatabase(), `/users/${uid}/info`);

      try {
        const info = await get(userInfoRef);
        commit('setInfo', info.val());
      } catch (error) {
        commit('setError', error);
      }
    },
    async updateInfo({dispatch, commit, getters}, updateInfo) {
      const uid = await dispatch('getUserUid');
      const userInfoRef = ref(getDatabase(), `/users/${uid}/info`);
      const updateInfoData = {...getters.info, ...updateInfo};

      try {
        await set(userInfoRef, updateInfoData);
        commit('setInfo', updateInfoData);
      } catch (error) {
        commit('setError', error);
      }
    }
  },
  getters: {
    info: state => state.info
  }
}
