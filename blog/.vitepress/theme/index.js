import ArticleCard from "./components/ArticleCard.vue";
// Load VitePress default theme (includes its CSS) before Vuetify so nav/buttons get styled
import DefaultTheme from "vitepress/theme";
// Ensure VitePress default theme styles load (nav, buttons, etc.)
import "vitepress/dist/client/theme-default/styles/vars.css";
import "vitepress/dist/client/theme-default/styles/base.css";
import "vitepress/dist/client/theme-default/styles/icons.css";
import "vitepress/dist/client/theme-default/styles/utils.css";
import Layout from "./Layout.vue";
import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import "vuetify/styles";
import "vuetify/lib/styles/main.css";
import './custom.css';

const vuetify = createVuetify({ 
  components,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
  },
});

export default {
    ...DefaultTheme,
    Layout,
    enhanceApp(ctx) {
        // Call DefaultTheme's enhanceApp if it exists
        if (DefaultTheme.enhanceApp) {
            DefaultTheme.enhanceApp(ctx);
        }
        ctx.app.component('ArticleCard', ArticleCard);
        ctx.app.use(vuetify);
    }
}