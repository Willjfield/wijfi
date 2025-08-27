---
layout: home

hero:
  name: "Will Field"
  text: "Geospatial Blog"
  tagline: My professional work and experiments in GIS
---

<v-container>
  <v-row no-gutters>
    <v-col :cols="cols" v-for="article in articles.filter(a => a.published)">
      <ArticleCard
      :title="article.title"
      :excerpt="article.excerpt"
      :image="article.image"
      :href="article.href"
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

const { name } = useDisplay()

  const cols = computed(() => {
    // name is reactive and
    // must use .value
    switch (name.value) {
      case 'xs': return 12
      case 'sm': return 12
      case 'md': return 4
      case 'lg': return 3
      case 'xl': return 3
      case 'xxl': return 3
    }

    return undefined
  })
</script>