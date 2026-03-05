---
layout: home

hero:
  name: "Will Field"
  text: "Geospatial Blog"
  tagline: My professional work and experiments in GIS
---

<v-container class="article-grid">
  <v-row no-gutters>
    <v-col :cols="cols" v-for="article in articles.filter(a => a.published)" :key="article.href">
      <ArticleCard
      :title="article.title"
      :excerpt="article.excerpt"
      :image="`${basePath}${article.image}`"
      :href="`${basePath}${article.href}`"
      :date="article.date"
      />
    </v-col>
  </v-row>
</v-container>


<script setup>
import ArticleCard from '../blog/.vitepress/theme/components/ArticleCard.vue'
import { articles } from '../blog/articles/articles-config.json'
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

// Use VitePress base path (not full URL) so the router can handle client-side navigation
const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || ''
const { name } = useDisplay()

  const cols = computed(() => {
    switch (name.value) {
      case 'xs': return 12
      case 'sm': return 12
      case 'md': return 4   // 3 columns
      case 'lg': return 4   // 3 columns
      case 'xl': return 4   // 3 columns
      case 'xxl': return 4  // 3 columns
    }
    return 12
  })
</script>