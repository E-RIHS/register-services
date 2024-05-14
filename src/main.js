//import './assets/main.css'
import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
//import router from './router'
import PrimeVue from 'primevue/config'

import Lara from './presets/lara'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
//app.use(router)
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara
})

app.mount('#app')
