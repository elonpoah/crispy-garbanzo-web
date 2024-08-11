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
  &.light {
    fill: var(--default-color);
  }
  &.primary {
    fill: var(--primary-color);
  }
  &.purple {
    fill: var(--purple-color);
  }
  &.orange {
    fill: var(--orange-color);
  }
}
</style>
