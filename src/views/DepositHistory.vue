<template>
  <div class="page">
    <NavBack :title="$t('account.deposith')" />
    <van-pull-refresh class="page-inner" v-model="loading" @refresh="onRefresh">
      <div class="list">
        <div class="item" v-for="item in dataList" :key="item.id">
          <div class="top">
            Order ID: {{ item.id }}
          </div>
          <div class="middle">
            <div :dataid="item.type">{{ item.type == 1 ? 'ERC20':'TRC20' }}</div>
            <div class="amount">${{ item.amount }}</div>
          </div>
          <div class="bottom">
            <div>{{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}}</div>
            <div :class="[item?.statusClass]">{{ item?.statusStr }}</div>
          </div>
        </div>
        <div v-show="showLoadMore" @click="loadMore" class="load-more">{{ $t('common.loadMore') }}</div>
      </div>
      <EmptyData :height="60" v-show="!dataList.length" />
    </van-pull-refresh>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import { ref, onMounted, computed } from 'vue';
// import { useRoute } from 'vue-router';
import NavBack from "@/components/NavBack.vue";
import EmptyData from "@/components/EmptyData.vue";
import { getDepositHistory } from '@/api/api';

const loading = ref(false)
const { t } = useI18n()
const formatStatus = (status: number) => {
  if (status == 0) return {
    statusStr: t('record.underConfirm'),
    statusClass: 'none'
  }
  if (status == 1) return {
    statusStr: t('record.success'),
    statusClass: 'win'
  }
  if (status == 2) return {
    statusStr: t('record.fail'),
    statusClass: 'lose'
  }
  return {
    statusStr: '',
    statusClass: 'none'
  }
}
// const route = useRoute()
const searchParams = ref({
  page: 1,
  pageSize: 20,
})
const total = ref(0)
const dataList = ref<TypeHashTrade[]>([])
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
  // const status = route.query.status ? Number(route.query.status) : undefined
  getDepositHistory({...searchParams.value}).then((res)=> {
    const data = res.data.list.map(e => {
      const sjsn = formatStatus(e.status)
      return {
        ...e,
        statusStr: sjsn.statusStr,
        statusClass: sjsn.statusClass
      }
    })
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
      .win {
        color: var(--primary-color);
      }
      .lose {
        color: red;
      }
    }
    .amount {
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>