<template>
<div class="game-list-item" @click="LinkToSessionPage">
  <span class="game-list-item-people">
    <svg-icon name="UserProfile" class="game-list-item-people-icon" />
    <span>{{ peopleCount || '0' }}/{{ count|| '0' }}</span>
  </span>
  <div class="game-list-item-content">${{ bonus || '' }}</div>
  <button class="button game-list-item-claim">
    <van-count-down class="game-list-item-time" format="DD d HH h mm m ss s" :time="openTime || 0" />
  </button>
</div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import SvgIcon from "./SvgIcon.vue";


const props = defineProps<{
  peopleCount: number;
  count: number;
  bonus: string | number;
  openTime: number ;
  sessionId: string | number;
}>();

const router = useRouter()

const LinkToSessionPage = () => {
  router.push(`/session/${props.sessionId}`)
}
</script>
<style lang="less" scoped>
.game-list-item {
  height: 100px;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  padding: 2px;
  &.purple {
    background: linear-gradient(26.79deg, rgba(109, 43, 255, 0.480402) 1.86%, rgba(109, 43, 255, 0.04) 85.25%, rgba(109, 43, 255, 0.04) 85.25%), rgba(216, 216, 216, 0.05);
    .game-list-item-claim {
      background: #8447f6;
    }
  }
  &.green {
    background: linear-gradient(180deg,rgba(23,183,69,.2) 0%,rgba(30,130,59,0) 100%),#1C1E22;
    .game-list-item-claim {
      background: #2cae53;
    }
  }
  &.orange {
    background: linear-gradient(180deg,rgba(196,107,2,.2) 0%,rgba(196,107,2,0) 100%),#1C1E22;
    .game-list-item-claim {
      background: #eb9c53;
    }
  }
  .game-list-item-time {
    font-size: 12px;
    font-weight: 500;
    opacity: 0.8;
    color: var(--default-color);
  }
  .game-list-item-people {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom-right-radius: 8px;
    background-color: rgba(0,0,0,.4);
    position: absolute;
    left: 0;
    top: 0;
    padding: 0 4px 0 2px;
    &-icon {
      width: 12px;
    }
    span{
      margin-left: 2px;
      font-size: 12px;
      opacity: 0.6;
    }
  }
  .game-list-item-content {
    font-size: 30px;
    font-weight: 700;
    padding-top: 22px;
    text-align: center;
  }
  .game-list-item-claim {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 30px;
    border-radius: 0;
    color: #ffffff;
  }
}
</style>