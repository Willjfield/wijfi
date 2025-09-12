<template>
  <div class="settings-container">
    <v-menu density="compact" location="top" :close-on-content-click="false">
      <template #activator="{ props }">
        <v-btn elevation="0" variant="plain" v-bind="props" icon="mdi-cog" class="settings-btn" color="white"
          :aria-label="'Open settings'">
        </v-btn>
      </template>
      <v-card color="primary" min-width="300">
        <v-card-title class="text-subtitle-1">Settings</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-switch v-model="localDisplayMap" :color="currentTheme.colors.surface" inset hide-details>
            <template #label>
              <span>{{ localDisplayMap ? 'Hide map' : 'Show map' }}</span>
            </template>
            <template #thumb>
              <v-icon>{{ localDisplayMap ? 'mdi-map-minus' : 'mdi-map-plus' }}</v-icon>
            </template>
          </v-switch>
          <v-radio-group inline v-model="currentThemeName">
            <v-radio :value="'dark'">
              <template #label>
                <v-icon>mdi-weather-night</v-icon>
              </template>
            </v-radio>
            <v-radio :value="'light'">
              <template #label>
                <v-icon>mdi-weather-sunny</v-icon>
              </template>
            </v-radio>
            <v-radio :value="'system'">
              <template #label>
                <v-icon>mdi-desktop-classic</v-icon>
              </template>
            </v-radio>
          </v-radio-group>
          <v-select color="white" bg-color="secondary" class="mt-3" :items="rivers" v-model="localSelection"
            density="compact" label="Background Map Location" item-title="title" item-value="value"></v-select>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import { watch, ref, onMounted, nextTick } from 'vue';
import { useTheme } from 'vuetify';

export default {
  name: 'SettingsMenu',
  props: {
    rivers: { type: Array, required: true },
    selection: { type: [Object, Number], required: true },
    displayMap: { type: Boolean, required: true }
  },
  emits: ['update:selection', 'update:displayMap'],
  setup(props, { emit }) {
    const theme = useTheme();

    const localSelection = ref(props.selection);
    const localDisplayMap = ref(props.displayMap);

    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (storedTheme === 'dark' || storedTheme === 'light' || storedTheme === 'system') {
      theme.change(storedTheme)
    }

    const currentThemeName = ref(theme.global.current.value.dark ? 'dark' : 'light');
    const currentTheme = ref(theme.global.current.value);
    const isDark = ref(theme.global.current.dark);

    watch(() => props.selection, (val) => { localSelection.value = val; });
    watch(() => props.displayMap, (val) => { localDisplayMap.value = val; });

    watch(localSelection, (val) => emit('update:selection', val));
    watch(localDisplayMap, (val) => emit('update:displayMap', val));

    function manageMapColors(){
      const bgMapEl = document.getElementById('bg-map');
      const canvEl = bgMapEl.getElementsByTagName('canvas');
      const bgEl = document.getElementsByClassName('body-ready');
      if(theme.global.current.value.dark){
        bgMapEl.style.filter = 'invert(0)'
       canvEl[0].style.filter = 'hue-rotate(0deg)'
       bgEl[0].classList.remove('light')
      }else{
        bgMapEl.style.filter = 'invert(1)'
        canvEl[0].style.filter = 'hue-rotate(180deg)'
        bgEl[0].classList.add('light')
      }
    }
    
    watch(currentThemeName, (val) => {
      
      val ? theme.change(val) : theme.change('system');
      manageMapColors();
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', val);
      }


    });

    onMounted(async () => {
      
      isDark.value = theme.global.current.value.dark;
      // await nextTick();
      // manageMapColors();
    });

    return { localSelection, localDisplayMap, isDark, currentTheme, currentThemeName };
  }
}
</script>
<style scoped>
.settings-container {
  position: fixed;
  left: 5px;
  top: 50px;
  z-index: 5;
}

.v-select {}

.settings-btn {
  box-shadow: 0 2px 10px rgba(0, 0, 0, .35);
}
</style>
