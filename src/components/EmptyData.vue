<template>
<div class="empty-result" :style="`height: ${height}vh`">
  <svg-icon name="Record" class="empty-icon" />
  <p>{{ desc || $t('search.emptyData') }}</p>
</div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    height?: number;
    desc?: string;
  }>(),
  {
    height() {
      return 30;
    },
    desc() {
      return "";
    },
  }
);
</script>
<style lang="less" scoped>
.empty-result {
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: #8e93a0;
    margin-top: 10px;
    font-size: 16px;
  }
  .empty-icon {
    width: 40px;
    height: 40px;
  }
}
</style>