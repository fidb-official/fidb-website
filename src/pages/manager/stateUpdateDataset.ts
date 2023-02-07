import qs from 'qs'
import { watch } from 'vue'
import { State } from './State'

export function stateUpdateDataset(state: State): void {
  watch(
    () => state.currentDirectory,

    async (to, from) => {
      state.dataset = []

      if (to === undefined) {
        return
      }

      const response = await fetch(
        `${state.url}/${to}?${qs.stringify({
          page: 1,
          size: 50,
          properties: {},
        })}`,
      )

      const { results } = await response.json()

      state.dataset = results
    },

    { immediate: true },
  )
}
