import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import notificationPlugin from '@/utils/notification.plugin'
import tooltipDirective from './directives/tooltip.directive'
import Loader from '@/components/Loader'
import Paginate from "vuejs-paginate-next"
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

initializeApp({
  apiKey: "AIzaSyCKQuCbe4NDxf3ZZbeFYJ9mYgeDcUUqaTs",
  authDomain: "family-finance-4af69.firebaseapp.com",
  projectId: "family-finance-4af69",
  storageBucket: "family-finance-4af69.appspot.com",
  messagingSenderId: "991128369174",
  appId: "1:991128369174:web:29a0dcb041191b47331d37",
  measurementId: "G-V4MC633Y3D"
});

let app;

const auth = getAuth();
onAuthStateChanged(auth, () => {

  if (!app) {
    app = createApp(App);

    app.use(store);
    app.use(router);
    app.use(dateFilter);
    app.use(currencyFilter);
    app.use(notificationPlugin);
    app.directive('tooltip', tooltipDirective);
    app.component('Loader', Loader);
    app.component('Paginate', Paginate);

    app.mount('#app');
  }
});