import { watch } from 'vue'
import { State } from './State'
import { stateUpdateDataset } from './stateUpdateDataset'

export function stateReactivelyUpdateDataset(state: State): void {
  watch(
    () => state.currentPathEntry,
    async () => {
      await stateUpdateDataset(state)
    },
    {
      deep: true,
      immediate: true,
    },
  )

  watch(
    () => state.page,
    async () => {
      await stateUpdateDataset(state)
    },
    {
      immediate: true,
    },
  )
}
