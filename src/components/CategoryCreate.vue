<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Create</h4>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <input
            id="title"
            type="text"
            v-model="title"
            :class="{invalid: v$.title.$error}"
          >
          <label for="title">Title</label>
          <span 
            v-if="v$.title.$error"
            class="helper-text invalid"
          >
            Enter category title
          </span>
        </div>
        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: v$.limit.error}"
          >
          <label for="limit">Limit</label>
          <span
            v-if="v$.limit.$error"
            class="helper-text invalid"
          >
            Mimumum category limit is {{ v$.limit.minValue.$params.min }}
          </span>
        </div>
        <button class="btn" type="submit">
          Create
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import messages from '@/utils/messages'
import M from 'materialize-css'

export default {
  data() {
    return {
      v$: useVuelidate(),
      title: '',
      limit: 10
    }
  },
  validations() {
    return {
      title: { required },
      limit: { minValue: minValue(10) }
    }
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    async onSubmit() {
      const result = await this.v$.$validate();

      if (!result) return;

      const formData = {
        title: this.title,
        limit: this.limit
      }

      try {
        const category = await this.$store.dispatch('createCategory', formData);
        this.title = '';
        this.limit = 10;
        this.v$.$reset();
        
        this.$successNotification(messages['category/create']);
        this.$emit('created', category);
      } catch (error) {
        this.$errorNotification(messages[error]);
      }
    }
  }
}
</script>