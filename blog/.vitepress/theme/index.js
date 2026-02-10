import ArticleCard from "./components/ArticleCard.vue";
import DefaultTheme from "vitepress/theme";
import './custom.css';
import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'

const vuetify = createVuetify({ components });

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        // Import Vuetify styles only on client side
        if (typeof window !== 'undefined') {
            import("vuetify/styles");
        }
        ctx.app.component('ArticleCard', ArticleCard);
        ctx.app.use(vuetify);
    }
}