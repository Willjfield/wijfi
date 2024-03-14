
<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-title>
        <h2>Will J Field</h2>
      </v-app-bar-title>
      <template v-slot:append>
        <v-btn href="mailto:wijfi@protonmail.com">
          <v-icon>mdi-email</v-icon> 
          <span class="email-address">wijfi@protonmail.com</span>
        </v-btn>
        <v-btn href="https://github.com/willjfield" target="_blank">
          <v-icon>mdi-github</v-icon>
        </v-btn>
        <v-btn href="https://fosstodon.org/@Wijfi" target="_blank">
          <v-icon>mdi-mastodon</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <h1 class="section-headers">Projects</h1>
      <v-divider></v-divider>
      <v-container>
       
        <v-row no-gutters>
          <v-col cols="12" lg="3" md="4" sm="12" v-for="(project, index) in projects" :key="project.title">
                <ProjectThumb class="pa-2 ma-2" :project="project" />
          </v-col>
        </v-row>
      </v-container>
      <h1 class="section-headers">Talks and Papers</h1>
      <v-divider></v-divider>
      <v-container>
        <Talks/>
      </v-container>
      <h1 class="section-headers">Teaching</h1>
      <v-divider></v-divider>
      <v-container>
        <Teaching/>
      </v-container>
      <Modal />
    </v-main>
  </v-app>
</template>
<script>
import projects from './assets/projects.json';
import ProjectThumb from './ProjectThumb.vue';
import Talks from './Talks.vue';
import Teaching from './Teaching.vue';
import Modal from './Modal.vue';
export default {
  name: 'App',
  components: {
    ProjectThumb,
    Modal,
    Talks,
    Teaching
  },
  data: () => ({
    projects
  }),
  mounted() {}
}
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.email-address{
  text-transform: none;
  font-size: small;
}

.section-headers{
  text-align: justify;
  font-weight: 100;
  margin-left: 24px;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
