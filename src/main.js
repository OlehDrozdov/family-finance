import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import notificationPlugin from '@/utils/notification.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import { initializeApp } from "firebase/app";

initializeApp({
  apiKey: "AIzaSyCKQuCbe4NDxf3ZZbeFYJ9mYgeDcUUqaTs",
  authDomain: "family-finance-4af69.firebaseapp.com",
  projectId: "family-finance-4af69",
  storageBucket: "family-finance-4af69.appspot.com",
  messagingSenderId: "991128369174",
  appId: "1:991128369174:web:29a0dcb041191b47331d37",
  measurementId: "G-V4MC633Y3D"
});

let app = createApp(App);

app.use(store);
app.use(router);
app.use(dateFilter);
app.use(notificationPlugin);

app.mount('#app');
