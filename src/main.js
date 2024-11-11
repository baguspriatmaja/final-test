import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { store } from './components/store';
import '@fortawesome/fontawesome-free/css/all.css'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

const app = createApp(App); 
app.use(router);
app.use(store);
app.mount("#app");