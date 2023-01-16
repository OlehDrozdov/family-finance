<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <a href="https://creativesociety.com/" target="_blank">
        <img alt="creative-society-logo" src="@/assets/cs-logo-gold.svg" style="width: 40px; float: right" />
      </a>
      <span class="card-title center">Sign in</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: v$.email.$error}"
        >
        <label for="email">Email</label>
        <small 
          v-if="v$.email.$error"
          class="helper-text invalid"
        >{{ v$.email.$errors[0].$message }}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: v$.password.$error}"
        >
        <label for="password">Password</label>
        <small
          v-if="v$.password.$error"
          class="helper-text invalid"
        >{{ v$.password.$errors[0].$message }}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Login
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">Don't have account?
        <router-link to="register"> Sign Up</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import messages from '@/utils/messages'

export default {
  name: 'login',
  data() {
    return {
      v$: useVuelidate(),
      email: '',
      password: ''
    }
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(8) }
    }
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$notification(messages[this.$route.query.message]);
    }
  },
  methods: {
    async onSubmit() {
      const result = await this.v$.$validate();

      if (!result) {
        return;
      } 

      const formData = {
        email: this.email,
        password: this.password
      }
      
      await this.$store.dispatch('login', formData);
      this.$router.push('/');
    }
  }
}
</script>