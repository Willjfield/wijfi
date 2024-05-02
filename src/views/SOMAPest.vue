<template>
    <v-app>
        <h1>SOMA Pesticide Map</h1>
        <v-container>
            <div id="map"></div>
            <v-sheet class="text-left">
            <v-card justify="start" subtitle="The goal of the project" text="" title="Overview"></v-card>
            <v-card subtitle="What the final output of the map will be" text="" title="Output"></v-card>
            <v-card subtitle="How to contribute" title="Contributing">
                <v-card-text>
                <a href="https://app.qfield.cloud/accounts/signup/">https://app.qfield.cloud/accounts/signup/</a>
                </v-card-text>
            </v-card>
            </v-sheet>
        </v-container>
    </v-app>
</template>

<script>
import ml from 'maplibre-gl';
export default {
    name: 'SOMAPest',
    mounted() {
        const map = new ml.Map({
        container: 'map', // container id
        style: 'https://demotiles.maplibre.org/style.json', // style URL
        center: [0, 0], // starting position [lng, lat]
        zoom: 1 // starting zoom
    });
    }
}
</script>