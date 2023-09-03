import { getDatabase, ref, push } from "firebase/database";

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
    }
  }
}