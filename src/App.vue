<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import useUserStore from '@/stores/user'

const userStore = useUserStore()
const { locale } = useI18n()
document.querySelector('html')?.setAttribute('lang', locale.value)
onMounted(()=> {
  if(userStore.isLogin) {
    userStore.getInfo()
  }
})
</script>

<template>
  <RouterView />
  <van-notify />
</template>

<style lang="less">
</style>
