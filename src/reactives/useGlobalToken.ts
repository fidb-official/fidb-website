import { reactive, watch } from 'vue'
import { formatAuthorizationHeader } from '../utils/formatAuthorizationHeader'

type Token = {
  name: string
  authorization: string // http header
}

const globalToken: Token = reactive({
  name: '',
  get authorization() {
    return formatAuthorizationHeader(this.name)
  },
})

let initialized = false

export function useGlobalToken(): Token {
  if (initialized) {
    return globalToken
  }

  globalToken.name = window.localStorage.getItem('token') || ''

  initialized = true

  return globalToken
}

watch(
  () => globalToken.name,
  (value) => {
    window.localStorage.setItem('token', value)
  },
)
