<template>
  <div class="page">
    <NavBack :title="$t('account.gameh')" />
    <van-pull-refresh class="page-inner" v-model="loading" @refresh="onRefresh">
      <div class="list">
        <div class="item" v-for="item in dataList" :key="item.sessionId">
          <div class="top">
            {{ $t('record.OpenTime') }}: {{ dayjs(item.openTime).format('YYYY-MM-DD HH:mm:ss')}}
          </div>
          <div class="middle">
            <div>{{ $t('record.SessionID') }}: {{ item.sessionId }}</div>
            <div>{{ $t('record.TotalBonus') }}: <span class="amount">${{ item.activityBonus }}</span></div>
          </div>
          <div class="bottom">
            <div>{{ $t('record.TicketPrice') }}: ${{ item.activitySpend }}</div>
            <div>{{ formatStatus(item.status) }}</div>
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
import { getGameHistory } from '@/api/api';
import dayjs from 'dayjs'

const loading = ref(false)
const route = useRoute()
const { t } = useI18n()
const formatStatus = (status: number) => {
  if (status == 0) return t('record.underOpen')
  if (status == 1) return t('record.win')
  if (status == 2) return t('record.lose')
}
const searchParams = ref({
  page: 1,
  pageSize: 20,
})
const total = ref(0)
const dataList = ref<GameHistoryItem[]>([])
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
  getGameHistory({...searchParams.value, status}).then((res)=> {
    dataList.value = isMore ? dataList.value.concat(res.data.list) : res.data.list
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
    }
    .amount {
      font-size: 18px;
      font-weight: 700;
    }
    .pending {
      color: var(--purple-color);
    }
    .success {
      color: var(--primary-color);
    }
    .fail {
      color: var(--purple-color);
    }
  }
}
</style>