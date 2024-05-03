<template>

    <v-layout class="rounded rounded-md">

        <v-container fluid>
            <v-row class="ma-4" no-gutters>
                <v-col cols="12" sm="4"><h1>SOMA Pesticide Map</h1></v-col>
                <v-col cols="12" sm="8"><div cols="12" sm="4" id="map"></div></v-col>
               
            </v-row>

            <v-divider></v-divider>
            <v-sheet class="text-left">
                <v-card justify="start" subtitle="The goal of the project" text="" title="Overview"></v-card>
                <v-card subtitle="What the final output of the map will be" text="" title="Output"></v-card>
                <v-card subtitle="How to contribute" title="Contributing">
                    <v-card-text>
                        <a
                            href="https://app.qfield.cloud/accounts/signup/">https://app.qfield.cloud/accounts/signup/</a>
                    </v-card-text>
                </v-card>
            </v-sheet>
        </v-container>
    </v-layout>
</template>
<style>
#app{
    max-width: none;
    width: 100%;
}
#map {
    height: 600px;
    width: 100%;

}
</style>
<script>
import ml from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
export default {
    name: 'SOMAPest',
    mounted() {
        console.log('mounted');
        const map = new ml.Map({
            container: 'map', // container id
            style: 'basic.json', // style URL
            center: [-74.2644,40.73766], // starting position [lng, lat]
            zoom: 12.65 // starting zoom
        });
        map.addControl(new ml.NavigationControl());
    }
}
</script>