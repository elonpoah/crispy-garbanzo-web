<template>
  <div class="account-page">
    <div class="header">
      <div class="top">
        <img class="avatar" src="@/assets/images/user_avatar.png" alt="avatar">
        <div class="name-wrap">
          <div class="name">{{ userStore.userInfo?.userName || 'Welcome To HACHO.GAME' }}</div>
          <div class="id">User ID: {{ userStore.userInfo?.uid || '-' }}</div>
        </div>
        <button class="button make-draw" @click="navigateFn('/draw-make')">
          {{ $t('draw.makeAdraw') }}
        </button>
      </div>
      <div class="content">
        <div class="item" @click="navigateFn('/game-history?status=1')">
          <p class="title">{{ $t('account.tobedrawn') }}</p>
          <p class="value">{{ sessionSummary?.sessionCount || '0' }}</p>
        </div>
        <div class="item" @click="navigateFn('/draw-history')">
          <p class="title">{{ $t('draw.mydraw') }}</p>
          <p class="value">
            <!-- {{ sessionSummary?.freeCount || '0' }} -->
            ^o^
          </p>
        </div>
      </div>
    </div>
    <div class="balance-wrap">
      <div class="balance-title">
        <svg-icon class="wallet-icon" name="Wallet" />
        <p>{{ $t('account.wallet') }}</p>
      </div>
      <div class="balance-item-wrap">
        <div class="balance-item">
          <div class="label">{{ $t('account.available') }}</div>
          <div class="value">${{ userStore.userInfo?.balance || '0.00' }}</div>
        </div>
        <div class="balance-item">
          <div class="label">{{ $t('account.frozen') }}</div>
          <div class="value">${{ userStore.userInfo?.freezeBalance || '0.00' }}</div>
        </div>
      </div>
      <div class="balance-btn-group">
        <button class="button submit-btn" @click="navigateFn('/withdraw')">
          {{ $t('account.withdraw') }}
        </button>
        <div class="gap-10"></div>
        <button class="button active submit-btn" @click="navigateFn('/deposit')">
          {{ $t('account.deposit') }}
        </button>
      </div>
    </div>
    <div class="action-wrap">
      <div class="action-item" v-for="e in actionLink" :key="e.name" @click="navigateFn(e.path)">
        <div class="action-aside">
          <svg-icon class="action-icon" :name="e.icon" />
          <p class="action-name">{{ $t(e.name) }}</p>
        </div>
        <svg-icon class="action-link" name="Arrow" />
      </div>
    </div>
    <div>
      <button class="login-out button submit-btn" @click="loginout">{{ $t('account.loginout') }}</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import SvgIcon from "@/components/SvgIcon.vue";
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const sessionSummary = computed(()=> userStore.sessionSummary)
const actionLink = [
  {
    icon: 'History',
    name: 'account.gameh',
    path: '/game-history'
  },
  {
    icon: 'Withdraw',
    name: 'account.withdrawh',
    path: '/withdraw-history'
  },
  {
    icon: 'Deposit',
    name: 'account.deposith',
    path: '/deposit-history'
  },
  {
    icon: 'Slots',
    name: 'account.freeh',
    path: '/freespin-history'
  },
  {
    icon: 'View',
    name: 'account.changepwd',
    path: '/change-pwd'
  }
]

function navigateFn(path: string) {
  router.push(path)
}
const loginout = () => {
  userStore.loginOut().then(_res => router.replace('/'))
}

onMounted(()=> {
  userStore.getUserSummary()
})

</script>
<style lang="less" scoped>
.account-page {
  padding: 10px;
}
.header {
  background-color: #2E3035;
  border-radius: 4px;
  padding: 10px;
  .top {
    display: flex;
    align-items: center;
    .avatar {
      width: 54px;
      height: 54px;
      border-radius: 50%;
    }
    .name-wrap {
      flex: 1;
      margin-left: 10px;
      .name {
        font-size: 16px;
        font-weight: 700;
        color: var(--default-color);
      }
      .id {
        margin-top: 5px;
        color: #98A7B5;
        font-size: 12px;
      }
    }
    .make-draw {
      width: 100px;
      font-size: 14px;
      background: #3e4049;
      border-radius: 17px;
      color: var(--primary-color);
    }
  }
  .content {
    margin-top: 10px;
    padding-top: 10px;
    display: flex;
    align-items: center;
    border-top: 1px solid #34363a;
    .item {
      flex: 1;
      text-align: center;
    }
    .title {
      color: #d8e3ed;
      font-size: 14px;
    }
    .value {
      margin-top: 5px;
      font-size: 16px;
      font-weight: 700;
      color: var(--primary-color);
    }
  }
}
.balance-wrap {
  background-color: #2E3035;
  border-radius: 4px;
  padding: 17px 10px;
  margin-top: 10px;
  .balance-title {
    display: flex;
    align-items: center;
    .wallet-icon {
      width: 22px;
      height: 22px;
      fill: var(--primary-color);
    }
    p {
      font-size: 16px;
      font-weight: 700;
      color: #d8e3ed;
      margin-left: 5px;
    }
  }
  .balance-item-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #3e4346;
    border-radius: 8px;
    padding: 10px;
    margin: 10px auto 15px;
  }
  .balance-item {
    text-align: center;
    flex: 1;
    .label {
      font-size: 14px;
      font-weight: 500;
      color: #d8e3ed;
      min-width: 100px;
    }
    .value {
      font-size: 20px;
      font-weight: 700;
      color: var(--default-color);
    }
  }
  .balance-btn-group {
    display: flex;
    .gap-10{
      width: 20px;
    }
    .submit-btn {
      font-size: 14px;
      font-weight: 700;
      color: #fff;
    }
  }
}
.action-wrap {
  background-color: #2E3035;
  border-radius: 4px;
  padding: 17px 10px;
  margin-top: 10px;
  .action-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-top: 1px solid #34363a;
    &:first-child {
      border: none;
    }
    .action-aside {
      flex: 1;
      display: flex;
      align-items: center;
    }
    .action-name {
      font-size: 14px;
      color: #ffffff;
      font-weight: 500;
      margin-left: 10px;
    }
    .action-icon {
      fill: #67707B;
      width: 20px;
      height: 20px;
    }
    .action-link {
      fill: #67707B;
      width: 20px;
      height: 20px;
    }
  }
}
.login-out {
  margin: 20px auto;
  font-size: 14px;
  height: 44px;
}
</style>
