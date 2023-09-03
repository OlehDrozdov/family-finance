import { getDatabase, ref, push, get, set } from "firebase/database";

export default {
  actions: {
    async fetchCategories({dispatch, commit}) {
      try {
        const uid = await dispatch('getUserUid');
        const categoriesRef = ref(getDatabase(), `/users/${uid}/categories`);
        const categories = (await get(categoriesRef)).val() || {};

        return Object.keys(categories).map((key) => ({...categories[key], id: key}));
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async createCategory({dispatch, commit}, {title, limit}) {
      try {
        const uid = await dispatch('getUserUid');
        const categoriesRef = ref(getDatabase(), `/users/${uid}/categories`);
        const existingCategories = (await get(categoriesRef)).val();

        if (existingCategories) {
          for (let categoryID in existingCategories) {
            if (existingCategories[categoryID].title === title) {              
              throw 'category/dublicate';
            }
          }
        }

        const categoryRef = await push(categoriesRef, {title, limit});
  
        return {
          title,
          limit,
          id: categoryRef.key,
        };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async updateCategory({dispatch, commit}, {id, title, limit}) {
      try {
        const uid = await dispatch('getUserUid');
        const db = getDatabase();
        const url = `/users/${uid}/categories`;
        const categoriesRef = ref(db, url);
        const categoryRef = ref(db, `${url}/${id}`);
        const existingCategories = (await get(categoriesRef)).val();

        if (existingCategories) {
          for (let categoryID in existingCategories) {
            if (
              existingCategories[categoryID].title === title && 
              existingCategories[categoryID].limit === limit
            ) {              
              throw 'category/dublicate';
            }
          }
        }

        await set(categoryRef, {title, limit});
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  }
}