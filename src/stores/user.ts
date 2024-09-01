import { defineStore } from 'pinia'
import storage from '@/utils/storage'
import { getUserInfo } from '@/api/api'
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
    },
    getInfo() {
      getUserInfo().then(res => {
        if(res.code === 0) this.info = res.data
      })
    },
    loginOut() {
      this.info = null
      storage.clearItem('token')
      return Promise.resolve(true)
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
