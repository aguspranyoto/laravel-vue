import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { AppLocale } from '@/i18n'
import { resolveLocale } from '@/i18n'

export const useLocaleStore = defineStore('locale', () => {
  const locale = ref<AppLocale>('en')

  const label = computed(() => (locale.value === 'id' ? 'ID' : 'EN'))

  function persist(value: AppLocale) {
    try {
      document.cookie = `locale=${value}; path=/; max-age=31536000; SameSite=Lax`
      if (typeof localStorage !== 'undefined')
        localStorage.setItem('locale', value)
    }
    catch { /* noop */ }
  }

  function apply(value: AppLocale) {
    const { locale: i18nLocale } = useI18n()
    i18nLocale.value = value
    if (typeof document !== 'undefined')
      document.documentElement.lang = value === 'id' ? 'id' : 'en'
  }

  function set(value: AppLocale) {
    locale.value = value
    persist(value)
    try {
      apply(value)
    }
    catch { /* store used without i18n installed (tests) */ }
  }

  function init(initial?: string | null) {
    let start = resolveLocale(initial)
    if (initial !== 'en' && initial !== 'id' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('locale')
      if (saved === 'en' || saved === 'id')
        start = saved
    }
    locale.value = start
    persist(start)
  }

  return { locale, label, set, init }
})
