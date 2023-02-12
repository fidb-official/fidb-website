import { watch } from 'vue'
import { State } from './State'

export function stateReactivelyUnsetCurrentRowIndex(state: State): void {
  watch(
    () => state.currentCellIndex,

    (value) => {
      if (value === undefined) {
        return
      }

      state.currentRowIndex = undefined
      state.currentRowIsOpen = undefined
    },
  )

  watch(
    () => state.currentCellColumnName,

    (value) => {
      if (value === undefined) {
        return
      }

      state.currentRowIndex = undefined
      state.currentRowIsOpen = undefined
    },
  )
}
