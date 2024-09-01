<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
document.querySelector('html')?.setAttribute('lang', locale.value)
</script>

<template>
  <RouterView />
  <van-notify />
</template>

<style lang="less">
</style>
