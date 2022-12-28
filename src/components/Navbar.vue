<template>
  <nav class="navbar light-blue lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click="$emit('toggle')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ $filters.dateFilter(date, 'date time') }}</span>
        
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a 
            href="#"
            class="dropdown-trigger black-text"  
            data-target="dropdown" 
            ref="dropdown"
          >
            name
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>
                ProfileTitle
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a 
                href="#" 
                class="black-text"
                @click.prevent="logout"
              >
                <i class="material-icons">assignment_return</i>
                Exit
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
// import M from 'materialize-css'

export default {
  data() {
    return {
      date: Date.now(),
      dateInterval: null,
      dropdown: null
    }
  },
  computed: {

  },
  methods: {
    logout() {
      this.$router.push('/login?message=')
    }
  },
  mounted() {
    this.dateInterval = setInterval(() => {
      this.date = Date.now();
    }, 1000)

    // eslint-disable-next-line no-undef
    this.drepdown = M.Dropdown.init(this.$refs.dropdown, {coverTrigger: true, constrainWidth: false});
  },
  beforeUnmount() {
    clearInterval(this.dateInterval);

    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar-left a {
    text-decoration: none;
  }

  .dropdown-content {
    top: 0 !important;
    margin-top: 15px;
  }
</style>
