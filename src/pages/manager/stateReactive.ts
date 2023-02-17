import { reactive } from 'vue'
import { State } from './State'
import { stateReactivelyOpenCurrentPathEntry } from './stateReactivelyOpenCurrentPathEntry'
import { stateReactivelyUnsetCurrentCell } from './stateReactivelyUnsetCurrentCell'
import { stateReactivelyUnsetCurrentRowIndex } from './stateReactivelyUnsetCurrentRowIndex'
import { stateReactivelyUpdateDataset } from './stateReactivelyUpdateDataset'

export function stateReactive(inputState: State): State {
  const state = reactive<State>(inputState)

  stateReactivelyUpdateDataset(state)
  stateReactivelyUnsetCurrentCell(state)
  stateReactivelyUnsetCurrentRowIndex(state)
  stateReactivelyOpenCurrentPathEntry(state)

  return state
}
