<template>
  <div class="page">
    <button class="close-icon" @click="router.back()">
      <svg-icon name="Close" />
    </button>
    <div class="container">
      <div class="form">
        <p class="form-title">Change password</p>
        <div class="ui-input">
          <div class="input-control">
            <input type="text" placeholder="Old password">
          </div>
        </div>
        <div class="ui-input">
          <div class="input-control">
            <input :type="showPwd ? 'text':'password'" placeholder="New password">
            <span class="eyes">
              <svg-icon :name="showPwd ? 'View':'Hide'" @click="togglePassword" />
            </span>
          </div>
        </div>
        <div class="ui-input">
          <div class="input-control">
            <input :type="showPwd ? 'text':'password'" placeholder="Confirm new password">
            <span class="eyes">
              <svg-icon :name="showPwd ? 'View':'Hide'" @click="togglePassword" />
            </span>
          </div>
        </div>
        <div class="submit">
          <button class="button active submit-btn">
              Submit
            </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
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