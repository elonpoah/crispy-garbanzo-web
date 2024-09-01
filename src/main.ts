import 'amfe-flexible'
import './assets/css/main.css'

import { createApp } from 'vue'
import store from './stores'
import i18n from './i18n'
import App from './App.vue'
import router from './router'
import { VueClipboard } from '@soerenmartius/vue3-clipboard'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(i18n)
app.use(store)
app.use(router)
app.use(VueClipboard)

app.mount('#app')
