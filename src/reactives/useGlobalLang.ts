import { reactive, watch } from 'vue'

type Lang = {
  knownTags: Array<string>
  tag: string
  isZh(): boolean
  isEn(): boolean
}

export const globalLang: Lang = reactive({
  knownTags: ['zh', 'en'],
  tag: 'en',

  isZh() {
    return this.tag.startsWith('zh')
  },

  isEn() {
    return !this.isZh()
  },
})

let initialized = false

export function useGlobalLang(): Lang {
  if (initialized) {
    return globalLang
  }

  globalLang.tag = initialTag()
  return globalLang
}

function initialTag(): string {
  const tag = window.localStorage.getItem('lang')
  if (tag) {
    return tag
  }

  if (window.navigator.language.startsWith('zh')) {
    return 'zh'
  }

  return 'en'
}

watch(
  () => globalLang.tag,
  (tag) => {
    window.localStorage.setItem('lang', tag)
  },
)

export function langTagName(tag: string): string {
  switch (tag) {
    case 'zh':
      return '中文'
    case 'en':
      return 'English'
    default:
      return 'English'
  }
}
