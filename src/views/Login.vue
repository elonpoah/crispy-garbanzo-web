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
        <p class="form-title">Sign in</p>
        <div class="ui-input">
          <div class="input-control">
            <input type="text" placeholder="Email / Phone Number">
          </div>
        </div>
        <div class="ui-input">
          <div class="input-control">
            <input :type="showPwd ? 'text':'password'" placeholder="Login Password">
            <span class="eyes">
              <svg-icon :name="showPwd ? 'View':'Hide'" @click="togglePassword" />
            </span>
          </div>
        </div>
        <div class="submit">
          <button class="button active submit-btn">
              Sign in
            </button>
        </div>
      </div>
      <div class="b-tips"><p>New to HACHO.GAME?</p><router-link :replace="true" to="/register">Create account</router-link></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import { ref } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter()
const showPwd = ref(false)
function togglePassword() {
  showPwd.value = !showPwd.value
}
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