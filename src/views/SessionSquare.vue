<template>
  <div class="page">
    <NavBack :title="$t(sessionInfo?.name || 'common.detail')" />
    <van-pull-refresh class="page-inner" v-model="loading" @refresh="onRefresh">
      <div class="square-container">
        <div class="inner">
          <session-item 
          v-for="(item, index) in sessionList" 
          :key="index" 
          :class="[sessionInfo?.className]" 
          v-bind="item"></session-item>
        </div>
        <div v-show="showLoadMore" @click="loadMore" class="load-more">{{ $t('common.loadMore') }}</div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script setup lang="ts">
import NavBack from "@/components/NavBack.vue";
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getSessionListByType } from '@/api/api';

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
const loading = ref(false)
const sessionList = ref<SessionItem[]>([])
const searchParams = ref({
  page: 1,
  pageSize: 20,
})
const total = ref(0)

const showLoadMore = computed(()=> searchParams.value.page * searchParams.value.pageSize < total.value)
const dataLoading = ref(false)

const onRefresh = () => {
  searchParams.value.page = 1
  getDataList()
}

const loadMore = () => {
  if(showLoadMore.value) {
    searchParams.value.page += 1
    getDataList(true)
  }
}


const getDataList = (isMore = false) => {
  const type = route.query.type || 1
  getSessionListByType({
    ...searchParams.value,
    type: Number(type)
  }).then((res)=> {
    sessionList.value = isMore ? sessionList.value.concat(res.data.list) : res.data.list
    total.value = res.data.total
    loading.value = false
  })
}

onMounted(()=> {
  onRefresh()
})
</script>
<style lang="less" scoped>
.page-inner {
  min-height: calc(100vh - 55px);
}
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