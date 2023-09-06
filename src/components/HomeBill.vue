<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">BillCurrency</span>
        <p 
          v-for="currency in currencies"
          :key="currency"
          class="currency-line">
          <span>{{ $currencyFilter(getCurrency(currency), currency) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data() {
    return {
      currencies: ['USD', 'UAH', 'EUR']      
    }
  },
  computed: {
    base() {      
      return this.$store.getters.info.bill / (this.rates['USD'] / this.rates['EUR']);
    }
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    }
  }
}
</script>