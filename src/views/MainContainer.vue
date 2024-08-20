<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from "@/components/AppHeader.vue";
import Tabbar from "@/components/Tabbar.vue"
</script>

<template>
  <AppHeader />
  <main class="page-container exclude-tabbar">
    <RouterView />
  </main>
  <Tabbar />
</template>

<style lang="less">
.page-container  {
  position: relative;
  min-height: calc(100% - 50px);
}
.exclude-tabbar {
  padding-bottom: 56px;
}
</style>
