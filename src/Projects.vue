<template>
<div :class="{'project-container':true,'hide-content':!this.revealProjects}">
    <h1 class="section-headers"
   
      :style="{'color':'black', 'padding-left': $vuetify.display.mdAndUp ? '24px' : '0px', 'text-align': $vuetify.display.mdAndUp ? 'justify' : 'center' }">
      Projects
    </h1>
    <v-divider></v-divider>
    <v-container class="section-container">
      <v-row no-gutters>
        <v-col class="d-flex child-flex pa-2" cols="12" lg="3" md="4" sm="12" v-for="(project, index) in projects"
          :key="project.title">
          <ProjectThumb class="pa-0 ma-0" :project="project" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
    import projects from './assets/projects.json';
    import ProjectThumb from './ProjectThumb.vue';

    export default {
        name: 'App',
        props:['revealProjects'],
        components: {
            ProjectThumb
        },
        data: () => ({
            projects: projects.filter(project => project.active)
        })
    }
</script>