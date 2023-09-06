<template>
  <div>
    <div class="page-title">
      <h3>ProfileTitle</h3>
    </div>

    <form class="form">
      <div class="input-field">
        <input
          id="description"
          type="text"
        >
        <label for="description">Name</label>
        <small
          class="helper-text invalid"
        >Message_EnterName</small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox">
          <span class="lever"></span>
          Українська
        </label>
      </div>

      <button class="btn" type="submit">
        Update
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'user-profile'
}
</script>