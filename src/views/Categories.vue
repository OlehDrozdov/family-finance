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
          @updated="updateCategory"
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
  name: 'categories-component',
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
    updateCategory(updatedCategory) {
      const categoryToUpdate = this.categories.find(category => category.id === updatedCategory.id);
      if (categoryToUpdate) {
        categoryToUpdate.title = updatedCategory.title;
        categoryToUpdate.limit = updatedCategory.limit;
        this.updateCount++;
      }
    }
  },
  components: {
    CategoryCreate,
    CategoryEdit
  }
}
</script>