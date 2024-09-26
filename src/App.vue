<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import useUserStore from '@/stores/user'
import usePlatformStore from '@/stores/platform'
import Loading from '@/components/Loading.vue'

const userStore = useUserStore()
const platformStore = usePlatformStore()
const { locale } = useI18n()
document.querySelector('html')?.setAttribute('lang', locale.value)
onMounted(()=> {
  if(userStore.isLogin) {
    userStore.getInfo()
  }
  platformStore.getPlatformConfig()
})

setTimeout(()=> {
  userStore.setLoadingPage()
},500)
</script>

<template>
  <RouterView />
  <van-notify />
  <van-dialog />
  <Loading v-show="userStore.loadingPage" />
</template>

<style lang="less">
.load-more {
  text-align: center;
  font-size: 14px;
  padding-top: 30px;
  padding-bottom: 20px;
}
</style>
