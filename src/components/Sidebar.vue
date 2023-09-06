<template>
  <ul 
    class="sidenav app-sidenav"
    :class="{open: modelValue}"
  >
    <li
      v-for='link in links'
      :key="link.url"
      class="pointer"
    >
      <router-link
        active-class="active amber lighten-2"
        :to="link.url"
        :exact="link.exact"
      > 
        {{ link.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'sidebar-component',
  props: {
    modelValue: {
      type: Boolean
    }
  },  
  data() {
    return {
      links: [
        { title: 'Bill', url: '/', exact: true },
        { title: 'History', url: '/history', exact: true },
        { title: 'Planning', url: '/planning' },
        { title: 'Record', url: '/record' },
        { title: 'Categories', url: '/categories' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  background-color: silver;
}
</style>