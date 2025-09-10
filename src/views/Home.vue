<template>
  <v-app>
    <AppBar/>
    <v-main style="padding-top: 0px;">
      <SettingsMenu
        :rivers="rivers"
        :selection="selection"
        :displayMap="displayMap"
        @update:selection="selection = $event"
        @update:displayMap="displayMap = $event"
      />
      <div class="between-sections">
        <div class="d-flex flex-column fill-height justify-center align-center text-white">
          <h1 class="text-h4 font-weight-thin mb-4">
            Will Field
          </h1>
          <h4 class="subheading">
            Software Engineer, Map Maker, Computer Graphics Developer
          </h4>
        </div>
        <div class="center mt-12"><v-icon color="white" size="x-large">mdi-arrow-down</v-icon></div>
      </div>
      <Projects :revealProjects="revealProjects" />
      <div class="between-sections"></div>
      <Talks />
      <div class="between-sections"></div>
      <Teaching />
      <div class="between-sections"></div>
      <Modal />
    </v-main>
    <v-container class="end-container">
      Site by Will Field available on <a href="https://github.com/Willjfield/wijfi">Github</a><br>
      Data from <a href="https://www.openstreetmaps.org">OpenStreetMaps</a><br>
      Visualized using <a href="https://www.maplibre.org"> MapLibreGLJS</a>
    </v-container>
  </v-app>
  <div id="bg-map" v-show="displayMap">
    <div id="loading-screen" :class="{ active: loading }"></div>
  </div>
