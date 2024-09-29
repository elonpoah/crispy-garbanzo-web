<template>
  <div class="page">
    <NavBack :title="descripCur?.title" />
    <div class="page-inner">
      <div id="my-lucky"></div>
      <p class="count-down">
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
      </p>
      <div class="share-link" v-clipboard:copy="shareURL" v-clipboard:success="onSuccess" v-clipboard:error="onError">
        <p>{{ shareURL }}</p>
        <svg-icon name="Copy" class="share-icon" />
      </div>
      <div class="content-rule">
        <div>
          <h2>{{ $t('free.registrationInfo') }}</h2>
          <p>{{ $t('free.registrations') }}： 
            <span class="warning">{{ staticInfo.registrations}}</span>
            /
            <span class="warning">{{ descripCur?.count }}</span>，
            {{ $t('free.participants') }}： 
            <span class="warning">{{ staticInfo.participants }}</span>
            /
            <span class="warning">{{ descripCur?.participants }}</span>
          </p>
        </div>
        <h2>{{ $t('free.rules') }}</h2>
        <p>1.{{ descripCur?.desc1 }} <span class="warning">{{ descripCur?.count }}</span> {{ $t('free.join')}}</p>
        <p class="active">2.{{ $t('free.desc3') }} <span class="warning">{{ descripCur?.participants }}</span> {{ $t('free.desc3m') }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import NavBack from "@/components/NavBack.vue";
import { computed, ref } from "vue";
import { useRoute } from 'vue-router';
import { FreeType } from '@/constant/index'
import LuckyWheel from '@/lucky/lib/wheel';
import { onMounted } from 'vue';
import { showNotify, showDialog } from 'vant';
import useUserStore from '@/stores/user';
import { getInviteInfo, startInviteSpin } from '@/api/api';
import dayjs from 'dayjs';
import usePlatformStore from '@/stores/platform'
const platformStore = usePlatformStore()

import bf from '@/assets/images/lucky/bg.png';
import pr from '@/assets/images/lucky/prize.png';
import btn from '@/assets/images/lucky/btn.png'

const route = useRoute()
const userStore = useUserStore()
const { t } = useI18n()
const type = computed(()=> route.params.type)
const openTimeCount = ref(0)
const shareURL = ref('')
const myLucky = ref()
const bonus = ref(0)
const loading = ref(false)
const onSuccess = () => {
  showNotify({ type: 'success', teleport: '#app', message: t('others.copysuccess') });
}
const onError = () => {
  showNotify({ type: 'warning', teleport: '#app', message: t('others.copyfail') });
}
const staticInfo = ref({
  registrations: 0,
  participants: 0,
})

const descripCur = computed(()=> {
  if(type.value == 'daily') {
    return {
      bonus: platformStore.invite?.daily.bonus || 0,
      count: platformStore.invite?.daily.count || 0,
      participants: platformStore.invite?.daily.participants || 0,
      title: t('free.daily.title'),
      desc1: t('free.daily.desc1'),
    }
  } else if(type.value == 'weekly') {
    return {
      bonus: platformStore.invite?.week.bonus || 0,
      count: platformStore.invite?.week.count || 0,
      participants: platformStore.invite?.week.participants || 0,
      title: t('free.weekly.title'),
      desc1: t('free.weekly.desc1'),
    }
  } else if(type.value == 'monthly') {
    return {
      bonus: platformStore.invite?.month.bonus || 0,
      count: platformStore.invite?.month.count || 0,
      participants: platformStore.invite?.month.participants || 0,
      title: t('free.monthly.title'),
      desc1: t('free.monthly.desc1'),
    }
  }
})

const LuckyCanvasWheel = () => {
  // @ts-ignore
  myLucky.value = new LuckyWheel('#my-lucky', {
    width: '375px',
    height: '375px',
    blocks: [
      {
        padding: '50px',
        imgs: [{
          src: bf,
          width: '100%',
          height: '100%'
        }]
      },
      {
        imgs: [{
          src: pr,
          width: '100%',
          height: '100%',
          rotate: true
        }]
      }
    ],
    prizes: [
      { fonts: [{ text: '' }] },
      { fonts: [{ text: '' }] },
      { fonts: [{ text: '' }] },
      { fonts: [{ text: '' }] },
      { fonts: [{ text: '' }] },
      { fonts: [{ text: '' }] },
      { fonts: [{ text: '' }] },
      { fonts: [{ text: '' }] },
    ],
    buttons: [
      {
        radius: '45%',
        imgs: [{
          src: btn,
          width: '100%',
          top: '-100%'
        }]
      },
      {
        radius: '30%', background: 'transparent',
        fonts: [{ text: 'SPIN', top: '-10px',fontColor: '#ffffff', fontWeight: '800' }]
      },
    ],
    start: function() {
      if( descripCur.value && staticInfo.value.registrations >= descripCur.value.count && staticInfo.value.participants >= descripCur.value.participants) {
        startLuckyDraw()
      } else {
        showDialog({
        message: t('free.unReach'),
        }).then(() => {
        });
      }
    },
    end: function(prize:any) { // 游戏停止时触发
      const msg = bonus.value > 0 ? t('free.congratulations')+'$'+ bonus.value : t('free.thanks')
      showDialog({
        message: msg,
      }).then(() => {
        
      });
    }
  })
}
const startLuckyDraw = async () => {
  if (loading.value) return
  loading.value = true
  try {
    const res = await startInviteSpin(type.value == FreeType.daily ? 1 : type.value == FreeType.weekly ? 2 : 3)
    bonus.value = res.data
    myLucky.value.play()
    setTimeout(()=> {
      myLucky.value.stop(bonus.value > 0? 0 : 2)
      loading.value = false
    }, 1000)
    if(bonus.value > 0) {
      userStore.getInfo()
    }
  } catch (error) {
    loading.value = false
  }
}
const getInviteInfoFun = async () => {
  try {
    const res = await getInviteInfo(type.value == FreeType.daily ? 1 : type.value == FreeType.weekly ? 2 : 3)
    staticInfo.value.registrations = res.data?.registrations || 0
    staticInfo.value.participants = res.data?.participates || 0
  } catch (error) {
    
  }
}
const getCountDown = () => {
  const now = dayjs();
  if (type.value == FreeType.daily) {
    const endOfDay = dayjs().endOf('day');
    openTimeCount.value = endOfDay.diff(now);
    return
  }
  if (type.value == FreeType.weekly) {
    const endOfWeek = dayjs().endOf('week');
    openTimeCount.value = endOfWeek.diff(now);
    return
  }
  if (type.value == FreeType.monthly) {
    const endOfMonth = dayjs().endOf('month');
    openTimeCount.value = endOfMonth.diff(now);
    return
  }
}
onMounted(()=> {
  shareURL.value = `${window.location.origin}/register?inviteCode=${userStore.info?.uid}`
  LuckyCanvasWheel()
  getCountDown()
  getInviteInfoFun()
})
</script>
<style lang="less" scoped>
.page {
  height: 100vh;
  overflow-y: auto;
}
.count-down {
  margin-top: 5px;
  .time-block {
    color: #fff;
    text-align: center;
    background-color: #6d6cbc;
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
}
.page-inner {
  min-height: calc(100vh - 55px);
  padding: 0 10px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .share-link {
    margin: 10px auto;
    padding: 5px 10px;
    border: 1px solid #44eff4;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      font-size: 12px;
      color: #b5bed5;
    }
    .share-icon {
      fill: #d9dde0;
      margin-left: 5px;
    }
  }
  .content-rule {
    font-size: 14px;
    margin-top: 10px;
    h2 {
      font-size: 16px;
      color: #d9dde0;
    }
    p {
      margin-bottom: 5px;
      color: #98a7b5;
      line-height: 26px;
      .warning {
        color: red;
      }
    }
  }
}
</style>