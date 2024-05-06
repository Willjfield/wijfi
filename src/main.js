import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import vuetify from './plugins/vuetify'
import App from './App.vue'
import mitt from 'mitt';
import './style.css';
const emitter = mitt();

const app = createApp(App)
app.provide('mitt', emitter)

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue')
        },
        {
            path: '/SOMAPest',
            name: 'somapest',
            component: () => import('./views/SOMAPest.vue')
        }
    ]
})

app.use(vuetify).use(router)

app.mount('#app')
