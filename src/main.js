import { createApp } from 'vue'
import router from '@/router'
import { createPinia } from 'pinia'
import './app.css'
import App from './App.vue'

const app = createApp(App)

app.use(router).use(createPinia())

app.mount('#app')
