<template>
  <div>
    <div class="page-title">
      <h3>Bill</h3>
      <button class="btn waves-effect waves-teal btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader />
    <div class="row">
      <HomeBill />
      <HomeCurrency />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  components: {
    HomeBill,
    HomeCurrency
  }
}
</script>