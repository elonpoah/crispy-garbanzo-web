<template>
  <svg class="icon">
    <use :href="`#icon-${name}`" />
  </svg>
  
</template>
<script setup lang="ts">
const _props = withDefaults(
  defineProps<{
    name: string;
    width?: string;
    height?: string;
  }>(),
  {
    width() {
      return "";
    },
    height() {
      return "";
    },
  }
);
</script>
<style lang="less" scoped>
.icon {
  width: 18px;
  height: 18px;
  fill: #9fa5ac;
}
</style>
