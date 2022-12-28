import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

let app = createApp(App);

app.use(store);
app.use(router);

app.config.globalProperties.$filters = {
  dateFilter
}

app.mount('#app');
