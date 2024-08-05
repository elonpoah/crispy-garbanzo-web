import 'amfe-flexible'
import './assets/css/main.css'

import { createApp } from 'vue'
import store from "./stores";
import App from './App.vue'
import router from './router'
import "virtual:svg-icons-register";

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
