<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
  <AppHeader />
  <main class="page-container">
    <RouterView />
  </main>
</template>

<style lang="less">
.page-container  {
  height: calc(100% - 50px);
}
.exclude-tabbar {
  padding-bottom: 50px;
}
</style>
