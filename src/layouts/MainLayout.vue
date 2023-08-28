<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @toggle="isSidebarOpen = !isSidebarOpen" />
      <Sidebar v-model="isSidebarOpen" />

      <main 
        class="app-content"
        :class="{full: !isSidebarOpen}"
      >
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link to="/record" class="btn-floating btn-large">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'main-layout',
  data() {
    return {
      isSidebarOpen: true,
      loading: true
    }
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
    }

    this.loading = false;
  },
  components: {
    Navbar,
    Sidebar
  }
}
</script>
