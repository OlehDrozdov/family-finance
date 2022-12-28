<template>
  <form class="card auth-card">
    <div class="card-content">
      <a href="https://creativesociety.com/" target="_blank">
        <img alt="creative-society-logo" src="@/assets/cs-logo-gold.svg" style="width: 40px; float: right" />
      </a>
      <span class="card-title center">Sign in</span>
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