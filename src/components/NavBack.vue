<template>
  <div>
    <div class="nav-back">
      <button v-if="showBack" class="close-icon" @click="handleBack">
        <svg-icon class="action-back-icon" name="Arrow" />
      </button>
      <span class="title">{{ title }}</span>
    </div>
    <div class="size-box-nav"></div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const props = withDefaults(
  defineProps<{
    title?: string;
    showBack?: boolean;
  }>(),
  {
    title() {
      return "";
    },
    showBack() {
      return true;
    },
  }
);
const router = useRouter()
const handleBack = () => {
      // 判断是否是直接访问页面
      // const isDirectAccess = !document.referrer || !document.referrer.includes(window.location.host);
      // if (isDirectAccess) {
      //   router.push('/');
      // } else {
        router.go(-1);
      // }
    }
</script>
<style lang="less" scoped>
.size-box-nav{
  height: 50px;
}
.nav-back {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 428px;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  box-shadow: 0 4px 14px 0 #00000040;
  background-color: #24262b;
  .close-icon {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    .action-back-icon {
      fill: #ffffff;
      width: 24px;
      height: 24px;
      transform: rotate(180deg);
    }
  }
  .title {
    font-size: 16px;
    color: #ffffff;
    font-weight: 600;
  }
}
</style>