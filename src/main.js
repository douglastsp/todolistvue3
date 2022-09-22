import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import store from './store'
import Notifications from 'notiwind'

createApp(App)
    .use(store)
    .use(router)
    .use(Notifications)
    .mount('#app')
