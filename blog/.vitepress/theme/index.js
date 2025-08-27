import ArticleCard from "./components/ArticleCard.vue";
import DefaultTheme from "vitepress/theme";
import './custom.css';
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'

const vuetify = createVuetify({ components });

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        ctx.app.component('ArticleCard', ArticleCard);
        ctx.app.use(vuetify);
    }
}