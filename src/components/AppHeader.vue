<template>
  <nav>
    <div class="nav-wrap">
      <span class="logo" @click="router.back()">
        <img width="40px" src="@/assets/images/png.png" alt="">
      </span>
      <div class="inner">
        <div v-if="userStore.isLogin" class="user-info">
          <div class="wallet">
            <p class="coin">${{ userStore.info?.balance || '0.00' }}</p>
            <svg-icon class="wallet-icon" name="Wallet" />
          </div>
        </div>
        <div v-else class="btn-group">
          <router-link to="/login" class="button btn btn-sign-in">
            Sign in
          </router-link>
          <router-link to="/register" class="button btn btn-sign-up active">
            Sign up
          </router-link>
        </div>
        <div class="lang" @click="toggleLang">
          <svg-icon class="lang-icon" name="Language" />
        </div>
      </div>
      <div class="lang-toggle-wrap" :class="{active: showLang}">
        <div class="cus-scrollview list">
          <button class="lang-item active"><span>English</span></button>
          <button class="lang-item"><span>Português</span></button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router'
import SvgIcon from "./SvgIcon.vue";
import useUserStore from '@/stores/user'

const router = useRouter()
const showLang = ref(false);
const userStore = useUserStore()
function toggleLang() {
  showLang.value = !showLang.value
}
</script>
<style lang="less" scoped>
nav {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 428px;
  z-index: 99;
  height: 50px;
  padding-left: 10px;
  background-color: #24262b;
  box-shadow: 0 4px 14px 0 #00000040;
  .nav-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    height: 100%;
    .logo {
      display: flex;
      align-items: center;
    }
    .inner {
      display: flex;
      align-items: center;
      position: relative;
      z-index: 2;
      background-color: #24262b;
    }
    .user-info {
      padding-left: 100px;
      .wallet {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #394348;
        border-radius: 4px;
        padding: 5px 8px;
        .coin {
          font-size: 14px;
          font-weight: bold;
          color: var(--primary-color);
        }
        .wallet-icon {
          margin-left: 5px;
          fill: #ffffff;
        }
      }
    }
    .btn-group {
      display: flex;
      align-items: center;
      .btn {
        width: 110px;
        height: 34px;
        line-height: 34px;
        border-radius: 4px;
        font-size: 12px;
        margin-left: 10px;
        color: #ffffff;
      }
    }
    .lang {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      position: relative;
      .lang-icon {
        width: 22px;
        height: 22px;
      }
    }
    .lang-toggle-wrap {
      position: absolute;
      top: 108%;
      right: 0;
      z-index: 1;
      width: 150px;
      height: 100px;
      overflow: hidden;
      background-color: #24262B;
      border-radius: 4px;
      box-shadow: 0 4px 14px #00000040;
      opacity: 0;
      transform: translateY(-150%) translateZ(0px);
      transition: transform .2s linear;
      &.active {
        opacity: 1;
        transform: translateY(0%) translateZ(0px);
      }
      .list {
        padding: 6px 10px;
      }
      .lang-item {
        width: 100%;
        height: 38px;
        border-radius: 4px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        font-size: 14px;
        padding-left: 10px;
        &.active {
          background: #2D3035;
          span {
            font-weight: 700;
            color: var(--default-color);
          }
        }
      }
    }
  }
}
</style>
