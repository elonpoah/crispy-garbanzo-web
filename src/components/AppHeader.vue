<template>
  <nav>
    <div class="nav-wrap">
      <span class="logo">Hacho</span>
      <div class="inner">
        <div class="btn-group">
          <router-link to="/login" class="button btn btn-sign-in">
            Sign in
          </router-link>
          <router-link to="/register" class="button btn btn-sign-up active">
            Sign up
          </router-link>
        </div>
        <svg-icon name="Language" />
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import SvgIcon from "./SvgIcon.vue";
</script>
<style lang="less" scoped>
nav {
  position: -webkit-sticky;
  position: sticky;
  z-index: 99;
  top: -1px;
  height: 50px;
  padding: 0 10px;
  background-color: #24262b;
  box-shadow: 0 4px 14px 0 #00000040;
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
        line-height: 34px;
        border-radius: 4px;
        font-size: 12px;
        margin-right: 10px;
        color: #ffffff;
      }
    }
  }
}
</style>
