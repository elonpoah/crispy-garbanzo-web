<template>
  <div class="page">
    <NavBack :title="$t('common.detail')" />
    <van-pull-refresh class="page-inner" v-model="loading" @refresh="onRefresh">
      <div class="container">
        <div class="card">
          <div class="top">
            <van-count-down format="DD d HH h mm m ss s" :time="openTimeCount">
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
            <div class="no">NO: {{ sessionInfo?.id }}</div>
          </div>
          <div class="inner">
            <h1 class="bonus">${{ sessionInfo?.activityBonus }}</h1>
              <van-circle
              :current-rate="currentRate"
              :stroke-width="100"
              :size="80"
              :color="{'0%': 'gold','100%': '#97ec80',}"
            >
              <div class="up-to-full">{{ sessionInfo?.uids }}/{{ sessionInfo?.activityLimitCount }}</div>
            </van-circle>
          </div>
        </div>
        
        <van-divider :style="{ width: '100%', marginTop: '20px', padding: '0 16px' }" />
        <div class="action">
          <button class="button submit-btn" :class="[!isGot ? 'active is-got':'']" @click="buyTicket" :loading="submiting">
            <span v-if="isGot">{{ $t('session_detail.algetaticket') }}</span>
            <span v-else>
              {{ $t('session_detail.pay') }}<span class="small-tip">${{ entryFee }}</span>{{ $t('session_detail.getaticket') }}
            </span>
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
    </van-pull-refresh>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { showNotify, showDialog } from 'vant';
import SvgIcon from "@/components/SvgIcon.vue";
import NavBack from "@/components/NavBack.vue";
import useUserStore from '@/stores/user'
import { getSessionById, buySessionTicket, checkSession } from '@/api/api'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const shareURL = ref('')
const sessionInfo = ref<TypeSessionItem | null>(null)
const userStore = useUserStore()

const openTimeCount = computed(()=> {
  if(sessionInfo.value?.openTime) {
    return sessionInfo.value?.openTime - new Date().getTime()
  }
  return 0
})
const currentRate = computed(()=> {
  if(sessionInfo.value) {
    return sessionInfo.value?.uids/sessionInfo.value?.activityLimitCount*100
  }
  return 0
})

const entryFee = computed(()=> {
  if(sessionInfo.value) {
    return (+sessionInfo.value?.activityBonus + 1)/sessionInfo.value?.activityLimitCount
  }
  return 0
})

const onSuccess = () => {
  
  showNotify({ type: 'success', teleport: '#app', message: t('others.copysuccess') });
}
const onError = () => {
  
  showNotify({ type: 'warning', teleport: '#app', message: t('others.copyfail') });
}
const loading = ref(false)
const submiting = ref(false)

const onRefresh = () => {
  const id = route.params.id
  if(!id) return
  getSessionById(Number(id)).then(res => {
    sessionInfo.value = res.data
    loading.value = false
  })
}

const buyTicket = () => {
  if(isGot.value || submiting.value) return
  submiting.value = true
  const id = route.params.id
  if(userStore.isLogin) {
    if((userStore.info?.balance || 0) < (sessionInfo.value?.activitySpend || 0)) {
      showDialog({
        message: t('others.balanceNEnough'),
      }).then(() => {
        router.push('/deposit')
      });
      submiting.value = false
      return
    }
    buySessionTicket(Number(id)).then(res => {
      onRefresh()
      checkCurrentSession()
      userStore.getInfo()
      submiting.value = false
    })
  } else {
    submiting.value = false
    router.replace(`/login?redirect=/session/${id}`)
  }
}
const isGot = ref(false)
const checkCurrentSession = () => {
  const id = route.params.id
  checkSession(Number(id)).then(res => {
    isGot.value = res.data
  })
}

watchEffect(() => {
  if (userStore.isLogin) {
    checkCurrentSession();
  }
});

onMounted(()=> {
  shareURL.value = location.href
  onRefresh()
})
</script>
<style lang="less" scoped>
.page{
  .page-inner {
    min-height: calc(100vh - 55px);
  }
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
      background-image: url(/src/assets/images/bgif.png);
      background-repeat: no-repeat;
      background-size: contain;
      background-position-y: 80px;
      opacity: 0.6;
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
    color: gold;
    display: flex;
    justify-content: center;
    align-items: center;
    // -webkit-text-stroke: 3px #53f1aa;
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
      &.is-got {
        animation: heartbeat 2s infinite linear;
      }
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