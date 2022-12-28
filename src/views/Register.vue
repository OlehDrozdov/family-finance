<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <img alt="creative-society-logo" src="@/assets/cs-logo-gold.svg" style="width: 40px; float: right" />
      <span class="card-title center">Sign Up</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model="email"
          :class="{invalid: v$.email.$error}"
        >
        <label for="email">Email</label>
        <small
          v-if="v$.email.$error"
          class="helper-text invalid"
        >
          {{ v$.email.$errors[0].$message }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="name"
          :class="{invalid: v$.name.$error}"
        >
        <label for="name">Name</label>
        <small
          v-if="v$.name.$error"
          class="helper-text invalid"
        >
          {{ v$.name.$errors[0].$message }}
        </small>
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
        >
          {{ v$.password.$errors[0].$message }}
        </small>
      </div>
      <div>
        <label>
          <input
            class="filled-in"
            type="checkbox"
            v-model="terms"
          >
          <span>I agree with the Terms Conditions and the Privacy Policy</span>
          <div
            v-if="v$.terms.$error"
            class="helper-text invalid"
          >
            Please confirm that you agree to the Terms and Conditions and the Privacy Policy
          </div>
        </label>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Register
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">Have account?
        <router-link to="login"> Sign in</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

export default {
  name: 'register',
  data() {
    return {
      v$: useVuelidate(),
      email: '',
      name: '',
      password: '',
      terms: false      
    }
  },
  validations() {
    return {
      email: { required, email },
      name: { required, minLength: minLength(3) },
      password: { required, minLength: minLength(8) },
      terms: {
        sameAs: sameAs(true) 
      }
    }
  },
  methods: {
    async onSubmit() {
      const result = await this.v$.$validate();
      
      if (!result) {
        return;
      } 
      
      this.$router.push('/login');
    }
  }
}
</script>