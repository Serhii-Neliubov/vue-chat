import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import vue3GoogleLogin from 'vue3-google-login'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia);
app.use(router);
app.use(vue3GoogleLogin, {
  clientId: '',
});

pinia.use(piniaPluginPersistedState);

app.mount('#app')
