<template>
    <div class="page">
      <NavBack :title="$t('account.withdrawh')" />
      <van-pull-refresh class="page-inner" v-model="loading" @refresh="onRefresh">
        <div class="list">
          <div class="item" v-for="item in list" :key="item.orderId">
            <div class="top">
              Order ID: {{ item.orderId }}
            </div>
            <div class="middle">
              <div>{{ item.type }}</div>
              <div class="amount">${{ item.amount }}</div>
              
            </div>
            <div class="bottom">
              <div>{{ item.createTime }}</div>
              <div :class="[item.status]">{{ item.status }}</div>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </div>
  </template>
  <script setup lang="ts">
  import { ref } from 'vue';
  import NavBack from "@/components/NavBack.vue";
  const list = [
    {
      orderId: '2020200200101',
      type: 'ERC-20',
      amount: 200,
      createTime: '2024-08-24 10:23:30',
      status: 'success'
    },
    {
      orderId: '2020200200121',
      type: 'TRC-20',
      amount: 100,
      createTime: '2024-08-24 10:23:30',
      status: 'fail'
    },
    {
      orderId: '2020200200145',
      type: 'ERC-20',
      amount: 500,
      createTime: '2024-08-24 10:23:30',
      status: 'pending'
    }
  ]
  const loading = ref(false)
  const onRefresh = () => {
    setTimeout(()=> {
      loading.value = false
    },2000)
  }
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
        font-size: 16px;
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