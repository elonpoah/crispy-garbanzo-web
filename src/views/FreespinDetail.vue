<template>
  <div class="page">
    <NavBack title="Freespin" />
    <div class="page-inner">
      <div class="pitem green">
        <div class="content">
          <p class="title">{{ descripCur.title }}</p>
          <p class="bonus">{{ $t('free.upt') }} {{ descripCur.bonus }} {{ $t('free.bnus') }}</p>
        </div>
      </div>
      <div>
        <button class="button active submit-btn">
            {{ $t('free.jinnw') }}
        </button>
      </div>
      <div class="content-rule">
        <h2>{{ $t('session_detail.title') }}</h2>
        <p>1.{{ descripCur.desc1 }} <span class="warning">{{ descripCur.count }}</span> {{ $t('free.join')}}</p>
        <h2>{{ descripCur.validusers }}</h2>
        <p class="active">2.{{ $t('free.desc3') }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import NavBack from "@/components/NavBack.vue";
import { computed } from "vue";
import { useRoute } from 'vue-router';
import { FreeType } from '@/constant/index'

const route = useRoute()
const { t } = useI18n()
const type = computed(()=> route.params.type)

const descrip = {
  [FreeType.daily]: {
    bonus: 5,
    count: 1,
    validusers: t('free.validusers'),
    title: t('free.daily.title'),
    desc1: t('free.daily.desc1'),
    desc3: t('free.daily.desc3')
  },
  [FreeType.weekly]: {
    bonus: 30,
    count: 5,
    validusers: t('free.validusers'),
    title: t('free.weekly.title'),
    desc1: t('free.weekly.desc1'),
    desc3: t('free.weekly.desc3')
  },
  [FreeType.monthly]: {
    bonus: 100,
    count: 18,
    validusers: t('free.validusers'),
    title: t('free.monthly.title'),
    desc1: t('free.monthly.desc1'),
    desc3: t('free.monthly.desc3')
  }
}
const descripCur = computed(()=> descrip[route.params.type as FreeType])
</script>
<style lang="less" scoped>
.page-inner {
  min-height: calc(100vh - 55px);
  padding: 10px;
  background: linear-gradient(180deg,rgba(23,183,69,.2) 0%,rgba(30,130,59,0) 100%),#1C1E22;
  .content-rule {
    font-size: 14px;
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
  .submit-btn {
      width: 100%;
      height: 50px;
      border-radius: 50px;
      font-size: 18px;
      margin-bottom: 20px;
      text-transform: uppercase;
      &.is-got {
        animation: heartbeat 2s infinite linear;
      }
    }
  .pitem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 17px;
    border-radius: 4px;
    box-shadow: 0 4px 14px 0 #0b0b0b;
    .content {
      padding: 20px 0 20px 10px;
      .title {
        font-size: 26px;
        font-weight: 700;
        text-transform: uppercase;
      }
      .bonus {
        font-size: 16px;
        font-weight: 500;
      }
      .join {
        margin-top: 10px;
        width: 120px;
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        &.purple {
          background: #6d2bff;
        }
        &.orange {
          background: #c46b02;
        }
      }
    }
    &.green {
      background: linear-gradient(180deg,rgba(23,183,69,.2) 0%,rgba(30,130,59,0) 100%),#1C1E22;
    }
    &.purple {
      background: linear-gradient(26.79deg, rgba(109, 43, 255, 0.480402) 1.86%, rgba(109, 43, 255, 0.04) 85.25%, rgba(109, 43, 255, 0.04) 85.25%), rgba(216, 216, 216, 0.05);
    }
    &.orange {
      background: linear-gradient(180deg,rgba(196,107,2,.2) 0%,rgba(196,107,2,0) 100%),#1C1E22;
    }
    .img {
      width: 150px;
      height: 150px;
      object-fit: cover;
    }
  }
}
</style>