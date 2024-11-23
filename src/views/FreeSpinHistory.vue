<template>
  <div class="page">
    <NavBack title="Freespin" />
    <van-pull-refresh class="page-inner" v-model="loading" @refresh="onRefresh">
      <div class="list">
        <div class="item" v-for="item in dataList" :key="item.ID">
          <div class="top">
            <span class="text-label">
              {{ $t('record.createTime') }}: 
            </span>
             {{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}}
          </div>
          <div class="middle">
            <div>
              <span class="text-label">{{ $t('record.type') }}: </span>
              <span v-if="item.type == 1">{{ $t('free.daily.title') }}</span>
              <span v-else-if="item.type == 2">{{ $t('free.weekly.title') }}</span>
              <span v-else-if="item.type == 3">{{ $t('free.monthly.title') }}</span>
              <span v-else-if="item.type == 4">{{ $t('draw.luckydraw') }}</span>
            </div>
            <div><span class="amount">${{ item.amount }}</span></div>
          </div>
        </div>
        <div v-show="showLoadMore" @click="loadMore" class="load-more">{{ $t('common.loadMore') }}</div>
      </div>
      <EmptyData :height="60" v-show="!dataList.length" />
    </van-pull-refresh>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import NavBack from "@/components/NavBack.vue";
import EmptyData from "@/components/EmptyData.vue";
import { getFreeSpinHistory } from '@/api/api';
import dayjs from 'dayjs'

const loading = ref(false)
const route = useRoute()
const { t } = useI18n()
const searchParams = ref({
  page: 1,
  pageSize: 20,
})
const total = ref(0)
const dataList = ref<TypeFreeSpinHistoryItem[]>([])
const showLoadMore = computed(()=> searchParams.value.page * searchParams.value.pageSize < total.value)

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
  const status = route.query.status ? Number(route.query.status) : undefined
  getFreeSpinHistory({...searchParams.value}).then((res)=> {
    const data = res.data.list
    dataList.value = isMore ? dataList.value.concat(data) : data
    total.value = res.data.total
    loading.value = false
  })
}

onMounted(()=> {
  onRefresh()
})
</script>
<style lang="less" scoped>
.page {
  .page-inner {
    min-height: calc(100vh - 55px);
  }
  .list {
    padding: 0 10px;
  }
  .item {
    background-color: #2E3035;
    border-radius: 4px;
    padding: 10px;
    margin-top: 10px;
    
    .top, .bottom, .middle {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .top {
      font-size: 14px;
      padding: 5px 0;
    }
    .middle {
      font-size: 14px;
      padding: 5px 0;
    }
    .bottom {
      font-size: 14px;
      padding-top: 5px;
      border-top: 1px solid #34363a;
      font-weight: 700;
      .win {
        color: var(--primary-color);
      }
      .lose {
        color: red;
      }
    }
    .amount {
      font-size: 18px;
      font-weight: 700;
      color: gold;
    }
  }
}
</style>