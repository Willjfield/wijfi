<template>
  <v-dialog :max-width="$vuetify.display.mdAndUp ? '60vw' : '95vw'" width="auto" v-model="modal" :retain-focus="false">
    <v-card role="dialog" :aria-modal="true" :aria-labelledby="titleId" :aria-describedby="descId">
      <v-card-actions>
        <v-card-title :id="titleId" :color="theme.global.current.colors.text" tabindex="-1"> <a :color="theme.global.current.colors.text" class="external-link" :href="this.project.link">{{ project.title }}</a></v-card-title>
        <v-btn icon="mdi-close" class="close-modal-x" :color="theme.global.current.colors.linkText" @click="closeModal" :aria-label="`Close ${project.title} details`"></v-btn>
      </v-card-actions>

      <v-card-text class="py-0" :id="descId">
        {{ project.summary }}
        <br>
        <v-card-actions>
          <v-btn :color="theme.global.current.colors.linkText" prepend-icon="mdi-link" block :href="this.project.link">Visit {{ project.title }}</v-btn>
        </v-card-actions>
        <br>
        <div class="img-container">
          <v-row>
            <v-col v-for="(thumbnail, index) in this.project.thumbnails" :key="index">
              <v-img class="project-images" :src="thumbnail.path" :alt="thumbnail.alt" cover aspect-ratio="1" />
            </v-col>
          </v-row>
        </div>
        <v-divider></v-divider>
        <br>
        Employer/Client: {{ project.employer }} |
        Role: {{ project.role }}
      </v-card-text>
      <v-card-actions>
        <v-btn :color="theme.global.current.colors.linkText" block @click="closeModal">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <button ref="focusGuard" class="visually-hidden">focus-guard</button>
</template>
<script>
import { inject } from 'vue';
import { useTheme } from 'vuetify';
import projects from './assets/projects.json';

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function findProjectBySlug(slug) {
  const active = projects.filter((p) => p.active);
  return active.find((p) => titleToSlug(p.title) === slug) ?? null;
}

export default {
  name: 'Modal',
  data() {
    return {
      modal: false,
      project: {},
      mitt: inject('mitt'),
      previouslyFocusedElement: null,
      titleId: 'modal-title',
      descId: 'modal-desc',
      theme: useTheme()
    };
  },
  mounted() {
    this.mitt.on('open-modal', (project) => {
      this.openWithProject(project);
      const slug = titleToSlug(project.title);
      if (window.history.replaceState) {
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${slug}`);
      } else {
        window.location.hash = slug;
      }
    });

    const hash = window.location.hash.slice(1);
    if (hash) {
      const project = findProjectBySlug(hash);
      if (project) {
        this.$nextTick(() => this.openWithProject(project));
      }
    }
  },
  methods: {
    openWithProject(project) {
      this.project = project;
      this.previouslyFocusedElement = document.activeElement;
      this.modal = true;
      this.$nextTick(() => {
        const titleEl = document.getElementById(this.titleId);
        if (titleEl) titleEl.focus();
      });
    },
    closeModal() {
      this.modal = false;
    }
  },
  watch: {
    modal(val) {
      if (!val) {
        if (window.history.replaceState) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        } else {
          window.location.hash = '';
        }
        this.mitt.emit('close-modal');
        if (this.previouslyFocusedElement && this.previouslyFocusedElement.focus) {
          this.previouslyFocusedElement.focus();
        }
      }
    }
  }
};
</script>
<style scoped>
.close-modal-x {
  margin: -8px -8px 0px 0px;
  font-size: x-large;
  font-family: sans-serif;
}

.img-container {
  display: block;
}

.project-images {
  /* max-width: 100%;
  max-height: 50%; */
  margin: 0 auto;
  box-shadow: 1px 1px 10px 1px rgb(var(--v-theme-dropShadow));
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>