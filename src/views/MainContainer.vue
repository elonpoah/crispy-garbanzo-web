<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from "@/components/AppHeader.vue";
import Tabbar from "@/components/Tabbar.vue"
</script>

<template>
  <AppHeader />
  <main class="page-container">
    <RouterView />
  </main>
  <Tabbar />
</template>

<style lang="less">
.page-container  {
  position: relative;
  padding-bottom: 56px;
  padding-top: 50px;

}
</style>
