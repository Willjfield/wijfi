
<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-title>
        <h2>Will J Field</h2>
      </v-app-bar-title>
      <template v-slot:append>
        <v-btn href="https://github.com/willjfield" target="_blank">
          <v-icon>mdi-github</v-icon>
        </v-btn>
        <v-btn href="https://fosstodon.org/@Wijfi" target="_blank">

          <v-icon>mdi-mastodon</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container class="bg-surface-variant">
        <v-row class="mb-6" no-gutters>
          <v-col>
              <v-card class="pa-2 ma-2">
                lorem ipsum
              </v-card>
          </v-col>
          <v-col>
              <v-card class="pa-2 ma-2">
                lorem ipsum
              </v-card>
          </v-col>
          <v-col>
              <v-card class="pa-2 ma-2">
                lorem ipsum
              </v-card>
          </v-col>
          <v-col>
              <v-card class="pa-2 ma-2">
                lorem ipsum
              </v-card>
          </v-col>
          <v-col>
              <v-card class="pa-2 ma-2">
                lorem ipsum
              </v-card>
          </v-col>
        </v-row>
      </v-container>

    </v-main>
  </v-app>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
