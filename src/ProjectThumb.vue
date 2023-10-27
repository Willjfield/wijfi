<template v-if="this.project">
    <v-card class="project-thumb" color="primary" variant="tonal">
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
export default {
    name: 'ProjectThumb',
    props: ['project'],
    data: () => ({}),
    mounted() { }
}
</script>
<style scoped>
.project-thumb a{
    text-decoration: none;
}
</style>