import { createI18n } from 'vue-i18n'
import storage from '@/utils/storage'
import enUS from './locales/en-US.json'
import ptBR from './locales/pt-BR.json'
import zhCN from './locales/zh-CN.json'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: storage.getItem('lang') || 'en-US',
  fallbackLocale: 'en-US',
  messages: {
      'en-US': enUS,
      'zh-CN': zhCN,
      'pt-BR': ptBR
  }
})


export const setCurrentLang = (lang: SupportedLanguages) => {
  i18n.global.locale.value = lang;
  document.querySelector('html')?.setAttribute('lang', lang)
  storage.setItem('lang', lang);
};

export default i18n