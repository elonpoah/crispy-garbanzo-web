<template>
<div class="page">
  <NavBack :title="$t('account.deposit')" />
  <div class="container">
    <div>
      <div class="header">
        <div class="header-item">
          <img class="usdt-icon" src="@/assets/images/USDT.webp" alt="">
          <div class="value">USDT</div>
          <svg-icon class="arrow-icon" name="Arrow" />
        </div>
        <div class="header-item" @click="openTypePicker">
          <div class="value">{{ selectNetworkType?.text || '' }}</div>
          <svg-icon class="arrow-icon" name="Arrow" />
        </div>
      </div>
      <div v-if="!success">
        <div class="fast-number">
          <div class="fast-title">{{ $t('account.fastvalue') }}</div>
          <van-row class="number-wrap" :gutter="[5,5]">
            <van-col span="8" v-for="e in fastNum" :key="e">
              <div class="number-item" :class="{active: coinValue == e}" @click="coinValue = e">{{ e }}</div>
            </van-col>
          </van-row>
        </div>
        <div class="fast-number">
          <div class="fast-title">{{ $t('account.entervalue') }}</div>
          <div class="input-control">
            <input v-model="coinValue" type="text" :placeholder="$t('account.entervalue')">
          </div>
        </div>
        <div class="submit">
          <button class="button active submit-btn" @click="submitForm">
            {{ $t('common.submit') }}
            </button>
        </div>
      </div>
    </div>
    <div class="success-container"  v-if="success" >
      <p class="time-down">
        {{ $t('account.depositTitle') }}
      </p>
      <div class="qr-code">
        <qrcode-vue :value="tokenAddress" :level="level" :margin="2" :size="140" :render-as="renderAs" />
        <van-count-down class="time-down-value" format="mm m ss s" :time="5*60*1000" />
      </div>
      <p class="address-tip">{{ $t('account.tokenaddress') }}</p>
      <div class="address-block">
        <p class="text">{{ tokenAddress }}</p>
        <span class="copy-btn" v-clipboard:copy="tokenAddress"
        v-clipboard:success="onSuccess"
        v-clipboard:error="onError">{{ $t('account.copy') }}</span>
      </div>
      <p class="warning-wrap">
        <span class="title">{{ $t('account.notice') }}</span> 
        {{ $t('account.depositTips') }}
      </p>
      <div class="submit">
        <button class="button active submit-btn" @click="transformConfim">
          {{ $t('account.alreadysend') }}
          </button>
      </div>
    </div>
  </div>
  <van-popup v-model:show="showPicker" round position="bottom">
    <van-picker
      :columns="columns"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    />
  </van-popup>
</div>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue"
import { ref } from "vue"
import QrcodeVue from 'qrcode.vue'
import { showNotify } from 'vant'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { Level, RenderAs } from 'qrcode.vue'
import useUserStore from '@/stores/user'
import { userDeposit } from '@/api/api'

const userStore = useUserStore()
const { t } = useI18n()
const tokenAddress = ref('qrcode')
const level = ref<Level>('M')
const renderAs = ref<RenderAs>('svg')

const router = useRouter()
const fastNum = [10, 50, 100, 200, 500, 1000]
const coinValue = ref()
const success = ref(false)

const columns:NetworkType[] = [
  { text: 'ERC20', value: 1 },
  { text: 'TRC20', value: 2 },
];
const selectNetworkType = ref<NetworkType>(columns[1]);
const showPicker = ref(false);

const onConfirm = ({ selectedOptions }: any) => {
  showPicker.value = false;
  selectNetworkType.value = selectedOptions[0];
};

const openTypePicker = () => {
  if(success.value) return;
  showPicker.value = !showPicker.value
}


const onSuccess = () => {
  showNotify({ type: 'success', teleport: '#app', message: t('others.copysuccess') });
}
const onError = () => {
  
  showNotify({ type: 'warning', teleport: '#app', message: t('others.copyfail') });
}
const submitForm = () => {
  if(!coinValue.value || coinValue.value <= 0) return
  userDeposit({
    userName: userStore.userInfo?.userName || '',
    type: selectNetworkType.value?.value,
    amount: coinValue.value || 0
  }).then((res)=> {
    success.value = true
    tokenAddress.value = res.data
  })
}
const transformConfim = () => {
  router.back()
}
</script>
<style lang="less" scoped>
.container {
  background-color: #2E3035;
  padding: 10px;
  min-height: 100vh;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-item {
      flex: 1;
      height: 40px;
      border-radius: 4px;
      background-color: #24262b;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px 0 15px;
      &:last-child {
        margin-left: 10px;
      }
      .usdt-icon {
        width: 24px;
        height: 24px;
      }
      .value {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
  .fast-number {
    margin-top: 20px;
    .fast-title {
      font-size: 16px;
      font-weight: 600;
    }
    .number-wrap {
      margin-top: 10px;
      .number-item {
        border-radius: 4px;
        background-color: #24262b;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        padding: 10px 0;
        &.active {
          background-color: rgb(29 171 114);
        }
      }
    }
  }
  .input-control {
    height: 40px;
    border: 1px solid transparent;
    background-color: #1A1C20;
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 4px;
    margin-top: 17px;
    input {
      flex: 1;
      width: 100%;
      height: 100%;
      padding: 0 10px;
      min-width: 1rem;
      color: #f5f6f7;
      font-size: 14px;
    }
  }
  .submit {
    margin-top: 30px;
    .submit-btn {
      font-size: 14px;
      font-weight: 700;
      color: #fff;
    }
  }
  .success-container {
    margin-top: 10px;
    .time-down {
      font-size: 16px;
      font-weight: 500;
      opacity: 0.8;
      color: var(--default-color);
      margin-bottom: 20px;
    }
    .time-down-value {
      font-size: 14px;
      font-weight: 500;
      opacity: 0.8;
      color: var(--primary-color);
    }
    .qr-code {
      text-align: center;
    }
    .address-tip {
      font-size: 14px;
      margin-top: 20px;
    }
    .address-block {
      margin-top: 10px;
      background-color: #24262b;
      padding: 5px;
      font-size: 14px;
      display: flex;
      .text {
        flex: 1;
        overflow: hidden;
        word-break: break-all;
      }
      .copy-btn {
        border: 1px solid var(--primary-color);
        border-radius: 4px;
        color: var(--primary-color);
        width: 45px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        margin-left: 5px;
      }
    }
    .warning-wrap {
      .title {
        color: var(--primary-color);
        font-weight: 700;
      }
      font-size: 12px;
      background: rgba(58, 201, 72, .1);
      padding: 5px;
      margin-top: 20px;
    }
  }
}
</style>