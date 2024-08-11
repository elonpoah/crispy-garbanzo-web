<template>
<div class="safe-area-inset-bottom tabbar">
  <div class="tabbar-item" @click="tabbarClick('/')">
    <svg-icon name="Home" class="tabbar-item-icon" />
    <span>Home</span>
  </div>
  <div class="tabbar-item" @click="tabbarClick('/search')">
    <div class="tabbar-item-middle-wrap">
      <div class="tabbar-item-middle-wrap-out">
        <div class="tabbar-item-middle-wrap-in">
          <svg-icon name="Search" class="tabbar-item-icon" />
        </div>
      </div>
    </div>
    <span>Search</span>
  </div>
  <div class="tabbar-item" @click="tabbarClick('/account')">
    <svg-icon name="UserProfile" class="tabbar-item-icon" />
    <span>Account</span>
  </div>
</div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import SvgIcon from "./SvgIcon.vue";

const router = useRouter()
function tabbarClick(path: string) {
  router.push(path)
}
</script>
<style lang="less" scoped>
.tabbar {
  width: 100%;
  height: 56px;
  position: fixed;
  z-index: 999;
  bottom: -1px;
  left: 0;
  right: 0;
  display: flex;
  background: #1C1E22;
  .tabbar-item {
    width: 33.3%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    span{
      color: #ffffff;
      font-size: 10px;
      font-weight: 500;
      position: relative;
      z-index: 2;
      margin-top: 5px;
    }
  }
}
.tabbar-item-middle-wrap {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  position: relative;
  .tabbar-item-middle-wrap-out {
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #1C1E22;
    position: absolute;
    top: -23px;
  }
  .tabbar-item-middle-wrap-in {
    width: 39px;
    height: 39px;
    border-radius: 50%;
    background: #373C48;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>