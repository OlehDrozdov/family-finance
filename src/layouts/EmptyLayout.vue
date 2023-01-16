<template>
  <div class="blue-grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from '@/utils/messages'

export default {
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(firebaseError) {
      this.$errorNotification(messages[firebaseError.code] || 'Something went wrong.');
    }
  }
}
</script>