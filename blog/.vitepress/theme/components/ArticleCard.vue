<template>
<v-card class="article-card">
    <a :href="href" class="article-card-link">
        <div class="article-card-inner">
            <v-img class="article-card-img" :src="image" :alt="title" />
            <div class="article-card-content">
                <h3 class="article-card-title">{{ title }}</h3>
                <small class="article-card-date">{{ date }}</small>
                <p class="article-card-excerpt">{{ excerpt }}</p>
            </div>
        </div>
    </a>
</v-card>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        href: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.article-card {
  height: 100%;
  margin: 0.5rem;
}

.article-card-link {
  display: flex;
  width: 100%;
  padding: 0.75rem;
  border: 2px solid transparent;
  border-radius: 1rem;
  text-decoration: none;
  color: inherit;
  box-sizing: border-box;
}

.article-card-link:hover {
  border-color: var(--vp-c-brand);
}

.article-card-inner {
  display: flex;
  width: 100%;
  gap: 0.75rem;
  align-items: flex-start;
}

.article-card-img {
  flex-shrink: 0;
  width: 15rem;
        height: 12rem;
  border-radius: 0.5rem;
  border: 2px solid var(--vp-c-divider);
  overflow: hidden;
  position: relative;
}

/* Override Vuetify v-img's v-responsive: remove aspect-ratio padding that pushes content down */
.article-card-img :deep(.v-responsive) {
  position: absolute !important;
  inset: 0 !important;
  padding-bottom: 0 !important;
  height: 100% !important;
}
.article-card-img :deep(.v-responsive__sizer) {
  padding-bottom: 0 !important;
  height: 0 !important;
}
.article-card-img :deep(.v-responsive__content) {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
}
.article-card-img :deep(img) {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

@media (min-width: 960px) {
  .article-card-img {
    width: 15rem;
        height: 12rem;
  }
}

.article-card-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.article-card-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
}

.article-card-date {
  font-size: 0.8rem;
  opacity: 0.8;
}

.article-card-excerpt {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>