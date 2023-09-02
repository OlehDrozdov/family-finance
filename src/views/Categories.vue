<template>
  <div>
    <div class="page-title">
      <h3>Categories</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory"/>
        <CategoryEdit 
          v-if="categories.length" 
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <p v-else class="center">No categories</p>
      </div>
      
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'categories',
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    async updateCategories(updatedCategory) {
      const index = this.categories.findIndex(category => category.id === updatedCategory.id);
      this.categories[index].title = updatedCategory.title;
      this.categories[index].limit = updatedCategory.limit;
      this.updateCount++;
    }
  },
  components: {
    CategoryCreate,
    CategoryEdit
  }
}
</script>