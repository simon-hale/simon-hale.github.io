import { createI18n } from 'vue-i18n'
import en from './locales/en'
import zhHans from './locales/zh-Hans'

export const supportedLocales = ['zh-Hans', 'en'] as const
export type AppLocale = (typeof supportedLocales)[number]

export const localeStorageKey = 'portfolio-locale'
export const defaultLocale: AppLocale = 'zh-Hans'

function isAppLocale(value: string | null): value is AppLocale {
  return value === 'zh-Hans' || value === 'en'
}

function getInitialLocale(): AppLocale {
  try {
    const savedLocale = window.localStorage.getItem(localeStorageKey)
    return isAppLocale(savedLocale) ? savedLocale : defaultLocale
  } catch {
    return defaultLocale
  }
}

const initialLocale = getInitialLocale()

export const i18n = createI18n<false>({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: defaultLocale,
  messages: {
    'zh-Hans': zhHans,
    en,
  },
})

if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLocale
}

export function setAppLocale(locale: AppLocale): void {
  i18n.global.locale.value = locale
  if (typeof document !== 'undefined') document.documentElement.lang = locale

  try {
    window.localStorage.setItem(localeStorageKey, locale)
  } catch {
    // Locale switching remains available when browser storage is unavailable.
  }
}
