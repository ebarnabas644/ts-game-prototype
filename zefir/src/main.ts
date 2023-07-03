import './assets/main.css'

import { VueElement, createApp } from 'vue'
import { createPinia, storeToRefs } from 'pinia'
import { piniaPlugin } from './piniaPlugin'
import { usePlayerStatStore } from './stores/counter'

import App from './App.vue'
import router from './router'

export const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(piniaPlugin)
app.use(router)

app.mount('#app')
function emitCustomEvent(eventName: string, payload: any) {
    const event = new CustomEvent(eventName, { detail: payload });
    document.dispatchEvent(event);
  }

const testStore = usePlayerStatStore()
emitCustomEvent('storeReady', testStore)
window.myStore = testStore