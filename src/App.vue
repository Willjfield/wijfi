<template>
  <a href="#main" class="skip-link">Skip to main content</a>
  <div id="sr-announcer" aria-live="polite" class="visually-hidden"></div>
  <main id="main" tabindex="-1">
    <router-view></router-view>
  </main>

</template>
<style>
body {
  /* background: linear-gradient(-45deg, #011685, #a3a3a3); */
  /* background:#011685; */
  /* background: linear-gradient(90deg, #01178527, #011785aa,#011785aa,#011785aa,#01178527); */
}
#app, .v-application {
  background: none;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.skip-link {
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(-200%);
  background: #fff;
  color: #000;
  padding: 8px 12px;
  z-index: 1000;
}
.skip-link:focus {
  transform: translateY(0);
  outline: 2px solid #000;
}
</style>