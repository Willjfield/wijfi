<template>
  <v-app>
    
    <v-app-bar elevation="0" app color="primary">
      <v-app-bar-title style="text-align: left; padding-left: 24px;">
        <h3>Will J Field</h3>
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
    
      <v-select v-show="!this.hideSelectRiver" prependInner-icon="mdi-map" icon-color="white" density="compact"
        bg-color="primary" class="map-select" :items="rivers" v-model="selection">
        <template v-slot:item="{ props: itemProps, item }">
          <v-list-item class="map-select-item" v-bind="itemProps"></v-list-item>
        </template>
      </v-select>
      <div class="between-sections">

        <div class="d-flex flex-column fill-height justify-center align-center text-white">
          <h1 class="text-h4 font-weight-thin mb-4">
            Will Field
          </h1>
          <h4 class="subheading">
            Software Engineer, Map Maker, Computer Graphics Developer

          </h4>

        </div>
        <div class="center"><v-icon color="white" size="x-large">mdi-arrow-down</v-icon></div>
      </div>

      <h1 class="section-headers"
        :style="{ 'padding-left': $vuetify.display.mdAndUp ? '24px' : '0px', 'text-align': $vuetify.display.mdAndUp ? 'justify' : 'center' }">
        Projects
      </h1>
      <v-divider></v-divider>
      <v-container class="section-container">

        <v-row no-gutters>
          <v-col class="d-flex child-flex pa-2" cols="12" lg="3" md="4" sm="12" v-for="(project, index) in projects"
            :key="project.title">
            <ProjectThumb class="pa-0 ma-0" :project="project" />
          </v-col>
        </v-row>
      </v-container>
      <div class="between-sections"></div>
      <h1 class="section-headers"
        :style="{ 'padding-left': $vuetify.display.mdAndUp ? '24px' : '0px', 'text-align': $vuetify.display.mdAndUp ? 'justify' : 'center' }">
        Talks &Papers
      </h1>
      <v-divider></v-divider>
      <v-container class="section-container">
        <Talks />
      </v-container>
      <div class="between-sections"></div>

      <h1 class="section-headers"
        :style="{ 'padding-left': $vuetify.display.mdAndUp ? '24px' : '0px', 'text-align': $vuetify.display.mdAndUp ? 'justify' : 'center' }">
        Teaching
      </h1>
      <v-divider></v-divider>
      <v-container class="section-container teaching-container">
        <Teaching />
      </v-container>
     
      <div class="between-sections"></div>
      <Modal />
    </v-main>
    <v-container class="end-container">
          Site by Will Field available on <a href="https://github.com/Willjfield/wijfi">Github</a><br>
          Data from <a href="https://www.openstreetmaps.org" >OpenStreetMaps</a><br>
          Visualized using <a href="https://www.maplibre.org"> MapLibreGLJS</a>
      </v-container>
  </v-app>
  <div id="bg-map">
    <div id="loading-screen" :class="{ active: loading }"></div>
    <!-- <div id="mask" :class="{ active: !loading }"></div> -->
  </div>

   
</template>
<script>
import { inject } from 'vue';
import projects from '../assets/projects.json';
import ProjectThumb from '../ProjectThumb.vue';
import Talks from '../Talks.vue';
import Teaching from '../Teaching.vue';
import Modal from '../Modal.vue';
import ml from 'maplibre-gl';
import mlcontour from "maplibre-contour";
import 'maplibre-gl/dist/maplibre-gl.css';
import { createLineInterpolator } from '../utils/interpolateLine';
import { nextTick } from 'vue';

import glasgow from '../assets/river_kelvin_path.geojson?raw';
const riverPath = JSON.parse(glasgow);

import south_mountain from '../assets/south_mountain_rahway.geojson?raw';
const southMountainPath = JSON.parse(south_mountain);

import tivoli_bay from '../assets/tivoli_bay.geojson?raw';
const tivoliBay = JSON.parse(tivoli_bay);

import wissahickon from '../assets/wissahickon.geojson?raw';
const wissahickonPath = JSON.parse(wissahickon);

