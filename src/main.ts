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
  clientId: '381898443881-a9fd2mbpuh62u3j3p00hqp1h6nniscfu.apps.googleusercontent.com',
});

pinia.use(piniaPluginPersistedState);

app.mount('#app')
