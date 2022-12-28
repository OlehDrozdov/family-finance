<template>
  <form class="card auth-card">
    <div class="card-content">
      <img alt="creative-society-logo" src="@/assets/cs-logo-gold.svg" style="width: 40px; float: right" />
      <span class="card-title center">Sign Up</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
        >Email error message</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
        >
        <label for="password">Password</label>
        <small
          class="helper-text invalid"
        >Password error message</small>
      </div>
      <div>
        <label>
          <input
            class="filled-in checkbox-orange"
            type="checkbox"
          >
          <span>I agree with Terms Conditions and Privacy Policy</span>
          <br />
          <small
            class="helper-text invalid"
          >Checkbox error message</small>
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