</template>
<script>
import { inject } from 'vue';
import Projects from '../Projects.vue';
import Talks from '../Talks.vue';
import Teaching from '../Teaching.vue';
import Modal from '../Modal.vue';
import AppBar from '../AppBar.vue';
import SettingsMenu from '../SettingsMenu.vue';

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
    AppBar,
    Modal,
    Talks,
    Teaching,
    Projects,
    SettingsMenu
  },
  data: () => ({
    rivers: riverNames,
    hideSelectRiver: false,
    modalOpen: false,
    idx: initialIdx,
    loading: true,
    displayMap: true,
    webglSupported: true,
    autoAnimation: 0,
    animationSpeed: .5,
    revealProjects: false,
    selection: riverNames[initialIdx],
    coordinates: allPaths[initialIdx].features[0].geometry.coordinates,
  }),
  watch: {
    hideSelectRiver(val) {
      const selector = "maplibregl-ctrl-attrib";
      console.log(document.getElementsByClassName(selector))
      const attrEl = document.getElementsByClassName(selector)[0];
      console.log(attrEl)
      val ? attrEl.removeAttribute('open') : attrEl.setAttribute('open', true)
    },
    displayMap(val) {
      if (val) {
        document.body.classList.add("body-ready");
      } else {
        document.body.classList.remove("body-ready");
      }
    },
    loading(val) {
      if (val) {
        document.body.classList.remove("body-ready");
      } else {
        document.body.classList.add("body-ready");
      }
    },
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
      } catch (e) {
        this.displayMap = false;
        this.loading = false;
      } finally {
        this.map.once("load", () => {
          self.loading = false;
        })
      }
    }
  },
  async mounted() {
    let self = this;
    document.addEventListener('scroll', () => {
      self.revealProjects = true;
    })
    inject('mitt').on('open-modal', () => {
      self.modalOpen = true;
    })
    inject('mitt').on('close-modal', () => {
      self.modalOpen = false;
    });
    let start;
    function step(timestamp) {
      if (start === undefined) {
        start = timestamp;
      }
      self.autoAnimation += .000075 * self.animationSpeed;
      if (self.autoAnimation > 1) self.autoAnimation = 0;
      self.scrollEventHandler();

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);

    this.demSource = new mlcontour.DemSource({
      url: "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
      encoding: "terrarium",
      maxzoom: 15,
    });

    this.demSource.setupMaplibre(ml);
    this.coordinates = allPaths[this.idx].features[0].geometry.coordinates;
    this.interpolator = createLineInterpolator(this.coordinates);

    try {
      await this.init(this.coordinates);

    } catch (e) {
      this.displayMap = false;
    } finally {
      if (!this.displayMap || !this.webglSupported) {
        this.loading = false;
        return;
      }
      this.map.once("load", () => {
        self.loading = false;
        this.displayMap = true;
      })

    }
  },
  methods: {
    async init(coordinates) {
      if (!this.isWebglSupported()) {
        this.webglSupported = false;
        throw new Error('WebGL disabled or not supported');
      } else {
        console.log("webgl supported")
      }
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

        let _map = this.map;
        console.log("load")
        _map.addSource("terrain-source", {
          type: "raster-dem",
          encoding: "terrarium",
          tiles: [
            "https://elevation-tiles-prod.s3.amazonaws.com/terrarium/{z}/{x}/{y}.png"
          ]
        });
        console.log('here')
        let _protocolSettings = {
          multiplier: 3.28084 * 2,
          thresholds: {
            1: [4, 150],
          },
          contourLayer: "contours",
          elevationKey: "ele",
          levelKey: "level",
          extent: 8192,
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
            "line-color": "rgba(153, 213, 255,80%)",//"rgba(0,255,255, 100%)",
            // level = highest index in thresholds array the elevation is a multiple of
            "line-width": 2,
            "line-blur": 1//["match", ["get", "level"], 2, 0, .5],
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
            "line-blur": .2
          },
        }, 'water');

        this.displayMap = true;
        this.loading = false;
      })

    },
    scrollEventHandler() {
      let completion = (window.scrollY * this.animationSpeed) / document.body.offsetHeight;
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
      if (!this.displayMap) {
        console.log("not displaying map")
        return;
      }
      this.map.flyTo({
        essential: true,
        center: [lng, lat],
        bearing: angleDeg,
        animate: false,
        duration: 500
      });
    },
    isWebglSupported() {
      if (window.WebGLRenderingContext) {
        const canvas = document.createElement('canvas');
        try {
          // Note that { failIfMajorPerformanceCaveat: true } can be passed as a second argument
          // to canvas.getContext(), causing the check to fail if hardware rendering is not available. See
          // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
          // for more details.
          const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
          if (context && typeof context.getParameter == 'function') {
            return true;
          }
        } catch (e) {
          // WebGL is supported, but disabled
          return false;
        }
        return false;
      }
      // WebGL not supported
      return false;
    }
  }
}
</script>
<style scoped>
@keyframes pulse-arrow {
  0% {
    opacity:1;
  }
  80% {
    opacity:1;
    transform: translateY(0px);
  }
  85% {
    opacity:0;
    transform: translateY(20px);
  }
  90% {
    opacity:1;
    transform: translateY(0px);
  }
  95% {
    opacity:0;
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0px);
    opacity:1;
  }
}
.mdi-arrow-down {
  animation-name: pulse-arrow;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
</style>
<style>
.between-sections {
  height: 70vh;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.email-address {
  text-transform: none;
  font-size: smaller;
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

body {
  background: midnightblue;
}

.project-container {
  opacity: 1;
  transition: opacity .5s ease-in-out;

}

.hide-content {
  opacity: 0;
}

.map-select .v-field__outline {
  display: none;
}

.maplibregl-ctrl.maplibregl-ctrl-attrib {
  max-width: min-content;
  line-height: 1em;
}

.end-container {
  position: absolute;
  bottom: 10px;
  right: 0;
  font-weight: light;
  text-align: right;
  color: white;
}

.body-ready {

  background: linear-gradient(90deg, rgba(57, 73, 171, 0), rgba(57, 73, 171, .5), rgba(57, 73, 171, .6), rgba(57, 73, 171, .6), rgba(57, 73, 171, .5), rgba(57, 73, 171, 0));
}

.river-select-item {
  background: rgb(57, 73, 171);
  color: white;
  font-weight: 100;
  border-radius: 4px;
}

.v-overlay-container .v-list {
  background: rgb(57, 73, 171) !important;

}



#bg-map {
  position: fixed;
  top: 48px;
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

.map-switch,
.map-select {
  zoom: .75;
  max-width: 300px;
  /* z-index: 4; */
  top: 73px;
  position: fixed;
  /* opacity: .5; */
}

.map-switch {
  right: 8px;
  text-align: center;
}

.v-switch.map-switch .v-label {
  padding-inline-start: 0px;
}

.map-select {
  left: 8px;
}


/* Stack the map switch label underneath the control */
.map-switch .v-selection-control {
  flex-direction: column;
  align-items: center;
}

.map-switch .v-selection-control__label {
  margin-top: 4px;
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

#loading-screen.active {
  pointer-events: all;
  opacity: 1;
  transition: opacity .05s ease-in-out;
}
</style>