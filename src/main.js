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
        },
        {
            path: '/protected',
            name: 'protected',
            component: () => import('./views/Protected.vue')
        }
    ]
})

// Simple password protection for /protected route
const PROTECTED_PASSWORD = import.meta.env.VITE_PROTECTED_PASSWORD; 

router.beforeEach((to, from, next) => {
    if (to.name === 'protected') {
        const entered = window.prompt('Enter password to access this page:');
        if (entered === PROTECTED_PASSWORD) {
            next();
        } else {
            alert('Incorrect password!');
            next(false);
        }
    } else {
        next();
    }
});

app.use(vuetify).use(router)

app.mount('#app')
