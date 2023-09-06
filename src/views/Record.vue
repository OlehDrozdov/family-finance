<template>
  <div>
    <div class="page-title">
      <h3>New record</h3>
    </div>

    <Loader v-if="loading" />

    <form class="form" v-else-if="categories.length" @submit.prevent="onSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
        </select>
        <label>SelectCategory</label>
      </div>

      <p>
        <label>
          <input 
            class="with-gap" 
            name="type" 
            type="radio" 
            value="income"
            v-model="type"
          >
          <span>Income</span>
        </label>
      </p>

      <p>
        <label>
          <input 
            class="with-gap" 
            name="type" 
            type="radio" 
            value="outcome"
            v-model="type"
          >
          <span>Outcome</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: v$.amount.$error}"
        >
        <label for="amount">Amount</label>
        <span
          v-if="v$.amount.$error"
          class="helper-text invalid"
        >
          Minimum amount is {{ v$.amount.minValue.$params.min }}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: v$.description.$error}"
        >
        <label for="description">Description</label>
        <span
          v-if="v$.description.$error"
          class="helper-text invalid"
        >
          Enter description
        </span>
      </div>

      <button class="btn" type="submit">
        Create
        <i class="material-icons right">send</i>
      </button>
    </form>

    <p class="center" v-else>
      No categories
      <router-link to="/categories">Add first</router-link>
    </p>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { mapGetters } from 'vuex'
import M from 'materialize-css';
import messages from '@/utils/messages'

export default {
  name: 'record-component',
  data() {
    return {
      categories: [],
      category: null,
      select: null,
      loading: true,
      type: 'outcome',
      v$: useVuelidate(),
      amount: 1,
      description: ''
    }
  },
  validations() {
    return {      
      amount: { 
        required, 
        minValue: minValue(1)
      },
      description: { required }
    }
  },
  computed: {
    ...mapGetters(['info']),
    createRecordCheck() {
      if (this.type === 'income') {
        return true;
      }

      return this.info.bill >= this.amount;
    }
  },
  methods: {
    async onSubmit() {
      const result = await this.v$.$validate();

      if (!result) return;

      if (this.createRecordCheck) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryID: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toLocaleString()
          });

          const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount;

          await this.$store.dispatch('updateInfo', {bill});
          
          this.amount = 1;
          this.description = '';
          this.v$.$reset();

          this.$successNotification(messages['record/create']);
        } catch (error) {          
          this.$errorNotification(messages[error]);
        }
      } else {
        this.$errorNotification(
          `${messages['record/not-enough-funds']} (${this.$currencyFilter(this.amount - this.info.bill)})`
        );
      }
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
  },
  updated() {
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