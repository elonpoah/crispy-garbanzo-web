import { createI18n } from 'vue-i18n'
import storage from '@/utils/storage'
import enUS from './locales/en-US.json'
import zhCN from './locales/zh-CN.json'

import idID from './locales/id-ID.json'
import jaJP from './locales/ja-JP.json'
import koKR from './locales/ko-KR.json'
import thTH from './locales/th-TH.json'
import viVN from './locales/vi-VN.json'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: storage.getItem('lang') || 'en-US',
  fallbackLocale: 'en-US',
  messages: {
      'en-US': enUS,
      'zh-CN': zhCN,
      'id-ID': idID,
      'ja-JP': jaJP,
      'ko-KR': koKR,
      'th-TH': thTH,
      'vi-VN': viVN
  }
})


export const setCurrentLang = (lang: SupportedLanguages) => {
  i18n.global.locale.value = lang;
  document.querySelector('html')?.setAttribute('lang', lang)
  storage.setItem('lang', lang);
};

export default i18n