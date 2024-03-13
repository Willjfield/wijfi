<template>
    <v-card v-for="talk,t in this.talks" 
    :title="talk.title" 
    variant="tonal"
    class="my-4 py-2 px-8"
    >
   <template v-slot:subtitle>
       {{ talk.conference }}
       <br>
           <i class="co-authors">Co-authors: {{ talk['co-authors']}}</i>

      </template>
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
<style scoped>
.co-authors {
    font-style: italic;
    font-size: small;
    white-space: break-spaces;
}

.v-card-title {
    white-space: break-spaces;
    line-height: 1em;
    max-width: 75%;
    margin: 0 auto;
}
</style>