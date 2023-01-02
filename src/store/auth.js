import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        throw error;
      });
    }
  }
}