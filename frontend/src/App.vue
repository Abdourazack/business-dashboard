
<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainNavigation from './components/MainNavigation.vue'
</script>

<template>
  <div class="app-layout">
    <MainNavigation />
    <RouterView />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Inter, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #0f172a;
  color: #f8fafc;
}

button,
input {
  font-family: inherit;
}

.app-layout {
  min-height: 100vh;
}
</style>
