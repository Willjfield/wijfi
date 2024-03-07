<template v-if="this.project">
    <v-card @click="open" class="project-thumb" color="primary" variant="tonal">
        <template v-slot:title>
            <a :href="this.project.link">{{ this.project.title }}</a>
        </template>
        <template v-slot:subtitle>
           {{ this.project.role }}, {{ this.project.employer }}
        </template>
        <v-carousel show-arrows="hover" height="300">
            <v-carousel-item max-height="300" v-for="(item, i) in this.project.thumbnails" :key="i" :src="item" cover></v-carousel-item>
        </v-carousel>

    </v-card>
</template>
<script>
import {inject} from 'vue';
export default {
    name: 'ProjectThumb',
    props: ['project'],
    data: () => ({}),
    methods: {
        open(e) {
            if(e.target.nodeName !== 'IMG' && e.target.nodeName !== 'A' && e.target.nodeName !== 'DIV') return;
            
            this.mitt.emit('open-modal', this.project);
           
        }
    },
    mounted() { 
        this.mitt = inject('mitt');
    }
}
</script>
<style>
.project-thumb img {
    cursor: pointer;
}
</style>
<style scoped>
.project-thumb{
    cursor: pointer;
}
.project-thumb a{
    text-decoration: none;
}
</style>