import { getDatabase, ref, push, get } from "firebase/database";

export default {
  actions: {
    async createRecord({dispatch, commit}, record) {
      try {
        const uid = await dispatch('getUserUid');
        const userRef = ref(getDatabase(), `/users/${uid}/records`);

        return await push(userRef, record);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = await dispatch('getUserUid');
        const recordsRef = ref(getDatabase(), `/users/${uid}/records`);
        const records = (await get(recordsRef)).val() || {};
  
        return Object.keys(records).map((key) => ({...records[key], id: key}));
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    }
  }
}
