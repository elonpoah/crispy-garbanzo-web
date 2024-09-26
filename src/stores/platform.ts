import { defineStore } from 'pinia'
import { getPlatformSetting } from '@/api/api'
interface UserSate  {
  config: TypesPlatformConfig
}

export default defineStore('platform', {
  state: (): UserSate => ({
    config: {
      finance: {}
    },
  }),
  getters: {
    finance: (state) => state.config.finance,
  },
  actions: {
    getPlatformConfig() {
      getPlatformSetting().then(res => {
        if(res.code === 0) this.config = res.data
      })
    },
  },
})
