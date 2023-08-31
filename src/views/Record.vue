<template>
  <div>
    <div class="page-title">
      <h3>Menu_NewRecord</h3>
    </div>

    <p class="center">
      NoCategories
      <router-link to="/categories">AddFirst</router-link>
    </p>

    <form class="form">
      <div class="input-field">
        <select ref="select">
          <option>c.title</option>
        </select>
        <label>SelectCategory</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income">
          <span>Income</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome">
          <span>Outcome</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
        >
        <label for="amount">Amount</label>
        <span
          class="helper-text invalid"
        >Message_MinLength</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
        >
        <label for="description">Description</label>
        <span
          class="helper-text invalid"
        >Message_EnterDescription</span>
      </div>

      <button class="btn" type="submit">
        Create
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>