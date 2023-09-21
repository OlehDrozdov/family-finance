<template>
  <div>
    <div class="page-title">
      <h3>History</h3>
    </div>

    <Loader v-if="loading" />

    <section v-else-if="records.length">
      <div class="row">
        <div class="history-chart col s4">
          <PieChart :chartData="chartData" :chartOptions="chartOptions" />
        </div>
        <div class="history-records col s8">
          <HistoryRecords :records="items" />
          <Paginate
            v-model="page"
            :page-count="pageCount"
            :click-handler="onPageChange"
            :prev-text="prevButton"
            :next-text="nextButton"
            :container-class="'pagination'"
          />
        </div>
      </div>
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
import PieChart from '@/components/PieChart'

export default {
  name: 'history-component',
  mixins: [PaginateMixin],
  data() {
    return {
      records: [],
      loading: true,
      chartData: {},
      chartOptions: {}
    }
  },
  async mounted() {    
    const categories = await this.$store.dispatch('fetchCategories');
    this.records = await this.$store.dispatch('fetchRecords');

    this.records = this.records.map(record => {
      return {
        ...record,
        categoryTitle: record.categoryTitle,
        typeTitle: record.type.replace(/^./, match => match.toUpperCase()),
        typeClass: record.type === 'outcome' ? 'red lighten-2' : 'green lighten-2'
      }
    });

    this.setupChart(categories);
    this.setupPaginate(this.records);

    this.loading = false;
  },
  methods: {
    setupChart(categories) {
      const spendByCategories = categories.map(category => {
        return this.records.reduce((total, record) => {
          if (record.categoryID === category.id && record.type === 'outcome') {
            total += record.amount;
          }
            return total;
        }, 0);
      });

      this.chartData = {
        labels: categories.map(category => category.title),
        datasets: [{data: spendByCategories}]
      };

      this.chartOptions = {
        plugins: {
          tooltip: {
            callbacks: {
              label: tooltipItem => this.$currencyFilter(tooltipItem.formattedValue)
            },
          },
        },
      }
    }
  },
  components: {
    HistoryRecords,
    PieChart
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