const allPaths = [riverPath, southMountainPath, tivoliBay, wissahickonPath];

let initialIdx = Math.floor(Math.random() * allPaths.length);
const interpolationSmoothing = 0.15;

const riverNames = allPaths.map((path, idx) => {
  return {
    'title': path.features[0].properties.name,
    'value': idx
  }
});

export default {
  name: 'App',
  components: {
    ProjectThumb,
    Modal,
    Talks,
    Teaching
  },
  data: () => ({
    projects: projects.filter(project => project.active),
    rivers: riverNames,
    hideSelectRiver: false,
    modalOpen: false,
    idx: initialIdx,
    loading: true,
    autoAnimation: 0,
    selection: riverNames[initialIdx],
    coordinates: allPaths[initialIdx].features[0].geometry.coordinates,
  }),
  watch: {
    /**
     * Update the river coordinates when the selection changes. If the selection has not changed, do nothing.
     * @param {string} val - The new selection value.
     */
    async selection(newVal, oldVal) {

      if (oldVal === this.selection) return;

      this.idx = newVal;
      this.loading = true;
      this.coordinates = allPaths[this.idx].features[0].geometry.coordinates;
     
      this.interpolator = createLineInterpolator(this.coordinates);
      
      const self = this;
      try {
        await this.init(this.coordinates);
         this.map.once("load", () => {
          self.loading = false;
        })
      } catch (e) {
        this.map.once("load", () => {
          self.loading = false;
        })
      }
    }
  },
  async mounted() {
    let self = this;

    inject('mitt').on('open-modal',()=>{
      self.modalOpen = true;
    })
    inject('mitt').on('close-modal',()=>{
      self.modalOpen = false;
    });
    let start;
    function step(timestamp) {
      if (start === undefined) {
        start = timestamp;
      }
      self.autoAnimation+=.000075;
      if(self.autoAnimation > 1) self.autoAnimation = 0;
      self.scrollEventHandler();

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);

    this.demSource = new mlcontour.DemSource({
      url: "https://elevation-tiles-prod.s3.amazonaws.com/terrarium/{z}/{x}/{y}.png",
      encoding: "terrarium",
      maxzoom: 16,
    });

    this.demSource.setupMaplibre(ml);
    this.coordinates = allPaths[this.idx].features[0].geometry.coordinates;
    this.interpolator = createLineInterpolator(this.coordinates);

      try {
        await this.init(this.coordinates);
      
      } catch (e) {
        //  this.map.once("load", () => {
        //   self.loading = false;
        // })
      } finally {
        this.map.once("load", () => {
          self.loading = false;
          document.body.classList.add("body-ready")
        
        })
        
      }
  },
  methods: {
    async init(coordinates) {
      let _startingCoordinates = coordinates[0];
      this.autoAnimation = 0;
      if (this.map) this.map.remove();
      this.map = null;

      document.removeEventListener('scroll', this.scrollEventHandler);
      await nextTick();

      this.map = new ml.Map({
        container: 'bg-map', // container id
        style: '/contours.json', // style URL,
        center: _startingCoordinates, // starting position [lng, lat]
        zoom: 17,
        interactive: false,
        terrain: true,
        pitch: 50
      });

      this.map.once("data", () => {
        document.addEventListener('scroll', this.scrollEventHandler);
        this.scrollEventHandler();
      })
      let _map = this.map;
      let _self= this;
      this.map.once("idle", () => {
        
        _map.addSource("terrain-source", {
          type: "raster-dem",
          encoding: "terrarium",
          tiles: [
            "https://elevation-tiles-prod.s3.amazonaws.com/terrarium/{z}/{x}/{y}.png"
          ]
        });
        let _protocolSettings = {
              multiplier: 3.28084*2,
              thresholds: {
                1: [4, 150],
              },
              contourLayer: "contours",
              elevationKey: "ele",
              levelKey: "level",
              extent: 4096,
              interval: 1,
              buffer: 1,
            }
        _map.addSource("contour-source", {
          type: "vector",
          tiles: [
          this.demSource.contourProtocolUrl(_protocolSettings)
          ]
        });

        _map.addLayer({
          id: "contour-lines-1",
          type: "line",
          source: "contour-source",
          "source-layer": "contours",
          paint: {
            "line-color": "rgba(153, 213, 255,100%)",//"rgba(0,255,255, 100%)",
            // level = highest index in thresholds array the elevation is a multiple of
            "line-width": 2,
            "line-blur":1//["match", ["get", "level"], 2, 0, .5],
          },
        }, 'landcover_wood');
        _map.addLayer({
          id: "contour-lines",
          type: "line",
          source: "contour-source",
          "source-layer": "contours",
          paint: {
            "line-color": "rgba(255,255,255, 100%)",
            // level = highest index in thresholds array the elevation is a multiple of
            "line-width": .1,
            "line-blur":.2
          },
        },'water');
        
      })

    },
    scrollEventHandler() {
      let completion = window.scrollY / document.body.offsetHeight;
      completion += this.autoAnimation;

      if (window.scrollY / window.innerHeight > 0.667 || this.modalOpen) {
        this.hideSelectRiver = true;
      } else {
        this.hideSelectRiver = false;
      }
      // Clamp completion between 0 and 1
      completion = Math.max(0, Math.min(1, completion));
      const [lng, lat] = this.interpolator.interpolate(completion);

      // Compute direction for bearing
      let tNext = completion + interpolationSmoothing;
      tNext = Math.max(0, Math.min(1, tNext));
      const [lng2, lat2] = this.interpolator.interpolate(tNext);

      let tPrev = completion - interpolationSmoothing;
      tPrev = Math.max(0, Math.min(1, tPrev));
      const [lng1, lat1] = this.interpolator.interpolate(tPrev);

      // Compute direction for bearing
      const deltaLng = lng2 - lng1;
      const deltaLat = lat2 - lat1;
      // atan2 for compass bearing: x=deltaLng, y=deltaLat
      let angleRad = Math.atan2(deltaLng, deltaLat);
      let angleDeg = (angleRad * (180 / Math.PI)) + 180;

      this.map.flyTo({
        essential: true,
        center: [lng, lat],
        bearing: angleDeg,
        animate: false,
        duration: 500
      });

      // this.map.setBearing(90-angleDeg);
    }
  }
}
</script>
<style scoped>
.between-sections {
  height: 70lvh;
}

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

