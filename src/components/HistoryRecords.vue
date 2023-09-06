<template>
  <table class="striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Category</th>
        <th>Type</th>
        <th>Open</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, index) in records" :key="record.id">
        <td>{{ index + 1 }}</td>
        <td>{{ $currencyFilter(record.amount) }}</td>
        <td>{{ $dateFilter(record.date) }}</td>
        <td>{{ record.categoryTitle }}</td>
        <td>
          <span class="white-text badge" :class="record.typeClass">{{ record.typeTitle }}</span>
        </td>
        <td>
          <button 
            v-tooltip="'Open record details'"
            class="btn-small btn modal-trigger" 
            data-target="modal"
            @click="showDetails(record)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <Modal
    title="Record details"
    :content="modalContent"
    :color="modalColor"
  />
</template>

<script>
import Modal from '@/components/Modal';

export default {
  props: {
    records: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      modalContent: {},
      modalColor: ''
    }
  },
  methods: {
    showDetails(record) {
      this.modalContent = {
        Category: record.categoryTitle,
        Amount: this.$currencyFilter(record.amount),
        Description: record.description,
        Date: this.$dateFilter(record.date, 'fulltime')
      };
      this.modalColor = record.typeClass;
    }
  },
  components: {
    Modal
  }
}
</script>

<style lang="scss">
.badge {
  min-width: 75px !important;
}
</style>