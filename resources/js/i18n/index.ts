import { createI18n } from 'vue-i18n'
import { en } from '@/i18n/en'
import { id } from '@/i18n/id'

export type AppLocale = 'en' | 'id'

export const SUPPORTED_LOCALES: AppLocale[] = ['en', 'id']

export function resolveLocale(value: unknown): AppLocale {
  return value === 'id' || value === 'en' ? value : 'en'
}

export function createAppI18n(locale: AppLocale = 'en') {
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en',
    messages: { en, id },
  })
}
