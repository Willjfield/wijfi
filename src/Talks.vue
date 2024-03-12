<template>
    <v-card v-for="talk,t in this.talks" 
    :title="talk.title" 
    :subtitle="talk.conference"
    variant="tonal"
    class="my-4 py-2 px-8"
    >
        {{ talk.description }}
        <br>
        <a v-if="talk.link" :href="talk.link">(Link)</a>
    </v-card>
</template>
<script>
import talks from './assets/talks.json';
export default {
    name: 'Talks',
    data: () => ({
    talks
  }),
}
</script>