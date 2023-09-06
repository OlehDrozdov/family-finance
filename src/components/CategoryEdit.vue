<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
          <label>Select category</label>
        </div>
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
            :class="{invalid: v$.limit.$error}"
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
          Update
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import M from 'materialize-css';
import messages from '@/utils/messages'

export default {
  name: 'category-edit',
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      select: null,
      current: null,
      v$: useVuelidate(),
      title: '',
      limit: 10
    }
  },
  validations() {
    return {
      title: { required },
      limit: { required, minValue: minValue(10) }
    }
  },
  watch: {
    current(categoryID) {
      const {title, limit} = this.categories.find(category => category.id === categoryID);
      this.title = title;
      this.limit = limit;
    }
  },
  methods: {
    async onSubmit() {
      const result = await this.v$.$validate();

      if (!result) return;

      const categoryData = {
        id: this.current,
        title: this.title,
        limit: this.limit
      }

      try {
        await this.$store.dispatch('updateCategory', categoryData);
        
        this.$successNotification(messages['category/update']);
        this.$emit('updated', categoryData);
      } catch (error) {
        this.$errorNotification(messages[error]);
      }
    }
  },
  created() {
    const {id, title, limit} = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    M.updateTextFields();
    M.FormSelect.init(this.$refs.select);
  },
  beforeUnmount() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
}
</script>