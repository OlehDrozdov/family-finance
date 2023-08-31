<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>
      <form>
        <div class="input-field">
          <select ref="select">
            <option >title</option>
          </select>
          <label>SelectCategory</label>
        </div>
        <div class="input-field">
          <input
            id="name"
            type="text"
          >
          <label for="name">Title</label>
          <span
            class="helper-text invalid"
          >Message_CategoryTitle</span>
        </div>
        <div class="input-field">
          <input
            id="limit"
            type="number"
          >
          <label for="limit">Limit</label>
          <span
            class="helper-text invalid"
          >Message_MinLength</span>
        </div>
        <button class="btn" type="submit">
          Update
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>