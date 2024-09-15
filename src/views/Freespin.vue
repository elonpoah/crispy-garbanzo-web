<template>
  <div class="page">
    <NavBack title="Freespin" />
    <div class="page-inner">
      <div class="pitem purple" @click="router.push('/freespin/daily')">
        <div class="content">
          <p class="title">{{ $t('free.daily.title') }}</p>
          <p class="bonus">{{ $t('free.upt') }} 5 {{ $t('free.bnus') }}</p>
          <button class="button active join purple">{{ $t('free.jinnw') }}</button>
        </div>
        <img class="img" src="@/assets/images/bg1.png" alt="">
      </div>
      <div class="pitem orange" @click="router.push('/freespin/weekly')">
        <img class="img" src="@/assets/images/bg2.png" alt="">
        <div class="content">
          <p class="title">{{ $t('free.weekly.title') }}</p>
          <p class="bonus">{{ $t('free.upt') }} 30 {{ $t('free.bnus') }}</p>
          <button class="button active join orange"> {{ $t('free.jinnw') }}</button>
        </div>
      </div>
      <div class="pitem purple" @click="router.push('/freespin/monthly')">
        <div class="content">
          <p class="title">{{ $t('free.monthly.title') }}</p>
          <p class="bonus">{{ $t('free.upt') }} 100 {{ $t('free.bnus') }}</p>
          <button class="button active join purple"> {{ $t('free.jinnw') }}</button>
        </div>
        <img class="img" src="@/assets/images/bg3.png" alt="">
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import NavBack from "@/components/NavBack.vue";
import { useRouter } from 'vue-router';

const router = useRouter()
</script>
<style lang="less" scoped>
.page-inner {
  min-height: calc(100vh - 55px);
  padding: 10px;
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
        font-weight: 600;
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