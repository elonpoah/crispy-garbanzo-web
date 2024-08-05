<template>
  <nav>
    <div class="nav-wrap">
      <span class="logo">Crypto</span>
      <div class="inner">
        <div class="btn-group">
          <button class="button btn btn-sign-in">Sign in</button>
          <button class="button btn btn-sign-up active">Sign up</button>
        </div>
        <svg-icon name="Language" />
      </div>
    </div>
  </nav>
  <div class="empty-box"></div>
</template>
<script setup lang="ts">
import SvgIcon from "./SvgIcon.vue";
</script>
<style lang="less" scoped>
.empty-box {
  height: 50px;
}
nav {
  position: fixed;
  z-index: 999;
  left: 0;
  top: -1px;
  right: 0;
  height: 50px;
  padding: 0 10px;
  background-color: #24262b;
  box-shadow: 0 4px 14px 0 #00000040;
  z-index: 2;
  .nav-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    height: 100%;
    .logo {
      font-weight: 800;
      font-size: 24px;
    }
    .inner {
      display: flex;
      align-items: center;
    }
    .btn-group {
      display: flex;
      align-items: center;
      .btn {
        width: 110px;
        height: 34px;
        border-radius: 4px;
        font-size: 12px;
        margin-right: 10px;
        color: #ffffff;
      }
    }
  }
}
</style>
