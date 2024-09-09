<template>
  <div class="search-page">
    <div class="search-box-container">
      <h1 class="search-title">{{ $t('search.desc') }}</h1>
      <div class="search-box">
        <div class="input-wrap">
          <input v-model="sessionCode" type="text" :placeholder="$t('search.placeholder')">
        </div>
        <span class="search-btn" @click="searchSession">
          <svg-icon name="Pure_Search" class="search-icon" />
        </span>
      </div>
      <div class="search-result" v-show="!pageInit">
        <session-item v-if="isEmptyData" class="green search-result-item" v-bind="forkRst" />
        <EmptyData v-show="!isEmptyData" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue"
import SvgIcon from "@/components/SvgIcon.vue";
import SessionItem from "@/components/SessionItem.vue";
import EmptyData from "@/components/EmptyData.vue";

const pageInit = ref(true)
const sessionCode = ref('')
const forkRst = ref({})
import { getSessionById } from '@/api/api'
const isEmptyData = computed(()=> Object.keys(forkRst.value).length)

function searchSession() {
  pageInit.value = false
  if(sessionCode.value) {
    getSessionById(Number(sessionCode.value)).then(res => {
      forkRst.value = res.data
    })
  } else {
    forkRst.value = {}
  }
}
</script>
<style lang="less" scoped>
.search-page {
  padding: 17px 10px;
  
  .search-box-container {
    margin-top: 100px;
    padding: 0 20px;
    .search-title {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
  }
  .search-box {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1A1C20;
    border-radius: 4px;
    .input-wrap {
      flex: 1;
      height: 40px;
      position: relative;
      display: flex;
      align-items: center;
      border-radius: 4px;
      input {
        flex: 1;
        padding: 0 10px;
        width: 100%;
        height: 100%;
        min-width: 1rem;
        color: var(--default-color);
        font-size: 0.37333rem;
      }
    }
    .search-btn {
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid #34363a;
    }
    .search-icon {
      width: 32px;
      height: 32px;
      fill: var(--primary-color);
    }
  }
  .search-result {
    margin-top: 20px;
    .search-result-item{
      width: 200px;
    }
  }
}
</style>
