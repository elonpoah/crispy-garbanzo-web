import { defineStore } from 'pinia'

interface UserSate  {
  info: UserInfo | null
}

export default defineStore('user', {
  state: (): UserSate => ({
    info: null,
  }),
  getters: {
    isLogin: (state) => state.info !== null,
    userInfo: (state) => state.info,
  },
  actions: {
    setUserInfo(info:any) {
      this.info = info
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage, // 默认是sessionStorage
        paths: ["info"],
      },
    ],
  },
})
