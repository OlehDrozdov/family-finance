<template>
  <div id="modal" class="modal">
    <div class="modal-content">
      <h4>{{ title }}</h4>
      <hr />
      <div class="card" :class="color">
        <div class="card-content white-text">
          <div v-for="(value, key) in content" :key="key">
            <p><strong>{{ key }}:</strong> {{ value }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-close">
      <i class="material-icons">close</i>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css'

export default {
  props: {
    title: String,
    content: Object,
    color: {
      type: String,
      default: 'blue-grey darken-1'
    }
  },
  mounted() {
    const modalElement = document.getElementById('modal');
    M.Modal.init(modalElement);
  }
};
</script>

<style lang="scss">
  #modal {
    border-radius: 5px;

    .card-content {
      line-height: 2rem;
      letter-spacing: 1px;
    }

    .modal-close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 5px;
    }
  }
</style>