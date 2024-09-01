<template>
  <div class="page">
    <NavBack :title="$t('common.detail')" />
    <div class="container">
      <div class="card">
        <div class="top">
          <van-count-down format="DD d HH h mm m ss s" :time="sessionInfo?.openTime || 0">
            <template #default="timeData">
              <span class="time-block">{{ timeData.days }}d</span>
              <span class="time-colon">:</span>
              <span class="time-block">{{ timeData.hours }}h</span>
              <span class="time-colon">:</span>
              <span class="time-block">{{ timeData.minutes }}m</span>
              <span class="time-colon">:</span>
              <span class="time-block">{{ timeData.seconds }}s</span>
            </template>
          </van-count-down>
          <div class="no">NO: {{ sessionInfo?.sessionId }}</div>
        </div>
        <div class="inner">
          <h1 class="bonus">${{ sessionInfo?.bonus }}</h1>
            <van-circle
            v-model:current-rate="currentRate"
            :rate="70"
            :stroke-width="100"
            :size="80"
            :color="gradientColor"
          >
            <div class="up-to-full">{{ sessionInfo?.peopleCount }}/{{ sessionInfo?.count }}</div>
          </van-circle>
        </div>
      </div>
      
      <van-divider :style="{ width: '100%', marginTop: '20px', padding: '0 16px' }" />
      <div class="action">
        <button class="button active submit-btn">
          {{ $t('session_detail.pay') }}<span class="small-tip">${{ sessionInfo?.bonus/sessionInfo?.count }}</span>{{ $t('session_detail.getaticket') }}
        </button>
      </div>
      <van-divider :style="{ width: '100%', marginTop: '20px', padding: '0 16px' }">
        {{ $t('session_detail.share2friend') }}
        <span v-clipboard:copy="shareURL"
        v-clipboard:success="onSuccess"
        v-clipboard:error="onError">
        <svg-icon name="Share" class="share-icon" /></span>
      </van-divider>
      <div class="desc-content">
        <h2>{{ $t('session_detail.title') }}</h2>
        <p>{{ $t('session_detail.desc1') }}</p>
        <p>{{ $t('session_detail.desc2') }}</p>
        <h2>{{ $t('session_detail.title2') }}</h2>
        <p>{{ $t('session_detail.desc3') }}</p>
        <p>{{ $t('session_detail.desc4') }}</p>
        <p>{{ $t('session_detail.desc5') }}</p>
        <p>{{ $t('session_detail.desc6') }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { showNotify } from 'vant';
import SvgIcon from "@/components/SvgIcon.vue";
import NavBack from "@/components/NavBack.vue";
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';

const route = useRoute()
const currentRate = ref(0);
const gradientColor = {
  '0%': 'gold',
  '100%': '#97ec80',
};
const shareURL = ref('')
const sessionInfo = ref()

const onSuccess = () => {
  
  showNotify({ type: 'success', teleport: '#app', message: 'Copy url success' });
}
const onError = () => {
  
  showNotify({ type: 'warning', teleport: '#app', message: 'Copy fail' });
}
const getSessionInfo =(id:string | string[])=> {
  sessionInfo.value = {
    openTime: 60*10*60*1000,
    bonus: 100,
    count: 10,
    peopleCount: 9,
    sessionId: id,
  }
}

onMounted(()=> {
  shareURL.value = location.href
  console.log(sessionInfo.value);
  
  getSessionInfo(route.params.id)
})
</script>
<style lang="less" scoped>
.page{
  min-height: 100%;
  .share-icon {
    fill: #ffe86d;
    width: 30px;
    height: 30px;
  }
  .container {
    padding: 10px 10px 40px;
  }
  .card {
    padding: 10px 20px;
    border-radius: 12px;
    background: #1e9f6345;
    position: relative;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .no {
        font-size: 16px;
        color: #ffffff;
      }
    }
    .inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-image: url(/src/assets/images/common_header_bg.png);
      background-repeat: no-repeat;
      background-size: contain;
      background-position-y: 80px;
    }
  }
  .up-to-full{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
  }
  .bonus {
    font-size: 66px;
    font-weight: 700;
    padding: 10px 0;
    color: #3bc116;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-text-stroke: 3px #53f1aa;
    font-style: italic;
  }
  .time-block {
    color: #fff;
    text-align: center;
    background-color: var(--primary-color);;
    border-radius: 4px;
    width: 28px;
    height: 28px;
    display: inline-block;
    font-size: 12px;
    text-align: center;
    line-height: 28px;
  }
  .time-colon {
    font-size: 16px;
    font-weight: 800;
    color: var(--default-color);
  }
  .action {
    margin-top: 20px;
    .submit-btn {
      width: 100%;
      height: 50px;
      border-radius: 50px;
      font-size: 18px;
      animation: heartbeat 2s infinite linear;
    }
    .small-tip {
      font-size: 18px;
      font-weight: bold;
      color: gold;
      padding: 0 6px;
    }
  }
  .desc-content {
    margin-top: 20px;
    padding: 0 10px;
    h2 {
      font-size: 16px;
      color: #d9dde0;
    }
    p {
      font-size: 14px;
      line-height: 26px;
      color: rgb(152, 167, 181);
    }
  }
}
</style>