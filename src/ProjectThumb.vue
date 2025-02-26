<template v-if="this.project">
    <v-card
        :style="{ width: $vuetify.display.mdAndUp ? '35dvh' : '75%', margin: $vuetify.display.mdAndUp ? 'initial' : '0 auto !important' }"
        @click="open" @mouseenter="hover = true" @mouseleave="hover = false" class="project-thumb pa-0" color="primary"
        variant="tonal">
        <v-card-item  v-show="!hover" density="compact" class="pa-0">
            <template v-slot:title>
                {{ this.project.title }}
            </template>
            <template v-slot:subtitle>
                {{ this.project.role }}, {{ this.project.employer }}
            </template>

        </v-card-item>
        <v-img v-show="hover" :lazy-src="this.project.thumbnail" :src="this.project.thumbnail" cover aspect-ratio="1"></v-img>
    </v-card>
</template>
<script>
import { inject } from 'vue';
export default {
    name: 'ProjectThumb',
    props: ['project'],
    data: () => ({
        hover: false
    }),
    methods: {
        open(e) {
            console.log(e)
            if (e.target.classList.contains('v-btn') || e.target.classList.contains('v-icon')) {
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
    /* object-fit: contain; */
}
</style>
<style>
.project-thumb {
    cursor: pointer;
    aspect-ratio: 1;
    background: linear-gradient(45deg, #3949ab33, transparent);
}

.project-thumb .v-card-item {
    height: 100%;
}

.project-thumb .v-card-subtitle {
    text-overflow: initial !important;
    white-space: initial !important;
}

.project-thumb .v-card-title {
    line-height: 1.25em !important;
}

.project-thumb:hover {
    opacity: 0.8;
    transition: 0.3s;
    transform: scale(1.05);

}

.project-thumb a {
    text-decoration: none;
}

.project-thumb .v-img__img--cover {
    /* object-fit: contain; */
}
</style>