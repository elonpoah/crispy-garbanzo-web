import { defineStore } from 'pinia'
import { getPlatformSetting } from '@/api/api'
interface UserSate  {
  config: TypesPlatformConfig | null
}

export default defineStore('platform', {
  state: (): UserSate => ({
    config: {},
  }),
  getters: {
    finance: (state) => state.config?.finance,
    invite: (state) => state.config?.invite,
  },
  actions: {
    getPlatformConfig() {
      getPlatformSetting().then(res => {
        if(res.code === 0) this.config = res.data
      })
    },
  },
})
