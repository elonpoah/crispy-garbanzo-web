<template>
<div class="full-loading-mask" :style="bgTransparent">
  <div class="loading" :style="bgTransparent"><div></div><div></div><div></div><div></div></div>
</div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    opacity?: number;
  }>(),
  {
    opacity() {
      return 1;
    },
  }
);
const bgTransparent = computed(()=> `background:rgba(0, 0, 0, ${props.opacity})`)

</script>
<style lang="less" scoped>
.full-loading-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading,
.loading > div {
  position: relative;
  box-sizing: border-box;
}

.loading {
  display: block;
  font-size: 0;
  color: #3BC117;
}

.loading.la-dark {
  color: #8ead85;
}

.loading > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.loading {
  width: 84px;
  height: 64px;
}

.loading > div:nth-child(1) {
  position: absolute;
  bottom: 32%;
  left: 18%;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  transform-origin: center bottom;
  animation: ball-climbing-dot-jump 0.6s ease-in-out infinite;
}

.loading > div:not(:nth-child(1)) {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 2px;
  border-radius: 0;
  transform: translate(60%, 0);
  animation: ball-climbing-dot-steps 1.8s linear infinite;
}

.loading > div:not(:nth-child(1)):nth-child(2) {
  animation-delay: 0ms;
}

.loading > div:not(:nth-child(1)):nth-child(3) {
  animation-delay: -600ms;
}

.loading > div:not(:nth-child(1)):nth-child(4) {
  animation-delay: -1200ms;
}

@keyframes ball-climbing-dot-jump {
  0% {
    transform: scale(1, 0.7);
  }

  20% {
    transform: scale(0.7, 1.2);
  }

  40% {
    transform: scale(1, 1);
  }

  50% {
    bottom: 125%;
  }

  46% {
    transform: scale(1, 1);
  }

  80% {
    transform: scale(0.7, 1.2);
  }

  90% {
    transform: scale(0.7, 1.2);
  }

  100% {
    transform: scale(1, 0.7);
  }
}

@keyframes ball-climbing-dot-steps {
  0% {
    top: 0;
    right: 0;
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    top: 100%;
    right: 100%;
    opacity: 0;
  }
}
</style>