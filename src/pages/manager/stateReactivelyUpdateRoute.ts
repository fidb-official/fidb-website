import qs from 'qs'
import { watch } from 'vue'
import { Router } from 'vue-router'
import { State } from './State'

export function stateReactivelyUpdateRoute(
  state: State,
  router: Router,
  url: URL,
): void {
  const query = qs.parse(url.search, { ignoreQueryPrefix: true })

  watch(
    () => state.page,
    (page) => {
      if (page !== undefined) {
        router.replace({
          path: url.pathname,
          query: { ...query, page },
        })
      }
    },
    { immediate: true },
  )
}
