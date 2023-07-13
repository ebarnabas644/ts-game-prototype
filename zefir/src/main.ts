import './assets/main.css'

import { VueElement, createApp } from 'vue'
import { createPinia, storeToRefs } from 'pinia'
import { usePlayerStatStore } from './stores/entity'
import { setStore } from './core/gameState'

import App from './App.vue'
import router from './router'
import { initGame } from './core/gameMain'

export const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
const testStore = usePlayerStatStore()
setStore(testStore)
await initGame()

app.mount('#app')