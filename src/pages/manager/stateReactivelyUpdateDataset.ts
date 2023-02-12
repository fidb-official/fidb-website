import { watch } from 'vue'
import { State } from './State'
import { stateUpdateDataset } from './stateUpdateDataset'

export function stateReactivelyUpdateDataset(state: State): void {
  watch(
    () => state.currentDirectory,

    async () => {
      await stateUpdateDataset(state)
    },
  )

  watch(
    () => state.page,

    async () => {
      await stateUpdateDataset(state)
    },
  )
}
