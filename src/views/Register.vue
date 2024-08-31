<template>
  <div class="page">
    <button class="close-icon" @click="router.back()">
      <svg-icon name="Close" />
    </button>
    <div class="container">
      <div class="logo"><svg-icon class="logo-svg" name="Line-logo" /></div>
      <h1 class="title">
        <p>
          Welcome to
          <span>HACHO.GAME</span>
        </p>
        <p>Start your game journey now!</p>
      </h1>
      <div class="form">
        <p class="form-title">Sign up</p>
        <div class="ui-input">
          <div class="input-control">
            <input @input="validateForm('username')" v-model="form.username" type="text" placeholder="Username">
          </div>
          <p class="ui-error-tip">{{ formErr.username }}</p>
        </div>
        <div class="ui-input">
          <div class="input-control">
            <input @input="validateForm('password')" v-model="form.password" :type="showPwd ? 'text':'password'" placeholder="Password">
            <span class="eyes">
              <svg-icon :name="showPwd ? 'View':'Hide'" @click="togglePassword" />
            </span>
          </div>
          <p class="ui-error-tip">{{ formErr.password }}</p>
        </div>
        <div class="ui-input">
          <div class="input-control">
            <input @input="validateForm('confirmPassword')" v-model="form.confirmPassword" :type="showPwd ? 'text':'password'" placeholder="Confirm Password">
            <span class="eyes">
              <svg-icon :name="showPwd ? 'View':'Hide'" @click="togglePassword" />
            </span>
          </div>
          <p class="ui-error-tip">{{ formErr.confirmPassword }}</p>
        </div>
        <div class="submit">
          <button class="button active submit-btn" @click="onSubmit">
              Sign up
            </button>
        </div>
      </div>
      <div class="b-tips"><p>Already have an account?</p><router-link :replace="true" to="/login">Sign in</router-link></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { showNotify } from 'vant';
import SvgIcon from "@/components/SvgIcon.vue";
import { ref, computed } from "vue";
import { useRouter } from 'vue-router'
import { register } from '@/api/api';
import storage from '@/utils/storage';
import useUserStore from '@/stores/user';
import { isUsername, isPassword } from '@/utils/validate';

const router = useRouter()
const userStore = useUserStore()
const showPwd = ref(false)
const togglePassword = () => {
  showPwd.value = !showPwd.value
}

const form = ref({
  username: '',
  password: '',
  confirmPassword: ''
})
const formErr = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const isCanSubmit = computed(()=> formErr.value.username === '' && formErr.value.password === '' && formErr.value.confirmPassword === '')
const validateForm = (type: string) => {
  if(type === 'username') {
    formErr.value.username = isUsername(form.value.username) ? '':'包含数字和字母，长度为5-10位'
  } else if(type === 'password') {
    formErr.value.password = isPassword(form.value.password) ? '':'数字,字母,特殊符号，长度为5-10位'
  } else if(type === 'confirmPassword') {
    formErr.value.confirmPassword = form.value.password !== form.value.confirmPassword ? '':'两次输入的密码不一致'
  } else {
    formErr.value.username = isUsername(form.value.username) ? '':'包含数字和字母，长度为5-10位'
    formErr.value.password = isPassword(form.value.password) ? '':'数字,字母,特殊符号，长度为5-10位'
    formErr.value.confirmPassword = form.value.password !== form.value.confirmPassword ? '':'两次输入的密码不一致'
    return Promise.resolve(true)
  }
}

const onSubmit = async () => {
  await validateForm('all')
  if(!isCanSubmit.value) return
  try {
    const res = await register({username: form.value.username, password: form.value.password})
    storage.setItem('token', res.data.token)
    userStore.setUserInfo(res.data.user)
    showNotify({ type: 'success', teleport: '#app', message: res.msg });
    router.replace('/')
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
    .logo {
    text-align: center;
    &-svg {
      width: 110px;
      height: 110px;
    }
  }
  .title {
    text-align: right;
    span,p {
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
    }
    span {
      color: var(--primary-color);
    }
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
      margin-top: 30px;
      .submit-btn {
        font-size: 14px;
        font-weight: 700;
        color: #fff;
      }
    }
  }
  .b-tips {
    font-size: 12px;
    color: #98A7B5;
    margin-top: 17px;
    display: flex;
    p{
      font-weight: 800;
    }
    a{
      font-weight: 800;
      margin-left: 10px;
      color: var(--primary-color);
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