<template>
  <div class="page">
    <button class="close-icon" @click="router.back()">
      <svg-icon name="Close" />
    </button>
    <div class="container">
      <div class="form">
        <p class="form-title">{{ $t('account.changepwd') }}</p>
        <div class="ui-input">
          <div class="input-control">
            <input @input="validateForm('password')" v-model="form.password" type="text" :placeholder="$t('resetpwd.old')">
          </div>
          <p class="ui-error-tip">{{ formErr.password }}</p>
        </div>
        <div class="ui-input">
          <div class="input-control">
            <input @input="validateForm('newPassword')" v-model="form.newPassword" :type="showPwd ? 'text':'password'" :placeholder="$t('resetpwd.new')">
            <span class="eyes">
              <svg-icon :name="showPwd ? 'View':'Hide'" @click="togglePassword" />
            </span>
          </div>
          <p class="ui-error-tip">{{ formErr.newPassword }}</p>
        </div>
        <div class="ui-input">
          <div class="input-control">
            <input @input="validateForm('confirmNewPassword')" v-model="form.confirmNewPassword" :type="showPwd ? 'text':'password'" :placeholder="$t('resetpwd.cnew')">
            <span class="eyes">
              <svg-icon :name="showPwd ? 'View':'Hide'" @click="togglePassword" />
            </span>
          </div>
          <p class="ui-error-tip">{{ formErr.confirmNewPassword }}</p>
        </div>
        <div class="submit">
          <button class="button active submit-btn" @click="onSubmit">
              {{ $t('common.submit') }}
            </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { showNotify } from 'vant';
import { useI18n } from 'vue-i18n'
import { ref, computed } from "vue";
import { useRouter } from 'vue-router'
import { isPassword } from '@/utils/validate'
import { changePassword } from '@/api/api';
import useUserStore from '@/stores/user';

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()
const showPwd = ref(false)
function togglePassword() {
  showPwd.value = !showPwd.value
}
const form = ref({
  password: '',
  newPassword: '',
  confirmNewPassword: ''
})
const formErr = ref({
  password: '',
  newPassword: '',
  confirmNewPassword: ''
})
const isCanSubmit = computed(() => formErr.value.password === '' && formErr.value.newPassword === ''  && formErr.value.confirmNewPassword === '')

const validateForm = (type: string) => {
  if (type === 'password') {
    formErr.value.password = isPassword(form.value.password) ? '' : t('common.passwordErr')
  } else if (type === 'newPassword') {
    formErr.value.newPassword = isPassword(form.value.newPassword) ? '' : t('common.passwordErr')
  } else if (type === 'confirmNewPassword') {
    formErr.value.confirmNewPassword = form.value.confirmNewPassword === form.value.newPassword ? '' : t('register.confirmPasswordErr')
  } else {
    formErr.value.password = isPassword(form.value.password) ? '' : t('common.passwordErr')
    formErr.value.newPassword = isPassword(form.value.newPassword) ? '' : t('common.passwordErr')
    formErr.value.confirmNewPassword = form.value.confirmNewPassword === form.value.newPassword ? '' : t('register.confirmPasswordErr')
    return Promise.resolve(true)
  }
}
const onSubmit = async () => {
  await validateForm('all')
  if (!isCanSubmit.value) return
  try {
    await changePassword({ password: form.value.password, newPassword: form.value.newPassword })
    showNotify({ type: 'success', teleport: '#app', message: t('others.loginAgain') });
    userStore.loginOut().then(_res => {
      router.replace('/login?redirect=/')
    })
  } catch (error) {
  }
};
</script>
<style lang="less" scoped>
.page {
  .container {
    padding: 28px;
    padding-top: 80px;
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-y;
    overscroll-behavior: contain;
  }
}
.form {
  margin-top: 30px;
  text-align: left;
  .form-title {
    font-size: 14px;
    font-weight: 700;
  }
  .ui-error-tip {
    font-size: 12px;
    color: red;
    height: 5px;
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
    .eyes{
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      padding: 0 10px;
      display: flex;
      align-items: center;
    }
  }
  .submit {
    margin-top: 17px;
    .submit-btn {
      font-size: 14px;
      font-weight: 700;
      color: #fff;
    }
  }
}
.close-icon {
  width: 42px;
  height: 42px;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>