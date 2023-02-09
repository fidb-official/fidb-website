import { watch } from 'vue'
import { State } from './State'

export function stateReactivelyUnsetCurrentCell(state: State): void {
  watch(
    () => state.currentRowIndex,

    (currentRowIndex) => {
      if (currentRowIndex === undefined) {
        return
      }

      state.currentCell = undefined
    },
  )
}
