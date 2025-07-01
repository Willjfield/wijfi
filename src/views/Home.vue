<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-title style="text-align: left; padding-left: 24px;">
        <h2>Will J Field</h2>
      </v-app-bar-title>
      <template v-slot:append>
        <v-btn href="mailto:willjfield@proton.me">
          <v-icon>mdi-email</v-icon>
          <span v-show="$vuetify.display.mdAndUp" class="email-address">willjfield@proton.me</span>
        </v-btn>
        <v-btn href="https://github.com/willjfield" target="_blank">
          <v-icon>mdi-github</v-icon>
        </v-btn>
        <v-btn href="https://fosstodon.org/@Wijfi" target="_blank">
          <v-icon>mdi-mastodon</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <v-main style="padding-top: 0px;">
      <div id="bg-map"></div>
      <h1 class="section-headers" :style="{ 'padding-left': $vuetify.display.mdAndUp ? '24px' : '0px', 'text-align': $vuetify.display.mdAndUp ? 'justify' : 'center' }">Projects
      </h1>
      <v-divider></v-divider>
      <v-container class="section-container">

        <v-row no-gutters>
          <v-col class="d-flex child-flex pa-2" cols="12" lg="3" md="4" sm="12" v-for="(project, index) in projects" :key="project.title">
            <ProjectThumb class="pa-0 ma-0" :project="project" />
          </v-col>
        </v-row>
      </v-container>
      <h1 class="section-headers" :style="{'padding-left': $vuetify.display.mdAndUp ? '24px' : '0px', 'text-align': $vuetify.display.mdAndUp ? 'justify' : 'center' }">Talks &Papers
      </h1>
      <v-divider></v-divider>
      <v-container class="section-container">
        <Talks />
      </v-container>
      <h1 class="section-headers" :style="{ 'padding-left': $vuetify.display.mdAndUp ? '24px' : '0px', 'text-align': $vuetify.display.mdAndUp ? 'justify' : 'center' }">Teaching
      </h1>
      <v-divider></v-divider>
      <v-container class="section-container teaching-container">
        <Teaching />
      </v-container>
      <Modal />
      <!-- <iframe allowfullscreen sandbox="allow-top-navigation allow-scripts allow-popups allow-popups-to-escape-sandbox"
        width="100%" height="800" max-height="80dvh" frameborder="0"
        style="border: 1px solid #ccc; border-radius: 4px; overflow: hidden;"
        src="https://www.mastofeed.com/apiv2/feed?userurl=https%3A%2F%2Ffosstodon.org%2Fusers%2Fwijfi&theme=light&size=100&header=true&replies=false&boosts=false"></iframe> -->
    </v-main>

  </v-app>
</template>
<script>
import projects from '../assets/projects.json';
import ProjectThumb from '../ProjectThumb.vue';
import Talks from '../Talks.vue';
import Teaching from '../Teaching.vue';
import Modal from '../Modal.vue';
import ml from 'maplibre-gl';
import mlcontour from "maplibre-contour";
import 'maplibre-gl/dist/maplibre-gl.css';
import { createLineInterpolator } from '../utils/interpolateLine';

import riverPathRaw from '../assets/river_kelvin_path.geojson?raw';
const riverPath = JSON.parse(riverPathRaw);

export default {
  name: 'App', 
  components: {
    ProjectThumb,
    Modal,
    Talks,
    Teaching
  },
  data: () => ({
    projects: projects.filter(project => project.active)
  }),
  mounted() { 
    const demSource = new mlcontour.DemSource({
      url: "https://elevation-tiles-prod.s3.amazonaws.com/terrarium/{z}/{x}/{y}.png",
      encoding: "terrarium",
      maxzoom: 13,
    });

// calls maplibregl.addProtocol for the shared cache and contour protocols
demSource.setupMaplibre(ml);
const coordinates = riverPath.features[0].geometry.coordinates;
const { interpolate } = createLineInterpolator(coordinates);
const interpolationSmoothing = 0.15;

    const map = new ml.Map({
            container: 'bg-map', // container id
            style: '/contours.json', // style URL,
            center: coordinates[0], // starting position [lng, lat]
            zoom: 16, 
            interactive: false,
        });
        const [lng2, lat2] = interpolate(interpolationSmoothing);
          const deltaLng = lng2 - coordinates[0][0];
          const deltaLat = lat2 - coordinates[0][1];
          // atan2 for compass bearing: x=deltaLng, y=deltaLat
          let angleRad = Math.atan2(deltaLng, deltaLat);
          let angleDeg = angleRad * (180 / Math.PI);
          
          map.setBearing(90-angleDeg);

        map.once("load", () => {
          map.addSource("contour-source", {
          type: "vector",
          tiles: [
            demSource.contourProtocolUrl({
              // convert meters to feet, default=1 for meters
              multiplier: 3.28084,
              thresholds: {
                15: [10, 200],
              },
              // optional, override vector tile parameters:
              contourLayer: "contours",
              elevationKey: "ele",
              levelKey: "level",
              extent: 4096,
              buffer: 1,
            }),
          ],
          maxzoom: 15,
        });
        map.addLayer({
          id: "contour-lines",
          type: "line",
          source: "contour-source",
          "source-layer": "contours",
          paint: {
            "line-color": "rgba(0,0,0, 100%)",
            // level = highest index in thresholds array the elevation is a multiple of
            "line-width": ["match", ["get", "level"], 1, 1, .5],
          },
        });
        })
        
        // After map is initialized
        let completion = 0;
        document.addEventListener('scroll', (e) => {
          completion = window.scrollY / 10000;
          // Clamp completion between 0 and 1
          completion = Math.max(0, Math.min(1, completion));

          const [lng, lat] = interpolate(completion);

          // Compute direction for bearing

          let t2 = completion + interpolationSmoothing;
          //if (t2 > 1) t2 = 1;
          const [lng2, lat2] = interpolate(t2);
          const deltaLng = lng2 - lng;
          const deltaLat = lat2 - lat;
          // atan2 for compass bearing: x=deltaLng, y=deltaLat
          let angleRad = Math.atan2(deltaLng, deltaLat);
          let angleDeg = angleRad * (180 / Math.PI);
          
          map.setCenter([lng, lat]);
          map.setBearing(90-angleDeg);
        });
  }
}
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.email-address {
  text-transform: none;
  font-size: small;
}

.section-headers {
  text-align: justify;
  font-weight: 100;
  padding-left: 24px;
  background: white;
  margin-top: 1em;
  padding: 12px;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.section-container {
  /* background: white; */
  background: #ffffffac;

}
.section-container .v-row * {
  justify-content: center;
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

</style>
<style>
.maplibregl-canvas{
  
}
#bg-map{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: .2;
  z-index: 0;
  filter: invert(1);
}
.teaching-container {
  background: white !important;
}
</style>