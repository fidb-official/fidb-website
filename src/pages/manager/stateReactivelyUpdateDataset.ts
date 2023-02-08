import { watch } from 'vue'
import { State } from './State'
import { stateUpdateDataset } from './stateUpdateDataset'

export function stateReactivelyUpdateDataset(state: State): void {
  watch(
    () => state.currentDirectory,

    async (directory) => {
      if (directory === undefined) {
        return
      }

      await stateUpdateDataset(state, directory)
    },

    { immediate: true },
  )

  watch(
    () => state.page,

    async () => {
      const directory = state.currentDirectory
      if (directory === undefined) {
        return
      }

      await stateUpdateDataset(state, directory)
    },

    { immediate: true },
  )
}
