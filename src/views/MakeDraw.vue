<template>
  <div class="page">
    <NavBack :title="$t('draw.makeAdraw')" />
    <van-form class="fblck" @submit="onSubmit">
      <van-cell-group inset>
        <van-field name="bonusType" :label="$t('draw.type')">
          <template #input>
            <van-radio-group v-model="loginForm.bonusType" direction="horizontal">
              <van-radio :name="1" shape="square">{{ $t('draw.random') }}</van-radio>
              <van-radio :name="2" shape="square">{{ $t('draw.fixed') }}</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          name="count"
          type="digit"
          :min="1"
          v-model="loginForm.count" 
          :placeholder="$t('draw.input')"
          :label="$t('draw.count')"
          :rules="[{ pattern, message: $t('draw.placeHolder') }]"
        />
        <van-field
          :min="1" 
          name="bonus"
          v-model="loginForm.bonus" 
          type="digit"
          placeholder="请输入"
          :label="loginForm.bonusType == 2 ?$t('draw.everyBonus'):$t('draw.bonus')" 
          :rules="[{ pattern, message: $t('draw.placeHolder') }]" 
        />
        <p class="tips">Tips: 48 {{ $t('draw.tips') }}</p>
        <van-button type="primary" class="button active sub" :loading="loading" native-type="submit">
          {{ $t('draw.generateUrl') }}
        </van-button>
        <van-dialog v-model:show="show" :show-confirm-button="false">
          <p class="share-url"> {{ shareUrl }}</p>
          <van-button type="primary" class="button active sub"
          v-clipboard:copy="shareUrl"
          v-clipboard:success="onSuccess"
          v-clipboard:error="onError">
          {{ $t('draw.copyUrl') }}
          </van-button>
        </van-dialog>
      </van-cell-group>
    </van-form>
  </div>
  </template>
  <script setup lang="ts">
  import { ref } from 'vue';
  import { showNotify } from 'vant';
  import { useI18n } from 'vue-i18n';
  import NavBack from "@/components/NavBack.vue";
  import { makeDraw } from '@/api/api';
  import useUserStore from '@/stores/user'

  const { t } = useI18n()
  const userStore = useUserStore()
  const pattern: RegExp = /^[1-9]\d*$/;
  const loginForm = ref({
    bonus: '',
    count: '',
    bonusType: 1,
  })
  const loading = ref(false)
  const show = ref(false)
  const shareUrl= ref('')

  const onSuccess = () => {
    showNotify({ type: 'success', teleport: '#app', message: t('others.copysuccess') });
    show.value = false
  }
  const onError = () => {
    
    showNotify({ type: 'warning', teleport: '#app', message: t('others.copyfail') });
  }

  const onSubmit = async (values:TypesMakeDraw) => {
    const balance = userStore.userInfo?.balance || 0
    const totalPayAmunt = loginForm.value.bonusType == 2 ? +loginForm.value.count * +loginForm.value.bonus : +loginForm.value.bonus
    if(totalPayAmunt > balance ) {
      showNotify({ type: 'warning', teleport: '#app', message: t('others.balanceNEnough') });
      return
    }
    loading.value = true
    try {
      const res = await makeDraw({
        userName: userStore.userInfo?.userName || '',
        bonus: +values.bonus,
        count: +values.count,
        bonusType: values.bonusType
      })
      userStore.getInfo()
      show.value = true
      shareUrl.value = `${location.origin}/lucky/${res.data}`
      loading.value = false
    } catch (error) {
      loading.value = false
    }
  };
  </script>
  <style lang="less" scoped>
  .page {
    .page-inner {
      min-height: calc(100vh - 55px);
    }
    .share-url {
      padding: 30px 0;
      color: #151e1a;
      text-align: center;
    }
    .fblck {
      margin-top: 20px;
    }
    .tips {
      font-size: 12px;
      color: var(--primary-color);
      padding: 0 12px;
      margin-top: 10px;
    }
    .sub {
      width: 88%;
      margin: 20px auto;
      height: 44px;
      font-size: 16px;
      display: block;
    }
    input:hover {
      border: none;
    }
  }
  </style>