import { reactive } from 'vue'
import { State } from './State'
import { stateReactivelyUpdateDataset } from './stateReactivelyUpdateDataset'

export function stateReactive(inputState: State): State {
  const state = reactive<State>(inputState)

  stateReactivelyUpdateDataset(state)

  return state
}
