<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-title style="text-align: left; padding-left: 24px;">
        <h2>Will J Field</h2>
      </v-app-bar-title>
      <template v-slot:append>
        <v-btn href="mailto:willjfield@proton.me">
          <v-icon>mdi-email</v-icon>
          <span v-show="$vuetify.display.mdAndUp" class="email-address">willjfield@proton.me</span>
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
      <h1 class="section-headers" :style="{ 'margin-left': $vuetify.display.mdAndUp ? '24px' : '0px', 'text-align': $vuetify.display.mdAndUp ? 'justify' : 'center' }">Projects
      </h1>
      <v-divider></v-divider>
      <v-container>

        <v-row no-gutters>
          <v-col class="d-flex child-flex pa-2" cols="12" lg="3" md="4" sm="12" v-for="(project, index) in projects" :key="project.title">
            <ProjectThumb class="pa-0 ma-0" :project="project" />
          </v-col>
        </v-row>
      </v-container>
      <h1 class="section-headers" :style="{'margin-left': $vuetify.display.mdAndUp ? '24px' : '0px', 'text-align': $vuetify.display.mdAndUp ? 'justify' : 'center' }">Talks &Papers
      </h1>
      <v-divider></v-divider>
      <v-container>
        <Talks />
      </v-container>
      <h1 class="section-headers" :style="{ 'margin-left': $vuetify.display.mdAndUp ? '24px' : '0px', 'text-align': $vuetify.display.mdAndUp ? 'justify' : 'center' }">Teaching
      </h1>
      <v-divider></v-divider>
      <v-container>
        <Teaching />
      </v-container>
      <Modal />
      <!-- <iframe allowfullscreen sandbox="allow-top-navigation allow-scripts allow-popups allow-popups-to-escape-sandbox"
        width="100%" height="800" max-height="80dvh" frameborder="0"
        style="border: 1px solid #ccc; border-radius: 4px; overflow: hidden;"
        src="https://www.mastofeed.com/apiv2/feed?userurl=https%3A%2F%2Ffosstodon.org%2Fusers%2Fwijfi&theme=light&size=100&header=true&replies=false&boosts=false"></iframe> -->
    </v-main>

  </v-app>
</template>
<script>
import projects from '../assets/projects.json';
import ProjectThumb from '../ProjectThumb.vue';
import Talks from '../Talks.vue';
import Teaching from '../Teaching.vue';
import Modal from '../Modal.vue';
export default {
  name: 'App',
  components: {
    ProjectThumb,
    Modal,
    Talks,
    Teaching
  },
  data: () => ({
    projects: projects.filter(project => project.active)
  }),
  mounted() { }
}
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.email-address {
  text-transform: none;
  font-size: small;
}

.section-headers {
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