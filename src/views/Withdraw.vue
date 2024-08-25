<template>
  <div class="page">
    <NavBack title="Withdraw" />
    <div class="container">
      <div v-if="!success">
        <div class="header">
          <div class="header-item">
            <img class="usdt-icon" src="@/assets/images/USDT.webp" alt="">
            <div class="value">USDT</div>
            <svg-icon class="arrow-icon" name="Arrow" />
          </div>
          <div class="header-item">
            <div class="value">ERC20</div>
            <svg-icon class="arrow-icon" name="Arrow" />
          </div>
        </div>
        <div class="fast-number">
          <div class="fast-title">Available balance: <span>102</span></div>
          <div class="input-control">
            <input type="text" placeholder="Enter Number">
          </div>
        </div>
        <div class="submit">
          <button class="button active submit-btn" @click="submitForm">
              Confirm
            </button>
        </div>
      </div>
      <SubmitSuccess v-else />
    </div>
  </div>
  </template>
  <script setup lang="ts">
  import SvgIcon from "@/components/SvgIcon.vue";
  import SubmitSuccess from "@/components/SubmitSuccess.vue";
  import { ref } from "vue"
  
  const success = ref(false)
  const submitForm = () => {
    success.value = true
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