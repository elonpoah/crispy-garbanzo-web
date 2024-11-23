<template>
  <div class="page">
    <NavBack :title="$t('draw.mydraw')" />
    <van-pull-refresh class="page-inner" v-model="loading" @refresh="onRefresh">
      <div class="list">
        <div class="item" v-for="item in dataList" :key="item.drawId">
          <div class="top">
            <div>
              <span class="label">{{ $t('draw.type') }}： </span>
              <span>{{ item?.bonusTypeStr || '-' }}</span>
            </div>
            <div :class="[item.statusClass]">{{ item.statusStr || '-' }}</div>
          </div>
          <div class="middle">
            <div>
              <span class="label">{{ $t('draw.last2Total') }}：</span>
              <span>{{ item.count - item.participants }}/{{ item.count }}</span>
            </div>
            <div>
              <span class="label">{{ $t('draw.last2Bonus') }}：</span>
              <span>{{ item.totalBonus - item.distribute }}/{{ item.totalBonus }}</span>
            </div>
          </div>
          <div class="bottom">
            <div>
              <span class="label">{{ $t('record.createTime') }}：</span> 
              <span>{{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}}</span>
            </div>
            <div>
              <button class="button active share-link"
                  v-clipboard:copy="shareURL+'/lucky/'+item.drawId"
                  v-clipboard:success="onSuccess"
                  v-clipboard:error="onError">
                  {{ $t('draw.copyUrl') }}
                  <svg-icon name="Share" class="share-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <EmptyData :height="60" v-show="!dataList.length" />
    </van-pull-refresh>
  </div>
  </template>
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import NavBack from "@/components/NavBack.vue";
  import { getDrawHistory } from '@/api/api';
  import { showNotify } from 'vant';
  import { useI18n } from 'vue-i18n';
  import dayjs from 'dayjs'

  const { t } = useI18n()
  const shareURL = ref('')
  const loading = ref(false)
  const searchParams = ref({
    page: 1,
    pageSize: 20,
  })
  const total = ref(0)
  const dataList = ref<TypesMakeDrawItem[]>([])
  const showLoadMore = computed(()=> searchParams.value.page * searchParams.value.pageSize < total.value)

  const onRefresh = () => {
    searchParams.value.page = 1
    getDataList()
  }
  const onSuccess = () => {
    
    showNotify({ type: 'success', teleport: '#app', message: t('others.copysuccess') });
  }
  const onError = () => {
    
    showNotify({ type: 'warning', teleport: '#app', message: t('others.copyfail') });
  }
  const loadMore = () => {
    if(showLoadMore.value) {
      searchParams.value.page += 1
      getDataList(true)
    }
  }
  const getDataList = (isMore = false) => {
    getDrawHistory({...searchParams.value}).then((res)=> {
      const data = res.data.list.map(item => {
        return {
          ...item,
          bonusTypeStr: item.bonusType == 1 ? t('draw.random'):t('draw.fixed'),
          statusClass: item.status == 1 ? 'processing':'end',
          statusStr: item.status == 1 ? t('draw.processing'):t('draw.end'),
          totalBonus: item.bonusType == 1 ? item.bonus : item.bonus*item.count
        }
      })
      dataList.value = isMore ? dataList.value.concat(data) : data
      total.value = res.data.total
      loading.value = false
    })
  }
  onMounted(()=> {
    shareURL.value = location.origin
    onRefresh()
  })
  </script>
  <style lang="less" scoped>
  .page {
    .page-inner {
      min-height: calc(100vh - 55px);
    }
    .share-icon {
      fill: #ffffff;
      width: 16px;
      height: 16px;
      margin-left: 4px;
    }
    .list {
      padding: 0 10px;
    }
    .item {
      background-color: #2E3035;
      border-radius: 4px;
      padding: 10px;
      margin-top: 10px;
      .label {
        color: #8d9792;
      }
      .end {
        color: red;
      }
      .processing {
        color: var(--primary-color);
      }
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
      .share-link {
        font-size: 12px;
        padding: 0 5px;
        height: 27px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .bottom {
        font-size: 14px;
        padding-top: 5px;
        border-top: 1px solid #34363a;
        font-weight: 700;
      }
      .amount {
        font-size: 18px;
        font-weight: 700;
        color: gold;
      }
    }
  }
  </style>