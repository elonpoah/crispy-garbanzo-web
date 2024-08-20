<template>
  <div class="nav-back">
    <button v-if="showBack" class="close-icon" @click="router.back()">
      <svg-icon class="action-back-icon" name="Arrow" />
    </button>
    <span class="title">{{ title }}</span>
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
</script>
<style lang="less" scoped>
.nav-back {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  box-shadow: 0 4px 14px 0 #00000040;
  position: relative;
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
  }
}
</style>