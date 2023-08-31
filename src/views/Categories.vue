<template>
  <div>
    <div class="page-title">
      <h3>Categories</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @created="addNewCategory"/>
        <CategoryEdit />
        
        <p class="center">NoCategories</p>
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
      categories: []
    }
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    }
  },
  components: {
    CategoryCreate,
    CategoryEdit
  }
}
</script>