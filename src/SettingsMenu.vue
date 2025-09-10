<template>
  <div class="settings-container">
    <v-menu location="top" :close-on-content-click="false">
      <template #activator="{ props }">
        <v-btn v-bind="props" class="settings-btn" icon color="primary" :aria-label="'Open settings'">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </template>
      <v-card min-width="300">
        <v-card-title class="text-subtitle-1">Settings</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-switch v-model="localDisplayMap" color="primary" inset hide-details>
            <template #label>
              <span>{{ localDisplayMap ? 'Hide map' : 'Show map' }}</span>
            </template>
            <template #thumb>
              <v-icon>{{ localDisplayMap ? 'mdi-map-minus' : 'mdi-map-plus' }}</v-icon>
            </template>
          </v-switch>

          <v-select class="mt-3" :items="rivers" v-model="localSelection" density="compact" label="Background path"
            item-title="title" item-value="value"></v-select>

          <v-divider class="my-3"></v-divider>

          <v-switch v-model="isDark" color="primary" inset hide-details :aria-label="'Toggle dark theme'">
            <template #label>
              <span>{{ isDark ? 'Dark theme' : 'Light theme' }}</span>
            </template>
            <template #thumb>
              <v-icon>{{ isDark ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}</v-icon>
            </template>
          </v-switch>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import { watch, ref, onMounted } from 'vue';
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
    if (storedTheme === 'dark' || storedTheme === 'light') {
      theme.global.name.value = storedTheme;
    }
    const isDark = ref(theme.global.current.value.dark);

    watch(() => props.selection, (val) => { localSelection.value = val; });
    watch(() => props.displayMap, (val) => { localDisplayMap.value = val; });

    watch(localSelection, (val) => emit('update:selection', val));
    watch(localDisplayMap, (val) => emit('update:displayMap', val));

    watch(isDark, (val) => {
      theme.global.name.value = val ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', val ? 'dark' : 'light');
      }
    });

    onMounted(() => {
      isDark.value = theme.global.current.value.dark;
    });

    return { localSelection, localDisplayMap, isDark };
  }
}
</script>
<style scoped>
.settings-container {
  position: fixed;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  z-index: 5;
}

.settings-btn {
  box-shadow: 0 2px 10px rgba(0,0,0,.35);
}
</style>

