<template>
  <div>
    <div class="page-title">
      <h3>History</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <section v-else-if="records.length">
      <HistoryRecords :records="records" />
    </section>

    <p v-else class="center">
      No records.
      <router-link to="/record">Add first</router-link>
    </p>

  </div>
</template>

<script>
import HistoryRecords from '@/components/HistoryRecords'

export default {
  name: 'history-component',
  data() {
    return {
      categories: [],
      records: [],
      loading: true
    }
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    this.categories = await this.$store.dispatch('fetchCategories');

    this.records = records.map(record => {
      return {
        ...record,
        categoryTitle: this.categories.find(category => category.id === record.categoryID).title,
        typeTitle: record.type.replace(/^./, match => match.toUpperCase()),
        typeClass: record.type === 'outcome' ? 'red lighten-2' : 'green lighten-2'
      }
    });

    this.loading = false;
  },
  components: {
    HistoryRecords
  }
}
</script> 