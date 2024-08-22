<template>
  <div class="search-page">
    <div class="search-box-container">
      <h1 class="search-title">Seach session code</h1>
      <div class="search-box">
        <div class="input-wrap">
          <input v-model="sessionCode" type="text" placeholder="input session code">
        </div>
        <span class="search-btn" @click="searchSession">
          <svg-icon name="Pure_Search" class="search-icon" />
        </span>
      </div>
      <div class="search-result" v-show="!pageInit">
        <session-item v-if="isEmptyData" class="green search-result-item" v-bind="forkRst" />
         <div v-show="!isEmptyData" class="empty-result">
          <svg-icon name="Record" class="empty-icon" />
          <p>Empty result...</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue"
import SvgIcon from "@/components/SvgIcon.vue";
import SessionItem from "@/components/SessionItem.vue";

const pageInit = ref(true)
const sessionCode = ref('')
const forkRst = ref({})
const isEmptyData = computed(()=> Object.keys(forkRst.value).length)

function searchSession() {
  pageInit.value = false
  if(sessionCode.value === '2024') {
    forkRst.value = {
      openTime: 10*60*1000,
      bonus: 100,
      count: 10,
      peopleCount: 2,
      sessionId: 239393900222,
    }
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
    .empty-result {
      padding: 30px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        color: #8e93a0;
        margin-top: 10px;
        font-size: 16px;
      }
      .empty-icon {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
