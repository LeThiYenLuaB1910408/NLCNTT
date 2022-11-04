import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'popper.js/dist/popper.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
// import './assets/style.scss';
import router from './router';
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';
import { createPinia } from 'pinia';
const pinia = createPinia()
createApp(App).use(VCalendar, {}).use(router).use(pinia).mount('#app')

