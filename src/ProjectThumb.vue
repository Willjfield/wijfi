<template v-if="this.project">
    <v-card @click="open" class="project-thumb" color="primary" variant="tonal" :title="this.project.title">
        <template v-slot:subtitle>
           {{ this.project.role }}, {{ this.project.employer }} <!-- <a class="external-link" :href="this.project.link">(link)</a> -->
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
            console.log(e)
            if(e.target.classList.contains('v-btn') || e.target.classList.contains('v-icon')){ 
                return;
            }
            
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
    object-fit: contain;
}
</style>
<style scoped>
.project-thumb{
    cursor: pointer;
}

.project-thumb:hover {
    opacity: 0.8;
    transition: 0.3s;
    transform: scale(1.05);

}
.project-thumb a{
    text-decoration: none;
}

.project-thumb .v-img__img--cover {
    object-fit: contain;
}
</style>