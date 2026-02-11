<template>
  <v-app>
    <DefaultLayout />
  </v-app>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { VApp } from 'vuetify/components'

const DefaultLayout = DefaultTheme.Layout
</script>
