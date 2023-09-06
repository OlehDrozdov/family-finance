<template>
  <div class="col s12 m6 l8">
    <div class="card amber lighten-2 bill-card">
      <div class="card-content">
        <div class="card-header">
          <span class="card-title">Currency Title</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>            
            <tr 
              v-for="currency in currencies"
              :key="currency"
            >
              <td>{{ currency }}</td>              
              <td>{{ rates[currency].toFixed(3) }}</td>
              <td>{{ $dateFilter(date, 'date') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-currency',
  props: ['rates', 'date'],
  data() {
    return {
      currencies: ['USD', 'UAH', 'EUR']
    }
  }
}
</script>

<style lang="scss" scoped>
</style>