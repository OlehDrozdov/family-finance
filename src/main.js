import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import notificationPlugin from '@/utils/notification.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

let app = createApp(App);

app.use(store);
app.use(router);
app.use(dateFilter);
app.use(notificationPlugin);

app.mount('#app');
