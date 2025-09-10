import { createApp, nextTick } from 'vue'
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
            component: () => import('./views/Home.vue'),
            meta: { title: 'Home' }
        },
        {
            path: '/SOMAPest',
            name: 'somapest',
            component: () => import('./views/SOMAPest.vue'),
            meta: { title: 'SOMA Pest' }
        },
        {
            path: '/protected',
            name: 'protected',
            component: () => import('./views/Protected.vue'),
            meta: { title: 'Protected' }
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

router.afterEach(async (to) => {
    const titleBase = 'Will J Field';
    const routeTitle = to.meta && to.meta.title ? ` - ${to.meta.title}` : '';
    document.title = `${titleBase}${routeTitle}`;
    await nextTick();
    const mainEl = document.getElementById('main');
    if (mainEl) {
        //mainEl.focus();
    }
    const announcer = document.getElementById('sr-announcer');
    if (announcer) {
        announcer.textContent = `Navigated to ${document.title}`;
    }
});

app.use(vuetify).use(router)

app.mount('#app')
