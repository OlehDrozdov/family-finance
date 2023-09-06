<template>
  <div>
    <div class="page-title">
      <h3>Planning</h3>
      <h4>{{ $currencyFilter(info.bill) }}</h4>
    </div>

    <Loader v-if="loading" />

    <section v-else-if="categories.length">
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{ category.title }}</strong>
          {{ $currencyFilter(category.spend) }} of {{ $currencyFilter(category.limit) }}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div
            class="determinate"
            :class="[category.progressColor]"
            :style="{width: `${category.progress}%`}"
          ></div>
        </div>
      </div>
    </section>

    <p v-else class="center">
      No categories.
      <router-link to="/categories">Add first</router-link>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import messages from '@/utils/messages'

export default {
  name: 'planning-component',
  data() {
    return {
      categories: [],
      records: [],
      loading: true
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const categories = await this.$store.dispatch('fetchCategories');
    const records = await this.$store.dispatch('fetchRecords');

    this.categories = categories.map((category) => {
      const spend = records
        .filter(record => record.categoryID === category.id)
        .filter(record => record.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount
        }, 0);

      const progress = (spend / category.limit * 100) > 100 ? 100 : (spend / category.limit * 100);
      const progressColor = progress >= 85 ? 'red' : progress >= 65 ? 'yellow' : 'green';
      const tooltip = `
        ${category.limit - spend < 0 ? messages['planning/exceeded'] : messages['planning/left']} 
        ${this.$currencyFilter(Math.abs(category.limit - spend))}
      `;

      return {
        ...category,
        spend,
        progress,
        progressColor,
        tooltip
      }
    });

    this.loading = false;
  }
}
</script>