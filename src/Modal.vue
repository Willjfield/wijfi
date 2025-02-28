<template>
  <v-dialog :max-width="$vuetify.display.mdAndUp ? '60vw' : '95vw'" width="auto" v-model="modal">
    <v-card>
      <v-card-actions>
        <v-card-title> <a class="external-link" :href="this.project.link">{{ project.title }}</a></v-card-title>
        <v-btn icon="mdi-close" class="close-modal-x" color="primary" @click="modal = false"></v-btn>
      </v-card-actions>

      <v-card-text class="py-0">
        {{ project.summary }}
        <br>
        <v-card-actions>
          <v-btn color="primary" prepend-icon="mdi-link" block :href="this.project.link">Visit {{ project.title }}</v-btn>
        </v-card-actions>
        <br>
        <div class="img-container">
          <v-row>
            <v-col v-for="(thumbnail, index) in this.project.thumbnails">
              <v-img class="project-images" :src="thumbnail" cover aspect-ratio="1" />
            </v-col>
          </v-row>
        </div>
        <v-divider></v-divider>
        <br>
        <!-- <a target="_blank" class="external-link" :href="this.project.link">Link</a> | -->
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
}

.project-images {
  /* max-width: 100%;
  max-height: 50%; */
  margin: 0 auto;
  box-shadow: 1px 1px 10px 1px #9d9d9d;
}
</style>