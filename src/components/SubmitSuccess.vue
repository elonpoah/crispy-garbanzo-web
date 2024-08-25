<template>
<div class="form-success">
  <div class="check-circle">
    <svg-icon class="check-icon" name="Check" />
  </div>
  <div class="check-text">Submit Sucessful</div>
  <div class="submit">
    <button class="button active submit-btn" @click="router.back()">
        Back
      </button>
  </div>
</div>
</template>
<script setup lang="ts">
import SvgIcon from "./SvgIcon.vue";
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<style lang="less" scoped>
.form-success {
  margin-top: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .check-circle {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 4px solid var(--primary-color);
  }
  .check-icon {
    width: 40px;
    height: 40px;
    fill: var(--primary-color);
  }
  .check-text {
    margin-top: 20px;
    font-size: 22px;
  }
  .submit {
    margin-top: 30px;
    width: 80%;
    .submit-btn {
      font-size: 14px;
      font-weight: 700;
      color: #fff;
    }
  }
}
</style>