.end-container{
  position: absolute;
  bottom: 10px;
  right: 0;
  font-weight: light;
  text-align: right;
  color: white;
}
.body-ready{
  
  background: linear-gradient(90deg, rgba(57, 73, 171,0), rgba(57, 73, 171,.5),rgba(57, 73, 171,.6),rgba(57, 73, 171,.6),rgba(57, 73, 171,.5),rgba(57, 73, 171,0));
}
.river-select-item {
  background: rgb(57, 73, 171);
  color: white;
  font-weight: 100;
  border-radius: 4px;
}

.v-overlay-container .v-list{
  background: rgb(57, 73, 171) !important;

}



#bg-map {
  position: fixed;
  top: 63px;
  bottom: 0;
  left: 0px;
  width: 100%;
  /* height: 100%; */
  opacity: 1;
  z-index: -1;
  
  /* filter: contrast(2); */
}

#bg-map canvas {
  filter: blur(1px);
}

.teaching-container {
  background: white !important;
}

.map-select {
  zoom: .75;
  max-width: 300px;
  /* z-index: 4; */
  top: 93px;
  left: 8px;
  position: fixed;
  opacity: .5;
}

.map-select:hover {
  opacity: 1;
}

.map-select-item {
  background: rgb(57, 73, 171);
  color: white;
  font-weight: 100;
  border-radius: 4px;
}
#loading-screen {
  position: fixed;
  z-index: 2;
  display: block;
  top: 0px;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  transition: opacity 2s ease-in-out;
  /* transition-delay: 1s; */
  background: rgb(57, 73, 171);
  justify-content: center;
  align-items: center;
  text-align: center;
  pointer-events: none;
}

#loading-screen.active{
  pointer-events: all;
   opacity: 1;
  transition: opacity .05s ease-in-out;
}

</style>