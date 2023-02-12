import qs from 'qs'
import { watch } from 'vue'
import { Router } from 'vue-router'
import { State } from './State'

function currentQuery() {
  const url = new URL(window.location.href)
  const query = qs.parse(url.search, { ignoreQueryPrefix: true })
  return query
}

function currentPathname() {
  const url = new URL(window.location.href)
  const pathname = url.pathname
  return pathname
}

export function stateReactivelyUpdateRoute(state: State, router: Router): void {
  watch(
    () => state.page,
    (value) => {
      router.replace({
        path: currentPathname(),
        query: { ...currentQuery(), page: value },
      })
    },
    { immediate: true },
  )

  watch(
    () => state.currentRowIndex,
    (value) => {
      router.replace({
        path: currentPathname(),
        query: { ...currentQuery(), currentRowIndex: value },
      })
    },
    { immediate: true },
  )

  watch(
    () => state.currentRowIsOpen,
    (value) => {
      router.replace({
        path: currentPathname(),
        query: {
          ...currentQuery(),
          currentRowIsOpen: value ? 'true' : undefined,
        },
      })
    },
    { immediate: true },
  )
}
