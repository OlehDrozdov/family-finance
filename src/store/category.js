import { getDatabase, ref, push, get } from "firebase/database";

export default {
  actions: {
    async createCategory({dispatch, commit}, {title, limit}) {
      try {
        const uid = await dispatch('getUserUid');
        const categoriesRef = ref(getDatabase(), `/users/${uid}/categories`);
        const existingCategories = await (await get(categoriesRef)).val();

        if (existingCategories) {
          for (let categoryId in existingCategories) {
            if (existingCategories[categoryId].title === title) {              
              throw 'category/dublicate';
            }
          }
        }

        const categoryData = {
          title,
          limit,
        };
        const categoryRef = await push(categoriesRef, categoryData);
  
        return {
          title,
          limit,
          id: categoryRef.key,
        };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    }
  }
}