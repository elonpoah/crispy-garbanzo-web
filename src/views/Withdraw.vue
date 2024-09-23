<template>
  <div class="page">
    <NavBack :title="$t('account.withdraw')" />
    <div class="container">
      <div v-if="!success">
        <div class="header">
          <div class="header-item">
            <img class="usdt-icon" src="@/assets/images/USDT.webp" alt="">
            <div class="value">USDT</div>
            <svg-icon class="arrow-icon" name="Arrow" />
          </div>
          <div class="header-item" @click="showPicker = !showPicker">
            <div class="value">{{ selectNetworkType.text || '' }}</div>
            <svg-icon class="arrow-icon" name="Arrow" />
          </div>
        </div>
        <div class="fast-number">
          <div class="fast-title">{{ $t('account.availableBalance') }} <span>{{ userStore.info?.balance || '0.00' }}</span></div>
          <div class="input-control">
            <input v-model="form.amount" type="text" :placeholder="$t('account.entervalue')">
          </div>
        </div>
        <div class="ui-input">
          <div class="input-control">
            <input v-model="form.address" type="textarea" placeholder="wallet address">
          </div>
        </div>
        <div class="submit">
          <button class="button active submit-btn" :disabled="userStore.info?.balance == 0" @click="submitForm">
              {{ $t('common.submit') }}
            </button>
        </div>
      </div>
      <SubmitSuccess v-else />
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
  import { showNotify } from 'vant'
  import { useI18n } from 'vue-i18n'
  import SvgIcon from "@/components/SvgIcon.vue";
  import SubmitSuccess from "@/components/SubmitSuccess.vue";
  import { ref } from "vue"
  import useUserStore from '@/stores/user'
  import { userWithdraw } from '@/api/api'
  const { t } = useI18n()
  
  const userStore = useUserStore()
  const success = ref(false)

  const columns:TypeNetworkType[] = [
    { text: 'ERC20', value: 1 },
    { text: 'TRC20', value: 2 },
  ];
  const form = ref({
    amount: '',
    address: ''
  })
  const selectNetworkType = ref<TypeNetworkType>(columns[1]);
  const showPicker = ref(false);

  const onConfirm = ({ selectedOptions }: any) => {
    showPicker.value = false;
    selectNetworkType.value = selectedOptions[0];
  };
  const submitForm = () => {
    if(+form.value.amount > Number(userStore.info?.balance)) {
      showNotify({ type: 'warning', teleport: '#app', message: t('others.balanceNEnough') });
      return
    }
    if(form.value.address && form.value.amount) {
      userWithdraw({
        amount: +form.value.amount,
        address: form.value.address,
        type: selectNetworkType.value.value,
        userName: userStore.userInfo?.userName || ''
      }).then(()=> {
        success.value = true
        userStore.getInfo()
      })
    }
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
        span {
          color: var(--primary-color);
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
  }
  </style>