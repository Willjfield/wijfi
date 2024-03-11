import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import mitt from 'mitt';
import './style.css';
const emitter = mitt();

const app = createApp(App)
app.provide('mitt', emitter)
app.use(vuetify)

app.mount('#app')
