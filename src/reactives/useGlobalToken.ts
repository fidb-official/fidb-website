import { reactive, watch } from 'vue'

type Token = {
  name: string
  authorization: string // http header
}

const globalToken: Token = reactive({
  name: '',
  get authorization() {
    return `token ${this.name}`
  },
})

let initialized = false

export function useGlobalToken(): Token {
  if (initialized) {
    return globalToken
  }

  globalToken.token = window.localStorage.getItem('token') || ''

  initialized = true

  return globalToken
}

watch(
  () => globalLang.token,
  (value) => {
    window.localStorage.setItem('token', value)
  },
)
