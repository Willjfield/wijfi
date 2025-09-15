<template>
          <h1 class="section-headers"
        :style="{ 'padding-left': $vuetify.display.mdAndUp ? '24px' : '0px', 'text-align': $vuetify.display.mdAndUp ? 'justify' : 'center' }">
        Talks &Papers
      </h1>
      <v-divider></v-divider>
    <v-container class="section-container">
    <v-card v-for="talk, t in this.talks" variant="tonal" class="mb-1 mt-1 py-2 px-8 talk-card">
        <template v-slot:title>
            <!-- :style="{'white-space': $vuetify.display.mdAndUp ? 'nowrap': 'break-spaces'}" -->
            <span class="title-span-talks">{{ talk.title }}</span>
        </template>
        <template v-slot:subtitle>
            {{ talk.conference }}
            <br>
            <i class="co-authors">Co-authors: {{ talk['co-authors'] }}</i>

        </template>
        {{ talk.description }}
        
        <a v-if="talk.link" :href="talk.link">(Link)</a>
        <br>
        <br>
        <!-- <v-divider v-if="t < talks.length - 1"></v-divider> -->
    </v-card>
</v-container>
</template>
<script>
import talks from './assets/talks.json';
import { useTheme } from 'vuetify';
export default {
    name: 'Talks',
    data: () => ({
        talks,
        theme:useTheme()
    }),
}
</script>
<style scoped>
.talk-card {
    text-align: left;
    background: rgb(var(--v-theme-surface));
    color: rgb(var(--v-theme-text));

}
.co-authors {
    font-style: italic;
    font-size: small;
    white-space: break-spaces;
}

.v-card-title {
    max-width: 75%;
    margin: 0 auto;
    line-height: 1.25em;
}
</style>

<style>
.v-card .v-card-title,
.v-card-title .title-span-talks {
    line-height: 1.25em !important;
    white-space: break-spaces;
    color: rgb(var(--v-theme-text));
}
</style>