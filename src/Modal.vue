<template>
  <v-dialog max-width="700" width="auto" v-model="modal">
    <v-card>
      <v-card-actions>
        <v-btn icon="mdi-close" class="close-modal-x" color="primary" @click="modal = false"></v-btn>
      </v-card-actions>
      <v-card-title> <a class="external-link" :href="this.project.link">{{ project.title }}</a></v-card-title>
      <v-card-text>
        {{ project.summary }}
        <br>
        <v-divider></v-divider>
        <br>
        <div class="img-container">
          <img class="project-image" :src="project.thumbnails[0]">
        </div>
        <v-divider></v-divider>
        <br>
        <a target="_blank" class="external-link" :href="this.project.link">Link</a> |
        Employer/Client: {{ project.employer }} |
        Role: {{ project.role }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="modal = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { inject } from 'vue';
export default {
  name: 'Modal',
  data() {
    return {
      modal: false,
      project: {}
    }
  },
  mounted() {

    const mitt = inject('mitt');
    mitt.on('open-modal', (project) => {
      this.project = project;
      this.modal = true;
    });

  }
}
</script>
<style scoped>
.close-modal-x {
  position: absolute;
  right: 0;
  font-size: x-large;
  font-family: sans-serif;
}

.img-container {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.project-image {
  max-width: 100%;
  max-height: 50%;
  margin: 0 auto;
}
</style>