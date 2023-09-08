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
      <HistoryRecords :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="onPageChange"
        :prev-text="prevButton"
        :next-text="nextButton"
        :container-class="'pagination'"
      />
    </section>

    <p v-else class="center">
      No records.
      <router-link to="/record">Add first</router-link>
    </p>

  </div>
</template>

<script>
import PaginateMixin from '@/mixins/paginate.mixin'
import HistoryRecords from '@/components/HistoryRecords'

export default {
  name: 'history-component',
  mixins: [PaginateMixin],
  data() {
    return {
      records: [],
      loading: true
    }
  },
  async mounted() {    
    const categories = await this.$store.dispatch('fetchCategories');
    this.records = await this.$store.dispatch('fetchRecords');

    this.records = this.records.map(record => {
      return {
        ...record,
        categoryTitle: categories.find(category => category.id === record.categoryID).title,
        typeTitle: record.type.replace(/^./, match => match.toUpperCase()),
        typeClass: record.type === 'outcome' ? 'red lighten-2' : 'green lighten-2'
      }
    });

    this.setupPaginate(this.records);

    this.loading = false;
  },
  components: {
    HistoryRecords
  }
}
</script> 

<style lang="scss">
  .pagination {
    li {
      cursor: pointer;
    }
    .active {
      background-color: teal !important;
    }
  }
</style>