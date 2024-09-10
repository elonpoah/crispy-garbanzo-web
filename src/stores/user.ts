import { defineStore } from 'pinia'
import storage from '@/utils/storage'
import { getUserInfo, getSessionSummary } from '@/api/api'
interface UserSate  {
  info: UserInfo | null
  sessionSummary: UserSummary | null
  loading: boolean
}

export default defineStore('user', {
  state: (): UserSate => ({
    info: null,
    sessionSummary: null,
    loading: true
  }),
  getters: {
    isLogin: (state) => state.info !== null,
    userInfo: (state) => state.info,
    loadingPage: (state) => state.loading,
  },
  actions: {
    setUserInfo(info:any) {
      this.info = info
    },
    setLoadingPage() {
      this.loading = !this.loading
    },
    getInfo() {
      getUserInfo().then(res => {
        if(res.code === 0) this.info = res.data
      })
    },
    getUserSummary() {
      getSessionSummary().then(res => {
        if(res.code === 0) this.sessionSummary = res.data
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
