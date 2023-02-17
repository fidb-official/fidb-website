import { watch } from 'vue'
import { State } from './State'
import { stateOpenPathEntry } from './stateOpenPathEntry'

export function stateReactivelyOpenCurrentPathEntry(state: State): void {
  watch(
    () => state.currentPathEntry,
    (value) => {
      if (value !== undefined) {
        stateOpenPathEntry(state, value)
      }
    },
    {
      deep: true,
      immediate: true,
    },
  )
}
