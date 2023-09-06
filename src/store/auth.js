import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default {
  actions: {
    getUserUid() {
      const user = getAuth().currentUser;
      return user ? user.uid : null
    },
    async login({commit}, {email, password}) {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch(error) {
        commit('setError', error);
        throw error
      }
    },
    async register({dispatch, commit}, {email, password, name}) {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        const uid = await dispatch('getUserUid');
        const db = getDatabase();
        set(ref(db, `/users/${uid}/info`), {
          bill: 0,
          username: name,
        }); 
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async logout({commit}) {
      const auth = getAuth();
      await signOut(auth);
      commit('clearInfo');
    }
  }
}