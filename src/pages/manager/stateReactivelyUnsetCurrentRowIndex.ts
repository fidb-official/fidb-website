import { watch } from 'vue'
import { State } from './State'

export function stateReactivelyUnsetCurrentRowIndex(state: State): void {
  watch(
    () => state.currentCell,

    (currentCell) => {
      if (currentCell === undefined) {
        return
      }

      state.currentRowIndex = undefined
    },
  )
}
