<template>
  <div class="page">
    <NavBack :title="$t(sessionInfo?.name || 'common.detail')" />
    <div class="square-container">
      <div class="inner">
        <session-item 
        v-for="(item, index) in data" 
        :key="index" 
        :class="[sessionInfo?.className]" 
        v-bind="item"></session-item>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import NavBack from "@/components/NavBack.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute()

const sessionInfo = computed(()=> {
  const type = route.query.type
  switch (type) {
    case '1':
      return {name: 'home.hugebonus', type, className: 'green' };
    case '2':
      return {name: 'home.hightrate', type, className: 'orange' }
    case '3':
      return {name: 'home.popular', type, className: 'purple' }
  
    default:
      break;
  }
})
const data  = [
  {
    openTime: 10*60*1000,
    bonus: 100,
    count: 10,
    peopleCount: 2,
    sessionId: 239393900222,
  },
  {
    openTime: 6*10*50*1000,
    bonus: 1000,
    count: 10,
    peopleCount: 2,
    sessionId: 239393900222,
  },
  {
    openTime: 10*60*1000,
    bonus: '10K',
    count: 100,
    peopleCount: 19,
    sessionId: 239393900222,
  },
  {
    openTime: 60*10*60*1000,
    bonus: 1000,
    count: 10,
    peopleCount: 2,
    sessionId: 239393900222,
  },
  {
    openTime: 60*10*60*1000,
    bonus: '10K',
    count: 100,
    peopleCount: 19,
    sessionId: 239393900222,
  },
  {
    openTime: 10*60*1000,
    bonus: 100,
    count: 10,
    peopleCount: 2,
    sessionId: 239393900222,
  },
  {
    openTime: 6*10*50*1000,
    bonus: 1000,
    count: 10,
    peopleCount: 2,
    sessionId: 239393900222,
  },
  {
    openTime: 10*60*1000,
    bonus: '10K',
    count: 100,
    peopleCount: 19,
    sessionId: 239393900222,
  },
  {
    openTime: 60*10*60*1000,
    bonus: 1000,
    count: 10,
    peopleCount: 2,
    sessionId: 239393900222,
  },
  {
    openTime: 60*10*60*1000,
    bonus: '10K',
    count: 100,
    peopleCount: 19,
    sessionId: 239393900222,
  },
  {
    openTime: 10*60*1000,
    bonus: 100,
    count: 10,
    peopleCount: 2,
    sessionId: 239393900222,
  },
  {
    openTime: 6*10*50*1000,
    bonus: 1000,
    count: 10,
    peopleCount: 2,
    sessionId: 239393900222,
  },
  {
    openTime: 10*60*1000,
    bonus: '10K',
    count: 100,
    peopleCount: 19,
    sessionId: 239393900222,
  },
  {
    openTime: 60*10*60*1000,
    bonus: 1000,
    count: 10,
    peopleCount: 2,
    sessionId: 239393900222,
  },
  {
    openTime: 60*10*60*1000,
    bonus: '10K',
    count: 100,
    peopleCount: 19,
    sessionId: 239393900222,
  }
]
</script>
<style lang="less" scoped>
.square-container {
  padding: 10px;
  .inner {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }
}
</style>